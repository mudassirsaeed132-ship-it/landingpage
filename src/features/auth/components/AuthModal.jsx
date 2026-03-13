import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import { cn } from "../../../shared/lib/cn";

import authLogo from "../../../assets/images/auth/auth-logo.png";
import buyerImg from "../../../assets/images/auth/role-buyer.png";
import sellerImg from "../../../assets/images/auth/role-seller.png";

function buildUrl(base, path) {
  const cleanBase = String(base || "").replace(/\/$/, "");
  if (!cleanBase) return "";
  return `${cleanBase}${path}`;
}

function RoleCard({ selected, title, imageSrc, onClick, shouldReduceMotion }) {
  return (
    <m.button
      type="button"
      onClick={onClick}
      className="w-full outline-none"
      aria-pressed={selected}
      whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.01 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      <div
        className={cn(
          "mx-auto flex h-[152px] w-full max-w-[190px] flex-col items-center justify-center gap-2.5 rounded-[16px] bg-white px-3 transition-all duration-200",
          "sm:h-[170px] sm:max-w-[220px] sm:gap-3 sm:rounded-[18px]",
          selected
            ? "border-2 border-[#D66355] shadow-[0_12px_28px_rgba(214,99,85,0.12)]"
            : "border border-[#D7DCE3] hover:border-[#D66355]/60"
        )}
      >
        <m.img
          src={imageSrc}
          alt=""
          className="h-[56px] w-[56px] object-contain sm:h-[70px] sm:w-[70px]"
          draggable={false}
          initial={false}
          animate={shouldReduceMotion ? undefined : { scale: selected ? 1.03 : 1 }}
          transition={{ duration: 0.18 }}
        />

        <div className="text-center text-[12px] font-semibold leading-4.5 text-[#111827] sm:text-[14px] sm:leading-5">
          {title}
        </div>
      </div>
    </m.button>
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
  const shouldReduceMotion = useReducedMotion();

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

  const overlayMotion = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.18, ease: "easeOut" },
      };

  const panelMotion = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12, scale: 0.985 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 8, scale: 0.985 },
        transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
      };

  const contentMotion = shouldReduceMotion
    ? {}
    : {
        initial: "hidden",
        animate: "visible",
        variants: {
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.04,
              delayChildren: 0.03,
            },
          },
        },
      };

  const itemMotion = shouldReduceMotion
    ? {}
    : {
        variants: {
          hidden: { opacity: 0, y: 8 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.18, ease: "easeOut" },
          },
        },
      };

  if (!shown || !portalTarget) return null;

  return createPortal(
    <LazyMotion features={domAnimation}>
      <m.div
        className="fixed inset-0 z-[70] grid place-items-center px-3 py-4 sm:px-5 sm:py-6"
        role="dialog"
        aria-modal="true"
        aria-label="Choose your role"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onClose?.();
        }}
        {...overlayMotion}
      >
        <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" />

        <m.div
          ref={panelRef}
          className={cn(
            "relative w-full max-w-[94vw] overflow-hidden rounded-[22px] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.22)]",
            "sm:max-w-[560px] sm:rounded-[24px]"
          )}
          {...panelMotion}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-2.5 top-2.5 inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 sm:right-4 sm:top-4 sm:h-9 sm:w-9"
          >
            <X size={17} />
          </button>

          <m.div
            className="px-4 pb-5 pt-4 text-center sm:px-8 sm:pb-8 sm:pt-6"
            {...contentMotion}
          >
            <m.img
              src={authLogo}
              alt="Real Estate"
              className="mx-auto h-8 w-auto sm:h-12"
              draggable={false}
              {...itemMotion}
            />

            <m.h2
              className="mt-3 text-[22px] font-semibold leading-tight text-[#D66355] sm:mt-5 sm:text-[30px]"
              {...itemMotion}
            >
              Choose your role Below
            </m.h2>

            <m.p
              className="mx-auto mt-1.5 max-w-[340px] text-[13px] leading-5 text-slate-500 sm:mt-2 sm:max-w-[420px] sm:text-[15px] sm:leading-6"
              {...itemMotion}
            >
              Select your portal to continue with the right flow.
            </m.p>

            {!hasBuyerUrl || !hasSellerUrl ? (
              <m.div
                className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-left text-sm text-amber-800"
                {...itemMotion}
              >
                Set these env variables in your landing project before deploying:
                <div className="mt-2 font-mono text-[12px]">
                  VITE_BUYER_APP_URL=...
                  <br />
                  VITE_SELLER_APP_URL=...
                </div>
              </m.div>
            ) : null}

            <m.div
              className="mt-5 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-5"
              {...itemMotion}
            >
              <RoleCard
                selected={selectedRole === "buyer"}
                title="I am a Buyer/ Renter"
                imageSrc={buyerImg}
                onClick={() => setSelectedRole("buyer")}
                shouldReduceMotion={shouldReduceMotion}
              />

              <RoleCard
                selected={selectedRole === "seller"}
                title="I am a Seller/ Owner"
                imageSrc={sellerImg}
                onClick={() => setSelectedRole("seller")}
                shouldReduceMotion={shouldReduceMotion}
              />
            </m.div>

            <m.div
              className="mx-auto mt-5 w-full max-w-[320px] sm:mt-8 sm:max-w-[360px]"
              {...itemMotion}
            >
              <m.button
                type="button"
                onClick={handleContinue}
                disabled={
                  !selectedRole ||
                  (selectedRole === "buyer" && !hasBuyerUrl) ||
                  (selectedRole === "seller" && !hasSellerUrl)
                }
                className="h-11 w-full rounded-full bg-[#D7665A] px-5 text-[14px] font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50 sm:h-[50px] sm:px-6 sm:text-[16px]"
                whileHover={shouldReduceMotion ? undefined : { scale: 1.01 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
                transition={{ duration: 0.16 }}
              >
                {intent === "signup" ? "Continue to Sign up" : "Continue to Login"}
              </m.button>
            </m.div>
          </m.div>
        </m.div>
      </m.div>
    </LazyMotion>,
    portalTarget
  );
}