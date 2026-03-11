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
    <section className="relative isolate w-full overflow-hidden">
      <img
        src={IMG.hero.home}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
        draggable={false}
      />

      <div className="absolute inset-0 bg-black/45" />

      <div className="relative mx-auto flex min-h-[560px] max-w-6xl flex-col items-center justify-center px-4 pb-10 pt-24 text-center sm:min-h-[620px] sm:px-6 md:min-h-[700px] md:px-8">
        <h1 className="max-w-[300px] text-[38px] font-extrabold leading-[0.95] tracking-tight text-white sm:max-w-[540px] sm:text-[54px] md:max-w-[760px] md:text-[64px]">
          {hero.title}
        </h1>

        <p className="mt-4 max-w-[320px] text-[15px] leading-7 text-white/85 sm:max-w-2xl sm:text-[16px] md:mt-5">
          {hero.subtitle}
        </p>

        <div className="mt-8 w-full max-w-[360px] rounded-[22px] bg-white/95 p-2 shadow-[0_12px_30px_rgba(0,0,0,0.18)] sm:mt-10 sm:max-w-[720px] md:max-w-4xl">
          {/* Mobile */}
          <div className="md:hidden">
            <div className="flex items-center rounded-[16px] bg-white px-4 py-3.5">
              <IconPin className="h-5 w-5 shrink-0" />
              <input
                value={locationValue}
                onChange={(e) => setLocationValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full min-w-0 bg-transparent pl-3 text-[14px] text-slate-900 placeholder:text-[13px] placeholder:text-slate-400 outline-none sm:placeholder:text-[14px]"
                placeholder={hero.placeholders.location}
              />
            </div>

            <div className="mt-2 flex items-center rounded-[16px] bg-white px-4 py-3.5">
              <input
                value={priceValue}
                onChange={(e) => setPriceValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent text-[14px] text-slate-900 placeholder:text-slate-400 outline-none"
                placeholder={hero.placeholders.price}
              />
            </div>

            <button
              type="button"
              onClick={goToSearch}
              className="mt-2 inline-flex h-[50px] w-full items-center justify-center rounded-[16px] bg-[#D66557] px-6 text-[14px] font-semibold text-white shadow-sm transition hover:brightness-95"
            >
              {hero.cta.search}
            </button>
          </div>

          {/* Tablet / Desktop */}
          <div className="hidden items-center md:flex">
            <div className="flex flex-1 items-center gap-3 rounded-[16px] bg-white px-5 py-4">
              <IconPin className="h-5 w-5 shrink-0" />
              <input
                value={locationValue}
                onChange={(e) => setLocationValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
                placeholder={hero.placeholders.location}
              />
            </div>

            <div className="mx-3 h-10 w-px bg-slate-200" />

            <div className="flex flex-1 items-center rounded-2xl bg-white px-5 py-4">
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
              className="ml-3 min-w-32 rounded-2xl bg-[#D66557] px-10 py-4 text-sm font-semibold text-white shadow-sm transition hover:brightness-95"
            >
              {hero.cta.search}
            </button>
          </div>
        </div>

        <div className="mt-6 flex max-w-85 flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[13px] font-medium text-white/85 sm:max-w-none sm:gap-x-10 sm:text-[14px]">
          {hero.trust.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}