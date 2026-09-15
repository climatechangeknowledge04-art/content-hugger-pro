import { MessageCircle, Phone } from "lucide-react";
import { waLink } from "@/lib/whatsapp";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-charcoal-deep/85 via-charcoal-deep/40 to-transparent">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <a href="#top" className="group flex flex-col leading-none">
          <span className="font-display text-xl font-medium tracking-[0.32em] text-sand">
            MONT VUE
          </span>
          <span className="mt-1 text-[0.55rem] font-medium tracking-[0.5em] text-brass">
            RESIDENCES
          </span>
        </a>

        <div className="flex items-center gap-6">
          <a
            href="tel:+919911536697"
            className="hidden items-center gap-2 text-xs font-medium tracking-[0.18em] text-sand/80 transition-colors hover:text-brass-light sm:flex"
          >
            <Phone className="h-3.5 w-3.5 text-brass" strokeWidth={1.5} />
            +91 99115 36697
          </a>
          <a
            href={waLink()}
            target="_top"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 text-xs font-medium tracking-[0.18em] text-sand/80 transition-colors hover:text-brass-light sm:flex"
          >
            <MessageCircle className="h-3.5 w-3.5 text-brass" strokeWidth={1.5} />
            WhatsApp
          </a>
          <a
            href="#viewing"
            className="border border-brass/70 px-5 py-2.5 text-[0.65rem] font-semibold tracking-[0.3em] text-brass-light uppercase transition-all duration-300 hover:bg-brass hover:text-charcoal-deep"
          >
            Book a Viewing
          </a>
        </div>
      </div>
    </header>
  );
}
