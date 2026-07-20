import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Loader from "../components/ui/Loader.jsx";

/**
 * ProtectedRoute
 * Wraps any route that requires authentication.
 * Redirects to /login if not logged in.
 * Shows a loader while auth state is being verified.
 */
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-earth-900">
        <Loader variant="spinner" size="lg" label="Verifying session..." />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
