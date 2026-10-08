import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, ArrowRight, ArrowUp, Check, Loader2 } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];

const COLS = [
  {
    title: 'Quick Links',
    links: [
      { name: 'New Arrivals', path: '/products' },
      { name: 'Best Sellers', path: '/shop' },
      { name: 'Deal of the Week', path: '/top-deals' },
      { name: 'All Collections', path: '/categories' },
      { name: 'Gift Cards', path: '/shop' },
      { name: 'Size & Fit Guide', path: '/shop' },
    ],
  },
  {
    title: 'Customer Care',
    links: [
      { name: 'Track Your Order', path: '/account' },
      { name: 'Shipping & Delivery', path: '/shop' },
      { name: 'Returns & Exchanges', path: '/shop' },
      { name: 'Care Instructions', path: '/shop' },
      { name: 'FAQs', path: '/shop' },
      { name: 'Contact Us', path: '/account' },
    ],
  },
];

const SOCIALS = [
  { name: 'Facebook',  svg: <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6c0-.88.39-1 1-1h2V2h-3c-2.9 0-4 1.6-4 3.7V8z" /></svg> },
  { name: 'Instagram', svg: <svg className="w-4 h-4 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" /></svg> },
  { name: 'X',         svg: <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
  { name: 'Pinterest', svg: <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" /></svg> },
];

export default function Footer() {
  const [email, setEmail]   = useState('');
  const [state, setState]   = useState('idle'); // idle | loading | done
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setState('loading');
    setTimeout(() => {
      setState('done');
      setEmail('');
      setTimeout(() => setState('idle'), 3500);
    }, 900);
  };

  return (
    <footer className="w-full bg-[#111111] text-neutral-400 select-none font-sans relative overflow-hidden">

      <style>{`
        .f-ghost { font-family: 'Playfair Display', serif; font-weight: 700; letter-spacing: 0.08em;
          background: linear-gradient(to bottom, rgba(255,255,255,0.07), rgba(255,255,255,0.008));
          -webkit-background-clip: text; background-clip: text; color: transparent;
          user-select: none; pointer-events: none; line-height: 0.85; white-space: nowrap; }
        .f-link { transition: all .3s cubic-bezier(.22,1,.36,1); display: inline-block; }
        .f-link:hover { color: #fff; transform: translateX(5px); }
        .f-soc { transition: all .35s cubic-bezier(.22,1,.36,1); }
        .f-soc:hover { background: #fff; color: #111; transform: translateY(-4px); border-color: #fff; }
      `}</style>

      {/* ═══ NEWSLETTER ═══ */}
      <div className="w-full bg-[#1a1a1a] py-14 border-b border-neutral-800/50 relative">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left relative">
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }}
            className="space-y-1">
            <h2 className="text-xl md:text-2xl font-light font-serif tracking-widest text-white uppercase">
              Join the Mahak Family
            </h2>
            <p className="text-xs text-neutral-400 font-light tracking-wide max-w-md">
              Be the first to know about new arrivals, seasonal sales & behind-the-scenes stories from our atelier.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {state === 'done' ? (
              <motion.div key="done"
                initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-sm font-medium px-6 py-3.5 rounded-sm">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center"><Check size={12} /></span>
                Welcome aboard! Check your inbox soon.
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubscribe}
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="w-full max-w-md flex items-center bg-white p-1 rounded-sm shadow-md focus-within:ring-2 focus-within:ring-amber-400/40 transition-shadow">
                <input
                  type="email" required placeholder="Your email address..."
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent px-4 py-2.5 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none"
                />
                <button type="submit" disabled={state === 'loading'}
                  className="bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-70 text-[10px] font-bold tracking-widest uppercase px-6 py-3 rounded-sm transition-all shrink-0 flex items-center gap-1.5">
                  {state === 'loading'
                    ? <><Loader2 size={12} className="animate-spin" /> Joining...</>
                    : <>Subscribe <ArrowRight size={12} className="group-hover:translate-x-0.5" /></>}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ═══ MAIN GRID ═══ */}
      <div className="max-w-[1200px] mx-auto px-6 py-16 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }}
            className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-sm bg-white/5 border border-neutral-800 flex items-center justify-center font-serif font-bold text-white text-lg">M</span>
              <h3 className="text-white text-lg font-serif tracking-[0.2em] uppercase font-bold">Mahak Couture</h3>
            </div>
            <p className="text-[12px] leading-[1.9] font-light text-neutral-400/90 pr-2">
              Born from a love for craftsmanship and conscious fashion — handcrafted jewelry, curated accessories, and timeless apparel. Every piece tells a story of artisan skill and sustainable practice.
            </p>
            <div className="flex items-center gap-2.5 pt-2">
              {SOCIALS.map((s) => (
                <a key={s.name} href="#" aria-label={s.name}
                  className="f-soc w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400">
                  {s.svg}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {COLS.map((col, ci) => (
            <motion.div key={col.title}
              initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 + ci * 0.08, ease: EASE }}
              className="space-y-4">
              <h4 className="text-white text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-2">
                {col.title}
                <span className="flex-1 h-px bg-neutral-800/80 ml-1" />
              </h4>
              <ul className="space-y-2.5 text-[12px] font-light">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="f-link hover:text-white text-neutral-400">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.26, ease: EASE }}
            className="space-y-4">
            <h4 className="text-white text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-2">
              Our Studio <span className="flex-1 h-px bg-neutral-800/80 ml-1" />
            </h4>
            <ul className="space-y-3.5 text-[12px] font-light">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400/80 shrink-0 mt-0.5" />
                <span>Mahak Couture, Lahore, Pakistan</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-400/80 shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400/80 shrink-0" />
                <a href="mailto:hello@mahakcouture.com" className="hover:text-white transition-colors">hello@mahakcouture.com</a>
              </li>
            </ul>
            <div className="pt-3 flex flex-wrap gap-2">
              {['🌿 Eco Packaging', '♻️ Recycled Metals', '🤝 Fair Trade'].map((b) => (
                <span key={b} className="text-[9px] bg-neutral-900 border border-neutral-800 text-neutral-500 px-2.5 py-1 rounded-sm tracking-wider font-medium">
                  {b}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ═══ GIANT GHOST WORDMARK ═══ */}
      <div className="relative text-center overflow-hidden pointer-events-none" style={{ marginBottom: -6 }}>
        <motion.span
          className="f-ghost inline-block"
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 1.2, ease: EASE }}
          style={{ fontSize: 'clamp(3.5rem, 12.5vw, 10rem)' }}>
          MAHAK
        </motion.span>
      </div>

      {/* ═══ BOTTOM BAR ═══ */}
      <div className="w-full bg-[#0a0a0a] py-6 border-t border-neutral-900 relative z-10">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-[11px] font-light text-neutral-500">
          <div>
            © 2026 <span className="text-neutral-400 font-medium">Mahak Couture</span>. Crafted with care in Lahore, Pakistan.
          </div>
          <div className="flex items-center gap-4">
            <Link to="/shop" className="hover:text-neutral-300 transition-colors">Privacy</Link>
            <Link to="/shop" className="hover:text-neutral-300 transition-colors">Terms</Link>
            <Link to="/shop" className="hover:text-neutral-300 transition-colors">Sitemap</Link>
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {['VISA', 'MASTERCARD', 'UPI', 'PAYPAL'].map((card) => (
              <span key={card} className="bg-neutral-900 border border-neutral-800 text-neutral-500 font-mono text-[8.5px] font-bold px-2.5 py-1 rounded-sm tracking-widest hover:text-neutral-300 hover:border-neutral-700 transition-colors cursor-default">{card}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ BACK TO TOP ═══ */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 16 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-white text-neutral-900 shadow-2xl flex items-center justify-center hover:bg-amber-400 transition-colors">
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}