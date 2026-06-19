import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { Button, Input, Modal, Loader } from "../components/ui";
import { useToast } from "../components/ui/Toast.jsx";

/**
 * UIShowcase — demo page exercising every component in the /components/ui library.
 * Route: /ui-showcase
 */
export default function UIShowcase() {
  const { showToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [loadingDemo, setLoadingDemo] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: "" }));
  };

  const handleValidate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.includes("@")) e.email = "Enter a valid email";
    setErrors(e);
    if (Object.keys(e).length === 0) {
      showToast("Form looks good!", "success");
    } else {
      showToast("Please fix the errors", "error");
    }
  };

  const runLoaderDemo = () => {
    setLoadingDemo(true);
    showToast("Loading started…", "info");
    setTimeout(() => {
      setLoadingDemo(false);
      showToast("Done loading!", "success");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-earth-900 transition-colors">
      <Navbar />

      <main className="flex-1 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          <div className="mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase text-saffron-500 mb-3">
              Component Library
            </p>
            <h1
              className="text-4xl text-earth-900 dark:text-earth-50 mb-4"
              style={{ fontFamily: "Georgia, serif" }}
            >
              UI Showcase
            </h1>
            <p className="text-earth-600 dark:text-earth-300">
              A live demo of every component in <code className="text-sm bg-earth-100 dark:bg-earth-700 px-1.5 py-0.5 rounded">/components/ui</code>.
            </p>
          </div>

          {/* Buttons */}
          <section className="mb-12">
            <h2 className="text-xl text-earth-900 dark:text-earth-50 mb-4" style={{ fontFamily: "Georgia, serif" }}>
              Button
            </h2>
            <div className="bg-earth-50 dark:bg-earth-800 rounded-2xl p-6 flex flex-wrap items-center gap-3">
              <Button variant="primary" size="sm">Primary SM</Button>
              <Button variant="primary" size="md">Primary MD</Button>
              <Button variant="primary" size="lg">Primary LG</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="primary" disabled>Disabled</Button>
            </div>
          </section>

          {/* Input */}
          <section className="mb-12">
            <h2 className="text-xl text-earth-900 dark:text-earth-50 mb-4" style={{ fontFamily: "Georgia, serif" }}>
              Input
            </h2>
            <div className="bg-earth-50 dark:bg-earth-800 rounded-2xl p-6 space-y-4 max-w-sm">
              <Input
                label="Name"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                error={errors.name}
              />
              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
              />
              <Button variant="primary" onClick={handleValidate}>Validate</Button>
            </div>
          </section>

          {/* Modal */}
          <section className="mb-12">
            <h2 className="text-xl text-earth-900 dark:text-earth-50 mb-4" style={{ fontFamily: "Georgia, serif" }}>
              Modal
            </h2>
            <div className="bg-earth-50 dark:bg-earth-800 rounded-2xl p-6">
              <Button variant="primary" onClick={() => setModalOpen(true)}>
                Open Modal
              </Button>
              <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Confirm Order"
              >
                <p className="text-sm text-earth-600 dark:text-earth-300 mb-5">
                  This modal traps focus and closes on the Escape key or backdrop click.
                </p>
                <div className="flex gap-3 justify-end">
                  <Button variant="secondary" onClick={() => setModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setModalOpen(false);
                      showToast("Order confirmed!", "success");
                    }}
                  >
                    Confirm
                  </Button>
                </div>
              </Modal>
            </div>
          </section>

          {/* Toast */}
          <section className="mb-12">
            <h2 className="text-xl text-earth-900 dark:text-earth-50 mb-4" style={{ fontFamily: "Georgia, serif" }}>
              Toast
            </h2>
            <div className="bg-earth-50 dark:bg-earth-800 rounded-2xl p-6 flex flex-wrap gap-3">
              <Button variant="primary" onClick={() => showToast("Saved successfully!", "success")}>
                Success Toast
              </Button>
              <Button variant="outline" onClick={() => showToast("Something went wrong", "error")}>
                Error Toast
              </Button>
              <Button variant="secondary" onClick={() => showToast("Heads up — new update available", "info")}>
                Info Toast
              </Button>
            </div>
          </section>

          {/* Loader */}
          <section className="mb-12">
            <h2 className="text-xl text-earth-900 dark:text-earth-50 mb-4" style={{ fontFamily: "Georgia, serif" }}>
              Loader
            </h2>
            <div className="bg-earth-50 dark:bg-earth-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-8">
                <Loader variant="spinner" size="sm" />
                <Loader variant="spinner" size="md" />
                <Loader variant="spinner" size="lg" label="Loading…" />
              </div>
              <div className="max-w-sm">
                <Loader variant="skeleton" lines={3} />
              </div>
              <Button variant="primary" onClick={runLoaderDemo} disabled={loadingDemo}>
                {loadingDemo ? "Loading…" : "Simulate Fetch (2s)"}
              </Button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
