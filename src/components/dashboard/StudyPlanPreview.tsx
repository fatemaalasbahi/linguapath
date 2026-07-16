import Link from "next/link";

import { Card } from "@/components/ui/Card";
import type { StudyPlan } from "@/lib/db/schema";
import {
  getCurrentPlanWeek,
  getPriorityTasksForWeek,
} from "@/lib/study-plan/format";
import { getCurrentWeekNumber } from "@/lib/study-plan/dates";
import type { StudyPlanContent } from "@/lib/study-plan/schemas";

type StudyPlanPreviewProps = {
  plan: StudyPlan;
};

export function StudyPlanPreview({ plan }: StudyPlanPreviewProps) {
  const content = plan.planContent as StudyPlanContent;
  const startDate = plan.startDate;

  if (!startDate || !plan.endDate) {
    return null;
  }

  const currentWeekNumber = getCurrentWeekNumber(startDate, content.totalWeeks);
  const currentWeek = getCurrentPlanWeek(plan);

  if (!currentWeek) {
    return null;
  }

  const priorityTasks = getPriorityTasksForWeek(currentWeek, 2);

  return (
    <Card className="space-y-4 p-5">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">
          Your Current Week
        </p>
        <h3 className="text-lg font-semibold text-neutral-900">
          Week {currentWeekNumber}
        </h3>
        <p className="text-sm text-neutral-600">
          Focus: {currentWeek.focus}
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-neutral-900">
          Today&apos;s priorities:
        </p>
        <ul className="space-y-2 text-sm text-neutral-700">
          {priorityTasks.map((task) => (
            <li key={task.title} className="flex gap-2">
              <span className="text-primary-600" aria-hidden="true">
                •
              </span>
              <span>
                {task.title} — {task.estimatedMinutes} min
              </span>
            </li>
          ))}
        </ul>
      </div>

      <Link
        href="/study-plan"
        className="inline-flex text-sm font-medium text-primary-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-sm"
      >
        View Full Plan →
      </Link>
    </Card>
  );
}
