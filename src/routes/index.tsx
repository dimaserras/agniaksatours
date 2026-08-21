import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import heroImg from "@/assets/hero-borobudur-aerial.jpg";
import groundImg from "@/assets/borobudur-ground.jpg";
import howCal from "@/assets/how-calendar.jpg";
import howDriver from "@/assets/how-driver.jpg";
import howArrival from "@/assets/how-arrival.jpg";
import clusterBoro from "@/assets/cluster-borobudur.jpg";
import clusterPramb from "@/assets/cluster-prambanan.jpg";
import {
  BatikBg,
  BeyondJogja,
  GoldItalic,
  Reveal,
  SiteFooter,
  SiteHeader,
  WhatsAppCTA,
  WhatsAppFab,
} from "@/components/site";
import {
  BatikWatermark,
  CrossfadeToggle,
  ParallaxImage,
  ScrollReveal,
  SectionDivider,
  useInView,
  useReducedMotion,
} from "@/components/motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Agni Aksa Tours — Private Yogyakarta, Curated in Silence" },
      {
        name: "description",
        content:
          "Chauffeured EV touring for travelers who expect more than a tour. Borobudur, Prambanan and the stories between them, in complete comfort.",
      },
      {
        property: "og:title",
        content: "Agni Aksa Tours — Private Yogyakarta, Curated in Silence",
      },
      {
        property: "og:description",
        content:
          "Private, chauffeured EV touring across Yogyakarta. Heritage-focused, understated, arranged in advance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="bg-ivory">
      <WhatsAppFab message="Hi Agni Aksa — I'd like to plan a private tour in Yogyakarta." />
      <Hero />
      <TrustBar />
      <HowItWorks />
      <HeritageClusters />
      <Breather />
      <TieredPreview />
      <BeyondJogja />
      <Testimonials />
      <FoundingBanner />
      <FAQ />
      <SiteFooter />
    </div>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section className="relative h-screen min-h-[680px] w-full overflow-hidden bg-indigo text-ivory">
      <SiteHeader variant="dark" />
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Borobudur at golden hour"
          className="w-full h-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo/60 via-indigo/20 to-indigo/70" />
      </div>
      <div className="relative h-full flex items-end pb-24 md:pb-28 px-6 md:px-10">
        <div className="max-w-3xl">
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-6 animate-[fade-in_800ms_ease-out]">
            Yogyakarta · Private EV Touring
          </p>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] text-ivory">
            Your Private Yogyakarta, <br />
            Curated <GoldItalic>Down to the Hour</GoldItalic>
          </h1>
          <p className="mt-6 text-ivory/80 max-w-xl text-lg leading-relaxed">
            Chauffeured EV touring for travelers who expect more than a tour. We take you through
            Borobudur, Prambanan, and the quieter stories in between, all in complete comfort.
          </p>
          <div className="mt-8">
            <WhatsAppCTA message="Hi Agni Aksa — I'd like to plan a private tour in Yogyakarta.">
              Reach Us on WhatsApp
            </WhatsAppCTA>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Trust Bar ---------- */
