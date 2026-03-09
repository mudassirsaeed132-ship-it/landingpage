// src/shared/hooks/useLockBodyScroll.js
import { useEffect } from "react";

/**
 * Locks body scroll when `locked` is true.
 * Exports BOTH:
 *  - named: useLockBodyScroll
 *  - default: useLockBodyScroll
 */
export function useLockBodyScroll(locked = true) {
  useEffect(() => {
    if (!locked) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [locked]);
}

export default useLockBodyScroll;