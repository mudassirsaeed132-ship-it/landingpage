import { BASE_URL } from "../../../config/images";
import LISTINGS_MOCK from "../../listing/data/listing.mock";

const ITEMS = LISTINGS_MOCK.map((item) => ({
  ...item,
  to: `/listing/${item.id}`,
}));

const MAP = {
  backgroundSrc: `${BASE_URL}images/search/map.png`,
  markers: [
    {
      id: "m1",
      x: 52,
      y: 48,
      image: ITEMS[0]?.image,
      popupData: ITEMS[0]?.popupData,
      item: ITEMS[0],
    },
    {
      id: "m2",
      x: 38,
      y: 36,
      image: ITEMS[1]?.image,
      popupData: ITEMS[1]?.popupData,
      item: ITEMS[1],
    },
    {
      id: "m3",
      x: 28,
      y: 66,
      image: ITEMS[2]?.image,
      popupData: ITEMS[2]?.popupData,
      item: ITEMS[2],
    },
    {
      id: "m4",
      x: 68,
      y: 56,
      image: ITEMS[3]?.image,
      popupData: ITEMS[3]?.popupData,
      item: ITEMS[3],
    },
  ],
};

function includesText(text, query) {
  if (!query) return true;
  return String(text || "").toLowerCase().includes(String(query).toLowerCase());
}

function toBoolean(value) {
  if (value === true || value === "true") return true;
  if (value === false || value === "false") return false;
  return null;
}

export function createMockSearchResponse(params = {}) {
  const page = Number(params.page || 1);
  const pageSize = Number(params.pageSize || 20);

  const purpose = params.purpose || "";
  const isNew = toBoolean(params.isNew);
  const roomsMin = Number(params.roomsMin || 1);
  const bathsMin = Number(params.bathsMin || 1);
  const balcony = toBoolean(params.balcony);
  const query = params.q || "";

  let filtered = [...ITEMS];

  if (purpose) {
    filtered = filtered.filter((item) => item.purpose === purpose);
  }

  if (isNew === true) {
    filtered = filtered.filter((item) => item.isNew === true);
  }

  if (roomsMin) {
    filtered = filtered.filter((item) => item.roomsNum >= roomsMin);
  }

  if (bathsMin) {
    filtered = filtered.filter((item) => item.bathsNum >= bathsMin);
  }

  if (balcony === true) {
    filtered = filtered.filter((item) => item.balcony === true);
  }

  if (balcony === false) {
    filtered = filtered.filter((item) => item.balcony === false);
  }

  if (query) {
    filtered = filtered.filter(
      (item) =>
        includesText(item.title, query) ||
        includesText(item.address, query) ||
        includesText(item.location, query)
    );
  }

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
