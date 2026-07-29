import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { waLink } from "@/lib/site";
import footerImg from "@/assets/footer-prambanan.jpg";

/* ---------- Reveal on scroll ---------- */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  const Component = Tag as any;
  return (
    <Component
      ref={ref}
      className={`reveal ${visible ? "reveal-in" : ""} ${className}`}
    >
      {children}
    </Component>
  );
}

/* ---------- Count-up ---------- */
export function CountUp({
  end,
  decimals = 0,
  duration = 1400,
  suffix = "",
  prefix = "",
}: {
  end: number;
  decimals?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(end * eased);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [end, duration]);
  return (
    <span ref={ref}>
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ---------- Animated number tween (for live price changes) ---------- */
export function TweenNumber({ value, className = "" }: { value: number; className?: string }) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);
  useEffect(() => {
    const from = prev.current;
    const to = value;
    if (from === to) return;
    const start = performance.now();
    const dur = 450;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
      else prev.current = to;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <span className={className}>Rp {display.toLocaleString("id-ID")}</span>;
}

/* ---------- Skyline divider (stupa + spire silhouette) ---------- */
export function Skyline({
  variant = "dark-on-light",
  className = "",
}: {
  variant?: "dark-on-light" | "light-on-dark" | "gold";
  className?: string;
}) {
  const stroke =
    variant === "gold" ? "#C9A96E" : variant === "light-on-dark" ? "#C9A96E" : "#8C7355";
  return (
    <svg
      viewBox="0 0 1400 80"
      preserveAspectRatio="none"
      className={`w-full h-10 md:h-14 ${className}`}
      aria-hidden="true"
    >
      <line x1="0" y1="70" x2="1400" y2="70" stroke={stroke} strokeWidth="0.6" opacity="0.6" />
      {/* stupas + prambanan spires alternating */}
      <g fill="none" stroke={stroke} strokeWidth="1.2" opacity="0.9">
        {/* Prambanan spire */}
        <path d="M100 70 L100 40 L108 34 L108 24 L112 20 L116 24 L116 34 L124 40 L124 70 Z" />
        {/* Small stupa */}
        <path d="M200 70 Q200 55 215 55 Q230 55 230 70 M215 55 L215 46 L213 44 L217 44 L215 46" />
        {/* Borobudur bell stupa */}
        <path d="M330 70 Q330 48 355 48 Q380 48 380 70 M355 48 L355 36 L350 33 L360 33 L355 30 L355 26" />
        {/* Prambanan tall */}
        <path d="M470 70 L470 30 L482 22 L482 12 L488 6 L494 12 L494 22 L506 30 L506 70 Z" />
        {/* stupa */}
        <path d="M600 70 Q600 55 615 55 Q630 55 630 70 M615 55 L615 44" />
        {/* bell stupa */}
        <path d="M720 70 Q720 50 742 50 Q764 50 764 70 M742 50 L742 38 L738 35 L746 35 L742 32 L742 28" />
        {/* Prambanan mid */}
        <path d="M870 70 L870 38 L880 32 L880 22 L884 18 L888 22 L888 32 L898 38 L898 70 Z" />
        {/* small stupa */}
        <path d="M980 70 Q980 58 992 58 Q1004 58 1004 70 M992 58 L992 50" />
        {/* stupa */}
        <path d="M1080 70 Q1080 52 1100 52 Q1120 52 1120 70 M1100 52 L1100 42 L1097 40 L1103 40 L1100 38 L1100 34" />
        {/* Prambanan */}
        <path d="M1220 70 L1220 34 L1232 26 L1232 16 L1238 10 L1244 16 L1244 26 L1256 34 L1256 70 Z" />
        {/* end small stupa */}
        <path d="M1330 70 Q1330 58 1342 58 Q1354 58 1354 70 M1342 58 L1342 50" />
      </g>
    </svg>
  );
}

/* ---------- Floating WhatsApp button ---------- */
export function WhatsAppFab({ message }: { message: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className={`group fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-gold text-indigo shadow-lg transition-all duration-500 ease-out ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      } px-4 py-4 md:hover:scale-[1.03]`}
      style={{ boxShadow: "0 10px 30px -10px rgba(27,31,59,0.4)" }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 2.1.55 4.14 1.6 5.94L2 22l4.28-1.12a9.9 9.9 0 0 0 5.76 1.83h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.87 9.87 0 0 0 12.04 2Zm5.77 14.02c-.25.7-1.42 1.3-2.02 1.4-.52.08-1.18.11-1.9-.12-.44-.14-1-.32-1.72-.63-3.02-1.3-4.99-4.34-5.14-4.54-.15-.2-1.24-1.65-1.24-3.14 0-1.5.78-2.23 1.06-2.53.28-.3.6-.38.8-.38h.58c.18 0 .43-.07.68.52.25.6.85 2.08.93 2.23.08.15.13.33.02.53-.1.2-.16.32-.32.5-.15.18-.33.4-.47.53-.15.15-.32.32-.14.63.18.3.8 1.33 1.72 2.16 1.18 1.05 2.18 1.38 2.48 1.53.3.15.48.13.66-.08.18-.2.75-.88.95-1.18.2-.3.4-.25.68-.15.28.1 1.75.82 2.05.98.3.15.5.22.58.35.08.13.08.75-.17 1.45Z" />
      </svg>
      <span className="hidden md:inline-block max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-300 group-hover:max-w-[180px] group-hover:ml-1">
        Chat on WhatsApp
      </span>
    </a>
  );
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

/* ---------- Batik dark background wrapper ---------- */
export function BatikBg({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative bg-indigo text-ivory overflow-hidden ${className}`}>
      <div className="absolute inset-0 batik-bg pointer-events-none" aria-hidden="true" />
      <div className="relative">{children}</div>
    </div>
  );
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
  const imgRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const onScroll = () => {
      const el = imgRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const offset = Math.max(-100, Math.min(100, (window.innerHeight - rect.top) * 0.15));
      el.style.transform = `translate3d(0, ${-offset * 0.4}px, 0) scale(1.15)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <footer className="relative bg-indigo text-ivory overflow-hidden">
      <div className="relative h-[420px] md:h-[520px] overflow-hidden">
        <div ref={imgRef} className="absolute inset-0 will-change-transform">
          <img
            src={footerImg}
            alt="Prambanan at sunset"
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-indigo/40 via-indigo/60 to-indigo" />
        </div>
        <div className="relative h-full flex items-end pb-16 px-6">
          <div className="max-w-6xl mx-auto w-full">
            <p className="font-serif italic text-3xl md:text-5xl text-ivory max-w-2xl leading-tight">
              Every detail considered. Every journey, yours.
            </p>
          </div>
        </div>
      </div>
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