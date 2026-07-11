const express = require("express");
const router = express.Router();

const { recommendMovies } = require("../controllers/aiController");

router.post("/recommend", recommendMovies);

module.exports = router;