// src/features/search/components/MapCanvas.jsx
import React, { useMemo, useState } from "react";
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

function makeFallbackPopup(marker) {
  return {
    agent: { name: "Tom Haverford", since: "Since 2020", avatar: marker?.image },
    image: marker?.image,
    title: "Avalon Heights",
    location: "Sydney, Australia",
    price: "$300,000",
    meta: { beds: 3, baths: 3, area: "102 sq yd" },
    stats: { tokenPrice: "$50", irr: "27.2%", apr: "16.7%" },
  };
}

function MapPopupCard({ data, accent = "#D66557", onClose }) {
  if (!data) return null;

  return (
    <div className="w-90 rounded-2xl bg-white shadow-2xl ring-1 ring-black/10">
      <div className="flex items-center justify-between px-4 pt-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200">
            {data?.agent?.avatar ? (
              <img src={data.agent.avatar} alt="Agent" className="h-full w-full object-cover" />
            ) : null}
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-900">{data?.agent?.name}</div>
            <div className="text-[11px] text-slate-500">{data?.agent?.since}</div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-2 hover:bg-slate-50"
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-slate-600" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="px-4 pt-3">
        <div className="overflow-hidden rounded-xl bg-slate-100">
          {data?.image ? (
            <img src={data.image} alt={data.title} className="h-40 w-full object-cover" />
          ) : null}
        </div>

        <div className="mt-3 flex items-end justify-between gap-3">
          <div>
            <div className="text-base font-semibold text-slate-900">{data?.title}</div>
            <div className="text-xs text-slate-500">{data?.location}</div>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-slate-500">Property Price</div>
            <div className="text-lg font-semibold text-slate-900">{data?.price}</div>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-4 text-xs text-slate-600">
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

        <div className="mt-4 grid grid-cols-3 gap-3 pb-4">
          <Stat label="Token Price" value={data?.stats?.tokenPrice} />
          <Stat label="Projected IRR" value={data?.stats?.irr} />
          <Stat label="Project APR" value={data?.stats?.apr} />
        </div>
      </div>
    </div>
  );
}

export default function MapCanvas({ map, items = [], accent = "#D66557" }) {
  const bg =
    map?.backgroundSrc ||
    map?.fallbackBackground ||
    IMG.search?.map ||
    "/images/search/map.png";

  //  use provided markers if exist, else generate from items
  const markers = useMemo(() => {
    if (map?.markers?.length) return map.markers;

    const pos = [
      { x: 52, y: 48 },
      { x: 38, y: 36 },
      { x: 28, y: 66 },
    ];

    const take = (items || []).slice(0, 3);
    return take.map((it, idx) => ({
      id: it.id || `m${idx + 1}`,
      x: pos[idx]?.x ?? 50,
      y: pos[idx]?.y ?? 50,
      image: it.imageSrc || it.image || it.fallbackImage || IMG.listings[idx % IMG.listings.length],
      popup: it.popup, // optional
    }));
  }, [map, items]);

  const [activeId, setActiveId] = useState(null);

  const activeMarker = markers.find((m) => m.id === activeId) || null;
  const popupData = activeMarker ? (activeMarker.popup || activeMarker?.popupData || activeMarker.popup || makeFallbackPopup(activeMarker)) : null;

  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div
        className="relative h-130 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
        onClick={() => setActiveId(null)}
      >
        {markers.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveId(m.id);
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${m.x}%`, top: `${m.y}%` }}
            aria-label={`Marker ${m.id}`}
          >
            <span className="inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white ring-4 ring-[#D66557]">
              {m.image ? <img src={m.image} alt="" className="h-full w-full object-cover" /> : null}
            </span>
          </button>
        ))}

        {/* second UI: popup opens on marker click */}
        {activeMarker ? (
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            <MapPopupCard data={popupData} accent={accent} onClose={() => setActiveId(null)} />
          </div>
        ) : null}
      </div>
    </div>
  );
}