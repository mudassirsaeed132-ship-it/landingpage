import { useMemo, useState } from "react";
import Icon from "../../../shared/ui/Icons";

function StarRow({ value = 0 }) {
  const full = Math.round(value);

  return (
    <div className="flex items-center gap-1" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const on = i < full;
        return (
          <svg
            key={i}
            viewBox="0 0 24 24"
            width="16"
            height="16"
            aria-hidden="true"
            className={on ? "text-[#F5B400]" : "text-slate-200"}
          >
            <path
              fill="currentColor"
              d="M12 2l2.9 6.3 6.9.6-5.2 4.5 1.6 6.7L12 16.9 5.8 20.1l1.6-6.7L2.2 8.9l6.9-.6L12 2z"
            />
          </svg>
        );
      })}
    </div>
  );
}

export default function AgentReviews({ agent, reviews, onChat, onBook }) {
  const [expanded, setExpanded] = useState(false);

  const visible = useMemo(() => {
    if (!Array.isArray(reviews)) return [];
    return expanded ? reviews : reviews.slice(0, 1);
  }, [expanded, reviews]);

  if (!agent) return null;

  return (
    <aside className="min-w-0">
      <div className="rounded-xl border border-black/5 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex items-start gap-3">
          <img
            src={agent.avatar}
            alt={`${agent.name} avatar`}
            className="h-12 w-12 shrink-0 rounded-full object-cover"
            draggable="false"
          />

          <div className="min-w-0">
            <div className="text-base font-semibold text-slate-900">{agent.name}</div>
            <div className="text-sm text-slate-500">{agent.role}</div>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <StarRow value={agent.rating} />
              <div className="text-sm text-slate-700">
                <span className="font-semibold">{agent.rating.toFixed(1)}</span>{" "}
                <span className="text-slate-500">({agent.reviewsCount} reviews)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-sm leading-6 text-slate-600">{agent.managingLine}</div>

        <div className="my-4 h-px w-full bg-black/5" />

        <div className="space-y-5">
          {visible.map((r) => (
            <div key={r.id} className="min-w-0">
              <div className="flex items-start gap-3">
                <img
                  src={r.avatar}
                  alt=""
                  className="mt-0.5 h-8 w-8 shrink-0 rounded-full object-cover"
                  draggable="false"
                />

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <div className="font-medium text-slate-900">{r.author}</div>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <StarRow value={r.rating} />
                      <span>{r.scoreLabel}</span>
                      <span>{r.timeAgo}</span>
                    </div>
                  </div>

                  <div className="mt-2 text-sm font-semibold text-slate-900">{r.title}</div>

                  <p className={`mt-1 text-sm leading-6 text-slate-500 ${expanded ? "" : "lineClamp3"}`}>
                    {r.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="text-sm font-medium text-[#D7665A] underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
          >
            {expanded ? "See less" : "See more"}
          </button>
        </div>
      </div>

      {/* actions always under reviews on every screen */}
      <div className="mt-4 rounded-xl border border-black/5 bg-white p-4 shadow-sm sm:p-5">
        <button
          type="button"
          onClick={onChat}
          className="flex h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-[#D7665A] px-4 text-sm font-semibold text-white shadow-sm hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 sm:h-13"
        >
          <Icon name="chat" size={18} className="shrink-0" ariaLabel="Chat" />
          Chat with Owner
        </button>

        <button
          type="button"
          onClick={onBook}
          className="mt-3 flex h-12 w-full items-center justify-center gap-2.5 rounded-xl border-2 border-[#D7665A] bg-white px-4 text-sm font-semibold text-[#D7665A] shadow-sm hover:bg-[#FAF1EF] focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 sm:h-13"
        >
          <Icon name="book" size={18} className="shrink-0" ariaLabel="Book viewing" />
          Book Viewing
        </button>

        <div className="mt-3 text-center text-xs leading-5 text-slate-500">
          Response rate: {agent.responseRate} • Avg. response: {agent.avgResponse}
        </div>
      </div>
    </aside>
  );
}