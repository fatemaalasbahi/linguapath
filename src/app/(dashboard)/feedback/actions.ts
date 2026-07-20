"use server";

import { redirect } from "next/navigation";

import { auth } from "@/lib/auth/server";
import { syncUserFromSession } from "@/lib/auth/sync-user";
import { isFeedbackRateLimited } from "@/lib/feedback/queries";
import { parseFeedbackFormData } from "@/lib/feedback/schemas";
import { saveFeedback } from "@/lib/feedback/save";
import { notifyFeedbackSubmitted } from "@/lib/slack/notify";

export type FeedbackFormState = {
  error?: string;
  success?: boolean;
  slackWarning?: boolean;
};

export async function submitFeedbackAction(
  _prevState: FeedbackFormState,
  formData: FormData,
): Promise<FeedbackFormState> {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    redirect("/sign-in");
  }

  const appUser = await syncUserFromSession(session);
  const parsed = parseFeedbackFormData(formData);

  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]?.message;
    return {
      error: firstIssue ?? "Please check your feedback and try again.",
    };
  }

  if (await isFeedbackRateLimited(appUser.id)) {
    return {
      error:
        "You've reached today's feedback limit. Please try again tomorrow.",
    };
  }

  let saved;

  try {
    saved = await saveFeedback({
      userId: appUser.id,
      ...parsed.data,
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      const message =
        error instanceof Error ? error.message : "Unknown feedback save error";
      console.error("Feedback persistence failed:", message);
    }

    return {
      error: "Unable to save your feedback. Please try again.",
    };
  }

  try {
    await notifyFeedbackSubmitted(saved, {
      userEmail: appUser.email,
      userName: appUser.name,
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      const message =
        error instanceof Error ? error.message : "Unknown Slack notification error";
      console.error("Feedback Slack notification failed:", message);
    }

    return {
      success: true,
      slackWarning: true,
    };
  }

  return { success: true };
}
