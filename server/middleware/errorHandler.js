/**
 * errorHandler middleware
 * Catches all errors passed via next(err) and returns a
 * consistent JSON error response with the correct HTTP status code.
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Mongoose validation error (e.g. required field missing)
  if (err.name === "ValidationError") {
    statusCode = 400;
    const fields = Object.values(err.errors).map((e) => e.message);
    message = fields.join(", ");
  }

  // Mongoose bad ObjectId (e.g. /products/not-a-valid-id)
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 400;
    message = `Invalid ID format: ${err.value}`;
  }

  // Mongoose duplicate key error (e.g. unique field conflict)
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    message = `A product with this ${field} already exists`;
  }

  // Log server errors in development
  if (statusCode === 500 && process.env.NODE_ENV !== "production") {
    console.error("Server Error:", err.stack);
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

/**
 * notFound middleware
 * Handles requests to routes that don't exist.
 */
const notFound = (req, res, next) => {
  const err = new Error(`Route not found: ${req.originalUrl}`);
  err.statusCode = 404;
  next(err);
};

module.exports = { errorHandler, notFound };
