import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Sun, 
  Moon, 
  Zap, 
  X 
} from 'lucide-react';

export default function Navbar() {
  const {
    theme,
    toggleTheme,
    cartCount,
    favorites,
    currency,
    setCurrency,
    searchQuery,
    setSearchQuery,
    setIsCartOpen,
    setIsFavoritesOpen
  } = useStore();

  return (
    <header className="navbar-container">
      <div className="navbar-wrapper">
        {/* Brand Logo */}
        <div className="navbar-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="brand-icon-wrapper">
            <Zap className="brand-icon" size={24} />
          </div>
          <div className="brand-text">
            <span className="brand-name">Electro<span className="brand-accent">Nova</span></span>
            <span className="brand-tagline">Online Store</span>
          </div>
        </div>

        {/* Live Search */}
        <div className="navbar-search">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Поиск смартфонов, ноутбуков, наушников..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="search-clear-btn"
              title="Очистить поиск"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Controls & Badges */}
        <div className="navbar-actions">
          {/* Currency Selector */}
          <div className="currency-selector">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="currency-select"
              title="Выбрать валюту"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="UAH">UAH (₴)</option>
            </select>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="action-btn theme-btn"
            title={theme === 'dark' ? 'Включить светлую тему' : 'Включить темную тему'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => setIsFavoritesOpen(true)}
            className="action-btn fav-btn"
            title="Избранные товары"
          >
            <Heart size={20} className={favorites.length > 0 ? 'icon-loved' : ''} />
            {favorites.length > 0 && (
              <span className="badge-count fav-badge">{favorites.length}</span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="action-btn cart-btn"
            title="Корзина покупок"
          >
            <ShoppingBag size={20} />
            <span className="cart-btn-label">Корзина</span>
            {cartCount > 0 && (
              <span className="badge-count cart-badge">{cartCount}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

