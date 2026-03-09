import Container from "../../../shared/ui/Container";

export default function PrecheckBanner() {
  return (
    <section className="bg-[#D66557]">
      <Container className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between md:py-12">
        <div>
          <h3 className="text-2xl font-extrabold text-white md:text-3xl">
            Know your budget in 3 minutes
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-white/85">
            Get a financing pre-check certificate from our partner banks. Increases your chances of getting the property by 3x.
          </p>
        </div>

        <button className="w-full rounded-full bg-white px-7 py-4 text-sm font-semibold text-[#D66557] md:w-auto">
          Start Pre-check
        </button>
      </Container>
    </section>
  );
}