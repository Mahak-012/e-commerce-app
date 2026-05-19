import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Heart, User, Menu, X, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const closeMobile = () => setIsMobileOpen(false);

  return (
    // YAHAN fixed kar diya gaya hai
    <nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-100 z-50 font-sans select-none">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-12 items-center h-24">
          
          {/* LEFT: Logo */}
          <div className="col-span-6 lg:col-span-3 flex items-center">
            <button className="lg:hidden text-gray-900 hover:opacity-70 transition-opacity mr-4" onClick={() => setIsMobileOpen(true)}>
              <Menu className="w-6 h-6 stroke-[1.5]" />
            </button>
            <Link to="/" className="text-xl sm:text-2xl font-semibold tracking-[0.25em] text-black hover:opacity-80 transition-opacity whitespace-nowrap" style={{ fontFamily: "'Playfair Display', 'Didot', serif" }}>
              MAHAK<span className="font-light text-gray-300 ml-1">COUTURE</span>
            </Link>
          </div>

          {/* CENTER: Navigation Links */}
          <div className="hidden lg:flex justify-center items-center gap-8 col-span-6">
            
            <Link to="/" className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-900 hover:text-neutral-400 transition-colors duration-300 whitespace-nowrap">
              Home
            </Link>

            {/* SHOP MEGA MENU */}
            <div className="relative py-8 group" onMouseEnter={() => setActiveMenu('shop')} onMouseLeave={() => setActiveMenu(null)}>
              <Link to="/shop" className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-900 cursor-pointer flex items-center gap-1 hover:text-neutral-400 transition-colors duration-300 whitespace-nowrap">
                Shop <ChevronDown className="w-3 h-3 text-gray-400 transition-transform duration-300 group-hover:rotate-180" />
              </Link>

              <AnimatePresence>
                {activeMenu === 'shop' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    // Yahan top-24 kiya hai taaki navbar (h-24) ke just niche aaye
                    className="fixed left-0 right-0 top-24 w-full bg-white shadow-[0_20px_40px_rgba(0,0,0,0.03)] border-t border-neutral-100 py-12 px-16 z-50 grid grid-cols-12 gap-10 max-w-[1440px] mx-auto"
                    onMouseEnter={() => setActiveMenu('shop')}
                    onMouseLeave={() => setActiveMenu(null)}
                  >
                    <div className="col-span-3">
                      <h4 className="font-semibold text-[11px] uppercase tracking-[0.2em] text-black mb-6 border-b border-neutral-100 pb-3">Product Types</h4>
                      <ul className="space-y-3.5 text-xs text-neutral-500 font-light tracking-wide">
                        <li><Link to="/shop?filter=simple" className="hover:text-black transition-colors duration-200">Simple Products</Link></li>
                        <li><Link to="/shop?filter=variable" className="hover:text-black transition-colors duration-200 flex items-center gap-2">Variable Product <span className="bg-[#56cfe1] text-white text-[8px] font-bold px-2 py-0.5 tracking-widest">NEW</span></Link></li>
                        <li><Link to="/shop?filter=grouped" className="hover:text-black transition-colors duration-200">Grouped Products</Link></li>
                        <li><Link to="/shop?filter=external" className="hover:text-black transition-colors duration-200">External/Affiliate Product</Link></li>
                      </ul>
                    </div>
                    <div className="col-span-3">
                      <h4 className="font-semibold text-[11px] uppercase tracking-[0.2em] text-black mb-6 border-b border-neutral-100 pb-3">WooCommerce Pages</h4>
                      <ul className="space-y-3.5 text-xs text-neutral-500 font-light tracking-wide">
                        <li><Link to="/shop" className="hover:text-black transition-colors duration-200">Shop Page</Link></li>
                        <li><Link to="/checkout" className="hover:text-black transition-colors duration-200">Checkout Page</Link></li>
                        <li><Link to="/cart" className="hover:text-black transition-colors duration-200">Shopping Cart</Link></li>
                      </ul>
                    </div>
                    <div className="col-span-3">
                      <h4 className="font-semibold text-[11px] uppercase tracking-[0.2em] text-black mb-6 border-b border-neutral-100 pb-3">Product Feature</h4>
                      <ul className="space-y-3.5 text-xs text-neutral-500 font-light tracking-wide">
                        <li><Link to="/shop?feature=stock" className="hover:text-black transition-colors duration-200">Stock Progress Bar</Link></li>
                        <li><Link to="/shop?feature=swatches" className="hover:text-black transition-colors duration-200">Color/Image Swatches</Link></li>
                        <li><Link to="/shop?feature=size-guide" className="hover:text-black transition-colors duration-200">Size Guide Table</Link></li>
                      </ul>
                    </div>
                    <Link to="/top-deals" className="col-span-3 relative bg-neutral-50 border border-neutral-100 overflow-hidden min-h-[200px] p-8 flex flex-col justify-center group/promo hover:border-neutral-300 transition-colors">
                      <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-neutral-400 mb-2 block">SPECIAL SALE!</span>
                      <h5 className="text-xl font-normal font-serif text-neutral-900 mb-4 tracking-wide leading-snug">Discount Up To<br/>30% OFF</h5>
                      <span className="text-xs font-semibold uppercase tracking-[0.15em] border-b border-black w-fit pb-0.5 group-hover/promo:text-neutral-500 group-hover/promo:border-neutral-500 transition-colors duration-300">SHOP NOW</span>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CATEGORIES MEGA MENU */}
            <div className="relative py-8 group" onMouseEnter={() => setActiveMenu('categories')} onMouseLeave={() => setActiveMenu(null)}>
              <Link to="/categories" className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-900 cursor-pointer flex items-center gap-1 hover:text-neutral-400 transition-colors duration-300 whitespace-nowrap">
                Categories
                <span className="bg-[#2ec4b6] text-white text-[8px] font-bold px-1.5 py-0.2 tracking-widest ml-1 rounded-sm">SALE</span>
                <ChevronDown className="w-3 h-3 text-gray-400 transition-transform duration-300 group-hover:rotate-180" />
              </Link>

              <AnimatePresence>
                {activeMenu === 'categories' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    // Yahan bhi top-24 kiya hai
                    className="fixed left-0 right-0 top-24 w-full bg-white shadow-[0_20px_40px_rgba(0,0,0,0.03)] border-t border-neutral-100 py-12 px-16 z-50 grid grid-cols-12 gap-10 max-w-[1440px] mx-auto"
                    onMouseEnter={() => setActiveMenu('categories')}
                    onMouseLeave={() => setActiveMenu(null)}
                  >
                    <div className="col-span-3">
                      <h4 className="font-semibold text-[11px] uppercase tracking-[0.2em] text-black mb-6 border-b border-neutral-100 pb-3">Casual</h4>
                      <ul className="space-y-3.5 text-xs text-neutral-500 font-light tracking-wide">
                        <li><Link to="/categories?cat=active-casual" className="hover:text-black transition-colors">Active Casual</Link></li>
                        <li><Link to="/categories?cat=easy-shirts" className="hover:text-black transition-colors">Easy Shirts</Link></li>
                        <li><Link to="/categories?cat=outerwear" className="hover:text-black transition-colors">Outerwear</Link></li>
                      </ul>
                    </div>
                    <div className="col-span-3">
                      <h4 className="font-semibold text-[11px] uppercase tracking-[0.2em] text-black mb-6 border-b border-neutral-100 pb-3">Dress</h4>
                      <ul className="space-y-3.5 text-xs text-neutral-500 font-light tracking-wide">
                        <li><Link to="/categories?cat=chic-style" className="hover:text-black transition-colors">Chic Style</Link></li>
                        <li><Link to="/categories?cat=preppy-style" className="hover:text-black transition-colors">Preppy Style</Link></li>
                      </ul>
                    </div>
                    <div className="col-span-6 border-l border-neutral-100 pl-10">
                      <h4 className="font-semibold text-[11px] uppercase tracking-[0.2em] text-black mb-6 text-center">Best Selling</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <Link to="/shop?product=hoodie" className="flex gap-4 items-center bg-neutral-50 p-4 border border-neutral-100 hover:border-neutral-300 transition-colors duration-300">
                          <div className="w-14 h-14 bg-neutral-200 overflow-hidden flex items-center justify-center rounded">
                            <img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=100&auto=format&fit=crop" alt="Hoodie" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-neutral-800">ADRO Men Hoodie</p>
                            <p className="text-xs font-bold text-neutral-900 mt-1">$23.00</p>
                          </div>
                        </Link>
                        <Link to="/shop?product=sunglasses" className="flex gap-4 items-center bg-neutral-50 p-4 border border-neutral-100 hover:border-neutral-300 transition-colors duration-300">
                          <div className="w-14 h-14 bg-neutral-200 overflow-hidden flex items-center justify-center rounded">
                            <img src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=100&auto=format&fit=crop" alt="Sunglasses" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-neutral-800">Stylish Sunglasses</p>
                            <p className="text-xs font-bold text-neutral-900 mt-1">$22.00</p>
                          </div>
                        </Link>
                        <Link to="/shop?product=bag" className="flex gap-4 items-center bg-neutral-50 p-4 border border-neutral-100 hover:border-neutral-300 transition-colors duration-300">
                          <div className="w-14 h-14 bg-neutral-200 overflow-hidden flex items-center justify-center rounded">
                            <img src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=100&auto=format&fit=crop" alt="Bag" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-neutral-800">Leather Tote Bag</p>
                            <p className="text-xs font-bold text-neutral-900 mt-1">$29.00</p>
                          </div>
                        </Link>
                        <Link to="/shop?product=watch" className="flex gap-4 items-center bg-neutral-50 p-4 border border-neutral-100 hover:border-neutral-300 transition-colors duration-300">
                          <div className="w-14 h-14 bg-neutral-200 overflow-hidden flex items-center justify-center rounded">
                            <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=100&auto=format&fit=crop" alt="Watch" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-neutral-800">Gold Wrist Watch</p>
                            <p className="text-xs font-bold text-neutral-900 mt-1">$38.00</p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/products" className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-900 hover:text-neutral-400 transition-colors duration-300 flex items-center gap-1 whitespace-nowrap">
              Products <span className="bg-[#ff4d6d] text-white text-[8px] font-bold px-1.5 py-0.2 tracking-widest rounded-sm">HOT</span>
            </Link>
            
            <Link to="/top-deals" className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-900 hover:text-neutral-400 transition-colors duration-300 whitespace-nowrap">
              Top Deals
            </Link>
          </div>

          {/* RIGHT: Search + Icons */}
          <div className="col-span-6 lg:col-span-3 flex items-center justify-end gap-6">
            <div className="hidden xl:flex items-center relative w-[180px]">
              <input type="text" placeholder="Search..." className="bg-neutral-50 border border-neutral-200 pl-3 pr-8 py-1.5 text-xs w-full focus:outline-none focus:border-black focus:bg-white transition-all" />
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute right-2.5 cursor-pointer hover:text-black stroke-[1.5]" />
            </div>

            <div className="flex items-center gap-4 text-neutral-800">
              <Link to="/account"><User className="w-[19px] h-[19px] cursor-pointer hover:text-neutral-400 transition-colors stroke-[1.5]" /></Link>
              <Link to="/wishlist" className="relative cursor-pointer group">
                <Heart className="w-[19px] h-[19px] group-hover:text-neutral-400 transition-colors stroke-[1.5]" />
                <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-medium">0</span>
              </Link>
              <Link to="/cart" className="relative cursor-pointer group">
                <ShoppingBag className="w-[19px] h-[19px] group-hover:text-neutral-400 transition-colors stroke-[1.5]" />
                <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-medium">0</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ MOBILE DRAWER ═══ */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.25 }} exit={{ opacity: 0 }} onClick={closeMobile} className="fixed inset-0 bg-black z-50 lg:hidden" />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'tween', duration: 0.3 }} className="fixed top-0 left-0 bottom-0 w-[280px] bg-white z-50 p-6 lg:hidden shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-8 border-b border-neutral-100 pb-4">
                  <span className="font-semibold tracking-[0.2em] text-xs uppercase text-neutral-400">Menu</span>
                  <X className="w-5 h-5 cursor-pointer text-gray-500 hover:text-black" onClick={closeMobile} />
                </div>
                <ul className="space-y-1">
                  <li className="py-3 border-b border-neutral-50"><Link to="/" onClick={closeMobile} className="text-xs font-semibold uppercase tracking-wider text-neutral-800 hover:text-black">Home</Link></li>
                  <li className="py-3 border-b border-neutral-50"><Link to="/shop" onClick={closeMobile} className="text-xs font-semibold uppercase tracking-wider text-neutral-800 hover:text-black">Shop</Link></li>
                  <li className="py-3 border-b border-neutral-50"><Link to="/categories" onClick={closeMobile} className="text-xs font-semibold uppercase tracking-wider text-neutral-800 hover:text-black">Categories</Link></li>
                  <li className="py-3 border-b border-neutral-50"><Link to="/products" onClick={closeMobile} className="text-xs font-semibold uppercase tracking-wider text-neutral-800 hover:text-black flex items-center gap-1">Products <span className="bg-[#ff4d6d] text-white text-[7px] font-bold px-1.5 py-0.2 rounded-sm">HOT</span></Link></li>
                  <li className="py-3 border-b border-neutral-50"><Link to="/top-deals" onClick={closeMobile} className="text-xs font-semibold uppercase tracking-wider text-neutral-800 hover:text-black flex items-center gap-1">Top Deals <span className="bg-[#2ec4b6] text-white text-[7px] font-bold px-1.5 py-0.2 rounded-sm">SALE</span></Link></li>
                  <li className="py-3 border-b border-neutral-50"><Link to="/cart" onClick={closeMobile} className="text-xs font-semibold uppercase tracking-wider text-neutral-800 hover:text-black">Cart</Link></li>
                  <li className="py-3 border-b border-neutral-50"><Link to="/wishlist" onClick={closeMobile} className="text-xs font-semibold uppercase tracking-wider text-neutral-800 hover:text-black">Wishlist</Link></li>
                  <li className="py-3"><Link to="/account" onClick={closeMobile} className="text-xs font-semibold uppercase tracking-wider text-neutral-800 hover:text-black">My Account</Link></li>
                </ul>
              </div>
              <div className="text-[9px] text-neutral-400 tracking-[0.25em] text-center">MAHAK COUTURE © 2026</div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}