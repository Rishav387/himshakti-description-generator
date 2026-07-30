const mongoose = require("mongoose");

/**
 * Product Schema
 * Each product is linked to the user who created it via createdBy.
 * Public routes show all products; Dashboard shows only user's own products.
 */
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Snacks",
        "Cold-Pressed Oils",
        "Beverages",
        "Pickles",
        "Health Foods",
        "Preserves",
        "Other",
      ],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    weight: {
      type: String,
      required: [true, "Weight/size is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    ingredients: {
      type: String,
      required: [true, "Ingredients are required"],
    },
    features: {
      type: [String],
      default: [],
    },
    badge: {
      type: String,
      default: null,
    },
    emoji: {
      type: String,
      default: "🌿",
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    whatsapp: {
      type: String,
      default: "+91XXXXXXXXXX",
    },
    // Links product to the user who created it
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // null for seeded/global products
    },
  },
  {
    timestamps: true,
  }
);

// Text index for search endpoint
productSchema.index({ name: "text", description: "text" });

module.exports = mongoose.model("Product", productSchema);