function TrustBar() {
  const bullets = [
    { title: "Premium Fleet", body: "Chartered EVs when available, always premium-class." },
    { title: "English-Speaking Drivers", body: "Culturally fluent, discreet." },
    {
      title: "We Guide, You Choose",
      body: "We show you what's worth seeing. The rest is your pace, your call.",
    },
  ];
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>(0.05);
  return (
    <section className="relative">
      {/* Hero drone shot crossfades into this closer temple view, then resolves to flat ivory */}
      <div ref={ref} className="relative h-[70vh] min-h-[520px] w-full overflow-hidden bg-indigo">
        <ParallaxImage
          src={heroImg}
          alt=""
          speed={0.18}
          className="absolute inset-0 h-full w-full"
        />
        <div
          className="absolute inset-0"
          style={{
            opacity: reduced ? 1 : inView ? 1 : 0,
            transition: reduced ? undefined : "opacity 1100ms cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <ParallaxImage
            src={groundImg}
            alt="Borobudur stairway at golden hour"
            speed={0.3}
            className="absolute inset-0 h-full w-full"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-indigo/30 via-ivory/40 to-ivory" />
      </div>
      <div className="bg-ivory px-6 pb-24 -mt-24 md:-mt-40 relative">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal max-w-3xl leading-tight">
              Quietly Trusted by Travelers <br />
              <GoldItalic>Who Expect More</GoldItalic>
            </h2>
            <p className="mt-4 text-charcoal/70 max-w-xl">
              No hidden hours. No wasted stops. Every detail is arranged before you arrive.
            </p>
          </ScrollReveal>
          <ScrollReveal
            staggerDelay={100}
            className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {bullets.map((b, i) => (
              <div key={b.title} className="border-t border-bronze/40 pt-6 h-full">
                <p className="text-xs tracking-widest uppercase text-gold mb-3">0{i + 1}</p>
                <h3 className="font-serif text-2xl text-charcoal">{b.title}</h3>
                <p className="mt-3 text-sm text-charcoal/70 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </div>
      <SectionDivider tone="bronze" />
    </section>
  );
}

/* ---------- How It Works ---------- */
function HowItWorks() {
  const steps = [
    {
      img: howCal,
      title: "Choose Your Days",
      body: "Single day or several. You decide how much of Jogja to see.",
    },
    {
      img: howDriver,
      title: "Pick Your Tier",
      body: "Classic, Signature, or VIP. Every tier includes your private EV and driver.",
    },
    {
      img: howArrival,
      title: "We Arrange It All",
      body: "Itinerary, pickups, entries, and timing, all confirmed with you directly on WhatsApp.",
    },
  ];
  return (
    <section className="bg-ivory py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal max-w-3xl leading-tight">
            Tell Us Your Days, <br />
            <GoldItalic>We Handle the Rest</GoldItalic>
          </h2>
          <p className="mt-4 text-charcoal/70 max-w-xl">
            Choose how long you're staying, pick your tier, and we build the itinerary around you.
          </p>
        </ScrollReveal>
        <div className="mt-20 relative">
          {/* thin gold connector with arrow motif */}
          <div className="hidden md:block absolute top-[72px] left-[16%] right-[16%] pointer-events-none">
            <div className="h-px w-full bg-gold/50" />
            {[33.333, 66.666].map((left) => (
              <svg
                key={left}
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
                className="absolute -top-[7px] -translate-x-1/2"
                style={{ left: `${left}%` }}
              >
                <path d="M4 2 L9 7 L4 12" stroke="var(--color-gold)" strokeWidth="1.2" />
              </svg>
            ))}
          </div>
          <ScrollReveal
            staggerDelay={140}
            className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-8 relative"
          >
            {steps.map((s, i) => (
              <div key={s.title} className="flex flex-col items-center text-center px-4">
                <div className="relative w-36 h-36 rounded-full overflow-hidden border border-gold/60 shadow-sm bg-white">
                  <img src={s.img} alt={s.title} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <p className="mt-6 text-xs tracking-widest uppercase text-gold">Step 0{i + 1}</p>
                <h3 className="mt-2 font-serif text-2xl text-charcoal">{s.title}</h3>
                <p className="mt-3 text-sm text-charcoal/70 leading-relaxed max-w-xs">{s.body}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
        <ScrollReveal className="mt-16 text-center">
          <WhatsAppCTA message="Hi Agni Aksa — I'd like to plan my days in Yogyakarta.">
            Reach Us on WhatsApp
          </WhatsAppCTA>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ---------- Heritage Clusters ---------- */
function HeritageClusters() {
  const subtitles: Record<string, string> = {
    borobudur: "Sunrise silence, ancient stone, and Selogriyo hidden in the hills.",
    prambanan: "Yogyakarta's living culture in one carefully paced day.",
  };
  return (
    <BatikWatermark>
      <SectionDivider tone="gold" flip />
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="font-serif text-4xl md:text-5xl text-ivory max-w-3xl leading-tight">
              Two Icons of Java, <br />
              <GoldItalic>Ancient Heritage</GoldItalic>
            </h2>
            <p className="mt-4 text-ivory/70 max-w-2xl">
              Borobudur's sunrise silence. Prambanan's living culture, alongside the Kraton and
              Tamansari. Choose one, or experience both across your stay.
            </p>
          </ScrollReveal>
          <ScrollReveal className="mt-14">
            <CrossfadeToggle
              aspect="aspect-[16/9]"
              className="border border-gold/20 p-4 md:p-6"
              options={[
                {
                  id: "borobudur",
                  label: "Borobudur & the Misty North",
                  image: clusterBoro,
                  alt: "Borobudur at sunrise",
                },
                {
                  id: "prambanan",
                  label: "Prambanan, Kraton & Tamansari",
                  image: clusterPramb,
                  alt: "Prambanan temple complex",
                },
              ]}
              caption={(active) => (
                <p className="text-sm text-ivory/70 leading-relaxed max-w-xl">
                  {subtitles[active.id]}
                </p>
              )}
            />
          </ScrollReveal>
        </div>
      </section>
    </BatikWatermark>
  );
}

/* ---------- Breather Quote ---------- */
function Breather() {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLParagraphElement>(0.3);
  return (
    <BatikWatermark className="border-t border-ivory/5">
      <section className="py-32 md:py-48 px-6 text-center">
        {/* stillness: opacity fade only — no slide, scale or parallax */}
        <p
          ref={ref}
          className="font-serif italic text-3xl md:text-5xl text-ivory max-w-3xl mx-auto leading-tight"
          style={
            reduced
              ? undefined
              : { opacity: inView ? 1 : 0, transition: "opacity 1200ms ease-out" }
          }
        >
          &ldquo;In stillness, Java reveals itself.&rdquo;
        </p>
      </section>
    </BatikWatermark>
  );
}

/* ---------- Tiered Preview ---------- */
function TieredPreview() {
  const tiers = [
    { name: "Classic", desc: "Core destinations only.", from: "Rp 1.500.000/pax" },
    {
      name: "Signature",
      desc: "Our most recommended, with added heritage stops.",
      from: "Rp 2.000.000/pax",
      featured: true,
    },
    { name: "VIP", desc: "Full experience with premium add-ons.", from: "Rp 3.000.000/pax" },
  ];
  return (
    <section className="bg-ivory py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal max-w-3xl leading-tight">
            Classic, Signature, or VIP — <GoldItalic>You Decide</GoldItalic>
          </h2>
          <p className="mt-4 text-charcoal/70 max-w-xl">
            Every tier includes your private EV, driver, and curated stops.
          </p>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 120}>
              <div
                className={`relative p-8 h-full bg-white border transition-transform duration-300 hover:scale-[1.02] ${
                  t.featured ? "border-gold shadow-[0_20px_50px_-30px_rgba(201,169,110,0.6)] md:-mt-4 md:pb-12" : "border-bronze/20"
                }`}
              >
                {t.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-indigo text-[10px] tracking-[0.25em] uppercase px-3 py-1">
                    Most Recommended
                  </span>
                )}
                <p className="text-xs uppercase tracking-widest text-gold">Tier</p>
                <h3 className="mt-2 font-serif text-3xl text-charcoal">{t.name}</h3>
                <p className="mt-3 text-sm text-charcoal/70">{t.desc}</p>
                <div className="mt-8 pt-6 border-t border-bronze/20">
                  <p className="text-xs uppercase tracking-widest text-charcoal/50">Starting from</p>
                  <p className="mt-1 font-serif text-2xl text-charcoal">{t.from}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-charcoal border-b border-gold pb-1 hover:text-gold transition"
          >
            Compare All Tiers →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */
// DO NOT populate with fabricated names, quotes, or statistics — verified guest data only
function Testimonials() {
  return (
    <BatikBg>
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="font-serif text-4xl md:text-5xl text-ivory">Guest Stories</h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-1">
            <Reveal>
              <figure className="h-full p-10 md:p-14 border border-gold/20 bg-indigo/30 text-center max-w-3xl mx-auto">
                <svg
                  width="28"
                  height="20"
                  viewBox="0 0 28 20"
                  fill="#C9A96E"
                  aria-hidden="true"
                  className="mx-auto"
                >
                  <path d="M0 20V10C0 4.5 4 0 10 0v4C6.7 4 4 6.7 4 10h6v10H0zm18 0V10c0-5.5 4-10 10-10v4c-3.3 0-6 2.7-6 6h6v10H18z" />
                </svg>
                <blockquote className="mt-6 font-serif italic text-xl md:text-2xl text-ivory leading-relaxed">
                  Our first journeys are just getting started — real guest stories will appear here
                  soon.
                </blockquote>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>
    </BatikBg>
  );
}

/* ---------- Founding Guest ---------- */
function FoundingBanner() {
  return (
    <BatikBg className="border-y border-gold/10">
      <section className="py-14 px-6">
        <Reveal>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-gold mb-2">Limited</p>
              <h2 className="font-serif text-3xl md:text-4xl text-ivory">
                Be Among Our First 30 Guests
              </h2>
              <p className="mt-2 text-ivory/70 max-w-xl text-sm">
                15% off your journey, reserved for early travelers who share their experience
                afterward.
              </p>
            </div>
            <WhatsAppCTA message="Hi Agni Aksa — I'd like to claim the Founding Guest 15% off." />
          </div>
        </Reveal>
      </section>
    </BatikBg>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const items = [
    {
      q: "How far in advance should I book?",
      a: "Ideally two to three weeks. Sunrise slots and multi-day arrangements confirm faster when the fleet and drivers can be secured early.",
    },
    {
      q: "What is included in every tier?",
      a: "Private EV (when available, always premium-class), English-speaking driver, hotel pickup and drop, mineral water, and entrance coordination.",
    },
    {
      q: "Can we customize the itinerary?",
      a: "Yes. We tailor cadence, stops, meal preferences and pacing over WhatsApp before your arrival.",
    },
    {
      q: "How do we pay?",
      a: "Bank transfer or accepted digital payment before your first day. No online checkout — arrangements are confirmed one-to-one on WhatsApp.",
    },
    {
      q: "Do you offer transport-only services (not just full-day tours)?",
      a: "Yes — airport transfers and long-distance transfers to Bromo, Karimunjawa and Bali are available.",
    },
    {
      q: "What happens if the EV fleet is unavailable for my date?",
      a: "You'll be upgraded to an equivalent premium-class vehicle at no extra cost. We'll notify you before your journey begins.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <BatikBg>
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">
              Questions Before You Arrive?
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-ivory">
              Everything, <GoldItalic>Arranged in Advance</GoldItalic>
            </h2>
          </Reveal>
          <div className="mt-12 border-t border-ivory/10">
            {items.map((it, i) => (
              <AccordionItem
                key={it.q}
                q={it.q}
                a={it.a}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            ))}
          </div>
          <Reveal>
            <div className="mt-14 pt-10 border-t border-ivory/10 text-center">
              <p className="text-ivory/80 mb-6 max-w-lg mx-auto">
                Still have questions? Reach out directly — we'll walk you through it.
              </p>
              <WhatsAppCTA message="Hi Agni Aksa — I have a question about your tours." />
            </div>
          </Reveal>
        </div>
      </section>
    </BatikBg>
  );
}

function AccordionItem({
  q,
  a,
  isOpen,
  onToggle,
}: {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-ivory/10">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-6 py-6 text-left group"
      >
        <span className="font-serif text-lg md:text-xl text-ivory group-hover:text-gold transition">
          {q}
        </span>
        <span
          className={`text-gold text-xl transition-transform duration-300 ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-ivory/70 leading-relaxed max-w-2xl">{a}</p>
        </div>
      </div>
    </div>
  );
}
