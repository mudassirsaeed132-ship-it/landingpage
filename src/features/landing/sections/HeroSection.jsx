import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMG } from "../../../config/images";
import { SITE } from "../../../config/siteContent";
import { ROUTES } from "../../../config/routes";

function IconPin({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M12 21s7-6.2 7-12A7 7 0 0 0 5 9c0 5.8 7 12 7 12Z"
        stroke="#D66557"
        strokeWidth="2.2"
      />
      <circle cx="12" cy="9" r="2.2" stroke="#D66557" strokeWidth="2.2" />
    </svg>
  );
}

export default function HeroSection() {
  const { hero } = SITE;
  const navigate = useNavigate();

  const [locationValue, setLocationValue] = useState("");
  const [priceValue, setPriceValue] = useState("");

  const goToSearch = () => {
    const params = new URLSearchParams();

    if (locationValue.trim()) {
      params.set("location", locationValue.trim());
    }

    if (priceValue.trim()) {
      params.set("price", priceValue.trim());
    }

    const query = params.toString();
    navigate(query ? `${ROUTES.search}?${query}` : ROUTES.search);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      goToSearch();
    }
  };

  return (
    <section
      className="relative w-full bg-no-repeat"
      style={{
        backgroundImage: `url(${IMG.hero.home})`,
        backgroundSize: "110%",
        backgroundPosition: "center 55%",
      }}
    >
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative mx-auto flex min-h-160 max-w-6xl flex-col items-center justify-center px-4 text-center">
        <h1 className="text-[56px] font-extrabold leading-[1.05] tracking-tight text-white">
          {hero.title}
        </h1>

        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-white/85">
          {hero.subtitle}
        </p>

        <div className="mt-10 w-full max-w-4xl rounded-[18px] bg-white/95 p-2 shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
          <div className="flex items-center">
            <div className="flex flex-1 items-center gap-3 rounded-[14px] bg-white px-4 py-3">
              <IconPin className="h-5 w-5 shrink-0" />
              <input
                value={locationValue}
                onChange={(e) => setLocationValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
                placeholder={hero.placeholders.location}
              />
            </div>

            <div className="mx-3 hidden h-9 w-px bg-slate-200 md:block" />

            <div className="hidden flex-1 items-center rounded-[14px] bg-white px-4 py-3 md:flex">
              <input
                value={priceValue}
                onChange={(e) => setPriceValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent text-center text-sm text-slate-900 placeholder:text-slate-400 outline-none"
                placeholder={hero.placeholders.price}
              />
            </div>

            <button
              type="button"
              onClick={goToSearch}
              className="ml-3 rounded-[14px] bg-[#D66557] px-10 py-3 text-sm font-semibold text-white"
            >
              {hero.cta.search}
            </button>
          </div>

          <div className="mt-2 md:hidden">
            <div className="flex items-center rounded-[14px] bg-white px-4 py-3">
              <input
                value={priceValue}
                onChange={(e) => setPriceValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
                placeholder={hero.placeholders.price}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-10 text-[14px] font-medium text-white/85">
          {hero.trust.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}