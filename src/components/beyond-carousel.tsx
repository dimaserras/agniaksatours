import { useCallback, useEffect, useRef, useState } from "react";
import { waLink, PRICING } from "@/lib/site";
import { PRICING_IS_FINAL, PRICING_DISCLAIMER, startingFromLabel } from "@/lib/pricing.config";
import { ScrollReveal } from "@/components/motion";
import { GoldItalic } from "@/components/site";
import volcano from "@/assets/beyond-volcano.jpg";
import dieng from "@/assets/beyond-dieng.jpg";
import airport from "@/assets/beyond-airport.jpg";
import bromo from "@/assets/beyond-bromo.jpg";
import karimun from "@/assets/beyond-karimunjawa.jpg";
import bali from "@/assets/beyond-bali.jpg";

const images: Record<string, string> = {
  volcano,
  dieng,
  airport,
  bromo,
  karimunjawa: karimun,
  bali,
};

/**
 * Homepage teaser carousel (2–3 cards visible). The full 6-card grid lives on /packages.
 * Native horizontal scroll = free swipe/drag on touch; arrows scroll one card with easing.
 */
export function BeyondJogjaCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    sync();
  }, [sync]);

  const nudge = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="bg-ivory py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl text-charcoal max-w-2xl leading-tight">
                Beyond the <GoldItalic>Hero Routes</GoldItalic>
              </h2>
              <p className="mt-4 text-charcoal/70 max-w-xl">
                Nature escapes, cave adventures, and volcano views. For travelers with time to go
                further.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <CarouselArrow dir="prev" disabled={atStart} onClick={() => nudge(-1)} />
              <CarouselArrow dir="next" disabled={atEnd} onClick={() => nudge(1)} />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal staggerDelay={90} className="mt-12">
          <div
            ref={trackRef}
            onScroll={sync}
            className="flex gap-6 overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {PRICING.beyond.map((item, i) => (
              <BeyondNumberedCard
                key={item.key}
                index={i + 1}
                image={images[item.key]}
                title={item.title}
                price={startingFromLabel(item.price, item.unit)}
              />
            ))}
          </div>
        </ScrollReveal>

        {!PRICING_IS_FINAL && (
          <p className="mt-4 text-xs text-charcoal/50">{PRICING_DISCLAIMER}</p>
        )}
      </div>
    </section>
  );
}

function CarouselArrow({
  dir,
  disabled,
  onClick,
}: {
  dir: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Previous destinations" : "Next destinations"}
      className="h-11 w-11 border border-bronze/40 text-charcoal flex items-center justify-center transition-all duration-300 hover:border-gold hover:text-gold disabled:opacity-30 disabled:hover:border-bronze/40 disabled:hover:text-charcoal"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d={dir === "prev" ? "M10 3 L5 8 L10 13" : "M6 3 L11 8 L6 13"}
          stroke="currentColor"
          strokeWidth="1.3"
        />
      </svg>
    </button>
  );
}

function BeyondNumberedCard({
  index,
  image,
  title,
  price,
}: {
  index: number;
  image: string;
  title: string;
  price: string;
}) {
  return (
    <a
      data-card
      href={waLink(`Hi Agni Aksa — I'd like to arrange: ${title}.`)}
      target="_blank"
      rel="noreferrer"
      className="group shrink-0 w-[78%] sm:w-[46%] lg:w-[31%] bg-white border border-bronze/15"
    >
      <div className="relative aspect-[5/4] overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute top-4 left-4 font-serif text-2xl text-ivory drop-shadow-[0_1px_6px_rgba(27,31,59,0.8)]">
          {String(index).padStart(2, "0")}
        </span>
      </div>
      <div className="p-6">
        <h3 className="font-serif text-xl text-charcoal">{title}</h3>
        <p className="mt-1 text-sm text-bronze">Starting from {price}</p>
        <span className="mt-4 inline-block text-xs tracking-widest uppercase text-gold border-b border-gold/60 pb-0.5 transition group-hover:border-gold">
          Arrange It on WhatsApp
        </span>
      </div>
    </a>
  );
}
