// src/features/search/hooks/useSearchListings.js
import { useEffect, useMemo, useRef, useState } from "react";
import { searchListings } from "../api/searchService";

function stableKey(obj) {
  return JSON.stringify(obj || {});
}

export default function useSearchListings(params = {}, options = {}) {
  const enabled = options.enabled !== false;
  const initialData = options.initialData;

  const key = useMemo(() => stableKey(params), [params]);
  const abortRef = useRef(null);

  const [data, setData] = useState(initialData || null);
  const [isLoading, setIsLoading] = useState(enabled && !initialData);
  const [error, setError] = useState(null);

  async function run() {
    if (!enabled) return;

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsLoading(true);
    setError(null);

    try {
      const res = await searchListings(params, { signal: controller.signal });
      setData(res);
    } catch (e) {
      if (e?.name === "AbortError") return;
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    run();
    return () => abortRef.current?.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, enabled]);

  return { data, isLoading, error, refetch: run };
}