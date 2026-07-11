const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addFavorite,
  getFavorites,
  removeFavorite,
} = require("../controllers/favoriteController");

router.post("/", protect, addFavorite);

router.get("/", protect, getFavorites);

router.delete("/:movieId", protect, removeFavorite);

module.exports = router;