import { Card } from "@/components/ui/Card";
import {
  formatLevelChange,
  formatScoreChange,
} from "@/lib/progress/format";
import type { ProgressMetrics } from "@/lib/progress/calculate";

type ProgressSummaryProps = {
  metrics: ProgressMetrics;
};

function StatCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper?: string;
}) {
  return (
    <Card className="space-y-2 p-5">
      <p className="text-sm font-medium text-neutral-500">{label}</p>
      <p className="text-2xl font-semibold tracking-tight text-neutral-900">
        {value}
      </p>
      {helper ? (
        <p className="text-xs leading-relaxed text-neutral-500">{helper}</p>
      ) : null}
    </Card>
  );
}

export function ProgressSummary({ metrics }: ProgressSummaryProps) {
  if (metrics.examType === "DET") {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Baseline"
            value={metrics.baseline.valueLabel}
            helper={metrics.baseline.label}
          />
          <StatCard
            label="Latest practice estimate"
            value={metrics.latestPractice?.valueLabel ?? "—"}
          />
          <StatCard
            label="Change since baseline"
            value={formatScoreChange(metrics.scoreChange)}
          />
          <StatCard
            label="Target score"
            value={metrics.targetScore?.toString() ?? "—"}
          />
        </div>
        {metrics.progressPercentage != null ? (
          <Card className="space-y-2 p-5">
            <p className="text-sm font-medium text-neutral-500">
              Progress toward target
            </p>
            <p className="text-2xl font-semibold text-neutral-900">
              {metrics.progressPercentage}%
            </p>
            <div className="h-2 overflow-hidden rounded-full bg-neutral-200">
              <div
                className="h-full rounded-full bg-primary-600"
                style={{ width: `${metrics.progressPercentage}%` }}
              />
            </div>
          </Card>
        ) : null}
        {metrics.progressStatus ? (
          <p className="text-sm leading-relaxed text-neutral-600">
            {metrics.progressStatus}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Baseline"
          value={metrics.baseline.valueLabel}
          helper={metrics.baseline.label}
        />
        <StatCard
          label="Profile current level"
          value={metrics.profileCurrentLevel ?? "—"}
        />
        <StatCard
          label="Latest practice estimate"
          value={metrics.latestPractice?.valueLabel ?? "—"}
        />
        <StatCard
          label="Change since baseline"
          value={formatLevelChange(metrics.levelChange)}
        />
      </div>
      <StatCard
        label="Target level"
        value={metrics.targetLevel ?? "—"}
      />
      {metrics.progressStatus ? (
        <p className="text-sm leading-relaxed text-neutral-600">
          {metrics.progressStatus}
        </p>
      ) : null}
    </div>
  );
}
