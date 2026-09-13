import { Play } from "lucide-react";
import walkthrough from "@/assets/full-home-walkthrough.mp4.asset.json";
import poster from "@/assets/full-home-walkthrough-poster.jpg.asset.json";

export function VirtualTour() {
  return (
    <section
      id="walkthrough"
      className="bg-charcoal-deep px-4 py-24 sm:px-6 lg:px-10 lg:py-32"
      aria-labelledby="walkthrough-title"
    >
      <div className="mx-auto max-w-[100rem]">
        <div className="mb-10 sm:mb-14">
          <p className="eyebrow">Private Home Walkthrough</p>
          <h2
            id="walkthrough-title"
            className="mt-5 max-w-4xl font-display text-4xl font-medium text-sand sm:text-6xl"
          >
            Enter at the Front Gate. Walk Through Your Home.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed font-light text-sand/65 sm:text-base">
            A cinematic, eye-level journey shaped around the shared 3 BHK plan — from the entrance
            through the living spaces, bedrooms and out to the mountain-facing balcony.
          </p>
        </div>
        <figure className="group relative aspect-video min-h-[22rem] overflow-hidden bg-charcoal-soft shadow-lift sm:min-h-[34rem] lg:min-h-[48rem]">
          <img
            src={poster.url}
            alt="Front entrance of the Mont Vue residence"
            width={1344}
            height={768}
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <video
            src={walkthrough.url}
            poster={poster.url}
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="auto"
            onLoadedData={(event) => void event.currentTarget.play().catch(() => {})}
            className="absolute inset-0 h-full w-full object-cover"
            aria-label="Cinematic walkthrough from the front gate through the Mont Vue home"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-deep/65 via-transparent to-charcoal-deep/10" />
          <figcaption className="pointer-events-none absolute right-5 bottom-16 left-5 flex items-end justify-between gap-4 sm:right-8 sm:bottom-20 sm:left-8">
            <div>
              <p className="flex items-center gap-2 text-[0.6rem] font-bold tracking-[0.3em] text-brass-light uppercase">
                <Play className="h-3.5 w-3.5 fill-current" /> 10-second preview
              </p>
              <p className="mt-2 font-display text-2xl font-medium text-sand sm:text-4xl">
                Front Gate to Mountain Balcony
              </p>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
