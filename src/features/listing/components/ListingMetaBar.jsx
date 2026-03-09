import IconButton from "../../../shared/ui/IconButton";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ResultArrowButton({
  ariaLabel,
  onClick,
  disabled = false,
  iconSrc,
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex h-5 w-5 items-center justify-center rounded-full text-slate-700 transition sm:h-7 sm:w-7",
        disabled ? "cursor-not-allowed opacity-40" : "hover:opacity-80"
      )}
    >
      <span
        aria-hidden="true"
        className="block h-5 w-5 bg-current sm:h-7 sm:w-7"
        style={{
          maskImage: `url(${iconSrc})`,
          WebkitMaskImage: `url(${iconSrc})`,
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
          maskSize: "contain",
          WebkitMaskSize: "contain",
        }}
      />
    </button>
  );
}

function HeartOutlineIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ListingMetaBar({
  leftLabel = "1/100 Results",
  onShare,
  onFavorite,
  onPrevResult,
  onNextResult,
  prevDisabled = false,
  nextDisabled = false,
}) {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-6xl px-3 sm:px-4">
        <div className="mt-3 rounded-2xl border border-black/5 bg-white px-3 py-3 shadow-sm sm:mt-4 sm:px-4 md:px-5 md:py-3.5">
          <div className="flex items-center justify-between gap-3">
            {/* Left */}
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <ResultArrowButton
                ariaLabel="Previous result"
                onClick={onPrevResult}
                disabled={prevDisabled}
                iconSrc="/images/icons/left-arrow.svg"
              />

              <span className="truncate text-[13px] font-medium text-slate-700 sm:text-[14px] md:text-[15px]">
                {leftLabel}
              </span>

              <ResultArrowButton
                ariaLabel="Next result"
                onClick={onNextResult}
                disabled={nextDisabled}
                iconSrc="/images/icons/right-arrow.svg"
              />
            </div>

            {/* Right */}
            <div className="flex shrink-0 items-center gap-2">
              <IconButton
                ariaLabel="Share listing"
                onClick={onShare}
                icon="share"
                iconSize={18}
                className="h-5 w-5 sm:h-11 sm:w-11"
              />

              <button
                type="button"
                aria-label="Save listing"
                onClick={onFavorite}
                className="inline-flex h-5 w-5 items-center justify-center rounded-[14px] border border-black/10 bg-white text-slate-800 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:bg-slate-50 sm:h-11 sm:w-11"
              >
                <HeartOutlineIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
