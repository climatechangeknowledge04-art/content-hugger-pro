import walkthrough from "@/assets/mont-vue-fullfloor-walk.webm.asset.json";
import poster from "@/assets/mont-vue-fullfloor-walk-poster.jpg.asset.json";
import { LazyVideo } from "@/components/montvue/LazyVideo";

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
            Enter Through the Main Door. Explore the Home.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed font-light text-sand/65 sm:text-base">
            A slower, eye-level journey following the shared 3 BHK plan — from the main door through
            the living spaces, three bedrooms, washroom positions and mountain-facing balconies.
          </p>
        </div>
        <figure className="group relative h-[22rem] w-full overflow-hidden bg-charcoal-soft shadow-lift sm:aspect-video sm:h-auto sm:min-h-[34rem] lg:min-h-[48rem]">
          <LazyVideo
            src={walkthrough.url}
            poster={poster.url}
            controls
            label="Cinematic walkthrough from the front gate through the Mont Vue home"
          />
        </figure>
        <p className="mt-4 text-xs leading-relaxed text-sand/50">
          Indicative walkthrough visualisation of the 3 BHK layout.
        </p>
      </div>
    </section>
  );
}
