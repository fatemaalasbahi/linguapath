import { Card } from "@/components/ui/Card";
import type { PracticeFeedbackResult } from "@/lib/practice/schemas";

import { FeedbackSection } from "@/components/practice/FeedbackSection";

type SkillFeedbackSummaryProps = {
  feedback: PracticeFeedbackResult | null;
};

export function SkillFeedbackSummary({ feedback }: SkillFeedbackSummaryProps) {
  if (!feedback) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-neutral-900">
        Latest Skill Feedback
      </h2>
      <div className="grid gap-4 lg:grid-cols-3">
        <FeedbackSection
          title="Grammar"
          feedback={feedback.grammarFeedback}
          status={feedback.grammarStatus}
        />
        <FeedbackSection
          title="Vocabulary"
          feedback={feedback.vocabularyFeedback}
          status={feedback.vocabularyStatus}
        />
        <FeedbackSection
          title="Structure"
          feedback={feedback.structureFeedback}
          status={feedback.structureStatus}
        />
      </div>
      <Card className="p-5">
        <p className="text-sm leading-relaxed text-neutral-600">
          This summary is based on your most recent writing practice estimate,
          not an official exam result.
        </p>
      </Card>
    </div>
  );
}
