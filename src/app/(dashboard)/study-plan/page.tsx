import { redirect } from "next/navigation";

import { StudyPlanFlow } from "@/components/study-plan/StudyPlanFlow";
import { Card } from "@/components/ui/Card";
import { auth } from "@/lib/auth/server";
import { syncUserFromSession } from "@/lib/auth/sync-user";
import { getExamProfileForUser } from "@/lib/exam-profile/queries";
import { getStudyPlanSubtitle } from "@/lib/study-plan/format";
import { getActiveStudyPlanForUser } from "@/lib/study-plan/queries";

export const dynamic = "force-dynamic";

export default async function StudyPlanPage() {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    redirect("/sign-in");
  }

  const appUser = await syncUserFromSession(session);
  const profile = await getExamProfileForUser(appUser.id);

  if (!profile) {
    redirect("/exam-goals/setup");
  }

  const activePlan = await getActiveStudyPlanForUser(appUser.id);

  return (
    <div className="space-y-6">
      <Card className="space-y-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">
            Study Plan
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
            AI-generated Study Plan
          </h1>
          <p className="text-sm leading-relaxed text-neutral-600">
            {getStudyPlanSubtitle(profile)}
          </p>
        </div>
      </Card>

      <StudyPlanFlow profile={profile} initialPlan={activePlan} />
    </div>
  );
}
