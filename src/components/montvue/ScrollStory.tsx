import { stops } from "@/lib/stops";
import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import dhauladharAsset from "@/assets/dhauladhar-range.jpg.asset.json";
import valleyAsset from "@/assets/dharamshala-valley.jpg.asset.json";
import viewpointAsset from "@/assets/himalaya-dusk.jpg.asset.json";
import school from "@/assets/nb-school.jpg";
import stadium from "@/assets/story-stadium.jpg";
import residenceAsset from "@/assets/dhauladhar-dusk.jpg.asset.json";

const dhauladhars = dhauladharAsset.url;
const valley = valleyAsset.url;
const viewpoint = viewpointAsset.url;
const residence = residenceAsset.url;

const CHAPTERS = [
  {
    src: dhauladhars,
    alt: "Snow-capped Dhauladhar range rising above deodar forest at golden hour",
    eyebrow: "The Dhauladhars",
    title: "Peaks That Frame Every Window",
    text: "The snow-bound range rises directly behind the residence — a private view, every morning.",
  },
  {
    src: valley,
    alt: "The Kangra valley spread out below Dharamshala with terraced ridges and forest",
    eyebrow: "Kangra Valley",
    title: "The Valley Spread Below",
    text: "Terraced ridges, deodar forest and quiet trails unfolding beneath the terrace.",
  },
  {
    src: school,
    alt: "Hill-town school campus in Dharamshala with the Himalayan range behind",
    eyebrow: "Schools & Town",
    title: "Everything Within Reach",
    text: "Top schools, the zonal hospital and Dharamshala town sit a short drive down the ridge.",
  },
  {
    src: stadium,
    alt: "HPCA cricket stadium in Dharamshala with the Dhauladhar range behind the pavilion",
    eyebrow: "HPCA Stadium",
    title: "World Cricket, Minutes Away",
    text: "One of the world's most scenic stadiums sits practically in your neighbourhood.",
  },
  {
    src: viewpoint,
    alt: "Layered Himalayan ridge lines at dusk seen from a viewpoint above the deodars",
    eyebrow: "The Viewpoint",
    title: "A Deck Above the Deodars",
    text: "A quiet viewing deck at the edge of the colony, looking straight down the valley.",
  },
  {
    src: residence,
    alt: "The Dhauladhar range glowing at dusk above Dharamshala",
    eyebrow: "Mont Vue",
    title: "Your Address in the Himalayas",
    text: "Three private floors, each with its own balcony facing the snowline.",
  },
] as const;

const N = CHAPTERS.length;
const SEG = 1 / N;

function Frame({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const chapter = CHAPTERS[index]!;
  const start = index * SEG;
  const end = start + SEG;
  const isFirst = index === 0;
  const isLast = index === N - 1;

  /* The incoming frame fades in on top of the outgoing one across the
     segment boundary (higher z-index), so the screen never passes through
     a half-empty moment and each handover fully resolves. */
  const fade = SEG * 0.4;
  const opacity = useTransform(
    progress,
    stops(start - fade, start, end, end + fade),
    isFirst ? [1, 1, 1, 0] : isLast ? [0, 1, 1, 1] : [0, 1, 1, 0],
    { ease: (t) => t * t * (3 - 2 * t) },
  );
  /* Slow, continuous push-in — the camera move that makes a still feel cinematic */
  const scale = useTransform(
    progress,
    stops(start - SEG * 0.2, end + SEG * 0.2),
    [1.22, 1.02],
  );

  return (
    <motion.img
      src={chapter.src}
      alt={chapter.alt}
      loading="eager"
      decoding="async"
      style={{ opacity, scale, zIndex: index }}
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}

function Caption({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const chapter = CHAPTERS[index]!;
  const start = index * SEG;
  const end = start + SEG;
  const isFirst = index === 0;
  const isLast = index === N - 1;

  /* Captions crossfade symmetrically — the outgoing card fades out exactly
     while the incoming one fades in, so the two never stack half-visible. */
  const fade = SEG * 0.35;
  const opacity = useTransform(
    progress,
    stops(start - fade, start, end - fade, end),
    isFirst ? [1, 1, 1, 0] : isLast ? [0, 1, 1, 1] : [0, 1, 1, 0],
    { ease: (t) => t * t * (3 - 2 * t) },
  );
  const y = useTransform(progress, stops(start, start + fade), [26, 0]);

  return (
    <motion.div
      style={{ opacity, y, zIndex: 20 + index }}
      className="pointer-events-none absolute inset-x-0 bottom-0 pb-20 sm:pb-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="glass-panel inline-block max-w-xl px-6 py-5">
          <p className="eyebrow">{chapter.eyebrow}</p>
          <p className="mt-3 font-display text-3xl leading-[1.05] font-medium text-sand sm:text-5xl">
            {chapter.title}
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed font-light text-sand/75">
            {chapter.text}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function StoryDot({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const start = index * SEG;
  const opacity = useTransform(
    progress,
    stops(start, start + 0.05, start + SEG - 0.05, start + SEG),
    [0.25, 1, 1, 0.25],
  );
  return <motion.span style={{ opacity }} className="h-2 w-2 rotate-45 bg-brass" />;
}

export function ScrollStory() {
  const targetRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });
  /* Spring-smoothing removes scroll jitter — frames glide instead of
     hanging or jumping when the wheel moves unevenly. */
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
    restDelta: 0.0001,
  });
  const hintOpacity = useTransform(progress, [0, 0.07], [1, 0]);

  /* Persistent chapter counter — always visible, never fades with captions */
  const [chapter, setChapter] = useState(1);
  useMotionValueEvent(progress, "change", (v) => {
    const next = Math.min(N, Math.max(1, Math.floor(v * N) + 1));
    if (next !== chapter) setChapter(next);
  });

  return (
    <section
      id="story"
      ref={targetRef}
      className="relative h-[520vh] bg-charcoal-deep"
      aria-label="A scroll journey from the Dhauladhars to Mont Vue"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0">
          {CHAPTERS.map((c, i) => (
            <Frame key={c.eyebrow} index={i} progress={progress} />
          ))}
          <div className="pointer-events-none absolute inset-0 z-10 bg-charcoal-deep/35" />
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-charcoal-deep/85 via-transparent to-charcoal-deep/55" />
        </div>

        {CHAPTERS.map((c, i) => (
          <Caption key={c.eyebrow} index={i} progress={progress} />
        ))}

        <motion.p
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute inset-x-0 top-24 z-30 text-center text-[0.6rem] font-medium tracking-[0.35em] text-sand/60 uppercase"
        >
          Keep scrolling — the story unfolds
        </motion.p>

        {/* Fixed chapter indicator — never hides or freezes */}
        <div className="glass-panel pointer-events-none absolute top-24 left-6 z-30 flex items-baseline gap-2 rounded-full px-5 py-2.5 lg:left-12">
          <span className="font-display text-lg font-medium text-brass tabular-nums">
            {String(chapter).padStart(2, "0")}
          </span>
          <span className="text-[0.6rem] font-medium tracking-[0.3em] text-sand/60 uppercase">
            / {String(N).padStart(2, "0")}
          </span>
        </div>

        <div className="absolute top-1/2 right-6 z-30 flex -translate-y-1/2 flex-col items-center gap-4 lg:right-12">
          {CHAPTERS.map((c, i) => (
            <StoryDot key={c.eyebrow} index={i} progress={progress} />
          ))}
        </div>
      </div>
    </section>
  );
}
