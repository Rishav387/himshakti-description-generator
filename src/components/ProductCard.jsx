import React from "react";
import WhatsAppIcon from "./WhatsAppIcon.jsx";

export default function ProductCard({ product }) {
  const { name, price, weight, description, emoji, badge, ingredients, features } = product;

  const waMessage = encodeURIComponent(
    `Hi, I'd like to order *${name}* (₹${price}) from HimShakti. Please share availability and delivery details.`
  );
  const waLink = `https://wa.me/91XXXXXXXXXX?text=${waMessage}`;

  return (
    <article className="bg-white dark:bg-earth-800 rounded-2xl border border-earth-100 dark:border-earth-700 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col">

      {/* Visual area */}
      <div className="bg-gradient-to-br from-earth-50 to-saffron-50 dark:from-earth-700 dark:to-earth-900 h-40 flex items-center justify-center relative">
        <span className="text-6xl">{emoji}</span>
        {badge && (
          <span className="absolute top-3 left-3 bg-saffron-100 dark:bg-saffron-900/60 text-saffron-700 dark:text-saffron-300 text-xs font-semibold px-2.5 py-1 rounded-full">
            {badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <h3
          className="text-lg text-earth-900 dark:text-earth-50 leading-snug"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {name}
        </h3>

        <p className="text-sm text-earth-600 dark:text-earth-300 leading-relaxed flex-1">
          {description}
        </p>

        {/* Ingredients */}
        {ingredients && (
          <p className="text-xs text-earth-500 dark:text-earth-400">
            <span className="font-semibold">Ingredients:</span> {ingredients}
          </p>
        )}

        {/* Features */}
        {features && features.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {features.map((f) => (
              <span
                key={f}
                className="bg-earth-100 dark:bg-earth-700 text-earth-700 dark:text-earth-200 text-xs px-2 py-0.5 rounded-full"
              >
                {f}
              </span>
            ))}
          </div>
        )}

        {/* Price row */}
        <div className="flex items-baseline justify-between pt-1">
          <div>
            <span className="text-2xl font-bold text-earth-900 dark:text-earth-50">₹{price}</span>
            <span className="text-xs text-earth-500 dark:text-earth-400 ml-1">{weight}</span>
          </div>
        </div>

        {/* WhatsApp CTA */}
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp w-full mt-1"
        >
          <WhatsAppIcon className="w-4 h-4 shrink-0" />
          Order on WhatsApp
        </a>
      </div>
    </article>
  );
}
