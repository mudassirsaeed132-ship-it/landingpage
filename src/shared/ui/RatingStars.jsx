import React, { useMemo } from "react";

function cls(...arr) {
  return arr.filter(Boolean).join(" ");
}

function Star({ filled, className, size }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      style={{ width: size, height: size }}
    >
      <path
        d="M12 17.3l-5.2 3 1.4-5.9L3.5 10l6.1-.5L12 4l2.4 5.5 6.1.5-4.7 4.4 1.4 5.9-5.2-3z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * RatingStars
 * - value: number (0..5)
 * - max: number
 * - showValue: boolean
 * - countText: string e.g "(127 reviews)"
 */
export default function RatingStars({
  value = 0,
  max = 5,
  size = 16,
  className,
  showValue = false,
  countText,
}) {
  const stars = useMemo(() => {
    const v = Math.max(0, Math.min(value, max));
    const full = Math.floor(v);
    const half = v - full >= 0.5;
    return Array.from({ length: max }, (_, i) => {
      if (i < full) return "full";
      if (i === full && half) return "half";
      return "empty";
    });
  }, [value, max]);

  return (
    <div className={cls("inline-flex items-center gap-2", className)}>
      <div className="inline-flex items-center gap-1 text-amber-400" aria-label={`Rating ${value} out of ${max}`}>
        {stars.map((t, idx) => {
          if (t === "half") {
            return (
              <span key={idx} className="relative inline-block" style={{ width: size, height: size }}>
                <span className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>
                  <Star filled className="text-amber-400" size={size} />
                </span>
                <Star filled={false} className="text-amber-400" size={size} />
              </span>
            );
          }
          return <Star key={idx} filled={t === "full"} className="text-amber-400" size={size} />;
        })}
      </div>

      {showValue ? <span className="text-xs font-semibold text-slate-700">{value.toFixed(1)}</span> : null}
      {countText ? <span className="text-xs text-slate-500">{countText}</span> : null}
    </div>
  );
}