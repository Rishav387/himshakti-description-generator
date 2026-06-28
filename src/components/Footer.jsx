import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-earth-900 text-earth-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🌿</span>
              <p
                className="text-white text-xl"
                style={{ fontFamily: "Georgia, serif" }}
              >
                HimShakti
              </p>
            </div>
            <p className="text-sm text-earth-400 leading-relaxed mb-4">
              Small-batch food products handcrafted in the Kumaon hills of
              Uttarakhand. No factories. No preservatives.
            </p>
            <a
              href="https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%20want%20to%20order%20from%20HimShakti"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              WhatsApp
            </a>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs tracking-widest uppercase text-earth-500 font-semibold mb-4">
              Quick Links
            </p>
            <ul className="space-y-2.5">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About" },
                { to: "/dashboard", label: "Dashboard" },
                { to: "/login", label: "Login" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-earth-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs tracking-widest uppercase text-earth-500 font-semibold mb-4">
              Contact
            </p>
            <ul className="space-y-2.5 text-sm text-earth-400">
              <li>📍 Kumaon Hills, Uttarakhand — 263001</li>
              <li>📱 +91-XXXXXXXXXX</li>
              <li>✉️ hello@himshakti.in</li>
              <li>🕐 Mon–Sat, 9 AM – 6 PM IST</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-earth-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-earth-500">
            © 2026 HimShakti Food Processing Unit. All rights reserved.
          </p>
          <p className="text-xs text-earth-600">
            TBI-GEU SIP 2026 · AI-Assisted Full Stack Track
          </p>
        </div>
      </div>
    </footer>
  );
}
