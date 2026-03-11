import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "../../../shared/lib/cn";

import authLogo from "../../../assets/images/auth/auth-logo.png";
import buyerImg from "../../../assets/images/auth/role-buyer.png";
import sellerImg from "../../../assets/images/auth/role-seller.png";

function buildUrl(base, path) {
  const cleanBase = String(base || "").replace(/\/$/, "");
  if (!cleanBase) return "";
  return `${cleanBase}${path}`;
}

function RoleCard({ selected, title, imageSrc, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full outline-none"
      aria-pressed={selected}
    >
      <div
        className={cn(
          "mx-auto flex h-[170px] w-full max-w-[220px] flex-col items-center justify-center gap-3 rounded-[18px] bg-white px-4 transition-all duration-200 sm:h-[182px] sm:max-w-[230px]",
          selected
            ? "border-2 border-[#D66355] shadow-[0_12px_28px_rgba(214,99,85,0.14)]"
            : "border border-[#D7DCE3] hover:border-[#D66355]/60"
        )}
      >
        <img
          src={imageSrc}
          alt=""
          className="h-[68px] w-[68px] object-contain sm:h-[76px] sm:w-[76px]"
          draggable={false}
        />

        <div className="text-center text-[13px] font-semibold leading-5 text-[#111827] sm:text-[14px]">
          {title}
        </div>
      </div>
    </button>
  );
}

export default function AuthModal({
  open,
  isOpen,
  onClose,
  intent = "login",
  triggerRef,
}) {
  const shown = Boolean(open ?? isOpen);
  const panelRef = useRef(null);
  const lastActiveRef = useRef(null);
  const [selectedRole, setSelectedRole] = useState(null);

  const portalTarget = useMemo(() => {
    if (typeof document === "undefined") return null;
    return document.body;
  }, []);

  const BUYER_APP_URL = import.meta.env.VITE_BUYER_APP_URL || "";
  const SELLER_APP_URL = import.meta.env.VITE_SELLER_APP_URL || "";

  const buyerLoginUrl = buildUrl(BUYER_APP_URL, "/auth/login?role=buyer");
  const buyerSignupUrl = buildUrl(BUYER_APP_URL, "/auth/signup?role=buyer");
  const sellerLoginUrl = buildUrl(SELLER_APP_URL, "/auth/login");
  const sellerSignupUrl = buildUrl(SELLER_APP_URL, "/auth/signup");

  const hasBuyerUrl = Boolean(BUYER_APP_URL);
  const hasSellerUrl = Boolean(SELLER_APP_URL);

  useEffect(() => {
    if (!shown) return;

    setSelectedRole(null);
    lastActiveRef.current = document.activeElement;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose?.();
      }

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

    setTimeout(() => {
      const root = panelRef.current;
      const firstButton = root?.querySelector("button:not([disabled])");
      firstButton?.focus();
    }, 0);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [shown, onClose]);

  useEffect(() => {
    if (shown) return;

    const t = triggerRef?.current;
    if (t && typeof t.focus === "function") {
      t.focus();
      return;
    }

    const last = lastActiveRef.current;
    if (last && typeof last.focus === "function") last.focus();
  }, [shown, triggerRef]);

  const getRoleTarget = (role) => {
    if (role === "buyer") {
      return {
        url: intent === "signup" ? buyerSignupUrl : buyerLoginUrl,
        hasAccess: hasBuyerUrl,
      };
    }

    if (role === "seller") {
      return {
        url: intent === "signup" ? sellerSignupUrl : sellerLoginUrl,
        hasAccess: hasSellerUrl,
      };
    }

    return { url: "", hasAccess: false };
  };

  const handleContinue = () => {
    if (!selectedRole) return;

    const target = getRoleTarget(selectedRole);
    if (!target.hasAccess || !target.url) return;

    window.location.href = target.url;
  };

  if (!shown || !portalTarget) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[70] grid place-items-center px-4 py-6 sm:px-6"
      role="dialog"
      aria-modal="true"
      aria-label="Choose your role"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" />

      <div
        ref={panelRef}
        className="relative w-full max-w-[560px] overflow-hidden rounded-[24px] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.22)] sm:max-w-[600px]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 sm:right-4 sm:top-4"
        >
          <X size={18} />
        </button>

        <div className="px-5 pb-6 pt-5 text-center sm:px-8 sm:pb-8 sm:pt-6">
          <img
            src={authLogo}
            alt="Real Estate"
            className="mx-auto h-10 w-auto sm:h-12"
            draggable={false}
          />

          <h2 className="mt-4 text-[24px] font-semibold leading-tight text-[#D66355] sm:mt-5 sm:text-[30px]">
            Choose your role Below
          </h2>

          <p className="mx-auto mt-2 max-w-[420px] text-[14px] leading-6 text-slate-500 sm:text-[15px]">
            Select your portal to continue with the right flow.
          </p>

          {!hasBuyerUrl || !hasSellerUrl ? (
            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-left text-sm text-amber-800">
              Set these env variables in your landing project before deploying:
              <div className="mt-2 font-mono text-[12px]">
                VITE_BUYER_APP_URL=...
                <br />
                VITE_SELLER_APP_URL=...
              </div>
            </div>
          ) : null}

          <div className="mt-7 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5">
            <RoleCard
              selected={selectedRole === "buyer"}
              title="I am a Buyer/ Renter"
              imageSrc={buyerImg}
              onClick={() => setSelectedRole("buyer")}
            />

            <RoleCard
              selected={selectedRole === "seller"}
              title="I am a Seller/ Owner"
              imageSrc={sellerImg}
              onClick={() => setSelectedRole("seller")}
            />
          </div>

          <div className="mx-auto mt-7 w-full max-w-[360px] sm:mt-8">
            <button
              type="button"
              onClick={handleContinue}
              disabled={
                !selectedRole ||
                (selectedRole === "buyer" && !hasBuyerUrl) ||
                (selectedRole === "seller" && !hasSellerUrl)
              }
              className="h-12 w-full rounded-full bg-[#D7665A] px-6 text-[15px] font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50 sm:h-[50px] sm:text-[16px]"
            >
              {intent === "signup" ? "Continue to Sign up" : "Continue to Login"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    portalTarget
  );
}