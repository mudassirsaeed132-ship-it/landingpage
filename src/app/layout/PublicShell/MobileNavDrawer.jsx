import { NAV_LINKS } from "../../../config/siteContent";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useLockBodyScroll } from "../../../shared/hooks/useLockBodyScroll";
import { useUI } from "../../../shared/ui/UIProvider";

export default function MobileNavDrawer({ open, onClose }) {
  const { openAuth } = useUI();
  useLockBodyScroll(open);

  useEffect(() => {
    function onEsc(e) {
      if (e.key === "Escape") onClose();
    }

    if (open) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-[60] ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`absolute right-0 top-0 h-full w-[88%] max-w-sm bg-white shadow-xl transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b p-4">
          <div className="text-sm font-semibold">Menu</div>
          <button className="text-xl" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                openAuth("login");
              }}
              className="rounded-xl border border-[#D66557] px-4 py-3 text-sm font-semibold text-[#D66557]"
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                openAuth("signup");
              }}
              className="rounded-xl bg-[#D66557] px-4 py-3 text-sm font-semibold text-white"
            >
              Signup
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={onClose}
                className="block rounded-xl px-3 py-3 text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t p-4 text-xs text-slate-500">
          © Real estate Copyrights
        </div>
      </div>
    </div>
  );
}