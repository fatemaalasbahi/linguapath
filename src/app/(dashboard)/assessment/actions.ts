"use server";

import { redirect } from "next/navigation";

import { evaluateWritingResponse, isGeminiRateLimitError } from "@/lib/ai/gemini";
import type { AssessmentDisplayResult } from "@/lib/ai/types";
import { auth } from "@/lib/auth/server";
import { syncUserFromSession } from "@/lib/auth/sync-user";
import { getExamProfileForUser } from "@/lib/exam-profile/queries";
import type { ExamType, Language } from "@/lib/exam-profile/constants";
import { isAssessmentRateLimited } from "@/lib/assessment/queries";
import { getPromptForExam } from "@/lib/assessment/prompts";
import { saveAssessmentResult } from "@/lib/assessment/save";
import { validateWritingResponse } from "@/lib/assessment/validation";

export type AssessmentFormState = {
  error?: string;
  result?: AssessmentDisplayResult;
};

export async function submitAssessment(
  _prevState: AssessmentFormState,
  formData: FormData,
): Promise<AssessmentFormState> {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    redirect("/sign-in");
  }

  const appUser = await syncUserFromSession(session);
  const profile = await getExamProfileForUser(appUser.id);

  if (!profile) {
    redirect("/exam-goals/setup");
  }

  const responseValue = formData.get("response");

  if (typeof responseValue !== "string") {
    return { error: "Invalid form submission. Please try again." };
  }

  const language = profile.language as Language;
  const validation = validateWritingResponse(responseValue, language);

  if (!validation.valid) {
    return { error: validation.error };
  }

  if (await isAssessmentRateLimited(appUser.id)) {
    return {
      error:
        "You've reached the assessment limit. Please try again in an hour.",
    };
  }

  const examType = profile.examType as ExamType;
  const prompt = getPromptForExam(examType);

  let evaluation;

  try {
    evaluation = await evaluateWritingResponse(
      profile,
      prompt.prompt,
      validation.sanitized,
    );
  } catch (error) {
    if (isGeminiRateLimitError(error)) {
      return {
        error:
          "The AI service is temporarily rate-limited. Please wait a minute and try again.",
      };
    }

    return {
      error:
        "We couldn't analyze your response. Please try again in a few moments.",
    };
  }

  let saveOutcome;

  try {
    saveOutcome = await saveAssessmentResult({
      userId: appUser.id,
      examProfileId: profile.id,
      profile,
      inputContent: validation.sanitized,
      result: evaluation,
    });
  } catch {
    return {
      error: "Unable to save your assessment. Please try again.",
    };
  }

  return {
    result: {
      examType,
      estimatedScore: evaluation.estimatedScore,
      estimatedLevel: evaluation.estimatedLevel,
      strengths: evaluation.strengths,
      weaknesses: evaluation.weaknesses,
      recommendations: evaluation.recommendations,
      confidence: evaluation.confidence,
      profileUpdated: saveOutcome.profileUpdated,
    },
  };
}
