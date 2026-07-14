import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type AuthCardProps = HTMLAttributes<HTMLDivElement>;

export function AuthCard({ className, children, ...props }: AuthCardProps) {
  return (
    <Card
      className={cn("w-full max-w-md shadow-md", className)}
      {...props}
    >
      {children}
    </Card>
  );
}
