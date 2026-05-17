import React from 'react';
import { motion } from 'framer-motion';
import { User, Package, Heart, MapPin, LogOut } from 'lucide-react';

export default function Account() {
  return (
    <motion.main initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="bg-white min-h-screen">
      <div className="bg-neutral-50 py-10 border-b border-neutral-100">
        <div className="max-w-[900px] mx-auto px-5 sm:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-medium tracking-tight text-neutral-900">My Account</h1>
        </div>
      </div>
      <div className="max-w-[900px] mx-auto px-5 sm:px-8 py-10">
        <div className="grid md:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-4">
            <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-100">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-3"><User size={24} className="text-neutral-500" /></div>
                <h3 className="font-serif font-medium">Guest User</h3>
                <p className="text-xs text-neutral-400 mt-0.5">guest@mahakculture.com</p>
              </div>
              <nav className="space-y-1">
                {[{ icon: Package, label: 'Orders' }, { icon: Heart, label: 'Wishlist' }, { icon: MapPin, label: 'Addresses' }, { icon: LogOut, label: 'Logout' }].map((item, i) => (
                  <button key={i} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-600 hover:text-neutral-900 hover:bg-white rounded-lg transition-colors">
                    <item.icon size={16} /> {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-8 space-y-6">
            <div>
              <h2 className="font-serif text-lg font-medium mb-4">Profile Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="First name" className="px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
                <input placeholder="Last name" className="px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
                <input placeholder="Email" className="col-span-2 px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
                <input placeholder="Phone" className="col-span-2 px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
              </div>
              <button className="mt-4 px-6 py-2.5 bg-neutral-900 text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-black transition-colors">Save Changes</button>
            </div>
            <div>
              <h2 className="font-serif text-lg font-medium mb-4">Recent Orders</h2>
              <div className="bg-neutral-50 rounded-xl p-8 border border-neutral-100 text-center">
                <Package size={32} className="mx-auto text-neutral-300 mb-3" />
                <p className="text-neutral-400 text-sm">No orders yet</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}