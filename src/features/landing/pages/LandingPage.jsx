import HeroSection from "../sections/HeroSection";
import CategoryRow from "../sections/CategoryRow";
import PrecheckBanner from "../sections/PrecheckBanner";
import ListingRow from "../sections/ListingRow";
import { landingSections } from "../data/landing.mock";
import Container from "../../../shared/ui/Container";

export default function LandingPage() {
  return (
    <main className="bg-white">
      {/* HERO */}
      <HeroSection />

      {/* Categories row (with divider inside CategoryRow) */}
      <section className="pt-12 pb-4 md:pt-14 md:pb-6">
        <CategoryRow />
      </section>

      {/* New this week */}
      <section className="pt-6 pb-12 md:pt-8 md:pb-14">
        <Container>
          <ListingRow
            title={landingSections[0].title}
            subtitle={landingSections[0].subtitle}
            items={landingSections[0].items}
          />
        </Container>
      </section>

      {/* Precheck banner */}
      <section className="my-10 md:my-12">
        <PrecheckBanner />
      </section>

      {/* Remaining rows (bigger gaps like screenshot) */}
      <section className="py-12 md:py-14">
        <Container className="space-y-16 md:space-y-20">
          {landingSections.slice(1).map((s) => (
            <ListingRow
              key={s.key}
              title={s.title}
              subtitle={s.subtitle}
              items={s.items}
            />
          ))}
        </Container>
      </section>
    </main>
  );
}