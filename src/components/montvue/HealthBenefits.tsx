import { motion } from "motion/react";
import {
  Wind,
  Moon,
  Heart,
  Mountain,
  Sun,
  Brain,
} from "lucide-react";
import peakAsset from "@/assets/dhauladhar-peak.jpg.asset.json";

const peakImage = peakAsset.url;

const BENEFITS = [
  {
    icon: Wind,
    title: "Cleaner Lungs",
    body: "Dharamshala averages an AQI of ~25. Wake up to air so crisp it resets your breathing.",
  },
  {
    icon: Moon,
    title: "Deeper Sleep",
    body: "Cooler nights, lower noise and higher altitude help your body fall into restorative rest.",
  },
  {
    icon: Heart,
    title: "Lower Stress",
    body: "Daily views of the Dhauladhars measurably reduce cortisol — nature is the original medicine.",
  },
  {
    icon: Mountain,
    title: "Natural Fitness",
    body: "Sloping lanes, forest trails and mountain walks keep movement effortless, every single day.",
  },
  {
    icon: Sun,
    title: "Stronger Immunity",
    body: "More sunshine, fresher air and open skies help your body produce vitamin D the natural way.",
  },
  {
    icon: Brain,
    title: "Mental Clarity",
    body: "Deodar forests and wide horizons quiet the mind — the perfect setting for focus and creativity.",
  },
];

const rise = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function HealthBenefits() {
  return (
    <section id="wellness" className="relative bg-charcoal text-sand">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-36">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            variants={rise}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
          >
            <p className="eyebrow">Wellness by Design</p>
            <h2 className="mt-6 font-display text-4xl leading-[1.05] font-medium sm:text-5xl lg:text-6xl">
              BREATHE BETTER.
              <br />
              <span className="text-brass-deep italic">SLEEP DEEPER.</span>
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed font-light text-sand/75">
              Living at the edge of the Dhauladhars is not just a view upgrade — it is a daily upgrade to your body and mind.
            </p>
            <p className="mt-4 max-w-md text-base leading-relaxed font-light text-sand/75">
              Cool mountain air, quiet nights and forested surroundings create the conditions for a healthier, calmer life.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -top-4 -right-4 h-full w-full border border-brass/60" />
            <img
              src={peakImage}
              width={1600}
              height={1008}
              alt="Snow-capped Dhauladhar peaks rising above Dharamshala"
              className="relative w-full object-cover shadow-lift"
              loading="eager"
            />
          </motion.div>
        </div>

        {/* Benefit cards */}
        <div className="mt-24 grid grid-cols-1 gap-px bg-charcoal-light/30 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group min-w-0 bg-charcoal p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-brass sm:p-8 lg:p-10"
            >
              <benefit.icon
                className="h-5 w-5 text-brass transition-transform duration-500 group-hover:-translate-y-1"
                strokeWidth={1.25}
              />
              <p className="mt-6 font-display text-lg leading-tight font-medium tracking-wide break-words text-sand transition-colors duration-500 group-hover:text-brass-light sm:text-2xl">
                {benefit.title}
              </p>
              <p className="mt-3 text-sm leading-relaxed font-light text-sand/60">
                {benefit.body}
              </p>
              <div className="mt-6 h-px w-8 bg-brass/50 transition-all duration-500 group-hover:w-full group-hover:bg-brass" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
