import type { ExamType } from "@/lib/exam-profile/constants";

export type PracticePromptCategory =
  | "general"
  | "narrative"
  | "opinion"
  | "argument"
  | "description"
  | "grammar"
  | "vocabulary"
  | "structure";

export type PracticePrompt = {
  id: string;
  category: PracticePromptCategory;
  prompt: string;
};

const DET_PROMPTS: PracticePrompt[] = [
  {
    id: "det-challenge-narrative",
    category: "narrative",
    prompt:
      "Describe an important challenge you faced and explain how you dealt with it. What did you learn from the experience?",
  },
  {
    id: "det-opinion-education",
    category: "opinion",
    prompt:
      "Do you think online learning is as effective as classroom learning? Explain your opinion with specific reasons and examples.",
  },
  {
    id: "det-argument-technology",
    category: "argument",
    prompt:
      "Some people believe technology makes daily life easier, while others think it creates new problems. Present both views and explain which you agree with more.",
  },
  {
    id: "det-description-place",
    category: "description",
    prompt:
      "Describe a place that is meaningful to you. Explain what it looks like, why it matters, and how it has influenced you.",
  },
  {
    id: "det-grammar-accuracy",
    category: "grammar",
    prompt:
      "Write about a recent change in your daily routine. Focus on using varied sentence structures and accurate grammar throughout your response.",
  },
  {
    id: "det-vocabulary-range",
    category: "vocabulary",
    prompt:
      "Describe a hobby or interest you enjoy. Use precise vocabulary and explain why this activity is important to you.",
  },
  {
    id: "det-structure-essay",
    category: "structure",
    prompt:
      "Explain the steps someone should take to prepare effectively for an important exam. Organize your response with a clear introduction, body, and conclusion.",
  },
  {
    id: "det-general-goals",
    category: "general",
    prompt:
      "What is one goal you hope to achieve in the next year, and what actions will you take to reach it?",
  },
];

const HSK_PROMPTS: PracticePrompt[] = [
  {
    id: "hsk-experience-narrative",
    category: "narrative",
    prompt:
      "请描述一次对你影响很大的经历，并说明你从中学到了什么。",
  },
  {
    id: "hsk-opinion-study",
    category: "opinion",
    prompt:
      "你认为学习一门外语最重要的原因是什么？请说明你的观点并给出具体例子。",
  },
  {
    id: "hsk-argument-city",
    category: "argument",
    prompt:
      "有人认为大城市生活更方便，也有人认为小城市生活更舒适。请比较两种观点并说明你的看法。",
  },
  {
    id: "hsk-description-person",
    category: "description",
    prompt:
      "请描述一位对你很重要的人，包括他/她的特点以及你们之间的关系。",
  },
  {
    id: "hsk-grammar-accuracy",
    category: "grammar",
    prompt:
      "请写一段话介绍你最近的一次旅行或外出经历，注意使用正确的语法和合适的时态。",
  },
  {
    id: "hsk-vocabulary-range",
    category: "vocabulary",
    prompt:
      "请介绍你最喜欢的一本书、一部电影或一首歌，并尽量使用丰富的词汇表达你的感受。",
  },
  {
    id: "hsk-structure-essay",
    category: "structure",
    prompt:
      "请说明如何养成良好的学习习惯。你的回答应有清楚的开头、主体和结尾。",
  },
  {
    id: "hsk-general-goals",
    category: "general",
    prompt:
      "请谈谈你未来一年的一个目标，以及你计划如何实现它。",
  },
];

const PROMPTS_BY_EXAM: Record<ExamType, PracticePrompt[]> = {
  DET: DET_PROMPTS,
  HSK: HSK_PROMPTS,
};

const FOCUS_CATEGORY_KEYWORDS: Record<PracticePromptCategory, string[]> = {
  general: ["general", "foundation", "overview"],
  narrative: ["narrative", "story", "experience", "challenge", "经历", "故事"],
  opinion: ["opinion", "view", "think", "观点", "看法"],
  argument: ["argument", "compare", "debate", "讨论", "比较"],
  description: ["description", "describe", "描写", "描述"],
  grammar: ["grammar", "sentence", "accuracy", "语法", "句"],
  vocabulary: ["vocabulary", "word", "lexical", "词汇", "词语"],
  structure: ["structure", "organization", "essay", "paragraph", "结构", "组织"],
};

function scoreCategoryMatch(
  focus: string,
  category: PracticePromptCategory,
): number {
  const normalizedFocus = focus.toLowerCase();
  const keywords = FOCUS_CATEGORY_KEYWORDS[category];

  return keywords.reduce((score, keyword) => {
    if (normalizedFocus.includes(keyword.toLowerCase())) {
      return score + 1;
    }

    return score;
  }, 0);
}

export function selectPracticePrompt(
  examType: ExamType,
  weekFocus?: string | null,
): PracticePrompt {
  const prompts = PROMPTS_BY_EXAM[examType];

  if (!weekFocus?.trim()) {
    return prompts[0];
  }

  let bestPrompt = prompts[0];
  let bestScore = -1;

  for (const prompt of prompts) {
    const score = scoreCategoryMatch(weekFocus, prompt.category);

    if (score > bestScore) {
      bestScore = score;
      bestPrompt = prompt;
    }
  }

  return bestScore > 0 ? bestPrompt : prompts[0];
}

export function getPracticePromptById(
  examType: ExamType,
  promptId: string,
): PracticePrompt | null {
  return PROMPTS_BY_EXAM[examType].find((prompt) => prompt.id === promptId) ?? null;
}
