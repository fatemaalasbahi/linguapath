export const FEEDBACK_CATEGORIES = [
  "comment",
  "suggestion",
  "bug_report",
] as const;

export type FeedbackCategory = (typeof FEEDBACK_CATEGORIES)[number];

export const FEEDBACK_CATEGORY_LABELS: Record<FeedbackCategory, string> = {
  comment: "Comment",
  suggestion: "Suggestion",
  bug_report: "Bug Report",
};

export const FEEDBACK_SUBMISSIONS_PER_DAY_LIMIT = 5;
export const FEEDBACK_MESSAGE_MIN_LENGTH = 10;
export const FEEDBACK_MESSAGE_MAX_LENGTH = 2000;
export const FEEDBACK_STATUS_NEW = "new";
