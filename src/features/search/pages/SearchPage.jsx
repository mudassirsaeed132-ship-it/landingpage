import { useMemo, useState } from "react";
import { SEARCH, THEME, LAYOUT } from "../../../config/siteContent";
import useSearchListings from "../hooks/useSearchListings";

import SearchTopBar from "../components/SearchTopBar";
import FilterChips from "../components/FilterChips";
import ResultCard from "../components/ResultCard";
import MapCanvas from "../components/MapCanvas";
import FiltersModal from "../components/FiltersModal";

const VIEW_ICONS = {
  grid: "/images/icons/view-grid.svg",
  map: "/images/icons/view-map.svg",
};

function CompareIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M4 8h11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path
        d="M12 5l3 3-3 3"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M20 16H9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path
        d="M12 13l-3 3 3 3"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SearchPage() {
  const accent = THEME?.accent || "#D66557";
  const container = LAYOUT?.container || "mx-auto w-full max-w-6xl px-4";
  const cfg = SEARCH || {};

  const [view, setView] = useState(cfg?.defaultView || "grid");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [top, setTop] = useState({
    country: cfg?.topBar?.countryDefault || "Pakistan",
    type: cfg?.topBar?.queryDefault || "House for Sale",
  });

  const [chipsState, setChipsState] = useState({
    purpose: "sale",
    isNew: false,
    roomsMin: 1,
    bathsMin: 1,
    balcony: false,
  });

  const [modalState, setModalState] = useState({
    keyword: "",
    tags: ["New Build"],
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
    city: "Zurich, LETTEN",
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
      balcony: true,
      newBuilding: false,
      parking: false,
      oldBuilding: false,
      pool: false,
    },
  });

  const initialData = useMemo(() => {
    const items = cfg?.results?.items || [];
    return {
      items,
      total: items.length,
      page: 1,
      pageSize: 20,
      hasMore: false,
      map: cfg?.map || null,
    };
  }, [cfg]);

  const { data, isLoading } = useSearchListings(
    {
      country: top.country,
      type: top.type,
      purpose: chipsState.purpose,
      isNew: chipsState.isNew,
      roomsMin: chipsState.roomsMin,
      bathsMin: chipsState.bathsMin,
      balcony: chipsState.balcony,
      q: modalState.keyword,
      page: 1,
      pageSize: 20,
    },
    { initialData }
  );

  const items = data?.items || [];
  const map = data?.map || cfg?.map;

  return (
    <main className="bg-white">
      <section className="pt-5 md:pt-6">
        <div className={container}>
          <SearchTopBar
            accent={accent}
            countries={cfg?.topBar?.countries || ["Pakistan"]}
            types={cfg?.topBar?.types || ["House for Sale", "House for Rent"]}
            value={top}
            onChange={(patch) => setTop((prev) => ({ ...prev, ...patch }))}
            onOpenFilters={() => setFiltersOpen(true)}
          />
        </div>
      </section>

      <section className="pt-8 md:pt-10">
        <div className={container}>
          <div className="flex items-baseline gap-2.5">
            <h1 className="text-[22px] font-semibold leading-none text-slate-900 md:text-[23px]">
              Houses
            </h1>
            <span className="text-[13px] text-slate-500">
              {cfg?.results?.countLabel || "100.3k results"}
            </span>
          </div>

          <div className="mt-2.5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0 flex-1">
              <FilterChips
                accent={accent}
                value={chipsState}
                onChange={(patch) => setChipsState((prev) => ({ ...prev, ...patch }))}
              />
            </div>

            <div className="flex shrink-0 items-center gap-3 self-start lg:self-auto">
              <button
                type="button"
                className="inline-flex h-10 items-center gap-1.5 rounded-[14px] px-4 text-[14px] font-semibold text-white"
                style={{ backgroundColor: accent }}
              >
                <CompareIcon className="h-4 w-4" />
                Compare Properties
              </button>

              <div className="inline-flex h-10 overflow-hidden rounded-xl border border-slate-200 bg-white">
                <button
                  type="button"
                  aria-label="Grid view"
                  onClick={() => setView("grid")}
                  className={`inline-flex h-10 w-11 items-center justify-center border-r border-slate-200 ${
                    view === "grid" ? "bg-[#F7E3E0]" : "bg-white hover:bg-slate-50"
                  }`}
                >
                  <img
                    src={VIEW_ICONS.grid}
                    alt=""
                    aria-hidden="true"
                    className="h-4.5 w-4.5 object-contain"
                    loading="lazy"
                  />
                </button>

                <button
                  type="button"
                  aria-label="Map view"
                  onClick={() => setView("map")}
                  className={`inline-flex h-10 w-11 items-center justify-center ${
                    view === "map" ? "bg-[#F7E3E0]" : "bg-white hover:bg-slate-50"
                  }`}
                >
                  <img
                    src={VIEW_ICONS.map}
                    alt=""
                    aria-hidden="true"
                    className="h-4.5 w-4.5 object-contain"
                    loading="lazy"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {view === "grid" ? (
        <section className="pt-10 pb-12 md:pt-12">
          <div className={container}>
            <div className="grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
              {(isLoading && items.length === 0 ? Array.from({ length: 8 }) : items).map(
                (it, idx) =>
                  typeof it === "undefined" ? (
                    <div
                      key={idx}
                      className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
                    >
                      <div className="aspect-16/10 w-full animate-pulse bg-slate-100" />
                      <div className="px-4 py-3">
                        <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
                        <div className="mt-2 h-3 w-2/3 animate-pulse rounded bg-slate-100" />
                      </div>
                      <div className="grid grid-cols-3 border-t border-slate-200">
                        <div className="h-10 animate-pulse bg-slate-50" />
                        <div className="h-10 animate-pulse bg-slate-50" />
                        <div className="h-10 animate-pulse bg-slate-50" />
                      </div>
                    </div>
                  ) : (
                    <ResultCard key={it.id} listing={{ ...it, accent }} index={idx} />
                  )
              )}
            </div>
          </div>
        </section>
      ) : (
        <section className="pt-2 pb-0 md:pt-3">
          <MapCanvas accent={accent} map={map} items={items} />
        </section>
      )}

      <FiltersModal
        open={filtersOpen}
        accent={accent}
        value={modalState}
        onChange={(patch) => setModalState((prev) => ({ ...prev, ...patch }))}
        onClose={() => setFiltersOpen(false)}
      />
    </main>
  );
}