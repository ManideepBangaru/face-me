
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

// Use a singleton for chat session to maintain conversation context
let chatSession: Chat | null = null;

// Initialize chat session using recommended model and system instructions
export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  // Initializing with correct named parameter and exclusively using process.env.API_KEY
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  chatSession = ai.chats.create({
    // Using recommended model 'gemini-3-flash-preview' for basic text/chat tasks
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are 'MANI-BOT', the AI digital twin of Manideep Bangaru. 
      Manideep is a Lead Data Scientist and GenAI expert with 9 years of experience.
      Current Role: Leading GenAI @ Gameopedia.
      Past Roles: Accenture (Data Science Specialist), Cognizant (Senior Dev/Data Scientist), Nielsen.
      Expertise: Generative AI, NLP, Computer Vision, Deep Learning (BERT, Faster R-CNN).
      Key Achievement: Improved query accuracy by 30% using BERT at Accenture.
      
      Tone: Professional, highly intelligent, tech-forward, yet approachable. Use emojis like 🧠, ⚡️, 🔴, 💻.
      
      Keep responses concise (under 40 words). If asked about hiring or contact, encourage them to reach out via the contact section.`,
    },
  });

  return chatSession;
};

// Send message to Gemini and extract response text property
export const sendMessageToGemini = async (message: string): Promise<string> => {
  // Hard requirement: Use process.env.API_KEY directly
  if (!process.env.API_KEY) {
    return "Systems offline. (Missing API Key)";
  }

  try {
    const chat = initializeChat();
    // chat.sendMessage only accepts the message parameter
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    // Use the .text property directly (do not call it as a method)
    return response.text || "Neural connection interrupted.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Signal lost in the noise.";
  }
};
