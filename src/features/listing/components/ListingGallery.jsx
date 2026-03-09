import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "../../../shared/lib/cn";

function ChevronLeftIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M15 6l-6 6 6 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ListingGallery({
  images = [],
  initialIndex = 0,
  onIndexChange,
  className = "",
  heightClassName = "h-[240px] sm:h-[360px] lg:h-[520px] xl:h-[560px] 2xl:h-[600px]",
}) {
  const reduceMotion = useReducedMotion();

  const safeImages = useMemo(() => {
    const arr = Array.isArray(images) ? images : [];
    return arr
      .map((img) => (typeof img === "string" ? { src: img, alt: "Listing photo" } : img))
      .filter((img) => img?.src);
  }, [images]);

  const total = safeImages.length;

  const [idx, setIdx] = useState(() => {
    const max = Math.max(0, safeImages.length - 1);
    return Math.min(Math.max(0, initialIndex), max);
  });

  const [dir, setDir] = useState(1);

  useEffect(() => {
    const max = Math.max(0, safeImages.length - 1);
    setIdx((prev) => Math.min(prev, max));
  }, [safeImages.length]);

  useEffect(() => {
    onIndexChange?.(idx);
  }, [idx, onIndexChange]);

  useEffect(() => {
    if (!safeImages.length) return;

    const nextSrc = safeImages[(idx + 1) % total]?.src;
    const prevSrc = safeImages[(idx - 1 + total) % total]?.src;

    [nextSrc, prevSrc].filter(Boolean).forEach((src) => {
      const img = new Image();
      img.decoding = "async";
      img.src = src;
    });
  }, [idx, safeImages, total]);

  const prev = () => {
    if (!safeImages.length) return;
    setDir(-1);
    setIdx((v) => (v - 1 + total) % total);
  };

  const next = () => {
    if (!safeImages.length) return;
    setDir(1);
    setIdx((v) => (v + 1) % total);
  };

  const goTo = (i) => {
    if (!safeImages.length || i === idx) return;
    setDir(i > idx ? 1 : -1);
    setIdx(i);
  };

  const activeImage = safeImages[idx];

  const variants = {
    enter: (direction) =>
      reduceMotion
        ? { opacity: 0 }
        : { opacity: 0, x: direction > 0 ? 28 : -28, scale: 1.005 },
    center: reduceMotion
      ? { opacity: 1 }
      : { opacity: 1, x: 0, scale: 1 },
    exit: (direction) =>
      reduceMotion
        ? { opacity: 0 }
        : { opacity: 0, x: direction > 0 ? -28 : 28, scale: 0.995 },
  };

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.18, ease: [0.16, 1, 0.3, 1] };

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <div className={cn("relative w-full", heightClassName)}>
        <AnimatePresence initial={false} custom={dir} mode="wait">
          {activeImage ? (
            <motion.img
              key={activeImage.src}
              src={activeImage.src}
              alt={activeImage.alt || `Listing photo ${idx + 1}`}
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
              decoding="async"
              loading="eager"
              fetchPriority="high"
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
            />
          ) : (
            <div className="absolute inset-0 bg-black/5" />
          )}
        </AnimatePresence>

        {total > 0 ? (
          <div className="absolute right-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white sm:right-5 sm:top-5">
            {idx + 1}/{total}
          </div>
        ) : null}

        {total > 1 ? (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous"
              className={cn(
                "absolute left-3 top-1/2 z-10 -translate-y-1/2 sm:left-6",
                "grid h-10 w-10 place-items-center rounded-full bg-white/95",
                "shadow-md ring-1 ring-black/5 hover:bg-white",
                "sm:h-11 sm:w-11"
              )}
            >
              <ChevronLeftIcon className="h-5 w-5 text-[#111827]" />
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Next"
              className={cn(
                "absolute right-3 top-1/2 z-10 -translate-y-1/2 sm:right-6",
                "grid h-10 w-10 place-items-center rounded-full bg-white/95",
                "shadow-md ring-1 ring-black/5 hover:bg-white",
                "sm:h-11 sm:w-11"
              )}
            >
              <ChevronRightIcon className="h-5 w-5 text-[#111827]" />
            </button>
          </>
        ) : null}

        {total > 1 ? (
          <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 sm:bottom-5">
            <div className="flex items-center gap-2">
              {Array.from({ length: Math.min(total, 7) }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-200",
                    i === idx ? "w-7 bg-white" : "w-3 bg-white/45 hover:bg-white/80"
                  )}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}