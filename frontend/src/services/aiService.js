import api from "./axios";

export const getAIRecommendations = (prompt) => {
  return api.post("/ai/recommend", { prompt });
};