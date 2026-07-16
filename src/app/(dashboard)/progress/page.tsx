import { redirect } from "next/navigation";

import { EmptyProgressState } from "@/components/progress/EmptyProgressState";
import { ProgressHistory } from "@/components/progress/ProgressHistory";
import { ProgressSummary } from "@/components/progress/ProgressSummary";
import { ProgressTrend } from "@/components/progress/ProgressTrend";
import { SkillFeedbackSummary } from "@/components/progress/SkillFeedbackSummary";
import { Card } from "@/components/ui/Card";
import { auth } from "@/lib/auth/server";
import { syncUserFromSession } from "@/lib/auth/sync-user";
import { getExamProfileForUser } from "@/lib/exam-profile/queries";
import {
  getTargetAbilityLabel,
  getCurrentAbilityLabel,
} from "@/lib/exam-profile/format";
import type { ExamType } from "@/lib/exam-profile/constants";
import { buildProgressHistory } from "@/lib/progress/format";
import { getProgressPageData } from "@/lib/progress/summary";
import { parseStoredPracticeFeedback } from "@/lib/practice/schemas";

export const dynamic = "force-dynamic";

export default async function ProgressPage() {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    redirect("/sign-in");
  }

  const appUser = await syncUserFromSession(session);
  const profile = await getExamProfileForUser(appUser.id);

  if (!profile) {
    redirect("/exam-goals/setup");
  }

  const { metrics, assessments, practiceSubmissions } =
    await getProgressPageData(appUser.id, profile);
  const history = buildProgressHistory(assessments, practiceSubmissions);
  const latestFeedback = practiceSubmissions[0]
    ? parseStoredPracticeFeedback(practiceSubmissions[0].aiFeedback)
    : null;
  const examType = profile.examType as ExamType;
  const hasData = history.length > 0;

  return (
    <div className="space-y-6">
      <Card className="space-y-2 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">
          Progress
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
          Your Progress
        </h1>
        <p className="text-sm leading-relaxed text-neutral-600">
          {examType} · {getCurrentAbilityLabel(profile)} →{" "}
          {getTargetAbilityLabel(profile)} target
        </p>
      </Card>

      {!hasData ? (
        <EmptyProgressState />
      ) : (
        <>
          <ProgressSummary metrics={metrics} />
          <ProgressTrend
            metrics={metrics}
            practiceSubmissions={practiceSubmissions}
            assessments={assessments}
          />
          <ProgressHistory items={history} />
          <SkillFeedbackSummary feedback={latestFeedback} />
        </>
      )}
    </div>
  );
}
