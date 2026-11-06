import { openAIEndsPointCompletions } from "../api_ends_point.js";
import type { ModelOutput, OpenAIResponse } from "../utills.js";

export const OpenAI = async (): Promise<ModelOutput> => {
  const openAIKey = process.env.APIOpenAIKey;
  const openAIModel = process.env.ModelOpenAIKey;
  if (!openAIKey) {
    throw new Error(
      "OpenAI API key is not defined in the environment variables.",
    );
  }
  if (!openAIModel) {
    throw new Error(
      "OpenAI model is not defined in the environment variables.",
    );
  }
  const url = openAIEndsPointCompletions;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openAIKey}`,
    },
    body: JSON.stringify({
      model: openAIModel,
      messages: [
        {
          role: "user",
          content: "You are a helpful assistant.",
        },
      ],
    }),
  });
  if (!response.ok) {
    throw new Error(
      `OpenAI API request failed with status ${response.status}: ${response.statusText}`,
    );
  }
  const data = (await response.json()) as OpenAIResponse;
  let openAIResponse = {
    ok: true,
    model: openAIModel,
    message: data.choices?.[0]?.message?.content ?? "No Answer from the model",
    provider: "OpenAI",
  };
  return openAIResponse;
};