import { motion } from "motion/react";
import { Mountain } from "lucide-react";
import dhauladharAsset from "@/assets/dhauladhar-panorama.jpg.asset.json";

const dhauladhars = dhauladharAsset.url;

export function ViewsBanner() {
  return (
    <section className="relative overflow-hidden bg-charcoal-deep">
      {/* Scenic Dhauladhar backdrop with a slow cinematic settle */}
      <motion.img
        src={dhauladhars}
        alt="Snow-capped Dhauladhar range glowing at golden hour"
        initial={{ scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 6, ease: "easeOut" }}
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-charcoal-deep/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-deep/70 via-charcoal-deep/20 to-charcoal" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center lg:py-36">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <Mountain className="h-6 w-6 text-brass-light" strokeWidth={1.25} />
          <h2 className="mt-6 font-display text-4xl leading-[1.02] font-medium tracking-[0.04em] text-sand sm:text-6xl lg:text-7xl">
            STADIUM + <span className="text-brass-light italic">DHAULADHAR</span> VIEWS
          </h2>
          <div className="mt-8 h-px w-20 bg-brass" />
          <p className="mt-6 text-[0.7rem] font-semibold tracking-[0.4em] text-sand/80 uppercase">
            A rare outlook from the heart of Dharamshala
          </p>
        </motion.div>
      </div>
    </section>
  );
}
