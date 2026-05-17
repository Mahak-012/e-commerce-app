import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Grid3X3, LayoutList, ChevronDown, Star, Heart, Eye, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext'; // CartContext import kiya

const allProducts = [
  { id: 1, title: "Structured Tailored Blazer", price: 295, oldPrice: 340, rating: 5, brand: "Mahak Couture", category: "shirts", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop" },
  { id: 2, title: "Minimalist Leather Tote", price: 185, oldPrice: 220, rating: 5, brand: "Mahak Couture", category: "bags", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop" },
  { id: 3, title: "Classic Silhouette Trench", price: 320, rating: 4, brand: "Mahak Couture", category: "shirts", img: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=600&auto=format&fit=crop" },
  { id: 4, title: "Urban Runner Mesh Sneakers", price: 95, oldPrice: 140, rating: 5, brand: "Mahak Couture", category: "shoes", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop" },
  { id: 5, title: "Retro Aviator Sunglasses", price: 42, oldPrice: 65, rating: 4, brand: "Mahak Couture", category: "glasses", img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop" },
  // 1. Baseball Cap ki image link yahan update ki gayi hai
  { id: 6, title: "Washed Canvas Baseball Cap", price: 28, oldPrice: 42, rating: 5, brand: "Mahak Couture", category: "caps", img: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=600&auto=format&fit=crop" },
  { id: 7, title: "Suede Chelsea Ankle Boots", price: 210, rating: 5, brand: "Mahak Couture", category: "shoes", img: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=600&auto=format&fit=crop" },
  { id: 8, title: "Classic Wayfarer Shades", price: 35, oldPrice: 55, rating: 5, brand: "Mahak Couture", category: "glasses", img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&auto=format&fit=crop" },
  { id: 9, title: "Quilted Puffer Backpack", price: 68, oldPrice: 99, rating: 5, brand: "Mahak Couture", category: "bags", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop" },
  { id: 10, title: "Slim Fit Mandarin Shirt", price: 55, oldPrice: 78, rating: 5, brand: "Mahak Couture", category: "shirts", img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=600&auto=format&fit=crop" },
  { id: 11, title: "Trucker Snapback Cap", price: 25, oldPrice: 38, rating: 4, brand: "Mahak Couture", category: "caps", img: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?q=80&w=600&auto=format&fit=crop" },
  { id: 12, title: "Crossbody Saddle Bag", price: 89, oldPrice: 135, rating: 5, brand: "Mahak Couture", category: "bags", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop" },
];

export default function Shop() {
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('default');
  const [gridCols, setGridCols] = useState(4);
  const [hoveredId, setHoveredId] = useState(null);

  // 2. CartContext se addToCart function nikala
  const { addToCart } = useCart();

  const categories = ['all', 'bags', 'shirts', 'shoes', 'glasses', 'caps'];
  let filtered = category === 'all' ? allProducts : allProducts.filter(p => p.category === category);
  if (sort === 'price-low') filtered.sort((a, b) => a.price - b.price);
  else if (sort === 'price-high') filtered.sort((a, b) => b.price - a.price);
  else if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);

  return (
    <motion.main initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="bg-white min-h-screen">
      {/* Hero Banner */}
      <div className="bg-neutral-50 py-12 lg:py-16 border-b border-neutral-100">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 text-center">
          <span className="text-[10px] tracking-[0.35em] text-neutral-400 uppercase font-medium block mb-3">Explore Our Collection</span>
          <h1 className="text-3xl md:text-5xl font-serif font-medium tracking-tight text-neutral-900">Shop All</h1>
          <p className="mt-3 text-neutral-400 text-sm">Discover handcrafted pieces for every occasion</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-10">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)} className={`px-5 py-2.5 rounded-full text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${category === cat ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'}`}>
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <select value={sort} onChange={e => setSort(e.target.value)} className="appearance-none bg-neutral-50 text-neutral-600 text-[11px] font-medium px-4 py-2.5 pr-8 rounded-lg border border-neutral-200 focus:outline-none cursor-pointer">
                <option value="default">Sort by: Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            </div>
            <div className="hidden lg:flex items-center gap-1 bg-neutral-50 rounded-lg p-1 border border-neutral-200">
              <button onClick={() => setGridCols(3)} className={`p-1.5 rounded ${gridCols === 3 ? 'bg-white shadow-sm' : ''}`}><Grid3X3 size={14} className={gridCols === 3 ? 'text-neutral-900' : 'text-neutral-400'} /></button>
              <button onClick={() => setGridCols(4)} className={`p-1.5 rounded ${gridCols === 4 ? 'bg-white shadow-sm' : ''}`}><LayoutList size={14} className={gridCols === 4 ? 'text-neutral-900' : 'text-neutral-400'} /></button>
            </div>
          </div>
        </div>

        <p className="text-xs text-neutral-400 mb-6">Showing {filtered.length} products</p>

        {/* Grid */}
        <div className={`grid gap-x-5 gap-y-10 ${gridCols === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}>
          {filtered.map((product, i) => (
            <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="group cursor-pointer" onMouseEnter={() => setHoveredId(product.id)} onMouseLeave={() => setHoveredId(null)}>
              <div className="relative w-full aspect-[3/4] bg-neutral-50 overflow-hidden rounded-xl mb-4">
                <img src={product.img} alt={product.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                {product.oldPrice && (() => { const d = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100); return <span className="absolute top-3 left-3 bg-neutral-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">-{d}%</span>; })()}
                <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${hoveredId === product.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}>
                  <button className="w-9 h-9 bg-white text-neutral-500 hover:text-red-500 flex items-center justify-center rounded-full shadow-md"><Heart size={16} /></button>
                  <Link to="/shop" className="w-9 h-9 bg-white text-neutral-500 hover:text-neutral-900 flex items-center justify-center rounded-full shadow-md"><Eye size={16} /></Link>
                </div>
                <div className={`absolute bottom-0 inset-x-0 transition-transform duration-400 ${hoveredId === product.id ? 'translate-y-0' : 'translate-y-full'}`}>
                  {/* 3. Add To Cart button ko functional banaya hai */}
                  <button 
                    onClick={() => addToCart(product)} 
                    className="w-full bg-neutral-900 text-white text-[11px] font-bold py-3.5 tracking-[0.15em] uppercase flex items-center justify-center gap-2 hover:bg-black transition-colors"
                  >
                    <ShoppingCart size={15} /> Add To Cart
                  </button>
                </div>
              </div>
              <span className="text-[10px] tracking-[0.2em] text-neutral-400 uppercase font-medium">{product.brand}</span>
              <h3 className="text-[14px] font-medium text-neutral-800 leading-snug mt-0.5 line-clamp-2">{product.title}</h3>
              <div className="flex items-center gap-0.5 mt-1.5">{[...Array(5)].map((_, j) => <Star key={j} size={12} className={j < product.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-200'} />)}</div>
              <div className="flex items-center gap-2.5 mt-1.5">
                <span className="text-[15px] font-bold text-neutral-900">${product.price}.00</span>
                {product.oldPrice && <span className="text-[13px] text-neutral-400 line-through">${product.oldPrice}.00</span>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.main>
  );
}