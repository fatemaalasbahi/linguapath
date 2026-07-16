import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function EmptyProgressState() {
  return (
    <Card className="space-y-4 p-5">
      <h2 className="text-lg font-semibold text-neutral-900">
        No progress data yet
      </h2>
      <p className="text-sm leading-relaxed text-neutral-600">
        Complete a diagnostic assessment or your first writing practice session
        to start tracking estimated improvement over time.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button href="/assessment" size="sm">
          Start Diagnostic Assessment
        </Button>
        <Button href="/practice" variant="secondary" size="sm">
          Start Writing Practice
        </Button>
      </div>
    </Card>
  );
}
