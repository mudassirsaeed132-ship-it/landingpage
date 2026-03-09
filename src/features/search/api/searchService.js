// src/features/search/api/searchService.js
import { createMockSearchResponse } from "../data/search.mock";

const USE_MOCK = true;

function sleep(ms, signal) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(resolve, ms);
    if (!signal) return;

    if (signal.aborted) {
      clearTimeout(t);
      reject(new DOMException("Aborted", "AbortError"));
      return;
    }

    signal.addEventListener(
      "abort",
      () => {
        clearTimeout(t);
        reject(new DOMException("Aborted", "AbortError"));
      },
      { once: true }
    );
  });
}

export async function searchListings(params = {}, options = {}) {
  const { signal } = options;

  if (USE_MOCK) {
    await sleep(250, signal);
    return createMockSearchResponse(params);
  }

  // future real API:
  // const qs = new URLSearchParams(params).toString();
  // const res = await fetch(`/api/listings/search?${qs}`, { signal });
  // if (!res.ok) throw new Error("Failed to load listings");
  // return res.json();

  return createMockSearchResponse(params);
}