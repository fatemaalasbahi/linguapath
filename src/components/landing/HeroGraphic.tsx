import { Card } from "@/components/ui/Card";
import { ClipboardCheck, PenLine, Sparkles } from "lucide-react";

export function HeroGraphic() {
  return (
    <Card
      className="relative overflow-hidden border-primary-100 bg-white/90 p-5 shadow-lg backdrop-blur sm:p-6"
      aria-hidden="true"
    >
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary-50" />
      <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-accent-50" />

      <div className="relative space-y-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent-500">
              Dashboard Preview
            </p>
            <p className="mt-1 text-sm font-medium text-neutral-700">
              Current Exam: DET
            </p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-accent-50 px-2.5 py-1 text-xs font-semibold text-accent-500">
            <Sparkles className="h-3 w-3" aria-hidden="true" />
            AI Coach
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-3">
            <p className="text-xs text-neutral-500">Estimated Score</p>
            <p className="mt-1 text-2xl font-bold text-neutral-900">105</p>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-3">
            <p className="text-xs text-neutral-500">Target Score</p>
            <p className="mt-1 text-2xl font-bold text-primary-600">120</p>
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between text-xs text-neutral-500">
            <span>Progress toward goal</span>
            <span className="font-medium text-neutral-700">42%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-neutral-200">
            <div className="h-full w-[42%] rounded-full bg-primary-600" />
          </div>
        </div>

        <div className="rounded-lg border border-primary-100 bg-primary-50 p-3">
          <div className="flex items-start gap-2">
            <PenLine
              className="mt-0.5 h-4 w-4 shrink-0 text-primary-600"
              aria-hidden="true"
            />
            <div>
              <p className="text-xs font-medium text-neutral-700">
                Today&apos;s Task
              </p>
              <p className="text-sm font-semibold text-neutral-900">
                Writing Practice
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-accent-500/20 bg-accent-50 px-3 py-2">
          <ClipboardCheck
            className="h-4 w-4 shrink-0 text-accent-500"
            aria-hidden="true"
          />
          <p className="text-sm font-medium text-neutral-700">AI Feedback Ready</p>
        </div>
      </div>
    </Card>
  );
}
