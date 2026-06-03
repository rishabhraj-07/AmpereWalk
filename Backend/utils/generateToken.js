const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
};

const setTokenCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 10 * 24 * 60 * 60 * 1000,
  });
};

module.exports = {
  generateToken,
  setTokenCookie,
};
