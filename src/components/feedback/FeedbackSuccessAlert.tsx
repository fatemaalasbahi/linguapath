type FeedbackSuccessAlertProps = {
  slackWarning?: boolean;
};

export function FeedbackSuccessAlert({ slackWarning = false }: FeedbackSuccessAlertProps) {
  return (
    <div
      className="space-y-2 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
      role="status"
      aria-live="polite"
    >
      <p className="font-medium">Thank you! Your feedback was received.</p>
      {slackWarning ? (
        <p className="text-green-700">
          We saved your feedback, but the team notification could not be sent.
        </p>
      ) : null}
    </div>
  );
}
