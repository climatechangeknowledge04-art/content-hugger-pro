# Instant Loading, WhatsApp Enquiry, and a Floor-Plan Walkthrough

Three pieces of work. The first two are quick; the third starts with a sample clip for your approval.

## 1. Make photos and videos appear instantly

Right now most images and all nine films only start downloading when you scroll near them, which is why it feels slow.

Changes:
- Remove lazy loading from every photo that is part of the main story (hero, floors, interiors, neighbourhood, Discover, map). They are requested as soon as the page opens, with the first-screen images marked highest priority.
- Add width/height to every photo so nothing jumps while loading, and a warm placeholder tone so a card is never blank or black.
- Films: the first film starts loading with the page, and each film warms up the next one, so by the time you scroll to a clip it is already buffered. Every clip shows a still frame immediately — no black rectangles.
- Add early-connection hints to the media host so the very first request is faster.

Honest note: nine 10-second HD films is a very large download. Pulling all nine at once on a phone would stall the page. The plan above makes it feel instant — a picture is always visible and the next clip is always pre-buffered — without forcing a 200 MB download.

## 2. WhatsApp enquiry

- Floating WhatsApp button on every screen, opening a chat with 9911536697 pre-filled with: "Hi, I'm interested in Mont Vue Residences. Please share details."
- WhatsApp links added next to the phone number in the top bar, contact section, and footer.
- Uses the wa.me format, so it opens the WhatsApp app on phones and WhatsApp Web on laptops.
- The enquiry form gets a "Send on WhatsApp" button that packs the visitor's name, phone, and message into a ready chat.

## 3. Virtual walkthrough of your floor plan

Your plan shows a typical floor with two mirrored apartments around a central lift and staircase. Each apartment reads as:

```text
LIVING     14'0" x 17'0"   + balcony 4'0" wide
KITCHEN     8'0" x 10'0"
BEDROOM    12'0" x 10'0"   (13'8" x 10'4" in the mirrored unit) + balcony 3'0"
BEDROOM    12'0" x 10'0"
BEDROOM    11'0" x 10'0"
TOILETS     8'3" x 4'0"  /  8'0" x 4'0"  /  4'4" x 8'0"
```

Step A — sample first, before anything is built:
- One 10-second cinematic clip: a first-person walk from the entrance door, through the living room, toward the balcony, matching the warm luxury look of the site.
- You watch it and confirm the feel is right. Nothing else is generated until you say yes.

Step B — after your approval, two things get built:
1. A continuous walkthrough film, roughly 60 seconds, made of 10-second first-person clips — entrance to living, living to balcony, kitchen, master bedroom, second bedroom, terrace view — playing as one uninterrupted walk in a new "Walk Through Your Home" chapter.
2. A live 3D floor plan you can move through yourself: your plan rebuilt to scale as walls, doorways, and balconies, furnished simply, with the camera walking the same route as you scroll, room names and sizes appearing as you enter each space, and a switch to a top-down plan view. Also a "2D plan" panel showing the drawing itself with the room dimensions labelled.

One thing to confirm when we get there: the plan is a full floor with two units, so I will build the walkthrough for one apartment (the left unit) and note the second is its mirror image.

## Technical notes

- Loading: replace `loading="lazy"` with eager + `fetchPriority` above the fold; `preload="metadata"` plus poster on every `<video>`, and an n+1 prefetch driven by the existing `useInView` hook; `preconnect`/`dns-prefetch` to the asset CDN in the root head.
- WhatsApp: one `WhatsAppFab` component plus a `waLink()` helper in `src/lib/`; no backend.
- Walkthrough film: `videogen--generate_video`, 10s per segment, image-to-video seeded from the existing interior photos so rooms match the real ones; results stored as CDN asset pointers.
- Interactive plan: new `FloorPlan3D` under `src/components/three/`, walls extruded from a coordinate table transcribed from the PDF (1 ft = 1 unit), scroll-driven camera path reusing the waypoint pattern in `JourneyScene.tsx`, mounted client-only through the existing `Scene3D` wrapper.
- The plan PDF page is rendered to an image and stored as an asset for the 2D panel.
- Video generation costs credits: the sample is one clip, the full walkthrough six.
