import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, Eye, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toggleWishlist } from '../lib/store';
import ProductDetail from '../components/ProductDetail';

const EASE = [0.22, 1, 0.36, 1];

const products = [
  { id: 1, title: 'Structured Tailored Blazer', price: 295, oldPrice: 340, rating: 5, brand: 'Mahak Couture', stock: 6, img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop' },
  { id: 2, title: 'Minimalist Leather Tote', price: 185, oldPrice: 220, rating: 5, brand: 'Mahak Couture', stock: 5, img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop' },
  { id: 3, title: 'Urban Runner Mesh Sneakers', price: 95, oldPrice: 140, rating: 5, brand: 'Mahak Couture', stock: 12, img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop' },
  { id: 4, title: 'Retro Aviator Sunglasses', price: 42, oldPrice: 65, rating: 4, brand: 'Mahak Couture', stock: 15, img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&auto=format&fit=crop' },
  { id: 5, title: 'Washed Canvas Baseball Cap', price: 28, oldPrice: 42, rating: 5, brand: 'Mahak Couture', stock: 20, img: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1587920149371-ac728dcd7389?q=80&w=600&auto=format&fit=crop' },
  { id: 6, title: 'Emerald Gold Wrist Watch', price: 38, oldPrice: 45, rating: 5, brand: 'Mahak Couture', stock: 7, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=600&auto=format&fit=crop' },
  { id: 7, title: 'Suede Chelsea Ankle Boots', price: 210, rating: 5, brand: 'Mahak Couture', stock: 3, img: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?q=80&w=600&auto=format&fit=crop' },
  { id: 8, title: 'Quilted Puffer Backpack', price: 68, oldPrice: 99, rating: 5, brand: 'Mahak Couture', stock: 8, img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=600&auto=format&fit=crop' },
];

export default function Products() {
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
    showToast(`✓ ${p.title} added to your bag`);
  };

  const handleWish = (e, p) => {
    e.stopPropagation();
    showToast(toggleWishlist(p) ? `♥ ${p.title} saved to wishlist` : 'Removed from wishlist');
  };

  return (
    <motion.main initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="bg-white min-h-screen">

      <style>{`
        .pd-ghost { font-family: 'Playfair Display', serif; font-style: italic; font-weight: 700;
          -webkit-text-stroke: 1px rgba(0,0,0,0.05); color: transparent;
          user-select: none; pointer-events: none; line-height: 1; white-space: nowrap; }
      `}</style>

      <div className="bg-neutral-50 py-12 lg:py-16 border-b border-neutral-100 relative overflow-hidden">
        <span className="pd-ghost absolute top-8 left-1/2 -translate-x-1/2 text-[4.5rem] sm:text-[6rem] opacity-60">All</span>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 text-center relative">
          <span className="text-[10px] tracking-[0.35em] text-red-400 uppercase font-medium block mb-3">🔥 Hot Right Now</span>
          <h1 className="text-3xl md:text-5xl font-serif font-medium tracking-tight text-neutral-900">All Products</h1>
          <p className="mt-3 text-neutral-400 text-sm">Curated selection of our finest pieces</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
          {products.map((product, i) => (
            <motion.div key={product.id}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.06, duration: 0.55, ease: EASE }}
              className="group cursor-pointer" onClick={() => setDetail(product)}>

              <div className="relative w-full aspect-[3/4] bg-neutral-50 overflow-hidden rounded-xl mb-4">
                <img src={product.img} alt={product.title} loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-top group-hover:opacity-0 group-hover:scale-105 transition-all duration-700" />
                <img src={product.hoverImg} alt="" loading="lazy" aria-hidden draggable={false}
                  className="absolute inset-0 w-full h-full object-cover object-top opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />

                {product.oldPrice && (() => {
                  const d = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
                  return <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">-{d}%</span>;
                })()}
                {product.stock <= 5 && (
                  <span className="absolute top-12 left-3 bg-orange-500 text-white text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest">Only {product.stock} left</span>
                )}

                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-100 md:opacity-0 translate-x-0 md:translate-x-2 md:group-hover:opacity-100 md:group-hover:translate-x-0 transition-all duration-300">
                  <button onClick={(e) => handleWish(e, product)} aria-label="Wishlist"
                    className="w-9 h-9 bg-white text-neutral-500 hover:text-red-500 hover:scale-110 flex items-center justify-center rounded-full shadow-md transition-all">
                    <Heart size={15} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); setDetail(product); }} aria-label="Quick view"
                    className="w-9 h-9 bg-white text-neutral-500 hover:text-neutral-900 hover:scale-110 flex items-center justify-center rounded-full shadow-md transition-all">
                    <Eye size={15} />
                  </button>
                </div>

                <div className="absolute bottom-0 inset-x-0 translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-500">
                  <button onClick={(e) => handleAdd(e, product)}
                    className={`w-full text-white text-[11px] font-bold py-3.5 tracking-[0.15em] uppercase flex items-center justify-center gap-2 transition-colors ${
                      justAdded === product.id ? 'bg-emerald-700' : 'bg-neutral-900 hover:bg-black'
                    }`}>
                    {justAdded === product.id ? <><Check size={14} /> Added ✓</> : <><ShoppingCart size={14} /> Add To Cart</>}
                  </button>
                </div>
              </div>

              <span className="text-[10px] tracking-[0.2em] text-neutral-400 uppercase font-medium">{product.brand}</span>
              <h3 className="text-[14px] font-medium text-neutral-800 leading-snug mt-0.5 line-clamp-2 group-hover:text-amber-700 transition-colors">{product.title}</h3>
              <div className="flex items-center gap-0.5 mt-1.5">
                {[...Array(5)].map((_, j) => <Star key={j} size={12} className={j < product.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-200'} />)}
              </div>
              <div className="flex items-center gap-2.5 mt-1.5">
                <span className="text-[15px] font-bold text-neutral-900">${product.price}.00</span>
                {product.oldPrice && <span className="text-[13px] text-neutral-400 line-through">${product.oldPrice}.00</span>}
              </div>
            </motion.div>
          ))}
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