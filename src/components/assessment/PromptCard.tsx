import { Card } from "@/components/ui/Card";

import { AiBadge } from "./AiBadge";

type PromptCardProps = {
  prompt: string;
};

export function PromptCard({ prompt }: PromptCardProps) {
  return (
    <Card className="space-y-4 border-l-4 border-l-accent-500 p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-neutral-900">
          Writing Prompt
        </h2>
        <AiBadge />
      </div>
      <p className="text-sm leading-relaxed text-neutral-700">{prompt}</p>
    </Card>
  );
}
