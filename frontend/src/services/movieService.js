import api from "./axios";

export const getTrendingMovies = () =>
  api.get("/movies/trending");

export const getPopularMovies = () =>
  api.get("/movies/popular");

export const getTopRatedMovies = () =>
  api.get("/movies/top-rated");

export const getUpcomingMovies = () =>
  api.get("/movies/upcoming");

export const searchMovies = (query) =>
  api.get(`/movies/search?query=${query}`);

export const getMovieDetails = (id) =>
  api.get(`/movies/${id}`);