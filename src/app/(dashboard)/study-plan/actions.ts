"use server";

import { redirect } from "next/navigation";

import { generateStudyPlan } from "@/lib/ai/study-plan";
import { auth } from "@/lib/auth/server";
import { syncUserFromSession } from "@/lib/auth/sync-user";
import { getExamProfileForUser } from "@/lib/exam-profile/queries";
import {
  calculatePlanWeeks,
  getTodayDateString,
} from "@/lib/study-plan/dates";
import { validatePlanEligibility } from "@/lib/study-plan/eligibility";
import {
  getLatestAssessmentForExamProfile,
  isStudyPlanRateLimited,
} from "@/lib/study-plan/queries";
import { saveStudyPlan } from "@/lib/study-plan/save";
import type { StudyPlanContent } from "@/lib/study-plan/schemas";

export type StudyPlanFormState = {
  error?: string;
  plan?: {
    planContent: StudyPlanContent;
    startDate: string;
    endDate: string;
  };
};

export async function generateStudyPlanAction(
  _prevState: StudyPlanFormState,
  formData: FormData,
): Promise<StudyPlanFormState> {
  void formData;
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    redirect("/sign-in");
  }

  const appUser = await syncUserFromSession(session);
  const profile = await getExamProfileForUser(appUser.id);

  if (!profile) {
    redirect("/exam-goals/setup");
  }

  const eligibility = validatePlanEligibility(profile);

  if (!eligibility.eligible) {
    return { error: eligibility.error };
  }

  if (await isStudyPlanRateLimited(appUser.id)) {
    return {
      error:
        "You've reached the study plan generation limit for today. Please try again tomorrow.",
    };
  }

  const startDate = getTodayDateString();
  const endDate = profile.examDate!;
  const totalWeeks = calculatePlanWeeks(startDate, endDate);
  const latestAssessment = await getLatestAssessmentForExamProfile(profile.id);

  let planContent;

  try {
    planContent = await generateStudyPlan({
      profile,
      totalWeeks,
      startDate,
      endDate,
      latestAssessment,
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Study plan generation failed:", error);
    }

    return {
      error:
        "We couldn't generate your study plan. Please try again in a few moments.",
    };
  }

  try {
    await saveStudyPlan({
      userId: appUser.id,
      examProfileId: profile.id,
      planContent,
      startDate,
      endDate,
    });
  } catch {
    return {
      error: "Unable to save your study plan. Please try again.",
    };
  }

  return {
    plan: {
      planContent,
      startDate,
      endDate,
    },
  };
}
