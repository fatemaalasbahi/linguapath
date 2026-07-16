import Link from "next/link";

import { Card } from "@/components/ui/Card";
import type { RecommendedAction } from "@/lib/dashboard/recommendations";

type NextRecommendedActionProps = {
  action: RecommendedAction;
};

export function NextRecommendedAction({ action }: NextRecommendedActionProps) {
  return (
    <Card className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent-500">
          Recommended Next Step
        </p>
        <h3 className="text-base font-semibold text-neutral-900">
          {action.title}
        </h3>
        <p className="text-sm leading-relaxed text-neutral-600">
          {action.description}
        </p>
      </div>
      <Link
        href={action.href}
        className="inline-flex h-10 shrink-0 items-center justify-center rounded-md bg-primary-600 px-4 text-sm font-medium text-white transition-colors hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
      >
        {action.buttonLabel}
      </Link>
    </Card>
  );
}
