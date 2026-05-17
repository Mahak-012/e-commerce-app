import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Eye, ShoppingCart, Heart, Flame, Zap } from 'lucide-react';
// BackButton ka import hata diya gaya hai

// 1. Yahan onAddToCart prop add kiya gaya hai
export default function DealOfTheWeek({ onProductSelect, onAddToCart }) {
  const dealProducts = [
    { id: 1, title: "Classic Leather Crossbody Saddle Bag", price: 29, oldPrice: 89, rating: 5, brand: "Mahak Culture", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop" },
    { id: 2, title: "Premium Oxford Button-Down Shirt", price: 19, oldPrice: 55, rating: 5, brand: "Mahak Culture", img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop" },
    { id: 3, title: "Retro Aviator Polarized Sunglasses", price: 15, oldPrice: 42, rating: 4, brand: "Mahak Culture", img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop" },
    { id: 4, title: "Urban Runner Pro Mesh Sneakers", price: 35, oldPrice: 95, rating: 5, brand: "Mahak Culture", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop" },
    { id: 5, title: "Washed Canvas Baseball Cap", price: 9, oldPrice: 28, rating: 5, brand: "Mahak Culture", img: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=600&auto=format&fit=crop" },
    { id: 6, title: "Structured Mini Top Handle Bag", price: 25, oldPrice: 72, rating: 4, brand: "Mahak Culture", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop" },
    { id: 7, title: "Slim Fit Mandarin Collar Shirt", price: 17, oldPrice: 48, rating: 5, brand: "Mahak Culture", img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=600&auto=format&fit=crop" },
    { id: 8, title: "Classic Wayfarer Matte Shades", price: 12, oldPrice: 35, rating: 5, brand: "Mahak Culture", img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&auto=format&fit=crop" },
    { id: 9, title: "Suede Chelsea Ankle Boots", price: 45, oldPrice: 120, rating: 5, brand: "Mahak Culture", img: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=600&auto=format&fit=crop" },
    { id: 10, title: "Trucker Mesh Back Snapback Cap", price: 8, oldPrice: 25, rating: 4, brand: "Mahak Culture", img: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?q=80&w=600&auto=format&fit=crop" },
    { id: 11, title: "Quilted Puffer Laptop Backpack", price: 22, oldPrice: 68, rating: 5, brand: "Mahak Culture", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop" },
    { id: 12, title: "Linen Blend Casual Summer Shirt", price: 14, oldPrice: 45, rating: 5, brand: "Mahak Culture", img: "https://images.unsplash.com/photo-1598033129183-c4f50c736c10?q=80&w=600&auto=format&fit=crop" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;
  const maxIndex = dealProducts.length - itemsPerPage;

  const handlePrev = () => setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  const handleNext = () => setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));

  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 8, minutes: 45, seconds: 19 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full select-none relative overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-br from-neutral-100/80 via-gray-50/50 to-slate-100/70"></div>
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-neutral-200/30 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-red-100/20 rounded-full blur-[100px]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gray-200/20 rounded-full blur-[150px]"></div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[8%] left-[5%] w-2 h-8 bg-red-500 rounded-full animate-[confetti-fall_4s_linear_infinite] rotate-12 opacity-70"></div>
        <div className="absolute top-[5%] left-[18%] w-1.5 h-6 bg-amber-400 rounded-full animate-[confetti-fall_5s_linear_infinite_0.5s] -rotate-45 opacity-60"></div>
        <div className="absolute top-[3%] left-[32%] w-2 h-7 bg-blue-500 rounded-full animate-[confetti-fall_4.5s_linear_infinite_1s] rotate-[30deg] opacity-65"></div>
        <div className="absolute top-[6%] left-[50%] w-1.5 h-8 bg-pink-500 rounded-full animate-[confetti-fall_3.5s_linear_infinite_0.3s] -rotate-25 opacity-70"></div>
        <div className="absolute top-[4%] left-[65%] w-2 h-6 bg-emerald-500 rounded-full animate-[confetti-fall_5.5s_linear_infinite_0.8s] rotate-45 opacity-60"></div>
        <div className="absolute top-[7%] left-[78%] w-1.5 h-7 bg-purple-500 rounded-full animate-[confetti-fall_4.2s_linear_infinite_1.5s] -rotate-12 opacity-65"></div>
        <div className="absolute top-[2%] left-[90%] w-2 h-8 bg-orange-400 rounded-full animate-[confetti-fall_3.8s_linear_infinite_0.7s] rotate-[60deg] opacity-70"></div>
        <div className="absolute top-[10%] left-[12%] w-1.5 h-6 bg-cyan-400 rounded-full animate-[confetti-fall_4.8s_linear_infinite_2s] rotate-[20deg] opacity-55"></div>
        <div className="absolute top-[8%] left-[42%] w-2 h-7 bg-rose-400 rounded-full animate-[confetti-fall_5.2s_linear_infinite_1.2s] -rotate-[35deg] opacity-60"></div>
        <div className="absolute top-[5%] left-[72%] w-1.5 h-8 bg-yellow-400 rounded-full animate-[confetti-fall_3.9s_linear_infinite_0.9s] rotate-15 opacity-65"></div>
        <div className="absolute top-[15%] left-[8%] w-2.5 h-2.5 bg-red-400 rounded-full animate-[confetti-dot_3s_ease-in-out_infinite] opacity-50"></div>
        <div className="absolute top-[12%] left-[25%] w-2 h-2 bg-amber-300 rounded-full animate-[confetti-dot_4s_ease-in-out_infinite_0.5s] opacity-45"></div>
        <div className="absolute top-[18%] left-[55%] w-3 h-3 bg-blue-300 rounded-full animate-[confetti-dot_3.5s_ease-in-out_infinite_1s] opacity-40"></div>
        <div className="absolute top-[10%] left-[85%] w-2 h-2 bg-pink-300 rounded-full animate-[confetti-dot_4.2s_ease-in-out_infinite_0.3s] opacity-50"></div>
        <div className="absolute top-[20%] left-[38%] w-2.5 h-2.5 bg-green-300 rounded-full animate-[confetti-dot_3.8s_ease-in-out_infinite_0.7s] opacity-45"></div>
        <div className="absolute top-[6%] left-[22%] w-3 h-3 bg-violet-400 rounded-sm animate-[confetti-fall_6s_linear_infinite_1.8s] rotate-45 opacity-40"></div>
        <div className="absolute top-[9%] left-[58%] w-2.5 h-2.5 bg-teal-400 rounded-sm animate-[confetti-fall_5.5s_linear_infinite_0.4s] -rotate-12 opacity-45"></div>
        <div className="absolute top-[4%] left-[95%] w-3 h-3 bg-red-300 rounded-sm animate-[confetti-fall_4.8s_linear_infinite_2.2s] rotate-[30deg] opacity-35"></div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24">

        {/* BackButton component yahan se hata diya gaya hai */}

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-14">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-1.5 rounded-full mb-4 border border-red-200/60 animate-[pulse-glow_2s_ease-in-out_infinite]">
              <Flame className="w-4 h-4 animate-pulse" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase">Limited Time Offer</span>
              <Zap className="w-3.5 h-3.5 animate-pulse" />
            </div>
            <h2 className="text-3xl md:text-[42px] font-serif font-medium tracking-tight text-neutral-900 leading-tight">Deal Of The Week</h2>
            <p className="mt-2 text-neutral-500 text-[15px]">Massive discounts — grab yours before they're gone!</p>
          </div>

          <div className="flex items-center gap-3">
            {[{ label: 'Days', value: timeLeft.days }, { label: 'Hours', value: timeLeft.hours }, { label: 'Mins', value: timeLeft.minutes }, { label: 'Sec', value: timeLeft.seconds }].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="relative bg-gradient-to-b from-red-500 to-red-700 text-white text-xl md:text-3xl font-bold w-14 h-14 md:w-[72px] md:h-[72px] flex items-center justify-center rounded-xl shadow-[0_4px_20px_rgba(239,68,68,0.4)] animate-[pulse-shadow_2s_ease-in-out_infinite] border border-red-400/30">
                  {String(item.value).padStart(2, '0')}
                </div>
                <span className="text-[10px] md:text-[11px] font-bold text-red-500/70 tracking-wider mt-2 uppercase">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <div className="flex transition-transform duration-600 ease-out gap-5 lg:gap-6" style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}>
              {dealProducts.map((product) => {
                const saved = product.oldPrice - product.price;
                const discountPct = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
                return (
                  <div key={product.id} className="w-[calc(50%-10px)] md:w-[calc(25%-18px)] shrink-0 flex flex-col group cursor-pointer" onClick={() => onProductSelect?.(product)}>
                    <div className="relative w-full aspect-[3/4] bg-white/70 backdrop-blur-sm overflow-hidden rounded-xl border border-neutral-200/40 shadow-sm group-hover:shadow-xl group-hover:shadow-red-100/30 transition-shadow duration-500">
                      <img src={product.img} alt={product.title} className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                      <div className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-extrabold px-3 py-1.5 rounded-full shadow-lg shadow-red-200/60 animate-[bounce-subtle_2s_ease-in-out_infinite] tracking-wide">-{discountPct}%</div>
                      {discountPct >= 60 && <div className="absolute top-3 right-3 bg-orange-500 text-white text-[8px] font-black px-2 py-1 rounded-full shadow-md animate-[pulse_1.5s_ease-in-out_infinite] tracking-widest uppercase">🔥 HOT</div>}
                      <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/5 transition-colors duration-300"></div>
                      <div className="absolute top-14 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-400">
                        <button onClick={(e) => e.stopPropagation()} className="w-9 h-9 bg-white/90 backdrop-blur-sm text-neutral-600 hover:text-red-500 hover:scale-110 flex items-center justify-center rounded-full shadow-md transition-all"><Heart className="w-4 h-4" /></button>
                        <button onClick={(e) => e.stopPropagation()} className="w-9 h-9 bg-white/90 backdrop-blur-sm text-neutral-600 hover:text-neutral-900 hover:scale-110 flex items-center justify-center rounded-full shadow-md transition-all"><Eye className="w-4 h-4" /></button>
                      </div>
                      
                      {/* 2. Yahan Add To Cart button ka logic update kiya gaya hai */}
                      <div className="absolute bottom-0 inset-x-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out">
                        <button 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            onAddToCart?.(product); 
                          }} 
                          className="w-full bg-red-600 text-white hover:bg-red-700 text-[11px] font-bold py-3.5 text-center tracking-[0.2em] uppercase flex items-center justify-center gap-2 transition-colors shadow-lg"
                        >
                          <ShoppingCart className="w-4 h-4" /> Add To Cart
                        </button>
                      </div>

                    </div>
                    <div className="pt-4 space-y-1.5 px-0.5">
                      <span className="text-[10px] tracking-[0.2em] text-neutral-400 uppercase font-medium block">{product.brand}</span>
                      <h3 className="text-[14px] font-medium text-neutral-800 leading-snug line-clamp-2 group-hover:text-red-600 transition-colors duration-300">{product.title}</h3>
                      <div className="flex items-center gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} className={`w-3 h-3 ${i < product.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-200'}`} />)}</div>
                      <div className="flex items-center gap-2.5 pt-0.5">
                        <span className="text-base sm:text-lg font-extrabold text-red-600 animate-[pulse-price_3s_ease-in-out_infinite]">${product.price}.00</span>
                        {product.oldPrice && <span className="text-[13px] text-neutral-400 line-through font-light">${product.oldPrice}.00</span>}
                      </div>
                      <div className="inline-flex items-center gap-1 bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 border border-red-100/50"><Zap className="w-2.5 h-2.5" /> You save ${saved}!</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button onClick={handlePrev} className="absolute -left-4 lg:-left-5 top-[40%] -translate-y-1/2 w-11 h-11 bg-white/90 backdrop-blur-sm hover:bg-red-600 text-neutral-600 hover:text-white rounded-full border border-neutral-200 hover:border-red-600 flex items-center justify-center shadow-xl transition-all active:scale-90 z-20"><ChevronLeft className="w-5 h-5" /></button>
          <button onClick={handleNext} className="absolute -right-4 lg:-right-5 top-[40%] -translate-y-1/2 w-11 h-11 bg-white/90 backdrop-blur-sm hover:bg-red-600 text-neutral-600 hover:text-white rounded-full border border-neutral-200 hover:border-red-600 flex items-center justify-center shadow-xl transition-all active:scale-90 z-20"><ChevronRight className="w-5 h-5" /></button>
        </div>

        <div className="flex justify-center items-center gap-2 mt-10">
          {[...Array(maxIndex + 1)].map((_, i) => (
            <button key={i} onClick={() => setCurrentIndex(i)} className={`transition-all duration-300 rounded-full ${i === currentIndex ? 'w-8 h-2 bg-red-500' : 'w-2 h-2 bg-neutral-300 hover:bg-red-300'}`} />
          ))}
        </div>

      </div>

      <style>{`
        @keyframes confetti-fall { 0% { transform: translateY(-20px) rotate(0deg); opacity: 0; } 10% { opacity: 0.7; } 90% { opacity: 0.5; } 100% { transform: translateY(calc(100vh)) rotate(720deg); opacity: 0; } }
        @keyframes confetti-dot { 0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; } 50% { transform: translateY(15px) scale(1.3); opacity: 0.6; } }
        @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.2); } 50% { box-shadow: 0 0 15px 5px rgba(239, 68, 68, 0.15); } }
        @keyframes pulse-shadow { 0%, 100% { box-shadow: 0 4px 20px rgba(239, 68, 68, 0.4); } 50% { box-shadow: 0 4px 30px rgba(239, 68, 68, 0.6); } }
        @keyframes bounce-subtle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        @keyframes pulse-price { 0%, 100% { opacity: 1; } 50% { opacity: 0.75; } }
      `}</style>
    </section>
  );
}