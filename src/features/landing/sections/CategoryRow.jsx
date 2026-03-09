import { useNavigate } from "react-router-dom";
import { IMG } from "../../../config/images";
import { ROUTES } from "../../../config/routes";
import Container from "../../../shared/ui/Container";

const CATS = [
  { key: "buy", label: "Buy", icon: IMG.categories.buy, filters: { purpose: "buy" } },
  { key: "rent", label: "Rent", icon: IMG.categories.rent, filters: { purpose: "rent" } },
  { key: "land", label: "Land", icon: IMG.categories.land, filters: { propertyType: "land" } },
  {
    key: "commercial",
    label: "Commercial",
    icon: IMG.categories.commercial,
    filters: { propertyType: "commercial" },
  },
  {
    key: "shortStay",
    label: "Short-Stay",
    icon: IMG.categories.shortStay,
    filters: { purpose: "short-stay" },
  },
];

export default function CategoryRow() {
  const navigate = useNavigate();

  const handleCategoryClick = (filters) => {
    const params = new URLSearchParams(filters);
    navigate(`${ROUTES.search}?${params.toString()}`);
  };

  return (
    <Container>
      <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:grid-cols-5">
        {CATS.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => handleCategoryClick(c.filters)}
            className="group flex flex-col items-center"
          >
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-slate-50 transition group-hover:bg-slate-100">
              <img src={c.icon} alt={c.label} className="h-9 w-9" loading="lazy" />
            </div>
            <p className="mt-3 text-sm font-medium text-slate-800 transition group-hover:text-[#D66557]">
              {c.label}
            </p>
          </button>
        ))}
      </div>

      <div className="mt-10 h-px w-full bg-slate-200/80" />
    </Container>
  );
}