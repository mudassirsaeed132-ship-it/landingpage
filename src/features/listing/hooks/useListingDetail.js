import { useCallback, useEffect, useRef, useState } from "react";
import { fetchListingById } from "../api/listingService";

export function useListingDetail(listingId) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const lastIdRef = useRef(null);

  const load = useCallback(async () => {
    if (!listingId) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetchListingById(listingId);
      setData(res);
      lastIdRef.current = listingId;
    } catch (e) {
      setError(e);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [listingId]);

  useEffect(() => {
    // avoid duplicate refetch if same id
    if (lastIdRef.current === listingId && data) return;
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listingId]);

  return { data, isLoading, error, refetch: load };
}

export default useListingDetail;