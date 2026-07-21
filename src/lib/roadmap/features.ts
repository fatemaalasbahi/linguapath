export type RoadmapFeature = {
  slug: "reading" | "listening" | "speaking" | "mock-exam";
  href: "/reading" | "/listening" | "/speaking" | "/mock-exam";
  eyebrow: string;
  title: string;
  description: string;
  plannedCapabilities: string[];
};

export const roadmapFeatures: RoadmapFeature[] = [
  {
    slug: "reading",
    href: "/reading",
    eyebrow: "Reading Practice",
    title: "Reading Practice",
    description:
      "Targeted reading comprehension practice aligned with your exam goals will help you build speed and accuracy before test day.",
    plannedCapabilities: [
      "Exam-style reading passages for DET and HSK",
      "AI-guided comprehension questions and explanations",
      "Weak-area recommendations linked to your study plan",
      "Progress tracking alongside writing and assessment results",
    ],
  },
  {
    slug: "listening",
    href: "/listening",
    eyebrow: "Listening Practice",
    title: "Listening Practice",
    description:
      "Listening drills with instant feedback will round out your preparation beyond writing-focused practice.",
    plannedCapabilities: [
      "Short audio prompts modeled on certification exams",
      "Transcript review with vocabulary and structure notes",
      "Difficulty levels matched to your target score or HSK level",
      "Session history to monitor improvement over time",
    ],
  },
  {
    slug: "speaking",
    href: "/speaking",
    eyebrow: "Speaking Practice",
    title: "Speaking Practice",
    description:
      "Structured speaking prompts with AI feedback will help you practice fluency, pronunciation, and exam-style responses.",
    plannedCapabilities: [
      "Timed speaking prompts for common exam formats",
      "AI feedback on clarity, grammar, and vocabulary",
      "Sample model responses for comparison",
      "Suggested follow-up practice based on your weaknesses",
    ],
  },
  {
    slug: "mock-exam",
    href: "/mock-exam",
    eyebrow: "Mock Exam",
    title: "Full Mock Exam",
    description:
      "A timed mock exam experience will simulate test conditions and give you a holistic readiness snapshot.",
    plannedCapabilities: [
      "Multi-section mock sessions covering available skills",
      "Estimated score or level summary with section breakdowns",
      "Personalized review plan after each mock attempt",
      "Comparison against your diagnostic assessment baseline",
    ],
  },
];

export function getRoadmapFeatureBySlug(
  slug: RoadmapFeature["slug"],
): RoadmapFeature {
  const feature = roadmapFeatures.find((item) => item.slug === slug);

  if (!feature) {
    throw new Error(`Unknown roadmap feature: ${slug}`);
  }

  return feature;
}
