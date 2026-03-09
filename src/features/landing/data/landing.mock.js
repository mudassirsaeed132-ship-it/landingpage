import { IMG } from "../../../config/images";

export const demoListings = [
  {
    id: 1,
    title: "Modern Luxury Apartment",
    location: "Bahnhofstrasse 12, Zurich",
    price: "$1,250,000",
    stats: ["4.5rms", "120m²"],
    image: IMG.listings[0],
    verified: true,
    isNew: true,
  },
  {
    id: 2,
    title: "Contemporary Family Home",
    location: "Seestrasse 45, Küsnacht",
    price: "$2,100,000",
    stats: ["4.5rms", "120m²"],
    image: IMG.listings[1],
    verified: true,
    isNew: false,
  },
  {
    id: 3,
    title: "Cozy Room in Shared Flat",
    location: "Langstrasse 88, Zurich",
    price: "$85/night",
    stats: ["4.5rms", "120m²"],
    image: IMG.listings[2],
    verified: false,
    isNew: true,
  },
  {
    id: 4,
    title: "Premium Office Space",
    location: "Technoparkstrasse 1, Zurich",
    price: "$4,500/month",
    stats: ["4.5rms", "120m²"],
    image: IMG.listings[3],
    verified: true,
    isNew: false,
  },
];

export const landingSections = [
  { key: "new", title: "New this week", subtitle: "Fresh properties just added by owners", items: demoListings },
  { key: "short", title: "Short Stays & Rentals", subtitle: "Flexible bookings directly from hosts", items: demoListings },
  { key: "buy", title: "Buy your New House Today", subtitle: "Flexible bookings directly from hosts", items: demoListings },
  { key: "lands", title: "Top deals on lands", subtitle: "Flexible bookings directly from hosts", items: demoListings },
  { key: "commercial", title: "Commercial Sites for your Corporate & Commercial Needs", subtitle: "Flexible bookings directly from hosts", items: demoListings },
];