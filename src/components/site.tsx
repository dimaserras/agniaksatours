import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { waLink } from "@/lib/site";
import {
  BatikWatermark,
  CountUp,
  ParallaxImage,
  ScrollReveal,
  SectionDivider,
  StickyWhatsAppButton,
} from "@/components/motion";
import footerImg from "@/assets/footer-prambanan.jpg";

/* ---------- Legacy aliases -> shared motion library (src/components/motion.tsx) ---------- */
export const Reveal = ({
  children,
  delay = 0,
  as,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
}) => (
  <ScrollReveal delay={delay} as={as} className={className}>
    {children}
  </ScrollReveal>
);

export { CountUp };

/** Live-tweening IDR price (kept for existing pricing UI). */
export function TweenNumber({ value, className = "" }: { value: number; className?: string }) {
  return <CountUp value={value} locale="id-ID" prefix="Rp " className={className} />;
}

/* ---------- Skyline divider (alias of SectionDivider) ---------- */
export function Skyline({
  variant = "dark-on-light",
  className = "",
}: {
  variant?: "dark-on-light" | "light-on-dark" | "gold";
  className?: string;
}) {
  return (
    <SectionDivider tone={variant === "dark-on-light" ? "bronze" : "gold"} className={className} />
  );
}

/* ---------- Floating WhatsApp button (alias of StickyWhatsAppButton) ---------- */
export function WhatsAppFab({ message }: { message: string }) {
  return <StickyWhatsAppButton message={message} />;
}

/* ---------- Primary WhatsApp CTA (inline) ---------- */
export function WhatsAppCTA({
  message,
  variant = "gold",
  className = "",
  children = "Chat on WhatsApp",
}: {
  message: string;
  variant?: "gold" | "outline";
  className?: string;
  children?: ReactNode;
}) {
  const base =
    "inline-flex items-center gap-2 px-7 py-3.5 text-sm tracking-wide font-medium transition-all duration-300 ease-out";
  const styles =
    variant === "gold"
      ? "bg-gold text-indigo hover:scale-[1.02] hover:brightness-105"
      : "border border-gold text-gold hover:bg-gold hover:text-indigo hover:scale-[1.02]";
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noreferrer"
      className={`${base} ${styles} ${className}`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 2.1.55 4.14 1.6 5.94L2 22l4.28-1.12a9.9 9.9 0 0 0 5.76 1.83h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.87 9.87 0 0 0 12.04 2Z" />
      </svg>
      {children}
    </a>
  );
}

