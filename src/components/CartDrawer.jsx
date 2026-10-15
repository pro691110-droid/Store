import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  CheckCircle, 
  Plus, 
  Minus,
  Sparkles
} from 'lucide-react';

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartSubtotal,
    discountAmount,
    shippingCost,
    cartTotal,
    formatPrice,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    setIsCheckoutOpen
  } = useStore();

  const [promoInput, setPromoInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    if (res.success) {
      setPromoInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const freeShippingThreshold = 1500;
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  return (
    <div className="drawer-backdrop" onClick={() => setIsCartOpen(false)}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-header-title">
            <ShoppingBag size={22} className="accent-icon" />
            <h3>Корзина ({cart.reduce((s, i) => s + i.quantity, 0)})</h3>
          </div>
          <div className="drawer-header-actions">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="btn-clear-cart"
                title="Очистить корзину"
              >
                Очистить
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="drawer-close-btn"
              aria-label="Закрыть"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Free Shipping Tracker */}
        {cart.length > 0 && (
          <div className="shipping-tracker">
            <div className="tracker-text">
              {freeShippingRemaining === 0 ? (
                <span className="free-shipping-unlocked">
                  <Sparkles size={16} /> Поздравляем! Доставка бесплатна!
                </span>
              ) : (
                <span>
                  До бесплатной доставки: <strong>{formatPrice(freeShippingRemaining)}</strong>
                </span>
              )}
            </div>
            <div className="tracker-bar-bg">
              <div
                className="tracker-bar-fill"
                style={{ width: `${freeShippingProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Items List */}
        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="empty-cart-view">
              <div className="empty-cart-icon-box">
                <ShoppingBag size={48} />
              </div>
              <h4>Ваша корзина пуста</h4>
              <p>Самое время добавить понравившиеся гаджеты и технику</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn-back-shopping"
              >
                Перейти к покупкам
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map(({ product, quantity }) => (
                <div key={product.id} className="cart-item-card">
                  <img src={product.image} alt={product.name} className="cart-item-img" />
                  
                  <div className="cart-item-details">
                    <h4 className="cart-item-name">{product.name}</h4>
                    <span className="cart-item-unit-price">
                      {formatPrice(product.price)} / шт.
                    </span>

                    <div className="cart-item-controls">
                      <div className="cart-qty-box">
                        <button
                          onClick={() => updateCartQuantity(product.id, -1)}
                          className="qty-mini-btn"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="qty-mini-val">{quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(product.id, 1)}
                          className="qty-mini-btn"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <span className="cart-item-total-price">
                        {formatPrice(product.price * quantity)}
                      </span>

                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="btn-remove-item"
                        title="Удалить товар"
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

        {/* Drawer Footer / Summary */}
        {cart.length > 0 && (
          <div className="drawer-footer">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="promo-form">
              {appliedPromo ? (
                <div className="promo-active-tag">
                  <div className="promo-active-info">
                    <Tag size={16} />
                    <span>Промокод <strong>{appliedPromo.code}</strong> (-{appliedPromo.discountPercent}%)</span>
                  </div>
                  <button
                    type="button"
                    onClick={removePromoCode}
                    className="promo-remove-btn"
                  >
                    <X size={15} />
                  </button>
                </div>
              ) : (
                <div className="promo-input-row">
                  <input
                    type="text"
                    placeholder="Промокод (REACT2026)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="promo-input"
                  />
                  <button type="submit" className="promo-submit-btn">
                    Применить
                  </button>
                </div>
              )}
            </form>

            {/* Price Calculations */}
            <div className="summary-breakdown">
              <div className="summary-row">
                <span>Товары:</span>
                <span>{formatPrice(cartSubtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="summary-row discount-row">
                  <span>Скидка ({appliedPromo?.discountPercent}%):</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="summary-row">
                <span>Доставка:</span>
                <span>
                  {shippingCost === 0 ? (
                    <span className="free-tag">Бесплатно</span>
                  ) : (
                    formatPrice(shippingCost)
                  )}
                </span>
              </div>
              <div className="summary-row total-row">
                <span>Итого к оплате:</span>
                <span className="total-amount">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleProceedToCheckout}
              className="btn-checkout-proceed"
            >
              <span>Оформить заказ</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

