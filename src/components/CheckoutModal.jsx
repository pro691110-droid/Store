import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import confetti from 'canvas-confetti';
import { 
  X, 
  CreditCard, 
  Banknote, 
  Smartphone, 
  CheckCircle2, 
  PackageCheck, 
  ShieldCheck, 
  ShoppingBag 
} from 'lucide-react';

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    discountAmount,
    shippingCost,
    cartSubtotal,
    formatPrice,
    clearCart,
    appliedPromo
  } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    paymentMethod: 'card', // 'card', 'cash', 'pay'
    comment: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(null);

  if (!isCheckoutOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.city) {
      alert('Пожалуйста, заполните имя, телефон и город доставки.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // Fire confetti
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.error(err);
      }

      const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderComplete({
        orderNumber,
        ...formData,
        itemsCount: cart.reduce((s, i) => s + i.quantity, 0),
        total: cartTotal
      });
      clearCart();
      setIsSubmitting(false);
    }, 700);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setOrderComplete(null);
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-dialog checkout-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button onClick={handleClose} className="modal-close-btn" aria-label="Закрыть">
          <X size={20} />
        </button>

        {orderComplete ? (
          /* Order Placed Success View */
          <div className="order-success-view">
            <div className="success-icon-wrap">
              <CheckCircle2 size={64} className="success-icon" />
            </div>
            <h2 className="success-title">Заказ успешно оформлен!</h2>
            <p className="success-order-num">
              Номер вашего заказа: <strong>#{orderComplete.orderNumber}</strong>
            </p>
            <p className="success-desc">
              Спасибо за покупку, <strong>{orderComplete.name}</strong>! Мы отправили подтверждение на {orderComplete.phone}. 
              Менеджер свяжется с вами в течение 10 минут для уточнения доставки в город <strong>{orderComplete.city}</strong>.
            </p>

            <div className="success-summary-box">
              <div className="success-row">
                <span>Количество товаров:</span>
                <span>{orderComplete.itemsCount} шт.</span>
              </div>
              <div className="success-row">
                <span>Способ оплаты:</span>
                <span>
                  {orderComplete.paymentMethod === 'card' && 'Банковская карта (онлайн)'}
                  {orderComplete.paymentMethod === 'cash' && 'Оплата при получении'}
                  {orderComplete.paymentMethod === 'pay' && 'Apple Pay / Google Pay'}
                </span>
              </div>
              <div className="success-row total">
                <span>Сумма к оплате:</span>
                <span className="success-total">{formatPrice(orderComplete.total)}</span>
              </div>
            </div>

            <button onClick={handleClose} className="btn-continue-shopping">
              <ShoppingBag size={18} />
              <span>Вернуться в магазин</span>
            </button>
          </div>
        ) : (
          /* Checkout Form View */
          <div className="checkout-content">
            <div className="checkout-header">
              <PackageCheck size={26} className="checkout-header-icon" />
              <div>
                <h2>Оформление заказа</h2>
                <p>Заполните контактные данные для доставки</p>
              </div>
            </div>

            <form onSubmit={handleSubmitOrder} className="checkout-form">
              <div className="checkout-grid">
                {/* Form Inputs Column */}
                <div className="form-col">
                  <h4 className="form-section-title">1. Контактная информация</h4>
                  <div className="input-field">
                    <label>ФИО получателя *</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Иван Иванов"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="input-row-2">
                    <div className="input-field">
                      <label>Телефон *</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+380 / +7 ..."
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="input-field">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="client@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <h4 className="form-section-title">2. Адрес доставки</h4>
                  <div className="input-row-2">
                    <div className="input-field">
                      <label>Город *</label>
                      <input
                        type="text"
                        name="city"
                        placeholder="Киев / Варшава / Алматы"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="input-field">
                      <label>Отделение / Адрес</label>
                      <input
                        type="text"
                        name="address"
                        placeholder="Отделение №12 или ул. Мира 5"
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <h4 className="form-section-title">3. Способ оплаты</h4>
                  <div className="payment-options">
                    <label className={`payment-card-opt ${formData.paymentMethod === 'card' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                      />
                      <CreditCard size={20} />
                      <div className="payment-label-text">
                        <strong>Банковская карта</strong>
                        <span>Visa / MasterCard (без комиссии)</span>
                      </div>
                    </label>

                    <label className={`payment-card-opt ${formData.paymentMethod === 'cash' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={formData.paymentMethod === 'cash'}
                        onChange={handleInputChange}
                      />
                      <Banknote size={20} />
                      <div className="payment-label-text">
                        <strong>При получении</strong>
                        <span>Наложенный платеж / наличными</span>
                      </div>
                    </label>

                    <label className={`payment-card-opt ${formData.paymentMethod === 'pay' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="pay"
                        checked={formData.paymentMethod === 'pay'}
                        onChange={handleInputChange}
                      />
                      <Smartphone size={20} />
                      <div className="payment-label-text">
                        <strong>Apple Pay / Google Pay</strong>
                        <span>Быстрая оплата в один клик</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Order Summary Column */}
                <div className="order-summary-col">
                  <h4 className="form-section-title">Ваш заказ ({cart.length} поз.)</h4>
                  <div className="checkout-items-preview">
                    {cart.map(({ product, quantity }) => (
                      <div key={product.id} className="checkout-item-row">
                        <img src={product.image} alt={product.name} className="checkout-item-thumb" />
                        <div className="checkout-item-info">
                          <span className="checkout-item-title">{product.name}</span>
                          <span className="checkout-item-qty">{quantity} шт. × {formatPrice(product.price)}</span>
                        </div>
                        <span className="checkout-item-sum">{formatPrice(product.price * quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="checkout-totals">
                    <div className="checkout-row">
                      <span>Сумма заказа:</span>
                      <span>{formatPrice(cartSubtotal)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="checkout-row discount">
                        <span>Скидка ({appliedPromo?.code}):</span>
                        <span>-{formatPrice(discountAmount)}</span>
                      </div>
                    )}
                    <div className="checkout-row">
                      <span>Доставка:</span>
                      <span>{shippingCost === 0 ? 'Бесплатно' : formatPrice(shippingCost)}</span>
                    </div>
                    <div className="checkout-row total">
                      <span>Итого:</span>
                      <span className="checkout-final-sum">{formatPrice(cartTotal)}</span>
                    </div>
                  </div>

                  <div className="checkout-security-note">
                    <ShieldCheck size={18} />
                    <span>Безопасная оплата с 256-битным SSL-шифрованием</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || cart.length === 0}
                    className="btn-submit-order"
                  >
                    {isSubmitting ? 'Обработка заказа...' : `Подтвердить заказ (${formatPrice(cartTotal)})`}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

