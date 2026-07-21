import { RoadmapFeaturePage } from "@/components/roadmap/RoadmapFeaturePage";
import { getRoadmapFeatureBySlug } from "@/lib/roadmap/features";

export const dynamic = "force-dynamic";

export default function MockExamRoadmapPage() {
  return <RoadmapFeaturePage feature={getRoadmapFeatureBySlug("mock-exam")} />;
}
