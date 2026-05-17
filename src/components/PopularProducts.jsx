import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Eye, ArrowRight } from 'lucide-react';
// BackButton ka import hata diya gaya hai
import { useCart } from '../context/CartContext';

const categoriesData = {
  trendsetters: [
    { id: 1, title: "Structured Tailored Blazer", price: 45, oldPrice: 68, discount: "-34%", rating: 5, brand: "Mahak Couture", salesText: "3 units sold recently", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop&q=100" },
    { id: 2, title: "Minimalist Leather Tote", price: 39, oldPrice: 55, discount: "-29%", rating: 5, brand: "Mahak Couture", salesText: "5 bags in stock", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop&q=100" },
    { id: 3, title: "Classic Silhouette Trench", price: 49, rating: 4, brand: "Mahak Couture", salesText: "Hot selling item", img: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=600&auto=format&fit=crop&q=100" },
    { id: 4, title: "Atelier Monogram Knitwear", price: 35, oldPrice: 48, discount: "-27%", rating: 5, brand: "Mahak Couture", salesText: "Limited Edition", img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop&q=100" },
    { id: 5, title: "Washed Canvas Baseball Cap", price: 19, oldPrice: 32, discount: "-41%", rating: 5, brand: "Mahak Couture", salesText: "Best choice reward", img: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=600&auto=format&fit=crop&q=100" },
    { id: 6, title: "Statement Wool Overcoat", price: 48, oldPrice: 65, discount: "-26%", rating: 5, brand: "Mahak Couture", salesText: "10 items left", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop&q=100" },
    { id: 7, title: "Cropped Tweed Jacket", price: 42, rating: 4, brand: "Mahak Couture", salesText: "Super slim edition", img: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=600&auto=format&fit=crop&q=100" },
    { id: 8, title: "Tailored Linen Trousers", price: 29, oldPrice: 42, discount: "-31%", rating: 5, brand: "Mahak Couture", salesText: "Fast shipping available", img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop&q=100" }
  ],
  essentials: [
    { id: 9, title: "Cashmere Crew Sweater", price: 38, oldPrice: 52, discount: "-27%", rating: 5, brand: "Mahak Couture", salesText: "Winter favorite", img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=600&auto=format&fit=crop&q=100" },
    { id: 10, title: "Silk Pocket Square Set", price: 22, rating: 4, brand: "Mahak Couture", salesText: "Gift-ready box", img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=600&auto=format&fit=crop&q=100" },
    { id: 11, title: "Merino Wool Scarf", price: 27, oldPrice: 38, discount: "-29%", rating: 5, brand: "Mahak Couture", salesText: "2 left in stock", img: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=600&auto=format&fit=crop&q=100" },
    { id: 12, title: "Leather Belt Classic", price: 24, rating: 4, brand: "Mahak Couture", salesText: "Everyday essential", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop&q=100" },
  ],
  luxury: [
    { id: 13, title: "Hand-Stitched Oxfords", price: 49, rating: 5, brand: "Mahak Couture", salesText: "Artisan crafted", img: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=600&auto=format&fit=crop&q=100" },
    { id: 14, title: "Italian Wool Suit", price: 47, oldPrice: 62, discount: "-24%", rating: 5, brand: "Mahak Couture", salesText: "Made in Italy", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop&q=100" },
    { id: 15, title: "Platinum Cufflinks", price: 33, rating: 5, brand: "Mahak Couture", salesText: "Exclusive edition", img: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=600&auto=format&fit=crop&q=100" },
    { id: 16, title: "Velvet Dinner Jacket", price: 46, oldPrice: 59, discount: "-22%", rating: 4, brand: "Mahak Couture", salesText: "Red carpet ready", img: "https://images.unsplash.com/photo-1593030103066-0093718e7177?q=80&w=600&auto=format&fit=crop&q=100" },
  ],
};

export default function PopularProducts({ onProductSelect }) {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState(null);
  const [activeTab, setActiveTab] = useState('trendsetters');
  const [hoveredId, setHoveredId] = useState(null);

  const currentProducts = categoriesData[activeTab] || categoriesData['trendsetters'];

  return (
    <section className="w-full select-none relative overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50/80 via-white to-amber-50/30"></div>
      <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-amber-100/20 rounded-full blur-[140px]"></div>
      <div className="absolute bottom-[5%] right-[15%] w-[400px] h-[400px] bg-orange-100/15 rounded-full blur-[120px]"></div>
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-yellow-50/20 rounded-full blur-[150px]"></div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24">

        {/* BackButton component yahan se hata diya gaya hai */}

        <div className="text-center mb-14">
          <span className="text-[11px] tracking-[0.35em] text-neutral-400 uppercase font-medium block mb-3">Curated Collections</span>
          <h2 className="text-3xl md:text-[40px] font-serif font-medium tracking-tight text-neutral-900 mb-10">Popular Products</h2>

          <div className="flex justify-center gap-1 border-b border-neutral-200/60 max-w-lg mx-auto">
            {[
              { key: 'trendsetters', label: 'New Arrivals' },
              { key: 'essentials', label: 'Featured' },
              { key: 'luxury', label: 'Best Selling' },
            ].map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`relative px-6 py-3.5 text-[11px] tracking-[0.2em] font-medium uppercase transition-all duration-300 ${activeTab === tab.key ? 'text-neutral-900' : 'text-neutral-400 hover:text-neutral-600'}`}>
                {tab.label}
                {activeTab === tab.key && <span className="absolute bottom-0 left-6 right-6 h-[2px] bg-neutral-900 transition-all duration-300" />}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10 lg:gap-x-7 lg:gap-y-14">

          {currentProducts.map((product, index) => {
            const isHovered = hoveredId === product.id;
            const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : null;

            return (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onProductSelect?.(product)}
                className="group cursor-pointer"
                style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.06}s both` }}
              >
                <div className="relative w-full aspect-[3/4] bg-white/60 backdrop-blur-sm overflow-hidden mb-4 rounded-xl border border-neutral-100/50 shadow-sm group-hover:shadow-xl group-hover:shadow-amber-100/30 transition-all duration-500">
                  <img src={product.img} alt={product.title} className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-600/0 to-amber-400/0 group-hover:from-amber-600/5 group-hover:to-amber-400/5 transition-all duration-500"></div>
                  {product.discount && <span className="absolute top-3 left-3 bg-neutral-900 text-white text-[10px] font-semibold tracking-wider px-2.5 py-1 uppercase shadow-md">{product.discount}</span>}

                  <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}>
                    <button onClick={(e) => e.stopPropagation()} className="w-9 h-9 bg-white/90 backdrop-blur-sm text-neutral-500 hover:text-red-500 hover:scale-110 flex items-center justify-center transition-all shadow-md rounded-full"><Heart className="w-4 h-4" /></button>
                    <button onClick={(e) => e.stopPropagation()} className="w-9 h-9 bg-white/90 backdrop-blur-sm text-neutral-500 hover:text-neutral-900 hover:scale-110 flex items-center justify-center transition-all shadow-md rounded-full"><Eye className="w-4 h-4" /></button>
                  </div>

                  {/* ADD TO CART */}
                  <div className={`absolute bottom-0 inset-x-0 transition-transform duration-400 ease-out ${isHovered ? 'translate-y-0' : 'translate-y-full'}`}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                        setAddedId(product.id);
                        setTimeout(() => setAddedId(null), 1500);
                      }}
                      className={`w-full backdrop-blur-sm text-white text-[11px] font-semibold py-3.5 text-center tracking-[0.2em] uppercase transition-colors flex items-center justify-center gap-2 ${
                        addedId === product.id ? 'bg-olive' : 'bg-neutral-900/95 hover:bg-black'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                      {addedId === product.id ? 'Added ✓' : 'Add To Cart'}
                    </button>
                  </div>
                </div>

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
                  <p className="text-[11px] text-neutral-400 tracking-wide">{product.salesText}</p>
                </div>
              </div>
            );
          })}

        </div>

        <div className="text-center mt-14">
          <Link to="/shop" className="group inline-flex items-center gap-3 px-10 py-4 border border-neutral-900 text-neutral-900 text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-neutral-900 hover:text-white transition-all duration-300 hover:gap-4 hover:shadow-lg hover:shadow-neutral-900/10">
            View All Products
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

      </div>

      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(25px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </section>
  );
}