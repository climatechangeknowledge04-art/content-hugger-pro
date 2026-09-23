import { Clapperboard } from "lucide-react";
import { LazyVideo } from "@/components/montvue/LazyVideo";
import filmForestWalk from "@/assets/film-forest-walk.mp4.asset.json";
import filmTriundTrek from "@/assets/film-triund-trek.mp4.asset.json";
import filmRidgeClimb from "@/assets/film-ridge-climb.mp4.asset.json";
import filmRidge360 from "@/assets/film-ridge-360.mp4.asset.json";
import filmMountainSummit from "@/assets/film-dhauladhar-upload.webm.asset.json";
import filmMarketWalk from "@/assets/film-market-walk.mp4.asset.json";
import filmHimalayanFood from "@/assets/film-himalayan-food.mp4.asset.json";
import filmKangraValley from "@/assets/film-tea-gardens-upload.webm.asset.json";
import posterForestWalk from "@/assets/poster-film-forest-walk.jpg.asset.json";
import posterTriundTrek from "@/assets/poster-film-triund-trek.jpg.asset.json";
import posterRidgeClimb from "@/assets/poster-film-ridge-climb.jpg.asset.json";
import posterRidge360 from "@/assets/poster-film-ridge-360.jpg.asset.json";
import posterMountainSummit from "@/assets/poster-dhauladhar-upload.jpg.asset.json";
import posterMarketWalk from "@/assets/poster-film-market-walk.jpg.asset.json";
import posterHimalayanFood from "@/assets/poster-film-himalayan-food.jpg.asset.json";
import posterKangraValley from "@/assets/poster-tea-gardens-upload.jpg.asset.json";

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
] as const;

function FilmCard({ film, index }: { film: (typeof FILMS)[number]; index: number }) {
  return (
    <figure className="group relative overflow-hidden rounded-sm bg-charcoal-deep shadow-lift">
      <div className="relative aspect-video min-h-[22rem] w-full overflow-hidden sm:min-h-[32rem] lg:min-h-[42rem]">
        {/* Only the chapter on screen keeps a video decoder; the rest show their still */}
        <LazyVideo
          src={film.src}
          poster={film.poster}
          label={film.title}
          className="transition-transform duration-700 ease-out group-hover:scale-[1.025]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-deep via-charcoal-deep/5 to-charcoal-deep/10" />
      </div>

      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 sm:p-8">
        <span className="glass-panel rounded-full px-3 py-1.5 text-[0.55rem] font-semibold tracking-[0.28em] text-brass uppercase">
          {film.tag}
        </span>
        <span className="text-[0.6rem] font-semibold tracking-[0.24em] text-sand/70 uppercase">
           10 sec · {String(index + 1).padStart(2, "0")}/08
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
  return (
    <section id="film" className="bg-charcoal-deep">
      <div className="mx-auto max-w-[100rem] px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="flex items-center gap-2.5 text-[0.6rem] font-semibold tracking-[0.35em] text-brass uppercase">
            <Clapperboard className="h-3.5 w-3.5" />
            Life in Motion · Eight Chapters
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-medium text-sand sm:text-6xl">
            Experience Dharamshala, on Film
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-sand/70 sm:text-lg">
            Eight immersive journeys through forest, trail, summit and market — seen from within the experience, not only from above.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:gap-12">
          {FILMS.map((film, index) => (
            <FilmCard key={film.title} film={film} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}