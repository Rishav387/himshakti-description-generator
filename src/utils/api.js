/**
 * api.js — Centralized API utility for HimShakti frontend.
 * Automatically attaches JWT token from localStorage to all requests.
 *
 * PUBLIC endpoints (no auth) — used by Home page:
 *   getAllProducts, searchProducts, getProductById
 *
 * PROTECTED endpoints (auth required) — used by Dashboard:
 *   getMyProducts, createProduct, updateProduct, patchProduct, deleteProduct
 */

const BASE_URL = "http://localhost:5000/api";

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

/** GET /api/products — fetch ALL products for public catalog */
export const getAllProducts = (category = "") => {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return request(`/products${query}`);
};

/** GET /api/products/search?q= — search all products */
export const searchProducts = (q) =>
  request(`/products/search?q=${encodeURIComponent(q)}`);

/** GET /api/products/:id — fetch single product */
export const getProductById = (id) => request(`/products/${id}`);

// ── PROTECTED — Dashboard (shows only MY products) ────────────────────────

/** GET /api/products/my/list — fetch only products created by logged-in user */
export const getMyProducts = (category = "") => {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return request(`/products/my/list${query}`);
};

/** POST /api/products — create product (linked to logged-in user) */
export const createProduct = (productData) =>
  request("/products", {
    method: "POST",
    body: JSON.stringify(productData),
  });

/** PUT /api/products/:id — full update (only owner) */
export const updateProduct = (id, productData) =>
  request(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(productData),
  });

/** PATCH /api/products/:id — partial update (only owner) */
export const patchProduct = (id, fields) =>
  request(`/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(fields),
  });

/** DELETE /api/products/:id — delete (only owner) */
export const deleteProduct = (id) =>
  request(`/products/${id}`, { method: "DELETE" });
