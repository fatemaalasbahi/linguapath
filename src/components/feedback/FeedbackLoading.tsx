export function FeedbackLoading() {
  return (
    <div
      className="rounded-md border border-primary-200 bg-primary-50 px-4 py-3 text-sm text-primary-800"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      Submitting your feedback…
    </div>
  );
}
