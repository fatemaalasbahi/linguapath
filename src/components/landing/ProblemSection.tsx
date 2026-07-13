import { SectionContainer } from "@/components/ui/SectionContainer";
import { Card } from "@/components/ui/Card";
import { HelpCircle, Map, MessageSquareWarning } from "lucide-react";

const problems = [
  {
    icon: HelpCircle,
    title: "Unclear level",
    description:
      "Students often don't know their true proficiency before exam day.",
  },
  {
    icon: Map,
    title: "No structured plan",
    description:
      "Without a roadmap, preparation feels scattered and inefficient.",
  },
  {
    icon: MessageSquareWarning,
    title: "Limited feedback",
    description:
      "General study materials rarely provide personalized guidance on weak skills.",
  },
] as const;

export function ProblemSection() {
  return (
    <SectionContainer className="bg-neutral-50">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          Exam prep shouldn&apos;t feel like guessing
        </h2>
        <p className="mt-4 text-lg text-neutral-700">
          Many students preparing for language proficiency exams struggle to
          understand where they stand and what to improve next.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {problems.map((problem) => (
          <Card key={problem.title} className="text-center sm:text-left">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-lg bg-primary-50 sm:mx-0">
              <problem.icon
                className="h-5 w-5 text-primary-600"
                aria-hidden="true"
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-neutral-900">
              {problem.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700">
              {problem.description}
            </p>
          </Card>
        ))}
      </div>
    </SectionContainer>
  );
}
