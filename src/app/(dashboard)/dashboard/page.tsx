import Link from "next/link";
import { redirect } from "next/navigation";

import { DashboardProgressCard } from "@/components/dashboard/DashboardProgressCard";
import { ExamGoalSummary } from "@/components/dashboard/ExamGoalSummary";
import { FeaturePlaceholderGrid } from "@/components/dashboard/FeaturePlaceholderGrid";
import { NextRecommendedAction } from "@/components/dashboard/NextRecommendedAction";
import { RecentPracticeResult } from "@/components/dashboard/RecentPracticeResult";
import { StudyPlanPreview } from "@/components/dashboard/StudyPlanPreview";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { Card } from "@/components/ui/Card";
import { auth } from "@/lib/auth/server";
import { syncUserFromSession } from "@/lib/auth/sync-user";
import { getNextRecommendedAction } from "@/lib/dashboard/recommendations";
import { getExamProfileForUser } from "@/lib/exam-profile/queries";
import type { ExamType } from "@/lib/exam-profile/constants";
import { getLatestPracticeSubmissionForUser } from "@/lib/practice/queries";
import { getProgressMetricsForUser } from "@/lib/progress/summary";
import { getActiveStudyPlanForUser } from "@/lib/study-plan/queries";

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

  const [activePlan, latestPractice, progressMetrics] = await Promise.all([
    getActiveStudyPlanForUser(appUser.id),
    getLatestPracticeSubmissionForUser(appUser.id),
    getProgressMetricsForUser(appUser.id, profile),
  ]);

  const recommendedAction = getNextRecommendedAction({
    profile,
    activePlan,
    latestPractice,
  });
  const displayName = appUser.name ?? session.user.email;
  const examType = profile.examType as ExamType;
  const hasProgressData =
    progressMetrics.baseline.source !== "none" ||
    progressMetrics.latestPractice != null;

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
              Here is an overview of your exam goal, study plan, and practice
              progress.
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

      <NextRecommendedAction action={recommendedAction} />

      {activePlan ? <StudyPlanPreview plan={activePlan} /> : null}

      {latestPractice ? (
        <RecentPracticeResult
          submission={latestPractice}
          examType={examType}
        />
      ) : null}

      {hasProgressData ? (
        <DashboardProgressCard metrics={progressMetrics} />
      ) : null}

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-900">
          Learning Features
        </h2>
        <FeaturePlaceholderGrid />
      </div>
    </div>
  );
}
