import {
  FEEDBACK_CATEGORIES,
  FEEDBACK_CATEGORY_LABELS,
  type FeedbackCategory,
} from "@/lib/feedback/constants";

import { fieldClassName, labelClassName } from "./form-styles";

type FeedbackCategoryFieldProps = {
  defaultValue?: FeedbackCategory;
  disabled?: boolean;
};

export function FeedbackCategoryField({
  defaultValue = "comment",
  disabled = false,
}: FeedbackCategoryFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="feedbackType" className={labelClassName}>
        Feedback type
      </label>
      <select
        id="feedbackType"
        name="feedbackType"
        defaultValue={defaultValue}
        disabled={disabled}
        required
        className={fieldClassName}
      >
        {FEEDBACK_CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {FEEDBACK_CATEGORY_LABELS[category]}
          </option>
        ))}
      </select>
    </div>
  );
}
