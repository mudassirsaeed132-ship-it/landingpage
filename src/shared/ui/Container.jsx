import { cn } from "../lib/cn";

export default function Container({ className, children }) {
  return (
    <div className={cn("mx-auto max-w-6xl px-4", className)}>
      {children}
    </div>
  );
}