import React from 'react';
import { motion } from 'framer-motion';
import { Lock, ShieldCheck } from 'lucide-react';

export default function Checkout() {
  return (
    <motion.main initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="bg-white min-h-screen">
      <div className="bg-neutral-50 py-10 border-b border-neutral-100">
        <div className="max-w-[900px] mx-auto px-5 sm:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-medium tracking-tight text-neutral-900">Checkout</h1>
        </div>
      </div>
      <div className="max-w-[900px] mx-auto px-5 sm:px-8 py-10">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7 space-y-8">
            <div>
              <h2 className="font-serif text-lg font-medium mb-4">Contact Information</h2>
              <input type="email" placeholder="Email address" className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-medium mb-4">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="First name" className="px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
                <input placeholder="Last name" className="px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
              </div>
              <input placeholder="Address" className="w-full mt-4 px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
              <div className="grid grid-cols-3 gap-4 mt-4">
                <input placeholder="City" className="px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
                <input placeholder="State" className="px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
                <input placeholder="ZIP" className="px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
              </div>
            </div>
            <div>
              <h2 className="font-serif text-lg font-medium mb-4">Payment</h2>
              <input placeholder="Card number" className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
              <div className="grid grid-cols-2 gap-4 mt-4">
                <input placeholder="MM / YY" className="px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
                <input placeholder="CVV" className="px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
              </div>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-100 sticky top-28">
              <h3 className="font-serif text-lg font-medium mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-neutral-500"><span>Subtotal (2 items)</span><span>$99.00</span></div>
                <div className="flex justify-between text-neutral-500"><span>Shipping</span><span>Free</span></div>
                <div className="h-px bg-neutral-200" />
                <div className="flex justify-between font-serif text-xl font-medium"><span>Total</span><span>$99.00</span></div>
              </div>
              <button className="w-full mt-6 py-3.5 bg-neutral-900 text-white rounded-lg font-medium text-sm hover:bg-black transition-colors flex items-center justify-center gap-2"><Lock size={14} /> Place Order</button>
              <div className="flex items-center gap-2 mt-4 text-[11px] text-neutral-400 justify-center"><ShieldCheck size={14} className="text-emerald-500" /> Secure 256-bit SSL encryption</div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}