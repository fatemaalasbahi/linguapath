import { Card } from "@/components/ui/Card";
import type { SkillFeedbackStatus } from "@/lib/practice/schemas";

type FeedbackSectionProps = {
  title: string;
  feedback: string;
  status: SkillFeedbackStatus;
};

function statusLabel(status: SkillFeedbackStatus): string {
  switch (status) {
    case "strength":
      return "Strength";
    case "needs_attention":
      return "Needs attention";
    case "recommended_focus":
      return "Recommended focus";
  }
}

function statusClasses(status: SkillFeedbackStatus): string {
  switch (status) {
    case "strength":
      return "bg-primary-50 text-primary-700";
    case "needs_attention":
      return "bg-amber-50 text-amber-700";
    case "recommended_focus":
      return "bg-accent-50 text-accent-500";
  }
}

export function FeedbackSection({
  title,
  feedback,
  status,
}: FeedbackSectionProps) {
  return (
    <Card className="space-y-3 p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClasses(status)}`}
        >
          {statusLabel(status)}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-neutral-700">{feedback}</p>
    </Card>
  );
}
