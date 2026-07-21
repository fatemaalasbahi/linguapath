import { RoadmapFeaturePage } from "@/components/roadmap/RoadmapFeaturePage";
import { getRoadmapFeatureBySlug } from "@/lib/roadmap/features";

export const dynamic = "force-dynamic";

export default function SpeakingRoadmapPage() {
  return <RoadmapFeaturePage feature={getRoadmapFeatureBySlug("speaking")} />;
}
