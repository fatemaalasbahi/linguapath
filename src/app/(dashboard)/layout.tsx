import { requireSession } from "@/lib/auth/session";
import { syncUserFromSession } from "@/lib/auth/sync-user";

export const dynamic = "force-dynamic";

export default async function DashboardRouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await requireSession();
  await syncUserFromSession(session);

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}
