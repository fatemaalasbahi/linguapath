import { requireSession } from "@/lib/auth/session";
import { syncUserFromSession } from "@/lib/auth/sync-user";
import { DashboardShell } from "@/components/layout/DashboardShell";

export const dynamic = "force-dynamic";

export default async function DashboardRouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await requireSession();
  await syncUserFromSession(session);

  return <DashboardShell>{children}</DashboardShell>;
}
