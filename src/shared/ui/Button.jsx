import { cn } from "../lib/cn";

export default function Button({
  variant = "primary", // primary | outline | ghost
  size = "md",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none";

  const variants = {
    primary:
      "bg-[#D86C5E] text-white hover:brightness-[0.98] shadow-sm",
    outline:
      "border border-[#D86C5E] text-[#D86C5E] bg-white hover:bg-[#D86C5E]/[0.06]",
    ghost:
      "text-[#D86C5E] hover:bg-[#D86C5E]/[0.08]",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-5 text-sm",
    lg: "h-12 px-6 text-base",
  };

  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props} />
  );
}