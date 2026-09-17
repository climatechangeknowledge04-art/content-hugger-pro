import { MapPin, Navigation } from "lucide-react";
import panorama from "@/assets/dhauladhar-panorama.jpg.asset.json";
import siteMap from "@/assets/site-map.jpg.asset.json";

const LAT = 32.196217;
const LNG = 76.334618;
const MAPS_LINK = `https://maps.google.com/?q=${LAT},${LNG}`;
const DIRECTIONS_LINK = `https://maps.google.com/?daddr=${LAT},${LNG}`;

export function LocationMap() {
  return (
    <section id="location" className="bg-charcoal">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="min-w-0">
            <p className="eyebrow">The Location</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] font-medium text-sand sm:text-5xl">
              Jhikli Dar, <span className="text-brass-light italic">Dharamshala.</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed font-light text-sand/60">
              A quiet ridge above Dharamshala, minutes from town, the stadium and the
              road up to McLeod Ganj.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noreferrer"
              className="glass-chip inline-flex shrink-0 items-center gap-2 px-5 py-3 text-[0.6rem] font-semibold tracking-[0.28em] text-sand uppercase transition-colors hover:text-brass-light"
            >
              <MapPin className="h-3.5 w-3.5" /> Open in Google Maps
            </a>
            <a
              href={DIRECTIONS_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-2 border border-brass/60 px-5 py-3 text-[0.6rem] font-semibold tracking-[0.28em] text-brass-light uppercase transition-colors hover:bg-brass/10"
            >
              <Navigation className="h-3.5 w-3.5" /> Get Directions
            </a>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open the Mont Vue Residences location in Google Maps"
            className="group relative block aspect-[4/3] w-full overflow-hidden rounded-sm border border-sand/10 sm:aspect-[16/10]"
          >
            <img
              src={siteMap.url}
              alt="Satellite map of the Mont Vue Residences site at Jhikli Dar, Dharamshala"
              loading="eager"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <span className="absolute right-5 bottom-5 inline-flex items-center gap-2 bg-charcoal-deep/85 px-4 py-3 text-[0.6rem] font-semibold tracking-[0.22em] text-sand uppercase">
              <MapPin className="h-3.5 w-3.5 text-brass-light" /> View location
            </span>
          </a>

          <figure className="relative aspect-[4/3] w-full overflow-hidden rounded-sm sm:aspect-[16/10]">
            <img
              src={panorama.url}
              alt="The snow-capped Dhauladhar range seen across the forested ridge at Dharamshala"
              loading="eager"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/75 via-transparent to-transparent" />
            <figcaption className="absolute right-5 bottom-5 left-5 text-[0.6rem] font-semibold tracking-[0.28em] text-sand uppercase">
              The view from the ridge
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
