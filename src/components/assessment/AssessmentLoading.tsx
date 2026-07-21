type AssessmentLoadingProps = {
  message?: string;
};

export function AssessmentLoading({
  message = "Analyzing your response…",
}: AssessmentLoadingProps) {
  return (
    <div
      className="flex items-center gap-3 rounded-md border border-primary-100 bg-primary-50 px-4 py-3 text-sm text-primary-800"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span
        className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-primary-600 border-t-transparent"
        aria-hidden="true"
      />
      <span>{message}</span>
    </div>
  );
}
