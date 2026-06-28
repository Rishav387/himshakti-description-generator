const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

/**
 * @route   GET /api/products
 * @desc    Get all products (supports ?category= and ?inStock= filters)
 * @access  Public
 */
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

/**
 * @route   GET /api/products/search?q=
 * @desc    Search products by name or description (text search)
 * @access  Public
 */
router.get("/search", async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === "") {
      return res.status(400).json({
        success: false,
        error: "Search query 'q' is required",
      });
    }

    // Case-insensitive partial match on name or description
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

/**
 * @route   GET /api/products/:id
 * @desc    Get a single product by MongoDB _id
 * @access  Public
 */
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: `Product not found with id ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @route   POST /api/products
 * @desc    Create a new product
 * @access  Public (will be protected by auth in future)
 */
router.post("/", async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @route   PUT /api/products/:id
 * @desc    Update a product fully by id
 * @access  Public (will be protected by auth in future)
 */
router.put("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,          // return updated document
        runValidators: true, // run schema validators on update
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        error: `Product not found with id ${req.params.id}`,
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

/**
 * @route   PATCH /api/products/:id
 * @desc    Partially update a product (e.g. toggle inStock, update price only)
 * @access  Public (will be protected by auth in future)
 */
router.patch("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        error: `Product not found with id ${req.params.id}`,
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

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product by id
 * @access  Public (will be protected by auth in future)
 */
router.delete("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: `Product not found with id ${req.params.id}`,
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
