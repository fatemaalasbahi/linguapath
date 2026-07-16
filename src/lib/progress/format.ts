import type { Assessment, PracticeSubmission } from "@/lib/db/schema";
import { ACTIVITY_TYPE_WRITING_PRACTICE } from "@/lib/practice/constants";

export type ProgressHistoryItem = {
  id: string;
  kind: "diagnostic" | "writing_practice";
  label: string;
  value: string;
  completedAt: Date;
  notes?: string | null;
};

export function formatScoreChange(change: number | null): string {
  if (change == null) {
    return "—";
  }

  if (change > 0) {
    return `+${change} pts`;
  }

  if (change < 0) {
    return `${change} pts`;
  }

  return "No change";
}

export function formatLevelChange(change: number | null): string {
  if (change == null) {
    return "—";
  }

  if (change > 0) {
    return `+${change} level${change === 1 ? "" : "s"}`;
  }

  if (change < 0) {
    return `${change} level${change === -1 ? "" : "s"}`;
  }

  return "No change";
}

export function buildProgressHistory(
  assessments: Assessment[],
  practiceSubmissions: PracticeSubmission[],
): ProgressHistoryItem[] {
  const diagnosticItems: ProgressHistoryItem[] = assessments.map((item) => ({
    id: item.id,
    kind: "diagnostic",
    label: "Diagnostic Assessment",
    value:
      item.aiScore != null
        ? item.aiScore.toString()
        : (item.aiLevel ?? "—"),
    completedAt: item.createdAt,
  }));

  const practiceItems: ProgressHistoryItem[] = practiceSubmissions.map(
    (item) => ({
      id: item.id,
      kind: "writing_practice",
      label: "Writing Practice",
      value:
        item.score != null ? item.score.toString() : (item.level ?? "—"),
      completedAt: item.createdAt,
    }),
  );

  return [...diagnosticItems, ...practiceItems].sort(
    (left, right) => right.completedAt.getTime() - left.completedAt.getTime(),
  );
}

export function getActivityTypeLabel(activityType: string): string {
  if (activityType === ACTIVITY_TYPE_WRITING_PRACTICE) {
    return "Writing Practice";
  }

  return activityType;
}
