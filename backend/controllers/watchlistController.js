const Watchlist = require("../models/Watchlist");

// =======================
// ADD TO WATCHLIST
// =======================
const addToWatchlist = async (req, res) => {
  try {
    const {
      movieId,
      title,
      posterPath,
      backdropPath,
      releaseDate,
      rating,
    } = req.body;

    const existingMovie = await Watchlist.findOne({
      user: req.user.id,
      movieId,
    });

    if (existingMovie) {
      return res.status(400).json({
        success: false,
        message: "Movie already exists in watchlist",
      });
    }

    const movie = await Watchlist.create({
      user: req.user.id,
      movieId,
      title,
      posterPath,
      backdropPath,
      releaseDate,
      rating,
    });

    res.status(201).json({
      success: true,
      message: "Movie added to watchlist",
      movie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// GET WATCHLIST
// =======================
const getWatchlist = async (req, res) => {
  try {
    const movies = await Watchlist.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: movies.length,
      watchlist: movies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// REMOVE FROM WATCHLIST
// =======================
const removeFromWatchlist = async (req, res) => {
  try {
    const { movieId } = req.params;

    const movie = await Watchlist.findOneAndDelete({
      user: req.user.id,
      movieId,
    });

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found in watchlist",
      });
    }

    res.status(200).json({
      success: true,
      message: "Movie removed from watchlist",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
};