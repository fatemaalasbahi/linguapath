import Link from "next/link";
import { redirect } from "next/navigation";

import { SignOutButton } from "@/components/auth/SignOutButton";
import { ExamGoalSummary } from "@/components/dashboard/ExamGoalSummary";
import { FeaturePlaceholderGrid } from "@/components/dashboard/FeaturePlaceholderGrid";
import { Card } from "@/components/ui/Card";
import { auth } from "@/lib/auth/server";
import { syncUserFromSession } from "@/lib/auth/sync-user";
import { getExamProfileForUser } from "@/lib/exam-profile/queries";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    redirect("/sign-in");
  }

  const appUser = await syncUserFromSession(session);
  const profile = await getExamProfileForUser(appUser.id);

  if (!profile) {
    redirect("/exam-goals/setup");
  }

  const displayName = appUser.name ?? session.user.email;

  return (
    <div className="space-y-6">
      <Card className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">
              Dashboard
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
              Welcome back, {displayName}
            </h1>
            <p className="text-sm leading-relaxed text-neutral-600">
              Here is an overview of your exam goal and upcoming learning
              features.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/exam-goals/setup"
              className="text-sm font-medium text-primary-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-sm"
            >
              Edit Exam Goal
            </Link>
            <SignOutButton />
          </div>
        </div>

        <ExamGoalSummary profile={profile} />
      </Card>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-900">
          Coming Next
        </h2>
        <FeaturePlaceholderGrid />
      </div>
    </div>
  );
}
