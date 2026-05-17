import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Heart, Eye, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext'; // CartContext import kiya

const products = [
  { id: 1, title: "Structured Tailored Blazer", price: 295, oldPrice: 340, rating: 5, brand: "Mahak Couture", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop" },
  { id: 2, title: "Minimalist Leather Tote", price: 185, oldPrice: 220, rating: 5, brand: "Mahak Couture", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop" },
  { id: 3, title: "Urban Runner Mesh Sneakers", price: 95, oldPrice: 140, rating: 5, brand: "Mahak Couture", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop" },
  { id: 4, title: "Retro Aviator Sunglasses", price: 42, oldPrice: 65, rating: 4, brand: "Mahak Couture", img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop" },
  // 1. Baseball Cap ki image link yahan update ki gayi hai
  { id: 5, title: "Washed Canvas Baseball Cap", price: 28, oldPrice: 42, rating: 5, brand: "Mahak Couture", img: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=600&auto=format&fit=crop" },
  { id: 6, title: "Emerald Gold Wrist Watch", price: 38, oldPrice: 45, rating: 5, brand: "Mahak Couture", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop" },
  { id: 7, title: "Suede Chelsea Ankle Boots", price: 210, rating: 5, brand: "Mahak Couture", img: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=600&auto=format&fit=crop" },
  { id: 8, title: "Quilted Puffer Backpack", price: 68, oldPrice: 99, rating: 5, brand: "Mahak Couture", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop" },
];

export default function Products() {
  // 2. CartContext se addToCart function nikala
  const { addToCart } = useCart();

  return (
    <motion.main initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="bg-white min-h-screen">
      <div className="bg-neutral-50 py-12 lg:py-16 border-b border-neutral-100">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 text-center">
          <span className="text-[10px] tracking-[0.35em] text-red-400 uppercase font-medium block mb-3">🔥 Hot Right Now</span>
          <h1 className="text-3xl md:text-5xl font-serif font-medium tracking-tight text-neutral-900">All Products</h1>
          <p className="mt-3 text-neutral-400 text-sm">Curated selection of our finest pieces</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
          {products.map((product, i) => (
            <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="group cursor-pointer">
              <div className="relative w-full aspect-[3/4] bg-neutral-50 overflow-hidden rounded-xl mb-4">
                <img src={product.img} alt={product.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                {product.oldPrice && (() => { const d = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100); return <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">-{d}%</span>; })()}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <button className="w-9 h-9 bg-white text-neutral-500 hover:text-red-500 flex items-center justify-center rounded-full shadow-md"><Heart size={16} /></button>
                  <button className="w-9 h-9 bg-white text-neutral-500 hover:text-neutral-900 flex items-center justify-center rounded-full shadow-md"><Eye size={16} /></button>
                </div>
                <div className="absolute bottom-0 inset-x-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
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