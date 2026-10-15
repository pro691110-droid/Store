import React from 'react';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';
import { 
  LayoutGrid, 
  Smartphone, 
  Laptop, 
  Headphones, 
  Watch, 
  Gamepad2 
} from 'lucide-react';

const CATEGORY_ICONS = {
  all: LayoutGrid,
  smartphones: Smartphone,
  laptops: Laptop,
  audio: Headphones,
  watches: Watch,
  gaming: Gamepad2
};

export default function CategoryBar() {
  const { selectedCategory, setSelectedCategory } = useStore();

  const getCount = (catId) => {
    if (catId === 'all') return PRODUCTS.length;
    return PRODUCTS.filter((p) => p.category === catId).length;
  };

  return (
    <div className="category-bar-wrapper">
      <div className="category-bar">
        {CATEGORIES.map((cat) => {
          const Icon = CATEGORY_ICONS[cat.id] || LayoutGrid;
          const isActive = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`category-pill ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} className="cat-icon" />
              <span className="cat-name">{cat.name}</span>
              <span className="cat-count">{getCount(cat.id)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

