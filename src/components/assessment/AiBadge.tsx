import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

type AiBadgeProps = {
  label?: string;
  className?: string;
};

export function AiBadge({ label = "AI", className }: AiBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-accent-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-accent-500",
        className,
      )}
    >
      <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
    </span>
  );
}
