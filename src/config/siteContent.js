// src/config/siteContent.js

export const SITE = {
  hero: {
    title: "Buy, Sell & Rent",
    subtitle:
      "The modern platform for verified private owners and seekers. Skip the middleman, save fees, and deal directly.",
    placeholders: {
      location: "Where do you want to live?",
      price: "Price range",
    },
    cta: {
      search: "Search",
    },
    trust: ["No Agent Fees", "Verified Owners", "New Listings", "Price Drop"],
  },

  listing: {
    viewAll: "View all",
    details: "Details",
    badges: {
      verified: "Owner Verified",
      new: "New",
    },
    actions: {
      chat: "Chat",
      book: "Book Visit",
      precheck: "Pre check",
    },
  },

  footer: {
    followTitle: "Follow Us",
    copyright: "© Real state Copyrights",
  },
};

// ✅ Navbar menu (restore)
export const NAV_LINKS = [
  { label: "Houses", to: "/search" },
  { label: "Apartments", to: "/search" },
  { label: "Land", to: "/search" },
  { label: "Commercial", to: "/search" },
  { label: "Buy", to: "/search" },
  { label: "Rent", to: "/search" },
  { label: "Short- Stay", to: "/search" },
];

// ✅ Footer columns (Cities removed)
export const FOOTER_LINKS = [
  { title: "Popular Categories", links: ["Rent", "Buy", "Land", "Commercial"] },
  { title: "Trending Searches", links: ["Land", "Short-stay", "Shop", "flats"] },
  { title: "About Us", links: ["RS Blog", "Contact Us", "RS for Businesses"] },
  { title: "OLX", links: ["Help", "Sitemap", "Terms of use", "Privacy Policy"] },
];

// ✅ Follow Us links (config-driven)
export const SOCIAL_LINKS = [
  { key: "x", label: "X", href: "#" },
  { key: "facebook", label: "Facebook", href: "#" },
  { key: "youtube", label: "YouTube", href: "#" },
  { key: "instagram", label: "Instagram", href: "#" },
];

/** ✅ Theme tokens (optional but best practice) */
export const THEME = {
  accent: "#D86A60",
};

/** ✅ One consistent container width across pages */
export const LAYOUT = {
  container: "mx-auto w-full max-w-6xl px-4",
};

/** ✅ Search page content (UI labels + chips + mock-friendly defaults)
 *  Note: Actual results will come from your hook/service (mock now, API later).
 */
export const SEARCH = {
  defaultView: "grid", // "grid" | "map"

  topBar: {
    countries: ["Pakistan"],
    countryDefault: "Pakistan",
    queryDefault: "House for Sale",
    searchLabel: "Search",
  },

  results: {
    title: "Houses",
    countLabel: "100.3k results",
    compare: { label: "Compare Properties" },

    chips: [
      { id: "sale", label: "For Sale", active: true },
      { id: "new", label: "New", active: false },
      { id: "room", label: "Single room", active: false },
      { id: "bath", label: "1 bathroom", active: false },
      { id: "balcony", label: "No Balcony", active: false },
    ],

    // Optional initial data (UI build). Hook/service will override.
    // Keep shape same as API response items.
    items: [
      {
        id: "s1",
        to: "/listing/s1",
        imageKey: "listing1",
        fallbackImage: "/images/listings/1.jpg",
        title: "Modern Luxury Apartment",
        address: "Bahnhofstrasse 12, Zurich",
        badges: { ownerVerified: true, isNew: true },
        meta: { rooms: "4.5rms", area: "120m²" },
      },
      {
        id: "s2",
        to: "/listing/s2",
        imageKey: "listing2",
        fallbackImage: "/images/listings/2.jpg",
        title: "Modern Luxury Apartment",
        address: "Bahnhofstrasse 12, Zurich",
        badges: { ownerVerified: true, isNew: false },
        meta: { rooms: "4.5rms", area: "120m²" },
      },
      {
        id: "s3",
        to: "/listing/s3",
        imageKey: "listing3",
        fallbackImage: "/images/listings/3.jpg",
        title: "Modern Luxury Apartment",
        address: "Bahnhofstrasse 12, Zurich",
        badges: { ownerVerified: false, isNew: true },
        meta: { rooms: "4.5rms", area: "120m²" },
      },
      {
        id: "s4",
        to: "/listing/s4",
        imageKey: "listing4",
        fallbackImage: "/images/listings/4.jpg",
        title: "Modern Luxury Apartment",
        address: "Bahnhofstrasse 12, Zurich",
        badges: { ownerVerified: true, isNew: false },
        meta: { rooms: "4.5rms", area: "120m²" },
      },
    ],
  },

  map: {
    backgroundImageKey: "searchMap",
    fallbackBackground: "/images/search/map.png",
  },
};