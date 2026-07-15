import type { Language } from "@/lib/exam-profile/constants";

import {
  MAX_RESPONSE_CHARACTERS,
  MAX_WRITING_UNITS,
  MIN_WRITING_UNITS,
} from "./constants";

export function countWritingUnits(text: string, language: Language): number {
  const trimmed = text.trim();

  if (!trimmed) {
    return 0;
  }

  if (language === "Chinese") {
    return trimmed.replace(/\s+/g, "").length;
  }

  return trimmed.split(/\s+/).filter(Boolean).length;
}

export function sanitizeResponse(text: string): string {
  return text.replace(/\0/g, "").trim();
}

export function validateWritingResponse(
  text: string,
  language: Language,
): { valid: true; sanitized: string } | { valid: false; error: string } {
  const sanitized = sanitizeResponse(text);

  if (!sanitized) {
    return { valid: false, error: "Please write a response before submitting." };
  }

  if (sanitized.length > MAX_RESPONSE_CHARACTERS) {
    return {
      valid: false,
      error: `Response must be ${MAX_RESPONSE_CHARACTERS} characters or fewer.`,
    };
  }

  const units = countWritingUnits(sanitized, language);

  if (units < MIN_WRITING_UNITS) {
    return {
      valid: false,
      error: `Write at least ${MIN_WRITING_UNITS} ${language === "Chinese" ? "characters" : "words"}.`,
    };
  }

  if (units > MAX_WRITING_UNITS) {
    return {
      valid: false,
      error: `Keep your response to ${MAX_WRITING_UNITS} ${language === "Chinese" ? "characters" : "words"} or fewer.`,
    };
  }

  return { valid: true, sanitized };
}

export function formatListForStorage(items: string[]): string {
  return items.map((item) => item.trim()).filter(Boolean).join("\n");
}

export function parseStoredList(value: string | null): string[] {
  if (!value) {
    return [];
  }

  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}
