import { IMG, BASE_URL } from "../../../config/images";

const BASE_ITEMS = [
  {
    title: "Modern Luxury Apartment",
    address: "Bahnhofstrasse 12, Zurich",
    meta: { rooms: "4.5rms", area: "120m²" },
    badges: { ownerVerified: true, isNew: true },
    purpose: "sale",
    balcony: false,
    roomsNum: 1,
    bathsNum: 1,
  },
  {
    title: "Modern Luxury Apartment",
    address: "Bahnhofstrasse 12, Zurich",
    meta: { rooms: "4.5rms", area: "120m²" },
    badges: { ownerVerified: true, isNew: false },
    purpose: "sale",
    balcony: false,
    roomsNum: 2,
    bathsNum: 1,
  },
  {
    title: "Modern Luxury Apartment",
    address: "Bahnhofstrasse 12, Zurich",
    meta: { rooms: "4.5rms", area: "120m²" },
    badges: { ownerVerified: false, isNew: true },
    purpose: "sale",
    balcony: false,
    roomsNum: 3,
    bathsNum: 2,
  },
  {
    title: "Modern Luxury Apartment",
    address: "Bahnhofstrasse 12, Zurich",
    meta: { rooms: "4.5rms", area: "120m²" },
    badges: { ownerVerified: true, isNew: false },
    purpose: "sale",
    balcony: false,
    roomsNum: 4,
    bathsNum: 3,
  },
];

const ITEMS = Array.from({ length: 40 }).map((_, i) => {
  const base = BASE_ITEMS[i % BASE_ITEMS.length];
  const images = [
    IMG.listings[i % IMG.listings.length],
    IMG.listings[(i + 1) % IMG.listings.length],
    IMG.listings[(i + 2) % IMG.listings.length],
    IMG.listings[(i + 3) % IMG.listings.length],
  ];

  return {
    id: `s${i + 1}`,
    to: `/listing/s${i + 1}`,
    imageSrc: images[0],
    images,
    title: base.title,
    address: base.address,
    meta: base.meta,
    badges: base.badges,

    purpose: base.purpose,
    balcony: base.balcony,
    roomsNum: base.roomsNum,
    bathsNum: base.bathsNum,
    isNew: Boolean(base.badges?.isNew),
    verified: Boolean(base.badges?.ownerVerified),
  };
});

const MAP = {
  backgroundSrc: `${BASE_URL}images/search/map.png`,
  markers: [
    {
      id: "m1",
      x: 52,
      y: 48,
      image: IMG.listings[0],
      popup: {
        agent: { name: "Tom Haverford", since: "Since 2020", avatar: IMG.listings[1] },
        image: IMG.listings[3],
        title: "Avalon Heights",
        location: "Sydney, Australia",
        price: "$300,000",
        meta: { beds: 3, baths: 3, area: "102 sq yd" },
        stats: { tokenPrice: "$50", irr: "27.2%", apr: "16.7%" },
      },
    },
    {
      id: "m2",
      x: 38,
      y: 36,
      image: IMG.listings[1],
      popup: {
        agent: { name: "Tom Haverford", since: "Since 2020", avatar: IMG.listings[1] },
        image: IMG.listings[2],
        title: "Avalon Heights",
        location: "Sydney, Australia",
        price: "$300,000",
        meta: { beds: 3, baths: 3, area: "102 sq yd" },
        stats: { tokenPrice: "$50", irr: "27.2%", apr: "16.7%" },
      },
    },
    {
      id: "m3",
      x: 28,
      y: 66,
      image: IMG.listings[2],
      popup: {
        agent: { name: "Tom Haverford", since: "Since 2020", avatar: IMG.listings[1] },
        image: IMG.listings[0],
        title: "Avalon Heights",
        location: "Sydney, Australia",
        price: "$300,000",
        meta: { beds: 3, baths: 3, area: "102 sq yd" },
        stats: { tokenPrice: "$50", irr: "27.2%", apr: "16.7%" },
      },
    },
  ],
};

function includesText(text, q) {
  if (!q) return true;
  return String(text || "").toLowerCase().includes(String(q).toLowerCase());
}

export function createMockSearchResponse(params = {}) {
  const page = Number(params.page || 1);
  const pageSize = Number(params.pageSize || 20);

  const purpose = params.purpose;
  const isNew = params.isNew;
  const roomsMin = Number(params.roomsMin || 1);
  const bathsMin = Number(params.bathsMin || 1);
  const balcony = params.balcony;
  const q = params.q || "";

  let filtered = [...ITEMS];

  if (purpose) filtered = filtered.filter((i) => i.purpose === purpose);
  if (isNew === true) filtered = filtered.filter((i) => i.isNew === true);

  if (roomsMin) filtered = filtered.filter((i) => i.roomsNum >= roomsMin);
  if (bathsMin) filtered = filtered.filter((i) => i.bathsNum >= bathsMin);

  if (balcony === true) filtered = filtered.filter((i) => i.balcony === true);
  if (balcony === false) filtered = filtered.filter((i) => i.balcony === false);

  if (q) filtered = filtered.filter((i) => includesText(i.title, q) || includesText(i.address, q));

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return {
    items: filtered.slice(start, end),
    total,
    page,
    pageSize,
    hasMore: end < total,
    map: MAP,
  };
}