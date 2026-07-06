const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Welcome to CineX Backend 🚀");
});

// Port
const PORT = process.env.PORT || 5000;

connectDB();

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});