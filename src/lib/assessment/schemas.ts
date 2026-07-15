import { z } from "zod";

import { HSK_LEVELS, type ExamType } from "@/lib/exam-profile/constants";

export const confidenceSchema = z.enum(["low", "medium", "high"]);

export const baseAssessmentResultSchema = z.object({
  estimatedScore: z.number().int().nullable(),
  estimatedLevel: z.enum(HSK_LEVELS).nullable(),
  strengths: z.array(z.string().min(1).max(500)).min(2).max(5),
  weaknesses: z.array(z.string().min(1).max(500)).min(2).max(5),
  recommendations: z.array(z.string().min(1).max(500)).min(1).max(4),
  confidence: confidenceSchema,
});

export type BaseAssessmentResult = z.infer<typeof baseAssessmentResultSchema>;
export type AssessmentConfidence = z.infer<typeof confidenceSchema>;

export function validateAssessmentForExam(
  result: BaseAssessmentResult,
  examType: ExamType,
):
  | { valid: true; data: BaseAssessmentResult }
  | { valid: false; error: string } {
  if (examType === "DET") {
    if (result.estimatedScore === null) {
      return { valid: false, error: "Missing estimated DET score." };
    }

    if (result.estimatedLevel !== null) {
      return { valid: false, error: "DET assessment must not include a level." };
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
    return { valid: false, error: "HSK assessment must not include a score." };
  }

  return { valid: true, data: result };
}
