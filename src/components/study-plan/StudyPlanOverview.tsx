import { Card } from "@/components/ui/Card";
import type { ExamProfile } from "@/lib/db/schema";
import {
  formatPlanDateRange,
  getStudyPlanSubtitle,
} from "@/lib/study-plan/format";
import type { StudyPlanContent } from "@/lib/study-plan/schemas";

type StudyPlanOverviewProps = {
  profile: ExamProfile;
  planContent: StudyPlanContent;
  startDate: string;
  endDate: string;
  goalsChanged?: boolean;
};

export function StudyPlanOverview({
  profile,
  planContent,
  startDate,
  endDate,
  goalsChanged = false,
}: StudyPlanOverviewProps) {
  return (
    <div className="space-y-4">
      <Card className="space-y-4 border-l-4 border-l-accent-500 p-5">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">
            AI-generated Study Plan
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
            {planContent.title}
          </h2>
          <p className="text-sm text-neutral-600">
            {getStudyPlanSubtitle(profile)}
          </p>
        </div>
        <p className="text-sm leading-relaxed text-neutral-700">
          {planContent.summary}
        </p>
        {planContent.weeks.length < planContent.totalWeeks ? (
          <p className="text-sm text-neutral-600">
            This plan covers your full {planContent.totalWeeks}-week schedule.
            Weeks 1–{planContent.weeks.length} are detailed below. Regenerate
            later as you progress for updated recommendations.
          </p>
        ) : null}
      </Card>

      <Card className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
            Schedule
          </p>
          <p className="text-sm font-semibold text-neutral-900">
            {formatPlanDateRange(startDate, endDate)}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
            Duration
          </p>
          <p className="text-sm font-semibold text-neutral-900">
            {planContent.totalWeeks} weeks
            {planContent.weeks.length < planContent.totalWeeks
              ? ` (${planContent.weeks.length} detailed now)`
              : ""}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
            Study Hours
          </p>
          <p className="text-sm font-semibold text-neutral-900">
            {planContent.recommendedHoursPerWeek} hrs / week
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
            Goal
          </p>
          <p className="text-sm font-semibold text-neutral-900">
            {planContent.currentAbility} → {planContent.targetAbility}
          </p>
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="space-y-3 p-5">
          <h3 className="text-sm font-semibold text-neutral-900">
            Strengths to Maintain
          </h3>
          <ul className="space-y-2 text-sm text-neutral-700">
            {planContent.strengthsToMaintain.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-primary-600" aria-hidden="true">
                  •
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="space-y-3 p-5">
          <h3 className="text-sm font-semibold text-neutral-900">
            Priority Weaknesses
          </h3>
          <ul className="space-y-2 text-sm text-neutral-700">
            {planContent.priorityWeaknesses.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-primary-600" aria-hidden="true">
                  •
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {goalsChanged ? (
        <p
          className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800"
          role="status"
        >
          Your exam goals changed since this plan was created. Regenerate your
          plan for an updated schedule.
        </p>
      ) : null}
    </div>
  );
}
