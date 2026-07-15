import Link from "next/link";

import { Card } from "@/components/ui/Card";

const placeholderFeatures = [
  {
    title: "Study Plan",
    description:
      "Get a personalized weekly study plan tailored to your exam goal.",
    phase: "Phase 7",
  },
  {
    title: "Writing Practice",
    description:
      "Submit practice responses and receive AI feedback on your writing.",
    phase: "Phase 8",
  },
  {
    title: "Progress",
    description:
      "Track your score or level improvements over time as you practice.",
    phase: "Phase 8",
  },
] as const;

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

      <div className="grid gap-4 sm:grid-cols-2">
      {placeholderFeatures.map((feature) => (
        <Card key={feature.title} className="space-y-3 p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-semibold text-neutral-900">
              {feature.title}
            </h3>
            <span className="shrink-0 rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600">
              Coming soon
            </span>
          </div>
          <p className="text-sm leading-relaxed text-neutral-600">
            {feature.description}
          </p>
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
            {feature.phase}
          </p>
        </Card>
      ))}
      </div>
    </div>
  );
}
