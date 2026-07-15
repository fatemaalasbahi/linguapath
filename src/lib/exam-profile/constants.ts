export const LANGUAGES = ["English", "Chinese"] as const;
export type Language = (typeof LANGUAGES)[number];

export const EXAM_TYPES = ["DET", "HSK"] as const;
export type ExamType = (typeof EXAM_TYPES)[number];

export const SCORING_MODELS = ["numeric", "level"] as const;
export type ScoringModel = (typeof SCORING_MODELS)[number];

export const HSK_LEVELS = [
  "HSK 1",
  "HSK 2",
  "HSK 3",
  "HSK 4",
  "HSK 5",
  "HSK 6",
] as const;
export type HskLevel = (typeof HSK_LEVELS)[number];

export const LANGUAGE_DEFAULT_EXAM: Record<Language, ExamType> = {
  English: "DET",
  Chinese: "HSK",
};

export const EXAM_SCORING_MODEL: Record<ExamType, ScoringModel> = {
  DET: "numeric",
  HSK: "level",
};

export const EXAM_LANGUAGE: Record<ExamType, Language> = {
  DET: "English",
  HSK: "Chinese",
};
