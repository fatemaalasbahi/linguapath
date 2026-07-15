import type { ExamProfile } from "@/lib/db/schema";
import type { ExamType } from "@/lib/exam-profile/constants";

export function formatExamDate(examDate: string | null): string {
  if (!examDate) {
    return "Not set";
  }

  const [year, month, day] = examDate.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function getCurrentAbilityLabel(profile: ExamProfile): string {
  if (profile.scoringModel === "numeric") {
    if (profile.currentScore == null) {
      return "Not assessed yet";
    }

    return profile.currentScore.toString();
  }

  if (profile.currentLevel == null) {
    return "Not assessed yet";
  }

  return profile.currentLevel;
}

export function isCurrentAbilityAssessed(profile: ExamProfile): boolean {
  if (profile.scoringModel === "numeric") {
    return profile.currentScore != null;
  }

  return profile.currentLevel != null;
}

export function getTargetAbilityLabel(profile: ExamProfile): string {
  if (profile.scoringModel === "numeric") {
    return profile.targetScore?.toString() ?? "—";
  }

  return profile.targetLevel ?? "—";
}

export function getCurrentAbilityTitle(examType: ExamType): string {
  return examType === "DET" ? "Current Score" : "Current Level";
}

export function getTargetAbilityTitle(examType: ExamType): string {
  return examType === "DET" ? "Target Score" : "Target Level";
}
