import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star, ShieldCheck, ShoppingCart, ArrowLeft, RefreshCw, Heart, Share2,
  Scale, X, Check, Minus, Plus, Truck, BadgeCheck, ChevronRight, Zap,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { WISH_KEY, readStore, toggleWishlist } from '../lib/store';

const EASE = [0.22, 1, 0.36, 1];

/* ── Flash sale countdown (5h demo timer) ── */
function useCountdown() {
  const end = useMemo(() => Date.now() + 5 * 3600 * 1000 + 24 * 60 * 1000, []);
  const [left, setLeft] = useState(end - Date.now());
  useEffect(() => {
    const t = setInterval(() => setLeft(Math.max(0, end - Date.now())), 1000);
    return () => clearInterval(t);
  }, [end]);
  const h = Math.floor(left / 3600000);
  const m = Math.floor((left % 3600000) / 60000);
  const s = Math.floor((left % 60000) / 1000);
  return [h, m, s].map((v) => String(v).padStart(2, '0'));
}

/* ── Demo reviews ── */
const REVIEWS = [
  { name: 'Ayesha K.', date: '2 days ago',  rating: 5, text: 'Absolutely stunning quality — the fabric feels premium and the fit is exactly as described. Worth every rupee!' },
  { name: 'Hamza R.', date: '1 week ago',   rating: 5, text: 'Ordered twice already. Packaging was elegant, delivery was fast, and the stitching is flawless.' },
  { name: 'Sana M.',  date: '2 weeks ago',  rating: 4, text: 'Beautiful piece, slightly loose around the shoulders but the colour and finish are gorgeous.' },
];

