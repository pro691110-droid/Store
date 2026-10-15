import React from 'react';
import { Sparkles, Truck, ShieldCheck, RefreshCw, Gift } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function HeroBanner() {
  const { applyPromoCode } = useStore();

  return (
    <div className="hero-banner">
      <div className="hero-content">
        <div className="hero-badge">
          <Sparkles size={16} />
          <span>Грандиозная распродажа электроники 2026</span>
        </div>
        <h1 className="hero-title">
          Инновационные гаджеты <br />
          <span className="gradient-text">по специальным ценам</span>
        </h1>
        <p className="hero-subtitle">
          Флагманские смартфоны, ультрабуки нового поколения, Hi-Res аудио и умные девайсы с официальной гарантией.
        </p>
        
        <div className="hero-promo-pill" onClick={() => applyPromoCode('REACT2026')}>
          <Gift size={18} className="promo-gift-icon" />
          <span>Промокод на скидку 15%: <strong>REACT2026</strong></span>
          <button className="promo-apply-inline">Применить</button>
        </div>

        <div className="hero-features-grid">
          <div className="feature-item">
            <Truck size={20} className="feature-icon" />
            <div>
              <h4>Быстрая доставка</h4>
              <p>Отправка в день заказа</p>
            </div>
          </div>
          <div className="feature-item">
            <ShieldCheck size={20} className="feature-icon" />
            <div>
              <h4>Гарантия 24 месяца</h4>
              <p>Официальный сервис</p>
            </div>
          </div>
          <div className="feature-item">
            <RefreshCw size={20} className="feature-icon" />
            <div>
              <h4>Легкий возврат</h4>
              <p>14 дней на проверку</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

