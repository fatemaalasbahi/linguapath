import Link from "next/link";

import type { StudyPlanTask } from "@/lib/study-plan/schemas";
import { getSkillLabel } from "@/lib/study-plan/format";

type StudyPlanTaskRowProps = {
  task: StudyPlanTask;
  weekNumber?: number;
};

export function StudyPlanTaskRow({ task, weekNumber }: StudyPlanTaskRowProps) {
  const practiceHref =
    task.isInteractive && weekNumber != null
      ? `/practice?week=${weekNumber}`
      : "/practice";

  return (
    <li className="space-y-2 rounded-md border border-neutral-100 bg-neutral-50 px-4 py-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-primary-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary-700">
            {getSkillLabel(task.skill)}
          </span>
          <p className="text-sm font-medium text-neutral-900">{task.title}</p>
        </div>
        <span className="text-xs font-medium text-neutral-500">
          {task.estimatedMinutes} min
        </span>
      </div>
      <p className="text-sm leading-relaxed text-neutral-600">
        {task.description}
      </p>
      {task.isInteractive ? (
        <Link
          href={practiceHref}
          className="inline-flex text-sm font-medium text-primary-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-sm"
        >
          Start Writing Practice →
        </Link>
      ) : (
        <p className="text-xs font-medium text-neutral-500">
          Recommended offline study task
        </p>
      )}
    </li>
  );
}
