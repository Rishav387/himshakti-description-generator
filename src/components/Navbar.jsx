import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";
import WhatsAppIcon from "./WhatsAppIcon.jsx";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/login", label: "Login" },
  { to: "/ui-showcase", label: "UI Kit" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-white dark:bg-earth-900 border-b border-earth-100 dark:border-earth-700 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <div>
              <p className="font-bold text-earth-900 dark:text-earth-50 text-lg leading-none" style={{ fontFamily: "Georgia, serif" }}>
                HimShakti
              </p>
              <p className="text-[10px] tracking-widest text-earth-500 dark:text-earth-400 uppercase leading-none">
                Foods
              </p>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? "bg-saffron-100 dark:bg-saffron-900/40 text-saffron-600 dark:text-saffron-400"
                    : "text-earth-700 dark:text-earth-200 hover:bg-earth-100 dark:hover:bg-earth-700 hover:text-earth-900 dark:hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
            <a
              href="https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%20want%20to%20order%20from%20HimShakti"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 btn-whatsapp"
            >
              <WhatsAppIcon />
              Order Now
            </a>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="md:hidden flex items-center gap-1">
            <ThemeToggle />
            <button
              className="p-2 rounded-lg text-earth-700 dark:text-earth-100 hover:bg-earth-100 dark:hover:bg-earth-700"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-5 flex flex-col gap-1.5">
                <span className={`block h-0.5 bg-current transition-transform duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`block h-0.5 bg-current transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 bg-current transition-transform duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t border-earth-100 dark:border-earth-700 py-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? "bg-saffron-100 dark:bg-saffron-900/40 text-saffron-600 dark:text-saffron-400"
                    : "text-earth-700 dark:text-earth-200 hover:bg-earth-100 dark:hover:bg-earth-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 pt-2">
              <a
                href="https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%20want%20to%20order%20from%20HimShakti"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full"
              >
                <WhatsAppIcon />
                Order on WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
