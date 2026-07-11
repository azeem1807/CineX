const { generateResponse } = require("../services/geminiService");
const { searchMovieByTitle } = require("../services/tmdbService");

// =======================
// AI Movie Recommendation
// =======================
const recommendMovies = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const aiPrompt = `
You are an expert movie recommendation assistant.

Recommend ONLY 5 movies based on this request:

"${prompt}"

Return ONLY valid JSON in this format:

[
  {
    "title": "",
    "reason": ""
  }
]
`;

    // Generate AI response
    const result = await generateResponse(aiPrompt);

    // Remove markdown if Gemini returns ```json
    const cleanedResult = result
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let aiMovies;

    try {
      aiMovies = JSON.parse(cleanedResult);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Invalid AI response format",
        rawResponse: result,
      });
    }

    // Fetch movie details from TMDB
    const recommendations = await Promise.all(
      aiMovies.map(async (movie) => {
        const tmdbMovie = await searchMovieByTitle(movie.title);

        if (!tmdbMovie) return null;

        return {
          id: tmdbMovie.id,
          title: tmdbMovie.title,
          overview: tmdbMovie.overview,
          posterPath: tmdbMovie.poster_path,
          backdropPath: tmdbMovie.backdrop_path,
          releaseDate: tmdbMovie.release_date,
          rating: tmdbMovie.vote_average,
          language: tmdbMovie.original_language,
          popularity: tmdbMovie.popularity,
          reason: movie.reason,
        };
      })
    );

    const filteredRecommendations = recommendations.filter(Boolean);

    res.status(200).json({
      success: true,
      count: filteredRecommendations.length,
      recommendations: filteredRecommendations,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  recommendMovies,
};