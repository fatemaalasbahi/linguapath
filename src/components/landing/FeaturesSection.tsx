import { SectionContainer } from "@/components/ui/SectionContainer";
import { Card } from "@/components/ui/Card";
import {
  ClipboardCheck,
  Map,
  PenLine,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: ClipboardCheck,
    title: "AI Diagnostic Assessment",
    description:
      "Evaluate your current proficiency with an AI-powered diagnostic and identify strengths and weaknesses.",
  },
  {
    icon: Map,
    title: "Personalized Study Plans",
    description:
      "Receive a customized weekly roadmap based on your exam, goals, and available study time.",
  },
  {
    icon: PenLine,
    title: "AI Writing Feedback",
    description:
      "Submit writing practice and get actionable AI feedback to improve grammar, vocabulary, and structure.",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description:
      "Monitor score or level improvements over time and stay focused on your certification target.",
  },
] as const;

export function FeaturesSection() {
  return (
    <SectionContainer id="features" className="bg-neutral-50">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          Built for exam success
        </h2>
        <p className="mt-4 text-lg text-neutral-700">
          Everything you need to prepare for language proficiency exams — in one
          focused platform.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {features.map((feature) => (
          <Card key={feature.title}>
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-50">
              <feature.icon
                className="h-5 w-5 text-primary-600"
                aria-hidden="true"
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-neutral-900">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700">
              {feature.description}
            </p>
          </Card>
        ))}
      </div>
    </SectionContainer>
  );
}
