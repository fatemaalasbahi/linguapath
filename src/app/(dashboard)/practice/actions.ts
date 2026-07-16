"use server";

import { redirect } from "next/navigation";

import { evaluatePracticeResponse } from "@/lib/ai/practice";
import type { PracticeDisplayResult } from "@/lib/ai/types";
import { auth } from "@/lib/auth/server";
import { syncUserFromSession } from "@/lib/auth/sync-user";
import { getExamProfileForUser } from "@/lib/exam-profile/queries";
import type { Language } from "@/lib/exam-profile/constants";
import { validateWritingResponse } from "@/lib/assessment/validation";
import { resolvePracticeContext } from "@/lib/practice/context";
import { isPracticeRateLimited } from "@/lib/practice/queries";
import { savePracticeSubmission } from "@/lib/practice/save";
import { getActiveStudyPlanForUser } from "@/lib/study-plan/queries";

export type PracticeFormState = {
  error?: string;
  result?: PracticeDisplayResult;
};

function parseWeekNumber(value: FormDataEntryValue | null): number | null {
  if (typeof value !== "string" || !value.trim()) {
    return null;
  }

  const parsed = Number.parseInt(value, 10);

  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 52) {
    return null;
  }

  return parsed;
}

export async function submitPracticeAction(
  _prevState: PracticeFormState,
  formData: FormData,
): Promise<PracticeFormState> {
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

  if (await isPracticeRateLimited(appUser.id)) {
    return {
      error:
        "You've reached today's practice limit. Please try again tomorrow.",
    };
  }

  const activePlan = await getActiveStudyPlanForUser(appUser.id);
  const requestedWeek = parseWeekNumber(formData.get("weekNumber"));
  const context = resolvePracticeContext(profile, activePlan, requestedWeek);

  let evaluation;

  try {
    evaluation = await evaluatePracticeResponse(
      profile,
      context,
      validation.sanitized,
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      const message =
        error instanceof Error ? error.message : "Unknown practice save error";
      console.error("Practice submission failed before save:", message);
    }

    return {
      error:
        "We couldn't analyze your response. Please try again in a few moments.",
    };
  }

  try {
    await savePracticeSubmission({
      userId: appUser.id,
      examProfileId: profile.id,
      studentResponse: validation.sanitized,
      feedback: evaluation,
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      const message =
        error instanceof Error ? error.message : "Unknown practice persistence error";
      console.error("Practice persistence failed:", message);
    }

    return {
      error: "Unable to save your practice submission. Please try again.",
    };
  }

  return {
    result: {
      examType: context.examType,
      estimatedScore: evaluation.estimatedScore,
      estimatedLevel: evaluation.estimatedLevel,
      grammarFeedback: evaluation.grammarFeedback,
      vocabularyFeedback: evaluation.vocabularyFeedback,
      structureFeedback: evaluation.structureFeedback,
      grammarStatus: evaluation.grammarStatus,
      vocabularyStatus: evaluation.vocabularyStatus,
      structureStatus: evaluation.structureStatus,
      strengths: evaluation.strengths,
      areasToImprove: evaluation.areasToImprove,
      correctedExamples: evaluation.correctedExamples,
      nextPracticeRecommendation: evaluation.nextPracticeRecommendation,
      confidence: evaluation.confidence,
    },
  };
}
