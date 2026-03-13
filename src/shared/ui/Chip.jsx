import { cn } from "../lib/cn";

export default function Chip({ active = false, className = "", children, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs transition",
        active
          ? "border-[#D86C5E] bg-[#D86C5E]/8 text-[#D86C5E]"
          : "border-black/10 bg-white text-gray-700 hover:bg-black/3",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}