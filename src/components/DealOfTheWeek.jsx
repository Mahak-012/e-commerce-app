import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Eye, ShoppingCart, Heart, Flame, Zap, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { WISH_KEY, readStore, toggleWishlist } from '../lib/store';

const EASE = [0.22, 1, 0.36, 1];

/* ── Real weekly countdown: is Sunday midnight tak ── */
function useWeeklyCountdown() {
  const end = useMemo(() => {
    const n = new Date();
    const e = new Date(n);
    e.setDate(n.getDate() + ((7 - n.getDay()) % 7 || 7));
    e.setHours(23, 59, 59, 999);
    return e.getTime();
  }, []);
  const [left, setLeft] = useState(Math.max(0, end - Date.now()));
  useEffect(() => {
    const t = setInterval(() => setLeft(Math.max(0, end - Date.now())), 1000);
    return () => clearInterval(t);
  }, [end]);
  return {
    days: Math.floor(left / 86400000),
    hours: Math.floor((left % 86400000) / 3600000),
    minutes: Math.floor((left % 3600000) / 60000),
    seconds: Math.floor((left % 60000) / 1000),
  };
}

const dealProducts = [
  { id: 1,  title: 'Classic Leather Crossbody Saddle Bag', price: 29, oldPrice: 89,  rating: 5, brand: 'Mahak Couture', img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop', stock: 4 },
  { id: 2,  title: 'Premium Oxford Button-Down Shirt',     price: 19, oldPrice: 55,  rating: 5, brand: 'Mahak Couture', img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=600&auto=format&fit=crop', stock: 8 },
  { id: 3,  title: 'Retro Aviator Polarized Sunglasses',   price: 15, oldPrice: 42,  rating: 4, brand: 'Mahak Couture', img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&auto=format&fit=crop', stock: 12 },
  { id: 4,  title: 'Urban Runner Pro Mesh Sneakers',       price: 35, oldPrice: 95,  rating: 5, brand: 'Mahak Couture', img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop', stock: 5 },
  { id: 5,  title: 'Washed Canvas Baseball Cap',           price: 9,  oldPrice: 28,  rating: 5, brand: 'Mahak Couture', img: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1587920149371-ac728dcd7389?q=80&w=600&auto=format&fit=crop', stock: 20 },
  { id: 6,  title: 'Structured Mini Top Handle Bag',       price: 25, oldPrice: 72,  rating: 4, brand: 'Mahak Couture', img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop', stock: 3 },
  { id: 7,  title: 'Slim Fit Mandarin Collar Shirt',       price: 17, oldPrice: 48,  rating: 5, brand: 'Mahak Couture', img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop', stock: 9 },
  { id: 8,  title: 'Classic Wayfarer Matte Shades',        price: 12, oldPrice: 35,  rating: 5, brand: 'Mahak Couture', img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop', stock: 15 },
  { id: 9,  title: 'Suede Chelsea Ankle Boots',            price: 45, oldPrice: 120, rating: 5, brand: 'Mahak Couture', img: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?q=80&w=600&auto=format&fit=crop', stock: 2 },
  { id: 10, title: 'Trucker Mesh Back Snapback Cap',       price: 8,  oldPrice: 25,  rating: 4, brand: 'Mahak Couture', img: 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=600&auto=format&fit=crop', stock: 18 },
  { id: 11, title: 'Quilted Puffer Laptop Backpack',       price: 22, oldPrice: 68,  rating: 5, brand: 'Mahak Couture', img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=600&auto=format&fit=crop', stock: 6 },
  { id: 12, title: 'Linen Blend Casual Summer Shirt',      price: 14, oldPrice: 45,  rating: 5, brand: 'Mahak Couture', img: 'https://images.unsplash.com/photo-1598033129183-c4f50c736c10?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop', stock: 10 },
];

export default function DealOfTheWeek({ onProductSelect }) {
  const { addToCart } = useCart();
  const time  = useWeeklyCountdown();
  const [perView, setPerView]   = useState(4);
  const [index, setIndex]       = useState(0);
  const [dir, setDir]           = useState(1);
  const [justAdded, setJustAdded] = useState(null);
  const [toast, setToast]       = useState(null);
  const [wished, setWished]     = useState(() => new Set(readStore(WISH_KEY).map((i) => i.id)));
  const toastTimer = useRef(null);

  /* Responsive per-view */
  useEffect(() => {
    const calc = () => setPerView(window.innerWidth < 768 ? 2 : 4);
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  const maxIndex = dealProducts.length - perView;
  const go = (d) => {
    setDir(d);
    setIndex((i) => (i + d + (maxIndex + 1)) % (maxIndex + 1));
  };

  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2300);
  };

  const handleAdd = (e, p) => {
    e.stopPropagation();
    addToCart(p, 1);
    setJustAdded(p.id);
    setTimeout(() => setJustAdded(null), 1500);
    showToast(`✓ ${p.title} — ${Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)}% off grabbed!`);
  };

  const handleWish = (e, p) => {
    e.stopPropagation();
    const added = toggleWishlist(p);
    setWished((prev) => {
      const n = new Set(prev);
      added ? n.add(p.id) : n.delete(p.id);
      return n;
    });
    showToast(added ? `♥ ${p.title} saved to wishlist` : 'Removed from wishlist');
  };

  const UNITS = [
    { label: 'Days',  value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Mins',  value: time.minutes },
    { label: 'Sec',   value: time.seconds },
  ];

  return (
    <section className="w-full select-none relative overflow-hidden">

      <style>{`
        .dotw-ghost { font-family: 'Playfair Display', serif; font-style: italic; font-weight: 700;
          -webkit-text-stroke: 1px rgba(239,68,68,0.1); color: transparent;
          user-select: none; pointer-events: none; line-height: 1; white-space: nowrap; }
        @keyframes confetti-fall { 0% { transform: translateY(-20px) rotate(0); opacity: 0 } 10% { opacity: .7 } 90% { opacity: .5 } 100% { transform: translateY(60vh) rotate(720deg); opacity: 0 } }
        @keyframes confetti-dot { 0%,100% { transform: translateY(0) scale(1); opacity: .3 } 50% { transform: translateY(15px) scale(1.3); opacity: .6 } }
        @keyframes pulse-glow { 0%,100% { box-shadow: 0 0 0 0 rgba(239,68,68,.2) } 50% { box-shadow: 0 0 15px 5px rgba(239,68,68,.15) } }
        @keyframes pulse-shadow { 0%,100% { box-shadow: 0 4px 20px rgba(239,68,68,.4) } 50% { box-shadow: 0 4px 30px rgba(239,68,68,.6) } }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
        }
      `}</style>

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-100/80 via-gray-50/50 to-slate-100/70" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-neutral-200/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-red-100/20 rounded-full blur-[100px]" />

      {/* Confetti */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          ['5%', 'red-500', '4s', '0s'], ['18%', 'amber-400', '5s', '.5s'], ['32%', 'blue-500', '4.5s', '1s'],
          ['50%', 'pink-500', '3.5s', '.3s'], ['65%', 'emerald-500', '5.5s', '.8s'], ['78%', 'purple-500', '4.2s', '1.5s'],
          ['90%', 'orange-400', '3.8s', '.7s'],
        ].map(([l, c, d, dl], i) => (
          <div key={i} className={`absolute top-[4%] left-[${l}] w-1.5 h-7 bg-${c} rounded-full rotate-12 opacity-60`}
            style={{ left: l, animation: `confetti-fall ${d} linear infinite ${dl}` }} />
        ))}
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24">

        {/* ── HEADER ── */}
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 mb-14">
          <span className="dotw-ghost absolute -top-10 left-0 text-[4.5rem] sm:text-[6.5rem] hidden md:block pointer-events-none">Sale</span>

          <div className="text-center lg:text-left relative">
            <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-1.5 rounded-full mb-4 border border-red-200/60" style={{ animation: 'pulse-glow 2s ease-in-out infinite' }}>
              <Flame className="w-4 h-4 animate-pulse" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase">Limited Time Offer</span>
              <Zap className="w-3.5 h-3.5 animate-pulse" />
            </div>
            <h2 className="text-3xl md:text-[42px] font-serif font-medium tracking-tight text-neutral-900 leading-tight">Deal Of The Week</h2>
            <p className="mt-2 text-neutral-500 text-[15px]">Massive discounts — grab yours before they're gone!</p>
          </div>

          {/* Countdown — flip digits */}
          <div className="flex items-center gap-3 relative">
            {UNITS.map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="relative bg-gradient-to-b from-red-500 to-red-700 text-white text-xl md:text-3xl font-bold w-14 h-14 md:w-[72px] md:h-[72px] flex items-center justify-center rounded-xl border border-red-400/30 overflow-hidden"
                  style={{ animation: 'pulse-shadow 2s ease-in-out infinite' }}>
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={item.value}
                      initial={{ y: dir * 22, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: dir * -22, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="tabular-nums">
                      {String(item.value).padStart(2, '0')}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span className="text-[10px] md:text-[11px] font-bold text-red-500/70 tracking-wider mt-2 uppercase">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── CAROUSEL ── */}
        <div className="relative">
          <motion.div
            className="overflow-hidden rounded-2xl cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.08}
            onDragEnd={(_, info) => {
              if (info.offset.x < -70) go(1);
              else if (info.offset.x > 70) go(-1);
            }}
          >
            <motion.div
              className="flex gap-5 lg:gap-6"
              animate={{ x: `-${index * (100 / perView)}%` }}
              transition={{ type: 'spring', damping: 30, stiffness: 220 }}
            >
              {dealProducts.map((product) => {
                const saved = product.oldPrice - product.price;
                const discountPct = Math.round((saved / product.oldPrice) * 100);
                const isWished = wished.has(product.id);
                return (
                  <div
                    key={product.id}
                    onClick={() => onProductSelect?.(product)}
                    className="shrink-0 flex flex-col group cursor-pointer py-1"
                    style={{ width: `calc(${100 / perView}% - ${(perView - 1) * 20 / perView}px)` }}
                  >
                    <div className="relative w-full aspect-[3/4] bg-white/70 overflow-hidden rounded-xl border border-neutral-200/40 shadow-sm group-hover:shadow-xl group-hover:shadow-red-100/40 transition-shadow duration-500">
                      {/* Image swap */}
                      <img src={product.img} alt={product.title} draggable={false} loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover object-top group-hover:opacity-0 group-hover:scale-105 transition-all duration-700" />
                      <img src={product.hoverImg} alt="" draggable={false} loading="lazy" aria-hidden
                        className="absolute inset-0 w-full h-full object-cover object-top opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        <span className="bg-red-600 text-white text-[11px] font-extrabold px-3 py-1.5 rounded-full shadow-lg shadow-red-200/60 tracking-wide">-{discountPct}%</span>
                        {product.stock <= 4 && (
                          <span className="bg-orange-500 text-white text-[8px] font-black px-2 py-1 rounded-full shadow-md tracking-widest uppercase flex items-center gap-1">🔥 Only {product.stock} left</span>
                        )}
                      </div>

                      {/* Wish */}
                      <button onClick={(e) => handleWish(e, product)} aria-label="Wishlist"
                        className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
                          isWished ? 'bg-red-500 text-white opacity-100 scale-100' : 'bg-white/90 text-neutral-600 hover:text-red-500 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0'
                        }`}>
                        <Heart className={`w-4 h-4 ${isWished ? 'fill-current' : ''}`} />
                      </button>

                      {/* Quick view */}
                      <button onClick={(e) => { e.stopPropagation(); onProductSelect?.(product); }} aria-label="Quick view"
                        className="absolute top-14 right-3 w-9 h-9 bg-white/90 text-neutral-600 hover:text-neutral-900 hover:scale-110 flex items-center justify-center rounded-full shadow-md opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Add to cart */}
                      <div className="absolute bottom-0 inset-x-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <button onClick={(e) => handleAdd(e, product)}
                          className={`w-full text-white text-[11px] font-bold py-3.5 tracking-[0.2em] uppercase flex items-center justify-center gap-2 transition-colors ${
                            justAdded === product.id ? 'bg-emerald-600' : 'bg-red-600 hover:bg-red-700'
                          }`}>
                          {justAdded === product.id
                            ? <><Check className="w-4 h-4" /> Added ✓</>
                            : <><ShoppingCart className="w-4 h-4" /> Add To Cart</>}
                        </button>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="pt-4 space-y-1.5 px-0.5">
                      <span className="text-[10px] tracking-[0.2em] text-neutral-400 uppercase font-medium block">{product.brand}</span>
                      <h3 className="text-[14px] font-medium text-neutral-800 leading-snug line-clamp-2 group-hover:text-red-600 transition-colors duration-300">{product.title}</h3>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => <Star key={i} className={`w-3 h-3 ${i < product.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-200'}`} />)}
                      </div>
                      <div className="flex items-center gap-2.5 pt-0.5">
                        <span className="text-base sm:text-lg font-extrabold text-red-600">${product.price}.00</span>
                        <span className="text-[13px] text-neutral-400 line-through font-light">${product.oldPrice}.00</span>
                      </div>
                      <div className="inline-flex items-center gap-1 bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 border border-red-100/50">
                        <Zap className="w-2.5 h-2.5" /> You save ${saved}!
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Arrows */}
          <button onClick={() => go(-1)} aria-label="Previous"
            className="absolute -left-4 lg:-left-5 top-[38%] -translate-y-1/2 w-11 h-11 bg-white/90 backdrop-blur-sm hover:bg-red-600 text-neutral-600 hover:text-white rounded-full border border-neutral-200 hover:border-red-600 flex items-center justify-center shadow-xl transition-all active:scale-90 z-20">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => go(1)} aria-label="Next"
            className="absolute -right-4 lg:-right-5 top-[38%] -translate-y-1/2 w-11 h-11 bg-white/90 backdrop-blur-sm hover:bg-red-600 text-neutral-600 hover:text-white rounded-full border border-neutral-200 hover:border-red-600 flex items-center justify-center shadow-xl transition-all active:scale-90 z-20">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center items-center gap-2 mt-10">
          {[...Array(maxIndex + 1)].map((_, i) => (
            <button key={i} onClick={() => { setDir(i > index ? 1 : -1); setIndex(i); }} aria-label={`Page ${i + 1}`}
              className={`transition-all duration-300 rounded-full ${i === index ? 'w-8 h-2 bg-red-500' : 'w-2 h-2 bg-neutral-300 hover:bg-red-300'}`} />
          ))}
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ type: 'spring', damping: 22, stiffness: 320 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[80] bg-neutral-900 text-white text-xs font-medium px-6 py-3.5 rounded-full shadow-2xl whitespace-nowrap max-w-[90vw] overflow-hidden text-ellipsis">
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}