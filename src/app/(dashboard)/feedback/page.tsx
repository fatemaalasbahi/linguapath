import { FeedbackForm } from "@/components/feedback/FeedbackForm";
import { Card } from "@/components/ui/Card";

export const dynamic = "force-dynamic";

export default function FeedbackPage() {
  return (
    <div className="mx-auto w-full max-w-lg space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">
          Feedback
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
          Send Feedback
        </h1>
        <p className="text-sm leading-relaxed text-neutral-600">
          Help us improve LinguaPath. Share a comment, suggestion, or bug report.
        </p>
      </div>

      <Card>
        <FeedbackForm />
      </Card>
    </div>
  );
}
