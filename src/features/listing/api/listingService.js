import { getListingMockById, LISTINGS_MOCK } from "../data/listing.mock";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function fetchListingById(id) {
  // small delay to mimic real API without causing layout shift
  await sleep(120);
  const listing = getListingMockById(id);
  if (!listing) {
    const err = new Error("Listing not found");
    err.code = "NOT_FOUND";
    throw err;
  }
  return listing;
}

export async function fetchListings() {
  await sleep(120);
  return LISTINGS_MOCK;
}

const listingService = { fetchListingById, fetchListings };
export default listingService;