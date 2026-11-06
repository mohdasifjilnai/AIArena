export type ModelOutput = {
  ok: boolean;
  model: string;
  message: string;
  provider: string;
};
export type OpenAIResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

export type GeminiResponse = {
  candidates?: Array<{
    content?: {
        parts?: Array<{
            text?: string;
        }>
    };
  }>;
};

export type Models = "OpenAI" | "Gemini" | "Grok";