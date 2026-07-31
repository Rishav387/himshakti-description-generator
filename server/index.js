require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("./config/passport");
const productsRouter = require("./routes/products");
const authRouter = require("./routes/auth");
const aiRouter = require("./routes/ai");
const { errorHandler, notFound } = require("./middleware/errorHandler");

const app = express();

// ── CORS — allow both local dev and production frontend ───────────────────
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  process.env.CLIENT_URL, // production Vercel URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS policy does not allow origin: ${origin}`));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// ── Health check ─────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "HimShakti API is running",
    version: "4.0.0",
    environment: process.env.NODE_ENV || "development",
    endpoints: {
      auth: "/api/auth",
      products: "/api/products",
      ai: "/api/ai/generate-description",
    },
  });
});

// ── Routes ───────────────────────────────────────────────────────────────
app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/ai", aiRouter);

// ── 404 & Error handlers ─────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ── Database + Server ─────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✓ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`✓ Server running on port ${PORT}`);
      console.log(`  Environment: ${process.env.NODE_ENV || "development"}`);
    });
  })
  .catch((err) => {
    console.error("✗ MongoDB connection failed:", err.message);
    process.exit(1);
  });
