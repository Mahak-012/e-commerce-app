import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Star, Heart, Eye, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toggleWishlist } from '../lib/store';
import ProductDetail from '../components/ProductDetail';

const EASE = [0.22, 1, 0.36, 1];

const allProducts = [
  { id: 1, title: 'Structured Tailored Blazer', price: 295, oldPrice: 340, rating: 5, brand: 'Mahak Couture', category: 'shirts', stock: 6, img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop', colors: ['#1a1a1a', '#8a7968'] },
  { id: 2, title: 'Minimalist Leather Tote', price: 185, oldPrice: 220, rating: 5, brand: 'Mahak Couture', category: 'bags', stock: 5, img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop', colors: ['#3d2b1f', '#0f0f0f'] },
  { id: 3, title: 'Classic Silhouette Trench', price: 320, rating: 4, brand: 'Mahak Couture', category: 'shirts', stock: 4, img: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=600&auto=format&fit=crop', colors: ['#c9b8a3'] },
  { id: 4, title: 'Urban Runner Mesh Sneakers', price: 95, oldPrice: 140, rating: 5, brand: 'Mahak Couture', category: 'shoes', stock: 12, img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop', colors: ['#f5f5f5', '#1a1a1a'] },
  { id: 5, title: 'Retro Aviator Sunglasses', price: 42, oldPrice: 65, rating: 4, brand: 'Mahak Couture', category: 'glasses', stock: 15, img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&auto=format&fit=crop', colors: ['#1a1a1a', '#8a6d3b'] },
  { id: 6, title: 'Washed Canvas Baseball Cap', price: 28, oldPrice: 42, rating: 5, brand: 'Mahak Couture', category: 'caps', stock: 20, img: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1587920149371-ac728dcd7389?q=80&w=600&auto=format&fit=crop', colors: ['#1a1a1a', '#7a8b99'] },
  { id: 7, title: 'Suede Chelsea Ankle Boots', price: 210, rating: 5, brand: 'Mahak Couture', category: 'shoes', stock: 3, img: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?q=80&w=600&auto=format&fit=crop', colors: ['#3d2b1f'] },
  { id: 8, title: 'Classic Wayfarer Shades', price: 35, oldPrice: 55, rating: 5, brand: 'Mahak Couture', category: 'glasses', stock: 9, img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop', colors: ['#0f0f0f'] },
  { id: 9, title: 'Quilted Puffer Backpack', price: 68, oldPrice: 99, rating: 5, brand: 'Mahak Couture', category: 'bags', stock: 8, img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=600&auto=format&fit=crop', colors: ['#1a1a1a', '#5c6b73'] },
  { id: 10, title: 'Slim Fit Mandarin Shirt', price: 55, oldPrice: 78, rating: 5, brand: 'Mahak Couture', category: 'shirts', stock: 10, img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop', colors: ['#f5f0e8', '#1a1a1a'] },
  { id: 11, title: 'Trucker Snapback Cap', price: 25, oldPrice: 38, rating: 4, brand: 'Mahak Couture', category: 'caps', stock: 18, img: 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=600&auto=format&fit=crop', colors: ['#1a1a1a'] },
  { id: 12, title: 'Crossbody Saddle Bag', price: 89, oldPrice: 135, rating: 5, brand: 'Mahak Couture', category: 'bags', stock: 5, img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop', colors: ['#8a6d3b'] },
];

const CAT_LABELS = { all: 'All', bags: 'Bags', shirts: 'Shirts', shoes: 'Shoes', glasses: 'Sunglasses', caps: 'Caps' };

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();

  const urlCat = searchParams.get('cat') || 'all';
  const [sort, setSort] = useState('default');
  const [hoveredId, setHoveredId] = useState(null);
  const [justAdded, setJustAdded] = useState(null);
  const [toast, setToast] = useState(null);
  const [detailProduct, setDetailProduct] = useState(null);

  /* URL se category sync (Categories page ke links se aata hai) */
  const setCategory = (cat) => {
    if (cat === 'all') searchParams.delete('cat');
    else searchParams.set('cat', cat);
    setSearchParams(searchParams, { replace: true });
  };

  let filtered = urlCat === 'all' ? allProducts : allProducts.filter((p) => p.category === urlCat);
  filtered = [...filtered];
  if (sort === 'price-low') filtered.sort((a, b) => a.price - b.price);
  else if (sort === 'price-high') filtered.sort((a, b) => b.price - a.price);
  else if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);

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
    const added = toggleWishlist(p);
    showToast(added ? `♥ ${p.title} saved to wishlist` : 'Removed from wishlist');
  };

  return (
    <motion.main initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="bg-white min-h-screen">

      <style>{`
        .shop-ghost { font-family: 'Playfair Display', serif; font-style: italic; font-weight: 700;
          -webkit-text-stroke: 1px rgba(0,0,0,0.05); color: transparent;
          user-select: none; pointer-events: none; line-height: 1; white-space: nowrap; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Hero Banner */}
      <div className="bg-neutral-50 py-12 lg:py-16 border-b border-neutral-100 relative overflow-hidden">
        <span className="shop-ghost absolute top-8 left-1/2 -translate-x-1/2 text-[4.5rem] sm:text-[6rem] opacity-60">Shop</span>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 text-center relative">
          <span className="text-[10px] tracking-[0.35em] text-neutral-400 uppercase font-medium block mb-3">Explore Our Collection</span>
          <h1 className="text-3xl md:text-5xl font-serif font-medium tracking-tight text-neutral-900">
            {CAT_LABELS[urlCat] || 'Shop All'}
          </h1>
          <p className="mt-3 text-neutral-400 text-sm">Discover handcrafted pieces for every occasion</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-10">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {Object.entries(CAT_LABELS).map(([cat, label]) => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${urlCat === cat ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'}`}>
                {label}
              </button>
            ))}
          </div>
          <div className="relative shrink-0">
            <select value={sort} onChange={(e) => setSort(e.target.value)}
              className="appearance-none bg-neutral-50 text-neutral-600 text-[11px] font-medium px-4 py-2.5 pr-8 rounded-full border border-neutral-200 focus:outline-none cursor-pointer">
              <option value="default">Sort by: Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
          </div>
        </div>

        <p className="text-xs text-neutral-400 mb-6">Showing <strong className="text-neutral-700">{filtered.length}</strong> product{filtered.length !== 1 ? 's' : ''}{urlCat !== 'all' && ` in ${CAT_LABELS[urlCat]}`}</p>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div key={urlCat + sort}
            initial="hidden" animate="show" exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
            {filtered.map((product) => (
              <motion.div key={product.id}
                variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setDetailProduct(product)}>

                <div className="relative w-full aspect-[3/4] bg-neutral-50 overflow-hidden rounded-xl mb-4">
                  {/* Image swap */}
                  <img src={product.img} alt={product.title} loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-top group-hover:opacity-0 group-hover:scale-105 transition-all duration-700" />
                  <img src={product.hoverImg} alt="" loading="lazy" aria-hidden draggable={false}
                    className="absolute inset-0 w-full h-full object-cover object-top opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />

                  {product.oldPrice && (() => {
                    const d = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
                    return <span className="absolute top-3 left-3 bg-neutral-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">-{d}%</span>;
                  })()}
                  {product.stock <= 5 && (
                    <span className="absolute top-12 left-3 bg-red-500 text-white text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest">Only {product.stock} left</span>
                  )}

                  <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${hoveredId === product.id ? 'opacity-100 translate-x-0' : 'opacity-100 md:opacity-0 md:translate-x-2'}`}>
                    <button onClick={(e) => handleWish(e, product)} aria-label="Wishlist"
                      className="w-9 h-9 bg-white text-neutral-500 hover:text-red-500 hover:scale-110 flex items-center justify-center rounded-full shadow-md transition-all">
                      <Heart size={15} />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); setDetailProduct(product); }} aria-label="Quick view"
                      className="w-9 h-9 bg-white text-neutral-500 hover:text-neutral-900 hover:scale-110 flex items-center justify-center rounded-full shadow-md transition-all">
                      <Eye size={15} />
                    </button>
                  </div>

                  <div className={`absolute bottom-0 inset-x-0 transition-transform duration-500 ${hoveredId === product.id ? 'translate-y-0' : 'translate-y-0 md:translate-y-full'}`}>
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
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Product detail modal */}
      <AnimatePresence>
        {detailProduct && (
          <ProductDetail product={detailProduct} onBack={() => setDetailProduct(null)} />
        )}
      </AnimatePresence>

      {/* Toast */}
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