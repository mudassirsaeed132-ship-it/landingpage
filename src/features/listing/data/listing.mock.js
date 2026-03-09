// Single source of truth for Listing Detail mock data.
// IMPORTANT: keep exports stable so imports never break.

function makeHeroImages(primaryListingNumber) {
  const order = [1, 2, 3, 4];

  while (order[0] !== primaryListingNumber) {
    order.push(order.shift());
  }

  return [
    { src: `/images/listings/listing-${order[0]}.png`, alt: "Listing photo 1" },
    { src: `/images/listings/listing-${order[1]}.png`, alt: "Listing photo 2" },
    { src: `/images/listings/listing-${order[2]}.png`, alt: "Listing photo 3" },
    { src: `/images/listings/listing-${order[3]}.png`, alt: "Listing photo 4" },
  ];
}

function createListing({ id, title, address, priceLabel, locationLabel }) {
  return {
    id: String(id),
    resultsIndexLabel: `${id}/100 Results`,
    title,
    address,
    priceLabel,
    badge: { label: "For Sale", tone: "sale" },

    heroImages: makeHeroImages(Number(id)),

    facts: [
      { key: "propertyType", label: "Property Type", value: "Apartment", icon: "propertyType" },
      { key: "bathrooms", label: "Bathrooms", value: "2", icon: "bath" },
      { key: "size", label: "Size", value: "1,250 sq ft", icon: "size" },
      { key: "available", label: "Available", value: "Jan 15, 2026", icon: "available" },
      { key: "bedrooms", label: "Bedrooms", value: "3", icon: "bedrooms" },
      { key: "location", label: "Location", value: locationLabel, icon: "location" },
    ],

    description: [
      "Welcome to this stunning modern apartment in the heart of downtown. This beautifully designed 3-bedroom, 2-bathroom residence offers 1,250 square feet of luxurious living space with floor-to-ceiling windows and breathtaking city views.",
      "The open-concept layout features a gourmet kitchen with high-end stainless steel appliances, quartz countertops, and custom cabinetry. The spacious living area flows seamlessly onto a private balcony, perfect for entertaining or relaxing.",
      "The primary suite includes a walk-in closet and spa-like ensuite bathroom with dual vanities and a rainfall shower. Two additional bedrooms provide ample space for family, guests, or a home office.",
    ],

    map: {
      title: "Location Address",
      embedUrl: "https://www.google.com/maps?q=Beverly%20Hills&output=embed",
      placeLabel: "Beverly Hills",
      addressLabel: "Beverly Hills, CA",
      miniThumb: "/images/search/map.png",
    },

    photos: {
      thumbs: [
        "/images/listing-detail/thumbs/thumb-1.png",
        "/images/listing-detail/thumbs/thumb-2.png",
        "/images/listing-detail/thumbs/thumb-3.png",
        "/images/listing-detail/thumbs/thumb-4.png",
        "/images/listing-detail/thumbs/thumb-5.png",
        "/images/listing-detail/thumbs/thumb-6.png",
        "/images/listing-detail/thumbs/thumb-7.png",
        "/images/listing-detail/thumbs/thumb-8.png",
      ],
      moreCount: 25,
    },

    aiInsights: {
      fairValueScore: 78,
      marketComparison: "+5%",
      valueBadge: "Fair Price",
    },

    agent: {
      name: "Sarah Johnson",
      role: "Property Manager",
      avatar: "/images/listing-detail/agent/agent-sarah.png",
      rating: 4.9,
      reviewsCount: 127,
      managingLine: "Managing 24 properties in Downtown",
      responseRate: "95%",
      avgResponse: "2 hours",
    },

    reviews: [
      {
        id: "r1",
        author: "Leslie Alexander",
        avatar: "/images/listing-detail/agent/agent-leslie.png",
        rating: 5,
        scoreLabel: "5/5",
        timeAgo: "1 week ago",
        title: "A Beautiful, Welcoming Home",
        body:
          "This house is beautiful and welcoming. The wraparound porch is a standout feature, perfect for relaxing outdoors. Inside, the large windows make the rooms bright and airy. The yard is spacious and well-kept, with plenty of greenery. Overall, it’s a lovely home that feels both elegant and comfortable.",
      },
      {
        id: "r2",
        author: "Leslie Alexander",
        avatar: "/images/listing-detail/agent/agent-leslie.png",
        rating: 5,
        scoreLabel: "5/5",
        timeAgo: "1 week ago",
        title: "A Beautiful, Welcoming Home",
        body:
          "This house is beautiful and welcoming. The wraparound porch is a standout feature, perfect for relaxing outdoors. Inside, the large windows make the rooms bright and airy. The yard is spacious and well-kept, with plenty of greenery. Overall, it’s a lovely home that feels both elegant and comfortable.",
      },
    ],
  };
}

export const LISTINGS_MOCK = [
  createListing({
    id: 1,
    title: "Modern Luxury Apartment",
    address: "123 Main Street, San Francisco, CA 94102",
    priceLabel: "$4,500/month",
    locationLabel: "Downtown",
  }),
  createListing({
    id: 2,
    title: "Cozy City Studio",
    address: "88 Market Street, San Francisco, CA 94105",
    priceLabel: "$2,200/month",
    locationLabel: "Market",
  }),
  createListing({
    id: 3,
    title: "Family Home with Garden",
    address: "16 Sunset Blvd, San Francisco, CA 94122",
    priceLabel: "$6,800/month",
    locationLabel: "Sunset",
  }),
  createListing({
    id: 4,
    title: "Premium Penthouse View",
    address: "501 Embarcadero, San Francisco, CA 94111",
    priceLabel: "$12,000/month",
    locationLabel: "Bayfront",
  }),
];

// Keep this for backward compatibility
export const LISTING_MOCK = LISTINGS_MOCK[0];

export function normalizeListingId(id) {
  const raw = String(id ?? "").trim();
  const match = raw.match(/(\d+)$/);
  return match ? match[1] : raw;
}

export function getListingMockById(id) {
  const normalizedId = normalizeListingId(id);
  return LISTINGS_MOCK.find((l) => String(l.id) === String(normalizedId)) || null;
}

export default LISTINGS_MOCK;