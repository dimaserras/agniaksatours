import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { waLink } from "@/lib/site";

/* ============================================================
   Agni Aksa — shared animation & interaction library
   All motion respects prefers-reduced-motion: reduce.
   All scroll triggers use IntersectionObserver (no scroll listeners),
   except ParallaxImage which uses rAF gated by an observer.
   ============================================================ */

/* ---------- prefers-reduced-motion ---------- */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

/* ---------- useInView ---------- */
export function useInView<T extends HTMLElement>(
  threshold = 0.15,
  once = true
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) setInView(false);
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once]);
  return { ref, inView };
}

/* ---------- 1. SectionDivider — shared stupa + spire skyline ---------- */
export function SectionDivider({
  tone = "bronze",
  flip = false,
  className = "",
}: {
  /** bronze = on light backgrounds, gold = on indigo backgrounds */
  tone?: "bronze" | "gold";
  flip?: boolean;
  className?: string;
}) {
  const stroke = tone === "gold" ? "var(--color-gold)" : "var(--color-bronze)";
  return (
    <svg
      viewBox="0 0 1400 80"
      preserveAspectRatio="none"
      className={`w-full h-10 md:h-14 ${flip ? "rotate-180" : ""} ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <line x1="0" y1="70" x2="1400" y2="70" stroke={stroke} strokeWidth="0.6" opacity="0.6" />
      <g fill="none" stroke={stroke} strokeWidth="1.2" opacity="0.9">
        <path d="M100 70 L100 40 L108 34 L108 24 L112 20 L116 24 L116 34 L124 40 L124 70 Z" />
        <path d="M200 70 Q200 55 215 55 Q230 55 230 70 M215 55 L215 46 L213 44 L217 44 L215 46" />
        <path d="M330 70 Q330 48 355 48 Q380 48 380 70 M355 48 L355 36 L350 33 L360 33 L355 30 L355 26" />
        <path d="M470 70 L470 30 L482 22 L482 12 L488 6 L494 12 L494 22 L506 30 L506 70 Z" />
        <path d="M600 70 Q600 55 615 55 Q630 55 630 70 M615 55 L615 44" />
        <path d="M720 70 Q720 50 742 50 Q764 50 764 70 M742 50 L742 38 L738 35 L746 35 L742 32 L742 28" />
        <path d="M870 70 L870 38 L880 32 L880 22 L884 18 L888 22 L888 32 L898 38 L898 70 Z" />
        <path d="M980 70 Q980 58 992 58 Q1004 58 1004 70 M992 58 L992 50" />
        <path d="M1080 70 Q1080 52 1100 52 Q1120 52 1120 70 M1100 52 L1100 42 L1097 40 L1103 40 L1100 38 L1100 34" />
        <path d="M1220 70 L1220 34 L1232 26 L1232 16 L1238 10 L1244 16 L1244 26 L1256 34 L1256 70 Z" />
        <path d="M1330 70 Q1330 58 1342 58 Q1354 58 1354 70 M1342 58 L1342 50" />
      </g>
    </svg>
  );
}

/* ---------- 2. BatikWatermark — indigo section wrapper ---------- */
export function BatikWatermark({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "footer";
}) {
  const Component = Tag as any;
  return (
    <Component className={`relative bg-indigo text-ivory overflow-hidden ${className}`}>
      <div className="absolute inset-0 batik-bg pointer-events-none select-none" aria-hidden="true" />
      <div className="relative">{children}</div>
    </Component>
  );
}

/* ---------- 3. ScrollReveal ---------- */
export function ScrollReveal({
  children,
  delay = 0,
  staggerDelay,
  duration = 550,
  distance = 20,
  threshold = 0.15,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  /** delay before this element animates (ms) */
  delay?: number;
  /** when set, direct children animate in sequence with this gap (ms) */
  staggerDelay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLElement>(threshold);
  const Component = Tag as any;

  const style = (i: number): CSSProperties =>
    reduced
      ? {}
      : {
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : `translateY(${distance}px)`,
          transition: `opacity ${duration}ms cubic-bezier(0.16,1,0.3,1) ${
            delay + i * (staggerDelay ?? 0)
          }ms, transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${
            delay + i * (staggerDelay ?? 0)
          }ms`,
          willChange: "opacity, transform",
        };

  if (staggerDelay != null) {
    return (
      <Component ref={ref} className={className}>
        {Children.map(children, (child, i) =>
          isValidElement(child)
            ? cloneElement(child as any, {
                style: { ...(child as any).props?.style, ...style(i) },
              })
            : child
        )}
      </Component>
    );
  }

  return (
    <Component ref={ref} className={className} style={style(0)}>
      {children}
    </Component>
  );
}

/* ---------- 4. ParallaxImage ---------- */
export function ParallaxImage({
  src,
  alt,
  speed = 0.25,
  className = "",
  imgClassName = "",
  overlay,
  eager = false,
  children,
}: {
  src: string;
  alt: string;
  /** 0 = static, 1 = full scroll speed */
  speed?: number;
  className?: string;
  imgClassName?: string;
  overlay?: ReactNode;
  eager?: boolean;
  children?: ReactNode;
}) {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const layerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (reduced) return;
    const wrap = wrapRef.current;
    const layer = layerRef.current;
    if (!wrap || !layer) return;

    let active = false;
    let raf = 0;
    const render = () => {
      raf = 0;
      const rect = wrap.getBoundingClientRect();
      const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
      layer.style.transform = `translate3d(0, ${(-progress * speed * 100).toFixed(2)}px, 0) scale(${
        1 + speed * 0.6
      })`;
    };
    const onScroll = () => {
      if (!active || raf) return;
      raf = requestAnimationFrame(render);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        active = e.isIntersecting;
        if (active) render();
      },
      { threshold: 0 }
    );
    io.observe(wrap);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed, reduced]);

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`}>
      <div ref={layerRef} className="absolute inset-0 will-change-transform">
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className={`w-full h-full object-cover ${imgClassName}`}
        />
        {overlay}
      </div>
      {children ? <div className="relative h-full">{children}</div> : null}
    </div>
  );
}

