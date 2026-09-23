import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import living from "@/assets/interior-living.jpg";
import bedroom from "@/assets/room-bedroom.jpg";
import kitchen from "@/assets/interior-kitchen.jpg";
import balcony from "@/assets/room-balcony.jpg";
import bedroomStorage from "@/assets/montvue-bedroom-storage.jpg.asset.json";

const ROOMS = [
  {
    key: "living",
    src: living,
    label: "Living Room",
    note: "Full-height glazing frames the ridge",
    alt: "Living room of a Mont Vue residence with a full-height window facing the Dhauladhar range",
  },
  {
    key: "kitchen",
    src: kitchen,
    label: "Kitchen",
    note: "Modular fittings, built-in oven",
    alt: "Fitted modular kitchen with built-in appliances and a valley-facing window",
  },
  {
    key: "bedroom",
    src: bedroom,
    label: "Master Bedroom",
    note: "Wake to the snow line",
    alt: "Master bedroom with a picture window looking on to pine forest and snow-capped peaks",
  },
  {
    key: "balcony",
    src: balcony,
    label: "Balcony",
    note: "The view you actually live with",
    alt: "View from a Mont Vue balcony over deodar forest to the Dhauladhar range",
  },
  {
    key: "bedroom-details",
    src: bedroomStorage.url,
    label: "Bedroom Details",
    note: "Storage designed into the room",
    alt: "Bedroom with a built-in timber and frosted-glass wardrobe",
  },
] as const;

export function StepInside() {
  const [active, setActive] = useState(0);
  const room = ROOMS[active]!;

  return (
    <section id="step-inside" className="relative bg-charcoal-deep">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <p className="eyebrow">Step Inside</p>
        <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1.05] font-medium text-sand sm:text-5xl">
          Walk Through the <span className="text-brass-light italic">Home.</span>
        </h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed font-light text-sand/60">
          Move room to room — living, kitchen, bedroom and balcony — with a closer look at the interior details.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_18rem]">
          {/* Viewer */}
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-charcoal">
            <AnimatePresence mode="sync">
              <motion.img
                key={room.key}
                src={room.src}
                alt={room.alt}
                loading="eager"
                decoding="async"
                initial={{ opacity: 0, scale: 1.12 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-deep/80 via-transparent to-charcoal-deep/25" />

            <motion.div
              key={`${room.key}-cap`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-4 bottom-4 left-4 sm:right-auto sm:bottom-6 sm:left-6"
            >
              <div className="glass-chip px-5 py-4">
                <p className="text-[0.55rem] font-semibold tracking-[0.32em] text-sand/70 uppercase">
                  {room.label}
                </p>
                <p className="mt-1.5 font-display text-2xl font-medium text-brass-light">
                  {room.note}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Room rail */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-1">
            {ROOMS.map((r, i) => (
              <button
                key={r.key}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={`group relative overflow-hidden rounded-sm border text-left transition-colors duration-500 ${
                  i === active ? "border-brass/70" : "border-sand/10 hover:border-sand/30"
                }`}
              >
                <img
                  src={r.src}
                  alt=""
                  aria-hidden
                  loading="eager"
                  decoding="async"
                  className={`h-20 w-full object-cover transition-all duration-700 lg:h-[4.5rem] ${
                    i === active ? "scale-105 opacity-90" : "opacity-45 group-hover:opacity-75"
                  }`}
                />
                <span className="absolute inset-0 bg-charcoal-deep/45" />
                <span className="absolute bottom-2 left-3 text-[0.5rem] font-semibold tracking-[0.26em] text-sand uppercase">
                  {r.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
