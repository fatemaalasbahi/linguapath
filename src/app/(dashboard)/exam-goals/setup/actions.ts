"use server";

import { redirect } from "next/navigation";

import { auth } from "@/lib/auth/server";
import { syncUserFromSession } from "@/lib/auth/sync-user";
import {
  EXAM_LANGUAGE,
  EXAM_SCORING_MODEL,
  EXAM_TYPES,
  HSK_LEVELS,
  LANGUAGES,
  type ExamType,
  type HskLevel,
  type Language,
} from "@/lib/exam-profile/constants";
import { upsertExamProfile } from "@/lib/exam-profile/upsert";

export type ExamGoalFormState = {
  error?: string;
  fieldErrors?: Record<string, string>;
};

function parseNumber(value: FormDataEntryValue | null): number | null {
  if (typeof value !== "string" || value.trim() === "") {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function parseInteger(value: FormDataEntryValue | null): number | null {
  if (typeof value !== "string" || value.trim() === "") {
    return null;
  }

  if (!/^-?\d+$/.test(value.trim())) {
    return null;
  }

  const parsed = Number(value);
  return Number.isInteger(parsed) ? parsed : null;
}

function validateExamDate(value: string): string | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (!match) {
    return "Enter a valid exam date.";
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const parsedDate = new Date(year, month - 1, day);

  if (
    parsedDate.getFullYear() !== year ||
    parsedDate.getMonth() !== month - 1 ||
    parsedDate.getDate() !== day
  ) {
    return "Enter a valid exam date.";
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (parsedDate < today) {
    return "Exam date cannot be in the past.";
  }

  return null;
}

function isLanguage(value: string): value is Language {
  return (LANGUAGES as readonly string[]).includes(value);
}

function isExamType(value: string): value is ExamType {
  return (EXAM_TYPES as readonly string[]).includes(value);
}

function isHskLevel(value: string): value is HskLevel {
  return (HSK_LEVELS as readonly string[]).includes(value);
}

export async function saveExamGoal(
  _prevState: ExamGoalFormState,
  formData: FormData,
): Promise<ExamGoalFormState> {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    redirect("/sign-in");
  }

  const appUser = await syncUserFromSession(session);
  const fieldErrors: Record<string, string> = {};

  const languageValue = formData.get("language");
  const examTypeValue = formData.get("examType");
  const examDateValue = formData.get("examDate");
  const studyHoursValue = formData.get("studyHoursPerWeek");
  const knowsCurrentLevelValue = formData.get("knowsCurrentLevel");

  const knowsCurrentLevel =
    knowsCurrentLevelValue === "yes" || knowsCurrentLevelValue === "no"
      ? knowsCurrentLevelValue
      : null;

  if (!knowsCurrentLevel) {
    fieldErrors.knowsCurrentLevel =
      "Select whether you know your current exam level.";
  }

  if (typeof languageValue !== "string" || !isLanguage(languageValue)) {
    fieldErrors.language = "Select a valid language.";
  }

  if (typeof examTypeValue !== "string" || !isExamType(examTypeValue)) {
    fieldErrors.examType = "Select a valid exam type.";
  }

  if (
    typeof languageValue === "string" &&
    isLanguage(languageValue) &&
    typeof examTypeValue === "string" &&
    isExamType(examTypeValue) &&
    EXAM_LANGUAGE[examTypeValue] !== languageValue
  ) {
    fieldErrors.examType = "Exam type must match the selected language.";
  }

  if (typeof examDateValue !== "string" || !examDateValue) {
    fieldErrors.examDate = "Exam date is required.";
  } else {
    const examDateError = validateExamDate(examDateValue);
    if (examDateError) {
      fieldErrors.examDate = examDateError;
    }
  }

  const studyHoursPerWeek = parseNumber(studyHoursValue);
  if (studyHoursPerWeek === null || studyHoursPerWeek < 1 || studyHoursPerWeek > 40) {
    fieldErrors.studyHoursPerWeek = "Enter study hours between 1 and 40.";
  }

  const examType =
    typeof examTypeValue === "string" && isExamType(examTypeValue)
      ? examTypeValue
      : null;
  const scoringModel = examType ? EXAM_SCORING_MODEL[examType] : null;

  let currentScore: number | null = null;
  let targetScore: number | null = null;
  let currentLevel: HskLevel | null = null;
  let targetLevel: HskLevel | null = null;

  if (scoringModel === "numeric") {
    targetScore = parseInteger(formData.get("targetScore"));

    if (targetScore === null || targetScore < 10 || targetScore > 160) {
      fieldErrors.targetScore =
        "Enter a whole-number target score between 10 and 160.";
    }

    if (knowsCurrentLevel === "yes") {
      currentScore = parseInteger(formData.get("currentScore"));

      if (currentScore === null || currentScore < 10 || currentScore > 160) {
        fieldErrors.currentScore =
          "Enter a whole-number current score between 10 and 160.";
      }

      if (
        currentScore !== null &&
        targetScore !== null &&
        targetScore <= currentScore
      ) {
        fieldErrors.targetScore =
          "Target score must be higher than current score.";
      }
    }
  }

  if (scoringModel === "level") {
    const targetLevelValue = formData.get("targetLevel");

    if (
      typeof targetLevelValue !== "string" ||
      !isHskLevel(targetLevelValue)
    ) {
      fieldErrors.targetLevel = "Select a valid target level.";
    } else {
      targetLevel = targetLevelValue;
    }

    if (knowsCurrentLevel === "yes") {
      const currentLevelValue = formData.get("currentLevel");

      if (
        typeof currentLevelValue !== "string" ||
        !isHskLevel(currentLevelValue)
      ) {
        fieldErrors.currentLevel = "Select a valid current level.";
      } else {
        currentLevel = currentLevelValue;
      }

      if (currentLevel && targetLevel) {
        const currentIndex = HSK_LEVELS.indexOf(currentLevel);
        const targetIndex = HSK_LEVELS.indexOf(targetLevel);

        if (targetIndex <= currentIndex) {
          fieldErrors.targetLevel =
            "Target level must be higher than current level.";
        }
      }
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  if (
    typeof languageValue !== "string" ||
    !isLanguage(languageValue) ||
    !examType ||
    typeof examDateValue !== "string" ||
    studyHoursPerWeek === null
  ) {
    return { error: "Invalid form submission. Please try again." };
  }

  try {
    await upsertExamProfile(appUser.id, {
      language: languageValue,
      examType,
      currentScore,
      targetScore,
      currentLevel,
      targetLevel,
      examDate: examDateValue,
      studyHoursPerWeek,
    });
  } catch {
    return { error: "Unable to save your exam goal. Please try again." };
  }

  redirect("/dashboard");
}
