import React, { createContext, useContext, useMemo, useState } from "react";

function cls(...arr) {
  return arr.filter(Boolean).join(" ");
}

const AccordionCtx = createContext(null);
const ItemCtx = createContext(null);

export default function Accordion({ children, defaultOpenIds = [], allowMultiple = true, className }) {
  const [openIds, setOpenIds] = useState(() => new Set(defaultOpenIds));

  const api = useMemo(() => {
    function isOpen(id) {
      return openIds.has(id);
    }
    function toggle(id) {
      setOpenIds((prev) => {
        const next = new Set(prev);
        const open = next.has(id);

        if (!allowMultiple) next.clear();
        if (open) next.delete(id);
        else next.add(id);

        return next;
      });
    }
    return { isOpen, toggle };
  }, [openIds, allowMultiple]);

  return (
    <AccordionCtx.Provider value={api}>
      <div className={cls("space-y-3", className)}>{children}</div>
    </AccordionCtx.Provider>
  );
}

export function AccordionItem({ id, children, className }) {
  const ctx = useContext(AccordionCtx);
  const open = ctx?.isOpen(id) ?? false;

  const itemApi = useMemo(
    () => ({
      id,
      open,
      toggle: () => ctx?.toggle(id),
    }),
    [id, open, ctx]
  );

  return (
    <ItemCtx.Provider value={itemApi}>
      <div className={cls("rounded-xl border border-slate-200 bg-white", className)}>{children}</div>
    </ItemCtx.Provider>
  );
}

export function AccordionTrigger({ children, className }) {
  const item = useContext(ItemCtx);

  return (
    <button
      type="button"
      onClick={item?.toggle}
      aria-expanded={item?.open ? "true" : "false"}
      className={cls("flex w-full items-center justify-between gap-3 px-4 py-3 text-left", className)}
    >
      <span className="text-sm font-semibold text-slate-900">{children}</span>
      <svg
        viewBox="0 0 24 24"
        className={cls("h-4 w-4 text-slate-500 transition-transform", item?.open ? "rotate-180" : "")}
        aria-hidden="true"
      >
        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    </button>
  );
}

export function AccordionContent({ children, className }) {
  const item = useContext(ItemCtx);

  return (
    <div
      className={cls(
        "grid overflow-hidden transition-[grid-template-rows] duration-200 ease-out",
        item?.open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      )}
    >
      <div className="min-h-0">
        <div className={cls("px-4 pb-4 text-sm leading-6 text-slate-600", className)}>{children}</div>
      </div>
    </div>
  );
}