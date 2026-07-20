import "server-only";

import { db } from "@/lib/db";
import { feedback } from "@/lib/db/schema";

import { FEEDBACK_STATUS_NEW } from "./constants";
import type { FeedbackSubmissionInput } from "./schemas";

export type SaveFeedbackInput = FeedbackSubmissionInput & {
  userId: string;
};

export type SavedFeedback = {
  id: string;
  feedbackType: string;
  rating: number;
  message: string;
  createdAt: Date;
};

export async function saveFeedback(
  input: SaveFeedbackInput,
): Promise<SavedFeedback> {
  const [row] = await db
    .insert(feedback)
    .values({
      userId: input.userId,
      feedbackType: input.feedbackType,
      rating: input.rating,
      message: input.message,
      status: FEEDBACK_STATUS_NEW,
    })
    .returning({
      id: feedback.id,
      feedbackType: feedback.feedbackType,
      rating: feedback.rating,
      message: feedback.message,
      createdAt: feedback.createdAt,
    });

  if (!row) {
    throw new Error("Failed to save feedback.");
  }

  return row;
}
