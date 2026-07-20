"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";

import { SignOutButton } from "@/components/auth/SignOutButton";
import { cn } from "@/lib/utils";

import {
  isNavItemActive,
  primaryNavItems,
  secondaryNavItems,
} from "./nav-items";

type AppSidebarProps = {
  className?: string;
};

function NavLink({
  href,
  label,
  icon: Icon,
  pathname,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
  pathname: string;
}) {
  const active = isNavItemActive(pathname, href);

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
        active
          ? "border-l-4 border-primary-600 bg-primary-50 pl-2 text-primary-600"
          : "border-l-4 border-transparent text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900",
      )}
      aria-current={active ? "page" : undefined}
    >
      <Icon className="h-5 w-5 shrink-0" aria-hidden />
      <span>{label}</span>
    </Link>
  );
}

export function AppSidebar({ className }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "sticky top-0 flex h-screen w-60 shrink-0 flex-col border-r border-neutral-200 bg-white px-4 py-6",
        className,
      )}
      aria-label="App navigation"
    >
      <div className="px-3 pb-6">
        <Link
          href="/dashboard"
          className="text-lg font-semibold text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-sm"
        >
          LinguaPath
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-1" aria-label="Primary">
        {primaryNavItems.map((item) => (
          <NavLink key={item.href} pathname={pathname} {...item} />
        ))}
      </nav>

      <div className="mt-auto space-y-3 border-t border-neutral-200 pt-4">
        <nav className="flex flex-col gap-1" aria-label="Secondary">
          {secondaryNavItems.map((item) => (
            <NavLink key={item.href} pathname={pathname} {...item} />
          ))}
        </nav>
        <SignOutButton className="w-full justify-center" />
      </div>
    </aside>
  );
}
