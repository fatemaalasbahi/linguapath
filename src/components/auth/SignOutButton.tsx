"use client";

import { Button } from "@/components/ui/Button";
import { authClient } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

type SignOutButtonProps = {
  className?: string;
};

export function SignOutButton({ className }: SignOutButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleSignOut() {
    startTransition(async () => {
      await authClient.signOut();
      router.push("/");
      router.refresh();
    });
  }

  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      className={className}
      onClick={handleSignOut}
      disabled={isPending}
      aria-label="Sign out"
    >
      {isPending ? "Signing out…" : "Sign Out"}
    </Button>
  );
}
