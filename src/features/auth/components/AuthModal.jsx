import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
    <button type="button" onClick={onClick} className="w-full">
      <div
        className={cn(
          "mx-auto flex h-[180px] w-full max-w-[220px] flex-col items-center justify-center gap-3 rounded-[18px] bg-white transition-all duration-200",
          selected
            ? "border-2 border-[#D66355] shadow-[0_10px_24px_rgba(214,99,85,0.12)]"
            : "border border-[#D1D5DB]"
        )}
      >
        <img
          src={imageSrc}
          alt=""
          className="h-[70px] w-[70px] object-contain sm:h-[76px] sm:w-[76px]"
          draggable={false}
        />
        <div className="text-center text-[12px] font-semibold text-[#111827] sm:text-[13px]">
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

  const getRoleUrls = (role) => {
    if (role === "buyer") {
      return {
        primary: intent === "signup" ? buyerSignupUrl : buyerLoginUrl,
        hasAccess: hasBuyerUrl,
      };
    }

    if (role === "seller") {
      return {
        primary: intent === "signup" ? sellerSignupUrl : sellerLoginUrl,
        hasAccess: hasSellerUrl,
      };
    }

    return {
      primary: "",
      hasAccess: false,
    };
  };

  const handleContinue = () => {
    if (!selectedRole) return;

    const target = getRoleUrls(selectedRole);
    if (!target.hasAccess || !target.primary) return;

    window.location.href = target.primary;
  };

  if (!shown || !portalTarget) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[70] grid place-items-center px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Choose your role"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="absolute inset-0 bg-black/45" />

      <div
        ref={panelRef}
        className="relative w-full max-w-[580px] overflow-hidden rounded-[24px] bg-white shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        >
          ×
        </button>

        <div className="px-5 py-6 text-center sm:px-8 sm:py-8">
          <img
            src={authLogo}
            alt="Real Estate"
            className="mx-auto h-10 w-auto sm:h-11"
            draggable={false}
          />

          <h2 className="mt-5 text-[24px] font-semibold leading-tight text-[#D66355] sm:text-[28px]">
            Choose your role Below
          </h2>

          <p className="mt-2 text-[14px] leading-6 text-slate-500 sm:text-[15px]">
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

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <div className="w-full max-w-[220px]">
              <RoleCard
                selected={selectedRole === "buyer"}
                title="I am a Buyer/ Renter"
                imageSrc={buyerImg}
                onClick={() => setSelectedRole("buyer")}
              />
            </div>

            <div className="w-full max-w-[220px]">
              <RoleCard
                selected={selectedRole === "seller"}
                title="I am a Seller/ Owner"
                imageSrc={sellerImg}
                onClick={() => setSelectedRole("seller")}
              />
            </div>
          </div>

          <div className="mx-auto mt-8 w-full max-w-[360px]">
            <button
              type="button"
              onClick={handleContinue}
              disabled={
                !selectedRole ||
                (selectedRole === "buyer" && !hasBuyerUrl) ||
                (selectedRole === "seller" && !hasSellerUrl)
              }
              className="h-12 w-full rounded-full bg-[#D7665A] px-6 text-[15px] font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
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