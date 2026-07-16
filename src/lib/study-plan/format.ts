import type { ExamProfile, StudyPlan } from "@/lib/db/schema";
import type { ExamType } from "@/lib/exam-profile/constants";
import {
  formatExamDate,
  getCurrentAbilityLabel,
  getTargetAbilityLabel,
} from "@/lib/exam-profile/format";
import { parseStoredList } from "@/lib/assessment/validation";

import { getCurrentWeekNumber } from "./dates";
import type { StudyPlanContent, StudyPlanTask, StudyPlanWeek } from "./schemas";

export function getStudyPlanSubtitle(profile: ExamProfile): string {
  const examType = profile.examType as ExamType;
  const target = getTargetAbilityLabel(profile);
  const examDate = formatExamDate(profile.examDate);

  return `${examType} · Target ${target} · Exam ${examDate}`;
}

export function formatPlanDateRange(startDate: string, endDate: string): string {
  const format = (value: string) => {
    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return `${format(startDate)} – ${format(endDate)}`;
}

export function getSkillLabel(skill: StudyPlanTask["skill"]): string {
  switch (skill) {
    case "writing":
      return "Writing";
    case "vocabulary":
      return "Vocabulary";
    case "grammar":
      return "Grammar";
    case "reading":
      return "Reading";
    case "listening":
      return "Listening";
    case "speaking":
      return "Speaking";
  }
}

export function hasPlanGoalsChanged(
  plan: StudyPlanContent,
  profile: ExamProfile,
): boolean {
  const currentAbility = getCurrentAbilityLabel(profile);
  const targetAbility = getTargetAbilityLabel(profile);

  return (
    plan.currentAbility !== currentAbility ||
    plan.targetAbility !== targetAbility ||
    plan.recommendedHoursPerWeek !== (profile.studyHoursPerWeek ?? 0) ||
    plan.examType !== profile.examType ||
    plan.language !== profile.language
  );
}

export function getCurrentPlanWeek(plan: StudyPlan): StudyPlanWeek | null {
  const content = plan.planContent as StudyPlanContent;

  if (!plan.startDate) {
    return content.weeks[0] ?? null;
  }

  const currentWeekNumber = getCurrentWeekNumber(
    plan.startDate,
    content.totalWeeks,
  );

  return (
    content.weeks.find((week) => week.weekNumber === currentWeekNumber) ??
    content.weeks[content.weeks.length - 1] ??
    null
  );
}

export function getPriorityTasksForWeek(
  week: StudyPlanWeek,
  limit = 2,
): StudyPlanTask[] {
  const interactiveTasks = week.tasks.filter((task) => task.isInteractive);
  const otherTasks = week.tasks.filter((task) => !task.isInteractive);

  return [...interactiveTasks, ...otherTasks].slice(0, limit);
}

export function getWritingTaskForWeek(
  week: StudyPlanWeek,
): StudyPlanTask | null {
  return week.tasks.find((task) => task.skill === "writing") ?? null;
}

export function getDiagnosticInsights(assessment: {
  strengths: string | null;
  weaknesses: string | null;
  recommendations: string | null;
}) {
  return {
    strengths: parseStoredList(assessment.strengths),
    weaknesses: parseStoredList(assessment.weaknesses),
    recommendations: parseStoredList(assessment.recommendations),
  };
}
