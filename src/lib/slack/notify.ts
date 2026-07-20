import "server-only";

import type { SavedFeedback } from "@/lib/feedback/save";

import {
  buildFeedbackSlackBlocks,
  type FeedbackSlackContext,
} from "./format";

function getSlackWebhookUrl(): string | null {
  const url = process.env.SLACK_WEBHOOK_URL?.trim();
  return url ? url : null;
}

export async function notifyFeedbackSubmitted(
  saved: SavedFeedback,
  context: FeedbackSlackContext,
): Promise<void> {
  const webhookUrl = getSlackWebhookUrl();

  if (!webhookUrl) {
    if (process.env.NODE_ENV === "development") {
      console.warn("SLACK_WEBHOOK_URL is not configured; skipping Slack notification.");
    }
    return;
  }

  const payload = buildFeedbackSlackBlocks(saved, context);

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(
      `Slack webhook failed with status ${response.status}${body ? `: ${body}` : ""}`,
    );
  }
}
