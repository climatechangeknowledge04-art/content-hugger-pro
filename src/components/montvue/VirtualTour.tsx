import walkthrough from "@/assets/mont-vue-plan-walkthrough-corrected.webm.asset.json";
import poster from "@/assets/mont-vue-plan-walkthrough-poster.jpg.asset.json";

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
        </figure>
        <p className="mt-4 text-xs leading-relaxed text-sand/50">
          Visualisation assembled from supplied footage and reference images. Washroom locations are
          shown on the floor plan; the repeated bedroom view illustrates the three rooms, not their
          individual finished interiors.
        </p>
      </div>
    </section>
  );
}
