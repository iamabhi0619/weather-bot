
import { toast } from "sonner";

const API_KEY = "AIzaSyAQKqoJJtB8xDnC9LB_1SQHj4T5nfkxirY";
const API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";

export type GeminiResponse = {
  message: string;
  error?: string;
};

export const getGhibliRecommendation = async (city: string): Promise<GeminiResponse> => {
  try {
    const prompt = `Give a Studio Ghibli-style poetic weather and outfit recommendation for ${city}. Include a Ghibli-style movie recommendation based on the mood of the weather. Write this in a whimsical, poetic style like a Ghibli film. Format your response with clear sections for Weather, Outfit, and Movie Recommendation.`;
    
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error:", errorData);
      throw new Error(errorData.error?.message || "Failed to get recommendation");
    }

    const data = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error("No response from Gemini");
    }

    const content = data.candidates[0].content;
    if (!content || !content.parts || content.parts.length === 0) {
      throw new Error("Empty response from Gemini");
    }

    return { message: content.parts[0].text };
  } catch (error) {
    console.error("Error fetching Ghibli recommendation:", error);
    toast.error("Oh no! The spirits couldn't fetch your recommendation.");
    return { 
      message: "", 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    };
  }
};
