import { geminiEndsPointInteractions } from "../api_ends_point.js";
import type { GeminiResponse } from "../utills.js";

export const GeminiAI = async () => {
  const geminiKey = process.env.APIGeminiKey;
  const geminiModel = process.env.ModelGeminiKey;
  if (!geminiKey) {
    throw new Error(
      "Gemini API key is not defined in the environment variables.",
    );
  }
  const url = geminiEndsPointInteractions;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": geminiKey,
    },
    body: JSON.stringify({
        "model": geminiModel,
    "input": "Explain how AI works in a few words"
    }),
  });
  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(
      `Gemini API request failed with status ${response.status}: ${errorDetails || response.statusText}`,
    );
  }
  const result = (await response.json()) as GeminiResponse;
  return result;
};
