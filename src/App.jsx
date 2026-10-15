import React from 'react';
import { StoreProvider } from './context/StoreContext';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import CategoryBar from './components/CategoryBar';
import FilterSortBar from './components/FilterSortBar';
import ProductList from './components/ProductList';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import FavoritesDrawer from './components/FavoritesDrawer';
import CheckoutModal from './components/CheckoutModal';
import Toast from './components/Toast';
import Footer from './components/Footer';
import './App.css';

function MainStoreContent() {
  return (
    <div className="app-container">
      {/* Toast Notification Container */}
      <Toast />

      {/* Top Navigation */}
      <Navbar />

      {/* Main Container */}
      <main className="main-content">
        {/* Promotional Hero Section */}
        <HeroBanner />

        {/* Catalog Section */}
        <section className="catalog-section" id="catalog">
          <div className="section-header">
            <div>
              <h2 className="section-title">Каталог гаджетов</h2>
              <p className="section-subtitle">
                Выберите категорию и найдите устройство вашей мечты
              </p>
            </div>
          </div>

          {/* Categories Carousel/Bar */}
          <CategoryBar />

          {/* Filter and Sorting Options */}
          <FilterSortBar />

          {/* Product Grid */}
          <ProductList />
        </section>
      </main>

      {/* Modals & Drawers */}
      <ProductModal />
      <CartDrawer />
      <FavoritesDrawer />
      <CheckoutModal />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <MainStoreContent />
    </StoreProvider>
  );
}
