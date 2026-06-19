import React, { createContext, useCallback, useContext, useState } from "react";

/**
 * Toast system (built from scratch, no external library)
 *
 * Usage:
 *   1. Wrap your app in <ToastProvider>
 *   2. Call const { showToast } = useToast() anywhere inside
 *   3. showToast('Saved successfully!', 'success')
 *
 * @typedef {'success'|'error'|'info'} ToastType
 *
 * showToast(message: string, type: ToastType = 'info', duration: number = 3000): void
 */

const ToastContext = createContext(undefined);

const STYLES = {
  success: "bg-green-600",
  error: "bg-red-600",
  info: "bg-earth-800",
};

const ICONS = {
  success: "✓",
  error: "✕",
  info: "ℹ",
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "info", duration = 3000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const dismissToast = (id) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast stack — fixed top-right */}
      <div className="fixed top-4 right-4 z-[200] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={`pointer-events-auto flex items-center gap-2 ${STYLES[t.type]} text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg animate-toast-in min-w-[220px] max-w-sm`}
          >
            <span className="font-bold">{ICONS[t.type]}</span>
            <span className="flex-1">{t.message}</span>
            <button
              onClick={() => dismissToast(t.id)}
              aria-label="Dismiss"
              className="text-white/70 hover:text-white text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

/** useToast — returns { showToast } */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}
