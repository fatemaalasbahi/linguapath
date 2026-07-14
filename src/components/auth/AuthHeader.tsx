import Link from "next/link";

import { Logo } from "@/components/landing/Logo";

export function AuthHeader() {
  return (
    <header className="mx-auto flex w-full max-w-md items-center justify-between px-4 py-6 sm:px-0">
      <Link
        href="/"
        className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
      >
        <Logo />
      </Link>
      <Link
        href="/"
        className="text-sm font-medium text-neutral-600 transition-colors hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-sm"
      >
        Back to Home
      </Link>
    </header>
  );
}
