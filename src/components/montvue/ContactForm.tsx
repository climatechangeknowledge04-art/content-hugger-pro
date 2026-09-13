import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Phone, Check, Loader2, MessageCircle } from "lucide-react";
import { openWhatsApp, waLink } from "@/lib/whatsapp";

/*
 * WORDPRESS INTEGRATION POINT
 * Paste your WordPress webhook / form-handler URL below (e.g. a WPForms,
 * Fluent Forms or Gravity Forms REST endpoint). The form POSTs a JSON
 * payload: { name, email, phone, floor }.
 * Leave empty to run in demo mode (no network call is made).
 */
const FORM_ACTION_URL = "";

const FLOOR_OPTIONS = [
  "1st Floor — INR 1.00 Cr",
  "2nd Floor — INR 1.15 Cr",
  "3rd Floor — INR 1.25 Cr",
  "No preference yet",
];

const inputClass =
  "w-full border border-sand/15 bg-charcoal-deep/60 px-4 py-3.5 text-sm font-light text-sand placeholder:text-sand/35 transition-colors duration-300 focus:border-brass focus:outline-none";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [floor, setFloor] = useState(FLOOR_OPTIONS[0]);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    try {
      if (FORM_ACTION_URL) {
        const response = await fetch(FORM_ACTION_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, phone, floor }),
        });
        if (!response.ok) throw new Error("Request failed");
      } else {
        await new Promise((resolve) => setTimeout(resolve, 900));
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="viewing" className="relative bg-charcoal">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-2 lg:px-10 lg:py-36">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">Enquiries &amp; Site Visits</p>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] font-medium text-sand sm:text-5xl lg:text-6xl">
            Book a <span className="text-brass-light italic">Private Viewing</span>
          </h2>
          <p className="mt-8 max-w-md text-base leading-relaxed font-light text-sand/60">
            Walk the site, feel the mountain air and see the Dhauladhars from your future balcony.
            Viewings are by appointment only.
          </p>
          <a
            href="tel:+919911536697"
            className="group mt-10 inline-flex items-center gap-4 border border-brass/50 px-6 py-4 transition-all duration-300 hover:bg-brass"
          >
            <Phone
              className="h-4 w-4 text-brass transition-colors group-hover:text-charcoal-deep"
              strokeWidth={1.5}
            />
            <span className="font-display text-2xl font-medium tracking-wide text-brass-light transition-colors group-hover:text-charcoal-deep">
              +91 99115 36697
            </span>
          </a>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => {
              event.preventDefault();
              openWhatsApp();
            }}
            className="group mt-4 ml-0 inline-flex items-center gap-4 border border-[#25D366]/60 px-6 py-4 transition-all duration-300 hover:bg-[#25D366] sm:mt-10 sm:ml-4"
          >
            <MessageCircle
              className="h-4 w-4 text-[#25D366] transition-colors group-hover:text-charcoal-deep"
              strokeWidth={1.5}
            />
            <span className="text-[0.65rem] font-bold tracking-[0.3em] text-sand uppercase transition-colors group-hover:text-charcoal-deep">
              Chat on WhatsApp
            </span>
          </a>

          {/* Festive booking offer */}
          <div className="mt-10 border border-brass/35 bg-charcoal-soft/60 p-6 sm:p-8">
            <p className="text-[0.55rem] font-semibold tracking-[0.35em] text-brass uppercase">
              Festive Season · Limited Period
            </p>
            <p className="mt-4 font-display text-2xl leading-snug font-medium text-sand sm:text-3xl">
              An attractive discount awaits this Diwali
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed font-light text-sand/60">
              Reserve your residence before Diwali and enjoy an exclusive festive privilege on the
              listed price of your chosen floor. With limited residences available, we recommend
              confirming early — speak with us for details.
            </p>
            <p className="mt-5 text-[0.6rem] font-light tracking-[0.12em] text-sand/45">
              Applicable on bookings confirmed before Diwali. Limited inventory — few residences only.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="border border-sand/12 bg-charcoal-soft p-8 shadow-lift lg:p-10"
        >
          {status === "success" ? (
            <div className="flex h-full min-h-[420px] flex-col items-center justify-center text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-brass">
                <Check className="h-6 w-6 text-brass-light" strokeWidth={1.5} />
              </span>
              <p className="mt-8 font-display text-3xl font-medium text-sand">
                Thank you, {name.split(" ")[0] || "friend"}.
              </p>
              <p className="mt-4 max-w-xs text-sm leading-relaxed font-light text-sand/60">
                Your request for a private viewing has been noted. We will call you shortly to
                confirm a time.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <label
                  htmlFor="mv-name"
                  className="mb-2 block text-[0.6rem] font-semibold tracking-[0.3em] text-sand/60 uppercase"
                >
                  Name
                </label>
                <input
                  id="mv-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className={inputClass}
                />
              </div>
              <div>
                <label
                  htmlFor="mv-email"
                  className="mb-2 block text-[0.6rem] font-semibold tracking-[0.3em] text-sand/60 uppercase"
                >
                  Email
                </label>
                <input
                  id="mv-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>
              <div>
                <label
                  htmlFor="mv-phone"
                  className="mb-2 block text-[0.6rem] font-semibold tracking-[0.3em] text-sand/60 uppercase"
                >
                  Phone
                </label>
                <input
                  id="mv-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91"
                  className={inputClass}
                />
              </div>
              <div>
                <label
                  htmlFor="mv-floor"
                  className="mb-2 block text-[0.6rem] font-semibold tracking-[0.3em] text-sand/60 uppercase"
                >
                  Preferred Floor
                </label>
                <select
                  id="mv-floor"
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}
                  className={`${inputClass} appearance-none bg-charcoal-deep`}
                >
                  {FLOOR_OPTIONS.map((option) => (
                    <option key={option} value={option} className="bg-charcoal-deep text-sand">
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {status === "error" && (
                <p className="text-xs tracking-wide text-destructive">
                  Something went wrong. Please call +91 99115 36697 instead.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-2 flex items-center justify-center gap-3 bg-brass px-8 py-4 text-[0.65rem] font-bold tracking-[0.35em] text-charcoal-deep uppercase transition-all duration-300 hover:bg-brass-light disabled:opacity-60"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending
                  </>
                ) : (
                  "Request a Viewing"
                )}
              </button>

              <a
                href={waLink(
                  `Hi, I'm ${name || "…"} (${phone || "phone"}). I'm interested in Mont Vue Residences — ${floor}. Please share details.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => {
                  event.preventDefault();
                  openWhatsApp(
                    `Hi, I'm ${name || "…"} (${phone || "phone"}). I'm interested in Mont Vue Residences — ${floor}. Please share details.`,
                  );
                }}
                className="flex items-center justify-center gap-3 border border-[#25D366]/60 px-8 py-4 text-[0.65rem] font-bold tracking-[0.35em] text-sand uppercase transition-all duration-300 hover:bg-[#25D366] hover:text-charcoal-deep"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
                Send on WhatsApp
              </a>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
