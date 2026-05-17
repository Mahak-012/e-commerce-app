import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';

const wishlistItems = [
  { id: 1, title: "Minimalist Leather Tote", price: 185, oldPrice: 220, rating: 5, color: "Brown", size: "One Size", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=400&auto=format&fit=crop" },
  { id: 2, title: "Retro Aviator Sunglasses", price: 42, oldPrice: 65, rating: 4, color: "Black", size: "Standard", img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=400&auto=format&fit=crop" },
  { id: 3, title: "Emerald Gold Wrist Watch", price: 38, oldPrice: 45, rating: 5, color: "Gold", size: "Medium", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop" },
  { id: 4, title: "Urban Runner Mesh Sneakers", price: 95, oldPrice: 140, rating: 5, color: "White", size: "9", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=400&auto=format&fit=crop" },
  { id: 5, title: "Structured Leather Crossbody", price: 89, oldPrice: 135, rating: 5, color: "Tan", size: "One Size", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=400&auto=format&fit=crop" },
  { id: 6, title: "Washed Canvas Baseball Cap", price: 28, oldPrice: 42, rating: 5, color: "Beige", size: "Adjustable", img: "https://images.unsplash.com/photo-1588850561407-ed78c334e67a?q=80&w=400&auto=format&fit=crop" },
];

export default function Wishlist() {
  return (
    <div className="bg-white min-h-screen">

      {/* ── Header ── */}
      <div className="bg-neutral-50 py-10 lg:py-14 border-b border-neutral-100">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-red-400 fill-red-400" />
            <span className="text-[10px] tracking-[0.3em] text-neutral-400 uppercase font-medium">Your Collection</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-medium tracking-tight text-neutral-900">Wishlist</h1>
          <p className="mt-2 text-neutral-400 text-sm">{wishlistItems.length} saved items</p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-10 lg:py-14">

        {wishlistItems.length === 0 ? (
          /* ── Empty State ── */
          <div className="text-center py-20">
            <Heart size={56} className="mx-auto text-neutral-200 mb-5" strokeWidth={1} />
            <h2 className="font-serif text-2xl text-neutral-400 mb-2">No saved items yet</h2>
            <p className="text-sm text-neutral-400 mb-8">Start adding items you love to your wishlist.</p>
            <Link to="/shop" className="inline-flex items-center gap-2 px-7 py-3 bg-neutral-900 text-white rounded-full text-sm font-medium hover:bg-black transition-colors">
              Browse Products <ArrowRight size={15} />
            </Link>
          </div>
        ) : (
          <>
            {/* ── Action Bar ── */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm text-neutral-500">{wishlistItems.length} items in your wishlist</p>
              <Link to="/shop" className="text-xs font-semibold uppercase tracking-wider text-neutral-900 hover:text-neutral-500 transition-colors flex items-center gap-1.5 border-b border-neutral-900 hover:border-neutral-400 pb-0.5">
                Continue Shopping <ArrowRight size={12} />
              </Link>
            </div>

            {/* ── Wishlist Items ── */}
            <div className="space-y-4">
              {wishlistItems.map((item, i) => {
                const discount = item.oldPrice ? Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100) : 0;

                return (
                  <div key={item.id} className="flex items-center gap-5 p-5 bg-neutral-50 rounded-xl border border-neutral-100 hover:border-neutral-200 transition-all duration-300 group">

                    {/* Image */}
                    <Link to="/shop" className="w-24 h-28 sm:w-28 sm:h-32 rounded-lg overflow-hidden flex-shrink-0 bg-neutral-100">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </Link>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif font-medium text-neutral-900 text-base sm:text-lg leading-snug">{item.title}</h3>

                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-xs text-neutral-400">Color: {item.color}</span>
                        <span className="w-px h-3 bg-neutral-200"></span>
                        <span className="text-xs text-neutral-400">Size: {item.size}</span>
                      </div>

                      {/* Stars */}
                      <div className="flex items-center gap-0.5 mt-2">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} size={12} className={j < item.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-200'} />
                        ))}
                        <span className="text-[11px] text-neutral-400 ml-1">({item.rating}.0)</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2.5 mt-2">
                        <span className="text-lg font-bold text-neutral-900">${item.price}.00</span>
                        {item.oldPrice && (
                          <span className="text-sm text-neutral-400 line-through">${item.oldPrice}.00</span>
                        )}
                        {discount > 0 && (
                          <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">-{discount}%</span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <button className="px-5 py-2.5 bg-neutral-900 text-white text-[11px] font-semibold uppercase tracking-wider rounded-lg flex items-center gap-2 hover:bg-black transition-colors">
                        <ShoppingCart size={14} />
                        <span className="hidden sm:inline">Add to Cart</span>
                      </button>
                      <button className="p-2.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Bottom Actions ── */}
            <div className="mt-10 pt-8 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link to="/shop" className="text-xs font-semibold uppercase tracking-wider text-neutral-900 hover:text-neutral-500 transition-colors flex items-center gap-1.5">
                ← Continue Shopping
              </Link>
              <button className="px-8 py-3 bg-neutral-900 text-white text-[11px] font-bold uppercase tracking-wider rounded-lg hover:bg-black transition-colors flex items-center gap-2">
                <ShoppingCart size={14} /> Add All to Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}