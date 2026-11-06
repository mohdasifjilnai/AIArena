import dotenv from "dotenv";
import { OpenAI } from "./AITool/OpenAI.js";
import { GeminiAI } from "./AITool/Gemini.js";
import { grokAI } from "./AITool/Grok.js";
import type { Models } from "./utills.js";
let loaded = false;

export function loadEnv() {
  if (loaded) return;
  dotenv.config({ path: "./config/.env" });
  loaded = true;
}
loadEnv();

async function  aIModelCall(model:Models ) {
    switch (model) {
        case "OpenAI":
            return await OpenAI();
        case "Gemini":
            return await  GeminiAI();
        case "Grok":
            return await grokAI();
        default:
            throw new Error(`Unknown model: ${model}`);
    }
  
}
const main = async () => {
  try {
    const result = await aIModelCall("Grok");
    console.log("Final Result:", result);
  } catch (error) {
    console.error("Error calling Grok API:", error);
  }
};
main();
