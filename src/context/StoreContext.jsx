import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, PROMO_CODES } from '../data/products';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  // Theme state with localStorage
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('electro_theme') || 'dark';
  });

  // Cart state with localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('electro_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Favorites state with localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('electro_favs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Currency
  const [currency, setCurrency] = useState('USD'); // 'USD', 'EUR', 'UAH'
  const currencyRates = {
    USD: { symbol: '$', rate: 1 },
    EUR: { symbol: '€', rate: 0.92 },
    UAH: { symbol: '₴', rate: 41.5 }
  };

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 4000 });
  const [onlyInStock, setOnlyInStock] = useState(false);

  // Modals & Drawers
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Promo code
  const [appliedPromo, setAppliedPromo] = useState(null);

  // Toasts
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    localStorage.setItem('electro_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('electro_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('electro_favs', JSON.stringify(favorites));
  }, [favorites]);

  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Cart operations
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    addToast(`"${product.name}" добавлен в корзину!`, 'success');
  };

  const updateCartQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (productId) => {
    const item = cart.find((i) => i.product.id === productId);
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
    if (item) {
      addToast(`"${item.product.name}" удален из корзины`, 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  // Favorites operations
  const toggleFavorite = (product) => {
    const exists = favorites.includes(product.id);
    if (exists) {
      setFavorites((prev) => prev.filter((id) => id !== product.id));
      addToast(`"${product.name}" удален из избранного`, 'info');
    } else {
      setFavorites((prev) => [...prev, product.id]);
      addToast(`"${product.name}" добавлен в избранное ❤️`, 'love');
    }
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  // Promo code
  const applyPromoCode = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (PROMO_CODES[cleanCode]) {
      setAppliedPromo({
        code: cleanCode,
        ...PROMO_CODES[cleanCode]
      });
      addToast(`Промокод ${cleanCode} применен! Скидка ${PROMO_CODES[cleanCode].discountPercent}%`, 'success');
      return { success: true };
    } else {
      addToast('Неверный промокод', 'error');
      return { success: false, error: 'Промокод не найден' };
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    addToast('Промокод отменен', 'info');
  };

  // Currency Formatter
  const formatPrice = (priceInUSD) => {
    const config = currencyRates[currency];
    const converted = Math.round(priceInUSD * config.rate);
    return `${converted.toLocaleString('ru-RU')} ${config.symbol}`;
  };

  // Calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = appliedPromo ? Math.round((cartSubtotal * appliedPromo.discountPercent) / 100) : 0;
  const shippingCost = cartSubtotal > 1500 || cartSubtotal === 0 ? 0 : 25;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingCost);

  // Filtered & Sorted Products
  const filteredProducts = PRODUCTS.filter((product) => {
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }
    if (onlyInStock && !product.inStock) {
      return false;
    }
    if (product.price < priceRange.min || product.price > priceRange.max) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = product.name.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      return matchName || matchDesc;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'discount') {
      const discA = a.oldPrice ? ((a.oldPrice - a.price) / a.oldPrice) : 0;
      const discB = b.oldPrice ? ((b.oldPrice - b.price) / b.oldPrice) : 0;
      return discB - discA;
    }
    return a.id - b.id; // 'featured'
  });

  return (
    <StoreContext.Provider
      value={{
        theme,
        toggleTheme,
        cart,
        cartCount,
        cartSubtotal,
        discountAmount,
        shippingCost,
        cartTotal,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        favorites,
        toggleFavorite,
        clearFavorites,
        currency,
        setCurrency,
        formatPrice,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        sortBy,
        setSortBy,
        priceRange,
        setPriceRange,
        onlyInStock,
        setOnlyInStock,
        quickViewProduct,
        setQuickViewProduct,
        isCartOpen,
        setIsCartOpen,
        isFavoritesOpen,
        setIsFavoritesOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        toasts,
        addToast,
        removeToast,
        filteredProducts,
        totalProductsCount: PRODUCTS.length
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
