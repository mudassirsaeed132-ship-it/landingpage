// src/config/images.js
export const BASE_URL = import.meta.env.BASE_URL || "/";
const BASE = BASE_URL;

export const IMG = {
  brand: {
    logoFull: `${BASE}images/brand/logo-full.png`,
    logo: `${BASE}images/brand/logo.png`,
    flagUK: `${BASE}images/brand/uk-flag.png`,
  },

  hero: {
    home: `${BASE}images/hero/hero.jpg`,
  },

  categories: {
    buy: `${BASE}images/categories/buy.png`,
    rent: `${BASE}images/categories/rent.png`,
    land: `${BASE}images/categories/land.png`,
    commercial: `${BASE}images/categories/commercial.png`,
    shortStay: `${BASE}images/categories/short-stay.png`,
  },

  listings: [
    `${BASE}images/listings/listing-1.png`,
    `${BASE}images/listings/listing-2.png`,
    `${BASE}images/listings/listing-3.png`,
    `${BASE}images/listings/listing-4.png`,
  ],

  ui: {
    googlePlay: `${BASE}images/ui/google-play.png`,
    appGallery: `${BASE}images/ui/app-gallery.png`,
    appMock: `${BASE}images/ui/app-mock.png`,
  },

  search: {
    map: `${BASE}images/search/map.png`,
  },

  // ✅ listing detail page images
  listingDetail: {
    agent: {
      sarah: `${BASE}images/listing-detail/agent/agent-sarah.png`,
      leslie: `${BASE}images/listing-detail/agent/agent-leslie.png`,
    },
    gallery: Array.from({ length: 5 }, () => `${BASE}images/listing-detail/gallery/gallery.png`),
    thumbs: [
      `${BASE}images/listing-detail/thumbs/thumb-1.png`,
      `${BASE}images/listing-detail/thumbs/thumb-2.png`,
      `${BASE}images/listing-detail/thumbs/thumb-3.png`,
      `${BASE}images/listing-detail/thumbs/thumb-4.png`,
      `${BASE}images/listing-detail/thumbs/thumb-5.png`,
      `${BASE}images/listing-detail/thumbs/thumb-6.png`,
      `${BASE}images/listing-detail/thumbs/thumb-7.png`,
      `${BASE}images/listing-detail/thumbs/thumb-8.png`,
    ],
  },
};