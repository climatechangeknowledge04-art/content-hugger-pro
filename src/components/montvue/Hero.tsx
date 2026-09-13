import { useEffect, useState } from "react";
import { motion } from "motion/react";
import heroVideo from "@/assets/hero-clouds.mp4.asset.json";
import heroVideoTwo from "@/assets/film-mountain-summit.mp4.asset.json";
import poster from "@/assets/hero-poster.jpg";

const HERO_CLIPS = [heroVideo.url, heroVideoTwo.url];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.35 } },
};

const item = {
  hidden: { opacity: 0, y: 34 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  /* Poster paints instantly; the video only starts downloading once the
     page is interactive, so it never competes with the first paint. */
  const [ready, setReady] = useState(false);
  const [clip, setClip] = useState(0);
  const videoSrc = ready ? HERO_CLIPS[clip] : undefined;
  useEffect(() => {
    const start = () => setReady(true);
    const idle = (
      window as unknown as {
        requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      }
    ).requestIdleCallback;
    if (idle) {
      idle(start, { timeout: 1200 });
      return;
    }
    const t = window.setTimeout(start, 400);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden"
    >
      {/* Cinematic looping mountain backdrop */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 3.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {videoSrc ? (
          <video
            key={videoSrc}
            className="h-full w-full object-cover"
            src={videoSrc}
            poster={poster}
            preload="auto"
            autoPlay
            muted
            playsInline
            onEnded={() => setClip((c) => (c + 1) % HERO_CLIPS.length)}
            onLoadedMetadata={(e) => {
              void e.currentTarget.play().catch(() => {});
            }}
          />
        ) : (
          <img src={poster} alt="" className="h-full w-full object-cover" />
        )}
      </motion.div>

      <div className="absolute inset-0 bg-charcoal-deep/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-deep/70 via-transparent to-charcoal" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex w-full flex-col items-center px-6 pt-24 pb-8 text-center sm:pb-32"
      >
        <motion.p variants={item} className="eyebrow">
          Luxury Floors in Dharamshala
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-8 font-display text-6xl leading-[0.95] font-medium tracking-[0.08em] text-sand sm:text-7xl lg:text-8xl"
        >
          MONT VUE
        </motion.h1>
        <motion.p
          variants={item}
          className="mt-4 text-sm font-medium tracking-[0.65em] text-sand/85 sm:text-base"
        >
          RESIDENCES
        </motion.p>

        <motion.div variants={item} className="mt-10 h-px w-24 bg-brass/80" />

        <motion.p
          variants={item}
          className="mt-8 font-display text-2xl font-medium text-sand/90 italic sm:text-3xl"
        >
          A Private View of the Dhauladhars.
        </motion.p>

        <motion.p
          variants={item}
          className="mt-8 text-[0.7rem] font-medium tracking-[0.35em] text-sand/70 uppercase"
        >
          3 BHK&nbsp;&nbsp;·&nbsp;&nbsp;1,400 sq ft
        </motion.p>
      </motion.div>

      {/* Floating glass badge */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mb-20 w-full max-w-xs px-6 sm:absolute sm:top-1/2 sm:right-10 sm:mb-0 sm:w-auto sm:max-w-none sm:-translate-y-1/2 sm:px-0 lg:right-16"
      >
        <div className="glass-chip w-full px-7 py-5 text-center sm:w-auto">
          <p className="text-[0.6rem] font-semibold tracking-[0.35em] text-sand/75 uppercase">
            Residences From
          </p>
          <p className="mt-2 font-display text-3xl font-medium tracking-wide text-brass-light">
            INR 1 CRORE
          </p>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#residence"
        aria-label="Scroll to explore"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.span
          className="block h-12 w-px bg-gradient-to-b from-transparent via-brass to-transparent"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.a>
    </section>
  );
}
