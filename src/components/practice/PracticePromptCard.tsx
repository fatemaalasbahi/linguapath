import { AiBadge } from "@/components/assessment/AiBadge";
import { Card } from "@/components/ui/Card";
import type { ResolvedPracticeContext } from "@/lib/practice/context";

type PracticePromptCardProps = {
  context: ResolvedPracticeContext;
};

export function PracticePromptCard({ context }: PracticePromptCardProps) {
  const { weekContext, prompt, usingFallbackContext } = context;

  return (
    <div className="space-y-4">
      {weekContext.weekNumber ? (
        <Card className="space-y-3 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">
            Current Week Context
          </p>
          <div className="space-y-2 text-sm text-neutral-700">
            <p>
              <span className="font-medium text-neutral-900">Week:</span>{" "}
              {weekContext.weekNumber}
            </p>
            {weekContext.weekFocus ? (
              <p>
                <span className="font-medium text-neutral-900">Focus:</span>{" "}
                {weekContext.weekFocus}
              </p>
            ) : null}
            {weekContext.taskTitle ? (
              <p>
                <span className="font-medium text-neutral-900">Task:</span>{" "}
                {weekContext.taskTitle}
              </p>
            ) : null}
            {weekContext.taskDescription ? (
              <p>
                <span className="font-medium text-neutral-900">
                  Task guidance:
                </span>{" "}
                {weekContext.taskDescription}
              </p>
            ) : null}
          </div>
          {usingFallbackContext ? (
            <p className="text-sm text-neutral-600">
              No writing task is available for this week. A general exam prompt
              is provided below.
            </p>
          ) : null}
        </Card>
      ) : null}

      <Card className="space-y-3 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-semibold text-neutral-900">
            Writing Prompt
          </h2>
          <AiBadge label="Practice Prompt" />
        </div>
        <p className="text-sm leading-relaxed text-neutral-700">
          {prompt.prompt}
        </p>
      </Card>
    </div>
  );
}
