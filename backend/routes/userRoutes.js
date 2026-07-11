const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount,
} = require("../controllers/userController");

// ======================
// User Routes
// ======================

// Get Logged-in User Profile
router.get("/profile", protect, getProfile);

// Update Profile
router.put("/profile", protect, updateProfile);

// Change Password
router.put("/change-password", protect, changePassword);

// Delete Account
router.delete("/delete-account", protect, deleteAccount);

module.exports = router;