export default function ProductDetail({ product, onBack }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  /* ── Gallery: img + hoverImg (+ gallery array if provided) ── */
  const gallery = useMemo(() => {
    const list = product.gallery || [product.img, product.hoverImg].filter(Boolean);
    return list.length ? list : [product.img];
  }, [product]);

  const [activeImg, setActiveImg]   = useState(gallery[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '#ef4444');
  const [selectedSize, setSelectedSize]   = useState(product.sizes?.[2] || 'M');
  const [quantity, setQuantity]     = useState(1);
  const [activeTab, setActiveTab]   = useState('description');
  const [added, setAdded]           = useState(false);
  const [toast, setToast]           = useState(null);
  const [wished, setWished]         = useState(() => new Set(readStore(WISH_KEY).map((i) => i.id)));
  const [zooming, setZooming]       = useState(false);
  const [zoomPos, setZoomPos]       = useState({ x: 50, y: 50 });
  const imgBoxRef = useRef(null);

  const [hh, mm, ss] = useCountdown();

  /* ── Reset + scroll lock per product ── */
  useEffect(() => {
    setActiveImg(gallery[0]);
    setQuantity(1);
    setAdded(false);
    const scrollY = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${scrollY}px`;
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      window.scrollTo(0, scrollY);
    };
  }, [product, gallery]);

  /* ── ESC to close ── */
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onBack?.();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onBack]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  };

  /* ── Handlers ── */
  const payload = () => ({ ...product, selectedColor, selectedSize });

  const handleAddToCart = () => {
    addToCart(payload(), quantity);
    setAdded(true);
    showToast(`✓ ${product.title} × ${quantity} added to your bag`);
    setTimeout(() => setAdded(false), 1600);
  };

  const handleBuyNow = () => {
    addToCart(payload(), quantity);
    onBack?.();
    navigate('/checkout');
  };

  const handleWishlist = () => {
    const addedNow = toggleWishlist(product); // Navbar badge auto-updates
    setWished((prev) => {
      const n = new Set(prev);
      addedNow ? n.add(product.id) : n.delete(product.id);
      return n;
    });
    showToast(addedNow ? '♥ Saved to your wishlist' : 'Removed from wishlist');
  };

  const handleShare = async () => {
    const shareData = {
      title: product.title,
      text: `${product.title} — $${product.price} at Mahak Couture`,
      url: window.location.href,
    };
    try {
      if (navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard.writeText(shareData.url);
        showToast('🔗 Link copied to clipboard');
      }
    } catch { /* user cancelled */ }
  };

  /* ── Zoom handlers ── */
  const onZoomMove = (e) => {
    const rect = imgBoxRef.current?.getBoundingClientRect();
    if (!rect) return;
    setZoomPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const isWished  = wished.has(product.id);
  const discount  = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : null;
  const colors    = product.colors || ['#1e40af', '#4ade80', '#ef4444', '#a16207'];
  const sizes     = product.sizes || ['XS', 'S', 'M', 'L', 'XL'];
  const stock     = product.stock ?? 6;
  const lowStock  = stock <= 5;

  const TABS = [
    { id: 'description', label: 'Description' },
    { id: 'reviews',     label: `Reviews (${REVIEWS.length})` },
    { id: 'shipping',    label: 'Shipping & Returns' },
  ];

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/55 backdrop-blur-sm z-40"
        onClick={() => onBack?.()}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 44, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 28, scale: 0.98 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="bg-white rounded-2xl max-w-[1200px] w-full max-h-[92vh] overflow-y-auto relative shadow-2xl select-none"
        >
          {/* Close */}
          <button
            onClick={() => onBack?.()}
            aria-label="Close"
            className="sticky top-4 float-right mr-4 z-20 w-10 h-10 rounded-full bg-white/90 border border-neutral-200 shadow-md flex items-center justify-center transition-all hover:bg-neutral-900 hover:text-white hover:border-neutral-900 hover:rotate-90 duration-300"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="py-6 px-4 sm:px-8 font-sans">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-neutral-400 mb-6 tracking-wide flex-wrap">
              <button onClick={() => onBack?.()} className="hover:text-black transition-colors flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Back
              </button>
              <ChevronRight className="w-3 h-3" />
              <span className="capitalize">{product.brand || 'Shop'}</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-neutral-600 line-clamp-1">{product.title}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">

              {/* ═══ LEFT: Gallery + Zoom ═══ */}
              <div className="md:col-span-6 grid grid-cols-12 gap-3.5 md:sticky md:top-0 md:self-start">
                {/* Thumbs */}
                <div className="col-span-3 sm:col-span-2 flex sm:flex-col gap-2.5 overflow-x-auto pb-1 sm:pb-0">
                  {gallery.map((gImg, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImg(gImg)}
                      className={`aspect-square w-14 sm:w-full shrink-0 bg-neutral-50 p-1 rounded-lg border transition-all duration-300 ${
                        activeImg === gImg ? 'border-neutral-900 shadow-sm' : 'border-neutral-100 hover:border-neutral-300'
                      }`}
                    >
                      <img src={gImg} alt={`View ${idx + 1}`} className="w-full h-full object-cover rounded" />
                    </button>
                  ))}
                </div>

                {/* Main zoom box */}
                <div
                  ref={imgBoxRef}
                  onMouseMove={onZoomMove}
                  onMouseEnter={() => setZooming(true)}
                  onMouseLeave={() => setZooming(false)}
                  className="col-span-9 sm:col-span-10 bg-neutral-50 aspect-square relative rounded-xl overflow-hidden cursor-zoom-in group"
                >
                  <img
                    src={activeImg}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-200 ease-out"
                    style={{
                      transform: zooming ? 'scale(1.9)' : 'scale(1)',
                      transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    }}
                  />

                  {/* Zoom hint */}
                  <AnimatePresence>
                    {!zooming && (
                      <motion.span
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute bottom-4 right-4 bg-white/85 backdrop-blur text-[10px] font-semibold tracking-widest uppercase text-neutral-600 px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5"
                      >
                        <Search className="w-3 h-3" /> Hover to zoom
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                    {discount && (
                      <span className="bg-neutral-900 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow">-{discount}%</span>
                    )}
                    {product.isNew && (
                      <span className="bg-white border border-neutral-200 text-neutral-900 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wider">New</span>
                    )}
                  </div>
                </div>
              </div>

              {/* ═══ RIGHT: Details ═══ */}
              <div className="md:col-span-6 flex flex-col space-y-5">

                {/* Brand + Title */}
                <div>
                  <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest block mb-1.5">
                    Brand: <span className="text-neutral-700">{product.brand || 'Mahak Couture'}</span>
                  </span>
                  <h1 className="text-2xl sm:text-[28px] font-semibold text-neutral-900 tracking-tight leading-tight">
                    {product.title}
                  </h1>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mt-3 pb-4 border-b border-neutral-100">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < (product.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-neutral-200'}`} />
                      ))}
                    </div>
                    <span className="text-xs text-neutral-500 font-medium">
                      {product.rating || 5}.0 · 128 reviews
                    </span>
                    <span className="text-neutral-200">|</span>
                    <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                      <BadgeCheck className="w-3.5 h-3.5" /> In stock
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-3 py-4 flex-wrap">
                    {product.oldPrice && (
                      <span className="text-neutral-400 line-through text-base font-light">${product.oldPrice}.00</span>
                    )}
                    <span className="text-3xl font-bold text-neutral-900">${product.price}.00</span>
                    {discount && (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
                        Save ${(product.oldPrice - product.price).toFixed(0)}
                      </span>
                    )}
                  </div>

                  {/* Flash sale countdown */}
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <p className="text-red-600 font-semibold text-xs bg-red-50 border border-red-100 px-3 py-2 rounded-full inline-flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                      <Zap className="w-3.5 h-3.5" /> Flash sale ends in
                    </p>
                    <div className="flex items-center gap-1.5">
                      {[hh, mm, ss].map((unit, i) => (
                        <React.Fragment key={i}>
                          <span className="bg-neutral-900 text-white text-xs font-bold w-9 h-9 rounded-lg flex items-center justify-center tabular-nums shadow-sm">
                            {unit}
                          </span>
                          {i < 2 && <span className="text-neutral-400 font-bold">:</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Stock bar */}
                  <div className="mt-4 mb-2">
                    <div className="flex justify-between items-center mb-1.5">
                      <p className="text-[11px] text-neutral-500">{product.salesText || 'Selling fast'}</p>
                      {lowStock && (
                        <span className="text-[10.5px] font-bold text-red-500 uppercase tracking-wider">Only {stock} left</span>
                      )}
                    </div>
                    <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden max-w-[280px]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (stock / 20) * 100)}%` }}
                        transition={{ duration: 1, ease: EASE }}
                        className={`h-full rounded-full ${lowStock ? 'bg-red-400' : 'bg-amber-400'}`}
                      />
                    </div>
                  </div>

                  {/* Colors */}
                  <div className="mt-6 space-y-2.5">
                    <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block">
                      Color <span className="text-neutral-300 normal-case font-normal">— {selectedColor}</span>
                    </span>
                    <div className="flex gap-2">
                      {colors.map((clr) => (
                        <button
                          key={clr}
                          onClick={() => setSelectedColor(clr)}
                          aria-label={`Color ${clr}`}
                          className={`w-8 h-8 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                            selectedColor === clr ? 'border-neutral-900 scale-110 shadow' : 'border-transparent hover:scale-105'
                          }`}
                          style={{ backgroundColor: clr }}
                        >
                          {selectedColor === clr && <Check className="w-3.5 h-3.5 text-white drop-shadow" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sizes */}
                  <div className="mt-5 space-y-2.5">
                    <div className="flex justify-between items-center max-w-[280px]">
                      <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Size</span>
                      <button className="text-xs text-neutral-500 underline hover:text-black transition-colors">Size Chart</button>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {sizes.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`h-10 min-w-[42px] px-3 text-xs font-semibold border rounded-full transition-all duration-300 ${
                            selectedSize === sz
                              ? 'bg-neutral-900 border-neutral-900 text-white shadow-md'
                              : 'bg-white border-neutral-200 text-neutral-800 hover:border-neutral-900'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Qty + Actions */}
                <div className="space-y-3.5 pt-4 border-t border-neutral-100">
                  <div className="flex gap-3">
                    {/* Qty stepper */}
                    <div className="flex items-center border border-neutral-300 h-12 bg-white rounded-full">
                      <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease"
                        className="px-4 text-neutral-500 hover:text-black h-full flex items-center transition-colors">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-neutral-900 tabular-nums">{quantity}</span>
                      <button onClick={() => setQuantity((q) => Math.min(stock, q + 1))} aria-label="Increase"
                        className="px-4 text-neutral-500 hover:text-black h-full flex items-center transition-colors">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Add to cart */}
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={handleAddToCart}
                      className={`flex-1 h-12 text-xs font-bold uppercase tracking-widest rounded-full transition-all flex items-center justify-center gap-2 shadow-md ${
                        added ? 'bg-emerald-700' : 'bg-neutral-900 hover:bg-black'
                      } text-white`}
                    >
                      {added
                        ? <><Check className="w-4 h-4" /> Added to Bag ✓</>
                        : <><ShoppingCart className="w-4 h-4" /> Add To Cart</>}
                    </motion.button>
                  </div>

                  {/* Buy now + wishlist row */}
                  <div className="flex gap-3">
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={handleBuyNow}
                      className="flex-[2] bg-white border-2 border-neutral-900 hover:bg-neutral-900 hover:text-white text-neutral-900 h-12 text-xs font-bold uppercase tracking-widest transition-all rounded-full flex items-center justify-center gap-2"
                    >
                      <Zap className="w-4 h-4" /> Buy Now
                    </motion.button>
                    <button
                      onClick={handleWishlist}
                      aria-label="Wishlist"
                      className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isWished
                          ? 'bg-red-500 border-red-500 text-white shadow-lg shadow-red-200'
                          : 'border-neutral-300 text-neutral-500 hover:border-red-400 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`w-4.5 h-4.5 w-[18px] h-[18px] ${isWished ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={handleShare}
                      aria-label="Share"
                      className="w-12 h-12 rounded-full border border-neutral-300 text-neutral-500 hover:border-neutral-900 hover:text-neutral-900 flex items-center justify-center transition-all duration-300"
                    >
                      <Share2 className="w-[18px] h-[18px]" />
                    </button>
                  </div>

                  {/* Utility row */}
                  <div className="flex items-center justify-start gap-6 text-xs text-neutral-500 pt-1">
                    <button className="flex items-center gap-1.5 hover:text-black transition-colors">
                      <Scale className="w-4 h-4" /> Compare
                    </button>
                    <span className="text-neutral-300">Free shipping over $50</span>
                    <span className="text-neutral-300">·</span>
                    <span className="text-neutral-300">COD available</span>
                  </div>

                  {/* Guarantee box */}
                  <div className="bg-neutral-50 p-4 sm:p-5 border border-neutral-200 rounded-2xl space-y-2.5 mt-2 text-xs text-neutral-600">
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>101% Original:</strong> Authenticity guaranteed directly from factory hubs.</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <RefreshCw className="w-4 h-4 text-blue-600 shrink-0" />
                      <span><strong>Free Shipping & Returns:</strong> On all domestic orders above $200.</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Truck className="w-4 h-4 text-amber-600 shrink-0" />
                      <span><strong>Fast Delivery:</strong> 2–4 working days nationwide.</span>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="pt-6">
                    <div className="flex gap-6 border-b border-neutral-200">
                      {TABS.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setActiveTab(t.id)}
                          className={`relative pb-3 text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors ${
                            activeTab === t.id ? 'text-neutral-900' : 'text-neutral-400 hover:text-neutral-600'
                          }`}
                        >
                          {t.label}
                          {activeTab === t.id && (
                            <motion.span layoutId="pdTabUnderline" transition={{ type: 'spring', damping: 28, stiffness: 320 }}
                              className="absolute bottom-0 left-0 right-0 h-[2px] bg-neutral-900" />
                          )}
                        </button>
                      ))}
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="pt-5"
                      >
                        {activeTab === 'description' && (
                          <div className="text-sm text-neutral-600 leading-[1.9] space-y-3">
                            <p>
                              The <strong className="text-neutral-900">{product.title}</strong> embodies quiet luxury —
                              cut from premium materials with an impeccable finish. Designed for the modern wardrobe,
                              it transitions effortlessly from day to evening.
                            </p>
                            <ul className="space-y-1.5">
                              {['Premium breathable fabric', 'Tailored contemporary fit', 'Reinforced stitching & durable hardware', 'Ethically sourced materials'].map((f) => (
                                <li key={f} className="flex items-center gap-2">
                                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> {f}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {activeTab === 'reviews' && (
                          <div className="space-y-4">
                            {REVIEWS.map((r) => (
                              <div key={r.name} className="flex gap-4 pb-4 border-b border-neutral-100 last:border-0">
                                <div className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
                                  {r.name[0]}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-2 flex-wrap">
                                    <p className="text-sm font-semibold text-neutral-900">{r.name}</p>
                                    <span className="text-[11px] text-neutral-400">{r.date}</span>
                                  </div>
                                  <div className="flex items-center gap-0.5 my-1">
                                    {[...Array(5)].map((_, i) => (
                                      <Star key={i} className={`w-3 h-3 ${i < r.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-200'}`} />
                                    ))}
                                  </div>
                                  <p className="text-[13px] text-neutral-600 leading-relaxed">{r.text}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {activeTab === 'shipping' && (
                          <div className="text-sm text-neutral-600 leading-[1.9] space-y-3">
                            <p><strong className="text-neutral-900">Delivery:</strong> Orders are dispatched within 24 hours. Standard delivery takes 2–4 working days nationwide; express options available at checkout.</p>
                            <p><strong className="text-neutral-900">Returns:</strong> Easy 7-day returns on unworn items with tags intact. Refunds are processed within 3–5 business days of receiving the return.</p>
                            <p><strong className="text-neutral-900">Exchanges:</strong> Free size exchanges within 7 days — just reach out to our support with your order ID.</p>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ type: 'spring', damping: 22, stiffness: 320 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[80] bg-neutral-900 text-white text-xs font-medium px-6 py-3.5 rounded-full shadow-2xl whitespace-nowrap max-w-[90vw] overflow-hidden text-ellipsis"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}