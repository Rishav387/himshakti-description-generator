/**
 * api.js — Centralized API utility for HimShakti frontend.
 * Automatically attaches JWT token from localStorage to all requests.
 */

const BASE_URL = "http://localhost:5000/api";

// Get token from localStorage
const getToken = () => localStorage.getItem("himshakti-token");

// Generic fetch wrapper — attaches JWT if present
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

// ── Product API calls ──────────────────────────────────────────────────────

// GET all products — optional category filter
export const getAllProducts = (category = "") => {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return request(`/products${query}`);
};

// GET search products
export const searchProducts = (q) =>
  request(`/products/search?q=${encodeURIComponent(q)}`);

// GET single product by id
export const getProductById = (id) => request(`/products/${id}`);

// POST create product
export const createProduct = (productData) =>
  request("/products", {
    method: "POST",
    body: JSON.stringify(productData),
  });

// PUT full update
export const updateProduct = (id, productData) =>
  request(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(productData),
  });

// PATCH partial update
export const patchProduct = (id, fields) =>
  request(`/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(fields),
  });

// DELETE product
export const deleteProduct = (id) =>
  request(`/products/${id}`, { method: "DELETE" });
