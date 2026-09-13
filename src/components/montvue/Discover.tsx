import { motion } from "motion/react";
import { Compass } from "lucide-react";
import triund from "@/assets/disc-triund.jpg.asset.json";
import monastery from "@/assets/disc-monastery.jpg.asset.json";
import fort from "@/assets/disc-fort.jpg.asset.json";
import falls from "@/assets/disc-falls.jpg.asset.json";
import tea from "@/assets/disc-tea.jpg.asset.json";
import food from "@/assets/disc-food.jpg.asset.json";
import village from "@/assets/disc-village.jpg.asset.json";
import lake from "@/assets/disc-lake.jpg.asset.json";
import stadium from "@/assets/hpca-stadium.jpg.asset.json";

const PLACES = [
  {
    src: triund.url,
    tag: "The Classic Trek",
    title: "Triund Ridge",
    text: "The famous overnight ridge walk begins minutes above your door — sunset over the Kangra valley, sunrise against the snow line.",
    meta: "9 km · overnight",
    alt: "Trekkers on the Triund ridge at golden hour with snow-capped Dhauladhar peaks behind",
  },
  {
    src: monastery.url,
    tag: "Culture",
    title: "McLeod Ganj & Namgyal",
    text: "The Dalai Lama's monastery, prayer flags and the old bazaar — a fifteen minute drive up the hill.",
    meta: "~15 min",
    alt: "Tibetan monastery with golden roof and prayer flags in McLeod Ganj",
  },
  {
    src: village.url,
    tag: "Slow Living",
    title: "Dharamkot & Naddi",
    text: "Forest villages of café terraces, yoga shalas and long workation stays, wrapped in deodar pine.",
    meta: "~20 min",
    alt: "Stone and slate hillside village among deodar pines with a café terrace",
  },
  {
    src: lake.url,
    tag: "Wilderness",
    title: "Kareri Lake & Indrahar",
    text: "A glacier-fed lake at 2,900 m and the high pass beyond it — the Dhauladhars at their most untouched.",
    meta: "2–3 day trails",
    alt: "Glacier-fed alpine lake reflecting snow-capped Himalayan peaks",
  },
  {
    src: falls.url,
    tag: "A Short Walk",
    title: "Bhagsunag Falls",
    text: "Cold Himalayan water over black rock, a temple below and a café at the top of the path.",
    meta: "~20 min",
    alt: "Himalayan waterfall falling into a clear pool surrounded by pine forest",
  },
  {
    src: fort.url,
    tag: "Heritage",
    title: "Kangra Fort",
    text: "One of the oldest forts in India, standing over the valley since long before the town below it.",
    meta: "~50 min",
    alt: "Ancient stone fort ramparts above the Kangra valley at dusk",
  },
  {
    src: tea.url,
    tag: "The Drive Down",
    title: "Palampur Tea Estates",
    text: "Green terraces of Kangra tea running to the foot of the snow line — the region's finest afternoon drive.",
    meta: "~1 hr",
    alt: "Rows of tea bushes in the Kangra valley with snow peaks behind",
  },
  {
    src: food.url,
    tag: "The Local Table",
    title: "Siddu, Madra & Walnut",
    text: "Steamed siddu, slow-cooked madra and Himachali walnut sweets — plus the bakeries of McLeod Ganj.",
    meta: "All year",
    alt: "Himachali food spread of siddu bread and madra curry on a wooden table with mountain view",
  },
  {
    src: "/disc/disc-norbulingka.jpg",
    tag: "Living Art",
    title: "Norbulingka Institute",
    text: "Terraced gardens, trickling streams and master artisans keeping Tibetan thangka, woodcarving and metalwork alive.",
    meta: "~25 min",
    alt: "Golden-roofed temple and Japanese-style terraced gardens at Norbulingka Institute",
  },
  {
    src: "/disc/disc-church.jpg",
    tag: "Since 1852",
    title: "St. John in the Wilderness",
    text: "A neo-Gothic stone church hidden in deep deodar forest, with Belgian stained glass and century-old quiet.",
    meta: "~15 min",
    alt: "Neo-Gothic stone church surrounded by misty deodar forest",
  },
  {
    src: "/disc/disc-masroor.jpg",
    tag: "8th Century",
    title: "Masroor Rock-Cut Temples",
    text: "The 'Ellora of the Himalayas' — fifteen temples carved from a single sandstone rock, mirrored in a sacred tank.",
    meta: "~1.5 hr",
    alt: "Ancient rock-cut sandstone temples reflected in a sacred water tank at Masroor",
  },
  {
    src: stadium.url,
    tag: "World Stage",
    title: "HPCA Stadium",
    text: "One of the highest international cricket grounds on earth — colour, crowds and the snow line behind the pavilion.",
    meta: "~10 min",
    alt: "HPCA cricket stadium in Dharamshala with the Himalayan range behind",
  },
  {
    src: "/disc/disc-andretta.jpg",
    tag: "Artists' Colony",
    title: "Andretta Pottery Village",
    text: "A 1920s artists' colony where you can throw clay on the wheel and meet the potters of the valley.",
    meta: "~1.5 hr",
    alt: "Artisans shaping clay on a pottery wheel in a rustic Andretta studio",
  },
  {
    src: "/disc/disc-aghanjar.jpg",
    tag: "Hidden Shrine",
    title: "Aghanjar Mahadev",
    text: "A 500-year-old Shiva temple in thick forest, built beside a rushing mountain stream at the foot of the range.",
    meta: "~20 min",
    alt: "Ancient stone temple beside a mountain stream under the Dhauladhar peaks",
  },
  {
    src: "/disc/disc-dal-lake.jpg",
    tag: "Forest Escape",
    title: "Dal Lake",
    text: "A still, sacred lake ringed by towering deodars on the trail to Naddi — quiet water, quieter air.",
    meta: "~15 min",
    alt: "Tranquil mountain lake enveloped by tall deodar trees in mist",
  },
  {
    src: "/disc/disc-gyuto.jpg",
    tag: "Tantric Chant",
    title: "Gyuto Monastery",
    text: "Gold roofs and harmonic chanting at Sidhbari — the temporary seat of the 17th Karmapa.",
    meta: "~30 min",
    alt: "Bright yellow and gold Gyuto monastery with prayer flags and mountains behind",
  },
] as const;

