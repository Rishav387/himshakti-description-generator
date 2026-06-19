import React, { useEffect, useRef } from "react";

/**
 * Modal
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is visible
 * @param {() => void} props.onClose - Called on backdrop click, Escape key, or close button
 * @param {string} [props.title] - Modal header title
 * @param {React.ReactNode} props.children - Modal body content
 *
 * Behaviour:
 * - Closes on Escape key press
 * - Traps focus within the modal while open (Tab/Shift+Tab cycle inside)
 * - Closes on backdrop click (not on content click)
 * - Restores focus to the previously focused element on close
 */
export default function Modal({ isOpen, onClose, title, children }) {
  const modalRef = useRef(null);
  const previouslyFocused = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement;
    modalRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab") {
        const focusable = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused.current?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-earth-800 rounded-2xl shadow-xl max-w-md w-full max-h-[85vh] overflow-y-auto focus:outline-none"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-earth-100 dark:border-earth-700">
          {title && (
            <h2
              id="modal-title"
              className="text-lg text-earth-900 dark:text-earth-50"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-earth-400 hover:text-earth-700 dark:hover:text-earth-100 text-xl leading-none p-1 rounded-lg hover:bg-earth-100 dark:hover:bg-earth-700 transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
