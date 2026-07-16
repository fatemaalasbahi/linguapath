import "server-only";

import { db } from "@/lib/db";
import { practiceSubmissions, progress } from "@/lib/db/schema";

import {
  ACTIVITY_TYPE_WRITING_PRACTICE,
  PRACTICE_TYPE_WRITING,
} from "./constants";
import type { PracticeFeedbackResult } from "./schemas";

export type SavePracticeInput = {
  userId: string;
  examProfileId: string;
  studentResponse: string;
  feedback: PracticeFeedbackResult;
};

function buildProgressNotes(feedback: PracticeFeedbackResult): string {
  const focus = feedback.areasToImprove[0] ?? feedback.nextPracticeRecommendation;
  const estimate =
    feedback.estimatedScore != null
      ? `Estimated score ${feedback.estimatedScore}.`
      : `Estimated level ${feedback.estimatedLevel}.`;

  return `${estimate} ${focus}`.slice(0, 500);
}

export async function savePracticeSubmission(
  input: SavePracticeInput,
): Promise<void> {
  const { userId, examProfileId, studentResponse, feedback } = input;

  await db.batch([
    db.insert(practiceSubmissions).values({
      userId,
      examProfileId,
      submissionType: PRACTICE_TYPE_WRITING,
      studentResponse,
      aiFeedback: JSON.stringify(feedback),
      score: feedback.estimatedScore,
      level: feedback.estimatedLevel,
    }),
    db.insert(progress).values({
      userId,
      examProfileId,
      activityType: ACTIVITY_TYPE_WRITING_PRACTICE,
      score: feedback.estimatedScore,
      level: feedback.estimatedLevel,
      notes: buildProgressNotes(feedback),
    }),
  ]);
}
