import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock, ShieldCheck, Truck, Check, CreditCard, Banknote, Smartphone,
  MapPin, Mail, Phone, User, Package, ArrowRight, Loader2, Tag, X,
} from 'lucide-react';
import { CART_KEY, readStore, writeStore } from '../lib/store';

const EASE = [0.22, 1, 0.36, 1];
const FREE_SHIP_AT = 99;
const ORDERS_KEY = 'mahak_orders';

/* ── Saved user prefill ke liye ── */
const loadUser = () => {
  try { return JSON.parse(localStorage.getItem('mahak_user')) || null; } catch { return null; }
};

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  /* ── Real cart + promo (Cart page se aaya) ── */
  const [cart, setCart] = useState(() => readStore(CART_KEY));
  const promo = location.state?.promo || null;

  const user = useMemo(() => loadUser(), []);

  /* ── Form ── */
  const [form, setForm] = useState({
    email: user?.email || '',
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    address: '', city: '', state: '', zip: '',
    phone: user?.phone || '',
  });
  const [payMethod, setPayMethod] = useState('card');
  const [placing, setPlacing] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  const subtotal  = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discount  = promo ? (subtotal * promo.pct) / 100 : 0;
  const afterDisc = subtotal - discount;
  const shipping  = cart.length === 0 ? 0 : afterDisc >= FREE_SHIP_AT ? 0 : 9.99;
  const total     = afterDisc + shipping;
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  /* ── PLACE ORDER — database mein save + cart clear ── */
  const placeOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setPlacing(true);

    setTimeout(() => {
      const orders = JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
      const newOrder = {
        id: Math.floor(1000 + Math.random() * 9000),
        date: new Date().toISOString(),
        status: 'Pending',
        total: total,
        items: cart,
        promo: promo?.code || null,
        customer: { name: `${form.firstName} ${form.lastName}`.trim(), email: form.email, phone: form.phone },
        address: `${form.address}, ${form.city}, ${form.state} ${form.zip}`,
        payment: payMethod,
      };
      localStorage.setItem(ORDERS_KEY, JSON.stringify([...orders, newOrder]));
      writeStore(CART_KEY, []); // cart clear — Navbar badge reset
      setCart([]);
      setPlacedOrder(newOrder);
      setPlacing(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1600);
  };

  const inputCls = 'w-full px-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-neutral-900 focus:bg-white transition-all';
  const labelCls = 'text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-2';

  /* ═══ SUCCESS SCREEN ═══ */
  if (placedOrder) {
    return (
      <motion.main initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="bg-white min-h-screen">
        <div className="max-w-2xl mx-auto px-5 py-16 text-center">
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.1 }}
            className="relative w-24 h-24 mx-auto mb-8">
            <span className="absolute inset-0 rounded-full border-2 border-emerald-200" style={{ animation: 'succRing 1.8s ease-out infinite' }} />
            <span className="absolute inset-0 rounded-full border-2 border-emerald-200" style={{ animation: 'succRing 1.8s ease-out infinite .6s' }} />
            <div className="w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center shadow-xl shadow-emerald-200">
              <Check size={44} className="text-white" strokeWidth={2.5} />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6, ease: EASE }}>
            <p className="text-[10px] tracking-[0.3em] uppercase text-emerald-600 font-bold mb-3">Order Confirmed</p>
            <h1 className="text-3xl md:text-4xl font-serif font-medium text-neutral-900">
              Shukriya, {placedOrder.customer?.name?.split(' ')[0] || 'friend'}! 🎉
            </h1>
            <p className="text-sm text-neutral-400 mt-3 leading-relaxed max-w-md mx-auto">
              Aapka order <strong className="text-neutral-700">#{placedOrder.id}</strong> place ho gaya hai.
              Confirmation email bhej diya gaya hai <span className="text-neutral-700">{placedOrder.customer?.email}</span> par.
            </p>

            {/* Summary card */}
            <div className="mt-8 bg-neutral-50 border border-neutral-100 rounded-2xl p-6 text-left max-w-md mx-auto">
              {[
                ['Order ID', `#${placedOrder.id}`],
                ['Items', `${placedOrder.items.length} product(s)`],
                ['Total Paid', `$${placedOrder.total.toFixed(2)}`],
                ['Payment', placedOrder.payment === 'cod' ? 'Cash on Delivery' : placedOrder.payment === 'card' ? 'Card' : 'Wallet'],
                ['Delivery', '2–4 working days'],
              ].map(([k, v], i, arr) => (
                <div key={k} className={`flex justify-between py-2.5 text-sm ${i < arr.length - 1 ? 'border-b border-neutral-100' : ''}`}>
                  <span className="text-neutral-400">{k}</span>
                  <span className="font-semibold text-neutral-900">{v}</span>
                </div>
              ))}
            </div>

            {/* Timeline hint */}
            <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-neutral-400">
              <Package size={13} className="text-neutral-900" />
              Track your order in <strong className="text-neutral-700 mx-1">My Account → Orders</strong>
            </div>

            <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
              <Link to="/account"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-neutral-900 text-white rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-colors">
                Track Order <ArrowRight size={13} />
              </Link>
              <Link to="/shop"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-neutral-300 text-neutral-700 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:border-neutral-900 hover:text-neutral-900 transition-colors">
                Continue Shopping
              </Link>
            </div>
          </motion.div>

          <style>{`@keyframes succRing { 0% { transform: scale(1); opacity: .8 } 100% { transform: scale(1.7); opacity: 0 } }`}</style>
        </div>
      </motion.main>
    );
  }

  /* ═══ EMPTY CART GUARD ═══ */
  if (cart.length === 0) {
    return (
      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center px-5">
          <Package size={48} className="mx-auto text-neutral-200 mb-4" strokeWidth={1.25} />
          <h1 className="font-serif text-2xl text-neutral-700">Nothing to checkout</h1>
          <p className="text-sm text-neutral-400 mt-2">Your bag is empty — add something beautiful first.</p>
          <Link to="/shop"
            className="inline-flex items-center gap-2 mt-6 px-8 py-3.5 bg-neutral-900 text-white rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-colors">
            Go to Shop <ArrowRight size={13} />
          </Link>
        </div>
      </motion.main>
    );
  }

  /* ═══ CHECKOUT FORM ═══ */
  return (
    <motion.main initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="bg-white min-h-screen">

      <style>{`
        .ck-ghost { font-family: 'Playfair Display', serif; font-style: italic; font-weight: 700;
          -webkit-text-stroke: 1px rgba(0,0,0,0.05); color: transparent;
          user-select: none; pointer-events: none; line-height: 1; white-space: nowrap; }
        .pay-card { transition: all .3s cubic-bezier(.22,1,.36,1); }
      `}</style>

      {/* Header */}
      <div className="bg-neutral-50 py-10 border-b border-neutral-100 relative overflow-hidden">
        <span className="ck-ghost absolute top-4 left-1/2 -translate-x-1/2 text-[4.5rem] opacity-60">Checkout</span>
        <div className="max-w-[1000px] mx-auto px-5 sm:px-8 text-center relative">
          <h1 className="text-3xl md:text-4xl font-serif font-medium tracking-tight text-neutral-900">Checkout</h1>
          <p className="mt-2 text-neutral-400 text-xs flex items-center justify-center gap-2">
            <Lock size={11} /> Encrypted & secure · {totalItems} item{totalItems > 1 ? 's' : ''} · ${total.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-5 sm:px-8 py-10">
        <div className="grid md:grid-cols-12 gap-10">

          {/* ═══ LEFT: Form ═══ */}
          <form onSubmit={placeOrder} className="md:col-span-7 space-y-8">

            {/* Contact */}
            <div>
              <h2 className="font-serif text-lg font-medium mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-neutral-900 text-white text-[11px] font-bold flex items-center justify-center">1</span>
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="relative">
                  <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                  <input required type="email" placeholder="Email address" value={form.email}
                    onChange={(e) => set('email', e.target.value)} className={inputCls + ' pl-11'} />
                </div>
                <div className="relative">
                  <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                  <input required type="tel" placeholder="Phone number" value={form.phone}
                    onChange={(e) => set('phone', e.target.value)} className={inputCls + ' pl-11'} />
                </div>
              </div>
              {!user && (
                <p className="text-[11px] text-neutral-400 mt-3">
                  Have an account? <Link to="/account" className="text-neutral-900 underline underline-offset-2 font-medium">Sign in</Link> for faster checkout.
                </p>
              )}
            </div>

            {/* Shipping */}
            <div>
              <h2 className="font-serif text-lg font-medium mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-neutral-900 text-white text-[11px] font-bold flex items-center justify-center">2</span>
                Shipping Address
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                  <input required placeholder="First name" value={form.firstName} onChange={(e) => set('firstName', e.target.value)} className={inputCls + ' pl-11'} />
                </div>
                <input required placeholder="Last name" value={form.lastName} onChange={(e) => set('lastName', e.target.value)} className={inputCls} />
              </div>
              <div className="relative mt-4">
                <MapPin size={15} className="absolute left-4 top-4 text-neutral-400 pointer-events-none" />
                <input required placeholder="Street address" value={form.address} onChange={(e) => set('address', e.target.value)} className={inputCls + ' pl-11'} />
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <input required placeholder="City" value={form.city} onChange={(e) => set('city', e.target.value)} className={inputCls} />
                <input placeholder="State" value={form.state} onChange={(e) => set('state', e.target.value)} className={inputCls} />
                <input required placeholder="ZIP" value={form.zip} onChange={(e) => set('zip', e.target.value)} className={inputCls} />
              </div>
            </div>

            {/* Payment */}
            <div>
              <h2 className="font-serif text-lg font-medium mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-neutral-900 text-white text-[11px] font-bold flex items-center justify-center">3</span>
                Payment Method
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'card',  icon: CreditCard, label: 'Card',       sub: 'Visa · Master' },
                  { id: 'cod',   icon: Banknote,   label: 'COD',        sub: 'Cash on Delivery' },
                  { id: 'wallet', icon: Smartphone, label: 'Wallet',    sub: 'JazzCash · EasyPaisa' },
                ].map(({ id, icon: Icon, label, sub }) => {
                  const active = payMethod === id;
                  return (
                    <button type="button" key={id} onClick={() => setPayMethod(id)}
                      className={`pay-card relative flex items-center gap-3 p-4 rounded-2xl border text-left ${
                        active ? 'border-neutral-900 bg-neutral-900 text-white shadow-lg' : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-neutral-400'
                      }`}>
                      {active && (
                        <span className="absolute top-2.5 right-2.5 w-4.5 h-4.5 w-[18px] h-[18px] rounded-full bg-white flex items-center justify-center">
                          <Check size={10} className="text-neutral-900" strokeWidth={3} />
                        </span>
                      )}
                      <Icon size={20} strokeWidth={1.5} className={active ? 'text-amber-300' : 'text-neutral-400'} />
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider">{label}</p>
                        <p className={`text-[10px] mt-0.5 ${active ? 'text-white/60' : 'text-neutral-400'}`}>{sub}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Card fields — only when card selected */}
              <AnimatePresence>
                {payMethod === 'card' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden">
                    <div className="pt-4 space-y-4">
                      <input placeholder="Card number  ····  ····  ····  4242" className={inputCls} />
                      <div className="grid grid-cols-2 gap-4">
                        <input placeholder="MM / YY" className={inputCls} />
                        <input placeholder="CVV" type="password" maxLength={4} className={inputCls} />
                      </div>
                    </div>
                  </motion.div>
                )}
                {payMethod === 'cod' && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="text-[11px] text-neutral-400 pt-4 leading-relaxed">
                    Pay in cash when your order arrives. Please keep exact amount ready — our courier carries limited change.
                  </motion.p>
                )}
                {payMethod === 'wallet' && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="text-[11px] text-neutral-400 pt-4 leading-relaxed">
                    You'll receive a payment request on your wallet app after placing the order.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile place-order button (sticky summary ke neeche desktop pe summary mein hai) */}
            <button type="submit" disabled={placing}
              className="md:hidden w-full py-4 bg-neutral-900 text-white rounded-full text-[11px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 disabled:opacity-60">
              {placing ? <><Loader2 size={15} className="animate-spin" /> Processing...</> : <><Lock size={13} /> Place Order — ${total.toFixed(2)}</>}
            </button>
          </form>

          {/* ═══ RIGHT: Summary ═══ */}
          <div className="md:col-span-5">
            <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100 md:sticky md:top-28">

              <h3 className="font-serif text-lg font-medium mb-5 flex items-center gap-2">
                Your Order <span className="flex-1 h-px bg-neutral-200/70" />
                <span className="text-xs text-neutral-400 font-sans font-normal">{totalItems}</span>
              </h3>

              {/* Items mini-list */}
              <div className="space-y-3 max-h-56 overflow-y-auto pr-1 mb-5" style={{ scrollbarWidth: 'thin' }}>
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <img src={item.img} alt="" className="w-12 h-14 object-cover rounded-lg bg-white" />
                      <span className="absolute -top-1.5 -right-1.5 bg-neutral-900 text-white text-[9px] font-bold w-4.5 h-4.5 min-w-[18px] h-[18px] rounded-full flex items-center justify-center">{item.qty}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-medium text-neutral-800 truncate">{item.title || item.name}</p>
                      {(item.selectedSize || item.selectedColor) && (
                        <p className="text-[10px] text-neutral-400">{item.selectedSize || item.size || ''} {item.selectedColor ? `· ${item.selectedColor}` : ''}</p>
                      )}
                    </div>
                    <p className="text-[12px] font-bold text-neutral-900 whitespace-nowrap">${(item.price * item.qty).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              {/* Promo applied notice */}
              <AnimatePresence>
                {promo && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex items-center justify-between bg-emerald-50 border border-emerald-100 rounded-full px-4 py-2.5 mb-4">
                    <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1.5">
                      <Tag size={11} /> {promo.code} — {promo.pct}% off applied
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-neutral-500"><span>Subtotal</span><span className="tabular-nums">${subtotal.toFixed(2)}</span></div>
                {promo && (
                  <div className="flex justify-between text-emerald-600"><span>Discount</span><span className="tabular-nums">−${discount.toFixed(2)}</span></div>
                )}
                <div className="flex justify-between text-neutral-500">
                  <span>Shipping</span>
                  <span className={`tabular-nums ${shipping === 0 ? 'text-emerald-600 font-semibold' : ''}`}>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="h-px bg-neutral-200" />
                <div className="flex justify-between font-serif text-xl font-medium"><span>Total</span><span className="tabular-nums">${total.toFixed(2)}</span></div>
              </div>

              {/* Desktop place order */}
              <motion.button whileTap={{ scale: 0.97 }} type="submit" form="checkout-form" disabled={placing}
                onClick={(e) => { e.preventDefault(); e.currentTarget.closest('div').parentElement.querySelector('form')?.requestSubmit(); }}
                className="hidden md:flex w-full mt-6 py-4 bg-neutral-900 text-white rounded-full text-[11px] font-bold uppercase tracking-[0.2em] items-center justify-center gap-2 disabled:opacity-60 hover:bg-black transition-colors">
                {placing ? <><Loader2 size={15} className="animate-spin" /> Processing your order...</> : <><Lock size={13} /> Place Order — ${total.toFixed(2)}</>}
              </motion.button>

              <div className="flex items-center justify-center gap-2 mt-4 text-[10px] text-neutral-400">
                <ShieldCheck size={13} className="text-emerald-500" /> Secure 256-bit SSL encryption
              </div>
              <div className="flex items-center justify-center gap-2 mt-2 text-[10px] text-neutral-400">
                <Truck size={13} className="text-neutral-700" /> Tracked delivery in 2–4 days
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}