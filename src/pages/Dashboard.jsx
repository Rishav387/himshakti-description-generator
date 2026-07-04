import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { Button, Input, Modal, Loader } from "../components/ui/index.js";
import { useToast } from "../components/ui/Toast.jsx";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../utils/api.js";

const EMPTY_FORM = {
  name: "",
  category: "Snacks",
  price: "",
  weight: "",
  description: "",
  ingredients: "",
  features: "",
  badge: "",
  emoji: "🌿",
  inStock: true,
};

const CATEGORIES = [
  "Snacks",
  "Cold-Pressed Oils",
  "Beverages",
  "Pickles",
  "Health Foods",
  "Preserves",
  "Other",
];

export default function Dashboard() {
  const { showToast } = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Modal state
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // Form state
  const [form, setForm] = useState(EMPTY_FORM);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ── Fetch all products (READ) ────────────────────────────────────────────
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getAllProducts();
      setProducts(res.data);
    } catch (err) {
      showToast("Failed to load products: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ── Create (POST) ────────────────────────────────────────────────────────
  const handleCreate = async () => {
    if (!form.name || !form.price || !form.weight || !form.description || !form.ingredients) {
      showToast("Please fill in all required fields", "error");
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        features: form.features ? form.features.split(",").map((f) => f.trim()) : [],
      };
      await createProduct(payload);
      showToast("Product created successfully!", "success");
      setCreateOpen(false);
      setForm(EMPTY_FORM);
      fetchProducts();
    } catch (err) {
      showToast("Create failed: " + err.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Update (PUT) ─────────────────────────────────────────────────────────
  const openEdit = (product) => {
    setSelectedProduct(product);
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      weight: product.weight,
      description: product.description,
      ingredients: product.ingredients,
      features: (product.features || []).join(", "),
      badge: product.badge || "",
      emoji: product.emoji || "🌿",
      inStock: product.inStock,
    });
    setEditOpen(true);
  };

  const handleUpdate = async () => {
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        features: form.features ? form.features.split(",").map((f) => f.trim()) : [],
      };
      await updateProduct(selectedProduct._id, payload);
      showToast("Product updated successfully!", "success");
      setEditOpen(false);
      fetchProducts();
    } catch (err) {
      showToast("Update failed: " + err.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Delete ───────────────────────────────────────────────────────────────
  const openDelete = (product) => {
    setSelectedProduct(product);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    setSubmitting(true);
    try {
      await deleteProduct(selectedProduct._id);
      showToast(`"${selectedProduct.name}" deleted`, "success");
      setDeleteOpen(false);
      fetchProducts();
    } catch (err) {
      showToast("Delete failed: " + err.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-earth-900 transition-colors">
      <Navbar />

      <main className="flex-1 py-10 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          {/* Header */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-saffron-500 mb-1">
                Admin Panel
              </p>
              <h1 className="text-3xl text-earth-900 dark:text-earth-50" style={{ fontFamily: "Georgia, serif" }}>
                Product Dashboard
              </h1>
              <p className="text-sm text-earth-500 dark:text-earth-400 mt-1">
                {products.length} products in database · Full CRUD via MongoDB
              </p>
            </div>
            <Button variant="primary" onClick={() => { setForm(EMPTY_FORM); setCreateOpen(true); }}>
              + Add Product
            </Button>
          </div>

          {/* READ — Product table */}
          {loading ? (
            <div className="py-20"><Loader variant="spinner" size="lg" label="Loading products…" /></div>
          ) : (
            <div className="bg-white dark:bg-earth-800 rounded-2xl border border-earth-100 dark:border-earth-700 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-earth-50 dark:bg-earth-700 border-b border-earth-100 dark:border-earth-600">
                    <tr>
                      {["Product", "Category", "Price", "Stock", "Actions"].map((h) => (
                        <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-earth-600 dark:text-earth-300 uppercase tracking-wide">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-earth-100 dark:divide-earth-700">
                    {products.map((p) => (
                      <tr key={p._id} className="hover:bg-earth-50 dark:hover:bg-earth-700/50 transition-colors">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{p.emoji}</span>
                            <div>
                              <p className="font-semibold text-earth-900 dark:text-earth-50">{p.name}</p>
                              <p className="text-xs text-earth-400">{p.weight}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-earth-600 dark:text-earth-300">{p.category}</td>
                        <td className="px-5 py-3 font-semibold text-earth-900 dark:text-earth-50">₹{p.price}</td>
                        <td className="px-5 py-3">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${p.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                            {p.inStock ? "In Stock" : "Out of Stock"}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex gap-2">
                            <Button variant="secondary" size="sm" onClick={() => openEdit(p)}>Edit</Button>
                            <Button variant="outline" size="sm" onClick={() => openDelete(p)}
                              className="border-red-300 text-red-500 hover:bg-red-50">
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* CREATE Modal */}
      <Modal isOpen={createOpen} onClose={() => setCreateOpen(false)} title="Add New Product">
        <ProductForm form={form} onChange={handleChange} />
        <div className="flex gap-3 justify-end mt-5">
          <Button variant="secondary" onClick={() => setCreateOpen(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleCreate} disabled={submitting}>
            {submitting ? "Creating…" : "Create Product"}
          </Button>
        </div>
      </Modal>

      {/* EDIT Modal */}
      <Modal isOpen={editOpen} onClose={() => setEditOpen(false)} title="Edit Product">
        <ProductForm form={form} onChange={handleChange} />
        <div className="flex gap-3 justify-end mt-5">
          <Button variant="secondary" onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleUpdate} disabled={submitting}>
            {submitting ? "Saving…" : "Save Changes"}
          </Button>
        </div>
      </Modal>

      {/* DELETE Confirm Modal */}
      <Modal isOpen={deleteOpen} onClose={() => setDeleteOpen(false)} title="Delete Product">
        <p className="text-sm text-earth-600 dark:text-earth-300 mb-5">
          Are you sure you want to delete <strong>{selectedProduct?.name}</strong>?
          This action cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleDelete} disabled={submitting}
            className="bg-red-500 hover:bg-red-600">
            {submitting ? "Deleting…" : "Yes, Delete"}
          </Button>
        </div>
      </Modal>

      <Footer />
    </div>
  );
}

// ── Shared form for Create and Edit ─────────────────────────────────────────
function ProductForm({ form, onChange }) {
  return (
    <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
      <Input label="Product Name *" name="name" value={form.name} onChange={onChange} placeholder="e.g. Himalayan Millet Bar" />
      <div>
        <label className="block text-sm font-semibold text-earth-800 dark:text-earth-100 mb-1.5">Category *</label>
        <select name="category" value={form.category} onChange={onChange}
          className="w-full px-4 py-2.5 rounded-xl text-sm border border-earth-200 dark:border-earth-600 bg-earth-50 dark:bg-earth-800 text-earth-900 dark:text-earth-50 focus:outline-none focus:ring-2 focus:ring-saffron-400">
          {["Snacks","Cold-Pressed Oils","Beverages","Pickles","Health Foods","Preserves","Other"].map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Input label="Price (₹) *" name="price" type="number" value={form.price} onChange={onChange} placeholder="199" />
        <Input label="Weight *" name="weight" value={form.weight} onChange={onChange} placeholder="200g" />
      </div>
      <Input label="Description *" name="description" value={form.description} onChange={onChange} placeholder="Brief product description" />
      <Input label="Ingredients *" name="ingredients" value={form.ingredients} onChange={onChange} placeholder="e.g. Millet, jaggery, ghee" />
      <Input label="Features (comma separated)" name="features" value={form.features} onChange={onChange} placeholder="No Preservatives, Handmade" />
      <div className="grid grid-cols-2 gap-3">
        <Input label="Badge" name="badge" value={form.badge} onChange={onChange} placeholder="Bestseller" />
        <Input label="Emoji" name="emoji" value={form.emoji} onChange={onChange} placeholder="🌿" />
      </div>
      <label className="flex items-center gap-2 text-sm text-earth-700 dark:text-earth-200 cursor-pointer">
        <input type="checkbox" name="inStock" checked={form.inStock} onChange={onChange} className="rounded" />
        In Stock
      </label>
    </div>
  );
}
