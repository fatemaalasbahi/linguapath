import { ComingSoonBadge } from "@/components/roadmap/ComingSoonBadge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { RoadmapFeature } from "@/lib/roadmap/features";

type RoadmapFeaturePageProps = {
  feature: RoadmapFeature;
};

export function RoadmapFeaturePage({ feature }: RoadmapFeaturePageProps) {
  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">
            {feature.eyebrow}
          </p>
          <ComingSoonBadge />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
          {feature.title}
        </h1>
        <p className="text-sm leading-relaxed text-neutral-600">
          {feature.description}
        </p>
      </div>

      <Card className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-neutral-900">
            Planned for a future release
          </h2>
          <p className="text-sm leading-relaxed text-neutral-600">
            This feature is on the LinguaPath roadmap. You cannot start{" "}
            {feature.title.toLowerCase()} yet, but writing practice is available
            now while we build out additional exam skills.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-neutral-900">
            Planned capabilities
          </h3>
          <ul className="space-y-2 text-sm leading-relaxed text-neutral-700">
            {feature.plannedCapabilities.map((capability) => (
              <li key={capability} className="flex gap-2">
                <span className="text-primary-600" aria-hidden="true">
                  •
                </span>
                <span>{capability}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/practice" className="w-full sm:w-auto">
            Go to Writing Practice
          </Button>
        </div>
      </Card>
    </div>
  );
}
