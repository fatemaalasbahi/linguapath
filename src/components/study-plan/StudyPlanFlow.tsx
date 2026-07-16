"use client";

import { useActionState } from "react";

import type { ExamProfile, StudyPlan } from "@/lib/db/schema";
import { hasPlanGoalsChanged } from "@/lib/study-plan/format";
import type { StudyPlanContent } from "@/lib/study-plan/schemas";

import {
  generateStudyPlanAction,
  type StudyPlanFormState,
} from "@/app/(dashboard)/study-plan/actions";

import { StudyPlanDisplay } from "./StudyPlanDisplay";
import { StudyPlanEmpty } from "./StudyPlanEmpty";
import { StudyPlanLoading } from "./StudyPlanLoading";

type StudyPlanFlowProps = {
  profile: ExamProfile;
  initialPlan: StudyPlan | null;
};

const initialState: StudyPlanFormState = {};

export function StudyPlanFlow({ profile, initialPlan }: StudyPlanFlowProps) {
  const [state, formAction, isPending] = useActionState(
    generateStudyPlanAction,
    initialState,
  );

  const activePlan =
    state.plan ??
    (initialPlan
      ? {
          planContent: initialPlan.planContent as StudyPlanContent,
          startDate: initialPlan.startDate ?? "",
          endDate: initialPlan.endDate ?? "",
        }
      : null);

  const goalsChanged = activePlan
    ? hasPlanGoalsChanged(activePlan.planContent, profile)
    : false;

  if (isPending) {
    return <StudyPlanLoading />;
  }

  if (activePlan?.startDate && activePlan.endDate) {
    return (
      <form action={formAction} className="space-y-6">
        <StudyPlanDisplay
          profile={profile}
          planContent={activePlan.planContent}
          startDate={activePlan.startDate}
          endDate={activePlan.endDate}
          goalsChanged={goalsChanged}
          isRegenerating={false}
          regenerateError={state.error}
        />
      </form>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      <StudyPlanEmpty error={state.error} />
    </form>
  );
}
