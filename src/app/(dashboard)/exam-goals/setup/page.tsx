import { SignOutButton } from "@/components/auth/SignOutButton";
import { Card } from "@/components/ui/Card";
import { auth } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

export default async function ExamGoalSetupPage() {
  const { data: session } = await auth.getSession();

  return (
    <Card className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">
            First-time setup
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
            Set Your Exam Goal
          </h1>
          <p className="text-sm leading-relaxed text-neutral-600">
            Tell us about your exam so we can personalize your preparation.
            The exam goal form will be implemented in Phase 5.
          </p>
        </div>
        <SignOutButton />
      </div>

      {session?.user?.email && (
        <p className="text-sm text-neutral-500">
          Signed in as{" "}
          <span className="font-medium text-neutral-700">
            {session.user.email}
          </span>
        </p>
      )}
    </Card>
  );
}
