import { motion, useTransform, type MotionValue } from "motion/react";

/** A lightweight architectural elevation that remains visible without WebGL. */
export function BuildingReveal({ progress }: { progress: MotionValue<number> }) {
  const lift = [
    useTransform(progress, [0, 0.12, 0.36], [0, 12, 12]),
    useTransform(progress, [0, 0.12, 0.36], [0, -30, -30]),
    useTransform(progress, [0, 0.12, 0.36], [0, -72, -72]),
  ] as const;

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center sm:justify-start sm:pl-[8%] lg:pl-[16%]" aria-label="Illustration of the three residence floors separating">
      <div className="relative mt-[-5rem] w-[min(65vw,360px)] sm:mt-0 sm:w-[min(48vw,460px)]" style={{ perspective: 900 }}>
        <div className="relative aspect-[1/1.18]" style={{ transform: "rotateY(-12deg) rotateX(5deg)", transformStyle: "preserve-3d" }}>
          <div className="absolute inset-x-[7%] bottom-[4%] h-[8%] skew-x-[-18deg] bg-charcoal-deep/75 blur-md" />
          <div className="absolute inset-x-[8%] bottom-[5%] h-[8%] border-t border-brass/50 bg-charcoal-soft" />
          {lift.map((offset, floor) => (
            <div key={floor} className="absolute inset-x-0 h-[23%]" style={{ bottom: `${12 + floor * 24}%` }}>
            <motion.div
              style={{ y: offset }}
              className="absolute inset-y-0 right-[11%] left-[8%] border border-sand-dim/70 bg-sand shadow-lift"
              data-floor={floor + 1}
            >
              <div className="absolute inset-y-0 -right-[9%] w-[9%] origin-left skew-y-[-28deg] border border-sand-dim/50 bg-stone" />
              <div className="absolute -top-[9%] left-0 h-[9%] w-full origin-bottom skew-x-[-42deg] border border-sand-dim/60 bg-sand-dim" />
              <div className="absolute inset-x-0 top-0 h-[7%] bg-brass" />
              <div className="absolute inset-x-[7%] top-[18%] bottom-[22%] grid grid-cols-3 gap-[3%]">
                {[0, 1, 2].map((window) => (
                  <div key={window} className="relative border-[3px] border-charcoal-soft bg-charcoal/80 shadow-[inset_0_0_24px_var(--color-stone)]">
                    <span className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-brass/65" />
                    <span className="absolute right-0 bottom-0 left-0 h-[3px] bg-brass/65" />
                  </div>
                ))}
              </div>
              <div className="absolute inset-x-[-3%] bottom-[4%] h-[11%] border-y border-brass bg-sand-dim" />
              <div className="absolute right-[-5%] bottom-[-7%] h-[17%] w-[38%] border border-brass/80 bg-sand-dim/80">
                <div className="absolute inset-x-0 top-0 h-[3px] bg-brass" />
                <div className="absolute inset-y-0 left-1/2 w-[2px] bg-brass/70" />
              </div>
            </motion.div>
            </div>
          ))}
          <div className="absolute right-[5%] bottom-[77%] left-[6%] h-[2%] bg-brass shadow-lift" />
        </div>
      </div>
    </div>
  );
}