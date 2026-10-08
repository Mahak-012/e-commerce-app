import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, Eye, ShoppingCart, Flame, Zap, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toggleWishlist } from '../lib/store';
import ProductDetail from '../components/ProductDetail';

const EASE = [0.22, 1, 0.36, 1];

const dealProducts = [
  { id: 101, title: 'Classic Leather Crossbody Bag', price: 29, oldPrice: 89, rating: 5, brand: 'Mahak Couture', stock: 4, img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop' },
  { id: 102, title: 'Premium Oxford Button-Down Shirt', price: 19, oldPrice: 55, rating: 5, brand: 'Mahak Couture', stock: 8, img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=600&auto=format&fit=crop' },
  { id: 103, title: 'Retro Aviator Polarized Sunglasses', price: 15, oldPrice: 42, rating: 4, brand: 'Mahak Couture', stock: 12, img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&auto=format&fit=crop' },
  { id: 104, title: 'Urban Runner Pro Mesh Sneakers', price: 35, oldPrice: 95, rating: 5, brand: 'Mahak Couture', stock: 5, img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop' },
  { id: 105, title: 'Washed Canvas Baseball Cap', price: 9, oldPrice: 28, rating: 5, brand: 'Mahak Couture', stock: 20, img: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1587920149371-ac728dcd7389?q=80&w=600&auto=format&fit=crop' },
  { id: 106, title: 'Structured Mini Top Handle Bag', price: 25, oldPrice: 72, rating: 4, brand: 'Mahak Couture', stock: 3, img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop' },
  { id: 107, title: 'Slim Fit Mandarin Collar Shirt', price: 17, oldPrice: 48, rating: 5, brand: 'Mahak Couture', stock: 9, img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop' },
  { id: 108, title: 'Classic Wayfarer Matte Shades', price: 12, oldPrice: 35, rating: 5, brand: 'Mahak Couture', stock: 15, img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop' },
];

export default function TopDeals() {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(null);
  const [toast, setToast] = useState(null);
  const [detail, setDetail] = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2200); };

  const handleAdd = (e, p) => {
    e.stopPropagation();
    addToCart(p, 1);
    setJustAdded(p.id);
    setTimeout(() => setJustAdded(null), 1400);
    const pct = Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);
    showToast(`🔥 ${p.title} — ${pct}% off grabbed!`);
  };

  const handleWish = (e, p) => {
    e.stopPropagation();
    showToast(toggleWishlist(p) ? `♥ ${p.title} saved to wishlist` : 'Removed from wishlist');
  };

  return (
    <motion.main initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="min-h-screen relative overflow-hidden">

      <style>{`
        .td-ghost { font-family: 'Playfair Display', serif; font-style: italic; font-weight: 700;
          -webkit-text-stroke: 1px rgba(239,68,68,0.12); color: transparent;
          user-select: none; pointer-events: none; line-height: 1; white-space: nowrap; }
      `}</style>

      <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 via-orange-50/30 to-amber-50/40" />
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-red-200/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-orange-200/15 rounded-full blur-[100px]" />

      <div className="relative z-10">
        <div className="py-12 lg:py-16 relative">
          <span className="td-ghost absolute top-6 left-1/2 -translate-x-1/2 text-[5rem] sm:text-[7rem] pointer-events-none">Deals</span>
          <div className="max-w-[1400px] mx-auto px-5 sm:px-8 text-center relative">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-1.5 rounded-full mb-4 border border-red-200/60">
              <Flame className="w-4 h-4 animate-pulse" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase">Limited Time</span>
              <Zap className="w-3.5 h-3.5 animate-pulse" />
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-medium tracking-tight text-neutral-900">Top Deals</h1>
            <p className="mt-3 text-neutral-500 text-sm">Up to 68% off — grab before they're gone!</p>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 pb-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
            {dealProducts.map((product, i) => {
              const discountPct = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
              const saved = product.oldPrice - product.price;
              return (
                <motion.div key={product.id}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: (i % 4) * 0.06, duration: 0.55, ease: EASE }}
                  className="group cursor-pointer" onClick={() => setDetail(product)}>

                  <div className="relative w-full aspect-[3/4] bg-white/70 overflow-hidden rounded-xl border border-red-100/40 shadow-sm group-hover:shadow-xl group-hover:shadow-red-100/40 transition-shadow duration-500">
                    <img src={product.img} alt={product.title} loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover object-top group-hover:opacity-0 group-hover:scale-105 transition-all duration-700" />
                    <img src={product.hoverImg} alt="" loading="lazy" aria-hidden draggable={false}
                      className="absolute inset-0 w-full h-full object-cover object-top opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />

                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      <span className="bg-red-600 text-white text-[11px] font-extrabold px-3 py-1.5 rounded-full shadow-lg shadow-red-200/60">-{discountPct}%</span>
                      {discountPct >= 60 && <span className="bg-orange-500 text-white text-[8px] font-black px-2 py-1 rounded-full animate-pulse tracking-widest uppercase w-fit">🔥 Hot</span>}
                    </div>

                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-100 md:opacity-0 translate-x-0 md:translate-x-2 md:group-hover:opacity-100 md:group-hover:translate-x-0 transition-all duration-300">
                      <button onClick={(e) => handleWish(e, product)} aria-label="Wishlist"
                        className="w-9 h-9 bg-white/90 text-neutral-600 hover:text-red-500 hover:scale-110 flex items-center justify-center rounded-full shadow-md transition-all">
                        <Heart size={15} />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); setDetail(product); }} aria-label="Quick view"
                        className="w-9 h-9 bg-white/90 text-neutral-600 hover:text-neutral-900 hover:scale-110 flex items-center justify-center rounded-full shadow-md transition-all">
                        <Eye size={15} />
                      </button>
                    </div>

                    <div className="absolute bottom-0 inset-x-0 translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-500">
                      <button onClick={(e) => handleAdd(e, product)}
                        className={`w-full text-white text-[11px] font-bold py-3.5 tracking-[0.15em] uppercase flex items-center justify-center gap-2 transition-colors ${
                          justAdded === product.id ? 'bg-emerald-600' : 'bg-red-600 hover:bg-red-700'
                        }`}>
                        {justAdded === product.id ? <><Check size={14} /> Added ✓</> : <><ShoppingCart size={14} /> Add To Cart</>}
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 space-y-1.5 px-0.5">
                    <span className="text-[10px] tracking-[0.2em] text-neutral-400 uppercase font-medium">{product.brand}</span>
                    <h3 className="text-[14px] font-medium text-neutral-800 leading-snug line-clamp-2 group-hover:text-red-600 transition-colors">{product.title}</h3>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, j) => <Star key={j} size={12} className={j < product.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-200'} />)}
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-base font-extrabold text-red-600">${product.price}.00</span>
                      <span className="text-[13px] text-neutral-400 line-through">${product.oldPrice}.00</span>
                    </div>
                    <div className="inline-flex items-center gap-1 bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-100/50">
                      <Zap size={10} /> Save ${saved}!
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {detail && <ProductDetail product={detail} onBack={() => setDetail(null)} />}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ type: 'spring', damping: 22, stiffness: 320 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[80] bg-neutral-900 text-white text-xs font-medium px-6 py-3.5 rounded-full shadow-2xl whitespace-nowrap">
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}