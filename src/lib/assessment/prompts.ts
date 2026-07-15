import type { ExamType } from "@/lib/exam-profile/constants";

export type AssessmentPrompt = {
  id: string;
  prompt: string;
};

const ASSESSMENT_PROMPTS: Record<ExamType, AssessmentPrompt> = {
  DET: {
    id: "det-challenge-1",
    prompt:
      "Describe an important challenge you faced and explain how you dealt with it. What did you learn from the experience?",
  },
  HSK: {
    id: "hsk-experience-1",
    prompt:
      "请描述一次对你影响很大的经历，并说明你从中学到了什么。（Describe an experience that had a significant impact on you and explain what you learned from it.）",
  },
};

export function getPromptForExam(examType: ExamType): AssessmentPrompt {
  return ASSESSMENT_PROMPTS[examType];
}
