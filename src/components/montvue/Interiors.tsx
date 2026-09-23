import { motion } from "motion/react";
import interiorLiving from "@/assets/interior-living.jpg";
import interiorBedroom from "@/assets/room-bedroom.jpg";
import interiorKitchen from "@/assets/interior-kitchen.jpg";

const IMAGES = [
  { src: interiorLiving, caption: "Living room" },
  { src: interiorKitchen, caption: "Kitchen" },
  { src: interiorBedroom, caption: "Bedroom" },
];

export function Interiors() {
  return (
    <section id="interiors" className="bg-charcoal">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-36">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-end justify-between gap-6"
        >
          <div>
            <p className="eyebrow">Interiors</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] font-medium text-sand sm:text-5xl">
              Refined, <span className="text-brass-light italic">Quietly.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed font-light text-sand/55">
            Warm stone, walnut and brass — interiors composed by a South Delhi
            builder with an eye for restraint.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {IMAGES.map((image, i) => (
            <motion.figure
              key={image.caption}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: (i % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden ${
                i === 0 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <img
                src={image.src}
                alt={`Interior visualisation — ${image.caption}`}
                loading="eager"
                decoding="async"
                className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/70 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
              <figcaption className="absolute bottom-5 left-5 flex items-center gap-3">
                <span className="h-px w-6 bg-brass" />
                <span className="text-[0.6rem] font-semibold tracking-[0.32em] text-sand uppercase">
                  {image.caption}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
