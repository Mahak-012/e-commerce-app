import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight, Truck, RefreshCcw, BadgeCheck } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];
const DURATION = 6500;

const sliderData = [
  {
    id: 1,
    subtitle: 'THE NEW ERA OF LUXURY',
    title: 'Urban Elegance\n& Minimalist Layers',
    description: 'Curated streetwear for the modern identity.',
    buttonText: 'DISCOVER THE LOOK',
    buttonLink: '/shop',
    bgImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=100',
    // ── Lighting: har slide ka apna darkness level ──
    overlay: 'from-black/30 via-black/10 to-transparent',   // pehli slide: HALKA
  },
  {
    id: 2,
    subtitle: 'METROPOLITAN STATEMENT',
    title: 'Sharp Tailoring\n& Premium Aesthetics',
    description: 'Designed for those who lead, never follow.',
    buttonText: 'EXPLORE THE STYLE',
    buttonLink: '/products',
    bgImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=2000&q=100',
    overlay: 'from-black/55 via-black/25 to-transparent',   // THORA dark
  },
  {
    id: 3,
    subtitle: 'SS COLLECTION — LIMITED DROP',
    title: 'Monochrome Motion\n& Quiet Confidence',
    description: 'Signature pieces. Produced in limited runs.',
    buttonText: 'SHOP THE DROP',
    buttonLink: '/products',
    bgImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2000&q=100',
    overlay: 'from-black/50 via-black/20 to-transparent',
  },
  {
    id: 4,
    subtitle: 'NIGHT SERIES',
    title: 'After Dark\nEssentials',
    description: 'Elevated layers built for the city after sunset.',
    buttonText: 'VIEW COLLECTION',
    buttonLink: '/shop',
    bgImage: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=2000&q=100',
    overlay: 'from-black/60 via-black/30 to-transparent',   // night series: dark
  },
];

