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
  return (
    <div className="mx-auto w-full max-w-190">
      <div className="grid grid-cols-1 gap-2.5 md:grid-cols-[180px_1fr_44px] md:items-center">
        {/* Country */}
        <div className="flex h-11 items-center gap-2 rounded-[10px] border border-[#D8DEE7] bg-white px-3">
          <Icon name="pin" className="h-4 w-4 shrink-0 text-[#D66557]" />
          <select
            value={value.country}
            onChange={(e) => onChange({ country: e.target.value })}
            className="h-full w-full bg-transparent text-[14px] font-medium text-slate-700 outline-none"
          >
            {(countries || ["Pakistan"]).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Type + Search attached */}
        <div className="flex min-w-0 items-stretch">
          <div className="flex h-11 min-w-0 flex-1 items-center rounded-l-[10px] rounded-r-none border border-r-0 border-[#D8DEE7] bg-white px-3">
            <select
              value={value.type}
              onChange={(e) => onChange({ type: e.target.value })}
              className="h-full w-full appearance-none bg-transparent text-[14px] font-medium text-slate-700 outline-none"
            >
              {(types || ["House for Sale"]).map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-l-none rounded-r-[10px] px-4 text-[14px] font-semibold text-white"
            style={{ backgroundColor: accent }}
          >
            <Icon name="search" className="h-4 w-4" />
            Search
          </button>
        </div>

        {/* Filters */}
        <button
          type="button"
          onClick={onOpenFilters}
          className="inline-flex h-11 w-11 items-center justify-center rounded-[10px] text-white"
          style={{ backgroundColor: accent }}
          aria-label="Open filters"
        >
          <Icon name="filters" className="h-4.5 w-4.5" />
        </button>
      </div>
    </div>
  );
}