import { openWhatsApp, waLink } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="border-t border-sand/10 bg-charcoal-deep">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-10 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-2xl font-medium tracking-[0.28em] text-sand">
              MONT VUE
            </p>
            <p className="mt-2 text-[0.55rem] font-medium tracking-[0.5em] text-brass">
              RESIDENCES
            </p>
          </div>
          <div className="text-sm font-light text-sand/60">
            <p>Mont Vue Residences&nbsp;|&nbsp;Dharamshala, Himachal Pradesh</p>
            <a
              href="tel:+919911536697"
              className="mt-2 inline-block text-brass-light transition-colors hover:text-sand"
            >
              +91 99115 36697
            </a>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => {
                event.preventDefault();
                openWhatsApp();
              }}
              className="mt-2 ml-4 inline-block text-brass-light transition-colors hover:text-sand"
            >
              WhatsApp us
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-sand/10 pt-8">
          <p className="max-w-3xl text-[0.65rem] leading-relaxed tracking-wide text-sand/40">
            Images are design visualisations. Prices, possession timeline and AQI
            figures are indicative and subject to confirmation.
          </p>
          <p className="mt-4 text-[0.6rem] tracking-[0.25em] text-sand/30 uppercase">
            © 2026 Mont Vue Residences
          </p>
        </div>
      </div>
    </footer>
  );
}
