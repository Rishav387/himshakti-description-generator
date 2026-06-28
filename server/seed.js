/**
 * seed.js — Run once to populate your MongoDB Atlas with HimShakti products
 * Usage: node seed.js
 */

require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

const products = [
  {
    name: "Himalayan Millet Crunch Bar",
    category: "Snacks",
    price: 199,
    weight: "200g (pack of 6)",
    description:
      "Stone-ground finger millet meets raw Kumaoni jaggery in these hand-pressed bars. Zero preservatives, shelf-stable for 3 months, packed with iron.",
    ingredients: "Finger millet, jaggery, sesame, ghee",
    features: ["No Preservatives", "Handmade", "Rich in Iron"],
    badge: "Bestseller",
    emoji: "🌾",
    inStock: true,
  },
  {
    name: "Wild Apricot Kernel Oil",
    category: "Cold-Pressed Oils",
    price: 349,
    weight: "100ml",
    description:
      "Cold-pressed from wild Himalayan apricot kernels at altitude. Rich in oleic acid, used for centuries in Uttarakhand as a cooking and skin oil.",
    ingredients: "Wild apricot kernels",
    features: ["Cold Pressed", "Pure", "Multi-use"],
    badge: "Cold Pressed",
    emoji: "🍑",
    inStock: true,
  },
  {
    name: "Rhododendron Squash",
    category: "Beverages",
    price: 249,
    weight: "750ml",
    description:
      "Handpicked buransh flowers from above 2000m, slow-cooked into a vivid crimson squash. One part squash, four parts water.",
    ingredients: "Rhododendron flowers, sugar, lemon",
    features: ["Natural Color", "No Artificial Flavors", "Seasonal"],
    badge: "Seasonal",
    emoji: "🌺",
    inStock: true,
  },
  {
    name: "Pahadi Aloo Pickle",
    category: "Pickles",
    price: 179,
    weight: "250g",
    description:
      "Small-batch pickle made from hill potatoes grown at 1800m, mustard oil, fenugreek, and sun-dried mountain chilies.",
    ingredients: "Hill potatoes, mustard oil, fenugreek, chili",
    features: ["Traditional Recipe", "No Artificial Color", "Glass Jar"],
    badge: "Traditional",
    emoji: "🥔",
    inStock: true,
  },
  {
    name: "Black Soybean Sattu",
    category: "Health Foods",
    price: 229,
    weight: "400g",
    description:
      "Roasted black soybeans stone-ground with rock salt and cumin. 40g protein per 100g. Instant Himalayan energy drink.",
    ingredients: "Black soybeans, rock salt, cumin",
    features: ["40g Protein/100g", "Gluten Free", "Instant"],
    badge: "High Protein",
    emoji: "⚫",
    inStock: true,
  },
  {
    name: "Kafal Berry Jam",
    category: "Preserves",
    price: 299,
    weight: "200g",
    description:
      "Kafal berries ripen for just 3 weeks each May. Picked, cooked, and jarred within 24 hours. No pectin, no artificial colour.",
    ingredients: "Kafal berries, sugar, lemon",
    features: ["No Pectin", "Limited Batch", "Natural"],
    badge: "Limited",
    emoji: "🍇",
    inStock: false,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected for seeding...");

    await Product.deleteMany({});
    console.log("Existing products cleared");

    const inserted = await Product.insertMany(products);
    console.log(`✓ ${inserted.length} products seeded successfully`);

    inserted.forEach((p) => console.log(`  - ${p.name} (${p._id})`));

    await mongoose.disconnect();
    console.log("Done. MongoDB disconnected.");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

seedDB();
