import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  ClipboardCheck,
  ClipboardList,
  Headphones,
  LayoutDashboard,
  Map,
  MessageSquare,
  Mic,
  PenLine,
  TrendingUp,
} from "lucide-react";

export type AppNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  comingSoon?: boolean;
  mobileLabel?: string;
};

export const primaryNavItems: AppNavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Assessment", href: "/assessment", icon: ClipboardCheck },
  { label: "Study Plan", href: "/study-plan", icon: Map },
  { label: "Practice", href: "/practice", icon: PenLine },
  { label: "Progress", href: "/progress", icon: TrendingUp },
];

export const roadmapNavItems: AppNavItem[] = [
  {
    label: "Reading",
    href: "/reading",
    icon: BookOpen,
    comingSoon: true,
  },
  {
    label: "Listening",
    href: "/listening",
    icon: Headphones,
    comingSoon: true,
  },
  {
    label: "Speaking",
    href: "/speaking",
    icon: Mic,
    comingSoon: true,
  },
  {
    label: "Mock Exam",
    href: "/mock-exam",
    icon: ClipboardList,
    comingSoon: true,
    mobileLabel: "Mock",
  },
];

export const secondaryNavItems: AppNavItem[] = [
  { label: "Feedback", href: "/feedback", icon: MessageSquare },
];

export const mobileNavItems: AppNavItem[] = [
  { label: "Home", href: "/dashboard", icon: LayoutDashboard },
  { label: "Plan", href: "/study-plan", icon: Map },
  { label: "Practice", href: "/practice", icon: PenLine },
  { label: "Progress", href: "/progress", icon: TrendingUp },
  ...roadmapNavItems,
  { label: "Feedback", href: "/feedback", icon: MessageSquare },
];

export function isNavItemActive(pathname: string, href: string): boolean {
  if (href === "/dashboard") {
    return pathname === "/dashboard";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
