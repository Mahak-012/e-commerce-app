import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, Minus, Plus, Trash2 } from 'lucide-react';

export default function Cart() {
  const cartItems = [
    { id: 1, title: "Classic Leather Crossbody Bag", price: 29, qty: 1, size: "M", color: "Brown", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=200&auto=format&fit=crop" },
    { id: 2, title: "Urban Runner Mesh Sneakers", price: 35, qty: 2, size: "9", color: "White", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=200&auto=format&fit=crop" },
  ];

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= 99 ? 0 : 9.99;
  const total = subtotal + shipping;

  return (
    <motion.main initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="bg-white min-h-screen">
      <div className="bg-neutral-50 py-10 border-b border-neutral-100">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-medium tracking-tight text-neutral-900">Shopping Cart</h1>
          <p className="mt-2 text-neutral-400 text-sm">{cartItems.length} items in your bag</p>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 py-10">
        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag size={48} className="mx-auto text-neutral-300 mb-4" />
            <h2 className="font-serif text-2xl text-neutral-400">Your cart is empty</h2>
            <Link to="/shop" className="inline-flex items-center gap-2 mt-6 px-7 py-3 bg-neutral-900 text-white rounded-full text-sm font-medium hover:bg-black transition-colors">Continue Shopping <ArrowRight size={15} /></Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-8 space-y-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-5 p-5 bg-neutral-50 rounded-xl border border-neutral-100">
                  <img src={item.img} alt={item.title} className="w-24 h-28 object-cover rounded-lg flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif font-medium text-neutral-900">{item.title}</h3>
                    <p className="text-xs text-neutral-400 mt-1">Size: {item.size} · Color: {item.color}</p>
                    <p className="text-lg font-bold text-neutral-900 mt-2">${item.price}.00</p>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-neutral-200 rounded-lg bg-white">
                        <button className="px-3 py-1.5 text-neutral-500 hover:text-neutral-900"><Minus size={14} /></button>
                        <span className="w-8 text-center text-sm font-medium">{item.qty}</span>
                        <button className="px-3 py-1.5 text-neutral-500 hover:text-neutral-900"><Plus size={14} /></button>
                      </div>
                      <button className="text-neutral-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </div>
                  <p className="font-bold text-neutral-900 text-lg whitespace-nowrap">${(item.price * item.qty).toFixed(2)}</p>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-4">
              <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-100 sticky top-28">
                <h3 className="font-serif text-lg font-medium mb-5">Order Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-neutral-500"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between text-neutral-500"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
                  {shipping > 0 && <p className="text-[11px] text-neutral-400">Free shipping on orders over $99</p>}
                  <div className="h-px bg-neutral-200" />
                  <div className="flex justify-between font-serif text-xl font-medium"><span>Total</span><span>${total.toFixed(2)}</span></div>
                </div>
                <Link to="/checkout" className="block w-full mt-6 py-3.5 bg-neutral-900 text-white text-center rounded-lg font-medium text-sm hover:bg-black transition-colors">Proceed to Checkout</Link>
                <Link to="/shop" className="block text-center mt-3 text-xs text-neutral-500 hover:text-neutral-900 transition-colors">Continue Shopping</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.main>
  );
}