import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../components/ui/Toast.jsx";
import Loader from "../components/ui/Loader.jsx";

/**
 * OAuthCallback
 * Google redirects here after OAuth with ?token=xxx in the URL.
 * We store the token and redirect to dashboard.
 */
export default function OAuthCallback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    const token = params.get("token");
    const error = params.get("error");

    if (error) {
      showToast("Google sign-in failed. Please try again.", "error");
      navigate("/login");
      return;
    }

    if (token) {
      localStorage.setItem("himshakti-token", token);
      showToast("Signed in with Google!", "success");
      // Force page reload so AuthContext picks up the new token
      window.location.href = "/dashboard";
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-earth-900">
      <Loader variant="spinner" size="lg" label="Completing sign-in..." />
    </div>
  );
}
