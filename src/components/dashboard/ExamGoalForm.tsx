"use client";

import { useActionState, useState } from "react";

import {
  saveExamGoal,
  type ExamGoalFormState,
} from "@/app/(dashboard)/exam-goals/setup/actions";
import { Button } from "@/components/ui/Button";
import {
  EXAM_LANGUAGE,
  EXAM_TYPES,
  HSK_LEVELS,
  LANGUAGE_DEFAULT_EXAM,
  LANGUAGES,
  type ExamType,
  type Language,
} from "@/lib/exam-profile/constants";

export type KnowsCurrentLevel = "yes" | "no";

export type ExamGoalFormValues = {
  knowsCurrentLevel: KnowsCurrentLevel;
  language: Language;
  examType: ExamType;
  currentScore: string;
  targetScore: string;
  currentLevel: string;
  targetLevel: string;
  examDate: string;
  studyHoursPerWeek: string;
};

type ExamGoalFormProps = {
  initialValues?: Partial<ExamGoalFormValues>;
};

const defaultValues: ExamGoalFormValues = {
  knowsCurrentLevel: "no",
  language: "English",
  examType: "DET",
  currentScore: "",
  targetScore: "",
  currentLevel: "HSK 3",
  targetLevel: "HSK 5",
  examDate: "",
  studyHoursPerWeek: "5",
};

const fieldClassName =
  "flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 text-sm text-neutral-900 shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-primary-500 focus-visible:ring-[3px] focus-visible:ring-primary-500/20 disabled:cursor-not-allowed disabled:opacity-50";

const labelClassName = "text-sm font-medium text-neutral-700";

const errorClassName = "text-sm text-red-600";

const knowsCurrentLevelOptions = [
  {
    value: "yes" as const,
    label: "Yes, I know it.",
  },
  {
    value: "no" as const,
    label: "No, I'd like LinguaPath to estimate it.",
  },
];

