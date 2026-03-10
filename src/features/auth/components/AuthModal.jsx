import { useEffect, useMemo, useRef } from "react";

// If your project already has shared/ui/Modal and shared/ui/Button, you can swap to them.
// This implementation is self-contained + accessible (ESC, backdrop click, focus trap, restore focus).

import { createPortal } from "react-dom";

function BrandMark() {
  return (
    <div className="flex items-center justify-center gap-2">
      <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true" className="text-slate-900">
        <path
          fill="currentColor"
          d="M12 3 3 10v11h7v-6h4v6h7V10l-9-7z"
        />
      </svg>
      <div className="text-sm font-extrabold tracking-wide">
        <span className="text-[#D7665A]">REAL</span> <span className="text-slate-900">ESTATE</span>
      </div>
    </div>
  );
}

export default function AuthModal({ open, isOpen, onClose, triggerRef }) {
  const shown = Boolean(open ?? isOpen);
  const panelRef = useRef(null);
  const lastActiveRef = useRef(null);

  const portalTarget = useMemo(() => {
    if (typeof document === "undefined") return null;
    return document.body;
  }, []);

  useEffect(() => {
    if (!shown) return;

    lastActiveRef.current = document.activeElement;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose?.();
      }

      // Basic focus trap
      if (e.key === "Tab") {
        const root = panelRef.current;
        if (!root) return;
        const focusables = root.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;

        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);

    // Focus first control
    setTimeout(() => {
      const root = panelRef.current;
      const btn = root?.querySelector("button");
      btn?.focus();
    }, 0);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [shown, onClose]);

  useEffect(() => {
    if (shown) return;

    // restore focus to trigger or last active
    const t = triggerRef?.current;
    if (t && typeof t.focus === "function") {
      t.focus();
      return;
    }
    const last = lastActiveRef.current;
    if (last && typeof last.focus === "function") last.focus();
  }, [shown, triggerRef]);

  if (!shown || !portalTarget) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 grid place-items-center px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Login or Signup"
      onMouseDown={(e) => {
        // backdrop click
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Panel */}
      <div
        ref={panelRef}
        className="relative w-full max-w-180 overflow-hidden rounded-2xl bg-white shadow-xl"
      >
        <div className="px-6 py-10 sm:px-10 sm:py-12 text-center">
          <BrandMark />

          <h2 className="mt-6 text-2xl font-semibold text-slate-900">Login or Signup</h2>
          <p className="mt-2 text-sm text-slate-500">
            You can access and discover more app patterns <br className="hidden sm:block" />
            by logging in or signing up
          </p>

          <button
            type="button"
            className="mt-8 w-full rounded-xl bg-[#D7665A] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
            onClick={() => {
              // This project likely has real auth flow; keep modal UI pixel-perfect.
              onClose?.();
            }}
          >
            Login
          </button>

          <div className="mt-3 text-sm text-slate-600">
            Don’t have an account?{" "}
            <button
              type="button"
              className="font-medium text-[#D7665A] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
              onClick={() => {
                // swap mode if your existing AuthModal supports it
              }}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>,
    portalTarget
  );
}