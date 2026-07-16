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

export type PracticeDisplayResult = {
  examType: ExamType;
  estimatedScore: number | null;
  estimatedLevel: HskLevel | null;
  grammarFeedback: string;
  vocabularyFeedback: string;
  structureFeedback: string;
  grammarStatus: "strength" | "needs_attention" | "recommended_focus";
  vocabularyStatus: "strength" | "needs_attention" | "recommended_focus";
  structureStatus: "strength" | "needs_attention" | "recommended_focus";
  strengths: string[];
  areasToImprove: string[];
  correctedExamples: string[];
  nextPracticeRecommendation: string;
  confidence: AssessmentConfidence;
};
