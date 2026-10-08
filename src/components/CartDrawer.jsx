import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { X, Trash2, ShoppingBag, Truck, ShieldCheck, RefreshCcw, Plus, Minus, Check, ArrowRight } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];
const FREE_SHIP_AT = 99;

const SUGGESTIONS = [
  { id: 's1', title: 'Silk Pocket Square Set', price: 22, brand: 'Mahak Couture', img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=200&auto=format&fit=crop' },
  { id: 's2', title: 'Merino Wool Scarf',      price: 27, brand: 'Mahak Couture', img: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=200&auto=format&fit=crop' },
  { id: 's3', title: 'Leather Belt Classic',   price: 24, brand: 'Mahak Couture', img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=200&auto=format&fit=crop' },
];

export default function CartDrawer() {
  const navigate = useNavigate();
  const { cart, cartOpen, setCartOpen, removeFromCart, updateQty, addToCart, totalItems, totalPrice } = useCart();
  const [justAdded, setJustAdded] = useState(null);

  /* Scroll lock + ESC */
  useEffect(() => {
    if (!cartOpen) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setCartOpen(false);
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [cartOpen, setCartOpen]);

  const remaining  = Math.max(0, FREE_SHIP_AT - totalPrice);
  const shipPct    = Math.min(100, (totalPrice / FREE_SHIP_AT) * 100);
  const finalTotal = totalPrice >= FREE_SHIP_AT ? totalPrice : totalPrice + 9.99;

  const quickAdd = (p) => {
    addToCart(p, 1);
    setJustAdded(p.id);
    setTimeout(() => setJustAdded(null), 1400);
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/45 backdrop-blur-sm" onClick={() => setCartOpen(false)}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-ivory shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-linen">
              <h2 className="font-serif text-lg font-medium">
                Shopping Bag <span className="text-stone-400 text-sm">({totalItems})</span>
              </h2>
              <button onClick={() => setCartOpen(false)} aria-label="Close"
                className="p-2 hover:bg-linen rounded-full transition-all hover:rotate-90 duration-300">
                <X size={18} />
              </button>
            </div>

            {/* Free shipping progress */}
            {cart.length > 0 && (
              <div className="px-5 pt-4 pb-1">
                <div className="bg-white/70 border border-linen rounded-xl p-3.5">
                  <p className="text-[11px] text-stone-500 mb-2 flex items-center gap-1.5">
                    <Truck size={13} className="text-moss" />
                    {remaining > 0
                      ? <>Add <strong className="text-neutral-800">${remaining.toFixed(2)}</strong> more for <strong className="text-moss">FREE shipping</strong></>
                      : <strong className="text-moss">🎉 You've unlocked FREE shipping!</strong>}
                  </p>
                  <div className="h-1.5 bg-linen rounded-full overflow-hidden">
                    <motion.div
                      animate={{ width: `${shipPct}%` }}
                      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                      className={`h-full rounded-full ${shipPct >= 100 ? 'bg-moss' : 'bg-amber-400'}`} />
                  </div>
                </div>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5">
              {cart.length === 0 ? (
                /* ── Empty state ── */
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={48} strokeWidth={1} className="mb-4 text-stone-300" />
                  <p className="font-serif text-lg text-stone-600">Your bag is empty</p>
                  <p className="text-xs text-stone-400 mt-1.5 leading-relaxed">Pieces you love will appear here.<br/>Start with these favourites:</p>

                  {/* Suggestions */}
                  <div className="mt-6 w-full space-y-2.5">
                    {SUGGESTIONS.map((p) => (
                      <div key={p.id} className="flex items-center gap-3 bg-white/70 border border-linen rounded-xl p-2.5 text-left">
                        <img src={p.img} alt={p.title} className="w-12 h-14 object-cover rounded-lg" />
                        <div className="flex-1 min-w-0">
                          <p className="font-serif text-[13px] font-medium truncate">{p.title}</p>
                          <p className="text-[11px] text-stone-400">{p.brand}</p>
                        </div>
                        <p className="text-sm font-bold text-moss">${p.price}</p>
                        <button onClick={() => quickAdd(p)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                            justAdded === p.id ? 'bg-moss text-ivory' : 'border border-linen hover:border-moss hover:text-moss'
                          }`}>
                          {justAdded === p.id ? <Check size={13} /> : <Plus size={14} />}
                        </button>
                      </div>
                    ))}
                  </div>

                  <button onClick={() => { setCartOpen(false); navigate('/shop'); }}
                    className="mt-6 text-[10px] font-bold uppercase tracking-[0.25em] border-b border-neutral-800 pb-0.5 hover:text-moss hover:border-moss transition-colors">
                    Browse the Shop
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  <AnimatePresence initial={false}>
                    {cart.map((item) => (
                      <motion.div
                        layout
                        key={item.id}
                        initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 40, height: 0, marginBottom: 0, overflow: 'hidden' }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="flex gap-4"
                      >
                        <img src={item.img} alt={item.title || item.name} className="w-20 h-24 object-cover rounded-lg flex-shrink-0 bg-linen" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif font-medium text-sm truncate">{item.title || item.name}</h4>
                          <p className="text-xs text-stone-400 mt-0.5">{item.brand}</p>
                          {(item.selectedColor || item.selectedSize) && (
                            <p className="text-[10px] text-stone-400 mt-0.5 uppercase tracking-wide">
                              {item.selectedColor}{item.selectedSize && ` · Size ${item.selectedSize}`}
                            </p>
                          )}
                          <p className="text-sm font-bold text-moss mt-1">${(item.price * item.qty).toFixed(2)}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center rounded border border-linen overflow-hidden">
                              <button onClick={() => updateQty(item.id, item.qty - 1)} aria-label="Decrease"
                                className="w-6 h-6 flex items-center justify-center text-xs hover:bg-linen transition-colors"><Minus size={11} /></button>
                              <span className="w-7 text-center text-xs font-medium tabular-nums">{item.qty}</span>
                              <button onClick={() => updateQty(item.id, item.qty + 1)} aria-label="Increase"
                                className="w-6 h-6 flex items-center justify-center text-xs hover:bg-linen transition-colors"><Plus size={11} /></button>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} aria-label="Remove"
                              className="ml-auto text-stone-300 hover:text-terra transition-colors"><Trash2 size={14} /></button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-linen space-y-3 bg-white/50">
                <div className="flex justify-between text-sm text-stone-500"><span>Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm text-stone-500">
                  <span>Shipping</span>
                  <span className={totalPrice >= FREE_SHIP_AT ? 'text-moss font-semibold' : ''}>
                    {totalPrice >= FREE_SHIP_AT ? 'FREE' : '$9.99'}
                  </span>
                </div>
                <div className="h-px bg-linen" />
                <div className="flex justify-between font-serif text-lg">
                  <span>Total</span>
                  <span className="text-moss">${finalTotal.toFixed(2)}</span>
                </div>

                <motion.button whileTap={{ scale: 0.97 }}
                  onClick={() => { setCartOpen(false); navigate('/checkout'); }}
                  className="w-full py-3.5 bg-moss text-ivory rounded-lg font-medium hover:bg-olive transition-colors flex items-center justify-center gap-2 text-sm">
                  Proceed to Checkout <ArrowRight size={15} />
                </motion.button>

                <div className="flex justify-center gap-5 pt-1.5">
                  {[
                    { icon: ShieldCheck, t: 'Secure' },
                    { icon: RefreshCcw,  t: '7-Day Returns' },
                    { icon: Truck,       t: 'Fast Delivery' },
                  ].map(({ icon: Icon, t }) => (
                    <span key={t} className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-stone-400">
                      <Icon size={12} className="text-moss/70" /> {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}