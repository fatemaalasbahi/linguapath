import { Card } from "@/components/ui/Card";
import type { Assessment, PracticeSubmission } from "@/lib/db/schema";
import { HSK_LEVELS } from "@/lib/exam-profile/constants";
import type { ProgressMetrics } from "@/lib/progress/calculate";

type ProgressTrendProps = {
  metrics: ProgressMetrics;
  practiceSubmissions: PracticeSubmission[];
  assessments: Assessment[];
};

function DetScoreTrend({
  practiceSubmissions,
  assessments,
}: {
  practiceSubmissions: PracticeSubmission[];
  assessments: Assessment[];
}) {
  const scorePoints = [
    ...assessments
      .filter((item) => item.aiScore != null)
      .map((item) => ({
        label: "Diagnostic",
        value: item.aiScore as number,
        date: item.createdAt,
      })),
    ...practiceSubmissions
      .filter((item) => item.score != null)
      .map((item, index) => ({
        label: `Practice ${practiceSubmissions.length - index}`,
        value: item.score as number,
        date: item.createdAt,
      })),
  ].sort((left, right) => left.date.getTime() - right.date.getTime());

  if (scorePoints.length === 0) {
    return null;
  }

  const maxScore = Math.max(...scorePoints.map((point) => point.value));
  const minScore = Math.min(...scorePoints.map((point) => point.value));
  const range = Math.max(maxScore - minScore, 1);

  return (
    <Card className="space-y-4 p-5">
      <h2 className="text-base font-semibold text-neutral-900">Score History</h2>
      <ul className="space-y-3">
        {scorePoints.map((point) => {
          const width = ((point.value - minScore) / range) * 100;

          return (
            <li key={`${point.label}-${point.date.toISOString()}`} className="space-y-1">
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="font-medium text-neutral-700">{point.label}</span>
                <span className="font-semibold text-neutral-900">{point.value}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-neutral-200">
                <div
                  className="h-full rounded-full bg-primary-600"
                  style={{ width: `${Math.max(width, 8)}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

function HskLevelTrend({
  practiceSubmissions,
  assessments,
}: {
  practiceSubmissions: PracticeSubmission[];
  assessments: Assessment[];
}) {
  const levelPoints = [
    ...assessments
      .filter((item) => item.aiLevel != null)
      .map((item) => ({
        label: "Diagnostic",
        level: item.aiLevel as string,
        date: item.createdAt,
      })),
    ...practiceSubmissions
      .filter((item) => item.level != null)
      .map((item, index) => ({
        label: `Practice ${practiceSubmissions.length - index}`,
        level: item.level as string,
        date: item.createdAt,
      })),
  ].sort((left, right) => left.date.getTime() - right.date.getTime());

  if (levelPoints.length === 0) {
    return null;
  }

  return (
    <Card className="space-y-4 p-5">
      <h2 className="text-base font-semibold text-neutral-900">
        Level Progression
      </h2>
      <ol className="flex flex-wrap gap-2">
        {levelPoints.map((point) => (
          <li
            key={`${point.label}-${point.date.toISOString()}`}
            className="rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700"
          >
            {point.label}: {point.level}
          </li>
        ))}
      </ol>
      <p className="text-xs text-neutral-500">
        Ordered by HSK level: {HSK_LEVELS.join(" → ")}
      </p>
    </Card>
  );
}

export function ProgressTrend({
  metrics,
  practiceSubmissions,
  assessments,
}: ProgressTrendProps) {
  if (metrics.examType === "DET") {
    return (
      <DetScoreTrend
        practiceSubmissions={practiceSubmissions}
        assessments={assessments}
      />
    );
  }

  return (
    <HskLevelTrend
      practiceSubmissions={practiceSubmissions}
      assessments={assessments}
    />
  );
}
