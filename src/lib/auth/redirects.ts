import "server-only";

import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { examProfiles } from "@/lib/db/schema";

export async function getPostAuthRedirect(appUserId: string): Promise<string> {
  const profile = await db.query.examProfiles.findFirst({
    where: eq(examProfiles.userId, appUserId),
    columns: { id: true },
  });

  return profile ? "/dashboard" : "/exam-goals/setup";
}
