import type { ExamProfile } from "@/lib/db/schema";

import { isExamDateInPast } from "./dates";

export type PlanEligibilityResult =
  | { eligible: true }
  | { eligible: false; error: string };

export function validatePlanEligibility(
  profile: ExamProfile,
): PlanEligibilityResult {
  if (!profile.examDate) {
    return {
      eligible: false,
      error: "Set your exam date before generating a study plan.",
    };
  }

  if (isExamDateInPast(profile.examDate)) {
    return {
      eligible: false,
      error: "Update your exam date before generating a study plan.",
    };
  }

  if (!profile.studyHoursPerWeek || profile.studyHoursPerWeek < 1) {
    return {
      eligible: false,
      error: "Set your weekly study hours before generating a study plan.",
    };
  }

  const hasTarget =
    profile.scoringModel === "numeric"
      ? profile.targetScore != null
      : profile.targetLevel != null;

  if (!hasTarget) {
    return {
      eligible: false,
      error: "Set your target exam goal before generating a study plan.",
    };
  }

  return { eligible: true };
}
