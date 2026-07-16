import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { AssessmentDisplayResult } from "@/lib/ai/types";

import { AiBadge } from "./AiBadge";

type AssessmentResultsProps = {
  result: AssessmentDisplayResult;
};

function ResultList({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <Card className="space-y-3 p-5">
      <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
      <ul className="space-y-2 text-sm leading-relaxed text-neutral-700">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="text-primary-600" aria-hidden="true">
              •
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function confidenceLabel(confidence: AssessmentDisplayResult["confidence"]) {
  switch (confidence) {
    case "high":
      return "High confidence";
    case "medium":
      return "Medium confidence";
    case "low":
      return "Low confidence";
  }
}

export function AssessmentResults({ result }: AssessmentResultsProps) {
  const estimateLabel =
    result.examType === "DET" ? "Estimated Score" : "Estimated Level";
  const estimateValue =
    result.examType === "DET"
      ? (result.estimatedScore?.toString() ?? "—")
      : (result.estimatedLevel ?? "—");

  return (
    <div className="space-y-6">
      <Card className="space-y-4 border-l-4 border-l-accent-500 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <p className="text-sm font-medium text-neutral-500">
              {estimateLabel}
            </p>
            <p className="text-3xl font-semibold tracking-tight text-neutral-900">
              {estimateValue}
            </p>
          </div>
          <AiBadge label={confidenceLabel(result.confidence)} />
        </div>
        <p className="text-sm leading-relaxed text-neutral-600">
          This is an AI estimate based on one writing sample, not an official
          exam result.
        </p>
        {!result.profileUpdated ? (
          <p className="rounded-md border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-700">
            Your manually entered current ability was preserved. This AI
            estimate is shown for reference only.
          </p>
        ) : null}
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <ResultList title="Strengths" items={result.strengths} />
        <ResultList title="Areas to Improve" items={result.weaknesses} />
      </div>

      <Card className="space-y-4 border-l-4 border-l-accent-500 p-5">
        <div className="flex items-center gap-2">
          <AiBadge label="AI Recommendations" />
        </div>
        <ul className="space-y-2 text-sm leading-relaxed text-neutral-700">
          {result.recommendations.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-primary-600" aria-hidden="true">
                •
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Card>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button href="/dashboard" className="w-full sm:w-auto">
          Back to Dashboard
        </Button>
        <Button
          href="/study-plan"
          variant="secondary"
          className="w-full sm:w-auto"
        >
          Generate Study Plan
        </Button>
      </div>
    </div>
  );
}
