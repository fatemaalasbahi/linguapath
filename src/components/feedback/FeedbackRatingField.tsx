"use client";

import { useState } from "react";

import { labelClassName } from "./form-styles";

const ratings = [1, 2, 3, 4, 5] as const;

type FeedbackRatingFieldProps = {
  defaultValue?: number;
  disabled?: boolean;
};

export function FeedbackRatingField({
  defaultValue = 5,
  disabled = false,
}: FeedbackRatingFieldProps) {
  const [selectedRating, setSelectedRating] = useState(defaultValue);

  return (
    <fieldset className="space-y-3" disabled={disabled}>
      <legend className={labelClassName}>Rating</legend>
      <div className="flex flex-wrap gap-3">
        {ratings.map((rating) => {
          const isSelected = selectedRating === rating;

          return (
            <label
              key={rating}
              className={`inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors ${
                isSelected
                  ? "border-primary-600 bg-primary-50 text-primary-700"
                  : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
              } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
            >
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={isSelected}
                onChange={() => setSelectedRating(rating)}
                disabled={disabled}
                required
                className="sr-only"
                aria-label={`${rating} out of 5`}
              />
              {rating}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
