import type { Assessment, ExamProfile, PracticeSubmission } from "@/lib/db/schema";
import {
  HSK_LEVELS,
  type ExamType,
  type HskLevel,
} from "@/lib/exam-profile/constants";

export type BaselineSource =
  | "profile_manual"
  | "diagnostic"
  | "first_practice"
  | "none";

export type ProgressBaseline = {
  source: BaselineSource;
  label: string;
  score: number | null;
  level: HskLevel | null;
  valueLabel: string;
};

export type LatestPracticeEstimate = {
  score: number | null;
  level: HskLevel | null;
  valueLabel: string;
  createdAt: Date;
} | null;

export type DetProgressMetrics = {
  examType: "DET";
  baseline: ProgressBaseline;
  latestPractice: LatestPracticeEstimate;
  targetScore: number | null;
  scoreChange: number | null;
  progressPercentage: number | null;
  progressStatus: string | null;
  hasMultiplePracticeSubmissions: boolean;
};

export type HskProgressMetrics = {
  examType: "HSK";
  profileCurrentLevel: HskLevel | null;
  baseline: ProgressBaseline;
  latestPractice: LatestPracticeEstimate;
  targetLevel: HskLevel | null;
  levelChange: number | null;
  progressStatus: string | null;
  hasMultiplePracticeSubmissions: boolean;
};

export type ProgressMetrics = DetProgressMetrics | HskProgressMetrics;

function getHskLevelIndex(level: HskLevel): number {
  return HSK_LEVELS.indexOf(level);
}

function matchesDiagnosticValue(
  profile: ExamProfile,
  firstAssessment: Assessment | null,
): boolean {
  if (!firstAssessment) {
    return false;
  }

  if (profile.scoringModel === "numeric") {
    return (
      profile.currentScore != null &&
      firstAssessment.aiScore != null &&
      profile.currentScore === firstAssessment.aiScore
    );
  }

  return (
    profile.currentLevel != null &&
    firstAssessment.aiLevel != null &&
    profile.currentLevel === firstAssessment.aiLevel
  );
}

export function resolveBaseline(
  profile: ExamProfile,
  firstAssessment: Assessment | null,
  firstPractice: PracticeSubmission | null,
): ProgressBaseline {
  const examType = profile.examType as ExamType;

  if (examType === "DET") {
    if (profile.currentScore != null) {
      const source = matchesDiagnosticValue(profile, firstAssessment)
        ? "diagnostic"
        : "profile_manual";

      return {
        source,
        label:
          source === "diagnostic"
            ? "Diagnostic estimate"
            : "Manually entered profile value",
        score: profile.currentScore,
        level: null,
        valueLabel: profile.currentScore.toString(),
      };
    }

    if (firstAssessment?.aiScore != null) {
      return {
        source: "diagnostic",
        label: "Diagnostic estimate",
        score: firstAssessment.aiScore,
        level: null,
        valueLabel: firstAssessment.aiScore.toString(),
      };
    }

    if (firstPractice?.score != null) {
      return {
        source: "first_practice",
        label: "First practice estimate",
        score: firstPractice.score,
        level: null,
        valueLabel: firstPractice.score.toString(),
      };
    }

    return {
      source: "none",
      label: "No baseline yet",
      score: null,
      level: null,
      valueLabel: "—",
    };
  }

  if (profile.currentLevel != null) {
    const source = matchesDiagnosticValue(profile, firstAssessment)
      ? "diagnostic"
      : "profile_manual";

    return {
      source,
      label:
        source === "diagnostic"
          ? "Diagnostic estimate"
          : "Manually entered profile value",
      score: null,
      level: profile.currentLevel as HskLevel,
      valueLabel: profile.currentLevel,
    };
  }

  if (firstAssessment?.aiLevel != null) {
    return {
      source: "diagnostic",
      label: "Diagnostic estimate",
      score: null,
      level: firstAssessment.aiLevel as HskLevel,
      valueLabel: firstAssessment.aiLevel,
    };
  }

  if (firstPractice?.level != null) {
    return {
      source: "first_practice",
      label: "First practice estimate",
      score: null,
      level: firstPractice.level as HskLevel,
      valueLabel: firstPractice.level,
    };
  }

  return {
    source: "none",
    label: "No baseline yet",
    score: null,
    level: null,
    valueLabel: "—",
  };
}

