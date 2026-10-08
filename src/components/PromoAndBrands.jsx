import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, Check, ArrowRight, Sparkles, Flame } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { WISH_KEY, readStore, toggleWishlist } from '../lib/store';

const EASE = [0.22, 1, 0.36, 1];

const slideProducts = [
  { id: 2, title: 'Dolce & Gabbana Sicily Bag',  price: 29, oldPrice: 35, rating: 5, brand: 'D&G',   salesText: '5 bags in stock',        stock: 5,  img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop',   hoverImg: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop' },
  { id: 4, title: 'Emerald Gold Wrist Watch',    price: 38, oldPrice: 45, rating: 5, brand: 'Luxury', salesText: 'Limited Edition',       stock: 3,  img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop',   hoverImg: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=600&auto=format&fit=crop' },
  { id: 3, title: 'Women Sunglasses Retro',      price: 22, rating: 4,  brand: 'Vogue',  salesText: 'Hot selling item',      stock: 8,  img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop',   hoverImg: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&auto=format&fit=crop' },
  { id: 1, title: 'Urban Runner Mesh Sneakers',  price: 30, oldPrice: 31, rating: 5, brand: 'Nike',  salesText: '3 units sold recently',  stock: 12, img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop',   hoverImg: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop' },
  { id: 5, title: 'Structured Leather Tote Bag', price: 45, oldPrice: 60, rating: 5, brand: 'Mahak', salesText: 'New Arrival',            stock: 6,  img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop',      hoverImg: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop', isNew: true },
  { id: 6, title: 'Washed Canvas Baseball Cap',  price: 9,  oldPrice: 28, rating: 5, brand: 'Urban', salesText: 'Best Seller',            stock: 20, img: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=600&auto=format&fit=crop',   hoverImg: 'https://images.unsplash.com/photo-1587920149371-ac728dcd7389?q=80&w=600&auto=format&fit=crop' },
];

const brandLogos = [
  { name: 'Nike',   img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/120px-Logo_NIKE.svg.png' },
  { name: 'D&G',    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Dolce%26Gabbana_logo.svg/160px-Dolce%26Gabbana_logo.svg.png' },
  { name: 'Puma',   img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Puma_logo.svg/120px-Puma_logo.svg.png' },
  { name: 'Adidas', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_logo.svg/120px-Adidas_logo.svg.png' },
  { name: 'Vogue',  img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Vogue_logo.svg/160px-Vogue_logo.svg.png' },
  { name: 'Levis',  img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Levi%27s_logo.svg/120px-Levi%27s_logo.svg.png' },
];

/* ═══════════ MARQUEE CARD ═══════════ */
function MarqueeCard({ product, onAdd, onWish, isWished, justAdded }) {
  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : null;

  return (
    <div className="group w-[260px] sm:w-[300px] lg:w-[340px] shrink-0 relative aspect-[3/4] overflow-hidden cursor-pointer rounded-2xl transition-all duration-500 hover:shadow-2xl hover:shadow-amber-200/40">
      {/* Primary image */}
      <img src={product.img} alt={product.title} loading="lazy" draggable={false}
        className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-108 group-hover:scale-110 opacity-100 group-hover:opacity-0" />
      {/* Hover swap */}
      {product.hoverImg && (
        <img src={product.hoverImg} alt="" loading="lazy" draggable={false} aria-hidden
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 opacity-0 group-hover:opacity-100" />
      )}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/15 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Badges */}
      <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none">
        {discount && (
          <span className="bg-white text-neutral-900 text-[10px] font-bold px-3 py-1 rounded-full shadow-lg tracking-wider uppercase">
            -{discount}%
          </span>
        )}
        {product.isNew && (
          <span className="bg-neutral-900/80 backdrop-blur text-white text-[9px] font-bold px-3 py-1 rounded-full tracking-[0.2em] uppercase flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" /> New
          </span>
        )}
      </div>

      {/* Brand tag */}
      <span className="absolute top-4 right-4 bg-white/15 backdrop-blur-md text-white text-[9px] font-semibold px-3 py-1 rounded-full border border-white/20 tracking-[0.2em] uppercase pointer-events-none">
        {product.brand}
      </span>

      {/* Wishlist heart */}
      <button
        onClick={(e) => { e.stopPropagation(); onWish(product); }}
        aria-label="Wishlist"
        className={`absolute top-14 right-4 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 pointer-events-auto
          ${isWished ? 'bg-red-500 text-white opacity-100 scale-100' : 'bg-white/20 text-white opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-red-500'}`}>
        <Heart className={`w-4 h-4 ${isWished ? 'fill-current' : ''}`} />
      </button>

      {/* Quick add — slides up on hover */}
      <button
        onClick={(e) => { e.stopPropagation(); onAdd(product); }}
        className={`absolute top-3 left-1/2 -translate-x-1/2 translate-y-[-120%] group-hover:translate-y-0 transition-all duration-400 ease-out
          ${justAdded ? 'bg-emerald-600' : 'bg-white/95 backdrop-blur'} text-neutral-900 text-[10px] font-bold uppercase tracking-[0.2em] px-5 py-2.5 rounded-full shadow-xl flex items-center gap-2 pointer-events-auto group-hover:pointer-events-auto`}>
        {justAdded ? <><Check className="w-3.5 h-3.5" /> Added</> : <><ShoppingBag className="w-3.5 h-3.5" /> Quick Add</>}
      </button>

      {/* Bottom content */}
      <div className="absolute bottom-0 inset-x-0 p-5 lg:p-6 pointer-events-none">
        <h3 className="text-base sm:text-lg font-medium tracking-wide text-white leading-snug drop-shadow-sm">
          {product.title}
        </h3>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-white drop-shadow-sm">${product.price}.00</span>
            {product.oldPrice && <span className="text-[12px] text-white/50 line-through">${product.oldPrice}.00</span>}
          </div>
          <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-400">
            <ArrowRight className="w-4 h-4 text-white -rotate-45" />
          </div>
        </div>
        <p className="text-[10px] text-white/45 tracking-wider uppercase mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
          {product.salesText}
        </p>
      </div>
    </div>
  );
}

/* ═══════════ MAIN ═══════════ */
export default function PromoAndBrands({ onProductSelect }) {
  const { addToCart } = useCart();
  const [justAddedId, setJustAddedId] = useState(null);
  const [toast, setToast] = useState(null);
  const [wished, setWished] = useState(() => new Set(readStore(WISH_KEY).map((i) => i.id)));

  /* Row A: normal order — Row B: reversed for opposite direction feel */
  const rowA = [...slideProducts, ...slideProducts];
  const rowB = [...slideProducts.slice().reverse(), ...slideProducts.slice().reverse()];

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  };

  const handleAdd = (product) => {
    addToCart(product, 1);
    setJustAddedId(product.id);
    setTimeout(() => setJustAddedId(null), 1500);
    showToast(`✓ ${product.title} added to your bag`);
  };

  const handleWish = (product) => {
    const added = toggleWishlist(product);
    setWished((prev) => {
      const n = new Set(prev);
      added ? n.add(product.id) : n.delete(product.id);
      return n;
    });
    showToast(added ? `♥ ${product.title} saved to wishlist` : 'Removed from wishlist');
  };

  const handleCardClick = (product) => onProductSelect?.(product);

  return (
    <section className="w-full select-none relative" style={{ overflowX: 'clip', overflowY: 'visible' }}>

      <style>{`
        .ghost-word { font-family: 'Playfair Display', serif; font-style: italic; font-weight: 700;
          -webkit-text-stroke: 1px rgba(0,0,0,0.05); color: transparent;
          user-select: none; pointer-events: none; line-height: 1; white-space: nowrap; }

        @keyframes marqueeL { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes marqueeR { from { transform: translateX(-50%); } to { transform: translateX(0); } }

        .track-l { animation: marqueeL 45s linear infinite; }
        .track-r { animation: marqueeR 52s linear infinite; }
        .marquee-zone:hover .track-l,
        .marquee-zone:hover .track-r { animation-play-state: paused; }

        .brand-marquee { animation: marqueeL 30s linear infinite; }
        .brand-zone:hover .brand-marquee { animation-play-state: paused; }

        @media (prefers-reduced-motion: reduce) {
          .track-l, .track-r, .brand-marquee { animation: none !important; }
        }
      `}</style>

      {/* ══════════ SOFT GLOWY BACKGROUND ══════════ */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/40 via-orange-50/30 to-rose-50/40 pointer-events-none" />
      <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-amber-200/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[5%] right-[20%] w-[400px] h-[400px] bg-rose-200/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-orange-100/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10">

        {/* ══════════ HEADER ══════════ */}
        <div className="text-center mb-10 px-5 relative">
          <span className="ghost-word absolute left-1/2 -translate-x-1/2 -top-10 sm:-top-14 text-[4.5rem] sm:text-[7rem]">Trending</span>

          <span className="relative text-[10px] tracking-[0.4em] text-neutral-400 uppercase font-medium block mb-3">
            Trending Now
          </span>
          <h2 className="relative text-2xl md:text-4xl font-serif font-medium tracking-tight text-neutral-900 flex items-center justify-center gap-3">
            <Flame className="w-5 h-5 text-amber-500 hidden sm:block" />
            Shop The Look
            <Flame className="w-5 h-5 text-amber-500 hidden sm:block" />
          </h2>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent mx-auto mt-4" />
          <p className="relative text-[10px] tracking-[0.25em] text-neutral-400 uppercase mt-4">
            Hover to pause · click to explore
          </p>
        </div>

        {/* ══════════ DUAL MARQUEE ══════════ */}
        <div className="marquee-zone space-y-5 lg:space-y-7">

          {/* ── ROW A → ── */}
          <div className="relative overflow-x-clip overflow-y-visible py-2">
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-orange-50/90 via-amber-50/60 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-rose-50/90 via-rose-50/60 to-transparent z-10 pointer-events-none" />

            <div className="track-l flex w-max items-center gap-5 lg:gap-7">
              {rowA.map((card, idx) => (
                <div key={`a-${idx}`} onClick={() => handleCardClick(card)}>
                  <MarqueeCard product={card} onAdd={handleAdd} onWish={handleWish}
                    isWished={wished.has(card.id)} justAdded={justAddedId === card.id} />
                </div>
              ))}
            </div>
          </div>

          {/* ── ROW B ← ── */}
          <div className="relative overflow-x-clip overflow-y-visible py-2">
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-rose-50/90 via-rose-50/60 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-orange-50/90 via-amber-50/60 to-transparent z-10 pointer-events-none" />

            <div className="track-r flex w-max items-center gap-5 lg:gap-7">
              {rowB.map((card, idx) => (
                <div key={`b-${idx}`} onClick={() => handleCardClick(card)}>
                  <MarqueeCard product={card} onAdd={handleAdd} onWish={handleWish}
                    isWished={wished.has(card.id)} justAdded={justAddedId === card.id} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════ BRAND LOGOS — infinite marquee ══════════ */}
        <div className="border-t border-neutral-200/50 mt-14 lg:mt-20 py-8 lg:py-10 brand-zone relative">
          <p className="text-center text-[9px] tracking-[0.4em] text-neutral-400 uppercase font-semibold mb-6">
            Trusted by the world's finest labels
          </p>

          <div className="relative overflow-x-clip">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-orange-50/90 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-rose-50/90 to-transparent z-10 pointer-events-none" />

            <div className="brand-marquee flex w-max items-center gap-16 lg:gap-24 px-8">
              {[...brandLogos, ...brandLogos].map((brand, i) => (
                <div key={i} className="flex items-center justify-center h-12 group cursor-pointer shrink-0">
                  <img
                    src={brand.img}
                    alt={brand.name}
                    draggable={false}
                    className="max-h-9 lg:max-h-10 max-w-[110px] object-contain grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-90 group-hover:scale-110 transition-all duration-500"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <span className="font-serif text-lg font-medium text-neutral-400 tracking-wider hidden group-hover:text-neutral-700 transition-colors">
                    {brand.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════ TOAST ══════════ */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ type: 'spring', damping: 22, stiffness: 320 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[80] bg-neutral-900 text-white text-xs font-medium px-6 py-3.5 rounded-full shadow-2xl whitespace-nowrap max-w-[90vw] overflow-hidden text-ellipsis">
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}