import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, ShoppingBag, Heart, User, Menu, X, ChevronDown, ChevronRight,
  Trash2, Plus, Minus, ArrowRight, Package, LogIn, UserPlus, Settings,
} from 'lucide-react';
import { CART_KEY, WISH_KEY, readStore, updateQty, removeFromCart } from '../lib/store';

/* ── Demo products (search ke liye — baad mein apne real products se replace karna) ── */
const PRODUCTS = [
  { id: 1, name: 'ADRO Men Hoodie',       price: 23, cat: 'Casual', img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=200&auto=format&fit=crop' },
  { id: 2, name: 'Stylish Sunglasses',    price: 22, cat: 'Accessories', img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=200&auto=format&fit=crop' },
  { id: 3, name: 'Leather Tote Bag',      price: 29, cat: 'Bags', img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=200&auto=format&fit=crop' },
  { id: 4, name: 'Gold Wrist Watch',      price: 38, cat: 'Accessories', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=200&auto=format&fit=crop' },
  { id: 5, name: 'Minimal Sneakers',      price: 45, cat: 'Footwear', img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=200&auto=format&fit=crop' },
  { id: 6, name: 'Classic Denim Jacket',  price: 52, cat: 'Outerwear', img: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=200&auto=format&fit=crop' },
];

const ANNOUNCEMENTS = [
  'FREE SHIPPING ON ORDERS OVER $50',
  'NEW SEASON DROP — UP TO 30% OFF',
  'EASY 7-DAY RETURNS · 100% AUTHENTIC',
];

/* ═══════════════ NAVBAR ═══════════════ */
export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cart, setCart] = useState(readStore(CART_KEY));
  const [wishCount, setWishCount] = useState(readStore(WISH_KEY).length);
  const [query, setQuery] = useState('');
  const [annIdx, setAnnIdx] = useState(0);
  const [openMobileAcc, setOpenMobileAcc] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef(null);

  /* ── Scroll: shrink + shadow ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Live store sync ── */
  useEffect(() => {
    const sync = () => {
      setCart(readStore(CART_KEY));
      setWishCount(readStore(WISH_KEY).length);
    };
    window.addEventListener('store-updated', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('store-updated', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  /* ── Route change: close everything ── */
  useEffect(() => {
    setActiveMenu(null); setIsMobileOpen(false); setIsCartOpen(false); setIsUserOpen(false);
  }, [location.pathname]);

  /* ── Announcement rotation ── */
  useEffect(() => {
    const t = setInterval(() => setAnnIdx((i) => (i + 1) % ANNOUNCEMENTS.length), 4000);
    return () => clearInterval(t);
  }, []);

  /* ── Body scroll lock for overlays ── */
  useEffect(() => {
    document.body.style.overflow = (isMobileOpen || isSearchOpen || isCartOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen, isSearchOpen, isCartOpen]);

  /* ── Search overlay: autofocus + ESC ── */
  useEffect(() => {
    if (isSearchOpen) setTimeout(() => searchRef.current?.focus(), 100);
    const onKey = (e) => { if (e.key === 'Escape') setIsSearchOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isSearchOpen]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.qty * i.price, 0);
  const results = query.trim()
    ? PRODUCTS.filter((p) => (p.name + p.cat).toLowerCase().includes(query.toLowerCase()))
    : [];
  const closeMobile = () => setIsMobileOpen(false);

  const linkCls = `relative text-xs font-semibold uppercase tracking-[0.15em] whitespace-nowrap transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-[1.5px] after:bg-black after:transition-all after:duration-300 ${activeMenu ? 'text-black' : 'hover:text-neutral-500 after:w-0 hover:after:w-full'}`;

  /* ── Mega menu wrapper ── */
  const Mega = ({ id, children, label, badge, badgeCls }) => (
    <div className="relative py-8" onMouseEnter={() => setActiveMenu(id)} onMouseLeave={() => setActiveMenu(null)}>
      <Link to={`/${id}`} className={`${linkCls} flex items-center gap-1 cursor-pointer after:content-['']`}>
        {label}
        {badge && <span className={`${badgeCls} text-white text-[8px] font-bold px-1.5 py-0.5 tracking-widest rounded-sm`}>{badge}</span>}
        <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform duration-300 ${activeMenu === id ? 'rotate-180' : ''}`} />
      </Link>
      <AnimatePresence>
        {activeMenu === id && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed left-0 right-0 top-[var(--nav-total)] w-full bg-white shadow-[0_24px_48px_rgba(0,0,0,0.06)] border-t border-neutral-100 z-50"
            onMouseEnter={() => setActiveMenu(id)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="max-w-[1440px] mx-auto px-16 py-12">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const MenuCol = ({ title, items }) => (
    <div className="col-span-3">
      <h4 className="font-semibold text-[11px] uppercase tracking-[0.2em] text-black mb-6 border-b border-neutral-100 pb-3">{title}</h4>
      <ul className="space-y-3.5 text-xs text-neutral-500 font-light tracking-wide">
        {items.map((it) => (
          <li key={it.label}>
            <Link to={it.to} className="hover:text-black transition-all duration-200 hover:pl-1 inline-flex items-center gap-2">
              {it.label}
              {it.tag && <span className={`${it.tagCls} text-white text-[8px] font-bold px-2 py-0.5 tracking-widest`}>{it.tag}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <nav
      onMouseLeave={() => setIsUserOpen(false)}
      className={`fixed top-0 left-0 w-full z-50 font-sans select-none transition-all duration-500 border-b
        ${scrolled || activeMenu ? 'bg-white border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)]' : 'bg-white border-transparent'}`}
    >
      <style>{`
        :root { --nav-total: 118px; }
        .nav-shrink { --nav-total: 78px; }
      `}</style>

      {/* ═══ ANNOUNCEMENT BAR ═══ */}
      <div className={`bg-black text-white overflow-hidden transition-all duration-500 ${scrolled ? 'h-0 opacity-0' : 'h-8 opacity-100'}`}>
        <div className="max-w-[1440px] mx-auto px-6 h-8 flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            <motion.span
              key={annIdx}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-[9px] sm:text-[10px] font-semibold tracking-[0.3em] uppercase"
            >
              {ANNOUNCEMENTS[annIdx]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <div className={`max-w-[1440px] mx-auto px-6 sm:px-12 transition-all duration-500 ${scrolled ? 'h-[72px]' : 'h-24'}`}>
        <div className="grid grid-cols-12 items-center h-full">

          {/* ═══ LEFT: Logo ═══ */}
          <div className="col-span-6 lg:col-span-3 flex items-center">
            <button className="lg:hidden text-gray-900 hover:opacity-70 transition-opacity mr-4" onClick={() => setIsMobileOpen(true)} aria-label="Open menu">
              <Menu className="w-6 h-6 stroke-[1.5]" />
            </button>
            <Link to="/" className="text-xl sm:text-2xl font-semibold tracking-[0.25em] text-black hover:opacity-80 transition-opacity whitespace-nowrap" style={{ fontFamily: "'Playfair Display', 'Didot', serif" }}>
              MAHAK<span className="font-light text-gray-300 ml-1">COUTURE</span>
            </Link>
          </div>

          {/* ═══ CENTER: Links ═══ */}
          <div className="hidden lg:flex justify-center items-center gap-8 col-span-6">
            <Link to="/" className={linkCls}>Home</Link>

            {/* SHOP */}
            <Mega id="shop" label="Shop">
              <div className="grid grid-cols-12 gap-10">
                <MenuCol title="Product Types" items={[
                  { label: 'Simple Products', to: '/shop?filter=simple' },
                  { label: 'Variable Product', to: '/shop?filter=variable', tag: 'NEW', tagCls: 'bg-[#56cfe1]' },
                  { label: 'Grouped Products', to: '/shop?filter=grouped' },
                  { label: 'External/Affiliate', to: '/shop?filter=external' },
                ]} />
                <MenuCol title="WooCommerce Pages" items={[
                  { label: 'Shop Page', to: '/shop' },
                  { label: 'Checkout Page', to: '/checkout' },
                  { label: 'Shopping Cart', to: '/cart' },
                ]} />
                <MenuCol title="Product Features" items={[
                  { label: 'Stock Progress Bar', to: '/shop?feature=stock' },
                  { label: 'Color/Image Swatches', to: '/shop?feature=swatches' },
                  { label: 'Size Guide Table', to: '/shop?feature=size-guide' },
                ]} />
                <Link to="/top-deals" className="col-span-3 relative bg-neutral-900 overflow-hidden min-h-[200px] p-8 flex flex-col justify-center group/promo">
                  <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover/promo:opacity-55 group-hover/promo:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
                  <div className="relative">
                    <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-white/70 mb-2 block">Special Sale!</span>
                    <h5 className="text-xl font-normal font-serif text-white mb-4 tracking-wide leading-snug">Discount Up To<br />30% OFF</h5>
                    <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white border-b border-white w-fit pb-0.5 group-hover/promo:gap-2 inline-flex items-center transition-all">Shop Now <ArrowRight className="w-3 h-3 ml-1 group-hover/promo:translate-x-1 transition-transform" /></span>
                  </div>
                </Link>
              </div>
            </Mega>

            {/* CATEGORIES */}
            <Mega id="categories" label="Categories" badge="SALE" badgeCls="bg-[#2ec4b6]">
              <div className="grid grid-cols-12 gap-10">
                <MenuCol title="Casual" items={[
                  { label: 'Active Casual', to: '/categories?cat=active-casual' },
                  { label: 'Easy Shirts', to: '/categories?cat=easy-shirts' },
                  { label: 'Outerwear', to: '/categories?cat=outerwear' },
                ]} />
                <MenuCol title="Dress" items={[
                  { label: 'Chic Style', to: '/categories?cat=chic-style' },
                  { label: 'Preppy Style', to: '/categories?cat=preppy-style' },
                ]} />
                <div className="col-span-6 border-l border-neutral-100 pl-10">
                  <h4 className="font-semibold text-[11px] uppercase tracking-[0.2em] text-black mb-6 text-center">Best Selling</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {PRODUCTS.slice(0, 4).map((p) => (
                      <button key={p.id} onClick={() => navigate('/shop')} className="flex gap-4 items-center bg-neutral-50 p-4 border border-neutral-100 hover:border-neutral-300 hover:bg-white transition-all duration-300 text-left">
                        <div className="w-14 h-14 bg-neutral-200 overflow-hidden rounded shrink-0">
                          <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-neutral-800">{p.name}</p>
                          <p className="text-xs font-bold text-neutral-900 mt-1">${p.price.toFixed(2)}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Mega>

            <Link to="/products" className={linkCls + ' flex items-center gap-1'}>
              Products <span className="bg-[#ff4d6d] text-white text-[8px] font-bold px-1.5 py-0.5 tracking-widest rounded-sm">HOT</span>
            </Link>
            <Link to="/top-deals" className={linkCls}>Top Deals</Link>
          </div>

          {/* ═══ RIGHT: Actions ═══ */}
          <div className="col-span-6 lg:col-span-3 flex items-center justify-end gap-5">

            <button onClick={() => setIsSearchOpen(true)} aria-label="Search" className="text-neutral-800 hover:text-neutral-400 transition-colors">
              <Search className="w-[19px] h-[19px] stroke-[1.5]" />
            </button>

            {/* USER dropdown */}
            <div className="relative">
              <button onClick={() => setIsUserOpen((o) => !o)} aria-label="Account" className="text-neutral-800 hover:text-neutral-400 transition-colors">
                <User className="w-[19px] h-[19px] stroke-[1.5]" />
              </button>
              <AnimatePresence>
                {isUserOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-10 w-56 bg-white border border-neutral-100 shadow-[0_20px_40px_rgba(0,0,0,0.08)] py-3 z-50"
                  >
                    <div className="px-4 pb-3 mb-2 border-b border-neutral-100">
                      <p className="text-xs font-semibold text-neutral-900">My Account</p>
                      <p className="text-[10px] text-neutral-400 mt-0.5">Sign in for orders & wishlist</p>
                    </div>
                    {[
                      { icon: LogIn,     label: 'Sign In',      to: '/account' },
                      { icon: UserPlus,  label: 'Register',     to: '/account?mode=register' },
                      { icon: Package,   label: 'My Orders',    to: '/account?tab=orders' },
                      { icon: Settings,  label: 'Settings',     to: '/account?tab=settings' },
                    ].map(({ icon: Icon, label, to }) => (
                      <Link key={label} to={to} className="flex items-center gap-3 px-4 py-2.5 text-xs text-neutral-600 hover:text-black hover:bg-neutral-50 transition-colors">
                        <Icon className="w-3.5 h-3.5 stroke-[1.5]" /> {label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/wishlist" className="relative group" aria-label="Wishlist">
              <Heart className="w-[19px] h-[19px] group-hover:text-neutral-400 transition-colors stroke-[1.5]" />
              {wishCount > 0 && (
                <motion.span key={wishCount} initial={{ scale: 0.4 }} animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 bg-black text-white text-[8px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center font-medium">
                  {wishCount}
                </motion.span>
              )}
            </Link>

            {/* CART — opens mini drawer */}
            <button onClick={() => setIsCartOpen(true)} className="relative group" aria-label="Cart">
              <ShoppingBag className="w-[19px] h-[19px] group-hover:text-neutral-400 transition-colors stroke-[1.5]" />
              {cartCount > 0 && (
                <motion.span key={cartCount} initial={{ scale: 0.4 }} animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 bg-black text-white text-[8px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center font-medium">
                  {cartCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ═══ FULL-SCREEN SEARCH ═══ */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-white"
          >
            <div className="max-w-3xl mx-auto px-6 pt-24">
              <div className="flex items-center gap-4 border-b-2 border-black pb-4">
                <Search className="w-6 h-6 text-neutral-400 stroke-[1.5]" />
                <input
                  ref={searchRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products, categories..."
                  className="flex-1 text-2xl sm:text-3xl font-light outline-none placeholder:text-neutral-300"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                />
                <button onClick={() => setIsSearchOpen(false)} className="p-2 hover:bg-neutral-100 rounded-full transition-colors" aria-label="Close search">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Popular chips */}
              {!query && (
                <div className="mt-8">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold mb-4">Popular Searches</p>
                  <div className="flex flex-wrap gap-2">
                    {['Hoodie', 'Sunglasses', 'Bag', 'Watch', 'Sneakers'].map((t) => (
                      <button key={t} onClick={() => setQuery(t)} className="px-4 py-2 border border-neutral-200 text-xs text-neutral-600 hover:border-black hover:text-black transition-colors">{t}</button>
                    ))}
                  </div>
                </div>
              )}

              {/* Live results */}
              {query && (
                <div className="mt-8 max-h-[55vh] overflow-y-auto">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold mb-4">
                    {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                  </p>
                  {results.length === 0 ? (
                    <p className="text-sm text-neutral-400 py-10 text-center">No products found — try something else ✦</p>
                  ) : results.map((p) => (
                    <button key={p.id} onClick={() => { setIsSearchOpen(false); navigate('/shop'); }}
                      className="w-full flex items-center gap-5 py-3.5 border-b border-neutral-100 hover:bg-neutral-50 px-2 transition-colors text-left">
                      <img src={p.img} alt={p.name} className="w-14 h-14 object-cover rounded" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-neutral-900">{p.name}</p>
                        <p className="text-[10px] uppercase tracking-widest text-neutral-400 mt-0.5">{p.cat}</p>
                      </div>
                      <p className="text-sm font-bold">${p.price.toFixed(2)}</p>
                      <ChevronRight className="w-4 h-4 text-neutral-300" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ MINI CART DRAWER ═══ */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black z-[55]" />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 w-[min(400px,100vw)] bg-white z-[56] flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
                <p className="text-xs font-semibold uppercase tracking-[0.2em]">
                  Shopping Bag <span className="text-neutral-400">({cartCount})</span>
                </p>
                <button onClick={() => setIsCartOpen(false)} className="p-1.5 hover:bg-neutral-100 rounded-full transition-colors" aria-label="Close cart">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-8">
                  <ShoppingBag className="w-12 h-12 text-neutral-200 stroke-[1]" />
                  <p className="text-sm font-medium text-neutral-800">Your bag is empty</p>
                  <p className="text-xs text-neutral-400 leading-relaxed">Add pieces you love — they'll appear here instantly.</p>
                  <button onClick={() => { setIsCartOpen(false); navigate('/shop'); }}
                    className="mt-2 bg-black text-white text-[10px] font-bold uppercase tracking-[0.25em] px-8 py-3.5 hover:bg-neutral-800 transition-colors">
                    Start Shopping
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto px-6">
                    {cart.map((item) => (
                      <motion.div layout key={item.id} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
                        className="flex gap-4 py-4 border-b border-neutral-100">
                        <img src={item.img || 'https://via.placeholder.com/100'} alt={item.name} className="w-16 h-20 object-cover bg-neutral-100" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-neutral-900 truncate">{item.name}</p>
                          <p className="text-xs font-bold mt-1">${(item.price * item.qty).toFixed(2)}</p>
                          <div className="flex items-center gap-3 mt-2.5">
                            <div className="flex items-center border border-neutral-200">
                              <button onClick={() => updateQty(item.id, -1)} className="p-1.5 hover:bg-neutral-50" aria-label="Decrease"><Minus className="w-3 h-3" /></button>
                              <span className="w-7 text-center text-xs font-medium">{item.qty}</span>
                              <button onClick={() => updateQty(item.id, 1)} className="p-1.5 hover:bg-neutral-50" aria-label="Increase"><Plus className="w-3 h-3" /></button>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="text-neutral-300 hover:text-red-500 transition-colors" aria-label="Remove">
                              <Trash2 className="w-3.5 h-3.5 stroke-[1.5]" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="border-t border-neutral-100 px-6 py-5 space-y-4">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold">Subtotal</span>
                      <span className="text-xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>${cartTotal.toFixed(2)}</span>
                    </div>
                    <button onClick={() => { setIsCartOpen(false); navigate('/checkout'); }}
                      className="w-full bg-black text-white text-[10px] font-bold uppercase tracking-[0.25em] py-4 hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2">
                      Checkout <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex gap-3">
                      <button onClick={() => { setIsCartOpen(false); navigate('/cart'); }}
                        className="flex-1 border border-neutral-200 text-[10px] font-bold uppercase tracking-[0.2em] py-3 hover:border-black transition-colors">
                        View Bag
                      </button>
                      <button onClick={() => { setIsCartOpen(false); navigate('/wishlist'); }}
                        className="flex-1 border border-neutral-200 text-[10px] font-bold uppercase tracking-[0.2em] py-3 hover:border-black transition-colors">
                        Wishlist
                      </button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ═══ MOBILE DRAWER ═══ */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.35 }} exit={{ opacity: 0 }}
              onClick={closeMobile} className="fixed inset-0 bg-black z-50 lg:hidden" />
            <motion.div
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.32 }}
              className="fixed top-0 left-0 bottom-0 w-[300px] bg-white z-50 lg:hidden shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center px-6 py-5 border-b border-neutral-100">
                <span className="text-xs font-bold tracking-[0.3em]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  MAHAK<span className="text-gray-300 font-light ml-0.5">COUTURE</span>
                </span>
                <button onClick={closeMobile} className="p-1.5 hover:bg-neutral-100 rounded-full" aria-label="Close menu"><X className="w-5 h-5" /></button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4">
                {[
                  { label: 'Home', to: '/' },
                  { label: 'Shop', to: '/shop', acc: ['Simple Products', 'Variable Products', 'Grouped', 'Affiliate'] },
                  { label: 'Categories', to: '/categories', acc: ['Active Casual', 'Easy Shirts', 'Outerwear', 'Chic Style', 'Preppy Style'] },
                  { label: 'Products', to: '/products', hot: true },
                  { label: 'Top Deals', to: '/top-deals', sale: true },
                  { label: 'Cart', to: '/cart', count: cartCount },
                  { label: 'Wishlist', to: '/wishlist', count: wishCount },
                  { label: 'My Account', to: '/account' },
                ].map((item) => (
                  <div key={item.label} className="border-b border-neutral-50">
                    {item.acc ? (
                      <>
                        <button onClick={() => setOpenMobileAcc((a) => (a === item.label ? null : item.label))}
                          className="w-full py-4 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-neutral-800">
                          {item.label}
                          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openMobileAcc === item.label ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {openMobileAcc === item.label && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden">
                              {item.acc.map((sub) => (
                                <button key={sub} onClick={closeMobile}
                                  className="block w-full text-left py-2.5 pl-4 text-[11px] text-neutral-500 hover:text-black tracking-wide">
                                  {sub}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link to={item.to} onClick={closeMobile}
                        className="py-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-800 hover:text-black">
                        {item.label}
                        {item.hot && <span className="bg-[#ff4d6d] text-white text-[7px] font-bold px-1.5 py-0.5 rounded-sm">HOT</span>}
                        {item.sale && <span className="bg-[#2ec4b6] text-white text-[7px] font-bold px-1.5 py-0.5 rounded-sm">SALE</span>}
                        {item.count > 0 && <span className="bg-black text-white text-[8px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center">{item.count}</span>}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              <div className="px-6 py-5 border-t border-neutral-100 text-center">
                <p className="text-[9px] text-neutral-400 tracking-[0.25em]">MAHAK COUTURE © 2026</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}