import type { ExamProfile } from "@/lib/db/schema";
import {
  formatExamDate,
  getCurrentAbilityLabel,
  getCurrentAbilityTitle,
  getTargetAbilityLabel,
  getTargetAbilityTitle,
  isCurrentAbilityAssessed,
} from "@/lib/exam-profile/format";
import type { ExamType } from "@/lib/exam-profile/constants";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type ExamGoalSummaryProps = {
  profile: ExamProfile;
};

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <Card className="space-y-2 p-5">
      <p className="text-sm font-medium text-neutral-500">{label}</p>
      <p className="text-2xl font-semibold tracking-tight text-neutral-900">
        {value}
      </p>
    </Card>
  );
}

export function ExamGoalSummary({ profile }: ExamGoalSummaryProps) {
  const examType = profile.examType as ExamType;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-700">
          {profile.examType}
        </span>
        <span className="text-sm text-neutral-600">
          {profile.language} · {profile.examType} preparation
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label={getCurrentAbilityTitle(examType)}
          value={getCurrentAbilityLabel(profile)}
        />
        <StatCard
          label={getTargetAbilityTitle(examType)}
          value={getTargetAbilityLabel(profile)}
        />
        <StatCard
          label="Exam Date"
          value={formatExamDate(profile.examDate)}
        />
        <StatCard
          label="Study Hours / Week"
          value={
            profile.studyHoursPerWeek
              ? `${profile.studyHoursPerWeek} hrs`
              : "—"
          }
        />
      </div>

      {!isCurrentAbilityAssessed(profile) ? (
        <div className="space-y-3 rounded-md border border-primary-100 bg-primary-50 px-4 py-4">
          <p className="text-sm text-primary-800">
            Take the AI Diagnostic Assessment to estimate your current exam
            level.
          </p>
          <Button href="/assessment" size="sm">
            Start AI Diagnostic Assessment
          </Button>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-3">
          <Button href="/assessment" variant="secondary" size="sm">
            Retake Diagnostic Assessment
          </Button>
        </div>
      )}
    </div>
  );
}
