import { Button } from "@/components/ui/Button";
import type { ExamProfile } from "@/lib/db/schema";
import { getCurrentWeekNumber } from "@/lib/study-plan/dates";
import type { StudyPlanContent } from "@/lib/study-plan/schemas";

import { StudyPlanOverview } from "./StudyPlanOverview";
import { StudyPlanWeekCard } from "./StudyPlanWeekCard";

type StudyPlanDisplayProps = {
  profile: ExamProfile;
  planContent: StudyPlanContent;
  startDate: string;
  endDate: string;
  goalsChanged?: boolean;
  showRegenerate?: boolean;
  isRegenerating?: boolean;
  regenerateError?: string;
};

export function StudyPlanDisplay({
  profile,
  planContent,
  startDate,
  endDate,
  goalsChanged = false,
  showRegenerate = true,
  isRegenerating = false,
  regenerateError,
}: StudyPlanDisplayProps) {
  const currentWeekNumber = getCurrentWeekNumber(
    startDate,
    planContent.totalWeeks,
  );

  return (
    <div className="space-y-6">
      <StudyPlanOverview
        profile={profile}
        planContent={planContent}
        startDate={startDate}
        endDate={endDate}
        goalsChanged={goalsChanged}
      />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-neutral-900">Weekly Plan</h3>
        <div className="space-y-3">
          {planContent.weeks.map((week) => (
            <StudyPlanWeekCard
              key={week.weekNumber}
              week={week}
              isCurrentWeek={week.weekNumber === currentWeekNumber}
            />
          ))}
        </div>
      </div>

      {regenerateError ? (
        <p
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          {regenerateError}
        </p>
      ) : null}

      {showRegenerate ? (
        <Button
          type="submit"
          variant="secondary"
          disabled={isRegenerating}
          className="w-full sm:w-auto"
        >
          {isRegenerating ? "Regenerating plan…" : "Regenerate Plan"}
        </Button>
      ) : null}
    </div>
  );
}
