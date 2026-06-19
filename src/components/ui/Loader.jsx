import React from "react";

/**
 * Loader
 *
 * @param {Object} props
 * @param {'spinner'|'skeleton'} [props.variant='spinner'] - Visual style
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Size of the spinner (ignored for skeleton)
 * @param {number} [props.lines=3] - Number of skeleton lines to render (skeleton variant only)
 * @param {string} [props.label] - Optional text shown next to/under the spinner
 * @param {string} [props.className] - Extra classes
 */
export default function Loader({
  variant = "spinner",
  size = "md",
  lines = 3,
  label,
  className = "",
}) {
  if (variant === "skeleton") {
    return (
      <div className={`w-full space-y-3 ${className}`} role="status" aria-label="Loading">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="h-4 rounded-md bg-earth-200 dark:bg-earth-700 animate-pulse"
            style={{ width: i === lines - 1 ? "60%" : "100%" }}
          />
        ))}
      </div>
    );
  }

  const sizes = {
    sm: "w-4 h-4 border-2",
    md: "w-7 h-7 border-[3px]",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
      role="status"
      aria-label={label || "Loading"}
    >
      <div
        className={`${sizes[size]} rounded-full border-earth-200 dark:border-earth-700 border-t-saffron-500 animate-spin`}
      />
      {label && (
        <p className="text-sm text-earth-500 dark:text-earth-300">{label}</p>
      )}
    </div>
  );
}
