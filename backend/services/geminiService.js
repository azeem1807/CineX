const { GoogleGenAI } = require("@google/genai");
console.log("GEMINI KEY:", process.env.GEMINI_API_KEY);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateResponse = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  generateResponse,
};