export function buildLatestPracticeEstimate(
  latestPractice: PracticeSubmission | null,
): LatestPracticeEstimate {
  if (!latestPractice) {
    return null;
  }

  if (latestPractice.score != null) {
    return {
      score: latestPractice.score,
      level: null,
      valueLabel: latestPractice.score.toString(),
      createdAt: latestPractice.createdAt,
    };
  }

  if (latestPractice.level != null) {
    return {
      score: null,
      level: latestPractice.level as HskLevel,
      valueLabel: latestPractice.level,
      createdAt: latestPractice.createdAt,
    };
  }

  return null;
}

export function calculateDetProgressMetrics(input: {
  profile: ExamProfile;
  firstAssessment: Assessment | null;
  firstPractice: PracticeSubmission | null;
  latestPractice: PracticeSubmission | null;
  practiceCount: number;
}): DetProgressMetrics {
  const baseline = resolveBaseline(
    input.profile,
    input.firstAssessment,
    input.firstPractice,
  );
  const latestPractice = buildLatestPracticeEstimate(input.latestPractice);
  const targetScore = input.profile.targetScore;

  let scoreChange: number | null = null;
  let progressPercentage: number | null = null;
  let progressStatus: string | null = null;

  if (
    baseline.score != null &&
    latestPractice?.score != null &&
    baseline.source !== "none"
  ) {
    scoreChange = latestPractice.score - baseline.score;
  }

  if (
    baseline.score != null &&
    latestPractice?.score != null &&
    targetScore != null
  ) {
    if (targetScore <= baseline.score) {
      progressStatus =
        latestPractice.score >= targetScore
          ? "Latest practice estimate meets or exceeds your target."
          : "Your target is already at or below your baseline. Progress percentage is not shown to avoid a misleading value.";
    } else {
      const raw =
        ((latestPractice.score - baseline.score) / (targetScore - baseline.score)) *
        100;
      progressPercentage = Math.min(100, Math.max(0, Math.round(raw)));
    }
  }

  if (
    input.practiceCount === 1 &&
    latestPractice &&
    baseline.source === "first_practice"
  ) {
    progressStatus =
      "Early estimate — complete more practice sessions for a clearer trend.";
  }

  return {
    examType: "DET",
    baseline,
    latestPractice,
    targetScore,
    scoreChange,
    progressPercentage,
    progressStatus,
    hasMultiplePracticeSubmissions: input.practiceCount > 1,
  };
}

export function calculateHskProgressMetrics(input: {
  profile: ExamProfile;
  firstAssessment: Assessment | null;
  firstPractice: PracticeSubmission | null;
  latestPractice: PracticeSubmission | null;
  practiceCount: number;
}): HskProgressMetrics {
  const baseline = resolveBaseline(
    input.profile,
    input.firstAssessment,
    input.firstPractice,
  );
  const latestPractice = buildLatestPracticeEstimate(input.latestPractice);
  const targetLevel = (input.profile.targetLevel as HskLevel | null) ?? null;
  const profileCurrentLevel =
    (input.profile.currentLevel as HskLevel | null) ?? null;

  let levelChange: number | null = null;
  let progressStatus: string | null = null;

  if (
    baseline.level &&
    latestPractice?.level &&
    baseline.source !== "none"
  ) {
    levelChange =
      getHskLevelIndex(latestPractice.level) -
      getHskLevelIndex(baseline.level);
  }

  if (targetLevel && latestPractice?.level) {
    const latestIndex = getHskLevelIndex(latestPractice.level);
    const targetIndex = getHskLevelIndex(targetLevel);

    if (latestIndex >= targetIndex) {
      progressStatus =
        "Latest practice estimate meets or exceeds your target level. This is not official certification.";
    } else if (baseline.level) {
      const baselineIndex = getHskLevelIndex(baseline.level);
      if (targetIndex <= baselineIndex) {
        progressStatus =
          "Your target level is already at or below your baseline.";
      }
    }
  }

  if (
    input.practiceCount === 1 &&
    latestPractice &&
    baseline.source === "first_practice"
  ) {
    progressStatus =
      "Early estimate — complete more practice sessions for a clearer trend.";
  }

  return {
    examType: "HSK",
    profileCurrentLevel,
    baseline,
    latestPractice,
    targetLevel,
    levelChange,
    progressStatus,
    hasMultiplePracticeSubmissions: input.practiceCount > 1,
  };
}

export function buildProgressMetrics(input: {
  profile: ExamProfile;
  firstAssessment: Assessment | null;
  firstPractice: PracticeSubmission | null;
  latestPractice: PracticeSubmission | null;
  practiceCount: number;
}): ProgressMetrics {
  if (input.profile.examType === "DET") {
    return calculateDetProgressMetrics(input);
  }

  return calculateHskProgressMetrics(input);
}
