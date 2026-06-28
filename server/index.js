require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const productsRouter = require("./routes/products");
const { errorHandler, notFound } = require("./middleware/errorHandler");

const app = express();

// ── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Health check ─────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "HimShakti API is running",
    version: "1.0.0",
    endpoints: {
      products: "/api/products",
      search: "/api/products/search?q=<query>",
      singleProduct: "/api/products/:id",
    },
  });
});

// ── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/products", productsRouter);

// ── 404 & Error handlers (must be last) ─────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ── Database + Server start ──────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✓ MongoDB Atlas connected");
    app.listen(PORT, () => {
      console.log(`✓ Server running on http://localhost:${PORT}`);
      console.log(`  Environment: ${process.env.NODE_ENV || "development"}`);
    });
  })
  .catch((err) => {
    console.error("✗ MongoDB connection failed:", err.message);
    process.exit(1);
  });
