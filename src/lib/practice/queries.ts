import "server-only";

import { and, desc, eq, gte } from "drizzle-orm";

import { db } from "@/lib/db";
import {
  practiceSubmissions,
  type PracticeSubmission,
} from "@/lib/db/schema";

import { PRACTICE_EVALUATIONS_PER_DAY_LIMIT } from "./constants";

export async function getPracticeCountInLastDay(userId: string): Promise<number> {
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const rows = await db
    .select({ id: practiceSubmissions.id })
    .from(practiceSubmissions)
    .where(
      and(
        eq(practiceSubmissions.userId, userId),
        gte(practiceSubmissions.createdAt, oneDayAgo),
      ),
    );

  return rows.length;
}

export async function isPracticeRateLimited(userId: string): Promise<boolean> {
  const count = await getPracticeCountInLastDay(userId);
  return count >= PRACTICE_EVALUATIONS_PER_DAY_LIMIT;
}

export async function getLatestPracticeSubmissionForUser(
  userId: string,
): Promise<PracticeSubmission | null> {
  const row = await db.query.practiceSubmissions.findFirst({
    where: eq(practiceSubmissions.userId, userId),
    orderBy: [desc(practiceSubmissions.createdAt)],
  });

  return row ?? null;
}

export async function getPracticeSubmissionsForUser(
  userId: string,
  limit = 20,
): Promise<PracticeSubmission[]> {
  return db.query.practiceSubmissions.findMany({
    where: eq(practiceSubmissions.userId, userId),
    orderBy: [desc(practiceSubmissions.createdAt)],
    limit,
  });
}

export async function getFirstPracticeSubmissionForUser(
  userId: string,
): Promise<PracticeSubmission | null> {
  const rows = await db.query.practiceSubmissions.findMany({
    where: eq(practiceSubmissions.userId, userId),
    orderBy: [practiceSubmissions.createdAt],
    limit: 1,
  });

  return rows[0] ?? null;
}
