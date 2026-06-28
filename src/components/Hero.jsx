import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-earth-50 overflow-hidden relative">
      {/* Decorative circle */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-saffron-500 opacity-5 translate-x-1/3 -translate-y-1/3 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28 relative">
        <div className="max-w-2xl">

          {/* Eyebrow */}
          <p className="text-xs font-semibold tracking-widest uppercase text-saffron-500 mb-4">
            Uttarakhand, India · Est. 2019
          </p>

          {/* Headline */}
          <h1
            className="text-5xl md:text-6xl text-earth-900 leading-tight mb-6"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Authentic Himalayan{" "}
            <span className="text-saffron-500">Food Products</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg text-earth-700 leading-relaxed mb-10 max-w-xl">
            Healthy traditional snacks made with natural ingredients — handcrafted
            in the Kumaon hills, delivered pan-India. No factories. No preservatives.
            Just the mountains.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-14">
            <Link to="/about" className="btn-primary text-base px-8 py-4">
              Explore Products
            </Link>
            <a
              href="https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%20want%20to%20know%20more%20about%20HimShakti%20products"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-base px-8 py-4"
            >
              Chat with Us
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6 pt-8 border-t border-earth-200">
            {[
              { icon: "🌿", label: "No Preservatives" },
              { icon: "🤲", label: "Handcrafted" },
              { icon: "🏔️", label: "Himalayan Origin" },
              { icon: "📦", label: "Pan-India Delivery" },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-2">
                <span className="text-xl">{b.icon}</span>
                <span className="text-sm font-medium text-earth-700">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
