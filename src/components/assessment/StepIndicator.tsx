import { cn } from "@/lib/utils";

type StepIndicatorProps = {
  currentStep: 1 | 2 | 3;
};

const steps = [
  { number: 1, label: "Prompt" },
  { number: 2, label: "Response" },
  { number: 3, label: "Results" },
] as const;

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <ol className="flex flex-wrap items-center gap-2 sm:gap-4">
      {steps.map((step, index) => {
        const isActive =
          step.number === currentStep ||
          (currentStep === 2 && step.number <= 2);
        const isComplete = step.number < currentStep;

        return (
          <li key={step.number} className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold",
                  isComplete || isActive
                    ? "bg-primary-600 text-white"
                    : "bg-neutral-100 text-neutral-500",
                )}
              >
                {step.number}
              </span>
              <span
                className={cn(
                  "text-sm font-medium",
                  isActive ? "text-neutral-900" : "text-neutral-500",
                )}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 ? (
              <span
                className="hidden h-px w-8 bg-neutral-200 sm:block"
                aria-hidden="true"
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
