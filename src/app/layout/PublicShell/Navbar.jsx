import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IMG } from "../../../config/images";
import { NAV_LINKS } from "../../../config/siteContent";
import Container from "../../../shared/ui/Container";
import IconButton from "../../../shared/ui/IconButton";
import MobileNavDrawer from "./MobileNavDrawer";
import { useUI } from "../../../shared/ui/UIProvider";

function TopBar() {
  return (
    <div className="bg-[#D66557] text-white">
      <Container className="flex h-10 items-center justify-end gap-6 text-[12px]">
        <span className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
            <path
              d="M7 3h3l2 5-2 1c1 3 3 5 6 6l1-2 5 2v3c0 1-1 2-2 2-9 0-16-7-16-16 0-1 1-2 2-2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-medium">+31 (0) 12 345 6789</span>
        </span>

        <span className="flex items-center">
          <img
            src={IMG.brand.flagUK}
            alt="UK"
            className="h-4 w-6 rounded-[3px] object-cover"
            draggable={false}
          />
        </span>

        <span className="flex items-center gap-2 rounded-full border border-white/70 px-5 py-[6px] leading-none">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
            <path
              d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path d="M3 12h18" stroke="currentColor" strokeWidth="2" />
            <path
              d="M12 3c2.5 2.8 2.5 15.2 0 18-2.5-2.8-2.5-15.2 0-18Z"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <span className="font-medium">EN</span>
        </span>
      </Container>
    </div>
  );
}

function CompactHeader({ openAuth }) {
  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="border-b border-black/5">
        <Container className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={IMG.brand.logoFull} alt="Real Estate" className="h-9 w-auto" draggable={false} />
          </Link>

          <button onClick={openAuth} className="text-sm font-semibold text-[#D66557]">
            Login <span className="text-slate-400">/</span> Signup
          </button>
        </Container>
      </div>
    </header>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { openAuth } = useUI();
  const { pathname } = useLocation();

  const isCompact = pathname.startsWith("/search") || pathname.startsWith("/listing");

  if (isCompact) {
    return <CompactHeader openAuth={openAuth} />;
  }

  return (
    <header className="sticky top-0 z-50 bg-white">
      <TopBar />

      <div className="border-b border-black/5">
        <Container className="flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={IMG.brand.logoFull} alt="Real Estate" className="h-9 w-auto" draggable={false} />
          </Link>

          {/* Menus ab static rahenge, search page par navigate nahi karenge */}
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
            {NAV_LINKS.map((l) => (
              <span
                key={l.label}
                className="cursor-default text-sm font-medium text-slate-700"
              >
                {l.label}
              </span>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={openAuth} className="hidden text-sm font-semibold text-[#D66557] md:inline">
              Login <span className="text-slate-400">/</span> Signup
            </button>

            <IconButton onClick={() => setOpen(true)} className="md:hidden" ariaLabel="Open menu">
              ☰
            </IconButton>
          </div>
        </Container>
      </div>

      <MobileNavDrawer open={open} onClose={() => setOpen(false)} />
    </header>
  );
}