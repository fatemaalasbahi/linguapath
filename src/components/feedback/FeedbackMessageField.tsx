import { FEEDBACK_MESSAGE_MAX_LENGTH } from "@/lib/feedback/constants";

import { labelClassName, textareaClassName } from "./form-styles";

type FeedbackMessageFieldProps = {
  disabled?: boolean;
};

export function FeedbackMessageField({ disabled = false }: FeedbackMessageFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="message" className={labelClassName}>
        Message
      </label>
      <textarea
        id="message"
        name="message"
        required
        minLength={10}
        maxLength={FEEDBACK_MESSAGE_MAX_LENGTH}
        disabled={disabled}
        placeholder="Tell us what worked well or what we should improve."
        className={textareaClassName}
      />
      <p className="text-xs text-neutral-500">
        {FEEDBACK_MESSAGE_MAX_LENGTH} characters maximum.
      </p>
    </div>
  );
}
