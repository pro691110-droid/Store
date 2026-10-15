import React from 'react';
import { useStore } from '../context/StoreContext';
import { Star, Heart, Eye, ShoppingCart, Check } from 'lucide-react';

export default function ProductCard({ product }) {
  const {
    formatPrice,
    addToCart,
    cart,
    favorites,
    toggleFavorite,
    setQuickViewProduct
  } = useStore();

  const isFavorite = favorites.includes(product.id);
  const cartItem = cart.find((i) => i.product.id === product.id);
  const isInCart = Boolean(cartItem);

  return (
    <div className="product-card">
      {/* Product Image Container */}
      <div className="product-image-box">
        <img
          src={product.image}
          alt={product.name}
          className="product-img"
          loading="lazy"
        />

        {/* Badges */}
        {product.badge && (
          <span className={`product-badge badge-${product.badge.toLowerCase().replace(/[^a-zа-я0-9]/g, '')}`}>
            {product.badge}
          </span>
        )}

        {/* Action overlay buttons */}
        <div className="product-actions-overlay">
          <button
            onClick={() => toggleFavorite(product)}
            className={`action-circle-btn fav-toggle-btn ${isFavorite ? 'active' : ''}`}
            title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
          >
            <Heart size={18} className={isFavorite ? 'icon-filled' : ''} />
          </button>

          <button
            onClick={() => setQuickViewProduct(product)}
            className="action-circle-btn quickview-btn"
            title="Быстрый просмотр"
          >
            <Eye size={18} />
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="product-info">
        {/* Rating & Stock */}
        <div className="product-meta">
          <div className="product-rating">
            <Star size={15} className="star-icon" fill="currentColor" />
            <span className="rating-val">{product.rating}</span>
            <span className="reviews-val">({product.reviewsCount})</span>
          </div>
          <span className={`stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
            {product.inStock ? 'В наличии' : 'Под заказ'}
          </span>
        </div>

        {/* Title */}
        <h3
          className="product-title"
          onClick={() => setQuickViewProduct(product)}
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Short description */}
        <p className="product-desc-short">{product.description}</p>

        {/* Price & Buy Button */}
        <div className="product-bottom">
          <div className="price-container">
            <span className="current-price">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="old-price">{formatPrice(product.oldPrice)}</span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className={`btn-add-cart ${isInCart ? 'already-in-cart' : ''}`}
            title={isInCart ? `В корзине: ${cartItem.quantity} шт.` : 'Добавить в корзину'}
          >
            {isInCart ? (
              <>
                <Check size={17} />
                <span>В корзине ({cartItem.quantity})</span>
              </>
            ) : (
              <>
                <ShoppingCart size={17} />
                <span>Купить</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

