import React, { useEffect, useMemo } from "react";
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
        "min-h-9 rounded-full border px-3.5 py-2 text-left text-[12px] font-medium leading-4 transition sm:text-xs",
        active
          ? "bg-white"
          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
      ].join(" ")}
      style={active ? { borderColor: accent, color: accent } : undefined}
    >
      {children}
    </button>
  );
}

function SectionTitle({ children }) {
  return <h4 className="text-xs font-semibold text-slate-900 sm:text-[13px]">{children}</h4>;
}

export default function FiltersModal({ open, onClose, accent = "#D66557", value, onChange }) {
  useLockBodyScroll(open);

  const tags = useMemo(
    () => ["New Build", "Investment", "Renovated", "Lake view", "Garden"],
    []
  );

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }

    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleClearAll = () => {
    onChange({
      keyword: "",
      tags: [],
      categories: {
        apartment: false,
        apartmentHouse: false,
        multifamily: false,
        parking: false,
        house: false,
        plot: false,
        commercial: false,
      },
      lookingFor: "rent",
      city: "",
      availability: "Long Term Rental",
      priceFrom: "",
      priceTo: "",
      onlyWithPrice: false,
      roomsFrom: "",
      roomsTo: "",
      spaceFrom: "",
      spaceTo: "",
      radius: 15,
      volume: "400m",
      features: {
        balcony: false,
        newBuilding: false,
        parking: false,
        oldBuilding: false,
        pool: false,
      },
    });
  };

  if (!open) return null;

  const inputClass =
    "h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-slate-300";
  const selectClass =
    "h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-slate-300";
  const checkboxClass = "mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300";
  const radioClass = "mt-0.5 h-4 w-4 shrink-0";

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        className="absolute inset-0 bg-black/45"
        onClick={onClose}
        aria-label="Close"
      />

      <div className="fixed inset-0 flex items-end justify-center p-2 sm:items-center sm:p-4 md:p-6">
        <div
          className="relative flex h-[calc(100dvh-1rem)] w-full max-w-5xl flex-col overflow-hidden rounded-[24px] bg-white shadow-2xl ring-1 ring-black/5 sm:h-auto sm:max-h-[88vh]"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-4 sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full hover:bg-slate-100"
                aria-label="Close"
              >
                <XIcon className="h-5 w-5 text-slate-700" />
              </button>

              <h3 className="truncate text-sm font-semibold text-slate-900 sm:text-[15px]">
                Search Filters
              </h3>
            </div>

            <button
              type="button"
              onClick={handleClearAll}
              className="shrink-0 text-xs font-semibold sm:text-[13px]"
              style={{ color: accent }}
            >
              Clear all
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-5 pt-4 sm:px-6 sm:pb-6">
            <input
              className={inputClass}
              placeholder="Search Property Name or keywords..."
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

            <div className="mt-6 grid gap-6 xl:grid-cols-2 xl:gap-x-10">
              {/* Category */}
              <section>
                <SectionTitle>Category</SectionTitle>

                <div className="mt-3 grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <div className="grid gap-2.5 text-xs text-slate-700 sm:text-[13px]">
                    {[
                      ["apartment", "Apartment"],
                      ["apartmentHouse", "Apartment & house"],
                      ["multifamily", "Multi-family house"],
                      ["parking", "Parking space, garage"],
                    ].map(([k, label]) => (
                      <label key={k} className="flex items-start gap-2.5">
                        <input
                          type="checkbox"
                          className={checkboxClass}
                          checked={Boolean(value.categories?.[k])}
                          onChange={(e) =>
                            onChange({
                              categories: {
                                ...(value.categories || {}),
                                [k]: e.target.checked,
                              },
                            })
                          }
                        />
                        <span className="leading-5">{label}</span>
                      </label>
                    ))}
                  </div>

                  <div className="grid gap-2.5 text-xs text-slate-700 sm:text-[13px]">
                    {[
                      ["house", "House, chalet, rustico"],
                      ["plot", "Building plot"],
                      ["commercial", "Commercial & Residential"],
                    ].map(([k, label]) => (
                      <label key={k} className="flex items-start gap-2.5">
                        <input
                          type="checkbox"
                          className={checkboxClass}
                          checked={Boolean(value.categories?.[k])}
                          onChange={(e) =>
                            onChange({
                              categories: {
                                ...(value.categories || {}),
                                [k]: e.target.checked,
                              },
                            })
                          }
                        />
                        <span className="leading-5">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </section>

              {/* Looking for */}
              <section>
                <SectionTitle>What are you looking For:</SectionTitle>

                <div className="mt-3 grid gap-2 text-xs text-slate-700 sm:grid-cols-2 sm:text-[13px] lg:grid-cols-3">
                  {["Buy", "Rent", "Short-Term"].map((t) => (
                    <label key={t} className="flex items-start gap-2.5 rounded-xl border border-slate-200 px-3 py-3">
                      <input
                        type="radio"
                        name="purpose"
                        className={radioClass}
                        checked={value.lookingFor === t.toLowerCase().replace("-", "")}
                        onChange={() => onChange({ lookingFor: t.toLowerCase().replace("-", "") })}
                      />
                      <span className="leading-5">{t}</span>
                    </label>
                  ))}
                </div>
              </section>

              {/* City */}
              <section>
                <SectionTitle>City / Area / Zip Code or Street</SectionTitle>
                <input
                  className={`mt-2 ${inputClass}`}
                  value={value.city}
                  onChange={(e) => onChange({ city: e.target.value })}
                />
              </section>

              {/* Availability */}
              <section>
                <SectionTitle>Availability</SectionTitle>
                <select
                  className={`mt-2 ${selectClass}`}
                  value={value.availability}
                  onChange={(e) => onChange({ availability: e.target.value })}
                >
                  <option>Long Term Rental</option>
                  <option>Short- Term Rental (Hourly/Daily)</option>
                  <option>Available immediately</option>
                </select>
              </section>

              {/* Price */}
              <section>
                <SectionTitle>Price (CHF)</SectionTitle>

                <div className="mt-2 grid gap-2 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-3">
                  <input
                    className={inputClass}
                    value={value.priceFrom}
                    onChange={(e) => onChange({ priceFrom: e.target.value })}
                    placeholder="From"
                  />
                  <span className="hidden text-center text-xs text-slate-500 sm:block">to</span>
                  <input
                    className={inputClass}
                    value={value.priceTo}
                    onChange={(e) => onChange({ priceTo: e.target.value })}
                    placeholder="To"
                  />
                </div>

                <label className="mt-3 flex items-start gap-2.5 text-xs text-slate-600 sm:text-[13px]">
                  <input
                    type="checkbox"
                    className={checkboxClass}
                    checked={value.onlyWithPrice}
                    onChange={(e) => onChange({ onlyWithPrice: e.target.checked })}
                  />
                  <span className="leading-5">Only listings with price</span>
                </label>
              </section>

              {/* Radius */}
              <section>
                <SectionTitle>Radius</SectionTitle>

                <div className="mt-2 rounded-xl border border-slate-200 px-4 py-4">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 sm:text-xs">
                    <span>0 km</span>
                    <span>{value.radius} km</span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={value.radius}
                    onChange={(e) => onChange({ radius: Number(e.target.value) })}
                    className="mt-3 w-full"
                    style={{ accentColor: accent }}
                  />
                </div>
              </section>

              {/* Volume */}
              <section className="xl:col-span-1">
                <SectionTitle>Volume</SectionTitle>
                <select
                  className={`mt-2 ${selectClass}`}
                  value={value.volume}
                  onChange={(e) => onChange({ volume: e.target.value })}
                >
                  <option>400m</option>
                  <option>800m</option>
                  <option>1km</option>
                </select>
              </section>

              {/* Features */}
              <section className="xl:col-span-2">
                <SectionTitle>Features and furnishings</SectionTitle>

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
                        onChange({
                          features: {
                            ...(value.features || {}),
                            [k]: !value.features?.[k],
                          },
                        })
                      }
                    >
                      {label}
                    </Pill>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}