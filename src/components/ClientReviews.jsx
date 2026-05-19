import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function ClientReviews() {
  const reviews = [
    {
      id: 1,
      name: "Sarah Jenkins",
      role: "Verified Buyer",
      rating: 5,
      comment: "Absolutely in love with the premium quality of the handbag! The stitching is flawless, and it looks even more elegant in person. Delivery was super fast too. Will definitely shop again!",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150"
    },
    {
      id: 2,
      name: "David Miller",
      role: "Verified Buyer",
      rating: 5,
      comment: "The sneakers are 100% original and incredibly comfortable for daily use. Mahak Couture has become my absolute go-to store for authentic streetwear and quick shipping.",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150"
    },
    {
      id: 3,
      name: "Emma Watson",
      role: "Fashion Blogger",
      rating: 5,
      comment: "Stunning collection! Bought the emerald gold wrist watch and received endless compliments. The customer support team was incredibly helpful throughout the tracking process.",
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);

  const triggerNext = () => {
    setIsBlinking(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
      setIsBlinking(false);
    }, 500);
  };

  const triggerPrev = () => {
    setIsBlinking(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
      setIsBlinking(false);
    }, 500);
  };

  useEffect(() => {
    const timer = setInterval(() => triggerNext(), 4000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  return (
    <section className="w-full select-none overflow-hidden relative">

      {/* ── SOFT GLOWY BACKGROUND ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50/40 via-amber-50/30 to-orange-50/40"></div>
      <div className="absolute top-[10%] right-[20%] w-[400px] h-[400px] bg-rose-100/20 rounded-full blur-[130px]"></div>
      <div className="absolute bottom-[10%] left-[15%] w-[350px] h-[350px] bg-amber-100/20 rounded-full blur-[110px]"></div>
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-orange-50/20 rounded-full blur-[140px]"></div>

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none px-4">
        <span className="text-[5rem] sm:text-[7rem] md:text-[9rem] font-serif font-black tracking-[0.2em] uppercase text-center leading-none">
          MAHAK COUTURE
        </span>
      </div>

      <div className="relative z-10 max-w-[900px] mx-auto px-6 py-24 text-center">

        {/* Header */}
        <span className="text-[10px] tracking-[0.3em] text-neutral-400 font-bold uppercase block mb-3">
          Testimonials
        </span>
        <h2 className="text-3xl font-light tracking-[0.15em] text-neutral-800 font-serif uppercase mb-12 relative inline-block pb-3">
          What Our Clients Say
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[1px] bg-neutral-800" />
        </h2>

        {/* Card */}
        <div className="w-full max-w-3xl mx-auto relative">

          <div className={`min-h-[260px] flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm border border-neutral-200/50 p-8 md:p-12 rounded-2xl shadow-xl shadow-amber-100/20 transition-all duration-700 ease-in-out ${
            isBlinking ? 'opacity-0 scale-[0.98] blur-[2px]' : 'opacity-100 scale-100 blur-0'
          }`}>

            {/* Quote Icon */}
            <Quote className="w-8 h-8 text-amber-200/60 mb-4" />

            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(reviews[activeIndex].rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400 stroke-amber-400" />
              ))}
            </div>

            {/* Quote */}
            <p className="text-neutral-700 text-base md:text-lg font-serif leading-relaxed italic max-w-2xl px-2">
              "{reviews[activeIndex].comment}"
            </p>

            {/* Divider */}
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-neutral-300 to-transparent my-6" />

            {/* Client */}
            <div className="flex flex-col items-center gap-2">
              <img src={reviews[activeIndex].img} alt={reviews[activeIndex].name} className="w-14 h-14 rounded-full object-cover border-2 border-white ring-2 ring-amber-200/40 shadow-md transition-transform duration-500 hover:scale-110" />
              <div className="mt-1">
                <h4 className="text-xs font-bold text-neutral-900 tracking-[0.15em] uppercase">{reviews[activeIndex].name}</h4>
                <p className="text-[10px] text-amber-600 font-medium tracking-widest uppercase mt-0.5">{reviews[activeIndex].role}</p>
              </div>
            </div>

          </div>

          {/* Arrows */}
          <button onClick={triggerPrev} className="absolute left-0 md:-left-12 top-[55%] -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm text-neutral-400 hover:text-neutral-900 border border-neutral-200/60 flex items-center justify-center shadow-lg hover:shadow-xl transition-all active:scale-95 group">
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button onClick={triggerNext} className="absolute right-0 md:-right-12 top-[55%] -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm text-neutral-400 hover:text-neutral-900 border border-neutral-200/60 flex items-center justify-center shadow-lg hover:shadow-xl transition-all active:scale-95 group">
            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>

        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2.5 mt-8">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (idx !== activeIndex) {
                  setIsBlinking(true);
                  setTimeout(() => { setActiveIndex(idx); setIsBlinking(false); }, 400);
                }
              }}
              className={`h-1 transition-all duration-500 rounded-full ${activeIndex === idx ? 'w-8 bg-amber-600' : 'w-2 bg-neutral-300 hover:bg-neutral-400'}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}