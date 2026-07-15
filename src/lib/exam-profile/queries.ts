import "server-only";

import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { examProfiles, type ExamProfile } from "@/lib/db/schema";

export async function getExamProfileForUser(
  userId: string,
): Promise<ExamProfile | null> {
  const profile = await db.query.examProfiles.findFirst({
    where: eq(examProfiles.userId, userId),
  });

  return profile ?? null;
}