export function Discover() {
  return (
    <section id="discover" className="relative bg-charcoal-deep">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-3">
            <Compass className="h-5 w-5 text-brass-light" strokeWidth={1.25} />
            <p className="eyebrow">Life Outside the Front Door</p>
          </div>
          <h2 className="mt-5 font-display text-4xl leading-[1.04] font-medium text-sand sm:text-5xl">
            Discover <span className="text-brass-light italic">Dharamshala.</span>
          </h2>
          <p className="mt-5 text-sm leading-relaxed font-light text-sand/60">
            Treks that start above your terrace, monasteries and temples older than the town,
            living art and ancient stone, tea estates on the drive down, and a hill-town table
            worth staying for.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PLACES.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative h-80 overflow-hidden rounded-sm"
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="eager"
                fetchPriority={i < 4 ? "high" : "auto"}
                decoding="async"
                width={1280}
                height={960}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
              />

              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-deep via-charcoal-deep/25 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[0.5rem] font-semibold tracking-[0.3em] text-brass-light uppercase">
                    {p.tag}
                  </span>
                  <span className="h-px w-4 bg-brass/60" />
                  <span className="inline-flex items-center rounded-full border border-sand/20 bg-sand/10 px-2 py-0.5 text-[0.55rem] font-semibold tracking-[0.18em] text-sand/90 uppercase backdrop-blur-md">
                    {p.meta}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-xl leading-tight font-medium text-sand sm:text-2xl">
                  {p.title}
                </h3>
                <p className="mt-2 text-[0.78rem] leading-relaxed font-light text-sand/70">
                  {p.text}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
