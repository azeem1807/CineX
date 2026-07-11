const axios = require("axios");

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${process.env.TMDB_READ_TOKEN}`,
    "Content-Type": "application/json",
  },
});


const searchMovieByTitle = async (title) => {
  const response = await tmdb.get("/search/movie", {
    params: {
      query: title,
    },
  });

  return response.data.results[0] || null;
};


module.exports = {
  tmdb,
  searchMovieByTitle,
};