const Favorite = require("../models/Favorite");

// =======================
// ADD FAVORITE
// =======================
const addFavorite = async (req, res) => {
  try {
    const {
      movieId,
      title,
      posterPath,
      backdropPath,
      releaseDate,
      rating,
    } = req.body;

    // Check already exists
    const existingFavorite = await Favorite.findOne({
      user: req.user.id,
      movieId,
    });

    if (existingFavorite) {
      return res.status(400).json({
        success: false,
        message: "Movie already added to favorites",
      });
    }

    const favorite = await Favorite.create({
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
      message: "Movie added to favorites",
      favorite,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// GET FAVORITES
// =======================
const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: favorites.length,
      favorites,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================
// REMOVE FAVORITE
// =======================
const removeFavorite = async (req, res) => {
  try {
    const { movieId } = req.params;

    const favorite = await Favorite.findOneAndDelete({
      user: req.user.id,
      movieId,
    });

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: "Favorite movie not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Movie removed from favorites",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addFavorite,
  getFavorites,
  removeFavorite,
};