/* ── Word-by-word masked reveal ── */
function RevealTitle({ text, k }) {
  return (
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-light font-serif text-white tracking-wide leading-[1.15]">
      {text.split('\n').map((line, li) => (
        <span key={`${k}-${li}`} className="block">
          {line.split(' ').map((word, wi) => (
            <span
              key={wi}
              className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em] mr-[0.26em]"
            >
              <motion.span
                initial={{ y: '112%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.8, delay: 0.25 + (li * 4 + wi) * 0.07, ease: EASE }}
                className="inline-block"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);          // 1 = next, -1 = prev
  const [paused, setPaused] = useState(false);
  const touchX = useRef(null);

  /* ── Mouse parallax ── */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 18 });
  const sy = useSpring(my, { stiffness: 40, damping: 18 });
  const bgX = useTransform(sx, (v) => v * -20);
  const bgY = useTransform(sy, (v) => v * -14);

  /* ── Autoplay (pause on hover / when tab hidden) ── */
  useEffect(() => {
    if (paused || document.hidden) return;
    const t = setTimeout(() => go(1), DURATION);
    return () => clearTimeout(t);
  }, [current, paused]);

  /* ── Preload all images ── */
  useEffect(() => {
    sliderData.forEach((s) => { const i = new Image(); i.src = s.bgImage; });
  }, []);

  /* ── Keyboard nav ── */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const go = (direction) => {
    setDir(direction);
    setCurrent((prev) => (prev + direction + sliderData.length) % sliderData.length);
  };
  const jump = (i) => { if (i !== current) { setDir(i > current ? 1 : -1); setCurrent(i); } };

  /* ── Swipe ── */
  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchX.current;
    if (diff < -60) go(1);
    else if (diff > 60) go(-1);
    touchX.current = null;
  };

  const onMouseMove = (e) => {
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  };

  const slide = sliderData[current];

  return (
    <div
      className="relative w-full h-[88vh] sm:h-[92vh] bg-neutral-950 overflow-hidden select-none"
      onMouseMove={onMouseMove}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <style>{`
        @keyframes heroBar { from { transform: scaleX(0) } to { transform: scaleX(1) } }
        .hero-bar { animation: heroBar ${DURATION}ms linear forwards; transform-origin: left; }

        @keyframes kenburns { 0% { transform: scale(1) } 100% { transform: scale(1.12) } }
        .kenburns { animation: kenburns 9s ease-out forwards; }

        @keyframes tickermove { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .ticker-track { animation: tickermove 26s linear infinite; }

        @keyframes scrolldot { 0% { top: 0; opacity: 0 } 20% { opacity: 1 } 80% { opacity: 1 } 100% { top: calc(100% - 6px); opacity: 0 } }
        .scroll-dot { animation: scrolldot 2.2s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .kenburns, .ticker-track, .scroll-dot { animation: none !important; }
        }
      `}</style>

      {/* ═══ ANNOUNCEMENT TICKER ═══ */}
      <div className="absolute top-0 left-0 right-0 z-30 bg-black/40 backdrop-blur-md border-b border-white/5 overflow-hidden">
        <div className="ticker-track flex w-max py-2.5">
          {[0, 1].map((n) => (
            <div key={n} className="flex shrink-0">
              {['FREE SHIPPING NATIONWIDE', 'CASH ON DELIVERY AVAILABLE', 'EASY 7-DAY RETURNS', 'LIMITED DROPS — WHILE STOCKS LAST'].map((t) => (
                <span key={t} className="flex items-center text-[9px] sm:text-[10px] font-semibold tracking-[0.3em] text-neutral-300 uppercase whitespace-nowrap">
                  <span className="px-6">{t}</span>
                  <span className="text-white/25">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══ BACKGROUND — parallax + ken burns ═══ */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="absolute -inset-8"
          style={{ x: bgX, y: bgY }}
        >
          <div
            className={`absolute inset-0 bg-cover bg-center kenburns`}
            style={{ backgroundImage: `url(${slide.bgImage})` }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ═══ CINEMATIC OVERLAYS — per-slide lighting (HALKI) ═══ */}
      <div className={`absolute inset-0 bg-gradient-to-r ${slide.overlay} transition-all duration-1000`} />
      {/* Bottom fade — sirf halka, taake dots/counter readable rahen */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
      {/* Vignette — soft edges */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 62%, rgba(0,0,0,0.25) 100%)' }} />
      {/* Text readability booster — sirf left side, image bright rehti hai */}
      <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-black/25 to-transparent" />

      {/* Decorative frame */}
      <div className="absolute top-16 left-5 right-5 bottom-5 border border-white/10 pointer-events-none z-10 hidden sm:block" />
      <span className="absolute top-12 left-12 w-8 h-8 border-t-2 border-l-2 border-white/60 pointer-events-none z-10 hidden md:block" />
      <span className="absolute bottom-12 right-12 w-8 h-8 border-b-2 border-r-2 border-white/60 pointer-events-none z-10 hidden md:block" />

      {/* Ghost slide number */}
      <span
        key={`ghost-${current}`}
        className="absolute right-6 top-1/2 -translate-y-1/2 font-serif italic font-bold pointer-events-none select-none hidden lg:block"
        style={{ fontSize: '16rem', lineHeight: 1, WebkitTextStroke: '1px rgba(255,255,255,0.09)', color: 'transparent' }}
      >
        0{current + 1}
      </span>

      {/* ═══ CONTENT ═══ */}
      <div className="max-w-[1440px] mx-auto h-full px-6 sm:px-12 relative z-20 flex items-center justify-between">

        <button
          onClick={() => go(-1)}
          aria-label="Previous slide"
          className="w-11 h-11 bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md active:scale-95"
        >
          <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
        </button>

        <div className="w-full max-w-xl text-left mr-auto pl-4 md:pl-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: dir * -24, transition: { duration: 0.3 } }}
              transition={{ duration: 0.4 }}
              className="space-y-4 sm:space-y-6"
            >
              {/* Subtitle */}
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
                className="flex items-center gap-3 text-[10px] sm:text-xs font-semibold tracking-[0.35em] text-neutral-200 uppercase"
              >
                <span className="w-8 h-px bg-white/60" />
                {slide.subtitle}
              </motion.span>

              {/* Title — word reveal */}
              <RevealTitle text={slide.title} k={current} />

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
                className="text-[11px] sm:text-xs font-light text-neutral-300 tracking-[0.18em] uppercase max-w-md"
              >
                {slide.description}
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
                className="pt-2 flex items-center gap-5"
              >
                <Link
                  to={slide.buttonLink}
                  className="group relative inline-flex items-center gap-3 overflow-hidden bg-white text-black text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] px-8 py-4 transition-all duration-300 shadow-2xl"
                >
                  <span className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out" />
                  <span className="relative group-hover:text-white transition-colors duration-300">{slide.buttonText}</span>
                  <ArrowUpRight className="relative w-4 h-4 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={() => go(1)}
          aria-label="Next slide"
          className="w-11 h-11 bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md active:scale-95"
        >
          <ChevronRight className="w-5 h-5 stroke-[1.5]" />
        </button>
      </div>

      {/* ═══ SLIDE COUNTER ═══ */}
      <div className="absolute left-6 sm:left-12 bottom-24 sm:bottom-28 z-20 flex items-baseline gap-1.5 font-serif">
        <AnimatePresence mode="wait">
          <motion.span
            key={current}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="text-3xl sm:text-4xl text-white font-light"
          >
            0{current + 1}
          </motion.span>
        </AnimatePresence>
        <span className="text-sm text-white/40">/ 0{sliderData.length}</span>
      </div>

      {/* ═══ SCROLL CUE ═══ */}
      <div className="absolute right-6 sm:right-12 bottom-24 sm:bottom-28 z-20 hidden sm:flex flex-col items-center gap-2">
        <span className="text-[9px] tracking-[0.3em] text-white/50 uppercase [writing-mode:vertical-rl]">Scroll</span>
        <div className="relative w-px h-12 bg-white/15 overflow-hidden">
          <span className="scroll-dot absolute left-1/2 -ml-[2px] w-1 h-1 rounded-full bg-white" />
        </div>
      </div>

      {/* ═══ PROGRESS DOTS ═══ */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => jump(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`relative h-[3px] overflow-hidden transition-all duration-500 ${index === current ? 'w-14 bg-white/25' : 'w-4 bg-white/25 hover:bg-white/50'}`}
          >
            {index === current && (
              <span
                key={`bar-${current}-${paused}`}
                className="hero-bar absolute inset-0 bg-white"
                style={{ animationPlayState: paused ? 'paused' : 'running' }}
              />
            )}
          </button>
        ))}
      </div>

      {/* ═══ TRUST STRIP ═══ */}
      <div className="absolute bottom-0 left-0 right-0 z-10 hidden md:block">
        <div className="max-w-[1440px] mx-auto px-12 pb-0">
          <div className="flex justify-end gap-10 border-t border-white/10 py-4 backdrop-blur-[2px]">
            {[
              { icon: Truck,        label: 'Free Shipping',  sub: 'On orders over Rs. 5,000' },
              { icon: RefreshCcw,   label: 'Easy Returns',   sub: '7-day hassle-free policy' },
              { icon: BadgeCheck,   label: '100% Authentic', sub: 'Quality guaranteed' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-white/60 stroke-[1.5]" />
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] text-white/85 uppercase">{label}</p>
                  <p className="text-[9px] tracking-[0.12em] text-white/40 uppercase">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}