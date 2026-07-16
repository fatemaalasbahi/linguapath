import type { ExamProfile, PracticeSubmission, StudyPlan } from "@/lib/db/schema";
import { isCurrentAbilityAssessed } from "@/lib/exam-profile/format";
import {
  getCurrentPlanWeek,
  getWritingTaskForWeek,
} from "@/lib/study-plan/format";

export type RecommendedAction = {
  title: string;
  description: string;
  href: string;
  buttonLabel: string;
  priority: number;
};

export function getNextRecommendedAction(input: {
  profile: ExamProfile;
  activePlan: StudyPlan | null;
  latestPractice: PracticeSubmission | null;
}): RecommendedAction {
  const { profile, activePlan, latestPractice } = input;

  if (!isCurrentAbilityAssessed(profile)) {
    return {
      title: "Complete your diagnostic assessment",
      description:
        "Estimate your current exam readiness first. You can still start writing practice at any time.",
      href: "/assessment",
      buttonLabel: "Start Diagnostic Assessment",
      priority: 1,
    };
  }

  if (!activePlan) {
    return {
      title: "Generate your study plan",
      description:
        "Create a personalized weekly plan to guide your writing practice.",
      href: "/study-plan",
      buttonLabel: "Generate Study Plan",
      priority: 2,
    };
  }

  const currentWeek = getCurrentPlanWeek(activePlan);
  const writingTask = currentWeek ? getWritingTaskForWeek(currentWeek) : null;

  if (writingTask) {
    const weekNumber = currentWeek?.weekNumber;
    const href =
      weekNumber != null ? `/practice?week=${weekNumber}` : "/practice";

    return {
      title: "Start this week's writing practice",
      description: `${writingTask.title} — ${writingTask.estimatedMinutes} min`,
      href,
      buttonLabel: "Start Writing Practice",
      priority: 3,
    };
  }

  if (latestPractice) {
    return {
      title: "Review your progress",
      description:
        "See how your latest practice estimates compare with your baseline and target.",
      href: "/progress",
      buttonLabel: "View Progress",
      priority: 4,
    };
  }

  return {
    title: "Start writing practice",
    description:
      "Submit a writing response and receive AI feedback for your exam goal.",
    href: "/practice",
    buttonLabel: "Start Writing Practice",
    priority: 3,
  };
}

export function getPracticeHrefForPlan(plan: StudyPlan): string {
  const currentWeek = getCurrentPlanWeek(plan);

  if (!currentWeek) {
    return "/practice";
  }

  return `/practice?week=${currentWeek.weekNumber}`;
}

export function planHasCurrentWeekWritingTask(plan: StudyPlan): boolean {
  const currentWeek = getCurrentPlanWeek(plan);

  if (!currentWeek) {
    return false;
  }

  return getWritingTaskForWeek(currentWeek) != null;
}

export function getDashboardProgressLabel(
  progressPercentage: number | null,
): string | null {
  if (progressPercentage == null) {
    return null;
  }

  return `${progressPercentage}% toward target`;
}
