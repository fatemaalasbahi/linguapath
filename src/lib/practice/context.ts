import "server-only";

import type { ExamProfile, StudyPlan } from "@/lib/db/schema";
import type { ExamType } from "@/lib/exam-profile/constants";
import { getCurrentPlanWeek, getWritingTaskForWeek } from "@/lib/study-plan/format";
import type { StudyPlanContent } from "@/lib/study-plan/schemas";

import { selectPracticePrompt, type PracticePrompt } from "./prompts";

export type PracticeWeekContext = {
  weekNumber: number | null;
  weekFocus: string | null;
  taskTitle: string | null;
  taskDescription: string | null;
};

export type ResolvedPracticeContext = {
  examType: ExamType;
  language: ExamProfile["language"];
  weekContext: PracticeWeekContext;
  prompt: PracticePrompt;
  subtitle: string;
  hasStudyPlan: boolean;
  usingFallbackContext: boolean;
};

function buildSubtitle(
  examType: ExamType,
  weekContext: PracticeWeekContext,
): string {
  if (weekContext.weekNumber) {
    return `Week ${weekContext.weekNumber} · ${examType}`;
  }

  return `General writing practice · ${examType}`;
}

function resolveWeekNumber(
  plan: StudyPlan | null,
  requestedWeek?: number | null,
): number | null {
  if (!plan?.startDate) {
    return null;
  }

  const content = plan.planContent as StudyPlanContent;

  if (requestedWeek != null) {
    const exists = content.weeks.some((week) => week.weekNumber === requestedWeek);
    return exists ? requestedWeek : null;
  }

  const currentWeek = getCurrentPlanWeek(plan);
  return currentWeek?.weekNumber ?? null;
}

export function resolvePracticeContext(
  profile: ExamProfile,
  plan: StudyPlan | null,
  requestedWeek?: number | null,
): ResolvedPracticeContext {
  const examType = profile.examType as ExamType;
  let weekContext: PracticeWeekContext = {
    weekNumber: null,
    weekFocus: null,
    taskTitle: null,
    taskDescription: null,
  };

  let usingFallbackContext = true;

  if (plan) {
    const weekNumber = resolveWeekNumber(plan, requestedWeek);
    const week =
      weekNumber != null
        ? (plan.planContent as StudyPlanContent).weeks.find(
            (item) => item.weekNumber === weekNumber,
          ) ?? null
        : getCurrentPlanWeek(plan);

    if (week) {
      const writingTask = getWritingTaskForWeek(week);
      weekContext = {
        weekNumber: week.weekNumber,
        weekFocus: week.focus,
        taskTitle: writingTask?.title ?? null,
        taskDescription: writingTask?.description ?? null,
      };
      usingFallbackContext = !writingTask;
    }
  }

  const prompt = selectPracticePrompt(examType, weekContext.weekFocus);

  return {
    examType,
    language: profile.language,
    weekContext,
    prompt,
    subtitle: buildSubtitle(examType, weekContext),
    hasStudyPlan: plan != null,
    usingFallbackContext,
  };
}
