const express = require("express");
const router = express.Router();

const {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  searchMovies,
  getMovieDetails,
  getMovieTrailer,
getSimilarMovies,
getMovieCast,
getMovieReviews,
getMovieGenres,
discoverMovies,
} = require("../controllers/movieController");

router.get("/trending", getTrendingMovies);

router.get("/popular", getPopularMovies);

router.get("/top-rated", getTopRatedMovies);

router.get("/upcoming", getUpcomingMovies);

router.get("/search", searchMovies);
router.get("/genres/list", getMovieGenres);
router.get("/discover", discoverMovies);

router.get("/:id", getMovieDetails);
router.get("/:id/trailer", getMovieTrailer);
router.get("/:id/similar", getSimilarMovies);
router.get("/:id/cast", getMovieCast);
router.get("/:id/reviews", getMovieReviews);

module.exports = router;