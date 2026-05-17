import React from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, Eye, ShoppingCart, Flame, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext'; // 1. CartContext import kiya

const dealProducts = [
  { id: 1, title: "Classic Leather Crossbody Bag", price: 29, oldPrice: 89, rating: 5, brand: "Mahak Culture", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop" },
  { id: 2, title: "Premium Oxford Button-Down Shirt", price: 19, oldPrice: 55, rating: 5, brand: "Mahak Culture", img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop" },
  { id: 3, title: "Retro Aviator Polarized Sunglasses", price: 15, oldPrice: 42, rating: 4, brand: "Mahak Culture", img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop" },
  { id: 4, title: "Urban Runner Pro Mesh Sneakers", price: 35, oldPrice: 95, rating: 5, brand: "Mahak Culture", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop" },
  // 2. Baseball Cap ki image link yahan update ki gayi hai
  { id: 5, title: "Washed Canvas Baseball Cap", price: 9, oldPrice: 28, rating: 5, brand: "Mahak Culture", img: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=600&auto=format&fit=crop" },
  { id: 6, title: "Structured Mini Top Handle Bag", price: 25, oldPrice: 72, rating: 4, brand: "Mahak Culture", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop" },
  { id: 7, title: "Slim Fit Mandarin Collar Shirt", price: 17, oldPrice: 48, rating: 5, brand: "Mahak Culture", img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=600&auto=format&fit=crop" },
  { id: 8, title: "Classic Wayfarer Matte Shades", price: 12, oldPrice: 35, rating: 5, brand: "Mahak Culture", img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&auto=format&fit=crop" },
];

export default function TopDeals() {
  // 3. CartContext se addToCart function nikala
  const { addToCart } = useCart();

  return (
    <motion.main initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 via-orange-50/30 to-amber-50/40" />
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-red-200/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-orange-200/15 rounded-full blur-[100px]" />

      <div className="relative z-10">
        <div className="py-12 lg:py-16">
          <div className="max-w-[1400px] mx-auto px-5 sm:px-8 text-center">
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
                <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="group cursor-pointer">
                  <div className="relative w-full aspect-[3/4] bg-white/70 backdrop-blur-sm overflow-hidden rounded-xl border border-red-100/40 shadow-sm group-hover:shadow-xl group-hover:shadow-red-100/30 transition-shadow duration-500">
                    <img src={product.img} alt={product.title} className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-extrabold px-3 py-1.5 rounded-full shadow-lg shadow-red-200/60">-{discountPct}%</div>
                    {discountPct >= 60 && <div className="absolute top-3 right-3 bg-orange-500 text-white text-[8px] font-black px-2 py-1 rounded-full shadow-md animate-pulse tracking-widest uppercase">🔥 HOT</div>}
                    <div className="absolute top-14 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                      <button className="w-9 h-9 bg-white/90 text-neutral-600 hover:text-red-500 flex items-center justify-center rounded-full shadow-md"><Heart size={16} /></button>
                      <button className="w-9 h-9 bg-white/90 text-neutral-600 hover:text-neutral-900 flex items-center justify-center rounded-full shadow-md"><Eye size={16} /></button>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                      {/* 4. Add To Cart button ko functional banaya hai */}
                      <button 
                        onClick={() => addToCart(product)} 
                        className="w-full bg-red-600 text-white hover:bg-red-700 text-[11px] font-bold py-3.5 tracking-[0.15em] uppercase flex items-center justify-center gap-2 transition-colors"
                      >
                        <ShoppingCart size={15} /> Add To Cart
                      </button>
                    </div>
                  </div>
                  <div className="pt-4 space-y-1.5 px-0.5">
                    <span className="text-[10px] tracking-[0.2em] text-neutral-400 uppercase font-medium">{product.brand}</span>
                    <h3 className="text-[14px] font-medium text-neutral-800 leading-snug line-clamp-2">{product.title}</h3>
                    <div className="flex items-center gap-0.5">{[...Array(5)].map((_, j) => <Star key={j} size={12} className={j < product.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-200'} />)}</div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-base font-extrabold text-red-600">${product.price}.00</span>
                      <span className="text-[13px] text-neutral-400 line-through">${product.oldPrice}.00</span>
                    </div>
                    <div className="inline-flex items-center gap-1 bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-100/50"><Zap size={10} /> Save ${saved}!</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.main>
  );
}