import { GoogleGenAI } from '@google/genai';

// In a real app, this would be securely injected.
// For this demo, we handle the case where it might be missing gracefully.
const API_KEY = process.env.API_KEY || ''; 

let ai: GoogleGenAI | null = null;

try {
  if (API_KEY) {
    ai = new GoogleGenAI({ apiKey: API_KEY, vertexai: true });
  }
} catch (error) {
  console.warn("Failed to initialize GoogleGenAI. AI features will be mocked.", error);
}

const SYSTEM_INSTRUCTION = `
You are AIPCOS Copilot, an expert AI assistant for Project Controls, Planning, and Construction Management.
You analyze project data (SPI, CPI, delays, resources) and provide actionable insights, recovery plans, and claim narratives.
Keep responses concise, professional, and formatted with markdown for readability.
If asked about specific project data, assume the context provided in the prompt is accurate.
`;

export const askCopilot = async (prompt: string, contextData?: any): Promise<string> => {
  if (!ai) {
    // Mock response if no API key is available to ensure UI remains functional
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`**[Mock AI Response]**\n\nI received your query: "${prompt}".\n\nBased on the current project context (SPI: 0.92, CPI: 1.05), the project is slightly behind schedule but under budget. I recommend reviewing the critical path activities, specifically procurement of long-lead items, to mitigate the 14-day forecast delay.\n\n*(Note: Provide a valid API_KEY in the environment to enable real GenAI responses).*`);
      }, 1500);
    });
  }

  try {
    const fullPrompt = contextData 
      ? `Context Data: ${JSON.stringify(contextData)}\n\nUser Query: ${prompt}`
      : prompt;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.2, // Low temperature for more analytical/factual responses
      }
    });

    return response.text || "I couldn't generate a response.";
  } catch (error) {
    console.error("Error calling GenAI:", error);
    return "Sorry, I encountered an error while processing your request. Please try again later.";
  }
};