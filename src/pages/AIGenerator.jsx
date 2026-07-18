import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { Button, Input, Loader } from "../components/ui/index.js";
import { useToast } from "../components/ui/Toast.jsx";

const TONES = [
  {
    value: "premium",
    icon: "✨",
    label: "Premium",
    desc: "Aspirational, upscale language for urban buyers",
  },
  {
    value: "traditional",
    icon: "🏔️",
    label: "Traditional",
    desc: "Warm, heritage-driven, authentic storytelling",
  },
  {
    value: "health-focused",
    icon: "🌱",
    label: "Health-Focused",
    desc: "Clean, benefit-led, natural ingredients emphasis",
  },
];

const EMPTY_FORM = {
  productName: "",
  ingredients: "",
  weight: "",
  features: "",
  tone: "premium",
};

const SAMPLE_PRODUCTS = [
  {
    label: "Millet Bar",
    productName: "Himalayan Millet Crunch Bar",
    ingredients: "Finger millet, jaggery, sesame, ghee",
    weight: "200g pack of 6",
    features: "No preservatives, handmade, rich in iron, shelf stable 3 months",
    tone: "health-focused",
  },
  {
    label: "Apricot Oil",
    productName: "Wild Apricot Kernel Oil",
    ingredients: "Wild apricot kernels",
    weight: "100ml",
    features: "Cold pressed, pure, multi-use cooking and skin oil",
    tone: "premium",
  },
  {
    label: "Rhododendron Squash",
    productName: "Buransh Rhododendron Squash",
    ingredients: "Rhododendron flowers, sugar, lemon",
    weight: "750ml bottle",
    features: "Handpicked above 2000m, natural colour, no artificial flavours",
    tone: "traditional",
  },
];

