import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import living from "@/assets/interior-living.jpg";
import kitchen from "@/assets/interior-kitchen.jpg";
import bedroom from "@/assets/room-bedroom.jpg";
import balcony from "@/assets/room-balcony.jpg";
import livingOne from "@/assets/floor-one-living.jpg";
import kitchenTwo from "@/assets/floor-two-kitchen.jpg";
import bedroomThree from "@/assets/floor-three-bedroom.jpg";

const GALLERIES = [
  {
    title: "1st Floor",
    photos: [
      { src: livingOne, caption: "Living & dining · mountain-facing glazing" },
      { src: kitchen, caption: "Kitchen · modular fittings" },
      { src: bedroom, caption: "Bedroom · soft daylight" },
      { src: balcony, caption: "Balcony · view towards the hills" },
    ],
  },
  {
    title: "2nd Floor",
    photos: [
      { src: living, caption: "Living & dining · open-plan space" },
      { src: kitchenTwo, caption: "Kitchen · walnut and stone" },
      { src: bedroom, caption: "Bedroom · quiet retreat" },
      { src: balcony, caption: "Balcony · forest outlook" },
    ],
  },
  {
    title: "3rd Floor",
    photos: [
      { src: living, caption: "Living & dining · considered finishes" },
      { src: kitchen, caption: "Kitchen · built-in appliances" },
      { src: bedroomThree, caption: "Bedroom · mountain outlook" },
      { src: balcony, caption: "Balcony · open-air living" },
    ],
  },
] as const;

export function FloorGalleries() {
  const [floor, setFloor] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const gallery = GALLERIES[floor] ?? GALLERIES[0];
  const photos = gallery.photos;
  const photo = selected === null ? null : photos[selected];

  useEffect(() => {
    if (selected === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") setSelected((i) => i === null ? 0 : (i + 1) % photos.length);
      if (event.key === "ArrowLeft") setSelected((i) => i === null ? 0 : (i - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, photos.length]);

  return (
    <section id="floor-galleries" className="bg-charcoal-deep" aria-labelledby="floor-galleries-title">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <p className="eyebrow">Photo Galleries</p>
        <h2 id="floor-galleries-title" className="mt-4 font-display text-4xl font-medium text-sand sm:text-5xl">
          Explore Every Floor.
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-sand/65">
          Browse the interiors at your own pace. Images are illustrative; finishes and views may vary by floor.
        </p>

        <div role="tablist" aria-label="Choose a floor gallery" className="mt-10 flex flex-wrap gap-2 border-b border-sand/15 pb-4">
          {GALLERIES.map((item, index) => (
            <Button
              key={item.title}
              id={`floor-tab-${index}`}
              role="tab"
              aria-selected={floor === index}
              aria-controls="floor-photo-panel"
              variant="ghost"
              onClick={() => { setFloor(index); setSelected(null); }}
              className={`rounded-none border-b px-4 py-3 text-xs font-semibold uppercase text-sand transition-colors ${floor === index ? "border-brass text-brass-light" : "border-transparent text-sand/55 hover:text-sand"}`}
            >
              {item.title}
            </Button>
          ))}
        </div>

        <div id="floor-photo-panel" role="tabpanel" aria-labelledby={`floor-tab-${floor}`} className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {photos.map((item, index) => (
            <Button
              key={`${floor}-${item.caption}`}
              variant="ghost"
              onClick={() => setSelected(index)}
              aria-label={`View ${gallery.title}: ${item.caption} fullscreen`}
              className="group relative block h-auto w-full overflow-hidden rounded-sm border border-sand/15 bg-charcoal p-0 text-left hover:bg-charcoal"
            >
              <img src={item.src} alt={item.caption} loading="lazy" width={1536} height={1024} className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute inset-x-0 bottom-0 flex min-h-20 items-end justify-between gap-2 bg-gradient-to-t from-charcoal-deep via-charcoal-deep/75 to-transparent px-4 pb-4 pt-7 text-xs font-medium text-sand">
                <span className="whitespace-normal leading-snug">{item.caption}</span>
                <Expand className="shrink-0 text-brass-light" aria-hidden="true" />
              </span>
            </Button>
          ))}
        </div>
      </div>

      <Dialog open={selected !== null} onOpenChange={(open) => { if (!open) setSelected(null); }}>
        <DialogContent className="flex h-[100dvh] w-screen max-w-none flex-col gap-0 rounded-none border-0 bg-charcoal-deep p-4 shadow-none sm:p-8 [&>button]:right-5 [&>button]:top-5 [&>button]:z-10 [&>button]:text-sand">
          <DialogTitle className="pr-10 font-display text-2xl font-medium text-sand">{gallery.title} · {photo?.caption}</DialogTitle>
          <div className="flex min-h-0 flex-1 items-center justify-center py-5">
            {photo && <img key={photo.src} src={photo.src} alt={photo.caption} className="max-h-full max-w-full object-contain" />}
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-sand/15 pt-4 text-xs text-sand/70">
            <span>{selected === null ? 0 : selected + 1} / {photos.length}</span>
            <div className="flex gap-2">
              <Button type="button" variant="outline" size="icon" onClick={() => setSelected((i) => i === null ? 0 : (i - 1 + photos.length) % photos.length)} aria-label="Previous photo" className="border-sand/25 bg-charcoal-deep text-sand hover:bg-charcoal-soft hover:text-sand"><ChevronLeft /></Button>
              <Button type="button" variant="outline" size="icon" onClick={() => setSelected((i) => i === null ? 0 : (i + 1) % photos.length)} aria-label="Next photo" className="border-sand/25 bg-charcoal-deep text-sand hover:bg-charcoal-soft hover:text-sand"><ChevronRight /></Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}