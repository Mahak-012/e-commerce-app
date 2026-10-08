import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Package, Heart, MapPin, LogOut, Mail, Lock, Eye, EyeOff,
  Check, Plus, Trash2, ShoppingBag, Truck, Clock, CheckCircle2,
  Pencil, X, ChevronRight, ShieldCheck, Sparkles, Save,
} from 'lucide-react';
import { WISH_KEY, CART_KEY, readStore, writeStore, addToCart } from '../lib/store';

const EASE = [0.22, 1, 0.36, 1];

/* ── Extra "database" keys (store.js ke pattern par) ── */
const USER_KEY  = 'mahak_user';
const ORDERS_KEY = 'mahak_orders';
const ADDR_KEY   = 'mahak_addresses';

const load = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
};

/* ── Order status timeline steps ── */
const STATUS_STEPS = ['Pending', 'Confirmed', 'Shipped', 'Delivered'];
const statusIndex = (s) => STATUS_STEPS.indexOf(s);

/* ═══════════ LOGIN / REGISTER SCREEN ═══════════ */
function AuthScreen({ onAuth }) {
  const [mode, setMode] = useState('login'); // login | register
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const user = {
        name: mode === 'register' ? form.name : form.email.split('@')[0].replace(/^./, (c) => c.toUpperCase()),
        email: form.email,
        joined: new Date().toISOString(),
      };
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      onAuth(user);
    }, 900);
  };

  const inputCls = 'w-full pl-11 pr-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-neutral-900 focus:bg-white transition-all';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: EASE }}
      className="max-w-md mx-auto px-5 py-16"
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-neutral-900 flex items-center justify-center mx-auto mb-5">
          <Sparkles className="w-7 h-7 text-amber-300" />
        </div>
        <h1 className="text-3xl font-serif font-medium text-neutral-900 tracking-tight">
          {mode === 'login' ? 'Welcome Back' : 'Join the Family'}
        </h1>
        <p className="text-xs text-neutral-400 mt-2 tracking-wide">
          {mode === 'login'
            ? 'Sign in to track orders, save favourites & more.'
            : 'Create an account for a faster, personal experience.'}
        </p>
      </div>

      <form onSubmit={submit} className="bg-white border border-neutral-100 rounded-2xl shadow-xl shadow-neutral-100/60 p-7 space-y-4">
        {mode === 'register' && (
          <div className="relative">
            <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input required placeholder="Full name" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
          </div>
        )}
        <div className="relative">
          <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input required type="email" placeholder="Email address" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
        </div>
        <div className="relative">
          <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input required type={showPass ? 'text' : 'password'} placeholder="Password" minLength={4} value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className={inputCls + ' pr-11'} />
          <button type="button" onClick={() => setShowPass((s) => !s)} aria-label="Toggle password"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 transition-colors">
            {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>

        <motion.button whileTap={{ scale: 0.98 }} disabled={loading}
          className="w-full bg-neutral-900 text-white text-xs font-bold uppercase tracking-[0.2em] py-4 rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
          {loading
            ? <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> {mode === 'login' ? 'Signing in...' : 'Creating account...'}</>
            : mode === 'login' ? 'Sign In' : 'Create Account'}
        </motion.button>

        <p className="text-center text-xs text-neutral-400 pt-1">
          {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button type="button" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="text-neutral-900 font-semibold underline underline-offset-2 hover:text-amber-600 transition-colors">
            {mode === 'login' ? 'Register' : 'Sign in'}
          </button>
        </p>

        <div className="flex items-center gap-2 justify-center pt-2 text-[10px] text-neutral-300 uppercase tracking-widest">
          <ShieldCheck size={12} /> Your data stays on this device
        </div>
      </form>
    </motion.div>
  );
}

