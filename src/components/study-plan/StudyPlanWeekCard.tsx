"use client";

import { useState } from "react";

import { Card } from "@/components/ui/Card";
import type { StudyPlanWeek } from "@/lib/study-plan/schemas";

import { StudyPlanTaskRow } from "./StudyPlanTaskRow";

type StudyPlanWeekCardProps = {
  week: StudyPlanWeek;
  isCurrentWeek: boolean;
  defaultOpen?: boolean;
};

export function StudyPlanWeekCard({
  week,
  isCurrentWeek,
  defaultOpen = false,
}: StudyPlanWeekCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen || isCurrentWeek);

  return (
    <Card className="overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset"
      >
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-neutral-900">
              Week {week.weekNumber}
            </h3>
            {isCurrentWeek ? (
              <span className="rounded-full bg-accent-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-accent-500">
                Current
              </span>
            ) : null}
          </div>
          <p className="text-sm text-neutral-600">{week.title}</p>
        </div>
        <span className="text-sm font-medium text-neutral-400">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {isOpen ? (
        <div className="space-y-4 border-t border-neutral-100 px-5 py-4">
          <p className="text-sm leading-relaxed text-neutral-700">
            <span className="font-medium text-neutral-900">Focus:</span>{" "}
            {week.focus}
          </p>
          <ul className="space-y-3">
            {week.tasks.map((task) => (
              <StudyPlanTaskRow
                key={`${week.weekNumber}-${task.title}`}
                task={task}
                weekNumber={week.weekNumber}
              />
            ))}
          </ul>
        </div>
      ) : null}
    </Card>
  );
}
