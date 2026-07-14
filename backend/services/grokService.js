const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: "https://api.x.ai/v1",
});

const generateResponse = async (prompt) => {
  try {
    const completion = await client.chat.completions.create({
      model: "grok-4",
      messages: [
        {
          role: "system",
          content: "You are an expert movie recommendation assistant.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error(error);

    throw new Error(
      error.response?.data?.error?.message ||
      error.message ||
      "Failed to generate AI response"
    );
  }
};

module.exports = {
  generateResponse,
};