import "server-only";

import { and, eq, isNull } from "drizzle-orm";

import { db } from "@/lib/db";
import { assessments, examProfiles, type ExamProfile } from "@/lib/db/schema";

import { ASSESSMENT_TYPE_WRITING } from "./constants";
import type { BaseAssessmentResult } from "./schemas";
import { formatListForStorage } from "./validation";

export type SaveAssessmentInput = {
  userId: string;
  examProfileId: string;
  profile: ExamProfile;
  inputContent: string;
  result: BaseAssessmentResult;
};

export type SaveAssessmentOutcome = {
  profileUpdated: boolean;
};

function shouldUpdateProfile(profile: ExamProfile): boolean {
  if (profile.scoringModel === "numeric") {
    return profile.currentScore == null;
  }

  return profile.currentLevel == null;
}

export async function saveAssessmentResult(
  input: SaveAssessmentInput,
): Promise<SaveAssessmentOutcome> {
  const { userId, examProfileId, profile, inputContent, result } = input;

  const assessmentValues = {
    userId,
    examProfileId,
    assessmentType: ASSESSMENT_TYPE_WRITING,
    inputContent,
    aiScore: result.estimatedScore,
    aiLevel: result.estimatedLevel,
    strengths: formatListForStorage(result.strengths),
    weaknesses: formatListForStorage(result.weaknesses),
    recommendations: formatListForStorage(result.recommendations),
  };

  const profileUpdated = shouldUpdateProfile(profile);

  if (profileUpdated) {
    const updateSet =
      profile.scoringModel === "numeric"
        ? { currentScore: result.estimatedScore }
        : { currentLevel: result.estimatedLevel };

    await db.batch([
      db.insert(assessments).values(assessmentValues),
      db
        .update(examProfiles)
        .set(updateSet)
        .where(
          and(
            eq(examProfiles.userId, userId),
            profile.scoringModel === "numeric"
              ? isNull(examProfiles.currentScore)
              : isNull(examProfiles.currentLevel),
          ),
        ),
    ]);
  } else {
    await db.insert(assessments).values(assessmentValues);
  }

  return { profileUpdated };
}
