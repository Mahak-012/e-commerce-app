import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star, Heart, Eye, ArrowRight, X, Plus, Minus,
  ShoppingBag, Check, Truck, RefreshCcw, ShieldCheck,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { WISH_KEY, readStore, toggleWishlist } from '../lib/store';

const EASE = [0.22, 1, 0.36, 1];
const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

const categoriesData = {
  trendsetters: [
    { id: 1,  title: 'Structured Tailored Blazer',   price: 45, oldPrice: 68, rating: 5, brand: 'Mahak Couture', salesText: '3 units sold recently', stock: 8,  img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop',  hoverImg: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop', colors: ['#1a1a1a', '#8a7968', '#d6cfc7'] },
    { id: 2,  title: 'Minimalist Leather Tote',      price: 39, oldPrice: 55, rating: 5, brand: 'Mahak Couture', salesText: '5 bags in stock',       stock: 5,  img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop',  hoverImg: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop',  colors: ['#3d2b1f', '#0f0f0f'] },
    { id: 3,  title: 'Classic Silhouette Trench',    price: 49, rating: 4,  brand: 'Mahak Couture', salesText: 'Hot selling item',      stock: 12, img: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=600&auto=format&fit=crop',  hoverImg: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=600&auto=format&fit=crop', colors: ['#c9b8a3', '#2b2b2b'], isNew: true },
    { id: 4,  title: 'Atelier Monogram Knitwear',    price: 35, oldPrice: 48, rating: 5, brand: 'Mahak Couture', salesText: 'Limited Edition',       stock: 3,  img: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop',  hoverImg: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=600&auto=format&fit=crop', colors: ['#e8e2d9', '#1a1a1a'] },
    { id: 5,  title: 'Washed Canvas Baseball Cap',   price: 19, oldPrice: 32, rating: 5, brand: 'Mahak Couture', salesText: 'Best choice reward',    stock: 20, img: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=600&auto=format&fit=crop',  hoverImg: 'https://images.unsplash.com/photo-1587920149371-ac728dcd7389?q=80&w=600&auto=format&fit=crop', colors: ['#1a1a1a', '#7a8b99'] },
    { id: 6,  title: 'Statement Wool Overcoat',      price: 48, oldPrice: 65, rating: 5, brand: 'Mahak Couture', salesText: '10 items left',         stock: 10, img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop',  hoverImg: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600&auto=format&fit=crop', colors: ['#2b2b2b', '#5c6b73'] },
    { id: 7,  title: 'Cropped Tweed Jacket',         price: 42, rating: 4,  brand: 'Mahak Couture', salesText: 'Super slim edition',    stock: 6,  img: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=600&auto=format&fit=crop',     hoverImg: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop', colors: ['#dcd4c4', '#1a1a1a'], isNew: true },
    { id: 8,  title: 'Tailored Linen Trousers',      price: 29, oldPrice: 42, rating: 5, brand: 'Mahak Couture', salesText: 'Fast shipping available', stock: 15, img: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?q=80&w=600&auto=format&fit=crop', colors: ['#efe9df', '#26323f'] },
  ],
  essentials: [
    { id: 9,  title: 'Cashmere Crew Sweater',        price: 38, oldPrice: 52, rating: 5, brand: 'Mahak Couture', salesText: 'Winter favorite',   stock: 7,  img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop', colors: ['#c4b5a5', '#1a1a1a'] },
    { id: 10, title: 'Silk Pocket Square Set',       price: 22, rating: 4,  brand: 'Mahak Couture', salesText: 'Gift-ready box',    stock: 25, img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1610652492500-ded49ceeb378?q=80&w=600&auto=format&fit=crop', colors: ['#f5f0e8', '#1a1a1a'] },
    { id: 11, title: 'Merino Wool Scarf',            price: 27, oldPrice: 38, rating: 5, brand: 'Mahak Couture', salesText: '2 left in stock',   stock: 2,  img: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=600&auto=format&fit=crop', colors: ['#8a7968', '#26323f'] },
    { id: 12, title: 'Leather Belt Classic',         price: 24, rating: 4,  brand: 'Mahak Couture', salesText: 'Everyday essential', stock: 18, img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop',   hoverImg: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=600&auto=format&fit=crop', colors: ['#3d2b1f', '#0f0f0f'] },
  ],
  luxury: [
    { id: 13, title: 'Hand-Stitched Oxfords',        price: 49, rating: 5,  brand: 'Mahak Couture', salesText: 'Artisan crafted',    stock: 5,  img: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?q=80&w=600&auto=format&fit=crop', colors: ['#3d2b1f', '#0f0f0f'] },
    { id: 14, title: 'Italian Wool Suit',            price: 47, oldPrice: 62, rating: 5, brand: 'Mahak Couture', salesText: 'Made in Italy',     stock: 4,  img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=600&auto=format&fit=crop', colors: ['#1a1a1a', '#26323f'] },
    { id: 15, title: 'Platinum Cufflinks',           price: 33, rating: 5,  brand: 'Mahak Couture', salesText: 'Exclusive edition',  stock: 9,  img: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop', colors: ['#c0c0c0', '#d4af37'] },
    { id: 16, title: 'Velvet Dinner Jacket',         price: 46, oldPrice: 59, rating: 4,  brand: 'Mahak Couture', salesText: 'Red carpet ready',  stock: 3,  img: 'https://images.unsplash.com/photo-1593030103066-0093718e7177?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop', colors: ['#1a1a2e', '#5c1a2e'], isNew: true },
  ],
};

/* ═══════════ PRODUCT CARD ═══════════ */
function ProductCard({ product, index, wished, onWish, onQuickView, onAdd, justAdded, setHoveredId, hoveredId }) {
  const isHovered = hoveredId === product.id;
  const isWished  = wished.has(product.id);
  const discount  = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : null;
  const lowStock  = product.stock != null && product.stock <= 5;
  const stockPct  = product.stock != null ? Math.min(100, (product.stock / 20) * 100) : null;

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } } }}
      onMouseEnter={() => setHoveredId(product.id)}
      onMouseLeave={() => setHoveredId(null)}
      className="group cursor-pointer"
    >
      {/* ── IMAGE AREA ── */}
      <div className="relative w-full aspect-[3/4] bg-neutral-100 overflow-hidden mb-4 rounded-xl border border-neutral-100/60 shadow-sm group-hover:shadow-xl group-hover:shadow-amber-100/40 transition-all duration-500">

        {/* Primary image */}
        <img src={product.img} alt={product.title} loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ease-out group-hover:scale-105 ${isHovered ? 'opacity-0' : 'opacity-100'}`} />
        {/* Hover swap image */}
        {product.hoverImg && (
          <img src={product.hoverImg} alt="" loading="lazy" aria-hidden
            className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ease-out group-hover:scale-105 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
        )}

        {/* Hover veil */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {discount && <span className="bg-neutral-900 text-white text-[10px] font-semibold tracking-wider px-2.5 py-1 uppercase shadow-md rounded-sm">-{discount}%</span>}
          {product.isNew && <span className="bg-white text-neutral-900 border border-neutral-200 text-[10px] font-semibold tracking-wider px-2.5 py-1 uppercase shadow-md rounded-sm">New</span>}
        </div>

        {/* Quick actions — desktop hover, always visible mobile */}
        <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-100 md:opacity-0 md:translate-x-2'}`}>
          <button
            onClick={(e) => { e.stopPropagation(); onWish(product); }}
            aria-label="Add to wishlist"
            className={`w-9 h-9 backdrop-blur-sm flex items-center justify-center transition-all shadow-md rounded-full ${isWished ? 'bg-red-500 text-white scale-110' : 'bg-white/95 text-neutral-500 hover:text-red-500 hover:scale-110'}`}>
            <Heart className={`w-4 h-4 ${isWished ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
            aria-label="Quick view"
            className="w-9 h-9 bg-white/95 backdrop-blur-sm text-neutral-500 hover:text-neutral-900 hover:scale-110 flex items-center justify-center transition-all shadow-md rounded-full">
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Color swatches */}
        {product.colors && (
          <div className={`absolute bottom-14 left-3 flex gap-1.5 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            {product.colors.map((c) => (
              <span key={c} title={c}
                className="w-4 h-4 rounded-full border-2 border-white shadow ring-1 ring-neutral-300 cursor-pointer hover:scale-125 transition-transform"
                style={{ background: c }} />
            ))}
          </div>
        )}

        {/* ADD TO CART slide-up */}
        <div className={`absolute bottom-0 inset-x-0 transition-transform duration-500 ease-out ${isHovered ? 'translate-y-0' : 'translate-y-0 md:translate-y-full'}`}>
          <button
            onClick={(e) => { e.stopPropagation(); onAdd(product); }}
            className={`w-full backdrop-blur-sm text-white text-[11px] font-semibold py-3.5 tracking-[0.2em] uppercase flex items-center justify-center gap-2 transition-colors ${justAdded === product.id ? 'bg-emerald-700' : 'bg-neutral-900/95 hover:bg-black'}`}>
            {justAdded === product.id
              ? <><Check className="w-4 h-4" /> Added ✓</>
              : <><ShoppingBag className="w-4 h-4" /> Add To Cart</>}
          </button>
        </div>
      </div>

      {/* ── INFO ── */}
      <div className="space-y-1.5 px-0.5">
        <span className="text-[10px] tracking-[0.2em] text-neutral-400 uppercase font-medium block">{product.brand}</span>
        <h3 className="text-sm sm:text-[15px] font-medium text-neutral-800 leading-snug line-clamp-2 group-hover:text-amber-700 transition-colors duration-300">{product.title}</h3>
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => <Star key={i} className={`w-3 h-3 ${i < product.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-200'}`} />)}
          <span className="text-[11px] text-neutral-400 ml-1">({product.rating}.0)</span>
        </div>
        <div className="flex items-center gap-2.5 pt-0.5">
          <span className="text-base sm:text-lg font-semibold text-neutral-900">${product.price}.00</span>
          {product.oldPrice && <span className="text-[13px] text-neutral-400 line-through font-light">${product.oldPrice}.00</span>}
        </div>

        {/* Stock urgency bar */}
        {stockPct != null && (
          <div className="pt-1">
            <div className="flex justify-between items-center mb-1">
              <p className="text-[10.5px] text-neutral-400 tracking-wide">{product.salesText}</p>
              {lowStock && <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">Only {product.stock} left</span>}
            </div>
            <div className="h-[3px] bg-neutral-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${stockPct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: EASE }}
                className={`h-full rounded-full ${lowStock ? 'bg-red-400' : 'bg-amber-400'}`} />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ═══════════ QUICK VIEW MODAL ═══════════ */
function QuickView({ product, onClose, onAdd, wished, onWish }) {
  const [size, setSize]     = useState('M');
  const [qty, setQty]       = useState(1);
  const [added, setAdded]   = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [onClose]);

  if (!product) return null;
  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : null;
  const isWished = wished.has(product.id);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.4, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative grid sm:grid-cols-2">

        <button onClick={onClose} aria-label="Close"
          className="absolute top-4 right-4 z-10 w-9 h-9 bg-white/90 border border-neutral-200 rounded-full flex items-center justify-center hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all">
          <X className="w-4 h-4" />
        </button>

        {/* Image */}
        <div className="relative aspect-[3/4] sm:aspect-auto sm:min-h-[520px] bg-neutral-100 overflow-hidden sm:rounded-l-2xl">
          <img src={product.img} alt={product.title} className="absolute inset-0 w-full h-full object-cover" />
          {discount && <span className="absolute top-4 left-4 bg-neutral-900 text-white text-[10px] font-semibold tracking-wider px-3 py-1.5 uppercase">-{discount}% Off</span>}
        </div>

        {/* Details */}
        <div className="p-7 sm:p-9 flex flex-col">
          <span className="text-[10px] tracking-[0.25em] text-neutral-400 uppercase font-medium">{product.brand}</span>
          <h3 className="text-xl sm:text-2xl font-serif font-medium text-neutral-900 mt-2 leading-snug">{product.title}</h3>

          <div className="flex items-center gap-1 mt-3">
            {[...Array(5)].map((_, i) => <Star key={i} className={`w-3.5 h-3.5 ${i < product.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-200'}`} />)}
            <span className="text-xs text-neutral-400 ml-1.5">({product.rating}.0) · {product.salesText}</span>
          </div>

          <div className="flex items-baseline gap-3 mt-4">
            <span className="text-2xl font-semibold text-neutral-900">${product.price}.00</span>
            {product.oldPrice && <span className="text-sm text-neutral-400 line-through">${product.oldPrice}.00</span>}
          </div>

          {/* Colors */}
          {product.colors && (
            <div className="mt-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-2.5">Color</p>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <span key={c} className="w-7 h-7 rounded-full border-2 border-white shadow ring-1 ring-neutral-300 cursor-pointer hover:scale-110 transition-transform" style={{ background: c }} />
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2.5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold">Size</p>
              <button className="text-[10px] text-neutral-400 underline hover:text-neutral-900 transition-colors">Size Guide</button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {SIZES.map((s) => (
                <button key={s} onClick={() => setSize(s)}
                  className={`w-10 h-10 text-xs font-medium border transition-all duration-200 rounded-md ${size === s ? 'bg-neutral-900 text-white border-neutral-900' : 'border-neutral-200 text-neutral-600 hover:border-neutral-900'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Qty + Add */}
          <div className="flex gap-3 mt-7">
            <div className="flex items-center border border-neutral-200 rounded-md">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3 hover:bg-neutral-50" aria-label="Decrease"><Minus className="w-3.5 h-3.5" /></button>
              <span className="w-9 text-center text-sm font-semibold">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="p-3 hover:bg-neutral-50" aria-label="Increase"><Plus className="w-3.5 h-3.5" /></button>
            </div>
            <button
              onClick={() => { onAdd(product, qty); setAdded(true); setTimeout(() => setAdded(false), 1600); }}
              className={`flex-1 text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-md transition-colors flex items-center justify-center gap-2 ${added ? 'bg-emerald-700' : 'bg-neutral-900 hover:bg-black'}`}>
              {added ? <><Check className="w-4 h-4" /> Added to Bag</> : <><ShoppingBag className="w-4 h-4" /> Add to Bag</>}
            </button>
            <button onClick={() => onWish(product)} aria-label="Wishlist"
              className={`w-12 rounded-md border flex items-center justify-center transition-all ${isWished ? 'bg-red-500 border-red-500 text-white' : 'border-neutral-200 text-neutral-500 hover:border-red-400 hover:text-red-500'}`}>
              <Heart className={`w-4 h-4 ${isWished ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-7 pt-6 border-t border-neutral-100 grid grid-cols-3 gap-2 text-center">
            {[
              { icon: Truck,      t: 'Free Ship',  s: 'Over $50' },
              { icon: RefreshCcw, t: '7-Day',      s: 'Returns' },
              { icon: ShieldCheck, t: 'Authentic', s: 'Guaranteed' },
            ].map(({ icon: Icon, t, s }) => (
              <div key={t} className="flex flex-col items-center gap-1">
                <Icon className="w-4 h-4 text-neutral-400 stroke-[1.5]" />
                <p className="text-[10px] font-bold text-neutral-700 uppercase tracking-wider">{t}</p>
                <p className="text-[9px] text-neutral-400">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════ MAIN SECTION ═══════════ */
export default function PopularProducts({ onProductSelect }) {
  const { addToCart } = useCart();
  const [activeTab, setActiveTab]     = useState('trendsetters');
  const [hoveredId, setHoveredId]     = useState(null);
  const [justAdded, setJustAdded]     = useState(null);
  const [toast, setToast]             = useState(null);
  const [quickView, setQuickView]     = useState(null);
  const [wished, setWished]           = useState(() => new Set(readStore(WISH_KEY).map((i) => i.id)));

  const currentProducts = categoriesData[activeTab] || categoriesData.trendsetters;

  const handleAdd = (product, qty = 1) => {
    addToCart(product, qty);
    setJustAdded(product.id);
    setTimeout(() => setJustAdded(null), 1500);
    setToast(`✓ ${product.title} added to your bag`);
    setTimeout(() => setToast(null), 2400);
  };

  const handleWish = (product) => {
    const added = toggleWishlist(product); // navbar badge auto-updates
    setWished((prev) => {
      const n = new Set(prev);
      added ? n.add(product.id) : n.delete(product.id);
      return n;
    });
    setToast(added ? `♥ ${product.title} saved to wishlist` : `Removed from wishlist`);
    setTimeout(() => setToast(null), 2200);
  };

  return (
    <section className="w-full select-none relative overflow-hidden">

      <style>{`
        .ghost-word { font-family: 'Playfair Display', serif; font-style: italic; font-weight: 700;
          -webkit-text-stroke: 1px rgba(0,0,0,0.055); color: transparent;
          user-select: none; pointer-events: none; line-height: 1; white-space: nowrap; }
        .pv-scroll::-webkit-scrollbar { width: 5px; }
        .pv-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 10px; }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
      `}</style>

      {/* Ambient glows */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50/80 via-white to-amber-50/30" />
      <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-amber-100/20 rounded-full blur-[140px]" />
      <div className="absolute bottom-[5%] right-[15%] w-[400px] h-[400px] bg-orange-100/15 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24">

        {/* ── HEADER with ghost word ── */}
        <div className="text-center relative mb-14">
          <span className="ghost-word absolute left-1/2 -translate-x-1/2 -top-8 sm:-top-12 text-[4.5rem] sm:text-[7rem]">Collection</span>
          <span className="relative text-[11px] tracking-[0.35em] text-neutral-400 uppercase font-medium block mb-3">Curated Collections</span>
          <h2 className="relative text-3xl md:text-[40px] font-serif font-medium tracking-tight text-neutral-900 mb-10">Popular Products</h2>

          {/* Sliding tab underline */}
          <div className="relative flex justify-center gap-1 border-b border-neutral-200/60 max-w-lg mx-auto">
            {[
              { key: 'trendsetters', label: 'New Arrivals' },
              { key: 'essentials',   label: 'Featured' },
              { key: 'luxury',       label: 'Best Selling' },
            ].map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`relative px-6 py-3.5 text-[11px] tracking-[0.2em] font-medium uppercase transition-colors duration-300 ${activeTab === tab.key ? 'text-neutral-900' : 'text-neutral-400 hover:text-neutral-600'}`}>
                {tab.label}
                {activeTab === tab.key && (
                  <motion.span layoutId="ppTabUnderline" transition={{ type: 'spring', damping: 28, stiffness: 320 }}
                    className="absolute bottom-0 left-4 right-4 h-[2px] bg-neutral-900" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── GRID with tab transition ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="hidden" animate="show" exit={{ opacity: 0, y: -14, transition: { duration: 0.25 } }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10 lg:gap-x-7 lg:gap-y-14">
            {currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                wished={wished}
                onWish={handleWish}
                onQuickView={setQuickView}
                onAdd={handleAdd}
                justAdded={justAdded}
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── CTA ── */}
        <div className="text-center mt-14">
          <Link to="/shop" className="group inline-flex items-center gap-3 px-10 py-4 border border-neutral-900 text-neutral-900 text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-neutral-900 hover:text-white transition-all duration-300 hover:gap-4 hover:shadow-lg hover:shadow-neutral-900/10">
            View All Products
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* ── QUICK VIEW ── */}
      <AnimatePresence>
        {quickView && (
          <QuickView
            product={quickView}
            onClose={() => setQuickView(null)}
            onAdd={handleAdd}
            wished={wished}
            onWish={handleWish}
          />
        )}
      </AnimatePresence>

      {/* ── TOAST ── */}
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