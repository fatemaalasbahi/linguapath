"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
        "fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-md",
        className,
      )}
      aria-label="Mobile app navigation"
    >
      <ul className="grid grid-cols-5 gap-1">
        {mobileNavItems.map(({ href, label, icon: Icon }) => {
          const active = isNavItemActive(pathname, href);

          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "flex min-h-11 flex-col items-center justify-center gap-1 rounded-md px-1 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
                  active ? "text-primary-600" : "text-neutral-600 hover:text-neutral-900",
                )}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="h-5 w-5" aria-hidden />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
