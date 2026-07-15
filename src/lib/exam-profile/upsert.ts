import "server-only";

import { db } from "@/lib/db";
import { examProfiles, type ExamProfile } from "@/lib/db/schema";

import {
  EXAM_SCORING_MODEL,
  type ExamType,
  type HskLevel,
  type Language,
} from "./constants";

export type ExamGoalInput = {
  language: Language;
  examType: ExamType;
  currentScore: number | null;
  targetScore: number | null;
  currentLevel: HskLevel | null;
  targetLevel: HskLevel | null;
  examDate: string;
  studyHoursPerWeek: number;
};

export async function upsertExamProfile(
  userId: string,
  input: ExamGoalInput,
): Promise<ExamProfile> {
  const scoringModel = EXAM_SCORING_MODEL[input.examType];

  const values = {
    language: input.language,
    examType: input.examType,
    scoringModel,
    currentScore: scoringModel === "numeric" ? input.currentScore : null,
    targetScore: scoringModel === "numeric" ? input.targetScore : null,
    currentLevel: scoringModel === "level" ? input.currentLevel : null,
    targetLevel: scoringModel === "level" ? input.targetLevel : null,
    examDate: input.examDate,
    studyHoursPerWeek: input.studyHoursPerWeek,
  };

  const [profile] = await db
    .insert(examProfiles)
    .values({
      userId,
      ...values,
    })
    .onConflictDoUpdate({
      target: examProfiles.userId,
      set: values,
    })
    .returning();

  return profile;
}
