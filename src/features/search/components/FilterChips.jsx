import React, { useEffect, useRef, useState } from "react";

function ChevronDown({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function useOutsideClose(onClose) {
  const ref = useRef(null);

  useEffect(() => {
    function handlePointerDown(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose?.();
    }

    function handleScroll() {
      onClose?.();
    }

    document.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleScroll);
    };
  }, [onClose]);

  return ref;
}

function ChipButton({ active, label, accent, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex h-10 items-center gap-2 rounded-full px-5 whitespace-nowrap border text-[13px] font-medium transition",
        active
          ? "border-transparent text-white"
          : "border-[#D8DEE7] bg-white text-slate-700 hover:bg-slate-50",
      ].join(" ")}
      style={active ? { backgroundColor: accent, borderColor: accent } : undefined}
    >
      <span>{label}</span>
      <ChevronDown className={["h-4 w-4", active ? "text-white" : "text-slate-500"].join(" ")} />
    </button>
  );
}

function Dropdown({ open, options, value, onSelect, accent }) {
  if (!open) return null;

  return (
    <div className="absolute left-0 top-12 z-[80] min-w-[176px] overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
      {options.map((o) => (
        <button
          key={o.label}
          type="button"
          onClick={() => onSelect(o.value)}
          className="flex w-full items-center justify-between px-3 py-2.5 text-left text-[13px] font-medium text-slate-700 hover:bg-slate-50"
        >
          <span>{o.label}</span>
          {String(o.value) === String(value) ? (
            <span className="text-[11px]" style={{ color: accent }}>
              ✓
            </span>
          ) : null}
        </button>
      ))}
    </div>
  );
}

export default function FilterChips({ accent = "#D66557", value, onChange }) {
  const [openId, setOpenId] = useState(null);
  const wrapRef = useOutsideClose(() => setOpenId(null));

  const purposeLabel = value.purpose === "rent" ? "For Rent" : "For Sale";
  const roomsLabel = value.roomsMin <= 1 ? "Single room" : `${value.roomsMin}+ rooms`;
  const bathsLabel = `${value.bathsMin} bathroom`;
  const balconyLabel = value.balcony ? "Balcony" : "No Balcony";

  const chips = [
    {
      id: "purpose",
      active: true,
      label: purposeLabel,
      value: value.purpose,
      options: [
        { label: "For Sale", value: "sale" },
        { label: "For Rent", value: "rent" },
      ],
      apply: (v) => onChange({ purpose: v }),
    },
    {
      id: "new",
      active: false,
      label: "New",
      value: value.isNew,
      options: [
        { label: "New", value: true },
        { label: "Any", value: false },
      ],
      apply: (v) => onChange({ isNew: v }),
    },
    {
      id: "rooms",
      active: false,
      label: roomsLabel,
      value: value.roomsMin,
      options: [
        { label: "Single room", value: 1 },
        { label: "2 rooms", value: 2 },
        { label: "3 rooms", value: 3 },
        { label: "4+ rooms", value: 4 },
      ],
      apply: (v) => onChange({ roomsMin: v }),
    },
    {
      id: "baths",
      active: false,
      label: bathsLabel,
      value: value.bathsMin,
      options: [
        { label: "1 bathroom", value: 1 },
        { label: "2 bathrooms", value: 2 },
        { label: "3 bathrooms", value: 3 },
      ],
      apply: (v) => onChange({ bathsMin: v }),
    },
    {
      id: "balcony",
      active: false,
      label: balconyLabel,
      value: value.balcony,
      options: [
        { label: "No Balcony", value: false },
        { label: "Balcony", value: true },
      ],
      apply: (v) => onChange({ balcony: v }),
    },
  ];

  return (
    <div ref={wrapRef} className="relative z-[50]">
      <div className="flex flex-wrap items-center gap-3 overflow-visible">
        {chips.map((c) => (
          <div key={c.id} className="relative">
            <ChipButton
              active={c.active}
              label={c.label}
              accent={accent}
              onClick={() => setOpenId((prev) => (prev === c.id ? null : c.id))}
            />
            <Dropdown
              open={openId === c.id}
              options={c.options}
              value={c.value}
              accent={accent}
              onSelect={(v) => {
                c.apply(v);
                setOpenId(null);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}