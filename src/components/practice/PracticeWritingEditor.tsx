"use client";

import { useMemo } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { Language } from "@/lib/exam-profile/constants";
import {
  MAX_WRITING_UNITS,
  MIN_WRITING_UNITS,
} from "@/lib/assessment/constants";
import { countWritingUnits } from "@/lib/assessment/validation";

type PracticeWritingEditorProps = {
  language: Language;
  value: string;
  onChange: (value: string) => void;
  isSubmitting: boolean;
  error?: string;
};

export function PracticeWritingEditor({
  language,
  value,
  onChange,
  isSubmitting,
  error,
}: PracticeWritingEditorProps) {
  const unitLabel = language === "Chinese" ? "characters" : "words";
  const unitCount = useMemo(
    () => countWritingUnits(value, language),
    [value, language],
  );

  const isBelowMinimum = unitCount > 0 && unitCount < MIN_WRITING_UNITS;
  const isAboveMaximum = unitCount > MAX_WRITING_UNITS;
  const canSubmit =
    unitCount >= MIN_WRITING_UNITS &&
    unitCount <= MAX_WRITING_UNITS &&
    !isSubmitting;

  return (
    <Card className="space-y-4 p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-neutral-900">
          Your Response
        </h2>
        <span
          className={`text-sm font-medium ${
            isBelowMinimum || isAboveMaximum
              ? "text-amber-600"
              : "text-neutral-500"
          }`}
        >
          {unitCount} / {MAX_WRITING_UNITS} {unitLabel}
        </span>
      </div>

      <input type="hidden" name="response" value={value} />

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={isSubmitting}
        rows={10}
        aria-required="true"
        placeholder={`Write at least ${MIN_WRITING_UNITS} ${unitLabel} in response to the prompt above.`}
        className="min-h-[120px] w-full resize-y rounded-sm border border-neutral-200 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-60"
      />

      {isBelowMinimum ? (
        <p className="text-sm text-amber-700">
          Write at least {MIN_WRITING_UNITS} {unitLabel} before submitting.
        </p>
      ) : null}

      {isAboveMaximum ? (
        <p className="text-sm text-amber-700">
          Keep your response to {MAX_WRITING_UNITS} {unitLabel} or fewer.
        </p>
      ) : null}

      {error ? (
        <p
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={!canSubmit}
        className="w-full sm:w-auto"
      >
        {isSubmitting ? "Analyzing your response…" : "Get AI Feedback"}
      </Button>
    </Card>
  );
}
