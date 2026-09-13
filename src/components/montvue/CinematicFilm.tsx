import { Clapperboard } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "@/hooks/use-in-view";
import filmForestWalk from "@/assets/film-forest-walk.mp4.asset.json";
import filmTriundTrek from "@/assets/film-triund-trek.mp4.asset.json";
import filmRidgeClimb from "@/assets/film-ridge-climb.mp4.asset.json";
import filmRidge360 from "@/assets/film-ridge-360.mp4.asset.json";
import filmMountainSummit from "@/assets/film-mountain-summit.mp4.asset.json";
import filmMarketWalk from "@/assets/film-market-walk.mp4.asset.json";
import filmHimalayanFood from "@/assets/film-himalayan-food.mp4.asset.json";
import filmKangraValley from "@/assets/film-kangra-valley.mp4.asset.json";
import filmTerraceView from "@/assets/film-terrace-view.mp4.asset.json";
import posterForestWalk from "@/assets/poster-film-forest-walk.jpg.asset.json";
import posterTriundTrek from "@/assets/poster-film-triund-trek.jpg.asset.json";
import posterRidgeClimb from "@/assets/poster-film-ridge-climb.jpg.asset.json";
import posterRidge360 from "@/assets/poster-film-ridge-360.jpg.asset.json";
import posterMountainSummit from "@/assets/poster-film-mountain-summit.jpg.asset.json";
import posterMarketWalk from "@/assets/poster-film-market-walk.jpg.asset.json";
import posterHimalayanFood from "@/assets/poster-film-himalayan-food.jpg.asset.json";
import posterKangraValley from "@/assets/poster-film-kangra-valley.jpg.asset.json";
import posterTerraceView from "@/assets/poster-film-terrace-view.jpg.asset.json";

const FILMS = [
  {
    src: filmForestWalk.url,
    poster: posterForestWalk.url,
    tag: "Forest Walk",
    title: "Among the Deodars",
    caption:
      "Move beneath Dharamshala's ancient cedars, where morning light slips through the canopy and the trail draws you deeper in.",
  },
  {
    src: filmTriundTrek.url,
    poster: posterTriundTrek.url,
    tag: "The Trek",
    title: "The Trail to Triund",
    caption:
      "Climb through forest and rock as the path opens onto the great wall of the Dhauladhars.",
  },
  {
    src: filmRidgeClimb.url,
    poster: posterRidgeClimb.url,
    tag: "The Ascent",
    title: "Above the Tree Line",
    caption:
      "Feel every foothold on a Himalayan ridge, with snow peaks drawing closer at every step.",
  },
  {
    src: filmRidge360.url,
    poster: posterRidge360.url,
    tag: "Ridge Panorama",
    title: "A World in Every Direction",
    caption:
      "Turn from the high Dhauladhars to the vast Kangra Valley in one sweeping mountain panorama.",
  },
  {
    src: filmMountainSummit.url,
    poster: posterMountainSummit.url,
    tag: "The Summit",
    title: "Where the Mountains Begin",
    caption:
      "Step beyond the prayer flags into sunrise, cloud and the silence of the high Himalayas.",
  },
  {
    src: filmMarketWalk.url,
    poster: posterMarketWalk.url,
    tag: "McLeod Ganj",
    title: "Through the Mountain Market",
    caption:
      "Walk past woven textiles, warm shopfronts and the bright rhythms of Dharamshala's Tibetan heart.",
  },
  {
    src: filmHimalayanFood.url,
    poster: posterHimalayanFood.url,
    tag: "Local Flavours",
    title: "Steam, Spice & Mountain Air",
    caption:
      "Fresh momos, warming thukpa and fragrant chai bring the tastes of the hills vividly to life.",
  },
  {
    src: filmKangraValley.url,
    poster: posterKangraValley.url,
    tag: "Kangra Valley",
    title: "Through the Tea Gardens",
    caption:
      "Travel between green terraces and quiet villages with the Dhauladhars always on the horizon.",
  },
  {
    src: filmTerraceView.url,
    poster: posterTerraceView.url,
    tag: "From Home",
    title: "The View You Wake Up To",
    caption:
      "Walk onto the terrace as clouds clear from the peaks — an extraordinary view made everyday at Mont Vue.",
  },
] as const;

function FilmCard({
  film,
  index,
  onNear,
  warm,
}: {
  film: (typeof FILMS)[number];
  index: number;
  onNear: (index: number) => void;
  warm: boolean;
}) {
  /* A wide margin plus the "warm" flag from the previous card means the clip
     is already downloading well before it reaches the screen. */
  const { ref, near } = useInView<HTMLElement>("1200px");
  const active = near || warm;

  useEffect(() => {
    if (near) onNear(index);
  }, [near, index, onNear]);

  return (
    <figure ref={ref} className="group relative overflow-hidden rounded-sm bg-charcoal-deep shadow-lift">
      <div className="relative aspect-video min-h-[22rem] w-full overflow-hidden sm:min-h-[32rem] lg:min-h-[42rem]">
        {/* The still frame paints instantly, so a card is never black */}
        <img
          src={film.poster}
          alt={film.title}
          loading="eager"
          decoding="async"
          fetchPriority={index === 0 ? "high" : "auto"}
          width={1280}
          height={720}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {active && (
          <video
            src={film.src}
            poster={film.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedMetadata={(e) => {
              void e.currentTarget.play().catch(() => {});
            }}
            aria-label={film.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep via-charcoal-deep/5 to-charcoal-deep/10" />
      </div>

      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 sm:p-8">
        <span className="glass-panel rounded-full px-3 py-1.5 text-[0.55rem] font-semibold tracking-[0.28em] text-brass uppercase">
          {film.tag}
        </span>
        <span className="text-[0.6rem] font-semibold tracking-[0.24em] text-sand/70 uppercase">
          10 sec · {String(index + 1).padStart(2, "0")}/09
        </span>
      </div>

      <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-12">
        <h3 className="max-w-3xl font-display text-3xl font-medium text-sand sm:text-4xl lg:text-5xl">
          {film.title}
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-sand/75 sm:text-base">
          {film.caption}
        </p>
      </figcaption>
    </figure>
  );
}

export function CinematicFilm() {
  /* Whichever clip is closest also warms up the next one, so the next
     chapter is already buffered by the time you scroll to it. */
  const [reached, setReached] = useState(0);
  const handleNear = useCallback((i: number) => {
    setReached((r) => (i > r ? i : r));
  }, []);

  return (
    <section id="film" className="bg-charcoal-deep">
      <div className="mx-auto max-w-[100rem] px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="flex items-center gap-2.5 text-[0.6rem] font-semibold tracking-[0.35em] text-brass uppercase">
            <Clapperboard className="h-3.5 w-3.5" />
            Life in Motion · Nine Chapters
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-medium text-sand sm:text-6xl">
            Experience Dharamshala, on Film
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-sand/70 sm:text-lg">
            Nine immersive journeys through forest, trail, summit, market and home — seen from within the experience, not only from above.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:gap-12">
          {FILMS.map((film, index) => (
            <FilmCard
              key={film.title}
              film={film}
              index={index}
              onNear={handleNear}
              warm={index <= reached + 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}