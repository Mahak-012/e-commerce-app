import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="w-full bg-[#111111] text-neutral-400 select-none font-sans mt-auto">

      {/* ─── NEWSLETTER ─── */}
      <div className="w-full bg-[#1a1a1a] py-14 border-b border-neutral-800/50">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-light font-serif tracking-widest text-white uppercase">
              Join the Mahak Family
            </h2>
            <p className="text-xs text-neutral-400 font-light tracking-wide">
              Be the first to know about new arrivals, seasonal sales & behind-the-scenes stories from our atelier.
            </p>
          </div>

          {subscribed ? (
            <div className="flex items-center gap-2 text-amber-400 text-sm font-medium">
              <span>✓</span> Welcome aboard! Check your inbox soon.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="w-full max-w-md flex items-center bg-white p-1 rounded-sm shadow-md">
              <input
                type="email"
                placeholder="Your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent px-4 py-2.5 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none"
                required
              />
              <button type="submit" className="bg-neutral-900 text-white hover:bg-neutral-800 text-[10px] font-bold tracking-widest uppercase px-6 py-3 rounded-sm transition-all shrink-0 flex items-center gap-1">
                Subscribe <ArrowRight className="w-3 h-3" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* ─── MAIN FOOTER ─── */}
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1: Brand Story */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-serif tracking-[0.2em] uppercase font-bold">
              MAHAK COUTURE
            </h3>
            <p className="text-[12px] leading-relaxed font-light text-neutral-400/90 pr-2">
              Born from a love for craftsmanship and conscious fashion, Mahak Couture brings together handcrafted jewelry, curated accessories, and timeless apparel. Every piece tells a story of artisan skill and sustainable practice.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {/* Facebook */}
              <a href="#" className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6c0-.88.39-1 1-1h2V2h-3c-2.9 0-4 1.6-4 3.7V8z" /></svg>
              </a>
              {/* Instagram */}
              <a href="#" className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" /></svg>
              </a>
              {/* Twitter / X */}
              <a href="#" className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors" aria-label="Twitter">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              {/* Pinterest */}
              <a href="#" className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors" aria-label="Pinterest">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" /></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white text-xs font-bold tracking-[0.2em] uppercase">Quick Links</h4>
            <ul className="space-y-2.5 text-[12px] font-light">
              {[
                { name: "New Arrivals", path: "/products" },
                { name: "Best Sellers", path: "/shop" },
                { name: "Deal of the Week", path: "/top-deals" },
                { name: "All Collections", path: "/categories" },
                { name: "Gift Cards", path: "/shop" },
                { name: "Size & Fit Guide", path: "/shop" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="hover:text-white hover:underline transition-all block">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="space-y-4">
            <h4 className="text-white text-xs font-bold tracking-[0.2em] uppercase">Customer Care</h4>
            <ul className="space-y-2.5 text-[12px] font-light">
              {[
                { name: "Track Your Order", path: "/account" },
                { name: "Shipping & Delivery", path: "/shop" },
                { name: "Returns & Exchanges", path: "/shop" },
                { name: "Care Instructions", path: "/shop" },
                { name: "FAQs", path: "/shop" },
                { name: "Contact Us", path: "/account" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="hover:text-white hover:underline transition-all block">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Studio */}
          <div className="space-y-4">
            <h4 className="text-white text-xs font-bold tracking-[0.2em] uppercase">Our Studio</h4>
            <ul className="space-y-3.5 text-[12px] font-light">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span>Mahak Couture , Lahore, Pakistan</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-white shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-white shrink-0" />
                <a href="mailto:hello@mahakcouture.com" className="hover:text-white transition-colors">hello@mahakcouture.com</a>
              </li>
            </ul>

            {/* Trust badges */}
            <div className="pt-3 flex flex-wrap gap-2">
              <span className="text-[9px] bg-neutral-900 border border-neutral-800 text-neutral-500 px-2.5 py-1 rounded-sm tracking-wider font-medium flex items-center gap-1">
                🌿 Eco Packaging
              </span>
              <span className="text-[9px] bg-neutral-900 border border-neutral-800 text-neutral-500 px-2.5 py-1 rounded-sm tracking-wider font-medium flex items-center gap-1">
                ♻️ Recycled Metals
              </span>
              <span className="text-[9px] bg-neutral-900 border border-neutral-800 text-neutral-500 px-2.5 py-1 rounded-sm tracking-wider font-medium flex items-center gap-1">
                🤝 Fair Trade
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* ─── BOTTOM BAR ─── */}
      <div className="w-full bg-[#0a0a0a] py-6 border-t border-neutral-900">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-[11px] font-light text-neutral-500">
          <div>
            © 2026 <span className="text-neutral-400 font-medium">Mahak Couture</span>. Crafted with care in Lahorr, Pakistan.
          </div>
          <div className="flex items-center gap-4">
            <Link to="/shop" className="hover:text-neutral-300 transition-colors">Privacy</Link>
            <Link to="/shop" className="hover:text-neutral-300 transition-colors">Terms</Link>
            <Link to="/shop" className="hover:text-neutral-300 transition-colors">Sitemap</Link>
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {["Visa", "Mastercard", "UPI", "PayPal"].map((card, idx) => (
              <span key={idx} className="bg-neutral-900 border border-neutral-800 text-neutral-500 font-mono text-[9px] font-bold px-2 py-0.5 rounded-sm tracking-wider">{card}</span>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}