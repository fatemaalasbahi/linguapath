import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type SectionContainerProps = HTMLAttributes<HTMLElement> & {
  as?: "section" | "div";
};

export function SectionContainer({
  as: Component = "section",
  className,
  children,
  ...props
}: SectionContainerProps) {
  return (
    <Component
      className={cn("px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24", className)}
      {...props}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </Component>
  );
}
