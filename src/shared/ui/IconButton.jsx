import { cn } from "../lib/cn";
import Icon from "./Icons";

const SIZES = {
  sm: "h-9 w-9 rounded-lg",
  md: "h-10 w-10 rounded-xl",
  lg: "h-11 w-11 rounded-xl",
};

export default function IconButton({
  ariaLabel,
  className,
  size = "md",
  type = "button",
  disabled = false,

  // BEST usage:
  // icon can be string name -> uses <Icon name="..." />
  // or a React node
  icon,
  iconSize = 18,
  iconClassName = "",

  // backward compatible
  children,
  ...props
}) {
  const resolvedIcon =
    typeof icon === "string" ? (
      <Icon name={icon} size={iconSize} className={iconClassName} ariaLabel={ariaLabel} />
    ) : (
      icon || null
    );

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      disabled={disabled}
      className={cn(
        "grid place-items-center border border-black/10 bg-white text-slate-900 hover:bg-slate-50",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white",
        SIZES[size] || SIZES.md,
        className
      )}
      {...props}
    >
      {resolvedIcon || children}
    </button>
  );
}