/* ═══════════ ORDER CARD ═══════════ */
function OrderCard({ order }) {
  const sIdx = statusIndex(order.status);
  return (
    <motion.div layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }}
      className="bg-white border border-neutral-100 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-neutral-100">
        <div>
          <p className="text-xs font-bold text-neutral-900 tracking-wide">Order #{order.id}</p>
          <p className="text-[11px] text-neutral-400 mt-0.5">
            {new Date(order.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} · {order.items?.length || 0} item(s)
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${
            order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' :
            order.status === 'Shipped'   ? 'bg-sky-50 text-sky-600' :
            order.status === 'Cancelled' ? 'bg-red-50 text-red-500' :
                                            'bg-amber-50 text-amber-600'}`}>
            {order.status}
          </span>
          <span className="font-serif font-bold text-neutral-900">${Number(order.total || 0).toFixed(2)}</span>
        </div>
      </div>

      {/* Progress steps */}
      {order.status !== 'Cancelled' && (
        <div className="flex items-center mt-5 mb-2">
          {STATUS_STEPS.map((step, i) => (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center gap-1.5">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                  i <= sIdx ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-300'}`}>
                  {i < sIdx ? <Check size={12} /> : i + 1}
                </span>
                <span className={`text-[9px] uppercase tracking-wider font-semibold ${i <= sIdx ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  {step}
                </span>
              </div>
              {i < STATUS_STEPS.length - 1 && (
                <span className={`flex-1 h-px mx-1.5 mb-4 ${i < sIdx ? 'bg-neutral-900' : 'bg-neutral-100'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Items preview */}
      <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
        {(order.items || []).map((it, i) => (
          <div key={i} className="flex items-center gap-2.5 bg-neutral-50 rounded-xl p-2 pr-4 shrink-0 border border-neutral-100">
            <img src={it.img} alt="" className="w-11 h-13 h-12 object-cover rounded-lg" />
            <div>
              <p className="text-[11px] font-medium text-neutral-800 max-w-[130px] truncate">{it.title || it.name}</p>
              <p className="text-[10px] text-neutral-400">× {it.qty}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ═══════════ MAIN ═══════════ */
export default function Account() {
  const navigate = useNavigate();
  const [user, setUser]       = useState(() => load(USER_KEY, null));
  const [tab, setTab]         = useState('orders');
  const [orders, setOrders]   = useState(() => load(ORDERS_KEY, []));
  const [wish, setWish]       = useState(() => readStore(WISH_KEY));
  const [addresses, setAddresses] = useState(() => load(ADDR_KEY, []));

  /* Profile form */
  const [profile, setProfile] = useState({ name: '', email: '', phone: '' });
  const [savedFlash, setSavedFlash] = useState(false);

  /* Address form */
  const [addrForm, setAddrForm] = useState({ label: '', line: '', city: '' });
  const [showAddrForm, setShowAddrForm] = useState(false);

  useEffect(() => {
    if (user) setProfile({ name: user.name || '', email: user.email || '', phone: user.phone || '' });
  }, [user]);

  /* Live sync with store events (wishlist/cart) */
  useEffect(() => {
    const sync = () => setWish(readStore(WISH_KEY));
    window.addEventListener('store-updated', sync);
    window.addEventListener('storage', sync);
    return () => { window.removeEventListener('store-updated', sync); window.removeEventListener('storage', sync); };
  }, []);

  const saveProfile = (e) => {
    e.preventDefault();
    const next = { ...user, ...profile };
    localStorage.setItem(USER_KEY, JSON.stringify(next));
    setUser(next);
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 2200);
  };

  const logout = () => {
    localStorage.removeItem(USER_KEY);
    setUser(null);
  };

  const removeWish = (id) => {
    const next = wish.filter((i) => i.id !== id);
    writeStore(WISH_KEY, next);
    setWish(next);
  };

  const wishToCart = (p) => {
    addToCart(p, 1);
    removeWish(p.id);
  };

  const addAddress = (e) => {
    e.preventDefault();
    if (!addrForm.line.trim()) return;
    const next = [...addresses, { ...addrForm, id: Date.now() }];
    writeStore(ADDR_KEY, next);
    setAddresses(next);
    setAddrForm({ label: '', line: '', city: '' });
    setShowAddrForm(false);
  };

  const removeAddress = (id) => {
    const next = addresses.filter((a) => a.id !== id);
    writeStore(ADDR_KEY, next);
    setAddresses(next);
  };

  const inputCls = 'w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-neutral-900 focus:bg-white transition-all';

  const TABS = [
    { id: 'orders',    icon: Package, label: 'Orders',    count: orders.length },
    { id: 'wishlist',  icon: Heart,   label: 'Wishlist',  count: wish.length },
    { id: 'addresses', icon: MapPin,  label: 'Addresses', count: addresses.length },
    { id: 'profile',   icon: User,    label: 'Profile' },
  ];

  /* ── Not logged in → Auth screen ── */
  if (!user) {
    return (
      <motion.main initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
        className="bg-white min-h-screen">
        <AuthScreen onAuth={setUser} />
      </motion.main>
    );
  }

  const initials = (user.name || 'U').split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();

  return (
    <motion.main initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="bg-white min-h-screen">

      <style>{`
        .acc-ghost { font-family: 'Playfair Display', serif; font-style: italic; font-weight: 700;
          -webkit-text-stroke: 1px rgba(0,0,0,0.05); color: transparent;
          user-select: none; pointer-events: none; line-height: 1; white-space: nowrap; }
        .acc-scroll::-webkit-scrollbar { width: 5px; }
        .acc-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 10px; }
      `}</style>

      {/* ── Header ── */}
      <div className="bg-neutral-50 py-10 border-b border-neutral-100 relative overflow-hidden">
        <span className="acc-ghost absolute top-1 left-1/2 -translate-x-1/2 text-[4rem] sm:text-[5.5rem] opacity-60">Dashboard</span>
        <div className="max-w-[1000px] mx-auto px-5 sm:px-8 text-center relative">
          <div className="w-16 h-16 rounded-2xl bg-neutral-900 text-white flex items-center justify-center mx-auto mb-3 font-serif font-bold text-xl shadow-lg">
            {initials}
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-medium tracking-tight text-neutral-900">
            {user.name}
          </h1>
          <p className="text-xs text-neutral-400 mt-1">{user.email}</p>
          <p className="text-[10px] text-neutral-300 mt-0.5 uppercase tracking-widest">
            Member since {new Date(user.joined || Date.now()).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
          </p>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-5 sm:px-8 py-10">
        <div className="grid md:grid-cols-12 gap-8">

          {/* ── Sidebar ── */}
          <div className="md:col-span-4">
            <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-100 md:sticky md:top-28">
              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                {[
                  { n: orders.length, l: 'Orders' },
                  { n: wish.length,   l: 'Saved' },
                  { n: addresses.length, l: 'Address' },
                ].map((s) => (
                  <div key={s.l} className="bg-white rounded-xl border border-neutral-100 py-3 text-center">
                    <p className="font-serif font-bold text-lg text-neutral-900 leading-none">{s.n}</p>
                    <p className="text-[9px] uppercase tracking-widest text-neutral-400 mt-1">{s.l}</p>
                  </div>
                ))}
              </div>

              <nav className="space-y-1">
                {TABS.map((item) => (
                  <button key={item.id} onClick={() => setTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-all duration-300 ${
                      tab === item.id
                        ? 'bg-neutral-900 text-white shadow-md'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-white'
                    }`}>
                    <item.icon size={16} />
                    {item.label}
                    {item.count > 0 && (
                      <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        tab === item.id ? 'bg-white/15 text-white' : 'bg-neutral-200/70 text-neutral-500'
                      }`}>{item.count}</span>
                    )}
                    {tab === item.id && <ChevronRight size={14} className="ml-auto opacity-60" />}
                  </button>
                ))}
                <button onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500/80 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors mt-2">
                  <LogOut size={16} /> Logout
                </button>
              </nav>
            </div>
          </div>

          {/* ── Content ── */}
          <div className="md:col-span-8">
            <AnimatePresence mode="wait">

              {/* ═══ ORDERS ═══ */}
              {tab === 'orders' && (
                <motion.div key="orders" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35, ease: EASE }}>
                  <h2 className="font-serif text-lg font-medium mb-5 flex items-center gap-2">
                    Recent Orders
                    {orders.length > 0 && <span className="text-xs text-neutral-400 font-sans font-normal">({orders.length})</span>}
                  </h2>

                  {orders.length === 0 ? (
                    <div className="bg-neutral-50 rounded-2xl p-10 border border-neutral-100 text-center">
                      <Package size={36} className="mx-auto text-neutral-200 mb-3" strokeWidth={1.25} />
                      <p className="font-serif text-neutral-700">No orders yet</p>
                      <p className="text-xs text-neutral-400 mt-1 mb-5">When you place an order, it will show up here with live tracking.</p>
                      <button onClick={() => navigate('/shop')}
                        className="inline-flex items-center gap-2 bg-neutral-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] px-6 py-3 rounded-full hover:bg-black transition-colors">
                        <ShoppingBag size={13} /> Start Shopping
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4 acc-scroll">
                      {orders.slice().reverse().map((o) => <OrderCard key={o.id} order={o} />)}
                    </div>
                  )}
                </motion.div>
              )}

              {/* ═══ WISHLIST ═══ */}
              {tab === 'wishlist' && (
                <motion.div key="wishlist" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35, ease: EASE }}>
                  <h2 className="font-serif text-lg font-medium mb-5">My Wishlist <span className="text-xs text-neutral-400 font-sans font-normal">({wish.length})</span></h2>

                  {wish.length === 0 ? (
                    <div className="bg-neutral-50 rounded-2xl p-10 border border-neutral-100 text-center">
                      <Heart size={36} className="mx-auto text-neutral-200 mb-3" strokeWidth={1.25} />
                      <p className="font-serif text-neutral-700">Nothing saved yet</p>
                      <p className="text-xs text-neutral-400 mt-1 mb-5">Tap the ♥ on any product to save it for later.</p>
                      <button onClick={() => navigate('/products')}
                        className="inline-flex items-center gap-2 bg-neutral-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] px-6 py-3 rounded-full hover:bg-black transition-colors">
                        Discover Pieces
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      {wish.map((p) => (
                        <motion.div layout key={p.id}
                          initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                          className="group bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                          <div className="relative aspect-[4/5] bg-neutral-50 overflow-hidden">
                            <img src={p.img} alt={p.title || p.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                            <button onClick={() => removeWish(p.id)} aria-label="Remove"
                              className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-neutral-500 hover:text-red-500 hover:scale-110 transition-all shadow-sm">
                              <X size={14} />
                            </button>
                          </div>
                          <div className="p-3.5">
                            <p className="text-[12px] font-medium text-neutral-800 line-clamp-1">{p.title || p.name}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-sm font-bold text-neutral-900">${Number(p.price).toFixed(2)}</span>
                              <button onClick={() => wishToCart(p)}
                                className="text-[9px] font-bold uppercase tracking-widest bg-neutral-900 text-white px-3.5 py-2 rounded-full hover:bg-black transition-colors flex items-center gap-1">
                                <ShoppingBag size={11} /> Add
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* ═══ ADDRESSES ═══ */}
              {tab === 'addresses' && (
                <motion.div key="addresses" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35, ease: EASE }}>
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="font-serif text-lg font-medium">Address Book <span className="text-xs text-neutral-400 font-sans font-normal">({addresses.length})</span></h2>
                    <button onClick={() => setShowAddrForm((s) => !s)}
                      className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest border border-neutral-900 px-4 py-2.5 rounded-full hover:bg-neutral-900 hover:text-white transition-all">
                      {showAddrForm ? <X size={12} /> : <Plus size={12} />} {showAddrForm ? 'Cancel' : 'Add New'}
                    </button>
                  </div>

                  <AnimatePresence>
                    {showAddrForm && (
                      <motion.form initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        onSubmit={addAddress} className="overflow-hidden">
                        <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-5 mb-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <input placeholder="Label (Home, Office...)" value={addrForm.label} onChange={(e) => setAddrForm({ ...addrForm, label: e.target.value })} className={inputCls} />
                          <input required placeholder="Street address" value={addrForm.line} onChange={(e) => setAddrForm({ ...addrForm, line: e.target.value })} className={inputCls} />
                          <input placeholder="City" value={addrForm.city} onChange={(e) => setAddrForm({ ...addrForm, city: e.target.value })} className={inputCls} />
                          <button className="sm:col-span-3 bg-neutral-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] py-3.5 rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-2">
                            <MapPin size={13} /> Save Address
                          </button>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>

                  {addresses.length === 0 && !showAddrForm ? (
                    <div className="bg-neutral-50 rounded-2xl p-10 border border-neutral-100 text-center">
                      <MapPin size={36} className="mx-auto text-neutral-200 mb-3" strokeWidth={1.25} />
                      <p className="font-serif text-neutral-700">No addresses saved</p>
                      <p className="text-xs text-neutral-400 mt-1">Save an address for faster checkout.</p>
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 gap-4">
                      <AnimatePresence>
                        {addresses.map((a) => (
                          <motion.div layout key={a.id}
                            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }}
                            className="relative bg-white border border-neutral-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                            <span className="absolute top-4 right-4 flex gap-1">
                              <button onClick={() => removeAddress(a.id)} aria-label="Delete"
                                className="w-7 h-7 rounded-full hover:bg-red-50 text-neutral-300 hover:text-red-500 flex items-center justify-center transition-colors">
                                <Trash2 size={13} />
                              </button>
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest bg-neutral-900 text-white px-2.5 py-1 rounded-full">
                              <MapPin size={9} /> {a.label || 'Address'}
                            </span>
                            <p className="text-sm text-neutral-700 mt-3 leading-relaxed pr-8">{a.line}</p>
                            {a.city && <p className="text-xs text-neutral-400 mt-1">{a.city}</p>}
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </motion.div>
              )}

              {/* ═══ PROFILE ═══ */}
              {tab === 'profile' && (
                <motion.div key="profile" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35, ease: EASE }}>
                  <h2 className="font-serif text-lg font-medium mb-5">Profile Information</h2>

                  <form onSubmit={saveProfile} className="bg-white border border-neutral-100 rounded-2xl p-6 sm:p-7 shadow-sm space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-2">Full Name</label>
                        <input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className={inputCls} />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-2">Phone</label>
                        <input value={profile.phone} placeholder="+92 300 0000000" onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className={inputCls} />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-2">Email</label>
                        <input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className={inputCls} />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <motion.button whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 px-7 py-3 bg-neutral-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-black transition-colors">
                        <Save size={13} /> Save Changes
                      </motion.button>
                      <AnimatePresence>
                        {savedFlash && (
                          <motion.span initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                            className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                            <CheckCircle2 size={14} /> Profile updated!
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </form>

                  {/* Account meta */}
                  <div className="mt-5 bg-neutral-50 border border-neutral-100 rounded-2xl p-5 flex items-center gap-4">
                    <ShieldCheck className="text-emerald-600 shrink-0" size={20} />
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      Your details are stored <strong className="text-neutral-700">privately on this device</strong> — no servers, no tracking. Checkout uses them to auto-fill your shipping info.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.main>
  );
}