export default function AIGenerator() {
  const { showToast } = useToast();
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [lastForm, setLastForm] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTone = (tone) => setForm((prev) => ({ ...prev, tone }));

  const loadSample = (sample) => {
    setForm({
      productName: sample.productName,
      ingredients: sample.ingredients,
      weight: sample.weight,
      features: sample.features,
      tone: sample.tone,
    });
    setResult(null);
  };

  const validate = () => {
    if (!form.productName.trim()) return "Product name is required";
    if (!form.ingredients.trim()) return "Ingredients are required";
    if (!form.weight.trim()) return "Weight is required";
    if (!form.features.trim()) return "Features are required";
    return null;
  };

  const handleGenerate = async () => {
    const err = validate();
    if (err) { showToast(err, "error"); return; }

    setLoading(true);
    setResult(null);
    setLastForm({ ...form });

    try {
      const token = localStorage.getItem("himshakti-token");
      const res = await fetch("http://localhost:5000/api/ai/generate-description", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.error);

      setResult(data);
      showToast("Description generated!", "success");
    } catch (err) {
      showToast(err.message || "Failed to generate. Try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = async () => {
    if (!lastForm) return;
    setLoading(true);
    setResult(null);

    try {
      const token = localStorage.getItem("himshakti-token");
      const res = await fetch("http://localhost:5000/api/ai/generate-description", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(lastForm),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setResult(data);
      showToast("New description generated!", "success");
    } catch (err) {
      showToast(err.message || "Failed to regenerate.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result?.description) return;
    navigator.clipboard.writeText(result.description).then(() => {
      setCopied(true);
      showToast("Copied to clipboard!", "success");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleClear = () => {
    setForm(EMPTY_FORM);
    setResult(null);
    setLastForm(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-earth-900 transition-colors">
      <Navbar />

      <main className="flex-1 py-10 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          {/* Page header */}
          <div className="mb-10">
            <p className="text-xs font-semibold tracking-widest uppercase text-saffron-500 mb-2">
              AI Feature · Powered by Google Gemini
            </p>
            <h1
              className="text-4xl text-earth-900 dark:text-earth-50 mb-3"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Product Description Generator
            </h1>
            <p className="text-earth-600 dark:text-earth-300 max-w-2xl">
              Enter your product details, choose a tone, and get a professional
              e-commerce description ready for Amazon, Flipkart, or Meesho —
              generated instantly by AI.
            </p>
          </div>

          {/* Sample product buttons */}
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="text-sm text-earth-500 dark:text-earth-400 self-center mr-1">
              Try a sample:
            </span>
            {SAMPLE_PRODUCTS.map((s) => (
              <button
                key={s.label}
                onClick={() => loadSample(s)}
                className="px-3 py-1.5 text-xs font-medium rounded-full bg-earth-100 dark:bg-earth-700 text-earth-700 dark:text-earth-200 hover:bg-saffron-100 hover:text-saffron-700 transition-colors"
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Two column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

            {/* Left — Input form */}
            <div className="bg-white dark:bg-earth-800 rounded-2xl border border-earth-100 dark:border-earth-700 shadow-sm p-6">
              <h2
                className="text-xl text-earth-900 dark:text-earth-50 mb-5"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Product Details
              </h2>

              <div className="space-y-4">
                <Input
                  label="Product Name *"
                  name="productName"
                  placeholder="e.g. Himalayan Millet Crunch Bar"
                  value={form.productName}
                  onChange={handleChange}
                />
                <Input
                  label="Key Ingredients *"
                  name="ingredients"
                  placeholder="e.g. Finger millet, jaggery, sesame, ghee"
                  value={form.ingredients}
                  onChange={handleChange}
                />
                <Input
                  label="Weight / Size *"
                  name="weight"
                  placeholder="e.g. 200g pack of 6 bars"
                  value={form.weight}
                  onChange={handleChange}
                />

                <div>
                  <label className="block text-sm font-semibold text-earth-800 dark:text-earth-100 mb-1.5">
                    Key Features *
                  </label>
                  <textarea
                    name="features"
                    rows={3}
                    placeholder="e.g. No preservatives, handmade, rich in iron, shelf stable 3 months"
                    value={form.features}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl text-sm border border-earth-200 dark:border-earth-600 bg-earth-50 dark:bg-earth-700 text-earth-900 dark:text-earth-50 focus:outline-none focus:ring-2 focus:ring-saffron-400 resize-none transition"
                  />
                </div>

                {/* Tone selector */}
                <div>
                  <label className="block text-sm font-semibold text-earth-800 dark:text-earth-100 mb-2">
                    Tone *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {TONES.map((t) => (
                      <button
                        key={t.value}
                        type="button"
                        onClick={() => handleTone(t.value)}
                        className={`flex flex-col items-start gap-1 p-3 rounded-xl border text-left transition-all ${
                          form.tone === t.value
                            ? "border-saffron-500 bg-saffron-50 dark:bg-saffron-900/20"
                            : "border-earth-200 dark:border-earth-600 hover:border-saffron-300"
                        }`}
                      >
                        <span className="text-lg">{t.icon}</span>
                        <span className="text-xs font-semibold text-earth-900 dark:text-earth-50">
                          {t.label}
                        </span>
                        <span className="text-[10px] text-earth-500 dark:text-earth-400 leading-tight">
                          {t.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 pt-2">
                  <Button
                    variant="secondary"
                    onClick={handleClear}
                    disabled={loading}
                  >
                    Clear
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleGenerate}
                    disabled={loading}
                    className="flex-1"
                  >
                    {loading ? "Generating..." : "Generate Description"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Right — Output */}
            <div className="bg-white dark:bg-earth-800 rounded-2xl border border-earth-100 dark:border-earth-700 shadow-sm p-6 min-h-[400px] flex flex-col">
              <h2
                className="text-xl text-earth-900 dark:text-earth-50 mb-5"
                style={{ fontFamily: "Georgia, serif" }}
              >
                AI Output
              </h2>

              {/* Loading state */}
              {loading && (
                <div className="flex-1 flex flex-col items-center justify-center gap-4">
                  <Loader variant="spinner" size="lg" />
                  <p className="text-sm text-earth-500 dark:text-earth-400">
                    Gemini is writing your description...
                  </p>
                </div>
              )}

              {/* Empty state */}
              {!loading && !result && (
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 py-10">
                  <span className="text-5xl">✍️</span>
                  <p className="font-semibold text-earth-700 dark:text-earth-200">
                    Your description will appear here
                  </p>
                  <p className="text-sm text-earth-500 dark:text-earth-400 max-w-xs">
                    Fill in the product details on the left and click Generate Description
                  </p>
                </div>
              )}

              {/* Result */}
              {!loading && result && (
                <div className="flex-1 flex flex-col gap-4">
                  {/* Meta */}
                  <div className="flex items-center justify-between">
                    <span className="bg-saffron-100 dark:bg-saffron-900/30 text-saffron-700 dark:text-saffron-300 text-xs font-semibold px-2.5 py-1 rounded-full capitalize">
                      {result.tone} tone
                    </span>
                    <span className="text-xs text-earth-400">
                      {result.wordCount} words
                    </span>
                  </div>

                  {/* Description text */}
                  <div className="flex-1 bg-earth-50 dark:bg-earth-700 border-l-4 border-saffron-500 rounded-r-xl p-4">
                    <p className="text-sm text-earth-800 dark:text-earth-100 leading-relaxed">
                      {result.description}
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3">
                    <Button
                      variant="primary"
                      onClick={handleCopy}
                      className="flex-1"
                    >
                      {copied ? "✓ Copied!" : "Copy Text"}
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={handleRegenerate}
                      disabled={loading}
                    >
                      ↻ Regenerate
                    </Button>
                  </div>

                  <p className="text-xs text-earth-400 dark:text-earth-500 bg-earth-50 dark:bg-earth-700 rounded-lg p-3">
                    💡 Not satisfied? Click Regenerate to get a fresh version with the same inputs. Try different tones for different results.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
