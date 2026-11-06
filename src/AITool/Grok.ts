import { grokEndsPointCompletions } from "../api_ends_point.js";

export const grokAI=async()=>{
    const grokKey=process.env.APIGroqKey;
    const grokModel=process.env.ModelGrokKey;

    const url=grokEndsPointCompletions
    const response=await fetch(url,{
        method:'POST',
        headers:{
            "Content-Type": "application/json",
      Authorization: `Bearer ${grokKey}`,
        },
        body: JSON.stringify({
      model: grokModel,
     "messages": [{
      "role": "user",
      "content": "Explain the importance of fast language models"
  }]
    }),

    })

    if(!response.ok){
        throw new Error(
            `Grok API request failed with status ${response.status}: ${response.statusText}`,
          );
    }
    const result=await response.json();
    return result;
}