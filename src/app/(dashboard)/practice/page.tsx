import { redirect } from "next/navigation";

import { PracticeFlow } from "@/components/practice/PracticeFlow";
import { Card } from "@/components/ui/Card";
import { auth } from "@/lib/auth/server";
import { syncUserFromSession } from "@/lib/auth/sync-user";
import { getExamProfileForUser } from "@/lib/exam-profile/queries";
import type { Language } from "@/lib/exam-profile/constants";
import { resolvePracticeContext } from "@/lib/practice/context";
import { getActiveStudyPlanForUser } from "@/lib/study-plan/queries";

export const dynamic = "force-dynamic";

type PracticePageProps = {
  searchParams: Promise<{
    week?: string;
  }>;
};

function parseRequestedWeek(value: string | undefined): number | null {
  if (!value) {
    return null;
  }

  const parsed = Number.parseInt(value, 10);

  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 52) {
    return null;
  }

  return parsed;
}

export default async function PracticePage({ searchParams }: PracticePageProps) {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    redirect("/sign-in");
  }

  const appUser = await syncUserFromSession(session);
  const profile = await getExamProfileForUser(appUser.id);

  if (!profile) {
    redirect("/exam-goals/setup");
  }

  const params = await searchParams;
  const activePlan = await getActiveStudyPlanForUser(appUser.id);
  const context = resolvePracticeContext(
    profile,
    activePlan,
    parseRequestedWeek(params.week),
  );

  return (
    <div className="space-y-6">
      <Card className="space-y-2 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">
          Writing Practice
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
          Writing Practice
        </h1>
        <p className="text-sm leading-relaxed text-neutral-600">
          {context.subtitle}
        </p>
      </Card>

      <PracticeFlow
        context={context}
        language={profile.language as Language}
      />
    </div>
  );
}
