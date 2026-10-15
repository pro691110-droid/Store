import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowUpDown, CheckCircle2, RotateCcw } from 'lucide-react';

export default function FilterSortBar() {
  const {
    sortBy,
    setSortBy,
    onlyInStock,
    setOnlyInStock,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredProducts
  } = useStore();

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'all' || onlyInStock || sortBy !== 'featured';

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setOnlyInStock(false);
    setSortBy('featured');
  };

  return (
    <div className="filter-sort-bar">
      <div className="filter-info">
        <span className="results-count">
          Найдено товаров: <strong>{filteredProducts.length}</strong>
        </span>
        {searchQuery && (
          <span className="search-tag">
            По запросу: «{searchQuery}»
          </span>
        )}
      </div>

      <div className="filter-controls">
        {/* In Stock toggle */}
        <label className="instock-toggle">
          <input
            type="checkbox"
            checked={onlyInStock}
            onChange={(e) => setOnlyInStock(e.target.checked)}
          />
          <span className="instock-checkbox-custom">
            {onlyInStock && <CheckCircle2 size={16} />}
          </span>
          <span className="instock-text">Только в наличии</span>
        </label>

        {/* Sort Select */}
        <div className="sort-wrapper">
          <ArrowUpDown size={16} className="sort-icon" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="featured">По популярности</option>
            <option value="price-asc">Сначала дешевле</option>
            <option value="price-desc">Сначала дороже</option>
            <option value="rating">По рейтингу</option>
            <option value="discount">По величине скидки</option>
          </select>
        </div>

        {/* Reset button */}
        {hasActiveFilters && (
          <button
            onClick={resetAllFilters}
            className="reset-filters-btn"
            title="Сбросить все фильтры"
          >
            <RotateCcw size={15} />
            <span>Сбросить</span>
          </button>
        )}
      </div>
    </div>
  );
}

