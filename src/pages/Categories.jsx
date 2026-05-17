import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const categoryData = [
  { name: 'Bags', count: 24, slug: 'bags', img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop', desc: 'Totes, crossbodies & backpacks' },
  { name: 'Shirts', count: 32, slug: 'shirts', img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop', desc: 'Oxford, linen & casual' },
  { name: 'Shoes', count: 18, slug: 'shoes', img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop', desc: 'Sneakers, boots & loafers' },
  { name: 'Sunglasses', count: 15, slug: 'glasses', img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop', desc: 'Aviators, wayfarers & retro' },
  { name: 'Caps', count: 12, slug: 'caps', img: 'https://images.unsplash.com/photo-1588850561407-ed78c334e67a?q=80&w=600&auto=format&fit=crop', desc: 'Baseball, trucker & snapback' },
  { name: 'Watches', count: 10, slug: 'watches', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop', desc: 'Classic, minimal & luxury' },
];

export default function Categories() {
  return (
    <motion.main initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="bg-white min-h-screen">
      <div className="bg-neutral-50 py-12 lg:py-16 border-b border-neutral-100">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 text-center">
          <span className="text-[10px] tracking-[0.35em] text-neutral-400 uppercase font-medium block mb-3">Browse By Type</span>
          <h1 className="text-3xl md:text-5xl font-serif font-medium tracking-tight text-neutral-900">Categories</h1>
          <p className="mt-3 text-neutral-400 text-sm">Find exactly what you're looking for</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryData.map((cat, i) => (
            <motion.div key={cat.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <Link to={`/shop?cat=${cat.slug}`} className="group block relative rounded-2xl overflow-hidden aspect-[4/3] bg-neutral-100">
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 lg:p-8">
                  <span className="text-[10px] tracking-[0.2em] text-white/60 uppercase font-medium">{cat.count} Products</span>
                  <h3 className="text-2xl lg:text-3xl font-serif font-medium text-white mt-1">{cat.name}</h3>
                  <p className="text-sm text-white/60 mt-1">{cat.desc}</p>
                  <span className="inline-flex items-center gap-1.5 mt-4 text-xs font-semibold uppercase tracking-wider text-white border-b border-white/40 pb-0.5 group-hover:border-white transition-colors">
                    Shop Now →
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