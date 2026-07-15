import Link from "next/link";
import { redirect } from "next/navigation";

import { AssessmentFlow } from "@/components/assessment/AssessmentFlow";
import { Card } from "@/components/ui/Card";
import { auth } from "@/lib/auth/server";
import { syncUserFromSession } from "@/lib/auth/sync-user";
import { getExamProfileForUser } from "@/lib/exam-profile/queries";
import type { ExamType } from "@/lib/exam-profile/constants";
import { getPromptForExam } from "@/lib/assessment/prompts";

export const dynamic = "force-dynamic";

export default async function AssessmentPage() {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    redirect("/sign-in");
  }

  const appUser = await syncUserFromSession(session);
  const profile = await getExamProfileForUser(appUser.id);

  if (!profile) {
    redirect("/exam-goals/setup");
  }

  const examType = profile.examType as ExamType;
  const prompt = getPromptForExam(examType);

  return (
    <div className="space-y-6">
      <Card className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">
              Assessment
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
              AI Diagnostic Assessment
            </h1>
            <p className="text-sm leading-relaxed text-neutral-600">
              This short diagnostic helps us understand your current level.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-primary-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-sm"
          >
            Back to Dashboard
          </Link>
        </div>
      </Card>

      <AssessmentFlow profile={profile} prompt={prompt} />
    </div>
  );
}
