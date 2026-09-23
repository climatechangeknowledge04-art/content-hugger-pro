import { useState } from "react";
import { motion } from "motion/react";
import stadiumAsset from "@/assets/hpca-stadium.png.asset.json";
import peakAsset from "@/assets/dhauladhar-peak.jpg.asset.json";
import valleyAsset from "@/assets/dharamshala-valley.jpg.asset.json";
import school from "@/assets/nb-school.jpg";
import market from "@/assets/nb-market.jpg";
import hospitalAsset from "@/assets/zonal-hospital-dharamshala.png.asset.json";

const PLACES = [
  {
    key: "stadium",
    src: stadiumAsset.url,
    label: "HPCA Stadium",
    dist: "~10 min",
    note: "International cricket with the snow line behind the pavilion.",
    alt: "HPCA cricket stadium in Dharamshala with the Himalayan range behind",
  },
  {
    key: "peaks",
    src: peakAsset.url,
    label: "Dhauladhar Peaks",
    dist: "Your window",
    note: "Zoom in on the ridge — snow-bound for most of the year.",
    alt: "Close view of a snow-capped Dhauladhar peak",
  },
  {
    key: "valley",
    src: valleyAsset.url,
    label: "Kangra Valley",
    dist: "Below you",
    note: "Deodar forest, terraced fields and the valley opening south.",
    alt: "View across the Kangra valley from Dharamshala",
  },
  {
    key: "school",
    src: school,
    label: "Schools",
    dist: "5–15 min",
    note: "Established hill-town schools within a short drive.",
    alt: "Hill-town school campus with playground and Himalayan range behind",
  },
  {
    key: "market",
    src: market,
    label: "Markets",
    dist: "~7 min",
    note: "Daily market, produce, cafés and the Kotwali Bazaar stretch.",
    alt: "Dharamshala market street with shops, produce stalls and mountains behind",
  },
  {
    key: "town",
    src: hospitalAsset.url,
    label: "Zonal Hospital",
    dist: "~12 min",
    note: "Dharamshala's government zonal hospital and emergency care.",
    alt: "Zonal Hospital Dharamshala building and emergency entrance",
  },
] as const;

export function Neighbourhood() {
  const [zoomed, setZoomed] = useState<string | null>(null);

  return (
    <section id="neighbourhood" className="relative bg-charcoal">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">The Neighbourhood</p>
            <h2 className="mt-4 max-w-xl font-display text-4xl leading-[1.05] font-medium text-sand sm:text-5xl">
              Zoom In on <span className="text-brass-light italic">What's Around.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed font-light text-sand/55">
            Tap any frame to zoom — the stadium, the ridge, the valley, schools and markets, all
            within minutes of the gate.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PLACES.map((p, i) => {
            const isZoom = zoomed === p.key;
            return (
              <motion.button
                key={p.key}
                type="button"
                onClick={() => setZoomed(isZoom ? null : p.key)}
                aria-pressed={isZoom}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-sm text-left"
              >
                <motion.img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  decoding="async"
                  animate={{ scale: isZoom ? 1.55 : 1 }}
                  whileHover={{ scale: isZoom ? 1.55 : 1.07 }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  className="aspect-[4/3] w-full object-cover"
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-deep/85 via-charcoal-deep/10 to-transparent" />

                <span className="absolute top-3 right-3">
                  <span className="glass-chip block px-3 py-1.5 text-[0.5rem] font-semibold tracking-[0.26em] text-brass-light uppercase">
                    {isZoom ? "Zoomed" : "Zoom"}
                  </span>
                </span>

                <span className="absolute inset-x-3 bottom-3">
                  <span className="glass-chip block px-4 py-3">
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="text-[0.55rem] font-semibold tracking-[0.28em] text-sand uppercase">
                        {p.label}
                      </span>
                      <span className="font-display text-sm text-brass-light">{p.dist}</span>
                    </span>
                    <motion.span
                      animate={{ opacity: isZoom ? 1 : 0, height: isZoom ? "auto" : 0 }}
                      className="block overflow-hidden text-[0.68rem] leading-relaxed font-light text-sand/70"
                    >
                      <span className="mt-2 block">{p.note}</span>
                    </motion.span>
                  </span>
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
