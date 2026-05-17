import React, { useState, useEffect } from 'react';
import { Star, ShieldCheck, ShoppingCart, ArrowLeft, RefreshCw, Heart, Share2, Scale } from 'lucide-react';

export default function ProductDetail({ product, onBack }) {
  const [activeImg, setActiveImg] = useState(product.img);
  const [selectedColor, setSelectedColor] = useState('Red');
  const [selectedSize, setSelectedSize] = useState('6');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveImg(product.img);
  }, [product]);

  return (
    <div className="bg-white min-h-screen py-6 px-4 sm:px-6 max-w-[1200px] mx-auto select-none font-sans">
      
      {/* Breadcrumb Navigation Path */}
      <div className="flex items-center gap-2 text-xs text-neutral-400 mb-8 tracking-wide">
        <button onClick={onBack} className="hover:text-black transition-colors">Home</button>
        <span>/</span>
        <span className="capitalize">{product.brand || "Shop"}</span>
        <span>/</span>
        <span className="text-neutral-600 line-clamp-1">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Left Side: Seamless Image Showcase Area */}
        <div className="md:col-span-6 grid grid-cols-12 gap-4">
          {/* Thumbnails list */}
          <div className="col-span-2 flex flex-col gap-2.5">
            {(product.gallery || [product.img]).map((gImg, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImg(gImg)}
                className={`aspect-square w-full bg-[#fcfcfc] p-1.5 rounded-sm border transition-all ${
                  activeImg === gImg ? 'border-neutral-900' : 'border-neutral-100'
                }`}
              >
                <img src={gImg} alt="thumb" className="w-full h-full object-contain mix-blend-multiply" />
              </button>
            ))}
          </div>

          {/* Large display box (NO BORDERS inside background space) */}
          <div className="col-span-10 bg-[#f8f8f8] aspect-square flex items-center justify-center p-8 relative rounded-xs">
            <div className="w-[90%] h-[90%] flex items-center justify-center">
              <img src={activeImg} alt="Focus View" className="max-w-full max-h-full object-contain mix-blend-multiply" />
            </div>
            {product.discount && (
              <span className="absolute top-4 left-4 bg-[#111111] text-white text-[11px] font-bold px-2 py-0.5 rounded-xs">
                {product.discount}
              </span>
            )}
          </div>
        </div>

        {/* Right Side: Detailed Production Panel */}
        <div className="md:col-span-6 flex flex-col space-y-5">
          <div>
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest block mb-1">
              Brand: <span className="text-neutral-700">{product.brand}</span>
            </span>

            <h1 className="text-2xl font-semibold text-neutral-900 tracking-tight leading-tight">
              {product.title}
            </h1>

            {/* Live review score counts */}
            <div className="flex items-center gap-2 mt-3 pb-4 border-b border-neutral-100">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < product.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-200'}`} />
                ))}
              </div>
              <span className="text-xs text-neutral-500 font-medium">(1 review)</span>
            </div>

            {/* Price values row */}
            <div className="flex items-center gap-3 py-4">
              {product.oldPrice && (
                <span className="text-neutral-400 line-through text-base font-light">${product.oldPrice}.00</span>
              )}
              <span className="text-3xl font-bold text-neutral-900">${product.price}.00</span>
            </div>

            {/* Flash Sales Counter Warning Text */}
            <p className="text-red-600 font-medium text-xs bg-red-50 border border-red-100 px-3 py-2 rounded-xs inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
              Hurry up! {product.salesText}
            </p>

            {/* Colors Variant Section */}
            <div className="mt-6 space-y-2.5">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block">
                Color
              </span>
              <div className="flex gap-2">
                {['Blue', 'LightGreen', 'Red', 'Brown'].map((clr) => (
                  <button
                    key={clr}
                    onClick={() => setSelectedColor(clr)}
                    className={`w-7 h-7 rounded-full border-2 transition-all ${
                      selectedColor === clr ? 'border-neutral-900 scale-105' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: clr === 'Blue' ? '#1e40af' : clr === 'LightGreen' ? '#4ade80' : clr === 'Red' ? '#ef4444' : '#a16207' }}
                  />
                ))}
              </div>
            </div>

            {/* Sizes Variant Grid Selector */}
            <div className="mt-5 space-y-2.5">
              <div className="flex justify-between items-center max-w-[240px]">
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Size</span>
                <button className="text-xs text-neutral-500 underline hover:text-black">Size Chart</button>
              </div>
              <div className="flex gap-2">
                {['6', '7', '8', '9'].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`h-9 w-10 text-xs font-semibold border rounded-xs transition-all ${
                      selectedSize === sz ? 'bg-black border-black text-white' : 'bg-white border-neutral-200 text-neutral-800 hover:border-neutral-400'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quantity and Actions Blocks */}
          <div className="space-y-4 pt-4 border-t border-neutral-100">
            <div className="flex gap-3">
              {/* Box Counter */}
              <div className="flex items-center border border-neutral-300 h-12 bg-white rounded-xs">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))} 
                  className="px-4 text-neutral-500 hover:text-black font-semibold text-lg"
                >
                  -
                </button>
                <span className="w-8 text-center text-sm font-semibold text-neutral-900">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)} 
                  className="px-4 text-neutral-500 hover:text-black font-semibold text-lg"
                >
                  +
                </button>
              </div>

              {/* Dynamic Add to Cart Action */}
              <button className="flex-1 bg-neutral-900 hover:bg-black text-white h-12 text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 rounded-xs shadow-xs">
                <ShoppingCart className="w-4 h-4" /> Add To Cart
              </button>
            </div>

            {/* Buy Now Full Button */}
            <button className="w-full bg-[#111111] hover:bg-black text-white h-12 text-xs font-bold uppercase tracking-widest transition-all rounded-xs">
              Buy Now
            </button>

            {/* Utility Sub Actions Layout Row */}
            <div className="flex items-center justify-start gap-6 text-xs text-neutral-500 pt-2">
              <button className="flex items-center gap-1.5 hover:text-black transition-colors">
                <Scale className="w-4 h-4" /> Compare
              </button>
              <button className="flex items-center gap-1.5 hover:text-black transition-colors">
                <Heart className="w-4 h-4" /> Wishlist
              </button>
              <button className="flex items-center gap-1.5 hover:text-black transition-colors">
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>

            {/* Guaranteed Badges Block */}
            <div className="bg-neutral-50 p-4 border border-neutral-200 rounded-sm space-y-2 mt-4 text-xs text-neutral-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span><strong>101% Original:</strong> Authenticity guaranteed directly from factory hubs.</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-blue-600" />
                <span><strong>Free Shipping & Returns:</strong> On all domestic orders above $200.</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}