import "server-only";

import {
  FEEDBACK_CATEGORY_LABELS,
  type FeedbackCategory,
} from "@/lib/feedback/constants";
import type { SavedFeedback } from "@/lib/feedback/save";

import { sanitizeSlackPlainText } from "./sanitize";

export type FeedbackSlackContext = {
  userEmail: string;
  userName: string | null;
};

export function buildFeedbackSlackBlocks(
  saved: SavedFeedback,
  context: FeedbackSlackContext,
) {
  const categoryLabel =
    FEEDBACK_CATEGORY_LABELS[saved.feedbackType as FeedbackCategory] ??
    saved.feedbackType;
  const displayName = sanitizeSlackPlainText(context.userName ?? "Unknown user");
  const email = sanitizeSlackPlainText(context.userEmail);
  const message = sanitizeSlackPlainText(saved.message);
  const ratingStars = "★".repeat(saved.rating) + "☆".repeat(5 - saved.rating);

  return {
    text: `New LinguaPath feedback: ${categoryLabel}`,
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "New LinguaPath Feedback",
          emoji: true,
        },
      },
      {
        type: "section",
        fields: [
          {
            type: "plain_text",
            text: `Type: ${categoryLabel}`,
          },
          {
            type: "plain_text",
            text: `Rating: ${saved.rating}/5 (${ratingStars})`,
          },
          {
            type: "plain_text",
            text: `From: ${displayName}`,
          },
          {
            type: "plain_text",
            text: `Email: ${email}`,
          },
        ],
      },
      {
        type: "section",
        text: {
          type: "plain_text",
          text: message,
        },
      },
      {
        type: "context",
        elements: [
          {
            type: "plain_text",
            text: `Feedback ID: ${saved.id}`,
          },
        ],
      },
    ],
  };
}
