import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import tripDay from "@/assets/trip-day.jpg";
import tripMulti from "@/assets/trip-multi.jpg";
import clusterBoro from "@/assets/cluster-borobudur.jpg";
import clusterPramb from "@/assets/cluster-prambanan.jpg";
import {
  BatikBg,
  BeyondJogja,
  GoldItalic,
  Reveal,
  SiteFooter,
  SiteHeader,
  Skyline,
  TweenNumber,
  WhatsAppCTA,
  WhatsAppFab,
} from "@/components/site";
import { formatIDR, tierPerPax, waLink } from "@/lib/site";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Packages — Agni Aksa Tours" },
      {
        name: "description",
        content:
          "Choose your journey. Two heritage clusters, three tiers each — Classic, Signature, VIP. Private EV touring across Yogyakarta.",
      },
      { property: "og:title", content: "Packages — Agni Aksa Tours" },
      {
        property: "og:description",
        content:
          "Two heritage clusters, three tiers each. Simple to choose, precisely delivered.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PackagesPage,
});

type TripType = null | "day" | "multi";
type Tier = "Classic" | "Signature" | "VIP";

function PackagesPage() {
  const [tripType, setTripType] = useState<TripType>(null);
  const [cluster, setCluster] = useState<"boro" | "pramb" | null>(null);
  const [days, setDays] = useState<number | null>(null);
  const [tier, setTier] = useState<Tier>("Signature");
  const [guests, setGuests] = useState<number>(2);

  const perPax = useMemo(
    () => (guests >= 7 ? 0 : tierPerPax(tier, guests)),
    [tier, guests]
  );
  const subtotal = perPax * guests;

  const contextLine = (() => {
    const parts: string[] = [];
    if (tripType === "day") parts.push("Day Trip");
    if (tripType === "multi") parts.push(`Multi-Day (${days ?? "?"} days)`);
    if (cluster) parts.push(cluster === "boro" ? "Borobudur & the Misty North" : "Prambanan, Kraton & Tamansari");
    parts.push(`Tier: ${tier}`, `Guests: ${guests}`);
    return parts.join(" · ");
  })();

  return (
    <div className="bg-ivory">
      <WhatsAppFab message={`Hi Agni Aksa — I'd like to book. ${contextLine}`} />
      <PackageHero />
      <TripTypeSelector tripType={tripType} setTripType={setTripType} />
      {tripType === "day" && (
        <ClusterSelector cluster={cluster} setCluster={setCluster} />
      )}
      {tripType === "multi" && <DaysSelector days={days} setDays={setDays} />}
      <TierSelection
        tier={tier}
        setTier={setTier}
        guests={guests}
        setGuests={setGuests}
        perPax={perPax}
        subtotal={subtotal}
        contextLine={contextLine}
      />
      <BeyondJogja />
      <PackagesFAQ />
      <SiteFooter />
    </div>
  );
}

/* ---------- Header ---------- */
function PackageHero() {
  return (
    <section className="relative bg-indigo text-ivory pt-32 pb-24 md:pt-40 md:pb-32 px-6 overflow-hidden">
      <div className="absolute inset-0 batik-bg pointer-events-none" aria-hidden />
      <SiteHeader variant="dark" />
      <div className="relative max-w-5xl mx-auto text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-gold mb-6">Packages</p>
        <h1 className="font-serif text-5xl md:text-7xl leading-[1.05]">
          Find the Journey <br />
          That <GoldItalic>Fits You</GoldItalic>
        </h1>
        <p className="mt-6 text-ivory/70 max-w-2xl mx-auto text-lg">
          Two heritage clusters, three tiers each. Simple to choose, precisely delivered.
        </p>
      </div>
      <Skyline variant="gold" className="mt-20" />
    </section>
  );
}