export function ExamGoalForm({ initialValues }: ExamGoalFormProps) {
  const [state, formAction, isPending] = useActionState<
    ExamGoalFormState,
    FormData
  >(saveExamGoal, {});

  const mergedInitial = { ...defaultValues, ...initialValues };
  const [language, setLanguage] = useState<Language>(mergedInitial.language);
  const [examType, setExamType] = useState<ExamType>(mergedInitial.examType);
  const [knowsCurrentLevel, setKnowsCurrentLevel] =
    useState<KnowsCurrentLevel>(mergedInitial.knowsCurrentLevel);

  const isNumeric = examType === "DET";
  const showCurrentAbility = knowsCurrentLevel === "yes";

  function handleLanguageChange(nextLanguage: Language) {
    setLanguage(nextLanguage);
    setExamType(LANGUAGE_DEFAULT_EXAM[nextLanguage]);
  }

  function handleExamTypeChange(nextExamType: ExamType) {
    setExamType(nextExamType);
    setLanguage(EXAM_LANGUAGE[nextExamType]);
  }

  return (
    <form action={formAction} className="space-y-6">
      {state.error && (
        <div
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          {state.error}
        </div>
      )}

      <fieldset className="space-y-3">
        <legend className={labelClassName}>
          Do you already know your current exam level?{" "}
          <span className="text-red-500">*</span>
        </legend>
        <div className="space-y-2">
          {knowsCurrentLevelOptions.map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-start gap-3 rounded-md border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 transition-colors hover:border-primary-200 has-[:checked]:border-primary-300 has-[:checked]:bg-primary-50"
            >
              <input
                type="radio"
                name="knowsCurrentLevel"
                value={option.value}
                checked={knowsCurrentLevel === option.value}
                onChange={() => setKnowsCurrentLevel(option.value)}
                className="mt-0.5 h-4 w-4 border-neutral-300 text-primary-600 focus:ring-primary-500"
                required
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
        {state.fieldErrors?.knowsCurrentLevel && (
          <p className={errorClassName}>{state.fieldErrors.knowsCurrentLevel}</p>
        )}
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="language" className={labelClassName}>
            Language <span className="text-red-500">*</span>
          </label>
          <select
            id="language"
            name="language"
            className={fieldClassName}
            value={language}
            onChange={(event) =>
              handleLanguageChange(event.target.value as Language)
            }
            required
          >
            {LANGUAGES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {state.fieldErrors?.language && (
            <p className={errorClassName}>{state.fieldErrors.language}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="examType" className={labelClassName}>
            Exam <span className="text-red-500">*</span>
          </label>
          <select
            id="examType"
            name="examType"
            className={fieldClassName}
            value={examType}
            onChange={(event) =>
              handleExamTypeChange(event.target.value as ExamType)
            }
            required
          >
            {EXAM_TYPES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {state.fieldErrors?.examType && (
            <p className={errorClassName}>{state.fieldErrors.examType}</p>
          )}
        </div>
      </div>

      {isNumeric ? (
        <div
          className={
            showCurrentAbility
              ? "grid gap-4 sm:grid-cols-2"
              : "grid max-w-sm gap-4"
          }
        >
          {showCurrentAbility && (
            <div className="space-y-2">
              <label htmlFor="currentScore" className={labelClassName}>
                Current Score <span className="text-red-500">*</span>
              </label>
              <input
                id="currentScore"
                name="currentScore"
                type="number"
                min={10}
                max={160}
                step={1}
                defaultValue={mergedInitial.currentScore}
                className={fieldClassName}
                placeholder="e.g. 95"
                required
              />
              {state.fieldErrors?.currentScore && (
                <p className={errorClassName}>
                  {state.fieldErrors.currentScore}
                </p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="targetScore" className={labelClassName}>
              Target Score <span className="text-red-500">*</span>
            </label>
            <input
              id="targetScore"
              name="targetScore"
              type="number"
              min={10}
              max={160}
              step={1}
              defaultValue={mergedInitial.targetScore}
              className={fieldClassName}
              placeholder="e.g. 120"
              required
            />
            {state.fieldErrors?.targetScore && (
              <p className={errorClassName}>{state.fieldErrors.targetScore}</p>
            )}
          </div>
        </div>
      ) : (
        <div
          className={
            showCurrentAbility
              ? "grid gap-4 sm:grid-cols-2"
              : "grid max-w-sm gap-4"
          }
        >
          {showCurrentAbility && (
            <div className="space-y-2">
              <label htmlFor="currentLevel" className={labelClassName}>
                Current Level <span className="text-red-500">*</span>
              </label>
              <select
                id="currentLevel"
                name="currentLevel"
                className={fieldClassName}
                defaultValue={mergedInitial.currentLevel}
                required
              >
                {HSK_LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              {state.fieldErrors?.currentLevel && (
                <p className={errorClassName}>
                  {state.fieldErrors.currentLevel}
                </p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="targetLevel" className={labelClassName}>
              Target Level <span className="text-red-500">*</span>
            </label>
            <select
              id="targetLevel"
              name="targetLevel"
              className={fieldClassName}
              defaultValue={mergedInitial.targetLevel}
              required
            >
              {HSK_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
            {state.fieldErrors?.targetLevel && (
              <p className={errorClassName}>{state.fieldErrors.targetLevel}</p>
            )}
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="examDate" className={labelClassName}>
            Exam Date <span className="text-red-500">*</span>
          </label>
          <input
            id="examDate"
            name="examDate"
            type="date"
            defaultValue={mergedInitial.examDate}
            className={fieldClassName}
            required
          />
          {state.fieldErrors?.examDate && (
            <p className={errorClassName}>{state.fieldErrors.examDate}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="studyHoursPerWeek" className={labelClassName}>
            Study Hours per Week <span className="text-red-500">*</span>
          </label>
          <input
            id="studyHoursPerWeek"
            name="studyHoursPerWeek"
            type="number"
            min={1}
            max={40}
            defaultValue={mergedInitial.studyHoursPerWeek}
            className={fieldClassName}
            placeholder="e.g. 5"
            required
          />
          {state.fieldErrors?.studyHoursPerWeek && (
            <p className={errorClassName}>
              {state.fieldErrors.studyHoursPerWeek}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isPending}>
        {isPending ? "Saving…" : "Save Exam Goal"}
      </Button>
    </form>
  );
}
