import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { Button, Modal, Loader } from "../components/ui/index.js";
import { useToast } from "../components/ui/Toast.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { getMyProducts, createProduct, updateProduct, deleteProduct } from "../utils/api.js";

const EMPTY_FORM = { name: "", category: "Snacks", price: "", weight: "", description: "", ingredients: "", features: "", badge: "", emoji: "🌿", inStock: true };
const CATEGORIES = ["Snacks","Cold-Pressed Oils","Beverages","Pickles","Health Foods","Preserves","Other"];

function ProductForm({ form, onChange }) {
  const inp = "w-full px-4 py-2.5 rounded-xl text-sm border border-earth-200 dark:border-earth-600 bg-earth-50 dark:bg-earth-700 text-earth-900 dark:text-white placeholder:text-earth-400 dark:placeholder:text-earth-400 focus:outline-none focus:ring-2 focus:ring-saffron-400 transition";
  const lbl = "block text-sm font-semibold text-earth-800 dark:text-earth-100 mb-1.5";
  return (
    <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
      <div><label className={lbl}>Product Name *</label><input name="name" value={form.name} onChange={onChange} placeholder="e.g. Himalayan Millet Bar" className={inp} /></div>
      <div>
        <label className={lbl}>Category *</label>
        <select name="category" value={form.category} onChange={onChange} className={inp}>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className={lbl}>Price (₹) *</label><input name="price" type="number" value={form.price} onChange={onChange} placeholder="199" className={inp} /></div>
        <div><label className={lbl}>Weight *</label><input name="weight" value={form.weight} onChange={onChange} placeholder="200g" className={inp} /></div>
      </div>
      <div><label className={lbl}>Description *</label><textarea name="description" value={form.description} onChange={onChange} placeholder="Brief product description" rows={2} className={inp + " resize-none"} /></div>
      <div><label className={lbl}>Ingredients *</label><input name="ingredients" value={form.ingredients} onChange={onChange} placeholder="e.g. Millet, jaggery, ghee" className={inp} /></div>
      <div><label className={lbl}>Features (comma separated)</label><input name="features" value={form.features} onChange={onChange} placeholder="No Preservatives, Handmade" className={inp} /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className={lbl}>Badge</label><input name="badge" value={form.badge} onChange={onChange} placeholder="Bestseller" className={inp} /></div>
        <div><label className={lbl}>Emoji</label><input name="emoji" value={form.emoji} onChange={onChange} placeholder="🌿" className={inp} /></div>
      </div>
      <label className="flex items-center gap-2 text-sm text-earth-700 dark:text-earth-200 cursor-pointer">
        <input type="checkbox" name="inStock" checked={form.inStock} onChange={onChange} className="rounded" />
        In Stock
      </label>
    </div>
  );
}

