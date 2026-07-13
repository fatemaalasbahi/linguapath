import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <span className={cn("text-xl font-bold tracking-tight", className)}>
      <span className="text-primary-600">Lingua</span>
      <span className="text-neutral-900">Path</span>
    </span>
  );
}
