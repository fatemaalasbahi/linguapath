import { SectionContainer } from "@/components/ui/SectionContainer";
import { CheckCircle2 } from "lucide-react";

const solutions = [
  "Understand your current exam level with AI diagnostic assessment",
  "Receive a personalized study plan based on your goals and timeline",
  "Get AI feedback on writing practice to improve faster",
  "Track measurable progress toward your certification target",
] as const;

export function SolutionSection() {
  return (
    <SectionContainer>
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="rounded-2xl border border-primary-100 bg-gradient-to-br from-primary-50 to-accent-50 p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-600">
            The LinguaPath approach
          </p>
          <p className="mt-4 text-2xl font-semibold leading-snug text-neutral-900">
            Personalized exam preparation powered by AI
          </p>
          <p className="mt-4 text-neutral-700">
            Built for students preparing for certification exams like DET and
            HSK — not casual language learning.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
            Your AI exam preparation coach
          </h2>
          <p className="mt-4 text-lg text-neutral-700">
            LinguaPath evaluates your abilities, identifies gaps, and guides
            you toward your target score or level with clear next steps.
          </p>
          <ul className="mt-8 space-y-4">
            {solutions.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary-600"
                  aria-hidden="true"
                />
                <span className="text-neutral-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionContainer>
  );
}
