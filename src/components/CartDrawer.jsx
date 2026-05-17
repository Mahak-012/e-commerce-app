import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, ShoppingBag } from 'lucide-react';

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, removeFromCart, updateQty, totalItems, totalPrice } = useCart();

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-ivory shadow-2xl flex flex-col"
        style={{ animation: 'slideInRight 0.3s ease-out' }}
      >
        <div className="flex items-center justify-between p-5 border-b border-linen">
          <h2 className="font-serif text-lg font-medium">Shopping Bag ({totalItems})</h2>
          <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-linen rounded-full"><X size={18} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-stone-400">
              <ShoppingBag size={48} strokeWidth={1} className="mb-4" />
              <p className="font-serif text-lg">Your bag is empty</p>
            </div>
          ) : (
            <div className="space-y-5">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4">
                  <img src={item.img} alt={item.name} className="w-20 h-24 object-cover rounded-lg flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-medium text-sm truncate">{item.title}</h4>
                    <p className="text-xs text-stone-400 mt-0.5">{item.brand}</p>
                    <p className="text-sm font-bold text-moss mt-1">${item.price}.00</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-6 h-6 rounded border border-linen flex items-center justify-center text-xs hover:bg-linen">−</button>
                      <span className="text-xs font-medium w-4 text-center">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-6 h-6 rounded border border-linen flex items-center justify-center text-xs hover:bg-linen">+</button>
                      <button onClick={() => removeFromCart(item.id)} className="ml-auto text-stone-300 hover:text-terra"><Trash2 size={14} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-5 border-t border-linen space-y-3">
            <div className="flex justify-between text-sm text-stone-500"><span>Subtotal</span><span>${totalPrice}.00</span></div>
            <div className="flex justify-between text-sm text-stone-500"><span>Shipping</span><span>{totalPrice >= 99 ? 'Free' : '$9.99'}</span></div>
            <div className="h-px bg-linen" />
            <div className="flex justify-between font-serif text-lg"><span>Total</span><span className="text-moss">${totalPrice >= 99 ? totalPrice : (totalPrice + 9.99).toFixed(2)}</span></div>
            <button className="w-full py-3 bg-moss text-ivory rounded-lg font-medium hover:bg-olive transition-colors">Checkout</button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
      `}</style>
    </div>
  );
}