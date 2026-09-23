import { motion } from "motion/react";
import {
  Wind,
  Ruler,
  Trees,
  Trophy,
  Hospital,
  GraduationCap,
  Leaf,
} from "lucide-react";
import exteriorDuskAsset from "@/assets/dhauladhar-peak.jpg.asset.json";

const exteriorDusk = exteriorDuskAsset.url;
import balconyView from "@/assets/room-balcony.jpg";

const STATS = [
  { icon: Ruler, value: "1,400 SQ FT", label: "Spacious 3 BHK" },
  { icon: Wind, value: "AQI ~25", label: "Clean mountain air" },
  { icon: Trophy, value: "HPCA STADIUM", label: "Minutes from home" },
  { icon: Hospital, value: "ZONAL HOSPITAL", label: "~10 min drive" },
  { icon: GraduationCap, value: "TOP SCHOOLS", label: "Within 2–3 km" },
  { icon: Leaf, value: "ECO-CONSCIOUS", label: "Climate-friendly, low footprint" },
];

const rise = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function PropertyIntro() {
  return (
    <section id="residence" className="relative bg-sand text-charcoal">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-36">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            variants={rise}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
          >
            <p className="eyebrow">The Residence</p>
            <h2 className="mt-6 font-display text-4xl leading-[1.05] font-medium sm:text-5xl lg:text-6xl">
              CONTEMPORARY LIVING.
              <br />
              <span className="text-brass-deep italic">HIMALAYAN SOUL.</span>
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed font-light text-charcoal/75">
              A spacious 3 BHK mountain residence with refined interiors by a
              South Delhi builder, exceptional views and quiet surroundings.
            </p>
            <p className="mt-4 max-w-md text-base leading-relaxed font-light text-charcoal/75">
              Possession of the 1st floor from February 2027.
            </p>
            <div className="mt-8 flex items-center gap-3 border-t border-charcoal/15 pt-6">
              <Trees className="h-4 w-4 shrink-0 text-brass-deep" strokeWidth={1.5} />
              <p className="text-[0.65rem] font-semibold tracking-[0.28em] text-charcoal/60 uppercase">
                Peaceful colony&nbsp;|&nbsp;Predominantly retired govt. residents
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-12"
          >
            <div className="absolute -top-4 -right-4 h-full w-full border border-brass/60" />
            <img
              src={exteriorDusk}
              width={1600}
              height={1008}
              alt="Snow-capped Dhauladhar peaks rising above Dharamshala"
              className="relative w-full object-cover shadow-lift"
              loading="lazy"
            />
            <motion.figure
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-10 -left-3 w-40 border-4 border-sand shadow-lift sm:-left-8 sm:w-56"
            >
              <img
                src={balconyView}
                width={1600}
                height={1063}
                alt="Real balcony view over forested Himalayan slopes"
                className="aspect-[3/2] w-full object-cover"
                loading="lazy"
              />
            </motion.figure>
          </motion.div>
        </div>

        {/* Hover-animated stat cards */}
        <div className="mt-24 grid grid-cols-2 gap-px bg-charcoal/15 lg:grid-cols-3">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group min-w-0 bg-charcoal p-5 transition-all duration-500 hover:-translate-y-2 hover:shadow-brass sm:p-8 lg:p-10"
            >
              <stat.icon
                className="h-5 w-5 text-brass transition-transform duration-500 group-hover:-translate-y-1"
                strokeWidth={1.25}
              />
              <p className="mt-6 font-display text-lg leading-tight font-medium tracking-wide break-words text-sand transition-colors duration-500 group-hover:text-brass-light sm:text-2xl lg:text-3xl">
                {stat.value}
              </p>
              <p className="mt-3 text-[0.55rem] leading-relaxed font-semibold tracking-[0.18em] break-words text-sand/55 uppercase sm:text-[0.6rem] sm:tracking-[0.28em]">
                {stat.label}
              </p>
              <div className="mt-6 h-px w-8 bg-brass/50 transition-all duration-500 group-hover:w-full group-hover:bg-brass" />
            </motion.div>
          ))}
        </div>

        {/* Airbnb & rental-income suitability */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-px flex flex-col items-start justify-between gap-6 bg-charcoal-deep p-8 sm:flex-row sm:items-center lg:p-10"
        >
          <div className="min-w-0">
            <p className="text-[0.55rem] font-semibold tracking-[0.35em] text-brass uppercase">
              An Investment That Works
            </p>
            <p className="mt-4 font-display text-3xl font-medium tracking-wide text-sand sm:text-4xl">
              Suited for Airbnb &amp; Rental Income
            </p>
          </div>
          <p className="max-w-sm text-sm leading-relaxed font-light text-sand/60">
            Dharamshala draws travellers through every season. Each floor is well
            placed for short-stay hosting or long-term letting — a home that earns
            while you are away.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
