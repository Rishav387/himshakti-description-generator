import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import ProductCard from "../components/ProductCard.jsx";
import Footer from "../components/Footer.jsx";
import { Loader } from "../components/ui/index.js";
import { getAllProducts } from "../utils/api.js";
import rhodoSquash from "../assets/images/RhododendronSquash.png";
import alooPickle from "../assets/images/PahadiAlooPickle.png";
import soybeanSattu from "../assets/images/BlackSoybeanSattu.png";
import milletBar from "../assets/images/HimalayanMilletCrunchBar.png";
import tulsiHoney from "../assets/images/tulsi-honey.png";
import kafalJam from "../assets/images/kafal-berry-jam.png";

const PRODUCT_IMAGES = {
  "Pine Needle Tea": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop&auto=format",
  "Wild Apricot Kernel Oil": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=300&fit=crop&auto=format",
  "Rhododendron Squash": rhodoSquash,
  "Pahadi Aloo Pickle": alooPickle,
  "Black Soybean Sattu": soybeanSattu,
  "Himalayan Millet Crunch Bar": milletBar,
  "Himalayan Tulsi Honey": tulsiHoney,
  "Kafal Berry Jam": kafalJam,
};

const CATEGORY_IMAGES = {
  "Snacks": "https://images.unsplash.com/photo-1559181567-c3190bba0ecd?w=400&h=300&fit=crop&auto=format",
  "Cold-Pressed Oils": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=300&fit=crop&auto=format",
  "Beverages": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop&auto=format",
  "Pickles": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop&auto=format",
  "Health Foods": "https://images.unsplash.com/photo-1515543904379-3d757398d905?w=400&h=300&fit=crop&auto=format",
  "Preserves": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop&auto=format",
  "Other": "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=400&h=300&fit=crop&auto=format",
};

const CATEGORIES = ["All", "Snacks", "Cold-Pressed Oils", "Beverages", "Pickles", "Health Foods", "Preserves"];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("");

  const fetchProducts = async (cat) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllProducts(cat === "All" ? "" : cat);
      const withImages = res.data.map((p) => ({
        ...p,
        image: PRODUCT_IMAGES[p.name] || CATEGORY_IMAGES[p.category] || null,
      }));
      setProducts(withImages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(category || "All"); }, [category]);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-earth-900 transition-colors">
      <Navbar />

      <main className="flex-1">
        <Hero />

        <section className="py-16 md:py-20 bg-white dark:bg-earth-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">

            {/* Section header */}
            <div className="text-center mb-10">
              <p className="text-xs font-semibold tracking-widest uppercase text-saffron-500 mb-2">
                Our Products
              </p>
              <h2
                className="text-3xl md:text-4xl text-earth-900 dark:text-earth-50 mb-4"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Straight from the Himalayas
              </h2>
              <p className="text-earth-600 dark:text-earth-300 max-w-xl mx-auto">
                Every product is handcrafted in small batches using traditional
                Kumaoni recipes and natural mountain ingredients.
              </p>
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    (category === cat) || (cat === "All" && !category)
                      ? "bg-saffron-500 text-white"
                      : "bg-earth-100 dark:bg-earth-700 text-earth-700 dark:text-earth-200 hover:bg-earth-200 dark:hover:bg-earth-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Loading state */}
            {loading && (
              <div className="py-20">
                <Loader variant="spinner" size="lg" label="Loading products…" />
              </div>
            )}

            {/* Error state */}
            {!loading && error && (
              <div className="text-center py-16">
                <span className="text-5xl mb-4 block">⚠️</span>
                <p className="text-red-500 dark:text-red-400 mb-4 font-medium">{error}</p>
                <p className="text-earth-500 dark:text-earth-400 text-sm mb-6">
                  Make sure the backend server is running at localhost:5000
                </p>
                <button
                  onClick={() => fetchProducts(category || "All")}
                  className="bg-saffron-500 hover:bg-saffron-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Empty state */}
            {!loading && !error && products.length === 0 && (
              <div className="text-center py-20">
                <span className="text-6xl mb-4 block">🌿</span>
                <h3
                  className="text-xl text-earth-800 dark:text-earth-100 mb-2"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  No products in this category
                </h3>
                <p className="text-earth-500 dark:text-earth-400 text-sm mb-6">
                  Try selecting a different category or check back later.
                </p>
                <button
                  onClick={() => setCategory("")}
                  className="bg-saffron-500 hover:bg-saffron-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
                >
                  View All Products
                </button>
              </div>
            )}

            {/* Product grid */}
            {!loading && !error && products.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* WhatsApp CTA banner */}
        <section className="bg-saffron-500 py-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2
              className="text-3xl text-white mb-3"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Want to place a bulk order?
            </h2>
            <p className="text-saffron-100 mb-8">
              Contact us directly on WhatsApp for bulk pricing, custom packaging,
              and corporate gifting.
            </p>
            <a
              href="https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%20want%20to%20place%20a%20bulk%20order%20from%20HimShakti"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-saffron-600 hover:bg-saffron-50 font-semibold px-8 py-4 rounded-xl transition-colors text-base"
            >
              Chat on WhatsApp
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