/* ---------- 5. CrossfadeToggle ---------- */
export type CrossfadeOption = { id: string; label: string; image: string; alt?: string };

export function CrossfadeToggle({
  options,
  className = "",
  aspect = "aspect-[16/10]",
  caption,
}: {
  options: CrossfadeOption[];
  className?: string;
  aspect?: string;
  caption?: (active: CrossfadeOption) => ReactNode;
}) {
  const reduced = useReducedMotion();
  const [activeId, setActiveId] = useState(options[0]?.id);
  const active = options.find((o) => o.id === activeId) ?? options[0];

  return (
    <div className={className}>
      <div className={`relative overflow-hidden ${aspect}`}>
        {options.map((o) => (
          <img
            key={o.id}
            src={o.image}
            alt={o.alt ?? o.label}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: o.id === active?.id ? 1 : 0,
              transition: reduced ? undefined : "opacity 400ms ease",
            }}
          />
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-6">
        {options.map((o) => {
          const isActive = o.id === active?.id;
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={isActive}
              onMouseEnter={() => setActiveId(o.id)}
              onFocus={() => setActiveId(o.id)}
              onClick={() => setActiveId(o.id)}
              className={`text-sm tracking-wide pb-1 border-b-2 transition-colors duration-300 ${
                isActive
                  ? "border-gold text-gold"
                  : "border-transparent text-current opacity-70 hover:opacity-100"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
      {caption && active ? <div className="mt-3">{caption(active)}</div> : null}
    </div>
  );
}

/* ---------- 6. CountUp ---------- */
export function CountUp({
  end,
  value,
  decimals = 0,
  duration = 1200,
  prefix = "",
  suffix = "",
  locale,
  className = "",
}: {
  /** target reached once scrolled into view */
  end?: number;
  /** live-updating value (e.g. price); tweens on every change */
  value?: number;
  decimals?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  /** e.g. "id-ID" to group thousands */
  locale?: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const isLive = value != null;
  const target = (isLive ? value : end) ?? 0;
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const [display, setDisplay] = useState(isLive ? target : 0);
  const from = useRef(isLive ? target : 0);

  useEffect(() => {
    if (!isLive && !inView) return;
    if (reduced) {
      from.current = target;
      setDisplay(target);
      return;
    }
    const start = performance.now();
    const origin = from.current;
    const dur = isLive ? 450 : duration;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(origin + (target - origin) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else from.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, inView, isLive, duration, reduced]);

  const text = locale
    ? display.toLocaleString(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : display.toFixed(decimals);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {text}
      {suffix}
    </span>
  );
}

/* ---------- 7. StickyWhatsAppButton ---------- */
export function StickyWhatsAppButton({
  message,
  label = "Reach Us on WhatsApp",
}: {
  message: string;
  label?: string;
}) {
  const [show, setShow] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* Sentinel spans the hero viewport height; button appears once it scrolls away */}
      <div
        ref={sentinelRef}
        aria-hidden="true"
        className="absolute top-0 left-0 w-px h-screen pointer-events-none"
      />
      <a
        href={waLink(message)}
        target="_blank"
        rel="noreferrer"
        aria-label={label}
        className={`group fixed bottom-6 right-6 z-50 flex items-center rounded-full bg-gold text-indigo shadow-lg px-4 py-4 transition-all duration-500 ease-out motion-reduce:transition-none ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        style={{ boxShadow: "0 10px 30px -10px rgba(27,31,59,0.45)" }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="shrink-0">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 2.1.55 4.14 1.6 5.94L2 22l4.28-1.12a9.9 9.9 0 0 0 5.76 1.83h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.87 9.87 0 0 0 12.04 2Zm5.77 14.02c-.25.7-1.42 1.3-2.02 1.4-.52.08-1.18.11-1.9-.12-.44-.14-1-.32-1.72-.63-3.02-1.3-4.99-4.34-5.14-4.54-.15-.2-1.24-1.65-1.24-3.14 0-1.5.78-2.23 1.06-2.53.28-.3.6-.38.8-.38h.58c.18 0 .43-.07.68.52.25.6.85 2.08.93 2.23.08.15.13.33.02.53-.1.2-.16.32-.32.5-.15.18-.33.4-.47.53-.15.15-.32.32-.14.63.18.3.8 1.33 1.72 2.16 1.18 1.05 2.18 1.38 2.48 1.53.3.15.48.13.66-.08.18-.2.75-.88.95-1.18.2-.3.4-.25.68-.15.28.1 1.75.82 2.05.98.3.15.5.22.58.35.08.13.08.75-.17 1.45Z" />
        </svg>
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-400 ease-out group-hover:max-w-[220px] group-hover:ml-2 group-focus-visible:max-w-[220px] group-focus-visible:ml-2 motion-reduce:transition-none">
          {label}
        </span>
      </a>
    </>
  );
}
