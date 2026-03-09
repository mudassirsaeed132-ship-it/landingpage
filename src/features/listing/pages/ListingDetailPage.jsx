import { useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useListingDetail from "../hooks/useListingDetail";
import { LISTINGS_MOCK, normalizeListingId } from "../data/listing.mock";

import ListingGallery from "../components/ListingGallery";
import ListingMetaBar from "../components/ListingMetaBar";
import ListingSummary from "../components/ListingSummary";
import ListingMapPreview from "../components/ListingMapPreview";
import AgentReviews from "../components/AgentReviews";


import AuthModal from "../../auth/components/AuthModal";

import "./listing-detail.css";

function Section({ title, defaultOpen = false, children }) {
  return (
    <section className="mt-4">
      <details
        open={defaultOpen}
        className="group overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm"
      >
        <summary className="flex cursor-pointer items-center justify-between gap-4 border-b border-black/5 px-5 py-4 md:px-6">
          <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            aria-hidden="true"
            className="text-slate-400 transition group-open:rotate-180"
          >
            <path fill="currentColor" d="M12 15.5 5 8.5l1.4-1.4L12 12.7l5.6-5.6L19 8.5z" />
          </svg>
        </summary>

        <div className="px-5 pb-5 pt-4 md:px-6 md:pb-6 md:pt-5">{children}</div>
      </details>
    </section>
  );
}

export default function ListingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const normalizedId = useMemo(() => normalizeListingId(id), [id]);
  const { data: listing, isLoading, error } = useListingDetail(normalizedId);

  const [authOpen, setAuthOpen] = useState(false);
  const authTriggerRef = useRef(null);

  const listingIds = useMemo(() => LISTINGS_MOCK.map((l) => String(l.id)), []);
  const currentIndex = useMemo(
    () => listingIds.indexOf(String(normalizedId)),
    [listingIds, normalizedId]
  );

  const prevId = currentIndex > 0 ? listingIds[currentIndex - 1] : null;
  const nextId =
    currentIndex >= 0 && currentIndex < listingIds.length - 1
      ? listingIds[currentIndex + 1]
      : null;

  const isAuthed = useMemo(() => {
    try {
      return Boolean(localStorage.getItem("authToken") || localStorage.getItem("token"));
    } catch {
      return false;
    }
  }, []);

  const openAuth = () => setAuthOpen(true);
  const closeAuth = () => setAuthOpen(false);

  const handleChat = () => {
    if (!isAuthed) return openAuth();
  };

  const handleBook = () => {
    if (!isAuthed) return openAuth();
  };

  const handlePrevResult = () => {
    if (!prevId) return;
    navigate(`/listing/${prevId}`);
  };

  const handleNextResult = () => {
    if (!nextId) return;
    navigate(`/listing/${nextId}`);
  };

  return (
    <div className="listingDetail w-full overflow-x-hidden">
      <ListingGallery images={listing?.heroImages || []} />

      <ListingMetaBar
        leftLabel={listing?.resultsIndexLabel || "1/100 Results"}
        onShare={() => {}}
        onFavorite={() => {}}
        onPrevResult={handlePrevResult}
        onNextResult={handleNextResult}
        prevDisabled={!prevId}
        nextDisabled={!nextId}
      />

      <main className="mx-auto max-w-6xl px-4 pb-10">
        {isLoading ? (
          <div className="mt-6 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="h-[220px] rounded-xl bg-black/5" />
              <div className="mt-4 h-[420px] rounded-xl bg-black/5" />
            </div>
            <div className="lg:col-span-4">
              <div className="h-[520px] rounded-xl bg-black/5" />
            </div>
          </div>
        ) : error ? (
          <div className="mt-8 rounded-xl border border-black/10 bg-white p-6 text-slate-700">
            <div className="text-base font-semibold">Could not load listing</div>
            <div className="mt-1 text-sm text-slate-500">{error.message}</div>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 lg:grid-cols-12">
            <div className="min-w-0 lg:col-span-8">
              <ListingSummary listing={listing} />

              <Section title="Description" defaultOpen>
                <div className="space-y-4 text-sm leading-6 text-slate-600">
                  {(listing?.description || []).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </Section>

              <Section title="Location Address">
                <ListingMapPreview map={listing?.map} />
              </Section>

              <Section title="Photos">
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {(listing?.photos?.thumbs || []).map((src, i) => {
                    const isLast = i === listing.photos.thumbs.length - 1;
                    const showMore = isLast && listing?.photos?.moreCount;

                    return (
                      <button
                        key={src + i}
                        type="button"
                        className="relative h-14 w-20 flex-none overflow-hidden rounded-lg border border-black/5 bg-black/5"
                        aria-label={`Open photo ${i + 1}`}
                      >
                        <img
                          src={src}
                          alt=""
                          className="h-full w-full object-cover"
                          draggable="false"
                        />
                        {showMore ? (
                          <div className="absolute inset-0 grid place-items-center bg-black/35 text-xs font-semibold text-white">
                            +{listing.photos.moreCount}
                          </div>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </Section>

              <Section title="AI Value Insights">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-slate-600">Fair Value Score</div>
                    <div className="text-slate-700">
                      <span className="font-semibold">{listing?.aiInsights?.fairValueScore}</span>/100
                    </div>
                  </div>

                  <div className="h-2 w-full overflow-hidden rounded-full bg-black/10">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.max(0, listing?.aiInsights?.fairValueScore || 0)
                        )}%`,
                        backgroundColor: "#D7665A",
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <div>Market Comparison</div>
                    <div className="font-semibold text-[#D7665A]">
                      {listing?.aiInsights?.marketComparison}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <div>Value Badge</div>
                    <span className="rounded-full bg-[#F8E6E3] px-3 py-1 text-xs font-semibold text-[#D7665A]">
                      {listing?.aiInsights?.valueBadge}
                    </span>
                  </div>
                </div>
              </Section>

              <Section title="Property Factsheet">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => {}}
                    className="w-full rounded-xl bg-[#D7665A] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
                  >
                    Start Financial Precheck
                  </button>
                  <button
                    type="button"
                    onClick={() => {}}
                    className="w-full rounded-xl border-2 border-[#D7665A] bg-white px-4 py-3 text-sm font-semibold text-[#D7665A] shadow-sm hover:bg-[#FAF1EF] focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
                  >
                    Compare Property
                  </button>
                </div>
              </Section>
            </div>

            <div className="min-w-0 lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <AgentReviews
                  agent={listing?.agent}
                  reviews={listing?.reviews}
                  onChat={handleChat}
                  onBook={handleBook}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      

      <span ref={authTriggerRef} className="sr-only" aria-hidden="true" />
      <AuthModal open={authOpen} onClose={closeAuth} triggerRef={authTriggerRef} />
    </div>
  );
}