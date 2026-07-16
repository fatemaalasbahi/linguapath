import "server-only";

import { and, desc, eq, gte } from "drizzle-orm";

import { assessments, studyPlans, type Assessment, type StudyPlan } from "@/lib/db/schema";
import { db } from "@/lib/db";

import { STUDY_PLANS_PER_DAY_LIMIT } from "./constants";

export async function getLatestAssessmentForExamProfile(
  examProfileId: string,
): Promise<Assessment | null> {
  const row = await db.query.assessments.findFirst({
    where: eq(assessments.examProfileId, examProfileId),
    orderBy: [desc(assessments.createdAt)],
  });

  return row ?? null;
}

export async function getActiveStudyPlanForUser(
  userId: string,
): Promise<StudyPlan | null> {
  const row = await db.query.studyPlans.findFirst({
    where: eq(studyPlans.userId, userId),
    orderBy: [desc(studyPlans.createdAt)],
  });

  return row ?? null;
}

export async function getStudyPlanCountInLastDay(userId: string): Promise<number> {
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const rows = await db
    .select({ id: studyPlans.id })
    .from(studyPlans)
    .where(
      and(eq(studyPlans.userId, userId), gte(studyPlans.createdAt, oneDayAgo)),
    );

  return rows.length;
}

export async function isStudyPlanRateLimited(userId: string): Promise<boolean> {
  const count = await getStudyPlanCountInLastDay(userId);
  return count >= STUDY_PLANS_PER_DAY_LIMIT;
}
