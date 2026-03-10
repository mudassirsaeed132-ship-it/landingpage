import Icon from "../../../shared/ui/Icons";

export default function StickyActions({ agent, onChat, onBook }) {
  if (!agent) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-white via-white/95 to-transparent" />

      <div className="pointer-events-auto mx-auto w-full max-w-3xl px-3 pb-[max(12px,env(safe-area-inset-bottom))] sm:px-4">
        <div className="rounded-t-2xl border border-black/10 border-b-0 bg-white/95 p-3 shadow-[0_-10px_30px_rgba(15,23,42,0.08)] backdrop-blur sm:p-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={onChat}
              className="flex h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-[#D7665A] px-4 text-sm font-semibold text-white shadow-sm hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
            >
              <Icon name="chat" size={18} className="shrink-0" ariaLabel="Chat" />
              Chat with Owner
            </button>

            <button
              type="button"
              onClick={onBook}
              className="flex h-12 w-full items-center justify-center gap-2.5 rounded-xl border-2 border-[#D7665A] bg-white px-4 text-sm font-semibold text-[#D7665A] shadow-sm hover:bg-[#FAF1EF] focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
            >
              <Icon name="book" size={18} className="shrink-0" ariaLabel="Book viewing" />
              Book Viewing
            </button>
          </div>

          <div className="mt-3 text-center text-[11px] leading-5 text-slate-500 sm:text-xs">
            Response rate: {agent.responseRate} • Avg. response: {agent.avgResponse}
          </div>
        </div>
      </div>
    </div>
  );
}