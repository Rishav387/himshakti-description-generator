const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { protect } = require("../middleware/auth");

/**
 * PUBLIC ROUTES — no auth required, show ALL products
 * Used by Home page, product catalog, WhatsApp ordering
 */

// GET /api/products — all products (public catalog)
router.get("/", async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.inStock !== undefined)
      filter.inStock = req.query.inStock === "true";

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/products/search?q= — search all products (public)
router.get("/search", async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q || q.trim() === "") {
      return res.status(400).json({
        success: false,
        error: "Search query 'q' is required",
      });
    }
    const products = await Product.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
      ],
    });
    res.status(200).json({
      success: true,
      count: products.length,
      query: q,
      data: products,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:id — single product (public)
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: `Product not found with id ${req.params.id}`,
      });
    }
    res.status(200).json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
});

/**
 * PROTECTED ROUTES — auth required, scoped to logged-in user
 * Used by Dashboard — each user manages only their own products
 */

// GET /api/products/my/list — get only MY products (dashboard)
router.get("/my/list", protect, async (req, res, next) => {
  try {
    const filter = { createdBy: req.user._id };
    if (req.query.category) filter.category = req.query.category;

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/products — create product (linked to logged-in user)
router.post("/", protect, async (req, res, next) => {
  try {
    const product = await Product.create({
      ...req.body,
      createdBy: req.user._id,
    });
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (err) {
    next(err);
  }
});

// PUT /api/products/:id — full update (only owner can update)
router.put("/:id", protect, async (req, res, next) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found or you are not authorized to update it",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/products/:id — partial update (only owner)
router.patch("/:id", protect, async (req, res, next) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found or you are not authorized to update it",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product partially updated",
      data: product,
    });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/products/:id — delete (only owner)
router.delete("/:id", protect, async (req, res, next) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found or you are not authorized to delete it",
      });
    }
    res.status(200).json({
      success: true,
      message: `Product '${product.name}' deleted successfully`,
      data: {},
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
