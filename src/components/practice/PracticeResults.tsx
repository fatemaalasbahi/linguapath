import { AiBadge } from "@/components/assessment/AiBadge";
import { Card } from "@/components/ui/Card";
import type { PracticeDisplayResult } from "@/lib/ai/types";
import { PRACTICE_DISCLAIMER } from "@/lib/practice/constants";
import type { SkillFeedbackStatus } from "@/lib/practice/schemas";

import { FeedbackSection } from "./FeedbackSection";

type PracticeResultsProps = {
  result: PracticeDisplayResult;
  onPracticeAgain: () => void;
};

function confidenceLabel(confidence: PracticeDisplayResult["confidence"]) {
  switch (confidence) {
    case "high":
      return "High confidence";
    case "medium":
      return "Medium confidence";
    case "low":
      return "Low confidence";
  }
}

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

export function PracticeResults({ result, onPracticeAgain }: PracticeResultsProps) {
  const estimateLabel =
    result.examType === "DET" ? "Estimated Score" : "Estimated Level";
  const estimateValue =
    result.examType === "DET"
      ? (result.estimatedScore?.toString() ?? "—")
      : (result.estimatedLevel ?? "—");

  const skillSections: Array<{
    title: string;
    feedback: string;
    status: SkillFeedbackStatus;
  }> = [
    {
      title: "Grammar",
      feedback: result.grammarFeedback,
      status: result.grammarStatus,
    },
    {
      title: "Vocabulary",
      feedback: result.vocabularyFeedback,
      status: result.vocabularyStatus,
    },
    {
      title: "Structure",
      feedback: result.structureFeedback,
      status: result.structureStatus,
    },
  ];

  return (
    <div className="space-y-6" aria-live="polite">
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
          {PRACTICE_DISCLAIMER}
        </p>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        {skillSections.map((section) => (
          <FeedbackSection
            key={section.title}
            title={section.title}
            feedback={section.feedback}
            status={section.status}
          />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ResultList title="Strengths" items={result.strengths} />
        <ResultList title="Areas to Improve" items={result.areasToImprove} />
      </div>

      <Card className="space-y-4 border-l-4 border-l-accent-500 p-5">
        <div className="flex items-center gap-2">
          <AiBadge label="Suggested Rewrites" />
        </div>
        <ul className="space-y-2 text-sm leading-relaxed text-neutral-700">
          {result.correctedExamples.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-primary-600" aria-hidden="true">
                •
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="space-y-3 p-5">
        <h3 className="text-sm font-semibold text-neutral-900">
          Next Practice Recommendation
        </h3>
        <p className="text-sm leading-relaxed text-neutral-700">
          {result.nextPracticeRecommendation}
        </p>
      </Card>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onPracticeAgain}
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary-600 px-4 text-sm font-medium text-white transition-colors hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        >
          Practice Again
        </button>
        <a
          href="/study-plan"
          className="inline-flex h-10 items-center justify-center rounded-md border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        >
          Back to Study Plan
        </a>
        <a
          href="/progress"
          className="inline-flex h-10 items-center justify-center rounded-md border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        >
          View Progress
        </a>
      </div>
    </div>
  );
}
