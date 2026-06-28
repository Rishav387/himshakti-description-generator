/**
 * api.js — Centralized API call utility for the HimShakti frontend.
 * All fetch calls to the backend go through here.
 */

const BASE_URL = "http://localhost:5000/api";

/**
 * Generic fetch wrapper with error handling
 */
const request = async (endpoint, options = {}) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong");
  }

  return data;
};

// ── Product API calls ──────────────────────────────────────────────────────

/** GET /api/products — fetch all products, optional category filter */
export const getAllProducts = (category = "") => {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return request(`/products${query}`);
};

/** GET /api/products/search?q= — search products */
export const searchProducts = (q) =>
  request(`/products/search?q=${encodeURIComponent(q)}`);

/** GET /api/products/:id — fetch single product */
export const getProductById = (id) => request(`/products/${id}`);

/** POST /api/products — create a new product */
export const createProduct = (productData) =>
  request("/products", {
    method: "POST",
    body: JSON.stringify(productData),
  });

/** PUT /api/products/:id — update a product */
export const updateProduct = (id, productData) =>
  request(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(productData),
  });

/** PATCH /api/products/:id — partial update (e.g. toggle inStock) */
export const patchProduct = (id, fields) =>
  request(`/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(fields),
  });

/** DELETE /api/products/:id — delete a product */
export const deleteProduct = (id) =>
  request(`/products/${id}`, { method: "DELETE" });