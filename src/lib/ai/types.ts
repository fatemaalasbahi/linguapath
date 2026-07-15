import type { ExamProfile } from "@/lib/db/schema";
import type { ExamType, HskLevel } from "@/lib/exam-profile/constants";

import type { AssessmentConfidence } from "@/lib/assessment/schemas";

export type AssessmentEvaluationInput = {
  profile: ExamProfile;
  promptText: string;
  studentResponse: string;
};

export type AssessmentEvaluationResult = {
  estimatedScore: number | null;
  estimatedLevel: HskLevel | null;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  confidence: AssessmentConfidence;
};

export type AssessmentDisplayResult = AssessmentEvaluationResult & {
  examType: ExamType;
  profileUpdated: boolean;
};
