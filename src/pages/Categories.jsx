import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];

const categoryData = [
  { name: 'Bags',       count: 24, slug: 'bags',    img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop', desc: 'Totes, crossbodies & backpacks' },
  { name: 'Shirts',     count: 32, slug: 'shirts',  img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=600&auto=format&fit=crop', desc: 'Oxford, linen & casual' },
  { name: 'Shoes',      count: 18, slug: 'shoes',   img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop', desc: 'Sneakers, boots & loafers' },
  { name: 'Sunglasses', count: 15, slug: 'glasses', img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&auto=format&fit=crop', desc: 'Aviators, wayfarers & retro' },
  { name: 'Caps',       count: 12, slug: 'caps',    img: 'https://images.unsplash.com/photo-1588850561407-ed78c334e67a?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=600&auto=format&fit=crop', desc: 'Baseball, trucker & snapback' },
  { name: 'Watches',    count: 10, slug: 'watches', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop', hoverImg: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=600&auto=format&fit=crop', desc: 'Classic, minimal & luxury' },
];

export default function Categories() {
  return (
    <motion.main initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="bg-white min-h-screen">

      <style>{`
        .cat-ghost { font-family: 'Playfair Display', serif; font-style: italic; font-weight: 700;
          -webkit-text-stroke: 1px rgba(0,0,0,0.05); color: transparent;
          user-select: none; pointer-events: none; line-height: 1; white-space: nowrap; }
      `}</style>

      <div className="bg-neutral-50 py-12 lg:py-16 border-b border-neutral-100 relative overflow-hidden">
        <span className="cat-ghost absolute top-8 left-1/2 -translate-x-1/2 text-[4.5rem] sm:text-[6.5rem] opacity-60">Browse</span>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 text-center relative">
          <span className="text-[10px] tracking-[0.35em] text-neutral-400 uppercase font-medium block mb-3">Browse By Type</span>
          <h1 className="text-3xl md:text-5xl font-serif font-medium tracking-tight text-neutral-900">Categories</h1>
          <p className="mt-3 text-neutral-400 text-sm">Find exactly what you're looking for</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryData.map((cat, i) => (
            <motion.div key={cat.slug}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: (i % 3) * 0.09, duration: 0.6, ease: EASE }}>
              <Link to={`/shop?cat=${cat.slug}`} className="group block relative rounded-2xl overflow-hidden aspect-[4/3] bg-neutral-100 shadow-sm hover:shadow-2xl transition-shadow duration-500">
                {/* Image swap */}
                <img src={cat.img} alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:opacity-0 group-hover:scale-105 transition-all duration-700" />
                <img src={cat.hoverImg} alt="" aria-hidden loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                {/* Inner frame on hover */}
                <span className="absolute inset-3 border border-white/25 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="absolute top-5 left-5">
                  <span className="bg-white/15 backdrop-blur-md text-white text-[9px] font-semibold px-3 py-1 rounded-full border border-white/20 tracking-[0.2em] uppercase">
                    {cat.count} Products
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 p-6 lg:p-8">
                  <h3 className="text-2xl lg:text-3xl font-serif font-medium text-white">{cat.name}</h3>
                  <p className="text-sm text-white/60 mt-1">{cat.desc}</p>
                  <span className="inline-flex items-center gap-2 mt-4 text-xs font-semibold uppercase tracking-wider text-white border-b border-white/40 pb-0.5 group-hover:gap-3.5 group-hover:border-white transition-all duration-300">
                    Shop Now <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.main>
  );
}