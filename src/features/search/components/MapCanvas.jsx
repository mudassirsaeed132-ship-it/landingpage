import { useMemo, useState } from "react";
import { IMG } from "../../../config/images";

function MiniIcon({ name, className }) {
  if (name === "bed") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M3 12h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path
          d="M4 12V8.8c0-1 0.8-1.8 1.8-1.8h5.4c1 0 1.8.8 1.8 1.8V12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M3 12v7M21 12v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "bath") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M6 12V7.5A2.5 2.5 0 0 1 8.5 5H10m8 7H4m2 0v2a6 6 0 0 0 12 0v-2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 8V4h4M20 16v4h-4M20 8V4h-4M4 16v4h4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Stat({ label, value }) {
  return (
    <div className="text-[11px] text-slate-500">
      <div className="font-semibold text-slate-900">{value}</div>
      <div>{label}</div>
    </div>
  );
}

function getPopupData(marker) {
  const raw = marker?.popupData || marker?.popup || marker?.item || {};

  return {
    agent: {
      name: raw?.agent?.name || "Verified Owner",
      since: raw?.agent?.since || "Available now",
      avatar: raw?.agent?.avatar || marker?.image || raw?.image,
    },
    image: raw?.image || marker?.image,
    title: raw?.title || marker?.item?.title || "Property Listing",
    location:
      raw?.location ||
      raw?.address ||
      marker?.item?.address ||
      marker?.item?.location ||
      "Location not specified",
    price: raw?.price || marker?.item?.price || "Price on request",
    meta: {
      beds:
        raw?.meta?.beds ||
        marker?.item?.meta?.rooms ||
        marker?.item?.roomsLabel ||
        "3",
      baths:
        raw?.meta?.baths ||
        marker?.item?.meta?.baths ||
        marker?.item?.bathsLabel ||
        "2",
      area:
        raw?.meta?.area ||
        marker?.item?.meta?.area ||
        marker?.item?.areaLabel ||
        "120m²",
    },
    stats: {
      type: raw?.stats?.type || "Apartment",
      purpose: raw?.stats?.purpose || "For Sale",
      owner: raw?.stats?.owner || "Verified",
    },
  };
}

