import { z } from "zod";

import { HSK_LEVELS } from "@/lib/exam-profile/constants";
import type { ExamType } from "@/lib/exam-profile/constants";

export const practiceConfidenceSchema = z.enum(["low", "medium", "high"]);

export const skillFeedbackStatusSchema = z.enum([
  "strength",
  "needs_attention",
  "recommended_focus",
]);

export const practiceFeedbackResultSchema = z.object({
  estimatedScore: z.number().int().nullable(),
  estimatedLevel: z.enum(HSK_LEVELS).nullable(),
  grammarFeedback: z.string().min(1).max(2000),
  vocabularyFeedback: z.string().min(1).max(2000),
  structureFeedback: z.string().min(1).max(2000),
  grammarStatus: skillFeedbackStatusSchema,
  vocabularyStatus: skillFeedbackStatusSchema,
  structureStatus: skillFeedbackStatusSchema,
  strengths: z.array(z.string().min(1).max(500)).min(1).max(5),
  areasToImprove: z.array(z.string().min(1).max(500)).min(1).max(5),
  correctedExamples: z.array(z.string().min(1).max(1000)).min(1).max(3),
  nextPracticeRecommendation: z.string().min(1).max(1000),
  confidence: practiceConfidenceSchema,
});

export type PracticeFeedbackResult = z.infer<typeof practiceFeedbackResultSchema>;
export type PracticeConfidence = z.infer<typeof practiceConfidenceSchema>;
export type SkillFeedbackStatus = z.infer<typeof skillFeedbackStatusSchema>;

export function normalizePracticeFeedbackForExam(
  result: PracticeFeedbackResult,
  examType: ExamType,
): PracticeFeedbackResult {
  if (examType === "DET") {
    return {
      ...result,
      estimatedLevel: null,
    };
  }

  return {
    ...result,
    estimatedScore: null,
  };
}

export function validatePracticeFeedbackForExam(
  result: PracticeFeedbackResult,
  examType: ExamType,
):
  | { valid: true; data: PracticeFeedbackResult }
  | { valid: false; error: string } {
  if (examType === "DET") {
    if (result.estimatedScore === null) {
      return { valid: false, error: "Missing estimated DET score." };
    }

    if (result.estimatedLevel !== null) {
      return {
        valid: false,
        error: "DET practice feedback must not include a level.",
      };
    }

    if (result.estimatedScore < 10 || result.estimatedScore > 160) {
      return {
        valid: false,
        error: "Estimated DET score must be between 10 and 160.",
      };
    }

    return { valid: true, data: result };
  }

  if (result.estimatedLevel === null) {
    return { valid: false, error: "Missing estimated HSK level." };
  }

  if (result.estimatedScore !== null) {
    return {
      valid: false,
      error: "HSK practice feedback must not include a score.",
    };
  }

  return { valid: true, data: result };
}

export function parseStoredPracticeFeedback(
  raw: string,
): PracticeFeedbackResult | null {
  try {
    const parsed = JSON.parse(raw);
    const result = practiceFeedbackResultSchema.safeParse(parsed);
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}
