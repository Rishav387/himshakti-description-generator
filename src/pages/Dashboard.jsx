import React from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const UPCOMING = [
  {
    icon: "✍️",
    title: "AI Description Generator",
    desc: "Enter product details and generate professional e-commerce descriptions in Premium, Traditional, or Health-Focused tone.",
    tag: "Coming Week 3",
  },
  {
    icon: "📢",
    title: "AI Marketing Captions",
    desc: "Generate short promotional text and social media captions for Instagram, WhatsApp Status, and Flipkart listings.",
    tag: "Coming Week 4",
  },
  {
    icon: "📦",
    title: "Product Manager",
    desc: "Add, edit, and manage your product catalog. Update prices, ingredients, and availability in real time.",
    tag: "Coming Soon",
  },
  {
    icon: "📊",
    title: "Order Tracker",
    desc: "View and manage WhatsApp orders, track delivery status, and maintain a customer contact list.",
    tag: "Coming Soon",
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-earth-900 transition-colors">
      <Navbar />

      <main className="flex-1 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">

          {/* Page header */}
          <div className="mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase text-saffron-500 mb-3">
              Admin Panel
            </p>
            <h1
              className="text-4xl md:text-5xl text-earth-900 dark:text-earth-50 mb-4"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Dashboard
            </h1>
            <p className="text-lg text-earth-700 dark:text-earth-300 max-w-xl">
              Manage products and AI marketing tools here. Features are being
              built week-by-week during SIP 2026.
            </p>
          </div>

          {/* Status banner */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl px-5 py-4 flex items-start gap-3 mb-10">
            <span className="text-amber-500 text-lg mt-0.5">🚧</span>
            <div>
              <p className="font-semibold text-amber-800 dark:text-amber-300 text-sm">Work in Progress</p>
              <p className="text-amber-700 dark:text-amber-400 text-sm">
                This is the Week 2 frontend skeleton. AI features and data integrations
                will be added in upcoming weeks.
              </p>
            </div>
          </div>

          {/* Upcoming features grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {UPCOMING.map((item) => (
              <div
                key={item.title}
                className="bg-white dark:bg-earth-800 rounded-2xl border border-earth-100 dark:border-earth-700 p-6 flex flex-col gap-3 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <span className="text-3xl">{item.icon}</span>
                  <span className="bg-earth-100 dark:bg-earth-700 text-earth-600 dark:text-earth-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                    {item.tag}
                  </span>
                </div>
                <h3
                  className="text-lg text-earth-900 dark:text-earth-50"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-earth-600 dark:text-earth-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
