import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../config/routes";
import { SITE } from "../../../config/siteContent";
import ListingCard from "./components/ListingCard";

function slugifyTitle(value) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function ListingRow({ title, subtitle, items }) {
  const navigate = useNavigate();

  const handleViewAll = () => {
    const params = new URLSearchParams({
      section: slugifyTitle(title),
    });

    navigate(`${ROUTES.search}?${params.toString()}`);
  };

  return (
    <div>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-[30px] font-bold text-[#D66557]">{title}</h2>
          {subtitle && <p className="mt-1 text-[16px] text-slate-400">{subtitle}</p>}
        </div>

        <button
          type="button"
          onClick={handleViewAll}
          className="shrink-0 text-[16px] font-semibold text-[#D66557]"
        >
          {SITE.listing.viewAll}
        </button>
      </div>

      <div className="-mx-4 flex overflow-x-auto px-4 pb-2 md:mx-0 md:overflow-visible md:px-0">
        <div className="flex gap-5 md:grid md:w-full md:[grid-template-columns:repeat(4,minmax(0,260px))] md:justify-between">
          {items.map((it) => (
            <ListingCard
              key={it.id}
              item={it}
              onDetails={() => navigate(ROUTES.listing(it.id))}
              onToggleFavorite={() => console.log("fav:", it.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}