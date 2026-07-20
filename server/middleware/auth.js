const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * protect middleware
 * Verifies JWT from Authorization header.
 * Returns 401 if missing or invalid.
 */
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Not authorized. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: "User belonging to this token no longer exists.",
      });
    }

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: "Not authorized. Token is invalid or expired.",
    });
  }
};

/**
 * adminOnly middleware
 * Must be used after protect.
 * Returns 403 if user is not admin.
 */
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") return next();
  return res.status(403).json({
    success: false,
    error: "Access denied. Admin only.",
  });
};

module.exports = { protect, adminOnly };
