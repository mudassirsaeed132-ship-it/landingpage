import Icon from "../../../shared/ui/Icons";

export default function ListingSummary({ listing }) {
  if (!listing) return null;

  return (
    <article className="rounded-xl border border-black/5 bg-white p-5 shadow-sm">
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="truncate text-lg font-semibold text-slate-900">{listing.title}</h1>

          <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
            <Icon name="location" size={16} className="shrink-0" ariaLabel="Location" />
            <span className="truncate">{listing.address}</span>
          </div>

          <div className="mt-2 text-base font-semibold text-slate-900">{listing.priceLabel}</div>
        </div>

        <div className="shrink-0">
          <span className="inline-flex items-center gap-2 rounded-lg bg-[#F8E6E3] px-3 py-1 text-xs font-semibold text-[#D7665A]">
            <Icon name="forsale" size={14} className="shrink-0" ariaLabel="For Sale" />
            {listing.badge?.label || "For Sale"}
          </span>
        </div>
      </header>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {listing.facts?.map((f) => (
          <div
            key={f.key}
            className="flex items-start gap-3 rounded-lg border border-black/5 bg-white px-3 py-3"
          >
            <div className="mt-0.5 grid h-9 w-9 place-items-center rounded-lg bg-[#FAF1EF]">
              <Icon name={f.icon} size={18} ariaLabel={f.label} />
            </div>

            <div className="min-w-0">
              <div className="text-xs text-slate-500">{f.label}</div>
              <div className="truncate text-sm font-medium text-slate-900">{f.value}</div>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}