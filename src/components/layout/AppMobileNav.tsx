"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ComingSoonBadge } from "@/components/roadmap/ComingSoonBadge";
import { cn } from "@/lib/utils";

import { isNavItemActive, mobileNavItems } from "./nav-items";

type AppMobileNavProps = {
  className?: string;
};

export function AppMobileNav({ className }: AppMobileNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white shadow-md",
        className,
      )}
      aria-label="Mobile app navigation"
    >
      <ul className="flex gap-1 overflow-x-auto px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2">
        {mobileNavItems.map(({ href, label, icon: Icon, comingSoon, mobileLabel }) => {
          const active = isNavItemActive(pathname, href);
          const displayLabel = mobileLabel ?? label;

          return (
            <li key={href} className="min-w-[4.5rem] shrink-0">
              <Link
                href={href}
                className={cn(
                  "flex min-h-11 flex-col items-center justify-center gap-1 rounded-md px-1 py-1 text-[10px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 sm:text-xs",
                  active ? "text-primary-600" : "text-neutral-600 hover:text-neutral-900",
                )}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="h-5 w-5 shrink-0" aria-hidden />
                <span className="max-w-[4.5rem] truncate text-center">{displayLabel}</span>
                {comingSoon ? (
                  <ComingSoonBadge className="px-1.5 py-0 text-[8px]" />
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
