"use client";

import { useActionState } from "react";

import {
  submitFeedbackAction,
  type FeedbackFormState,
} from "@/app/(dashboard)/feedback/actions";
import { Button } from "@/components/ui/Button";

import { FeedbackCategoryField } from "./FeedbackCategoryField";
import { FeedbackLoading } from "./FeedbackLoading";
import { FeedbackMessageField } from "./FeedbackMessageField";
import { FeedbackRatingField } from "./FeedbackRatingField";
import { FeedbackSuccessAlert } from "./FeedbackSuccessAlert";

const initialState: FeedbackFormState = {};

export function FeedbackForm() {
  const [state, formAction, isPending] = useActionState(
    submitFeedbackAction,
    initialState,
  );

  if (state.success) {
    return <FeedbackSuccessAlert slackWarning={state.slackWarning} />;
  }

  return (
    <form action={formAction} className="space-y-6">
      {state.error ? (
        <div
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          {state.error}
        </div>
      ) : null}

      <FeedbackCategoryField disabled={isPending} />
      <FeedbackRatingField disabled={isPending} />
      <FeedbackMessageField disabled={isPending} />

      <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
        {isPending ? "Submitting…" : "Submit Feedback"}
      </Button>

      {isPending ? <FeedbackLoading /> : null}
    </form>
  );
}
