const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
} = require("../controllers/authControllers");
const { protect } = require("../middleware/authMiddleware");

//Register a new user
router.post("/signup", registerUser);

// Auth user & get token
router.post("/login", loginUser);

// Clear auth session
router.post("/logout", logoutUser);

//Get user profile
router.get("/profile", protect, getUserProfile);

module.exports = router;