export default function Dashboard() {
  const { showToast } = useToast();
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchMyProducts = useCallback(async () => {
    setLoading(true);
    try { const res = await getMyProducts(); setProducts(res.data); }
    catch (err) { showToast("Failed to load: " + err.message, "error"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchMyProducts(); }, [fetchMyProducts]);

  const handleCreate = async () => {
    if (!form.name || !form.price || !form.weight || !form.description || !form.ingredients) { showToast("Fill all required fields", "error"); return; }
    setSubmitting(true);
    try {
      await createProduct({ ...form, price: Number(form.price), features: form.features ? form.features.split(",").map(f => f.trim()) : [] });
      showToast("Product created!", "success"); setCreateOpen(false); setForm(EMPTY_FORM); fetchMyProducts();
    } catch (err) { showToast("Create failed: " + err.message, "error"); }
    finally { setSubmitting(false); }
  };

  const openEdit = (p) => {
    setSelectedProduct(p);
    setForm({ name: p.name, category: p.category, price: p.price, weight: p.weight, description: p.description, ingredients: p.ingredients, features: (p.features || []).join(", "), badge: p.badge || "", emoji: p.emoji || "🌿", inStock: p.inStock });
    setEditOpen(true);
  };

  const handleUpdate = async () => {
    setSubmitting(true);
    try {
      await updateProduct(selectedProduct._id, { ...form, price: Number(form.price), features: form.features ? form.features.split(",").map(f => f.trim()) : [] });
      showToast("Updated!", "success"); setEditOpen(false); fetchMyProducts();
    } catch (err) { showToast("Update failed: " + err.message, "error"); }
    finally { setSubmitting(false); }
  };

  const handleDelete = async () => {
    setSubmitting(true);
    try {
      await deleteProduct(selectedProduct._id);
      showToast(`"${selectedProduct.name}" deleted`, "success"); setDeleteOpen(false); fetchMyProducts();
    } catch (err) { showToast("Delete failed: " + err.message, "error"); }
    finally { setSubmitting(false); }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-earth-900 transition-colors">
      <Navbar />
      <main className="flex-1 py-10 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-saffron-500 mb-1">Admin Panel</p>
              <h1 className="text-3xl text-earth-900 dark:text-white" style={{ fontFamily: "Georgia, serif" }}>My Product Dashboard</h1>
              {user && <p className="text-sm text-earth-500 dark:text-earth-300 mt-1">Welcome back, <span className="font-semibold text-saffron-500">{user.name}</span> · {products.length} products</p>}
            </div>
            <Button variant="primary" onClick={() => { setForm(EMPTY_FORM); setCreateOpen(true); }}>+ Add Product</Button>
          </div>

          <div className="bg-saffron-50 dark:bg-saffron-900/20 border border-saffron-100 dark:border-saffron-800 rounded-xl px-5 py-3 mb-6 flex items-center gap-3">
            <span className="text-saffron-500 text-lg">🔒</span>
            <p className="text-sm text-saffron-700 dark:text-saffron-300">You are managing only <strong>your own products</strong>.</p>
          </div>

          {loading ? (
            <div className="py-20"><Loader variant="spinner" size="lg" label="Loading…" /></div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 bg-earth-50 dark:bg-earth-700 rounded-2xl border border-earth-100 dark:border-earth-600">
              <span className="text-6xl mb-4 block">📦</span>
              <h3 className="text-xl text-earth-800 dark:text-white mb-2" style={{ fontFamily: "Georgia, serif" }}>No products yet</h3>
              <p className="text-earth-500 dark:text-earth-300 text-sm mb-6">Add your first product to get started.</p>
              <Button variant="primary" onClick={() => { setForm(EMPTY_FORM); setCreateOpen(true); }}>+ Add First Product</Button>
            </div>
          ) : (
            <div className="bg-white dark:bg-earth-700 rounded-2xl border border-earth-100 dark:border-earth-600 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-earth-50 dark:bg-earth-900 border-b border-earth-100 dark:border-earth-600">
                    <tr>
                      {["Product","Category","Price","Stock","Actions"].map(h => (
                        <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-earth-600 dark:text-earth-300 uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-earth-100 dark:divide-earth-600">
                    {products.map(p => (
                      <tr key={p._id} className="hover:bg-earth-50 dark:hover:bg-earth-600 transition-colors">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{p.emoji}</span>
                            <div>
                              <p className="font-semibold text-earth-900 dark:text-white">{p.name}</p>
                              <p className="text-xs text-earth-400 dark:text-earth-300">{p.weight}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-earth-600 dark:text-earth-200">{p.category}</td>
                        <td className="px-5 py-3 font-bold text-earth-900 dark:text-white text-base">₹{p.price}</td>
                        <td className="px-5 py-3">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${p.inStock ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" : "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-300"}`}>
                            {p.inStock ? "In Stock" : "Out of Stock"}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex gap-2">
                            <Button variant="secondary" size="sm" onClick={() => openEdit(p)}>Edit</Button>
                            <Button variant="outline" size="sm" onClick={() => { setSelectedProduct(p); setDeleteOpen(true); }}
                              className="border-red-300 text-red-500 hover:bg-red-50 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900/20">
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

      <Modal isOpen={createOpen} onClose={() => setCreateOpen(false)} title="Add New Product">
        <ProductForm form={form} onChange={handleChange} />
        <div className="flex gap-3 justify-end mt-5">
          <Button variant="secondary" onClick={() => setCreateOpen(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleCreate} disabled={submitting}>{submitting ? "Creating…" : "Create Product"}</Button>
        </div>
      </Modal>

      <Modal isOpen={editOpen} onClose={() => setEditOpen(false)} title="Edit Product">
        <ProductForm form={form} onChange={handleChange} />
        <div className="flex gap-3 justify-end mt-5">
          <Button variant="secondary" onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleUpdate} disabled={submitting}>{submitting ? "Saving…" : "Save Changes"}</Button>
        </div>
      </Modal>

      <Modal isOpen={deleteOpen} onClose={() => setDeleteOpen(false)} title="Delete Product">
        <p className="text-sm text-earth-600 dark:text-earth-200 mb-5">
          Delete <strong className="text-earth-900 dark:text-white">{selectedProduct?.name}</strong>? This cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleDelete} disabled={submitting} className="bg-red-500 hover:bg-red-600">
            {submitting ? "Deleting…" : "Yes, Delete"}
          </Button>
        </div>
      </Modal>

      <Footer />
    </div>
  );
}
