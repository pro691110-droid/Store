import React, { useState } from 'react';
import { Zap, Send, Phone, Mail, MapPin } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Footer() {
  const { addToast } = useStore();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      addToast('Вы успешно подписались на акции и новинки!', 'success');
      setEmail('');
    }
  };

  return (
    <footer className="store-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">
            <Zap className="brand-icon" size={24} />
            <span className="brand-name">Electro<span className="brand-accent">Nova</span></span>
          </div>
          <p className="footer-about">
            Ваш надежный проводник в мир флагманской электроники, умных гаджетов и передовых технологий. Только оригинальная продукция с официальной гарантией.
          </p>
          <div className="footer-contacts">
            <div className="contact-row">
              <Phone size={16} />
              <span>+380 (800) 555-35-35 (Бесплатно)</span>
            </div>
            <div className="contact-row">
              <Mail size={16} />
              <span>support@electronova.store</span>
            </div>
            <div className="contact-row">
              <MapPin size={16} />
              <span>г. Киев, ул. Технологическая, 1</span>
            </div>
          </div>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-heading">Каталог</h4>
          <ul>
            <li><a href="#smartphones">Смартфоны</a></li>
            <li><a href="#laptops">Ноутбуки</a></li>
            <li><a href="#audio">Наушники и Аудио</a></li>
            <li><a href="#watches">Смарт-часы</a></li>
            <li><a href="#gaming">Гейминг консоли</a></li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-heading">Клиентам</h4>
          <ul>
            <li><a href="#shipping">Доставка и оплата</a></li>
            <li><a href="#warranty">Гарантийный сервис</a></li>
            <li><a href="#returns">Обмен и возврат 14 дней</a></li>
            <li><a href="#faq">Частые вопросы (FAQ)</a></li>
            <li><a href="#tradein">Программа Trade-In</a></li>
          </ul>
        </div>

        <div className="footer-newsletter">
          <h4 className="footer-heading">Скидка 10% за подписку</h4>
          <p>Подпишитесь на закрытые распродажи и секретные промокоды:</p>
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input
              type="email"
              placeholder="Ваш e-mail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-btn" aria-label="Подписаться">
              <Send size={16} />
            </button>
          </form>
          <span className="newsletter-hint">Не рассылаем спам. Отписаться можно в 1 клик.</span>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright">
          © {new Date().getFullYear()} ElectroNova Inc. Все права защищены. Разработано на React 19 + Vite.
        </p>
        <div className="footer-payment-badges">
          <span className="pay-badge">Apple Pay</span>
          <span className="pay-badge">Google Pay</span>
          <span className="pay-badge">Visa</span>
          <span className="pay-badge">MasterCard</span>
        </div>
      </div>
    </footer>
  );
}

