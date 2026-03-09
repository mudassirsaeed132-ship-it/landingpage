import React, { useEffect, useMemo, useState } from "react";

function cn(...c) {
  return c.filter(Boolean).join(" ");
}

function IconHeart({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M12.1 20.2s-7.1-4.3-9.3-8.1C.7 8.5 2.5 5.5 5.8 5.2c1.8-.2 3.5.7 4.4 2 1-1.3 2.6-2.2 4.4-2 3.3.3 5.1 3.3 3 6.9-2.2 3.8-9.3 8.1-9.3 8.1Z"
        stroke="#D66557"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPin({ className, stroke = "#111827" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M12 21s7-6.2 7-12A7 7 0 0 0 5 9c0 5.8 7 12 7 12Z"
        stroke={stroke}
        strokeWidth="2"
      />
      <circle cx="12" cy="9" r="2.2" stroke={stroke} strokeWidth="2" />
    </svg>
  );
}

function IconBed({ className, stroke = "#111827" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M3 12h18" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <path
        d="M4 12V8.8c0-1 0.8-1.8 1.8-1.8h5.4c1 0 1.8.8 1.8 1.8V12"
        stroke={stroke}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M3 12v7M21 12v7" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <path d="M3 16h18" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconArea({ className, stroke = "#111827" }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} block`} fill="none" aria-hidden="true">
      <rect
        x="7"
        y="7"
        width="10"
        height="10"
        rx="2"
        stroke={stroke}
        strokeWidth="2"
        strokeDasharray="3 3"
      />
    </svg>
  );
}

function IconChevronLeft({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M15 6l-6 6 6 6" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconChevronRight({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M9 6l6 6-6 6" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Price({ value }) {
  const slashIdx = value?.indexOf("/") ?? -1;

  if (slashIdx > -1) {
    const left = value.slice(0, slashIdx);
    const right = value.slice(slashIdx);

    return (
      <div className="text-sm font-semibold text-slate-900">
        {left}
        <span className="font-medium text-slate-400">{right}</span>
      </div>
    );
  }

  return <div className="text-sm font-semibold text-slate-900">{value}</div>;
}

export default function PropertyCard({
  item,
  variant = "landing",
  verifiedLabel = "Owner Verified",
  newLabel = "New",
  detailsLabel = "Details",
  accent = "#D66557",
  onDetails = () => {},
  onToggleFavorite = () => {},
  actionLabels = { chat: "Chat", book: "Book Visit", precheck: "Pre check" },
  onChat = () => {},
  onBookVisit = () => {},
  onPrecheck = () => {},
  className,
}) {
  const rooms = item.roomsLabel ?? item.stats?.[0];
  const area = item.areaLabel ?? item.stats?.[1];
  const iconStroke = variant === "search" ? accent : "#111827";
  const metaText = "text-slate-400";

  const images = useMemo(() => {
    const list = Array.isArray(item.images) ? item.images.filter(Boolean) : [];
    if (list.length) return list;
    return item.image ? [item.image] : [];
  }, [item.images, item.image]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  const currentImage = images[currentIndex] || item.image;
  const hasMultipleImages = images.length > 1;
  const searchImageClickable = variant === "search";

  const goPrev = (e) => {
    e.stopPropagation();
    if (!hasMultipleImages) return;
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goNext = (e) => {
    e.stopPropagation();
    if (!hasMultipleImages) return;
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <article
      className={cn(
        "w-full max-w-[260px] overflow-hidden rounded-2xl bg-white",
        "ring-1 ring-black/10 shadow-sm",
        className
      )}
    >
      <div
        className={cn(
          "relative aspect-[16/9] w-full overflow-hidden",
          searchImageClickable ? "cursor-pointer" : ""
        )}
        onClick={searchImageClickable ? onDetails : undefined}
      >
        <img
          key={`${item.title}-${currentIndex}`}
          src={currentImage}
          alt={item.title}
          className="h-full w-full object-cover object-center transition-all duration-300 ease-out"
          loading="lazy"
          decoding="async"
          draggable={false}
        />

        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {item.verified && (
            <span className="w-fit rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-slate-900 shadow-sm">
              {verifiedLabel}
            </span>
          )}
          {item.isNew && (
            <span className="w-fit rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-slate-900 shadow-sm">
              {newLabel}
            </span>
          )}
        </div>

        <button
          type="button"
          aria-label="Save listing"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white/95 shadow-sm"
        >
          <IconHeart className="h-5 w-5" />
        </button>

        {variant === "search" ? (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={goPrev}
              disabled={!hasMultipleImages}
              className={cn(
                "absolute bottom-3 left-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/95 shadow-sm transition",
                hasMultipleImages ? "hover:scale-105" : "cursor-default opacity-70"
              )}
            >
              <IconChevronLeft className="h-3 w-3" />
            </button>

            <button
              type="button"
              aria-label="Next image"
              onClick={goNext}
              disabled={!hasMultipleImages}
              className={cn(
                "absolute bottom-3 right-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/95 shadow-sm transition",
                hasMultipleImages ? "hover:scale-105" : "cursor-default opacity-70"
              )}
            >
              <IconChevronRight className="h-3 w-3" />
            </button>
          </>
        ) : null}
      </div>

      <div className="px-4 pb-4 pt-4">
        <h3 className="text-[16px] font-semibold leading-snug text-slate-900">
          {item.title}
        </h3>

        <div className="mt-2.5 flex items-center gap-2.5">
          <IconPin className="h-5 w-5 shrink-0" stroke={iconStroke} />
          <p className={cn("text-[13px] font-medium", metaText)}>{item.location}</p>
        </div>

        <div className={cn("mt-3 flex items-center gap-6", metaText)}>
          <div className="flex items-center gap-2">
            <IconBed className="h-5 w-5" stroke={iconStroke} />
            <span className="text-[12px] font-medium">{rooms}</span>
          </div>

          <div className="flex items-center gap-2">
            <IconArea className="h-5 w-5" stroke={iconStroke} />
            <span className="text-[12px] font-medium">{area}</span>
          </div>
        </div>

        <div className="mt-3.5 h-px w-full bg-slate-200" />

        {variant === "landing" ? (
          <div className="mt-3.5 flex items-center justify-between">
            <Price value={item.price} />
            <button
              type="button"
              onClick={onDetails}
              className="text-[12px] font-medium text-[#D66557] hover:opacity-90"
            >
              {detailsLabel}
            </button>
          </div>
        ) : null}
      </div>

      {variant === "search" ? (
        <div className="grid grid-cols-3 border-t border-slate-200">
          <button
            type="button"
            onClick={onChat}
            className="py-3 text-[12px] font-medium hover:opacity-90"
            style={{ color: accent }}
          >
            {actionLabels.chat}
          </button>

          <button
            type="button"
            onClick={onBookVisit}
            className="border-l border-r border-slate-200 py-3 text-[12px] font-medium hover:opacity-90"
            style={{ color: accent }}
          >
            {actionLabels.book}
          </button>

          <button
            type="button"
            onClick={onPrecheck}
            className="py-3 text-[12px] font-medium hover:opacity-90"
            style={{ color: accent }}
          >
            {actionLabels.precheck}
          </button>
        </div>
      ) : null}
    </article>
  );
}