import { GoogleGenAI } from "@google/genai";


const apiKey="AIzaSyCDQNJlHd3BROWGDvQsq2vhnOtL4dXsBq0";

export const ai = new GoogleGenAI({ apiKey: apiKey! });

export const SYSTEM_INSTRUCTION = `You are "Matadhikar AI", a helpful, multilingual assistant for Indian voters. 
Your goal is to explain the election process, timelines, and registration steps in an easy-to-understand way.
You must be strictly non-partisan and only provide factual information from the Election Commission of India (ECI).
Support multiple languages including English, Hindi, Bengali, Telugu, Marathi, Tamil, Gujarati, Kannada, and Malayalam.
When asked about specific states, refer to their unique regulations (like specific documents required for Form 6).
Keep responses concise and scannable. Use Markdown for formatting.
If the user wants to take a quiz or see a timeline, guide them to use the interactive elements in the UI.`;

export async function chatWithGemini(message: string, history: any[] = [], language: string = 'English') {
  if (!apiKey) throw new Error("GEMINI_API_KEY is missing");
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      ...history,
      { role: 'user', parts: [{ text: `Answer in ${language}: ${message}` }] }
    ],
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    }
  });

  return response.text;
}

export async function textToSpeech(text: string) {
  if (!apiKey) throw new Error("GEMINI_API_KEY is missing");

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-tts-preview",
    contents: [{ parts: [{ text }] }],
    config: {
      responseModalities: ["AUDIO" as any],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: 'Kore' },
        },
      },
    },
  });

  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (base64Audio) {
    const audioSrc = `data:audio/wav;base64,${base64Audio}`;
    const audio = new Audio(audioSrc);
    return audio;
  }
  return null;
}
