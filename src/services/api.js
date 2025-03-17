import { API_KEY } from '../config';

export const generateImages = async (prompt, quantity) => {
  try {
    // In a real app, this request should go through your backend
    // to keep your API key secure
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        prompt: prompt,
        n: quantity,
        size: "1024x1024",
        response_format: "b64_json"
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to generate images");
    }

    const { data } = await response.json();
    
    // Format the response data
    return data.map((item, index) => ({
      id: `img-${Date.now()}-${index}`,
      url: `data:image/jpeg;base64,${item.b64_json}`,
      prompt: prompt,
      loading: false
    }));
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};