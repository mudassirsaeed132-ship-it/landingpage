import { useEffect, useState } from "react";

/**
 * useMediaQuery("(min-width: 768px)")
 * SSR-safe + updates on resize
 */
export default function useMediaQuery(query, defaultState = false) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return defaultState;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mql = window.matchMedia(query);

    const onChange = (e) => setMatches(e.matches);
    setMatches(mql.matches);

    if (mql.addEventListener) {
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    }

    // Safari fallback
    mql.addListener(onChange);
    return () => mql.removeListener(onChange);
  }, [query]);

  return matches;
}