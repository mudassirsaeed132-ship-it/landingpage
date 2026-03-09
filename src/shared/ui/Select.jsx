import { cn } from "../lib/cn";

export default function Select({ className = "", children, ...props }) {
  return (
    <select
      className={cn(
        "h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-[#D86C5E]/30",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}