import { IMG } from "../../../config/images";

const MOCK_LISTINGS_COUNT = 40;

const FALLBACK_LISTING_IMAGES = [
  "/images/listings/listing-1.png",
  "/images/listings/listing-2.png",
  "/images/listings/listing-3.png",
  "/images/listings/listing-4.png",
];

const LISTING_IMAGE_SOURCES =
  Array.isArray(IMG?.listings) && IMG.listings.length ? IMG.listings : FALLBACK_LISTING_IMAGES;

const PHOTO_THUMBS =
  Array.isArray(IMG?.listingDetail?.thumbs) && IMG.listingDetail.thumbs.length
    ? IMG.listingDetail.thumbs
    : [
        "/images/listing-detail/thumbs/thumb-1.png",
        "/images/listing-detail/thumbs/thumb-2.png",
        "/images/listing-detail/thumbs/thumb-3.png",
        "/images/listing-detail/thumbs/thumb-4.png",
        "/images/listing-detail/thumbs/thumb-5.png",
        "/images/listing-detail/thumbs/thumb-6.png",
        "/images/listing-detail/thumbs/thumb-7.png",
        "/images/listing-detail/thumbs/thumb-8.png",
      ];

const DEFAULT_DESCRIPTION = [
  "Welcome to this stunning modern apartment in the heart of downtown. This beautifully designed 3-bedroom, 2-bathroom residence offers 1,250 square feet of luxurious living space with floor-to-ceiling windows and breathtaking city views.",
  "The open-concept layout features a gourmet kitchen with high-end stainless steel appliances, quartz countertops, and custom cabinetry. The spacious living area flows seamlessly onto a private balcony, perfect for entertaining or relaxing.",
  "The primary suite includes a walk-in closet and spa-like ensuite bathroom with dual vanities and a rainfall shower. Two additional bedrooms provide ample space for family, guests, or a home office.",
];

const DEFAULT_REVIEWS = [
  {
    id: "r1",
    author: "Leslie Alexander",
    avatar:
      IMG?.listingDetail?.agent?.leslie || "/images/listing-detail/agent/agent-leslie.png",
    rating: 5,
    scoreLabel: "5/5",
    timeAgo: "1 week ago",
    title: "A Beautiful, Welcoming Home",
    body:
      "This house is beautiful and welcoming. The wraparound porch is a standout feature, perfect for relaxing outdoors. Inside, the large windows make the rooms bright and airy. The yard is spacious and well-kept, with plenty of greenery. Overall, it\u2019s a lovely home that feels both elegant and comfortable.",
  },
  {
    id: "r2",
    author: "Leslie Alexander",
    avatar:
      IMG?.listingDetail?.agent?.leslie || "/images/listing-detail/agent/agent-leslie.png",
    rating: 5,
    scoreLabel: "5/5",
    timeAgo: "1 week ago",
    title: "A Beautiful, Welcoming Home",
    body:
      "This house is beautiful and welcoming. The wraparound porch is a standout feature, perfect for relaxing outdoors. Inside, the large windows make the rooms bright and airy. The yard is spacious and well-kept, with plenty of greenery. Overall, it\u2019s a lovely home that feels both elegant and comfortable.",
  },
];

const BASE_LISTINGS = [
  {
    title: "Modern Luxury Apartment",
    address: "Bahnhofstrasse 12, Zurich",
    locationLabel: "Bahnhofstrasse 12, Zurich",
    priceLabel: "$1,250,000",
    meta: { rooms: "4.5rms", area: "120m\u00b2", baths: "1" },
    badges: { ownerVerified: true, isNew: true },
    purpose: "sale",
    balcony: false,
    roomsNum: 1,
    bathsNum: 1,
  },
  {
    title: "Contemporary Family Home",
    address: "Seestrasse 45, K\u00fcsnacht",
    locationLabel: "Seestrasse 45, K\u00fcsnacht",
    priceLabel: "$2,100,000",
    meta: { rooms: "5.5rms", area: "180m\u00b2", baths: "2" },
    badges: { ownerVerified: true, isNew: false },
    purpose: "sale",
    balcony: true,
    roomsNum: 2,
    bathsNum: 2,
  },
  {
    title: "Cozy Room in Shared Flat",
    address: "Langstrasse 88, Zurich",
    locationLabel: "Langstrasse 88, Zurich",
    priceLabel: "$85/night",
    meta: { rooms: "1 room", area: "32m\u00b2", baths: "1" },
    badges: { ownerVerified: false, isNew: true },
    purpose: "rent",
    balcony: false,
    roomsNum: 3,
    bathsNum: 1,
  },
  {
    title: "Premium Office Space",
    address: "Technoparkstrasse 1, Zurich",
    locationLabel: "Technoparkstrasse 1, Zurich",
    priceLabel: "$4,500/month",
    meta: { rooms: "4 units", area: "220m\u00b2", baths: "3" },
    badges: { ownerVerified: true, isNew: false },
    purpose: "rent",
    balcony: false,
    roomsNum: 4,
    bathsNum: 3,
  },
];

function rotateArray(list, startIndex) {
  if (!Array.isArray(list) || list.length === 0) return [];

  const safeIndex = ((startIndex % list.length) + list.length) % list.length;
  return [...list.slice(safeIndex), ...list.slice(0, safeIndex)];
}

