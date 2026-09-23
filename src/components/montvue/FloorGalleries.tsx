import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import living from "@/assets/interior-living.jpg";
import kitchen from "@/assets/interior-kitchen.jpg";
import bedroom from "@/assets/room-bedroom.jpg";
import balcony from "@/assets/room-balcony.jpg";
import interiors from "@/assets/montvue-bedroom-storage.jpg.asset.json";
import kitchenDetail from "@/assets/montvue-kitchen-glazing.jpg.asset.json";
import livingBalcony from "@/assets/montvue-living-balcony.jpg.asset.json";
import livingOne from "@/assets/floor-one-living.jpg";
import kitchenTwo from "@/assets/floor-two-kitchen.jpg";
import bedroomThree from "@/assets/floor-three-bedroom.jpg";

const PHOTOS = [
  { src: living, caption: "Living room" },
  { src: kitchen, caption: "Kitchen" },
  { src: bedroom, caption: "Bedroom" },
  { src: balcony, caption: "Balcony" },
  { src: interiors.url, caption: "Interiors" },
  { src: kitchenDetail.url, caption: "Kitchen interiors" },
  { src: livingBalcony.url, caption: "Living room & balcony" },
  { src: livingOne, caption: "Living room" },
  { src: kitchenTwo, caption: "Kitchen" },
  { src: bedroomThree, caption: "Bedroom" },
] as const;

export function FloorGalleries() {
  const [selected, setSelected] = useState<number | null>(null);
  const photo = selected === null ? null : PHOTOS[selected];

  useEffect(() => {
    if (selected === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") setSelected((i) => i === null ? 0 : (i + 1) % PHOTOS.length);
      if (event.key === "ArrowLeft") setSelected((i) => i === null ? 0 : (i - 1 + PHOTOS.length) % PHOTOS.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <section id="floor-galleries" className="bg-charcoal-deep" aria-labelledby="floor-galleries-title">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <p className="eyebrow">Photo Gallery</p>
        <h2 id="floor-galleries-title" className="mt-4 font-display text-4xl font-medium text-sand sm:text-5xl">
          Inside the Home.
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-sand/65">
          Interior images are illustrative; finishes and views may vary.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PHOTOS.map((item, index) => (
            <Button
              key={`${item.caption}-${index}`}
              variant="ghost"
              onClick={() => setSelected(index)}
              aria-label={`View ${item.caption} fullscreen`}
              className="group relative block h-auto w-full overflow-hidden rounded-sm border border-sand/15 bg-charcoal p-0 text-left hover:bg-charcoal"
            >
              <img src={item.src} alt={item.caption} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute inset-x-0 bottom-0 flex min-h-20 items-end justify-between gap-2 bg-gradient-to-t from-charcoal-deep via-charcoal-deep/75 to-transparent px-4 pb-4 pt-7 text-xs font-medium text-sand">
                <span>{item.caption}</span>
                <Expand className="shrink-0 text-brass-light" aria-hidden="true" />
              </span>
            </Button>
          ))}
        </div>
      </div>

      <Dialog open={selected !== null} onOpenChange={(open) => { if (!open) setSelected(null); }}>
        <DialogContent className="flex h-[100dvh] w-screen max-w-none flex-col gap-0 rounded-none border-0 bg-charcoal-deep p-4 shadow-none sm:p-8 [&>button]:right-5 [&>button]:top-5 [&>button]:z-10 [&>button]:text-sand">
          <DialogTitle className="pr-10 font-display text-2xl font-medium text-sand">{photo?.caption}</DialogTitle>
          <div className="flex min-h-0 flex-1 items-center justify-center py-5">
            {photo && <img key={photo.src} src={photo.src} alt={photo.caption} className="max-h-full max-w-full object-contain" />}
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-sand/15 pt-4 text-xs text-sand/70">
            <span>{selected === null ? 0 : selected + 1} / {PHOTOS.length}</span>
            <div className="flex gap-2">
              <Button type="button" variant="outline" size="icon" onClick={() => setSelected((i) => i === null ? 0 : (i - 1 + PHOTOS.length) % PHOTOS.length)} aria-label="Previous photo" className="border-sand/25 bg-charcoal-deep text-sand hover:bg-charcoal-soft hover:text-sand"><ChevronLeft /></Button>
              <Button type="button" variant="outline" size="icon" onClick={() => setSelected((i) => i === null ? 0 : (i + 1) % PHOTOS.length)} aria-label="Next photo" className="border-sand/25 bg-charcoal-deep text-sand hover:bg-charcoal-soft hover:text-sand"><ChevronRight /></Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}