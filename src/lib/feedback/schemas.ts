import { z } from "zod";

import {
  FEEDBACK_CATEGORIES,
  FEEDBACK_MESSAGE_MAX_LENGTH,
  FEEDBACK_MESSAGE_MIN_LENGTH,
} from "./constants";

export const feedbackSubmissionSchema = z.object({
  feedbackType: z.enum(FEEDBACK_CATEGORIES, {
    error: "Please select a feedback type.",
  }),
  rating: z.coerce
    .number()
    .int("Rating must be a whole number.")
    .min(1, "Rating must be at least 1.")
    .max(5, "Rating must be at most 5."),
  message: z
    .string()
    .trim()
    .min(
      FEEDBACK_MESSAGE_MIN_LENGTH,
      `Message must be at least ${FEEDBACK_MESSAGE_MIN_LENGTH} characters.`,
    )
    .max(
      FEEDBACK_MESSAGE_MAX_LENGTH,
      `Message must be at most ${FEEDBACK_MESSAGE_MAX_LENGTH} characters.`,
    ),
});

export type FeedbackSubmissionInput = z.infer<typeof feedbackSubmissionSchema>;

export function parseFeedbackFormData(formData: FormData) {
  return feedbackSubmissionSchema.safeParse({
    feedbackType: formData.get("feedbackType"),
    rating: formData.get("rating"),
    message: formData.get("message"),
  });
}
