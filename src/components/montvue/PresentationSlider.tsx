import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import exteriorAsset from "@/assets/dhauladhar-panorama.jpg.asset.json";
import living from "@/assets/interior-living.jpg";
import kitchen from "@/assets/interior-kitchen.jpg";
import bedroom from "@/assets/room-bedroom.jpg";
import balcony from "@/assets/room-balcony.jpg";
import stadium from "@/assets/story-stadium.jpg";
import interiorDetail from "@/assets/montvue-kitchen-glazing.jpg.asset.json";
import dhauladharAsset from "@/assets/dhauladhar-peaks.jpg.asset.json";

const dhauladhars = dhauladharAsset.url;
const exterior = exteriorAsset.url;

const SLIDES = [
  {
    key: "residence",
    src: exterior,
    eyebrow: "The Residence",
    title: "Three floors, one ridge.",
    text: "A single building of three private 3 BHK floors, set into the slope above Dharamshala.",
    chips: ["1,400 sq ft", "Three private floors"],
    alt: "The Dhauladhar range at dusk above Dharamshala",
  },
  {
    key: "living",
    src: living,
    eyebrow: "The Living Room",
    title: "Light, all day.",
    text: "A long, uninterrupted living and dining run finished in soft neutrals with valley-facing glazing.",
    chips: ["Expansive frontage", "Full-height windows"],
    alt: "Living and dining room of a Mont Vue residence in warm neutral tones",
  },
  {
    key: "kitchen",
    src: kitchen,
    eyebrow: "The Kitchen",
    title: "Cook with a view.",
    text: "A fitted modular kitchen with built-in oven, utility access and a window that opens on to the hills.",
    chips: ["Modular fittings", "Utility balcony"],
    alt: "Fitted modular kitchen with built-in appliances and a hill-facing window",
  },
  {
    key: "bedroom",
    src: bedroom,
    eyebrow: "The Bedroom",
    title: "Wake to the snow line.",
    text: "Three bedrooms, each with its own wardrobe wall and a window framing the ridge.",
    chips: ["3 bedrooms", "En-suite bath"],
    alt: "Bedroom of a Mont Vue residence with a large window and soft daylight",
  },
  {
    key: "balcony",
    src: balcony,
    eyebrow: "The Balcony",
    title: "Your own front row.",
    text: "Glass-railed balconies with deodar in the foreground and the Dhauladhars filling the frame.",
    chips: ["Every floor", "Planter garden"],
    alt: "Balcony with glass railing looking over deodar forest to snow-capped peaks",
  },
  {
    key: "interior-detail",
    src: interiorDetail.url,
    eyebrow: "Interiors",
    title: "Space to make your own.",
    text: "Thoughtful materials, generous daylight and room to settle into the mountains.",
    chips: ["Considered finishes", "Natural light"],
    alt: "Kitchen behind black-framed glass doors with bright natural light",
  },
  {
    key: "peaks",
    src: dhauladhars,
    eyebrow: "The Setting",
    title: "Come find your quiet.",
    text: "Snow-bound peaks for most of the year, a short walk from town and everything you need.",
    chips: ["Possession Feb 2027", "From INR 1.00 Cr"],
    alt: "Golden light on the snow-capped Dhauladhar range above deodar forest",
  },
] as const;

export function PresentationSlider() {
  const [index, setIndex] = useState(0);
  const n = SLIDES.length;

  const go = useCallback((dir: number) => setIndex((i) => (i + dir + n) % n), [n]);

  /* 3s of still image per slide + the crossfade on top, so captions stay readable */
  useEffect(() => {
    const t = window.setInterval(() => setIndex((i) => (i + 1) % n), 3700);
    return () => window.clearInterval(t);
  }, [n]);

  const slide = SLIDES[index]!;

  return (
    <section
      id="presentation"
      className="relative h-[88svh] min-h-[34rem] overflow-hidden bg-charcoal-deep"
      aria-label="Photo presentation of the residence"
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={slide.key}
          src={slide.src}
          alt={slide.alt}
          loading="eager"
          decoding="async"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-charcoal-deep/90 via-charcoal-deep/35 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/85 via-transparent to-charcoal-deep/45" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-24 lg:px-10 lg:pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.key}
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl"
          >
            <p className="text-[0.6rem] font-medium tracking-[0.4em] text-sand/55">
              {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </p>
            <p className="eyebrow mt-4">{slide.eyebrow}</p>
            <h2 className="mt-3 font-display text-4xl leading-[1.02] font-medium text-sand sm:text-6xl">
              {slide.title}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed font-light text-sand/75">
              {slide.text}
            </p>
            <ul className="mt-6 flex flex-wrap gap-3">
              {slide.chips.map((c) => (
                <li
                  key={c}
                  className="glass-chip px-4 py-2 text-[0.55rem] font-semibold tracking-[0.28em] text-sand/85 uppercase"
                >
                  {c}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="absolute right-6 bottom-24 z-20 flex gap-2 lg:right-10 lg:bottom-28">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous photo"
          className="glass-chip flex h-11 w-11 items-center justify-center text-sand/80 transition-colors hover:text-brass-light"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next photo"
          className="glass-chip flex h-11 w-11 items-center justify-center text-sand/80 transition-colors hover:text-brass-light"
        >
          <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>

      {/* Segment rail */}
      <div className="absolute inset-x-6 bottom-10 z-20 flex gap-2 lg:inset-x-10">
        {SLIDES.map((s, i) => (
          <button
            key={s.key}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show ${s.eyebrow}`}
            aria-current={i === index}
            className="group h-6 flex-1"
          >
            <span
              className={`block h-px w-full transition-all duration-500 ${
                i === index ? "bg-brass" : "bg-sand/25 group-hover:bg-sand/50"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
