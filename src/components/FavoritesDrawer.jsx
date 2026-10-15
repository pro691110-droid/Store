import React from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export default function FavoritesDrawer() {
  const {
    isFavoritesOpen,
    setIsFavoritesOpen,
    favorites,
    toggleFavorite,
    clearFavorites,
    addToCart,
    formatPrice
  } = useStore();

  if (!isFavoritesOpen) return null;

  const favoriteProducts = PRODUCTS.filter((p) => favorites.includes(p.id));

  return (
    <div className="drawer-backdrop" onClick={() => setIsFavoritesOpen(false)}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="drawer-header">
          <div className="drawer-header-title">
            <Heart size={22} className="accent-icon-red icon-filled" />
            <h3>Избранное ({favoriteProducts.length})</h3>
          </div>
          <div className="drawer-header-actions">
            {favoriteProducts.length > 0 && (
              <button
                onClick={clearFavorites}
                className="btn-clear-cart"
                title="Очистить список избранного"
              >
                Очистить
              </button>
            )}
            <button
              onClick={() => setIsFavoritesOpen(false)}
              className="drawer-close-btn"
              aria-label="Закрыть"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="drawer-body">
          {favoriteProducts.length === 0 ? (
            <div className="empty-cart-view">
              <div className="empty-cart-icon-box">
                <Heart size={48} className="empty-heart-icon" />
              </div>
              <h4>Список желаний пуст</h4>
              <p>Нажимайте на сердечко у товаров, чтобы сохранить их здесь</p>
              <button
                onClick={() => setIsFavoritesOpen(false)}
                className="btn-back-shopping"
              >
                Начать выбирать
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {favoriteProducts.map((product) => (
                <div key={product.id} className="cart-item-card">
                  <img src={product.image} alt={product.name} className="cart-item-img" />
                  
                  <div className="cart-item-details">
                    <h4 className="cart-item-name">{product.name}</h4>
                    <span className="cart-item-unit-price">
                      {formatPrice(product.price)}
                    </span>

                    <div className="fav-item-actions">
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="btn-fav-add-cart"
                      >
                        <ShoppingBag size={16} />
                        <span>В корзину</span>
                      </button>

                      <button
                        onClick={() => toggleFavorite(product)}
                        className="btn-remove-item"
                        title="Удалить из избранного"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

