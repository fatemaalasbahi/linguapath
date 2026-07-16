import Link from "next/link";

import { Card } from "@/components/ui/Card";

export function FeaturePlaceholderGrid() {
  return (
    <div className="space-y-4">
      <Card className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h3 className="text-base font-semibold text-neutral-900">
            AI Diagnostic Assessment
          </h3>
          <p className="text-sm leading-relaxed text-neutral-600">
            Estimate your current exam readiness with an AI-powered writing
            diagnostic.
          </p>
        </div>
        <Link
          href="/assessment"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary-600 px-4 text-sm font-medium text-white transition-colors hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        >
          Start Assessment
        </Link>
      </Card>

      <Card className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h3 className="text-base font-semibold text-neutral-900">
            Study Plan
          </h3>
          <p className="text-sm leading-relaxed text-neutral-600">
            Get a personalized weekly study plan tailored to your exam goal.
          </p>
        </div>
        <Link
          href="/study-plan"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary-600 px-4 text-sm font-medium text-white transition-colors hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        >
          View Study Plan
        </Link>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="flex flex-col gap-4 p-5">
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-neutral-900">
              Writing Practice
            </h3>
            <p className="text-sm leading-relaxed text-neutral-600">
              Submit practice responses and receive AI feedback on your writing.
            </p>
          </div>
          <Link
            href="/practice"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary-600 px-4 text-sm font-medium text-white transition-colors hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            Start Practice
          </Link>
        </Card>

        <Card className="flex flex-col gap-4 p-5">
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-neutral-900">
              Progress
            </h3>
            <p className="text-sm leading-relaxed text-neutral-600">
              Track your estimated score or level improvements over time as you
              practice.
            </p>
          </div>
          <Link
            href="/progress"
            className="inline-flex h-10 items-center justify-center rounded-md border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            View Progress
          </Link>
        </Card>
      </div>
    </div>
  );
}
