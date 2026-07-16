import Link from "next/link";

import { Card } from "@/components/ui/Card";
import type { PracticeSubmission } from "@/lib/db/schema";
import type { ExamType } from "@/lib/exam-profile/constants";

type RecentPracticeResultProps = {
  submission: PracticeSubmission;
  examType: ExamType;
};

export function RecentPracticeResult({
  submission,
  examType,
}: RecentPracticeResultProps) {
  const estimateLabel =
    examType === "DET" ? "Latest practice estimate" : "Latest practice level";
  const estimateValue =
    examType === "DET"
      ? (submission.score?.toString() ?? "—")
      : (submission.level ?? "—");

  return (
    <Card className="space-y-3 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">
            Recent Practice
          </p>
          <p className="text-sm font-medium text-neutral-500">{estimateLabel}</p>
          <p className="text-2xl font-semibold text-neutral-900">
            {estimateValue}
          </p>
        </div>
        <p className="text-xs text-neutral-500">
          {submission.createdAt.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
      <Link
        href="/progress"
        className="inline-flex text-sm font-medium text-primary-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-sm"
      >
        View Progress →
      </Link>
    </Card>
  );
}
