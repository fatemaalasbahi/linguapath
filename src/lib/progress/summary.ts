import "server-only";

import type { ExamProfile } from "@/lib/db/schema";
import {
  getFirstAssessmentForUser,
  getAssessmentsForUser,
} from "@/lib/progress/queries";
import {
  getFirstPracticeSubmissionForUser,
  getLatestPracticeSubmissionForUser,
  getPracticeSubmissionsForUser,
} from "@/lib/practice/queries";

import { buildProgressMetrics, type ProgressMetrics } from "./calculate";

export async function getProgressMetricsForUser(
  userId: string,
  profile: ExamProfile,
): Promise<ProgressMetrics> {
  const [
    firstAssessment,
    firstPractice,
    latestPractice,
    practiceSubmissions,
  ] = await Promise.all([
    getFirstAssessmentForUser(userId),
    getFirstPracticeSubmissionForUser(userId),
    getLatestPracticeSubmissionForUser(userId),
    getPracticeSubmissionsForUser(userId, 50),
  ]);

  return buildProgressMetrics({
    profile,
    firstAssessment,
    firstPractice,
    latestPractice,
    practiceCount: practiceSubmissions.length,
  });
}

export async function getProgressPageData(userId: string, profile: ExamProfile) {
  const [metrics, assessments, practiceSubmissions] = await Promise.all([
    getProgressMetricsForUser(userId, profile),
    getAssessmentsForUser(userId, 20),
    getPracticeSubmissionsForUser(userId, 20),
  ]);

  return {
    metrics,
    assessments,
    practiceSubmissions,
  };
}
