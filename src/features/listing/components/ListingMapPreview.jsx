export default function ListingMapPreview({ map }) {
  if (!map) return null;

  return (
    <div className="w-full overflow-hidden rounded-xl border border-black/5">
      <div className="relative w-full bg-slate-100">
        <div className="aspect-[16/7] w-full">
          <iframe
            title={map.title || "Map"}
            src={map.embedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full"
          />
        </div>

        {/* small overlay thumb on left like screenshot */}
        {map.miniThumb ? (
          <div className="absolute left-3 top-3 flex items-center gap-3 rounded-lg bg-white/95 p-2 shadow-sm ring-1 ring-black/10">
            <img
              src={map.miniThumb}
              alt=""
              className="h-10 w-10 rounded-md object-cover"
              draggable="false"
            />
            <div className="min-w-0">
              <div className="text-xs font-semibold text-slate-900">{map.placeLabel}</div>
              <div className="text-[11px] text-slate-500">{map.addressLabel}</div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}