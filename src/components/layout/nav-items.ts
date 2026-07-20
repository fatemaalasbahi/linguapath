import type { LucideIcon } from "lucide-react";
import {
  ClipboardCheck,
  LayoutDashboard,
  Map,
  MessageSquare,
  PenLine,
  TrendingUp,
} from "lucide-react";

export type AppNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const primaryNavItems: AppNavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Assessment", href: "/assessment", icon: ClipboardCheck },
  { label: "Study Plan", href: "/study-plan", icon: Map },
  { label: "Practice", href: "/practice", icon: PenLine },
  { label: "Progress", href: "/progress", icon: TrendingUp },
];

export const secondaryNavItems: AppNavItem[] = [
  { label: "Feedback", href: "/feedback", icon: MessageSquare },
];

export const mobileNavItems: AppNavItem[] = [
  { label: "Home", href: "/dashboard", icon: LayoutDashboard },
  { label: "Plan", href: "/study-plan", icon: Map },
  { label: "Practice", href: "/practice", icon: PenLine },
  { label: "Progress", href: "/progress", icon: TrendingUp },
  { label: "Feedback", href: "/feedback", icon: MessageSquare },
];

export function isNavItemActive(pathname: string, href: string): boolean {
  if (href === "/dashboard") {
    return pathname === "/dashboard";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
