import dotenv from 'dotenv';
import { openAIEndsPointCompletions } from './api_ends_point.js';
let loaded=false;

export function loadEnv(){
    if(loaded) return;
    dotenv.config({path: './config/.env'});
    loaded=true;

}
loadEnv();

export const OpenAI=async ()=>{
   const openAIKey=process.env.APIOpenAIKey;
   const openAIModel="gpt-4o-mini";
   if(!openAIKey){
    throw new Error("OpenAI API key is not defined in the environment variables.");
   }
   const url=openAIEndsPointCompletions;
   const response = await fetch(url,{
    method:'POST',
    headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${openAIKey}`
    },
    body:JSON.stringify({
        model: openAIModel,
        messages: [
            {
                role: "user",
                content: "You are a helpful assistant."
            }
        ]
    })
});
if(!response.ok){
    throw new Error(`OpenAI API request failed with status ${response.status}: ${response.statusText}`);
}
const data=await response.json();
console.log("OpenAI Response:", data);
return data;
}
OpenAI()