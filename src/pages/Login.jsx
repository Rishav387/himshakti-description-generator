import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { Button, Input } from "../components/ui/index.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../components/ui/Toast.jsx";

export default function Login() {
  const { login, loginWithGoogle } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = "Email is required";
    if (!form.password) e.password = "Password is required";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    try {
      await login(form.email, form.password);
      showToast("Welcome back!", "success");
      navigate("/dashboard");
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-earth-900 transition-colors">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-earth-700 rounded-2xl border border-earth-100 dark:border-earth-700 shadow-sm p-8">

            {/* Header */}
            <div className="text-center mb-8">
              <span className="text-4xl mb-3 block">🌿</span>
              <h1 className="text-3xl text-earth-900 dark:text-earth-50 mb-2" style={{ fontFamily: "Georgia, serif" }}>
                Welcome back
              </h1>
              <p className="text-sm text-earth-600 dark:text-earth-300">
                Sign in to your HimShakti account
              </p>
            </div>

            {/* Google OAuth */}
            <button
              onClick={loginWithGoogle}
              className="w-full flex items-center justify-center gap-3 border border-earth-200 dark:border-earth-600 rounded-xl px-4 py-3 text-sm font-medium text-earth-700 dark:text-earth-200 hover:bg-earth-50 dark:hover:bg-earth-700 transition-colors mb-6"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-earth-200 dark:bg-earth-600" />
              <span className="text-xs text-earth-400">or sign in with email</span>
              <div className="flex-1 h-px bg-earth-200 dark:bg-earth-600" />
            </div>

            {/* Email/Password form */}
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
              />
              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                error={errors.password}
              />
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={loading}
                className="w-full mt-2"
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* Register link */}
            <p className="text-center text-sm text-earth-500 dark:text-earth-400 mt-6">
              Don't have an account?{" "}
              <Link to="/register" className="text-saffron-500 hover:text-saffron-600 font-medium">
                Create one
              </Link>
            </p>
          </div>

          <p className="text-center text-xs text-earth-400 dark:text-earth-500 mt-5">
            © 2026 HimShakti Food Processing Unit
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
