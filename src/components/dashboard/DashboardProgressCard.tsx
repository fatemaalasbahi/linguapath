import Link from "next/link";

import { Card } from "@/components/ui/Card";
import type { ProgressMetrics } from "@/lib/progress/calculate";

type DashboardProgressCardProps = {
  metrics: ProgressMetrics;
};

export function DashboardProgressCard({ metrics }: DashboardProgressCardProps) {
  const latestLabel = metrics.latestPractice?.valueLabel ?? "—";
  const baselineLabel = metrics.baseline.valueLabel;

  return (
    <Card className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-2">
        <h3 className="text-base font-semibold text-neutral-900">Progress</h3>
        <p className="text-sm text-neutral-600">
          Baseline ({metrics.baseline.label}): {baselineLabel}
        </p>
        <p className="text-sm text-neutral-600">
          Latest practice estimate: {latestLabel}
        </p>
        {metrics.examType === "DET" && metrics.progressPercentage != null ? (
          <p className="text-sm font-medium text-neutral-900">
            {metrics.progressPercentage}% toward target
          </p>
        ) : null}
        {metrics.progressStatus ? (
          <p className="text-xs leading-relaxed text-neutral-500">
            {metrics.progressStatus}
          </p>
        ) : null}
      </div>
      <Link
        href="/progress"
        className="inline-flex h-10 items-center justify-center rounded-md bg-primary-600 px-4 text-sm font-medium text-white transition-colors hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
      >
        View Progress
      </Link>
    </Card>
  );
}
