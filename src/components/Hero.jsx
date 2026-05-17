import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const sliderData = [
  {
    id: 1,
    subtitle: "THE NEW ERA OF LUXURY",
    title: "Urban Elegance\n& Minimalist Layers",
    description: "Curated streetwear for the modern identity.",
    buttonText: "DISCOVER THE LOOK",
    buttonLink: "/shop",
    bgImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=100"
  },
  {
    id: 2,
    subtitle: "METROPOLITAN STATEMENT",
    title: "Sharp Tailoring\n& Premium Aesthetics",
    description: "Designed for those who lead, never follow.",
    buttonText: "EXPLORE THE STYLE",
    buttonLink: "/products",
    bgImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=2000&q=100"
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [current]);

  const handleNext = () => {
    setCurrent((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? sliderData.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-[75vh] sm:h-[85vh] bg-neutral-900 overflow-hidden select-none">
      
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${sliderData[current].bgImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent md:from-black/50 md:via-black/20 md:to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="max-w-[1440px] mx-auto h-full px-6 sm:px-12 relative z-10 flex items-center justify-between">
        
        <button 
          onClick={handlePrev}
          className="w-11 h-11 bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md active:scale-95"
        >
          <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
        </button>

        <div className="w-full max-w-xl text-left mr-auto pl-4 md:pl-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-4 sm:space-y-6"
            >
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.35em] text-neutral-300 uppercase block">
                {sliderData[current].subtitle}
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-light font-serif text-white tracking-wide leading-[1.2] whitespace-pre-line">
                {sliderData[current].title}
              </h1>

              <p className="text-[11px] sm:text-xs font-light text-neutral-400 tracking-[0.15em] uppercase max-w-md">
                {sliderData[current].description}
              </p>

              {/* ✅ BUTTON NOW NAVIGATES TO PAGE */}
              <div className="pt-2">
                <Link
                  to={sliderData[current].buttonLink}
                  className="inline-block bg-white text-black text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] px-8 py-4 border border-white hover:bg-transparent hover:text-white transition-all duration-300 shadow-xl"
                >
                  {sliderData[current].buttonText}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button 
          onClick={handleNext}
          className="w-11 h-11 bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md active:scale-95"
        >
          <ChevronRight className="w-5 h-5 stroke-[1.5]" />
        </button>

      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-1 transition-all duration-300 ${index === current ? 'w-12 bg-white' : 'w-3 bg-white/40 hover:bg-white'}`}
          />
        ))}
      </div>

    </div>
  );
}