import React from "react";
import { useTheme } from "../context/ThemeContext.jsx";

/** ThemeToggle — small icon button that flips light/dark mode and persists choice */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="w-9 h-9 flex items-center justify-center rounded-lg text-earth-700 dark:text-earth-100 hover:bg-earth-100 dark:hover:bg-earth-700 transition-colors text-lg"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
