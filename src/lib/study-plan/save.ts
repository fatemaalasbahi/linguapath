import "server-only";

import { db } from "@/lib/db";
import { studyPlans } from "@/lib/db/schema";

import type { StudyPlanContent } from "./schemas";

export type SaveStudyPlanInput = {
  userId: string;
  examProfileId: string;
  planContent: StudyPlanContent;
  startDate: string;
  endDate: string;
};

export async function saveStudyPlan(input: SaveStudyPlanInput): Promise<void> {
  const { userId, examProfileId, planContent, startDate, endDate } = input;

  await db.insert(studyPlans).values({
    userId,
    examProfileId,
    planContent,
    startDate,
    endDate,
  });
}
