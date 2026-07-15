import Link from "next/link";
import { redirect } from "next/navigation";

import { SignOutButton } from "@/components/auth/SignOutButton";
import { ExamGoalForm } from "@/components/dashboard/ExamGoalForm";
import { Card } from "@/components/ui/Card";
import { auth } from "@/lib/auth/server";
import { syncUserFromSession } from "@/lib/auth/sync-user";
import { profileToFormValues } from "@/lib/exam-profile/form";
import { getExamProfileForUser } from "@/lib/exam-profile/queries";

export const dynamic = "force-dynamic";

export default async function ExamGoalSetupPage() {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    redirect("/sign-in");
  }

  const appUser = await syncUserFromSession(session);
  const existingProfile = await getExamProfileForUser(appUser.id);
  const initialValues = existingProfile
    ? profileToFormValues(existingProfile)
    : undefined;

  return (
    <div className="space-y-6">
      <Card className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">
              {existingProfile ? "Update your goal" : "First-time setup"}
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
              Set Your Exam Goal
            </h1>
            <p className="text-sm leading-relaxed text-neutral-600">
              Tell us about your exam so we can personalize your preparation.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {existingProfile && (
              <Link
                href="/dashboard"
                className="text-sm font-medium text-primary-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-sm"
              >
                Back to Dashboard
              </Link>
            )}
            <SignOutButton />
          </div>
        </div>

        <ExamGoalForm initialValues={initialValues} />
      </Card>
    </div>
  );
}
