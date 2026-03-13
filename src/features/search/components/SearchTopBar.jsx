import React from "react";

function Icon({ name, className }) {
  if (name === "pin") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
        <path
          d="M12 22s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    );
  }

  if (name === "search") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
        <path
          d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M21 21l-4.3-4.3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (name === "chevron") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
        <path
          d="M7 10l5 5 5-5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M4 6h16M7 12h10M10 18h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function SearchTopBar({
  accent = "#D66557",
  countries,
  types,
  value,
  onChange,
  onOpenFilters,
}) {
  const countryOptions = countries || ["Pakistan"];
  const typeOptions = types || ["House for Sale"];

  return (
    <div className="mx-auto w-full max-w-235">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-[220px_1fr] lg:grid-cols-[220px_1fr_44px] lg:items-center">
        {/* Country */}
        <div className="relative">
          <div className="flex h-12 items-center rounded-[14px] border border-[#D8DEE7] bg-white pl-3 pr-10">
            <Icon name="pin" className="h-4 w-4 shrink-0 text-[#D66557]" />

            <select
              value={value.country}
              onChange={(e) => onChange({ country: e.target.value })}
              className="h-full w-full appearance-none bg-transparent pl-3 pr-2 text-[14px] font-medium text-slate-700 outline-none"
            >
              {countryOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <Icon
            name="chevron"
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600"
          />
        </div>

        {/* Type + Search */}
        <div className="flex min-w-0 items-stretch">
          <div className="relative min-w-0 flex-1">
            <div className="flex h-12 min-w-0 items-center rounded-l-[14px] border border-r-0 border-[#D8DEE7] bg-white pl-4 pr-10">
              <select
                value={value.type}
                onChange={(e) => onChange({ type: e.target.value })}
                className="h-full w-full appearance-none bg-transparent pr-2 text-[14px] font-medium text-slate-700 outline-none"
              >
                {typeOptions.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <Icon
              name="chevron"
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600"
            />
          </div>

          <button
            type="button"
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-l-none rounded-r-[14px] px-4 text-[14px] font-semibold text-white transition hover:brightness-95 sm:min-w-28 sm:px-5"
            style={{ backgroundColor: accent }}
          >
            <Icon name="search" className="h-4 w-4" />
            <span>Search</span>
          </button>
        </div>

        {/* Filters */}
        <button
          type="button"
          onClick={onOpenFilters}
          className="inline-flex h-12 w-12 items-center justify-center rounded-[14px] text-white transition hover:brightness-95 md:col-span-2 md:justify-self-end lg:col-span-1 lg:justify-self-auto"
          style={{ backgroundColor: accent }}
          aria-label="Open filters"
        >
          <Icon name="filters" className="h-4.5 w-4.5" />
        </button>
      </div>
    </div>
  );
}