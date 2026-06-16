import React from "react";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import ProductCard from "../components/ProductCard.jsx";
import Footer from "../components/Footer.jsx";

const products = [
  {
    id: 1,
    name: "Millet Snack Bar",
    price: 199,
    weight: "250g",
    description: "Healthy Himalayan snack made from stone-ground finger millet and raw Kumaoni jaggery. No preservatives, handcrafted in small batches.",
    emoji: "🌾",
    badge: "Bestseller",
    ingredients: "Finger millet, jaggery, sesame, ghee",
    features: ["No Preservatives", "Handmade", "Rich in Iron"],
  },
  {
    id: 2,
    name: "Fruit Pickle",
    price: 149,
    weight: "500g",
    description: "Traditional recipe pickle made with Himalayan fruits, mustard oil, and sun-dried mountain spices. Four-generation family recipe.",
    emoji: "🥭",
    badge: "Traditional",
    ingredients: "Mixed fruits, mustard oil, fenugreek, chili",
    features: ["Traditional Recipe", "No Artificial Color", "Glass Jar"],
  },
  {
    id: 3,
    name: "Rhododendron Squash",
    price: 249,
    weight: "750ml",
    description: "Handpicked buransh flowers from above 2,000m, slow-cooked into a vivid crimson squash. One part squash, four parts water.",
    emoji: "🌺",
    badge: "Seasonal",
    ingredients: "Rhododendron flowers, sugar, lemon",
    features: ["Natural Color", "No Artificial Flavors", "Seasonal"],
  },
  {
    id: 4,
    name: "Black Soybean Sattu",
    price: 229,
    weight: "400g",
    description: "Roasted black soybeans stone-ground with rock salt and cumin. 40g protein per 100g. Instant Himalayan energy drink.",
    emoji: "⚫",
    badge: "High Protein",
    ingredients: "Black soybeans, rock salt, cumin",
    features: ["40g Protein/100g", "Gluten Free", "Instant"],
  },
  {
    id: 5,
    name: "Wild Apricot Oil",
    price: 349,
    weight: "100ml",
    description: "Cold-pressed from wild Himalayan apricot kernels at altitude. Rich in oleic acid, used for centuries in Uttarakhand.",
    emoji: "🍑",
    badge: "Cold Pressed",
    ingredients: "Wild apricot kernels",
    features: ["Cold Pressed", "Pure", "Multi-use"],
  },
  {
    id: 6,
    name: "Kafal Berry Jam",
    price: 299,
    weight: "200g",
    description: "Kafal berries ripen for just 3 weeks each May. Picked, cooked, and jarred within 24 hours. No pectin, no artificial colour.",
    emoji: "🍇",
    badge: "Limited",
    ingredients: "Kafal berries, sugar, lemon",
    features: ["No Pectin", "Limited Batch", "Natural"],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero section */}
        <Hero />

        {/* Products section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {/* Section header */}
            <div className="text-center mb-12">
              <p className="text-xs font-semibold tracking-widest uppercase text-saffron-500 mb-2">
                Our Products
              </p>
              <h2
                className="text-3xl md:text-4xl text-earth-900 mb-4"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Straight from the Himalayas
              </h2>
              <p className="text-earth-600 max-w-xl mx-auto">
                Every product is handcrafted in small batches using traditional
                Kumaoni recipes and natural mountain ingredients.
              </p>
            </div>

            {/* Product grid — responsive */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
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
