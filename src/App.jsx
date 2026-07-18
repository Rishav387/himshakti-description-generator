import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import UIShowcase from "./pages/UIShowcase.jsx";
import OAuthCallback from "./pages/OAuthCallback.jsx";
import AIGenerator from "./pages/AIGenerator.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ToastProvider } from "./components/ui/Toast.jsx";

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/oauth-callback" element={<OAuthCallback />} />

              {/* AI Feature — public so anyone can try it */}
              <Route path="/ai-generator" element={<AIGenerator />} />

              {/* Protected route 1 — Dashboard */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* Protected route 2 — UI Showcase */}
              <Route
                path="/ui-showcase"
                element={
                  <ProtectedRoute>
                    <UIShowcase />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
