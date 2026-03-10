import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";

export default function Modal({ open, onClose, children }) {
  useLockBodyScroll(open);

  useEffect(() => {
    function onEsc(e) {
      if (e.key === "Escape") onClose?.();
    }
    if (open) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-70">
      <div className="absolute inset-0 bg-black/45" onClick={onClose} />
      <div className="absolute inset-0 grid place-items-center p-4">
        {children}
      </div>
    </div>,
    document.body
  );
}