function makeListingImages(id) {
  const numericId = Number(id);
  const startIndex = Number.isFinite(numericId) ? Math.max(0, numericId - 1) : 0;
  return rotateArray(LISTING_IMAGE_SOURCES, startIndex);
}

function makeHeroImages(id) {
  const images = makeListingImages(id);

  return images.map((src, index) => ({
    src,
    alt: `Listing photo ${index + 1}`,
  }));
}

function makeFacts(locationLabel) {
  return [
    { key: "propertyType", label: "Property Type", value: "Apartment", icon: "propertyType" },
    { key: "bathrooms", label: "Bathrooms", value: "2", icon: "bath" },
    { key: "size", label: "Size", value: "1,250 sq ft", icon: "size" },
    { key: "available", label: "Available", value: "Jan 15, 2026", icon: "available" },
    { key: "bedrooms", label: "Bedrooms", value: "3", icon: "bedrooms" },
    { key: "location", label: "Location", value: locationLabel, icon: "location" },
  ];
}

function makeMap(addressLabel) {
  return {
    title: "Location Address",
    embedUrl: "https://www.google.com/maps?q=Beverly%20Hills&output=embed",
    placeLabel: "Beverly Hills",
    addressLabel,
    miniThumb: IMG?.search?.map || "/images/search/map.png",
  };
}

function makePhotos() {
  return {
    thumbs: PHOTO_THUMBS,
    moreCount: 25,
  };
}

function makeAiInsights() {
  return {
    fairValueScore: 78,
    marketComparison: "+5%",
    valueBadge: "Fair Price",
  };
}

function makeAgent() {
  return {
    name: "Sarah Johnson",
    role: "Property Manager",
    avatar: IMG?.listingDetail?.agent?.sarah || "/images/listing-detail/agent/agent-sarah.png",
    rating: 4.9,
    reviewsCount: 127,
    managingLine: "Managing 24 properties in Downtown",
    responseRate: "95%",
    avgResponse: "2 hours",
  };
}

function createListing({
  id,
  title,
  address,
  priceLabel,
  locationLabel,
  meta,
  badges,
  purpose = "sale",
  balcony = false,
  roomsNum = 1,
  bathsNum = 1,
}) {
  const stringId = String(id);
  const images = makeListingImages(id);

  const safeMeta = meta || { rooms: "", area: "", baths: "" };
  const safeBadges = badges || { ownerVerified: false, isNew: false };
  const safePurpose = purpose === "rent" ? "rent" : "sale";

  const verified = Boolean(safeBadges?.ownerVerified);
  const isNew = Boolean(safeBadges?.isNew);

  const badge =
    safePurpose === "rent"
      ? { label: "For Rent", tone: "rent" }
      : { label: "For Sale", tone: "sale" };

  const popupData = {
    agent: {
      name: verified ? "Verified Owner" : "Property Host",
      since: "Available now",
      avatar: images[1] || images[0] || "",
    },
    image: images[2] || images[0] || "",
    title,
    location: locationLabel,
    price: priceLabel,
    meta: {
      beds: safeMeta.rooms,
      baths: String(bathsNum ?? safeMeta.baths ?? ""),
      area: safeMeta.area,
    },
    stats: {
      type: safePurpose === "sale" ? "For Sale" : "For Rent",
      purpose: isNew ? "New Listing" : "Listed",
      owner: verified ? "Verified" : "Standard",
    },
  };

  return {
    id: stringId,
    slug: `listing-${stringId}`,
    resultsIndexLabel: `${id}/100 Results`,
    title,
    address,
    location: locationLabel,
    priceLabel,
    price: priceLabel,
    badge,
    images,
    imageSrc: images[0],
    image: images[0],
    fallbackImage: images[0],
    meta: safeMeta,
    stats: [safeMeta.rooms, safeMeta.area],
    badges: safeBadges,
    purpose: safePurpose,
    balcony: Boolean(balcony),
    roomsNum: Number(roomsNum || 0),
    bathsNum: Number(bathsNum || 0),
    isNew,
    verified,
    roomsLabel: safeMeta.rooms,
    areaLabel: safeMeta.area,
    popupData,
    heroImages: makeHeroImages(id),
    facts: makeFacts(locationLabel),
    description: DEFAULT_DESCRIPTION,
    map: makeMap(address),
    photos: makePhotos(),
    aiInsights: makeAiInsights(),
    agent: makeAgent(),
    reviews: DEFAULT_REVIEWS,
  };
}

export const LISTINGS_MOCK = Array.from({ length: MOCK_LISTINGS_COUNT }).map((_, index) => {
  const base = BASE_LISTINGS[index % BASE_LISTINGS.length];

  return createListing({
    id: index + 1,
    title: base.title,
    address: base.address,
    priceLabel: base.priceLabel,
    locationLabel: base.locationLabel,
    meta: base.meta,
    badges: base.badges,
    purpose: base.purpose,
    balcony: base.balcony,
    roomsNum: base.roomsNum,
    bathsNum: base.bathsNum,
  });
});

// backward compatibility
export const LISTING_MOCK = LISTINGS_MOCK[0];

export function normalizeListingId(id) {
  const raw = String(id ?? "").trim();
  const match = raw.match(/(\d+)$/);
  return match ? match[1] : raw;
}

export function getListingMockById(id) {
  const normalizedId = normalizeListingId(id);
  return LISTINGS_MOCK.find((listing) => String(listing.id) === String(normalizedId)) || null;
}

export default LISTINGS_MOCK;
