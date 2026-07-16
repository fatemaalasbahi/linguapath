import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type StudyPlanEmptyProps = {
  error?: string;
};

export function StudyPlanEmpty({ error }: StudyPlanEmptyProps) {
  return (
    <Card className="space-y-4 p-6">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-neutral-900">
          No study plan yet
        </h2>
        <p className="text-sm leading-relaxed text-neutral-600">
          Generate an AI study plan based on your exam goal, schedule, and
          diagnostic insights when available.
        </p>
      </div>

      {error ? (
        <p
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <Button type="submit" className="w-full sm:w-auto">
        Generate Study Plan
      </Button>
    </Card>
  );
}
