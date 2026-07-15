import "server-only";

import { and, desc, eq, gte } from "drizzle-orm";

import { db } from "@/lib/db";
import { assessments, type Assessment } from "@/lib/db/schema";

import { ASSESSMENTS_PER_HOUR_LIMIT } from "./constants";

export async function getAssessmentCountInLastHour(
  userId: string,
): Promise<number> {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

  const rows = await db
    .select({ id: assessments.id })
    .from(assessments)
    .where(
      and(
        eq(assessments.userId, userId),
        gte(assessments.createdAt, oneHourAgo),
      ),
    );

  return rows.length;
}

export async function isAssessmentRateLimited(userId: string): Promise<boolean> {
  const count = await getAssessmentCountInLastHour(userId);
  return count >= ASSESSMENTS_PER_HOUR_LIMIT;
}

export async function getLatestAssessmentForUser(
  userId: string,
): Promise<Assessment | null> {
  const row = await db.query.assessments.findFirst({
    where: eq(assessments.userId, userId),
    orderBy: [desc(assessments.createdAt)],
  });

  return row ?? null;
}
