const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const { generateToken, setTokenCookie } = require("../utils/generateToken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists", success: false });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "Candidate"
    });
    const token = generateToken(user._id);
    setTokenCookie(res, token);

    if (user) {
      res
        .status(201)
        .json({
          message: "User registered successfully",
          success: true,
          user: { _id: user._id, name: user.name, email: user.email, role: user.role },
        });
    } else {
      res.status(400).json({ message: "Invalid user data", success: false });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", success: false, error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Incorrect password or email", success: false });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(401).json({ message: "Incorrect password or email", success: false });
    }
    const token = generateToken(user._id);
    setTokenCookie(res, token);
    res
      .status(200)
      .json({
        message: "User logged in successfully",
        success: true,
        user: { _id: user._id, name: user.name, email: user.email, role: user.role },
      });
  } catch (error) {
    res.status(500).json({ message: "Server Error", success: false, error: error.message });
  }
};

const logoutUser = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
  });
  res.status(200).json({ message: "Logged out successfully", success: true });
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", success: false, error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
};
