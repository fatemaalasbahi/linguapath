import { redirect } from "next/navigation";

import { SignOutButton } from "@/components/auth/SignOutButton";
import { Card } from "@/components/ui/Card";
import { auth } from "@/lib/auth/server";
import { getPostAuthRedirect } from "@/lib/auth/redirects";
import { syncUserFromSession } from "@/lib/auth/sync-user";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    redirect("/sign-in");
  }

  const appUser = await syncUserFromSession(session);
  const destination = await getPostAuthRedirect(appUser.id);

  if (destination !== "/dashboard") {
    redirect(destination);
  }

  return (
    <Card className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">
            Protected area
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
            Dashboard
          </h1>
          <p className="text-sm leading-relaxed text-neutral-600">
            Your personalized exam preparation dashboard will be available in
            Phase 5.
          </p>
        </div>
        <SignOutButton />
      </div>

      <p className="text-sm text-neutral-500">
        Signed in as{" "}
        <span className="font-medium text-neutral-700">
          {session.user.email}
        </span>
      </p>
    </Card>
  );
}
