import React, { useState } from "react";
import WhatsAppIcon from "./WhatsAppIcon.jsx";

/**
 * ProductCard
 * Reusable product card with image support, badge overlay,
 * WhatsApp CTA, and emoji fallback if image fails to load.
 */
export default function ProductCard({ product }) {
  const {
    name, category, price, weight, description,
    emoji, badge, ingredients, features, image, whatsapp,
  } = product;

  const [imgError, setImgError] = useState(false);

  const waMessage = encodeURIComponent(
    `Hi, I'd like to order *${name}* (₹${price}) from HimShakti. Please share availability and delivery details.`
  );
  const waLink = `https://wa.me/${(whatsapp || "+91XXXXXXXXXX").replace(/\D/g, "")}?text=${waMessage}`;

  return (
    <article className="bg-white dark:bg-earth-800 rounded-2xl border border-earth-100 dark:border-earth-700 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col">

      {/* Image / emoji area */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-earth-50 to-saffron-50 dark:from-earth-700 dark:to-earth-900">
        {image && !imgError ? (
          <img
            src={image}
            alt={name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-7xl">{emoji}</span>
          </div>
        )}

        {badge && (
          <span className="absolute top-3 left-3 bg-white/90 dark:bg-earth-800/90 text-saffron-700 dark:text-saffron-300 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
            {badge}
          </span>
        )}

        <span className="absolute bottom-3 right-3 bg-black/40 text-white text-[10px] font-medium px-2 py-0.5 rounded-full backdrop-blur-sm">
          {category}
        </span>
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

        {ingredients && (
          <p className="text-xs text-earth-500 dark:text-earth-400">
            <span className="font-semibold">Ingredients:</span> {ingredients}
          </p>
        )}

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

        <div className="flex items-baseline justify-between pt-1">
          <div>
            <span className="text-2xl font-bold text-earth-900 dark:text-earth-50">₹{price}</span>
            <span className="text-xs text-earth-500 dark:text-earth-400 ml-1">{weight}</span>
          </div>
          {product.inStock === false && (
            <span className="text-xs font-semibold text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded-full">
              Out of Stock
            </span>
          )}
        </div>

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
