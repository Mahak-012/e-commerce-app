// ═══ Mini "Database" — localStorage based ═══
// Cart & Wishlist ko save karti hai + sab components ko sync rakhti hai

export const CART_KEY = 'mahak_cart';
export const WISH_KEY = 'mahak_wishlist';

/* ── Read / Write ── */
export const readStore = (key) => {
  try { return JSON.parse(localStorage.getItem(key)) || []; }
  catch { return []; }
};

export const writeStore = (key, val) => {
  localStorage.setItem(key, JSON.stringify(val));
  // Sab components ko batao ke data change hua hai
  window.dispatchEvent(new CustomEvent('store-updated', { detail: { key } }));
};

/* ── Cart helpers ── */
export const addToCart = (product, qty = 1) => {
  const cart = readStore(CART_KEY);
  const existing = cart.find((i) => i.id === product.id);
  if (existing) existing.qty += qty;
  else cart.push({ ...product, qty });
  writeStore(CART_KEY, cart);
};

export const updateQty = (id, delta) => {
  const cart = readStore(CART_KEY);
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  item.qty += delta;
  writeStore(CART_KEY, item.qty <= 0 ? cart.filter((i) => i.id !== id) : cart);
};

export const removeFromCart = (id) => {
  writeStore(CART_KEY, readStore(CART_KEY).filter((i) => i.id !== id));
};

/* ── Wishlist helpers ── */
export const toggleWishlist = (product) => {
  const list = readStore(WISH_KEY);
  const exists = list.find((i) => i.id === product.id);
  writeStore(WISH_KEY, exists ? list.filter((i) => i.id !== product.id) : [...list, product]);
  return !exists; // true = added, false = removed
};

export const clearCart = () => writeStore(CART_KEY, []);