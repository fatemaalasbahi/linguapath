"use client";

import { useActionState, useEffect, useState } from "react";

import type { PracticeDisplayResult } from "@/lib/ai/types";
import type { ResolvedPracticeContext } from "@/lib/practice/context";
import type { Language } from "@/lib/exam-profile/constants";

import {
  submitPracticeAction,
  type PracticeFormState,
} from "@/app/(dashboard)/practice/actions";

import { PracticeLoading } from "./PracticeLoading";
import { PracticePromptCard } from "./PracticePromptCard";
import { PracticeResults } from "./PracticeResults";
import { PracticeWritingEditor } from "./PracticeWritingEditor";

type PracticeFlowProps = {
  context: ResolvedPracticeContext;
  language: Language;
};

const initialState: PracticeFormState = {};

export function PracticeFlow({ context, language }: PracticeFlowProps) {
  const [response, setResponse] = useState("");
  const [formKey, setFormKey] = useState(0);
  const [completedResult, setCompletedResult] =
    useState<PracticeDisplayResult | null>(null);
  const [state, formAction, isPending] = useActionState(
    submitPracticeAction,
    initialState,
  );

  useEffect(() => {
    if (state.result) {
      setCompletedResult(state.result);
    }
  }, [state.result]);

  if (completedResult) {
    return (
      <PracticeResults
        result={completedResult}
        onPracticeAgain={() => {
          setCompletedResult(null);
          setResponse("");
          setFormKey((current) => current + 1);
        }}
      />
    );
  }

  return (
    <form key={formKey} action={formAction} className="space-y-6">
      <PracticePromptCard context={context} />
      {context.weekContext.weekNumber ? (
        <input
          type="hidden"
          name="weekNumber"
          value={context.weekContext.weekNumber}
        />
      ) : null}
      <PracticeWritingEditor
        language={language}
        value={response}
        onChange={setResponse}
        isSubmitting={isPending}
        error={state.error}
      />
      {isPending ? <PracticeLoading /> : null}
    </form>
  );
}
