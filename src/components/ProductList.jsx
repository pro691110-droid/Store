import React from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from './ProductCard';
import { SearchX, RotateCcw } from 'lucide-react';

export default function ProductList() {
  const {
    filteredProducts,
    setSearchQuery,
    setSelectedCategory,
    setOnlyInStock
  } = useStore();

  if (filteredProducts.length === 0) {
    return (
      <div className="empty-catalog-state">
        <div className="empty-icon-wrap">
          <SearchX size={52} className="empty-icon" />
        </div>
        <h3 className="empty-title">Ничего не найдено</h3>
        <p className="empty-subtitle">
          Попробуйте изменить поисковый запрос или сбросить фильтры каталога.
        </p>
        <button
          onClick={() => {
            setSearchQuery('');
            setSelectedCategory('all');
            setOnlyInStock(false);
          }}
          className="btn-reset-empty"
        >
          <RotateCcw size={16} />
          <span>Показать все товары</span>
        </button>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

