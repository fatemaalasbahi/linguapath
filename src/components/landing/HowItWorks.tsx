import { SectionContainer } from "@/components/ui/SectionContainer";

const steps = [
  {
    number: "1",
    title: "Register",
    description: "Create your account and set up your learning profile.",
  },
  {
    number: "2",
    title: "Set Exam Goal",
    description:
      "Choose your language exam, current ability, and target score or level.",
  },
  {
    number: "3",
    title: "AI Diagnostic Assessment",
    description:
      "Complete an AI-powered diagnostic to understand your strengths and gaps.",
  },
  {
    number: "4",
    title: "Study & Improve",
    description:
      "Follow your personalized plan, practice with AI feedback, and track progress.",
  },
] as const;

export function HowItWorks() {
  return (
    <SectionContainer id="how-it-works">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          How LinguaPath works
        </h2>
        <p className="mt-4 text-lg text-neutral-700">
          A clear path from registration to measurable exam preparation
          progress.
        </p>
      </div>

      <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <li
            key={step.title}
            className="relative rounded-xl border border-neutral-200 bg-white p-6 shadow-sm"
          >
            <span
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary-600 text-sm font-semibold text-white"
              aria-hidden="true"
            >
              {step.number}
            </span>
            <h3 className="mt-4 text-lg font-semibold text-neutral-900">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </SectionContainer>
  );
}
