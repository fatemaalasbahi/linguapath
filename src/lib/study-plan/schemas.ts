import { z } from "zod";

import { LANGUAGES, EXAM_TYPES } from "@/lib/exam-profile/constants";
import type { ExamProfile } from "@/lib/db/schema";

export const studyPlanSkillSchema = z.enum([
  "writing",
  "vocabulary",
  "grammar",
  "reading",
  "listening",
  "speaking",
]);

export const studyPlanTaskSchema = z.object({
  skill: studyPlanSkillSchema,
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(1000),
  estimatedMinutes: z.number().int().min(5).max(240),
  isInteractive: z.boolean(),
});

export const studyPlanWeekSchema = z.object({
  weekNumber: z.number().int().min(1).max(52),
  title: z.string().min(1).max(200),
  focus: z.string().min(1).max(500),
  tasks: z.array(studyPlanTaskSchema).min(1).max(8),
});

export const studyPlanContentSchema = z.object({
  title: z.string().min(1).max(200),
  summary: z.string().min(1).max(2000),
  examType: z.enum(EXAM_TYPES),
  language: z.enum(LANGUAGES),
  currentAbility: z.string().min(1).max(50),
  targetAbility: z.string().min(1).max(50),
  recommendedHoursPerWeek: z.number().int().min(1).max(40),
  totalWeeks: z.number().int().min(1).max(52),
  strengthsToMaintain: z.array(z.string().min(1).max(300)).min(1).max(5),
  priorityWeaknesses: z.array(z.string().min(1).max(300)).min(1).max(5),
  weeks: z.array(studyPlanWeekSchema).min(1).max(52),
});

export type StudyPlanContent = z.infer<typeof studyPlanContentSchema>;
export type StudyPlanWeek = z.infer<typeof studyPlanWeekSchema>;
export type StudyPlanTask = z.infer<typeof studyPlanTaskSchema>;

export function normalizeStudyPlanTasks(plan: StudyPlanContent): StudyPlanContent {
  return {
    ...plan,
    weeks: plan.weeks.map((week) => ({
      ...week,
      tasks: week.tasks.map((task) => ({
        ...task,
        isInteractive: task.skill === "writing",
      })),
    })),
  };
}

export function validateStudyPlanForProfile(
  plan: StudyPlanContent,
  profile: ExamProfile,
  totalWeeks: number,
  detailedWeeks: number,
  expectedHoursPerWeek: number,
):
  | { valid: true; data: StudyPlanContent }
  | { valid: false; error: string } {
  if (plan.examType !== profile.examType) {
    return { valid: false, error: "Plan exam type does not match profile." };
  }

  if (plan.language !== profile.language) {
    return { valid: false, error: "Plan language does not match profile." };
  }

  if (plan.totalWeeks !== totalWeeks) {
    return { valid: false, error: "Plan total weeks do not match schedule." };
  }

  if (plan.weeks.length !== detailedWeeks) {
    return {
      valid: false,
      error: "Plan detailed week count does not match schedule.",
    };
  }

  if (plan.recommendedHoursPerWeek !== expectedHoursPerWeek) {
    return {
      valid: false,
      error: "Plan recommended hours do not match profile.",
    };
  }

  for (let index = 0; index < plan.weeks.length; index += 1) {
    const week = plan.weeks[index];

    if (week.weekNumber !== index + 1) {
      return { valid: false, error: "Plan week numbers are not sequential." };
    }
  }

  return { valid: true, data: plan };
}
