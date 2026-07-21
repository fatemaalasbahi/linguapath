"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";

import { SignOutButton } from "@/components/auth/SignOutButton";
import { ComingSoonBadge } from "@/components/roadmap/ComingSoonBadge";
import { cn } from "@/lib/utils";

import {
  isNavItemActive,
  primaryNavItems,
  roadmapNavItems,
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
  comingSoon = false,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
  pathname: string;
  comingSoon?: boolean;
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
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {comingSoon ? <ComingSoonBadge /> : null}
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

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto" aria-label="Primary">
        {primaryNavItems.map((item) => (
          <NavLink key={item.href} pathname={pathname} {...item} />
        ))}

        <div className="mt-4 space-y-1 border-t border-neutral-200 pt-4">
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Roadmap
          </p>
          {roadmapNavItems.map((item) => (
            <NavLink key={item.href} pathname={pathname} {...item} />
          ))}
        </div>
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