function MapPopupCard({ data, accent = "#D66557", onClose }) {
  if (!data) return null;

  return (
    <div className="w-full max-w-[22rem] rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 sm:max-w-[24rem]">
      <div className="flex items-center justify-between px-4 pt-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200">
            {data?.agent?.avatar ? (
              <img
                src={data.agent.avatar}
                alt={data.agent.name || "Agent"}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : null}
          </div>

          <div className="min-w-0">
            <div className="truncate text-xs font-semibold text-slate-900">
              {data?.agent?.name}
            </div>
            <div className="truncate text-[11px] text-slate-500">{data?.agent?.since}</div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-2 transition hover:bg-slate-50"
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-slate-600" fill="none" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div className="px-4 pb-4 pt-3">
        <div className="overflow-hidden rounded-xl bg-slate-100">
          {data?.image ? (
            <img
              src={data.image}
              alt={data.title}
              className="h-40 w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="h-40 w-full bg-slate-100" aria-hidden="true" />
          )}
        </div>

        <div className="mt-3 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <div className="truncate text-base font-semibold text-slate-900">{data?.title}</div>
            <div className="truncate text-xs text-slate-500">{data?.location}</div>
          </div>

          <div className="shrink-0 text-right">
            <div className="text-[11px] text-slate-500">Property Price</div>
            <div className="text-lg font-semibold text-slate-900">{data?.price}</div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-600">
          <span className="inline-flex items-center gap-1" style={{ color: accent }}>
            <MiniIcon name="bed" className="h-4 w-4" />
            <span className="text-slate-700">{data?.meta?.beds}</span>
          </span>

          <span className="inline-flex items-center gap-1" style={{ color: accent }}>
            <MiniIcon name="bath" className="h-4 w-4" />
            <span className="text-slate-700">{data?.meta?.baths}</span>
          </span>

          <span className="inline-flex items-center gap-1" style={{ color: accent }}>
            <MiniIcon name="area" className="h-4 w-4" />
            <span className="text-slate-700">{data?.meta?.area}</span>
          </span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <Stat label="Type" value={data?.stats?.type} />
          <Stat label="Purpose" value={data?.stats?.purpose} />
          <Stat label="Owner" value={data?.stats?.owner} />
        </div>
      </div>
    </div>
  );
}

function normalizeMarkers(map, items) {
  if (Array.isArray(map?.markers) && map.markers.length) {
    return map.markers.map((marker, index) => ({
      id: marker.id || `marker-${index + 1}`,
      x: typeof marker.x === "number" ? marker.x : 50,
      y: typeof marker.y === "number" ? marker.y : 50,
      image:
        marker.image ||
        marker.imageSrc ||
        marker?.popup?.image ||
        marker?.popupData?.image ||
        IMG.listings?.[index % (IMG.listings?.length || 1)],
      popupData: marker.popupData || marker.popup || null,
      item: marker.item || null,
    }));
  }

  const fallbackPositions = [
    { x: 52, y: 48 },
    { x: 38, y: 36 },
    { x: 28, y: 66 },
    { x: 68, y: 56 },
  ];

  return (items || []).slice(0, 4).map((item, index) => ({
    id: item.id || `marker-${index + 1}`,
    x: fallbackPositions[index]?.x ?? 50,
    y: fallbackPositions[index]?.y ?? 50,
    image:
      item.imageSrc ||
      item.image ||
      item.fallbackImage ||
      IMG.listings?.[index % (IMG.listings?.length || 1)],
    popupData: item.popupData || item.popup || null,
    item,
  }));
}

function getPopupDesktopClasses(marker) {
  const x = marker?.x ?? 50;
  const y = marker?.y ?? 50;

  const horizontal =
    x >= 74
      ? "-translate-x-[calc(100%+1rem)]"
      : x <= 26
      ? "translate-x-4"
      : "-translate-x-1/2";

  const vertical = y <= 52 ? "translate-y-4" : "-translate-y-[calc(100%+1rem)]";

  return `${horizontal} ${vertical}`;
}

export default function MapCanvas({ map, items = [], accent = "#D66557" }) {
  const backgroundImage =
    map?.backgroundSrc ||
    map?.fallbackBackground ||
    IMG.search?.map ||
    "/images/search/map.png";

  const markers = useMemo(() => normalizeMarkers(map, items), [map, items]);
  const [activeId, setActiveId] = useState(null);

  const activeMarker = markers.find((marker) => marker.id === activeId) || null;
  const popupData = activeMarker ? getPopupData(activeMarker) : null;

  return (
    <div className="relative z-10 w-full overflow-visible bg-white">
      <div
        className="relative h-[560px] w-full bg-cover bg-center md:h-[680px] xl:h-[760px] 2xl:h-[840px]"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        onClick={() => setActiveId(null)}
      >
        {markers.map((marker) => (
          <button
            key={marker.id}
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setActiveId((prev) => (prev === marker.id ? null : marker.id));
            }}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
            aria-label={`Open listing marker ${marker.id}`}
          >
            <span className="inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white ring-4 ring-[#D66557] shadow-lg">
              {marker.image ? (
                <img
                  src={marker.image}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : null}
            </span>
          </button>
        ))}

        {activeMarker ? (
          <>
            <div
              className="absolute inset-x-3 bottom-3 z-20 sm:hidden"
              onClick={(event) => event.stopPropagation()}
            >
              <MapPopupCard
                data={popupData}
                accent={accent}
                onClose={() => setActiveId(null)}
              />
            </div>

            <div
              className={`absolute z-30 hidden sm:block ${getPopupDesktopClasses(activeMarker)}`}
              style={{ left: `${activeMarker.x}%`, top: `${activeMarker.y}%` }}
              onClick={(event) => event.stopPropagation()}
            >
              <MapPopupCard
                data={popupData}
                accent={accent}
                onClose={() => setActiveId(null)}
              />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}