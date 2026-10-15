import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Star, Heart, ShoppingBag, Check, ShieldCheck, Truck } from 'lucide-react';

export default function ProductModal() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    formatPrice,
    addToCart,
    favorites,
    toggleFavorite
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isFavorite = favorites.includes(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1600);
  };

  return (
    <div className="modal-backdrop" onClick={() => setQuickViewProduct(null)}>
      <div className="modal-dialog modal-product-view" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="modal-close-btn"
          aria-label="Закрыть"
        >
          <X size={20} />
        </button>

        <div className="modal-product-content">
          {/* Left: Image */}
          <div className="modal-img-col">
            <img src={product.image} alt={product.name} className="modal-product-img" />
            {product.badge && (
              <span className={`product-badge modal-badge badge-${product.badge.toLowerCase().replace(/[^a-zа-я0-9]/g, '')}`}>
                {product.badge}
              </span>
            )}
          </div>

          {/* Right: Info */}
          <div className="modal-info-col">
            <div className="modal-product-meta">
              <div className="product-rating">
                <Star size={16} fill="currentColor" />
                <span className="rating-val">{product.rating}</span>
                <span className="reviews-val">({product.reviewsCount} отзывов)</span>
              </div>
              <span className={`stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                {product.inStock ? '● В наличии на складе' : '○ Ожидается поставка'}
              </span>
            </div>

            <h2 className="modal-title">{product.name}</h2>

            <div className="modal-price-box">
              <span className="modal-current-price">{formatPrice(product.price)}</span>
              {product.oldPrice && (
                <span className="modal-old-price">{formatPrice(product.oldPrice)}</span>
              )}
            </div>

            <p className="modal-desc">{product.description}</p>

            {/* Specifications */}
            {product.specs && (
              <div className="modal-specs-box">
                <h4>Характеристики:</h4>
                <div className="specs-grid">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="spec-row">
                      <span className="spec-name">{key}:</span>
                      <span className="spec-val">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions: Quantity & Add to Cart */}
            <div className="modal-purchase-row">
              <div className="qty-selector">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="qty-btn"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="qty-value">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="qty-btn"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`btn-modal-add ${addedAnimation ? 'added-success' : ''}`}
              >
                {addedAnimation ? (
                  <>
                    <Check size={18} />
                    <span>Добавлено!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    <span>Добавить в корзину</span>
                  </>
                )}
              </button>

              <button
                onClick={() => toggleFavorite(product)}
                className={`btn-modal-fav ${isFavorite ? 'active' : ''}`}
                title={isFavorite ? 'В избранном' : 'В список желаний'}
              >
                <Heart size={20} className={isFavorite ? 'icon-filled' : ''} />
              </button>
            </div>

            {/* Guarantees */}
            <div className="modal-guarantees">
              <div className="guarantee-chip">
                <Truck size={15} />
                <span>Бесплатная доставка от $50</span>
              </div>
              <div className="guarantee-chip">
                <ShieldCheck size={15} />
                <span>Гарантия производителя 2 года</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