/* ---------- Batik dark background wrapper (alias of BatikWatermark) ---------- */
export function BatikBg({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <BatikWatermark className={className}>{children}</BatikWatermark>;
}

/* ---------- Italic gold accent word helper ---------- */
export function GoldItalic({ children }: { children: ReactNode }) {
  return <em className="italic font-normal text-gold not-italic-fallback">{children}</em>;
}

/* ---------- Shared "Beyond Jogja" grid (reused on both pages) ---------- */
import volcano from "@/assets/beyond-volcano.jpg";
import dieng from "@/assets/beyond-dieng.jpg";
import airport from "@/assets/beyond-airport.jpg";
import bromo from "@/assets/beyond-bromo.jpg";
import karimun from "@/assets/beyond-karimunjawa.jpg";
import bali from "@/assets/beyond-bali.jpg";
import { formatIDR, PRICING } from "@/lib/site";

const beyondImages: Record<string, string> = {
  volcano,
  dieng,
  airport,
  bromo,
  karimunjawa: karimun,
  bali,
};

export function BeyondJogja() {
  return (
    <section className="bg-ivory py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-4xl md:text-5xl text-charcoal max-w-3xl">
            Beyond the Hero Routes
          </h2>
          <p className="mt-4 text-charcoal/70 max-w-2xl">
            Nature escapes, cave adventures, and volcano views — for travelers with time to go
            further.
          </p>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRICING.beyond.map((item, i) => (
            <Reveal key={item.key} delay={i * 80}>
              <BeyondCard
                image={beyondImages[item.key]}
                title={item.title}
                price={`Starting from ${formatIDR(item.price)}/${item.unit}`}
                waMessage={`Hi Agni Aksa — I'd like to book: ${item.title}.`}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BeyondCard({
  image,
  title,
  price,
  waMessage,
}: {
  image: string;
  title: string;
  price: string;
  waMessage: string;
}) {
  return (
    <a
      href={waLink(waMessage)}
      target="_blank"
      rel="noreferrer"
      className="group block bg-white border border-bronze/15 overflow-hidden"
    >
      <div className="relative aspect-[5/4] overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="relative p-6">
        <h3 className="text-xl text-charcoal">{title}</h3>
        <p className="mt-1 text-sm text-bronze">{price}</p>
        <div className="mt-4 max-h-0 opacity-0 overflow-hidden transition-all duration-300 group-hover:max-h-10 group-hover:opacity-100">
          <span className="inline-block text-xs tracking-widest uppercase text-gold border-b border-gold pb-0.5">
            Book →
          </span>
        </div>
      </div>
    </a>
  );
}

/* ---------- Shared footer ---------- */
export function SiteFooter() {
  return (
    <footer className="relative bg-indigo text-ivory overflow-hidden">
      <ParallaxImage
        src={footerImg}
        alt="Prambanan temple silhouetted at sunset"
        speed={0.3}
        className="h-[420px] md:h-[520px]"
        overlay={
          <div className="absolute inset-0 bg-gradient-to-b from-indigo/40 via-indigo/60 to-indigo" />
        }
      >
        <div className="relative h-full flex items-end pb-16 px-6">
          <div className="max-w-6xl mx-auto w-full">
            <p className="font-serif italic text-3xl md:text-5xl text-ivory max-w-2xl leading-tight">
              Every detail considered. Every journey, yours.
            </p>
          </div>
        </div>
      </ParallaxImage>
      <div className="relative bg-indigo px-6 pt-16 pb-10">
        <div className="absolute inset-0 batik-bg pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <p className="font-serif text-2xl text-ivory">Agni Aksa Tours</p>
            <p className="mt-2 text-sm text-ivory/60 max-w-sm">
              Private, chauffeured EV touring across Yogyakarta and Central Java.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-gold mb-3">Explore</p>
            <ul className="space-y-2 text-sm text-ivory/80">
              <li><Link to="/" className="hover:text-gold transition">Home</Link></li>
              <li><Link to="/packages" className="hover:text-gold transition">Packages</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-gold mb-3">Contact</p>
            <ul className="space-y-2 text-sm text-ivory/80">
              <li>
                <a
                  href={waLink("Hi Agni Aksa — I have a question.")}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-gold transition"
                >
                  WhatsApp
                </a>
              </li>
              <li>Yogyakarta, Indonesia</li>
            </ul>
          </div>
        </div>
        <div className="relative max-w-6xl mx-auto mt-12 pt-6 border-t border-ivory/10 text-xs text-ivory/50 flex flex-wrap gap-4 justify-between">
          <span>© 2026 Agni Aksa Tours · Yogyakarta, Indonesia</span>
          <span>Curated in silence.</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Site header (minimal) ---------- */
export function SiteHeader({ variant = "light" }: { variant?: "light" | "dark" }) {
  const isDark = variant === "dark";
  return (
    <header
      className={`absolute top-0 left-0 right-0 z-40 px-6 md:px-10 py-6 flex items-center justify-between ${
        isDark ? "text-ivory" : "text-charcoal"
      }`}
    >
      <Link to="/" className="flex items-center gap-3">
        <svg width="26" height="26" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <path
            d="M20 4 L26 14 L34 18 L28 26 L28 34 L20 30 L12 34 L12 26 L6 18 L14 14 Z"
            stroke="#C9A96E"
            strokeWidth="1.4"
          />
        </svg>
        <span className="font-serif text-lg tracking-wide">Agni Aksa</span>
      </Link>
      <nav className="flex items-center gap-8 text-sm">
        <Link to="/" className="hover:text-gold transition" activeProps={{ className: "text-gold" }}>
          Home
        </Link>
        <Link to="/packages" className="hover:text-gold transition" activeProps={{ className: "text-gold" }}>
          Packages
        </Link>
      </nav>
    </header>
  );
}

// keep imports clean for waLink used above
import { waLink as _wl } from "@/lib/site";
void _wl;