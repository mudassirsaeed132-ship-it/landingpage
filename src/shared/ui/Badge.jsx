import React from "react";

function cls(...arr) {
  return arr.filter(Boolean).join(" ");
}

/**
 * Badge
 * variants: "default" | "outline" | "accent" | "blue" | "success" | "danger"
 */
export default function Badge({ children, variant = "default", className }) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold leading-none";

  const styles = {
    default: "bg-white/90 text-slate-800 ring-1 ring-slate-200",
    outline: "bg-transparent text-slate-700 ring-1 ring-slate-200",
    accent: "bg-[#D86A60] text-white",
    blue: "bg-[#3A79B8] text-white",
    success: "bg-emerald-600 text-white",
    danger: "bg-rose-600 text-white",
  };

  return <span className={cls(base, styles[variant], className)}>{children}</span>;
}