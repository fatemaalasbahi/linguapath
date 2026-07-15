import type { ExamProfile } from "@/lib/db/schema";
import type { ExamType, Language } from "@/lib/exam-profile/constants";

import type { ExamGoalFormValues } from "@/components/dashboard/ExamGoalForm";

export function profileToFormValues(
  profile: ExamProfile,
): ExamGoalFormValues {
  const hasCurrentAbility =
    profile.scoringModel === "numeric"
      ? profile.currentScore != null
      : profile.currentLevel != null;

  return {
    knowsCurrentLevel: hasCurrentAbility ? "yes" : "no",
    language: profile.language as Language,
    examType: profile.examType as ExamType,
    currentScore: profile.currentScore?.toString() ?? "",
    targetScore: profile.targetScore?.toString() ?? "",
    currentLevel: profile.currentLevel ?? "HSK 3",
    targetLevel: profile.targetLevel ?? "HSK 5",
    examDate: profile.examDate ?? "",
    studyHoursPerWeek: profile.studyHoursPerWeek?.toString() ?? "5",
  };
}