/* ---------- Trip Type ---------- */
function TripTypeSelector({
  tripType,
  setTripType,
}: {
  tripType: TripType;
  setTripType: (t: TripType) => void;
}) {
  const cards = [
    {
      key: "day" as const,
      title: "Day Trip",
      body: "One focused day, fully arranged. Choose your cluster and tier.",
      img: tripDay,
    },
    {
      key: "multi" as const,
      title: "Multi-Day Trip",
      body: "Stay longer, see more. Choose your days and tier — we arrange the rest.",
      img: tripMulti,
    },
  ];
  return (
    <section className="bg-ivory py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal">
            How Would You <GoldItalic>Like to Explore?</GoldItalic>
          </h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((c, i) => {
            const isSelected = tripType === c.key;
            const isOther = tripType !== null && !isSelected;
            return (
              <Reveal key={c.key} delay={i * 100}>
                <button
                  onClick={() => setTripType(isSelected ? null : c.key)}
                  className={`group relative w-full text-left overflow-hidden border transition-all duration-500 hover:scale-[1.01] ${
                    isSelected
                      ? "border-gold shadow-[0_20px_50px_-30px_rgba(201,169,110,0.6)]"
                      : "border-bronze/20"
                  } ${isOther ? "opacity-40" : "opacity-100"}`}
                >
                  <div className="relative aspect-[5/3] overflow-hidden">
                    <img
                      src={c.img}
                      alt={c.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[1000ms] group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent" />
                    {isSelected && (
                      <span className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gold text-indigo grid place-items-center text-sm">✓</span>
                    )}
                  </div>
                  <div className="p-6 bg-white">
                    <h3 className="font-serif text-2xl text-charcoal">{c.title}</h3>
                    <p className="mt-2 text-sm text-charcoal/70">{c.body}</p>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Cluster ---------- */
function ClusterSelector({
  cluster,
  setCluster,
}: {
  cluster: "boro" | "pramb" | null;
  setCluster: (c: "boro" | "pramb" | null) => void;
}) {
  const cards = [
    {
      key: "boro" as const,
      img: clusterBoro,
      title: "Borobudur & the Misty North",
      subtitle: "Sunrise silence, ancient stone, and Selogriyo hidden in the hills.",
    },
    {
      key: "pramb" as const,
      img: clusterPramb,
      title: "Prambanan, Kraton & Tamansari",
      subtitle: "Yogyakarta's living culture in one carefully paced day.",
    },
  ];
  return (
    <BatikBg>
      <section className="py-24 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="font-serif text-3xl md:text-4xl text-ivory">
              Choose Your <GoldItalic>Direction</GoldItalic>
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map((c, i) => {
              const isSelected = cluster === c.key;
              const isDim = cluster !== null && !isSelected;
              return (
                <Reveal key={c.key} delay={i * 120}>
                  <button
                    onClick={() => setCluster(isSelected ? null : c.key)}
                    className={`group relative w-full text-left overflow-hidden border transition-all duration-500 ${
                      isSelected ? "border-gold" : "border-gold/20"
                    } ${isDim ? "opacity-50" : "opacity-100"}`}
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={c.img} alt={c.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[1000ms]" />
                    </div>
                    {isSelected && (
                      <span className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gold text-indigo grid place-items-center text-sm">✓</span>
                    )}
                    <div className="p-6">
                      <h3 className="font-serif text-2xl text-ivory">{c.title}</h3>
                      <p className="mt-2 text-sm text-ivory/70">{c.subtitle}</p>
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </BatikBg>
  );
}

/* ---------- Days ---------- */
function DaysSelector({
  days,
  setDays,
}: {
  days: number | null;
  setDays: (d: number | null) => void;
}) {
  const opts = [1, 2, 3, 4, 5, 6, 7];
  return (
    <BatikBg>
      <section className="py-24 md:py-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="font-serif text-3xl md:text-4xl text-ivory">
              Choose Your <GoldItalic>Days</GoldItalic>
            </h2>
          </Reveal>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {opts.map((d) => {
              const isSelected = days === d;
              const label = d === 7 ? "7+" : `${d}`;
              return (
                <button
                  key={d}
                  onClick={() => setDays(d)}
                  className={`relative overflow-hidden px-6 py-3 border transition-all duration-500 min-w-[60px] ${
                    isSelected
                      ? "bg-gold text-indigo border-gold"
                      : "border-gold/30 text-ivory hover:border-gold"
                  }`}
                >
                  <span className="relative z-10 font-serif text-lg">{label}</span>
                </button>
              );
            })}
          </div>
          <p
            className={`mt-8 text-ivory/70 text-sm transition-opacity duration-500 ${
              (days ?? 0) >= 3 ? "opacity-100" : "opacity-0"
            }`}
          >
            Your itinerary will be tailored across multiple clusters — arranged by our team.
          </p>
        </div>
      </section>
    </BatikBg>
  );
}

/* ---------- Tier + Guests ---------- */
function TierSelection({
  tier,
  setTier,
  guests,
  setGuests,
  perPax,
  subtotal,
  contextLine,
}: {
  tier: Tier;
  setTier: (t: Tier) => void;
  guests: number;
  setGuests: (g: number) => void;
  perPax: number;
  subtotal: number;
  contextLine: string;
}) {
  const tiers: {
    name: Tier;
    desc: string;
    bullets: string[];
    featured?: boolean;
  }[] = [
    {
      name: "Classic",
      desc: "Core destinations only.",
      bullets: ["Private EV & driver", "Core heritage stops", "Hotel pickup & drop"],
    },
    {
      name: "Signature",
      desc: "Our most recommended, with added heritage stops.",
      bullets: ["Everything in Classic", "Added heritage stops", "Curated local lunch"],
      featured: true,
    },
    {
      name: "VIP",
      desc: "The full experience with premium add-ons.",
      bullets: ["Everything in Signature", "Jeep & VW upgrades", "Sunrise & culinary add-ons"],
    },
  ];
  return (
    <section className="bg-ivory py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal">
            Classic, Signature, or VIP — <GoldItalic>You Decide</GoldItalic>
          </h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((t, i) => {
            const isSelected = tier === t.name;
            return (
              <Reveal key={t.name} delay={i * 120}>
                <button
                  onClick={() => setTier(t.name)}
                  className={`relative w-full text-left p-8 h-full bg-white border transition-all duration-300 hover:scale-[1.02] ${
                    isSelected
                      ? "border-gold shadow-[0_20px_50px_-30px_rgba(201,169,110,0.6)]"
                      : "border-bronze/20"
                  } ${t.featured ? "md:-mt-4 md:pb-12" : ""}`}
                >
                  {t.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-indigo text-[10px] tracking-[0.25em] uppercase px-3 py-1">
                      Most Recommended
                    </span>
                  )}
                  <p className="text-xs uppercase tracking-widest text-gold">Tier</p>
                  <h3 className="mt-2 font-serif text-3xl text-charcoal">{t.name}</h3>
                  <p className="mt-3 text-sm text-charcoal/70">{t.desc}</p>
                  <ul className="mt-6 pt-6 border-t border-bronze/20 space-y-2 text-sm text-charcoal/80">
                    {t.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="text-gold">·</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </button>
              </Reveal>
            );
          })}
        </div>

        {/* Guest stepper + live pricing */}
        <Reveal>
          <div className="mt-14 p-8 md:p-10 bg-indigo text-ivory relative overflow-hidden">
            <div className="absolute inset-0 batik-bg pointer-events-none" aria-hidden />
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div>
                <p className="text-xs uppercase tracking-widest text-gold mb-2">Guests</p>
                {guests < 7 ? (
                  <div className="flex items-center gap-4">
                    <StepBtn onClick={() => setGuests(Math.max(1, guests - 1))} disabled={guests <= 1}>–</StepBtn>
                    <span className="font-serif text-4xl w-10 text-center">{guests}</span>
                    <StepBtn onClick={() => setGuests(Math.min(7, guests + 1))}>+</StepBtn>
                  </div>
                ) : (
                  <a
                    href={waLink("Hi Agni Aksa — I have a group of 7 or more travelers.")}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block px-5 py-3 bg-gold text-indigo text-sm tracking-wide"
                  >
                    Contact Us for Groups
                  </a>
                )}
                {guests < 7 && (
                  <button
                    onClick={() => setGuests(7)}
                    className="mt-3 block text-xs text-ivory/60 hover:text-gold underline underline-offset-4"
                  >
                    7+ travelers?
                  </button>
                )}
              </div>
              <div className="md:text-center">
                <p className="text-xs uppercase tracking-widest text-gold mb-2">Per traveler</p>
                {guests < 7 ? (
                  <p className="font-serif text-4xl">
                    <TweenNumber value={perPax} />
                  </p>
                ) : (
                  <p className="font-serif text-2xl text-ivory/70">Handled directly</p>
                )}
                <p className="text-xs text-ivory/50 mt-1">
                  {tier} · {guests < 7 ? bracketLabel(guests) : "Multi-vehicle"}
                </p>
              </div>
              <div className="md:text-right">
                <p className="text-xs uppercase tracking-widest text-gold mb-2">Subtotal</p>
                {guests < 7 ? (
                  <>
                    <p className="font-serif text-4xl">
                      <TweenNumber value={subtotal} />
                    </p>
                    <p className="text-xs text-ivory/50 mt-1">{guests} × {formatIDR(perPax)}</p>
                  </>
                ) : (
                  <p className="font-serif text-2xl text-ivory/70">On request</p>
                )}
              </div>
            </div>
            <div className="relative mt-10 pt-8 border-t border-ivory/10 flex justify-center">
              <WhatsAppCTA message={`Hi Agni Aksa — I'd like to book. ${contextLine}`} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StepBtn({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-10 h-10 border border-gold text-gold text-xl grid place-items-center hover:bg-gold hover:text-indigo transition disabled:opacity-30 disabled:pointer-events-none"
    >
      {children}
    </button>
  );
}

function bracketLabel(g: number) {
  if (g <= 2) return "1–2 pax";
  if (g <= 4) return "3–4 pax";
  return "5–6 pax";
}

/* ---------- FAQ ---------- */
function PackagesFAQ() {
  const items = [
    {
      q: "How far in advance should I book?",
      a: "Two to three weeks is ideal — sunrise slots and multi-day arrangements confirm faster with time.",
    },
    {
      q: "Can we customize the itinerary?",
      a: "Yes. Pacing, meal preferences, and stops are all tailored over WhatsApp before your arrival.",
    },
    {
      q: "How do we pay?",
      a: "Bank transfer or accepted digital payment before your first day. No online checkout.",
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
            <h2 className="font-serif text-3xl md:text-4xl text-ivory">
              A Few <GoldItalic>Essentials</GoldItalic>
            </h2>
          </Reveal>
          <div className="mt-12 border-t border-ivory/10">
            {items.map((it, i) => (
              <div key={it.q} className="border-b border-ivory/10">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                >
                  <span className="font-serif text-lg md:text-xl text-ivory group-hover:text-gold transition">
                    {it.q}
                  </span>
                  <span className={`text-gold text-xl transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}>+</span>
                </button>
                <div className={`grid transition-all duration-300 ease-in-out ${open === i ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="text-ivory/70 leading-relaxed max-w-2xl">{it.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href="/#faq"
              className="text-sm text-ivory/70 tracking-widest uppercase border-b border-gold/50 pb-1 hover:text-gold transition"
            >
              View All FAQs →
            </a>
          </div>
        </div>
      </section>
    </BatikBg>
  );
}