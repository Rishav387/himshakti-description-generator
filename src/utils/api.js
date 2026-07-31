/**
 * api.js — Centralized API utility for HimShakti frontend.
 * Uses VITE_API_URL environment variable in production (Vercel),
 * falls back to localhost:5000 in development.
 *
 * Set VITE_API_URL in Vercel dashboard to your Render backend URL.
 * e.g. https://himshakti-api.onrender.com/api
 */

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getToken = () => localStorage.getItem("himshakti-token");

const request = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers,
    ...options,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Something went wrong");
  return data;
};

// ── PUBLIC — Home page catalog (shows ALL products) ────────────────────────

export const getAllProducts = (category = "") => {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return request(`/products${query}`);
};

export const searchProducts = (q) =>
  request(`/products/search?q=${encodeURIComponent(q)}`);

export const getProductById = (id) => request(`/products/${id}`);

// ── PROTECTED — Dashboard (shows only MY products) ────────────────────────

export const getMyProducts = (category = "") => {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return request(`/products/my/list${query}`);
};

export const createProduct = (productData) =>
  request("/products", {
    method: "POST",
    body: JSON.stringify(productData),
  });

export const updateProduct = (id, productData) =>
  request(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(productData),
  });

export const patchProduct = (id, fields) =>
  request(`/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(fields),
  });

export const deleteProduct = (id) =>
  request(`/products/${id}`, { method: "DELETE" });
