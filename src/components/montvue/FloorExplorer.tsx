import { stops } from "@/lib/stops";
import { useCallback, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { BuildingReveal } from "@/components/montvue/BuildingReveal";
import living from "@/assets/interior-living.jpg";
import kitchen from "@/assets/interior-kitchen.jpg";
import bedroom from "@/assets/room-bedroom.jpg";
import balcony from "@/assets/room-balcony-garden.jpg";
import bedroomStorage from "@/assets/montvue-bedroom-storage.jpg.asset.json";
import backdropAsset from "@/assets/dhauladhar-panorama.jpg.asset.json";

const FLOORS = [
  { label: "1st Floor", price: "INR 1.00 Cr" },
  { label: "2nd Floor", price: "INR 1.15 Cr" },
  { label: "3rd Floor", price: "INR 1.25 Cr" },
];

/* The exterior chapter owns the first stretch; the walkthrough takes over after */
const EXTERIOR_END = 0.4;

const ROOMS = [
  {
    src: living,
    eyebrow: "Step 01 · Walkthrough",
    title: "Living Room",
    alt: "Living and dining room of a Mont Vue residence with full-height glazing",
  },
  {
    src: kitchen,
    eyebrow: "Step 02 · Walkthrough",
    title: "Kitchen",
    alt: "Fitted modular kitchen with built-in appliances and a hill-facing window",
  },
  {
    src: bedroom,
    eyebrow: "Step 03 · Walkthrough",
    title: "Master Bedroom",
    alt: "Master bedroom with a large window framing the Dhauladhar ridge",
  },
  {
    src: balcony,
    eyebrow: "Step 04 · Walkthrough",
    title: "The Balcony",
    alt: "Balcony with planters and a glass railing above the deodar forest",
  },
  {
    src: bedroomStorage.url,
    eyebrow: "Step 05 · Interiors",
    title: "Thoughtful Details",
    alt: "Bedroom interior with full-height timber wardrobe and frosted glass doors",
  },
] as const;

const ROOM_START = 0.44;
const ROOM_SEG = (1 - ROOM_START) / ROOMS.length;

function PriceRow({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const floor = FLOORS[index]!;
  /* Each floor lights up as its slab separates, then stays legible */
  const start = 0.05 + index * 0.075;
  const opacity = useTransform(progress, stops(start, start + 0.06), [0.3, 1]);

  return (
    <div className="flex items-baseline justify-between gap-6 py-4 first:pt-0 last:pb-0">
      <motion.p
        style={{ opacity }}
        className="text-[0.6rem] font-semibold tracking-[0.3em] text-sand/75 uppercase"
      >
        {floor.label}
      </motion.p>
      <motion.p
        style={{ opacity }}
        className="font-display text-2xl font-medium tracking-wide whitespace-nowrap text-brass-light"
      >
        {floor.price}
      </motion.p>
    </div>
  );
}

function RoomFrame({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const room = ROOMS[index]!;
  const start = ROOM_START + index * ROOM_SEG;
  const end = start + ROOM_SEG;
  const isLast = index === ROOMS.length - 1;
  const fade = ROOM_SEG * 0.3;

  const opacity = useTransform(
    progress,
    stops(start - fade, start + fade, end - fade, end + fade),
    isLast ? [0, 1, 1, 1] : [0, 1, 1, 0],
  );
  const scale = useTransform(
    progress,
    stops(start - fade, end + fade),
    [1.22, 1.02],
  );

  return (
    <motion.img
      src={room.src}
      alt={room.alt}
      loading="eager"
      decoding="async"
      style={{ opacity, scale }}
      className="absolute inset-0 h-full w-full object-cover will-change-transform"
    />
  );
}

function RoomCaption({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const room = ROOMS[index]!;
  const start = ROOM_START + index * ROOM_SEG;
  const end = start + ROOM_SEG;
  const isLast = index === ROOMS.length - 1;
  const fade = ROOM_SEG * 0.3;

  const opacity = useTransform(
    progress,
    stops(start - fade, start + fade, end - fade, end + fade),
    isLast ? [0, 1, 1, 1] : [0, 1, 1, 0],
  );

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <p className="eyebrow">{room.eyebrow}</p>
      <p className="mt-3 font-display text-3xl leading-[1.05] font-medium text-sand sm:text-4xl">
        {room.title}
      </p>
    </motion.div>
  );
}

export function FloorExplorer() {
  const targetRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  /* The 3D model only plays the exterior reveal, eased so slabs glide apart */
  const read = useCallback(() => {
    const p = Math.min(scrollYProgress.get() / EXTERIOR_END, 1);
    const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
    return eased * 0.3;
  }, [scrollYProgress]);

  /* Coarse phase flip — the exterior layer hides entirely once we walk inside */
  const [inside, setInside] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setInside(v > 0.4);
  });

  return (
    <section
      id="floors"
      ref={targetRef}
      className="relative h-[600vh] bg-charcoal-deep"
      aria-label="Floor-wise pricing and a walkthrough inside the residence"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Real photography walkthrough */}
        <div className="absolute inset-0">
          {ROOMS.map((room, i) => (
            <RoomFrame key={room.title} index={i} progress={scrollYProgress} />
          ))}
          <div className="absolute inset-0 bg-charcoal-deep/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/80 via-transparent to-charcoal-deep/55" />
        </div>

        {/* Exterior model reveal — set against the real Dhauladhar skyline */}
        <div
          aria-hidden={inside}
          className={`absolute inset-0 transition-opacity duration-700 ${
            inside ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <img
            src={backdropAsset.url}
            alt="The Dhauladhar range rising behind Dharamshala"
            className="absolute inset-0 h-full w-full scale-105 object-cover"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-charcoal-deep/45" />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal-deep/75 via-transparent to-charcoal-deep/85" />
          <BuildingReveal progress={scrollYProgress} />
        </div>

        {/* Chapter narration */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 mx-auto max-w-7xl px-6 pt-24 lg:px-10">
          <div className="relative h-32">
            <div
              className={`absolute inset-0 transition-opacity duration-700 ${
                inside ? "opacity-0" : "opacity-100"
              }`}
            >
              <p className="eyebrow">The Building</p>
              <p className="mt-3 font-display text-3xl leading-[1.05] font-medium text-sand sm:text-4xl">
                Three Floors, Separated
              </p>
            </div>
            {ROOMS.map((room, i) => (
              <RoomCaption key={room.title} index={i} progress={scrollYProgress} />
            ))}
          </div>
        </div>

        {/* Prices — one aligned glass ledger, never floating cards */}
        <aside
          className={`glass-panel pointer-events-none absolute inset-x-4 bottom-6 z-10 divide-y divide-sand/10 px-6 py-5 transition-opacity duration-700 sm:inset-x-auto sm:top-1/2 sm:right-8 sm:bottom-auto sm:w-[22rem] sm:-translate-y-1/2 lg:right-14 ${
            inside ? "opacity-0" : "opacity-100"
          }`}
        >
          <p className="pb-4 text-[0.55rem] font-semibold tracking-[0.35em] text-brass uppercase">
            Floor-wise Pricing
          </p>
          {FLOORS.map((floor, i) => (
            <PriceRow key={floor.label} index={i} progress={scrollYProgress} />
          ))}
          <p className="pt-4 text-[0.6rem] font-light tracking-[0.1em] text-sand/45">
            1,400 sq ft · possession Feb 2027
          </p>
        </aside>


        <p className="pointer-events-none absolute inset-x-0 bottom-4 z-10 text-center text-[0.55rem] font-medium tracking-[0.35em] text-sand/40 uppercase">
          Scroll to walk inside
        </p>
      </div>
    </section>
  );
}
