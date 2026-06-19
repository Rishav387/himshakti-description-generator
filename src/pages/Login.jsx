import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login functionality will be added in a future week.");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-earth-900 transition-colors">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">

          {/* Card */}
          <div className="bg-white dark:bg-earth-800 rounded-2xl border border-earth-100 dark:border-earth-700 shadow-sm p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <span className="text-4xl mb-3 block">🌿</span>
              <h1
                className="text-3xl text-earth-900 dark:text-earth-50 mb-2"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Admin Login
              </h1>
              <p className="text-sm text-earth-600 dark:text-earth-300">
                Admin access page for HimShakti platform management.
              </p>
            </div>

            {/* Notice */}
            <div className="bg-saffron-50 dark:bg-saffron-900/20 border border-saffron-100 dark:border-saffron-700 rounded-xl px-4 py-3 mb-6 text-sm text-saffron-700 dark:text-saffron-300">
              🚧 Authentication will be integrated in a future week.
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-earth-800 dark:text-earth-100 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="admin@himshakti.in"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-earth-200 dark:border-earth-600 rounded-xl text-sm text-earth-900 dark:text-earth-50 bg-earth-50 dark:bg-earth-700 focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-earth-800 dark:text-earth-100 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-earth-200 dark:border-earth-600 rounded-xl text-sm text-earth-900 dark:text-earth-50 bg-earth-50 dark:bg-earth-700 focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition"
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full py-3 mt-2"
              >
                Sign In
              </button>
            </form>
          </div>

          <p className="text-center text-xs text-earth-400 dark:text-earth-500 mt-5">
            © 2026 HimShakti Food Processing Unit · TBI-GEU SIP 2026
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
