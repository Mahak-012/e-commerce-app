import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PopularProducts from './components/PopularProducts';
import ProductDetail from './components/ProductDetail';
import PromoAndBrands from './components/PromoAndBrands';
import DealOfTheWeek from './components/DealOfTheWeek';
import ClientReviews from './components/ClientReviews';
import StoreServices from './components/StoreServices';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import { CartProvider, useCart } from './context/CartContext';

import Shop from './pages/Shop';
import Categories from './pages/Categories';
import Products from './pages/Products';
import TopDeals from './pages/TopDeals';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import Account from './pages/Account';

function AppContent() {
  const location = useLocation();
  const [viewingProduct, setViewingProduct] = useState(null);
  const [slideIn, setSlideIn] = useState(false);

  const { addToCart } = useCart(); 

  const handleProductSelect = (product) => {
    setViewingProduct(product);
    setTimeout(() => setSlideIn(true), 50);
  };

  const handleBack = () => {
    setSlideIn(false);
    setTimeout(() => {
      setViewingProduct(null);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 400);
  };

  return (
    // YAHAN pt-24 add kiya gaya hai taaki content fixed navbar ke neeche se start ho
    <div className="min-h-screen bg-white text-neutral-900 font-sans overflow-x-hidden pt-24">
      <Navbar />
      <CartDrawer />

      <Routes location={location} key={location.pathname}>

        {/* HOME */}
        <Route path="/" element={
          <div className="relative">
            <div className={`w-full transition-all duration-500 ease-out ${
              viewingProduct ? '-translate-x-full opacity-0 absolute pointer-events-none' : 'translate-x-0 opacity-100'
            }`}>
              <Hero />
              <PopularProducts onProductSelect={handleProductSelect} />
              <PromoAndBrands onProductSelect={handleProductSelect} />
              
              <DealOfTheWeek 
                onProductSelect={handleProductSelect} 
                onAddToCart={addToCart} 
              />
              
              <ClientReviews />
              <StoreServices />
              <Footer />
            </div>

            {viewingProduct && (
              <div className={`w-full bg-white absolute top-0 left-0 transition-transform duration-500 ease-out transform z-30 ${
                slideIn ? 'translate-x-0' : 'translate-x-full'
              }`}>
                <ProductDetail product={viewingProduct} onBack={handleBack} />
                <Footer />
              </div>
            )}
          </div>
        } />

        <Route path="/shop" element={<><Shop /><Footer /></>} />
        <Route path="/categories" element={<><Categories /><Footer /></>} />
        <Route path="/products" element={<><Products /><Footer /></>} />
        <Route path="/top-deals" element={<><TopDeals /><Footer /></>} />
        <Route path="/cart" element={<><Cart /><Footer /></>} />
        <Route path="/wishlist" element={<><Wishlist /><Footer /></>} />
        <Route path="/checkout" element={<><Checkout /><Footer /></>} />
        <Route path="/account" element={<><Account /><Footer /></>} />

      </Routes>
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;