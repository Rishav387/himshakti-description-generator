import React from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          {/* Page header */}
          <div className="mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase text-saffron-500 mb-3">
              Our Story
            </p>
            <h1
              className="text-4xl md:text-5xl text-earth-900 mb-6"
              style={{ fontFamily: "Georgia, serif" }}
            >
              About HimShakti
            </h1>
            <p className="text-lg text-earth-700 leading-relaxed max-w-2xl">
              HimShakti is a Himalayan food processing brand focusing on
              traditional products made by local women's self-help groups in the
              Kumaon region of Uttarakhand, India.
            </p>
          </div>

          {/* Story sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
            {[
              {
                icon: "🌱",
                title: "How We Started",
                body: "Founded in 2019, HimShakti began as a small initiative to help rural women in Uttarakhand earn a sustainable livelihood by processing and selling traditional Kumaoni food products.",
              },
              {
                icon: "🤲",
                title: "Our Mission",
                body: "We believe the best food comes from the best intentions. Every product is handcrafted without shortcuts — preserving traditional recipes while creating economic opportunity for mountain communities.",
              },
              {
                icon: "🏔️",
                title: "Our Region",
                body: "Nestled in the Kumaon hills at altitudes above 1,800m, our produce benefits from clean air, glacial water, and mineral-rich soils that simply cannot be replicated in a factory.",
              },
              {
                icon: "📦",
                title: "How We Deliver",
                body: "We ship pan-India via trusted courier partners, with eco-friendly packaging. WhatsApp ordering keeps things simple — no complicated checkout, just a direct conversation.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl border border-earth-100 p-6 hover:shadow-md transition-shadow"
              >
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <h3
                  className="text-xl text-earth-900 mb-2"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-earth-600 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          {/* Values strip */}
          <div className="bg-saffron-50 border border-saffron-100 rounded-2xl p-8 text-center">
            <h2
              className="text-2xl text-earth-900 mb-2"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Built on three promises
            </h2>
            <p className="text-earth-600 mb-6 text-sm">
              Every HimShakti product stands on these principles.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              {["No Preservatives", "Handcrafted Always", "Community First"].map((v) => (
                <div key={v} className="flex items-center gap-2 justify-center">
                  <span className="w-2 h-2 bg-saffron-500 rounded-full" />
                  <span className="font-semibold text-earth-800 text-sm">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
