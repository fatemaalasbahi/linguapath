import "server-only";

import { GoogleGenAI } from "@google/genai";

const DEFAULT_GEMINI_MODEL = "gemini-3.5-flash";

export function getGeminiModel(): string {
  const configured = process.env.GEMINI_MODEL?.trim();
  return configured || DEFAULT_GEMINI_MODEL;
}

export function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  return new GoogleGenAI({ apiKey });
}
