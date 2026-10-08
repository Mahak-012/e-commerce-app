import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, BadgeCheck } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];

const reviews = [
  { id: 1, name: 'Sarah Jenkins', role: 'Verified Buyer',   rating: 5, comment: 'Absolutely in love with the premium quality of the handbag! The stitching is flawless, and it looks even more elegant in person. Delivery was super fast too. Will definitely shop again!', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150' },
  { id: 2, name: 'David Miller',  role: 'Verified Buyer',   rating: 5, comment: 'The sneakers are 100% original and incredibly comfortable for daily use. Mahak Couture has become my absolute go-to store for authentic streetwear and quick shipping.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150' },
  { id: 3, name: 'Emma Watson',   role: 'Fashion Blogger',  rating: 5, comment: 'Stunning collection! Bought the emerald gold wrist watch and received endless compliments. The customer support team was incredibly helpful throughout the tracking process.', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150' },
  { id: 4, name: 'Ali Raza',      role: 'Verified Buyer',   rating: 4, comment: 'Great quality for the price point. The packaging itself felt like a gift — tissue paper, ribbon, the works. Shipping took a day longer than expected but worth the wait.', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150' },
];

const RATING_BARS = [
  { stars: 5, pct: 88 }, { stars: 4, pct: 9 }, { stars: 3, pct: 2 }, { stars: 2, pct: 1 }, { stars: 1, pct: 0 },
];

export default function ClientReviews() {
  const [[index, dir], setState] = useState([0, 1]);
  const [paused, setPaused] = useState(false);
  const touchX = useRef(null);

  const go = (d) => setState(([i]) => [(i + d + reviews.length) % reviews.length, d]);
  const jump = (idx) => { if (idx !== index) setState([idx, idx > index ? 1 : -1]); };

  /* Autoplay — pause on hover */
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), 5000);
    return () => clearInterval(t);
  }, [index, paused]);

  /* Keyboard */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const r = reviews[index];

  return (
    <section
      className="w-full select-none overflow-hidden relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <style>{`
        .cr-ghost { font-family: 'Playfair Display', serif; font-style: italic; font-weight: 700;
          -webkit-text-stroke: 1px rgba(0,0,0,0.05); color: transparent;
          user-select: none; pointer-events: none; line-height: 1; white-space: nowrap; }
      `}</style>

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50/40 via-amber-50/30 to-orange-50/40" />
      <div className="absolute top-[10%] right-[20%] w-[400px] h-[400px] bg-rose-100/20 rounded-full blur-[130px]" />
      <div className="absolute bottom-[10%] left-[15%] w-[350px] h-[350px] bg-amber-100/20 rounded-full blur-[110px]" />

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none px-4">
        <span className="text-[5rem] sm:text-[7rem] md:text-[9rem] font-serif font-black tracking-[0.2em] uppercase text-center leading-none">MAHAK COUTURE</span>
      </div>

      <div className="relative z-10 max-w-[900px] mx-auto px-6 py-24 text-center">

        {/* Header */}
        <span className="cr-ghost absolute left-1/2 -translate-x-1/2 top-14 text-[4rem] sm:text-[6rem]">Voices</span>
        <span className="relative text-[10px] tracking-[0.3em] text-neutral-400 font-bold uppercase block mb-3">Testimonials</span>
        <h2 className="relative text-3xl font-light tracking-[0.15em] text-neutral-800 font-serif uppercase mb-12 inline-block pb-3">
          What Our Clients Say
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[1px] bg-neutral-800" />
        </h2>

        {/* ── Rating summary card ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }}
          className="max-w-xl mx-auto mb-10 bg-white/70 backdrop-blur-sm border border-neutral-200/50 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 shadow-lg shadow-amber-100/20">
          <div className="text-center shrink-0">
            <p className="text-5xl font-serif font-bold text-neutral-900 leading-none">4.9</p>
            <div className="flex justify-center gap-0.5 mt-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
            </div>
            <p className="text-[10px] text-neutral-400 mt-1.5 tracking-wide">2,400+ verified reviews</p>
          </div>
          <div className="hidden sm:block w-px self-stretch bg-neutral-200/70" />
          <div className="flex-1 w-full space-y-1.5">
            {RATING_BARS.map((b) => (
              <div key={b.stars} className="flex items-center gap-2.5">
                <span className="text-[10px] text-neutral-500 w-6 flex items-center gap-0.5 shrink-0">{b.stars}<Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" /></span>
                <div className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }} whileInView={{ width: `${b.pct}%` }}
                    viewport={{ once: true }} transition={{ duration: 1, delay: 0.2, ease: EASE }}
                    className="h-full bg-amber-400 rounded-full" />
                </div>
                <span className="text-[10px] text-neutral-400 w-8 text-right tabular-nums">{b.pct}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Review card — directional slide ── */}
        <div className="w-full max-w-3xl mx-auto relative">
          <div className="min-h-[280px] relative bg-white/80 backdrop-blur-sm border border-neutral-200/50 p-8 md:p-12 rounded-2xl shadow-xl shadow-amber-100/20 overflow-hidden">

            <Quote className="w-8 h-8 text-amber-200/60 mb-4 mx-auto" />

            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={index}
                custom={dir}
                initial={{ opacity: 0, x: dir * 60, filter: 'blur(4px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: dir * -60, filter: 'blur(4px)' }}
                transition={{ duration: 0.45, ease: EASE }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(1);
                  else if (info.offset.x > 60) go(-1);
                }}
                className="flex flex-col items-center justify-center cursor-grab active:cursor-grabbing"
              >
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(r.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400 stroke-amber-400" />)}
                </div>

                <p className="text-neutral-700 text-base md:text-lg font-serif leading-relaxed italic max-w-2xl px-2">
                  "{r.comment}"
                </p>

                <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-neutral-300 to-transparent my-6" />

                <div className="flex flex-col items-center gap-2">
                  <img src={r.img} alt={r.name} draggable={false}
                    className="w-14 h-14 rounded-full object-cover border-2 border-white ring-2 ring-amber-200/40 shadow-md" />
                  <div className="mt-1">
                    <h4 className="text-xs font-bold text-neutral-900 tracking-[0.15em] uppercase flex items-center gap-1.5 justify-center">
                      {r.name} <BadgeCheck className="w-3.5 h-3.5 text-sky-500" />
                    </h4>
                    <p className="text-[10px] text-amber-600 font-medium tracking-widest uppercase mt-0.5">{r.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Arrows */}
          <button onClick={() => go(-1)} aria-label="Previous review"
            className="absolute left-0 md:-left-12 top-[55%] -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm text-neutral-400 hover:text-neutral-900 border border-neutral-200/60 flex items-center justify-center shadow-lg hover:shadow-xl transition-all active:scale-95 group">
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button onClick={() => go(1)} aria-label="Next review"
            className="absolute right-0 md:-right-12 top-[55%] -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm text-neutral-400 hover:text-neutral-900 border border-neutral-200/60 flex items-center justify-center shadow-lg hover:shadow-xl transition-all active:scale-95 group">
            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Dots + counter */}
        <div className="flex justify-center items-center gap-2.5 mt-8">
          {reviews.map((_, idx) => (
            <button key={idx} onClick={() => jump(idx)} aria-label={`Review ${idx + 1}`}
              className={`h-1 transition-all duration-500 rounded-full ${idx === index ? 'w-8 bg-amber-600' : 'w-2 bg-neutral-300 hover:bg-neutral-400'}`} />
          ))}
          <span className="text-[10px] text-neutral-400 ml-3 tabular-nums tracking-widest">{String(index + 1).padStart(2, '0')} / {String(reviews.length).padStart(2, '0')}</span>
        </div>
      </div>
    </section>
  );
}