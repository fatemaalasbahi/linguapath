import "server-only";

import { and, eq, gte } from "drizzle-orm";

import { db } from "@/lib/db";
import { feedback } from "@/lib/db/schema";

import { FEEDBACK_SUBMISSIONS_PER_DAY_LIMIT } from "./constants";

export async function getFeedbackCountInLastDay(userId: string): Promise<number> {
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const rows = await db
    .select({ id: feedback.id })
    .from(feedback)
    .where(
      and(eq(feedback.userId, userId), gte(feedback.createdAt, oneDayAgo)),
    );

  return rows.length;
}

export async function isFeedbackRateLimited(userId: string): Promise<boolean> {
  const count = await getFeedbackCountInLastDay(userId);
  return count >= FEEDBACK_SUBMISSIONS_PER_DAY_LIMIT;
}
