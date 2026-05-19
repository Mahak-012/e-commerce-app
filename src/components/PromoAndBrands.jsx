import React from 'react';

export default function PromoAndBrands({ onProductSelect }) {
  const slideProducts = [
    { id: 2, title: "Dolce & Gabbana Sicily Bag", price: 29, oldPrice: 35, discount: "-17%", rating: 5, brand: "D&G", salesText: "5 bags in stock", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop" },
    { id: 4, title: "Emerald Gold Wrist Watch", price: 38, oldPrice: 45, discount: "-15%", rating: 5, brand: "Luxury", salesText: "Limited Edition", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop" },
    { id: 3, title: "Women Sunglasses Retro", price: 22, rating: 4, brand: "Vogue", salesText: "Hot selling item", img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop" },
    { id: 1, title: "Urban Runner Mesh Sneakers", price: 30, oldPrice: 31, discount: "-3%", rating: 5, brand: "Nike", salesText: "3 units sold recently", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop" },
    { id: 5, title: "Structured Leather Tote Bag", price: 45, oldPrice: 60, discount: "-25%", rating: 5, brand: "Mahak", salesText: "New Arrival", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop" },
    // Baseball Cap ki image yahan update ki gayi hai
    { id: 6, title: "Washed Canvas Baseball Cap", price: 9, oldPrice: 28, discount: "-68%", rating: 5, brand: "Urban", salesText: "Best Seller", img: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=600&auto=format&fit=crop" },
  ];

  const continuousList = [...slideProducts, ...slideProducts, ...slideProducts];

  const brandLogos = [
    { name: "Nike", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/120px-Logo_NIKE.svg.png" },
    { name: "D&G", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Dolce%26Gabbana_logo.svg/160px-Dolce%26Gabbana_logo.svg.png" },
    { name: "Puma", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Puma_logo.svg/120px-Puma_logo.svg.png" },
    { name: "Adidas", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_logo.svg/120px-Adidas_logo.svg.png" },
    { name: "Vogue", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Vogue_logo.svg/160px-Vogue_logo.svg.png" },
    { name: "Levis", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Levi%27s_logo.svg/120px-Levi%27s_logo.svg.png" },
  ];

  const handleProductClick = (product) => {
    if (onProductSelect) {
      onProductSelect(product);
    }
  };

  return (
    <section className="w-full select-none relative" style={{ overflowX: 'clip', overflowY: 'visible' }}>
      {/* ══════════ SOFT GLOWY LIGHT BACKGROUND ══════════ */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/40 via-orange-50/30 to-rose-50/40 pointer-events-none"></div>

      {/* Glowing orbs - pointer-events-none added */}
      <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-amber-200/25 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[5%] right-[20%] w-[400px] h-[400px] bg-rose-200/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-orange-100/20 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute top-[5%] right-[10%] w-[300px] h-[300px] bg-yellow-100/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[15%] left-[5%] w-[350px] h-[350px] bg-pink-100/15 rounded-full blur-[110px] pointer-events-none"></div>

      <div className="relative z-10">
        {/* ══════════ PROMO MARQUEE SLIDER ══════════ */}
        <div className="py-14 lg:py-20">
          {/* ── Header ── */}
          <div className="text-center mb-12 px-5">
            <span className="text-[10px] tracking-[0.4em] text-neutral-400 uppercase font-medium block mb-3">
              Trending Now
            </span>
            <h2 className="text-2xl md:text-4xl font-serif font-medium tracking-tight text-neutral-900">
              Shop The Look
            </h2>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent mx-auto mt-4"></div>
          </div>

          {/* ── Marquee Container - FIXED ── */}
          <div className="relative overflow-x-clip overflow-y-visible">
            {/* Left fade mask */}
            <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-amber-50/80 to-transparent z-10 pointer-events-none"></div>
            {/* Right fade mask */}
            <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-rose-50/80 to-transparent z-10 pointer-events-none"></div>

            {/* Sliding Track */}
            <div className="flex w-[300%] animate-marquee whitespace-nowrap items-center gap-5 lg:gap-7">
              {continuousList.map((card, idx) => (
                <div
                  key={idx}
                  onClick={() => handleProductClick(card)}
                  className="w-[260px] sm:w-[300px] lg:w-[340px] shrink-0 inline-block relative aspect-[3/4] overflow-hidden group cursor-pointer rounded-2xl transition-all duration-500 hover:shadow-2xl hover:shadow-amber-200/30 hover:scale-[1.02]"
                >
                  {/* Image */}
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 pointer-events-none"
                  />

                  {/* Warm Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/75 via-neutral-900/20 to-transparent pointer-events-none"></div>

                  {/* Warm Glow on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-600/0 to-amber-400/0 group-hover:from-amber-600/10 group-hover:to-amber-400/5 transition-all duration-500 pointer-events-none"></div>

                  {/* Discount Badge */}
                  {card.discount && (
                    <div className="absolute top-4 left-4 bg-white text-neutral-900 text-[10px] font-bold px-3 py-1 rounded-full shadow-lg tracking-wider uppercase opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-400 pointer-events-none">
                      {card.discount}
                    </div>
                  )}

                  {/* Brand Tag */}
                  <div className="absolute top-4 right-4 bg-white/15 backdrop-blur-md text-white text-[9px] font-semibold px-3 py-1 rounded-full border border-white/15 tracking-[0.2em] uppercase pointer-events-none">
                    {card.brand}
                  </div>

                  {/* Bottom Content */}
                  <div className="absolute bottom-0 inset-x-0 p-5 lg:p-6 pointer-events-none">
                    <h3 className="text-base sm:text-lg font-medium tracking-wide text-white leading-snug drop-shadow-sm">
                      {card.title}
                    </h3>

                    <div className="flex items-center justify-between mt-3">
                      {/* Price */}
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-white drop-shadow-sm">${card.price}.00</span>
                        {card.oldPrice && (
                          <span className="text-[12px] text-white/50 line-through">${card.oldPrice}.00</span>
                        )}
                      </div>

                      {/* CTA Arrow */}
                      <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-400 pointer-events-none">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>

                    {/* Sales text */}
                    <p className="text-[10px] text-white/40 tracking-wider uppercase mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                      {card.salesText}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════ BRAND LOGOS STRIP ══════════ */}
        <div className="border-t border-neutral-200/50 py-8 lg:py-10">
          <div className="max-w-[1400px] mx-auto px-5 sm:px-8">

            <div className="grid grid-cols-3 md:grid-cols-6 gap-6 items-center justify-items-center">
              {brandLogos.map((brand, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center h-12 grayscale hover:grayscale-0 opacity-30 hover:opacity-80 transition-all duration-500 cursor-pointer"
                >
                  <img
                    src={brand.img}
                    alt={brand.name}
                    className="max-h-10 max-w-[100px] object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      if (e.target.nextSibling) {
                        e.target.nextSibling.style.display = 'block';
                      }
                    }}
                  />
                  <span className="font-serif text-lg font-medium text-neutral-400 tracking-wider hidden">
                    {brand.name}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* ══════════ ANIMATIONS ══════════ */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}