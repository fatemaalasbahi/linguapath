"use client";

import { useActionState, useState } from "react";

import type { ExamProfile } from "@/lib/db/schema";
import type { Language } from "@/lib/exam-profile/constants";
import type { AssessmentPrompt } from "@/lib/assessment/prompts";

import {
  submitAssessment,
  type AssessmentFormState,
} from "@/app/(dashboard)/assessment/actions";

import { AssessmentLoading } from "./AssessmentLoading";
import { AssessmentResults } from "./AssessmentResults";
import { PromptCard } from "./PromptCard";
import { StepIndicator } from "./StepIndicator";
import { WritingEditor } from "./WritingEditor";

type AssessmentFlowProps = {
  profile: ExamProfile;
  prompt: AssessmentPrompt;
};

const initialState: AssessmentFormState = {};

export function AssessmentFlow({ profile, prompt }: AssessmentFlowProps) {
  const [response, setResponse] = useState("");
  const [state, formAction, isPending] = useActionState(
    submitAssessment,
    initialState,
  );

  const currentStep: 1 | 2 | 3 = state.result ? 3 : 2;
  const language = profile.language as Language;

  if (state.result) {
    return (
      <div className="space-y-6">
        <StepIndicator currentStep={3} />
        <AssessmentResults result={state.result} />
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      <StepIndicator currentStep={currentStep} />
      <PromptCard prompt={prompt.prompt} />
      <WritingEditor
        language={language}
        value={response}
        onChange={setResponse}
        isSubmitting={isPending}
        error={state.error}
      />
      {isPending ? <AssessmentLoading /> : null}
    </form>
  );
}
