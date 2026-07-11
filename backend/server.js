const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");
const movieRoutes = require("./routes/movieRoutes");
const userRoutes = require("./routes/userRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");
const aiRoutes = require("./routes/aiRoutes");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/movies", movieRoutes);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/ai", aiRoutes);


// Home Route
app.get("/", (req, res) => {
  res.send("Welcome to CineX Backend 🚀");
});

// Protected Route
app.get("/api/profile", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Profile fetched successfully",
    user: req.user,
  });
});

// Port
const PORT = process.env.PORT || 5000;

// Database Connection
connectDB();

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});