import Container from "../../../shared/ui/Container";
import { FOOTER_LINKS } from "../../../config/siteContent";
import { IMG } from "../../../config/images";

const SOCIAL_ICONS = [
  {
    key: "x",
    label: "X",
    src: "/images/ui/social/x.svg",
  },
  {
    key: "facebook",
    label: "Facebook",
    src: "/images/ui/social/facebook.svg",
  },
  {
    key: "youtube",
    label: "YouTube",
    src: "/images/ui/social/youtube.svg",
  },
  {
    key: "instagram",
    label: "Instagram",
    src: "/images/ui/social/instagram.svg",
  },
];

export default function Footer() {
  return (
    <footer>
      <section className="bg-[#F7E3E0] py-12">
        <Container>
          {/* download strip */}
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-3">
            <div>
              <p className="text-[18px] font-semibold leading-[1.3] text-[#D66557]">
                Find amazing deals on the go.
              </p>

              <h3 className="mt-3 text-[24px] font-semibold leading-[1.25] text-slate-900">
                Download Real estate app now!
              </h3>
            </div>

            <div className="flex justify-center">
              <img
                src={IMG.ui.appMock}
                alt="App mock"
                className="h-44 w-auto md:h-52"
                loading="lazy"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 md:justify-end">
              <img
                src={IMG.ui.googlePlay}
                alt="Google Play"
                className="h-12 w-auto"
                loading="lazy"
              />
              <img
                src={IMG.ui.appGallery}
                alt="AppGallery"
                className="h-12 w-auto"
                loading="lazy"
              />
            </div>
          </div>

          {/* links */}
          <div className="mt-14 grid grid-cols-2 gap-10 md:grid-cols-5">
            {FOOTER_LINKS.map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold text-[#D66557]">{col.title}</h4>
                <ul className="mt-4 space-y-3 text-sm text-[#D66557]">
                  {col.links.map((t) => (
                    <li key={t} className="cursor-pointer hover:opacity-80">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* socials */}
            <div className="col-span-2 md:col-span-1 md:justify-self-end">
              <h4 className="text-sm font-semibold text-[#D66557]">Follow Us</h4>

              <div className="mt-4 flex items-center gap-4">
                {SOCIAL_ICONS.map((icon) => (
                  <button
                    key={icon.key}
                    type="button"
                    aria-label={icon.label}
                    className="grid h-12 w-12 place-items-center rounded-full border border-black bg-transparent transition hover:opacity-80"
                  >
                    <img
                      src={icon.src}
                      alt={icon.label}
                      className="h-5 w-5 object-contain"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <div className="bg-[#D66557] py-6 text-white">
        <Container className="flex justify-end text-sm">
          © Real estate Copyrights
        </Container>
      </div>
    </footer>
  );
}