// src/features/search/components/FiltersModal.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useLockBodyScroll } from "../../../shared/hooks/useLockBodyScroll";

function XIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Pill({ active, children, accent, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "h-7 rounded-full px-3 text-xs font-medium transition border",
        active ? "bg-white" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50",
      ].join(" ")}
      style={active ? { borderColor: accent, color: accent } : undefined}
    >
      {children}
    </button>
  );
}

export default function FiltersModal({ open, onClose, accent = "#D66557", value, onChange }) {
  useLockBodyScroll(open);

  const tags = useMemo(() => ["New Build", "Investment", "Renovated", "Lake view", "Garden"], []);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="Close"
      />

      <div
        className="absolute left-1/2 top-8 w-[94%] max-w-5xl -translate-x-1/2 rounded-2xl bg-white shadow-2xl ring-1 ring-black/5"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-slate-100"
              aria-label="Close"
            >
              <XIcon className="h-5 w-5 text-slate-700" />
            </button>
            <h3 className="text-sm font-semibold text-slate-900">Search Filters</h3>
          </div>

          <button type="button" className="text-xs font-semibold" style={{ color: accent }}>
            Clear all
          </button>
        </div>

        <div className="max-h-[78vh] overflow-auto px-6 pb-6">
          <input
            className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none"
            placeholder="Search Property Name or keywords...."
            value={value.keyword}
            onChange={(e) => onChange({ keyword: e.target.value })}
          />

          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((t) => {
              const active = value.tags?.includes(t);
              return (
                <Pill
                  key={t}
                  active={active}
                  accent={accent}
                  onClick={() => {
                    const set = new Set(value.tags || []);
                    if (set.has(t)) set.delete(t);
                    else set.add(t);
                    onChange({ tags: Array.from(set) });
                  }}
                >
                  {t}
                </Pill>
              );
            })}
          </div>

          {/* Category */}
          <div className="mt-6">
            <h4 className="text-xs font-semibold text-slate-900">Category</h4>
            <div className="mt-3 grid gap-6 md:grid-cols-2">
              <div className="grid gap-2 text-xs text-slate-700">
                {[
                  ["apartment", "Apartment"],
                  ["apartmentHouse", "Apartment & house"],
                  ["multifamily", "Multi-family house"],
                  ["parking", "Parking space, garage"],
                ].map(([k, label]) => (
                  <label key={k} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300"
                      checked={Boolean(value.categories?.[k])}
                      onChange={(e) =>
                        onChange({ categories: { ...(value.categories || {}), [k]: e.target.checked } })
                      }
                    />
                    {label}
                  </label>
                ))}
              </div>

              <div className="grid gap-2 text-xs text-slate-700">
                {[
                  ["house", "House, chalet, rustico"],
                  ["plot", "Building plot"],
                  ["commercial", "Commercial & Residential"],
                ].map(([k, label]) => (
                  <label key={k} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300"
                      checked={Boolean(value.categories?.[k])}
                      onChange={(e) =>
                        onChange({ categories: { ...(value.categories || {}), [k]: e.target.checked } })
                      }
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Looking for */}
          <div className="mt-6">
            <h4 className="text-xs font-semibold text-slate-900">What are you looking For:</h4>
            <div className="mt-3 flex flex-wrap gap-6 text-xs text-slate-700">
              {["Buy", "Rent", "Short-Term"].map((t) => (
                <label key={t} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="purpose"
                    className="h-4 w-4"
                    checked={value.lookingFor === t.toLowerCase().replace("-", "")}
                    onChange={() => onChange({ lookingFor: t.toLowerCase().replace("-", "") })}
                  />
                  {t}
                </label>
              ))}
            </div>
          </div>

          {/* City */}
          <div className="mt-6">
            <h4 className="text-xs font-semibold text-slate-900">City/ Area/ Zip Code or Street</h4>
            <input
              className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none"
              value={value.city}
              onChange={(e) => onChange({ city: e.target.value })}
            />
          </div>

          {/* Availability */}
          <div className="mt-6">
            <h4 className="text-xs font-semibold text-slate-900">Availability</h4>
            <select
              className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none"
              value={value.availability}
              onChange={(e) => onChange({ availability: e.target.value })}
            >
              <option>Long Term Rental</option>
              <option>Short- Term Rental (Hourly/Daily)</option>
              <option>Available immediately</option>
            </select>
          </div>

          {/* Price */}
          <div className="mt-6">
            <h4 className="text-xs font-semibold text-slate-900">Price (CHF)</h4>
            <div className="mt-2 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <input
                className="h-11 rounded-lg border border-slate-200 px-3 text-sm outline-none"
                value={value.priceFrom}
                onChange={(e) => onChange({ priceFrom: e.target.value })}
              />
              <span className="text-xs text-slate-500">to</span>
              <input
                className="h-11 rounded-lg border border-slate-200 px-3 text-sm outline-none"
                value={value.priceTo}
                onChange={(e) => onChange({ priceTo: e.target.value })}
              />
            </div>

            <label className="mt-3 flex items-center gap-2 text-xs text-slate-600">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300"
                checked={value.onlyWithPrice}
                onChange={(e) => onChange({ onlyWithPrice: e.target.checked })}
              />
              Only listings with price
            </label>
          </div>

          {/* Radius */}
          <div className="mt-6">
            <h4 className="text-xs font-semibold text-slate-900">Radius</h4>
            <div className="mt-2">
              <div className="text-[11px] text-slate-500">0 km</div>
              <input
                type="range"
                min="0"
                max="100"
                value={value.radius}
                onChange={(e) => onChange({ radius: Number(e.target.value) })}
                className="mt-2 w-full"
                style={{ accentColor: accent }}
              />
            </div>
          </div>

          {/* Volume */}
          <div className="mt-6">
            <h4 className="text-xs font-semibold text-slate-900">Volume</h4>
            <select
              className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none"
              value={value.volume}
              onChange={(e) => onChange({ volume: e.target.value })}
            >
              <option>400m</option>
              <option>800m</option>
              <option>1km</option>
            </select>
          </div>

          {/* Features */}
          <div className="mt-6">
            <h4 className="text-xs font-semibold text-slate-900">Features and furnishings</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                ["balcony", "Balcony / Terrace"],
                ["newBuilding", "New building"],
                ["parking", "Parking space / Garage"],
                ["oldBuilding", "Old building"],
                ["pool", "Swimming pool"],
              ].map(([k, label]) => (
                <Pill
                  key={k}
                  active={Boolean(value.features?.[k])}
                  accent={accent}
                  onClick={() =>
                    onChange({ features: { ...(value.features || {}), [k]: !value.features?.[k] } })
                  }
                >
                  {label}
                </Pill>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}