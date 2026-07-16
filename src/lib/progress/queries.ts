import "server-only";

import { and, desc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import {
  assessments,
  progress,
  type Assessment,
  type ProgressRecord,
} from "@/lib/db/schema";

export async function getProgressRecordsForUser(
  userId: string,
  limit = 20,
): Promise<ProgressRecord[]> {
  return db.query.progress.findMany({
    where: eq(progress.userId, userId),
    orderBy: [desc(progress.completedAt)],
    limit,
  });
}

export async function getAssessmentsForUser(
  userId: string,
  limit = 10,
): Promise<Assessment[]> {
  return db.query.assessments.findMany({
    where: eq(assessments.userId, userId),
    orderBy: [desc(assessments.createdAt)],
    limit,
  });
}

export async function getFirstAssessmentForUser(
  userId: string,
): Promise<Assessment | null> {
  const rows = await db.query.assessments.findMany({
    where: eq(assessments.userId, userId),
    orderBy: [assessments.createdAt],
    limit: 1,
  });

  return rows[0] ?? null;
}

export async function getWritingPracticeProgressForUser(
  userId: string,
  limit = 20,
): Promise<ProgressRecord[]> {
  return db.query.progress.findMany({
    where: and(
      eq(progress.userId, userId),
      eq(progress.activityType, "writing_practice"),
    ),
    orderBy: [desc(progress.completedAt)],
    limit,
  });
}
