import {
  GENERATION_WEEK_CAP,
  MAX_PLAN_WEEKS,
  MIN_PLAN_WEEKS,
} from "./constants";

function parseLocalDate(dateValue: string): Date {
  const [year, month, day] = dateValue.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatLocalDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function startOfToday(): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

export function getTodayDateString(): string {
  return formatLocalDate(startOfToday());
}

export function isExamDateInPast(examDate: string): boolean {
  const exam = parseLocalDate(examDate);
  return exam < startOfToday();
}

export function calculatePlanWeeks(startDate: string, endDate: string): number {
  const start = parseLocalDate(startDate);
  const end = parseLocalDate(endDate);
  const diffMs = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return MIN_PLAN_WEEKS;
  }

  const weeks = Math.max(MIN_PLAN_WEEKS, Math.ceil((diffDays + 1) / 7));
  return Math.min(weeks, MAX_PLAN_WEEKS);
}

export function getCurrentWeekNumber(
  startDate: string,
  totalWeeks: number,
): number {
  const start = parseLocalDate(startDate);
  const today = startOfToday();
  const diffMs = today.getTime() - start.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const week = Math.floor(diffDays / 7) + 1;

  return Math.min(Math.max(week, 1), totalWeeks);
}

export function getGenerationWeekCount(totalWeeks: number): number {
  return Math.min(totalWeeks, GENERATION_WEEK_CAP);
}

export { formatLocalDate, parseLocalDate };
