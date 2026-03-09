import React from "react";

/**
 * Icon system:
 * - Prefer /public/images/icons/*.svg for designer icons
 * - Use inline SVG for icons not in folder OR where perfect scaling is needed.
 */

const ICON_SRC = {
  // meta bar right
  share: "/images/icons/share.svg",

  // listing badge
  forsale: "/images/icons/forsale.svg",

  // summary facts
  propertyType: "/images/icons/property type.svg",
  bath: "/images/icons/bath.svg",
  size: "/images/icons/size.svg",
  available: "/images/icons/Available.svg",
  bedrooms: "/images/icons/bedrooms.svg",
  location: "/images/icons/location.svg",

  // actions
  chat: "/images/icons/chat.svg",
  book: "/images/icons/book.svg",
};

/* ---------- Inline (pixel-perfect scaling) ---------- */

function InlineResultPrev({ size = 18, className = "", ariaLabel }) {
  const labelled = Boolean(ariaLabel);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      role={labelled ? "img" : undefined}
      aria-label={labelled ? ariaLabel : undefined}
      aria-hidden={labelled ? undefined : true}
      focusable="false"
    >
      {/* thinner circle like screenshot */}
      <circle cx="12" cy="12" r="8.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12.9 8.9L9.8 12l3.1 3.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InlineResultNext({ size = 18, className = "", ariaLabel }) {
  const labelled = Boolean(ariaLabel);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      role={labelled ? "img" : undefined}
      aria-label={labelled ? ariaLabel : undefined}
      aria-hidden={labelled ? undefined : true}
      focusable="false"
    >
      <circle cx="12" cy="12" r="8.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M11.1 8.9L14.2 12l-3.1 3.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InlineHeart({ size = 18, className = "", ariaLabel }) {
  const labelled = Boolean(ariaLabel);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      role={labelled ? "img" : undefined}
      aria-label={labelled ? ariaLabel : undefined}
      aria-hidden={labelled ? undefined : true}
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M12 21s-7-4.4-9.4-8.6C.6 9.1 2.4 5.8 5.9 5.2c1.9-.3 3.5.6 4.4 1.8.9-1.2 2.5-2.1 4.4-1.8 3.5.6 5.3 3.9 3.3 7.2C19 16.6 12 21 12 21z"
      />
    </svg>
  );
}

const INLINE = {
  // ✅ these are the meta bar arrows (exact scaling)
  resultPrev: InlineResultPrev,
  resultNext: InlineResultNext,

  // you don't have heart.svg currently
  heart: InlineHeart,
};

export function Icon({
  name,
  size = 20,
  className = "",
  ariaLabel,
  alt,
  draggable = false,
  ...props
}) {
  // 1) designer assets from public
  const raw = ICON_SRC[name];
  if (raw) {
    const src = encodeURI(raw); // handles spaces like "property type.svg"
    const labelled = Boolean(ariaLabel);
    const computedAlt = typeof alt === "string" ? alt : labelled ? ariaLabel : "";
    return (
      <img
        src={src}
        width={size}
        height={size}
        className={className}
        alt={computedAlt}
        aria-hidden={labelled ? undefined : true}
        draggable={draggable}
        {...props}
      />
    );
  }

  // 2) inline fallback
  const Inline = INLINE[name];
  if (Inline) return <Inline size={size} className={className} ariaLabel={ariaLabel} />;

  return null;
}

export default Icon;
export { ICON_SRC };