export const CATEGORIES = [
  { id: 'all', name: 'Все товары' },
  { id: 'smartphones', name: 'Смартфоны' },
  { id: 'laptops', name: 'Ноутбуки' },
  { id: 'audio', name: 'Аудио и Наушники' },
  { id: 'watches', name: 'Смарт-часы' },
  { id: 'gaming', name: 'Гейминг' }
];

export const PRODUCTS = [
  {
    id: 1,
    name: 'Apple iPhone 15 Pro 256GB Titanium',
    category: 'smartphones',
    price: 1199,
    oldPrice: 1349,
    rating: 4.9,
    reviewsCount: 128,
    badge: 'Хит',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80',
    description: 'Флагманский смартфон в прочном и легком корпусе из титана, с чипом A17 Pro и революционной системой камер 48 Мп.',
    specs: {
      'Экран': '6.1" OLED Super Retina XDR (120 Гц)',
      'Процессор': 'Apple A17 Pro (3 нм)',
      'Память': '256 ГБ',
      'Камера': '48 Мп + 12 Мп + 12 Мп',
      'Вес': '187 г'
    }
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24 Ultra 512GB Gray',
    category: 'smartphones',
    price: 1299,
    oldPrice: 1450,
    rating: 4.8,
    reviewsCount: 94,
    badge: 'Новинка',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80',
    description: 'Искусственный интеллект Galaxy AI, титановая рамка, стилус S Pen и невероятный 200-мегапиксельный сенсор.',
    specs: {
      'Экран': '6.8" Dynamic AMOLED 2X QHD+',
      'Процессор': 'Snapdragon 8 Gen 3 for Galaxy',
      'Память': '12 ГБ / 512 ГБ',
      'Батарея': '5000 мАч (быстрая зарядка 45W)',
      'Защита': 'IP68'
    }
  },
  {
    id: 3,
    name: 'Apple MacBook Pro 16" M3 Max 36GB',
    category: 'laptops',
    price: 3499,
    oldPrice: 3899,
    rating: 5.0,
    reviewsCount: 67,
    badge: 'Топ выбор',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80',
    description: 'Экстремальная производительность для профессионалов. Дисплей Liquid Retina XDR и до 22 часов работы от батареи.',
    specs: {
      'Экран': '16.2" Liquid Retina XDR (3456x2234)',
      'Чип': 'Apple M3 Max (14-ядерный CPU, 30-ядерный GPU)',
      'ОЗУ': '36 ГБ Unified Memory',
      'SSD': '1 ТБ NVMe',
      'Автономность': 'До 22 часов'
    }
  },
  {
    id: 4,
    name: 'ASUS ROG Zephyrus G16 RTX 4080',
    category: 'laptops',
    price: 2499,
    oldPrice: 2799,
    rating: 4.7,
    reviewsCount: 42,
    badge: 'Скидка -11%',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop&q=80',
    description: 'Ультратонкий игровой монстр с OLED дисплеем 240 Гц и графикой NVIDIA GeForce RTX 4080.',
    specs: {
      'Экран': '16" 2.5K OLED 240Hz 0.2ms',
      'Процессор': 'Intel Core Ultra 9 185H',
      'Видеокарта': 'NVIDIA GeForce RTX 4080 12GB',
      'ОЗУ': '32 ГБ LPDDR5X',
      'SSD': '1 ТБ PCIe 4.0'
    }
  },
  {
    id: 5,
    name: 'Sony WH-1000XM5 Black',
    category: 'audio',
    price: 349,
    oldPrice: 399,
    rating: 4.9,
    reviewsCount: 215,
    badge: 'Хит',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    description: 'Лучшее в отрасли активное шумоподавление с двумя процессорами и 8 микрофонами. Безупречный звук Hi-Res.',
    specs: {
      'Тип': 'Полноразмерные беспроводные',
      'Шумоподавление': 'Активное (Dual Chip ANC)',
      'Автономность': 'До 30 часов с ANC',
      'Кодеки': 'LDAC, AAC, SBC',
      'Вес': '250 г'
    }
  },
  {
    id: 6,
    name: 'Apple AirPods Max Space Gray',
    category: 'audio',
    price: 499,
    oldPrice: 549,
    rating: 4.6,
    reviewsCount: 180,
    badge: '',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80',
    description: 'Премиальные наушники с адаптивным эквалайзером, пространственным аудио и прозрачным режимом.',
    specs: {
      'Драйвер': 'Динамический драйвер Apple 40 мм',
      'Процессор': 'Apple H1 в каждом наушнике',
      'Автономность': 'До 20 часов',
      'Материал': 'Анодированный алюминий + сетка'
    }
  },
  {
    id: 7,
    name: 'Apple Watch Ultra 2 49mm Titanium',
    category: 'watches',
    price: 799,
    oldPrice: 899,
    rating: 4.9,
    reviewsCount: 88,
    badge: 'Топ выбор',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=80',
    description: 'Самые прочные и функциональные Apple Watch. Яркость дисплея 3000 нит, двухчастотный GPS и глубина погружения до 40м.',
    specs: {
      'Корпус': '49 мм титан авиационного класса',
      'Дисплей': 'OLED Always-On 3000 нит',
      'Автономность': 'До 72 часов в режиме энергосбережения',
      'Водозащита': 'WR100, EN13319'
    }
  },
  {
    id: 8,
    name: 'Samsung Galaxy Watch 6 Classic 47mm',
    category: 'watches',
    price: 329,
    oldPrice: 380,
    rating: 4.7,
    reviewsCount: 63,
    badge: 'Скидка -13%',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    description: 'Изящный вращающийся безель, расширенный мониторинг сна, датчик состава тела и сапфировое стекло.',
    specs: {
      'Корпус': 'Нержавеющая сталь 47 мм',
      'Стекло': 'Sapphire Crystal',
      'ОС': 'Wear OS Powered by Samsung',
      'Датчики': 'ЭКГ, пульс, биоимпеданс, SpO2'
    }
  },
  {
    id: 9,
    name: 'Sony PlayStation 5 Slim 1TB Digital',
    category: 'gaming',
    price: 499,
    oldPrice: 549,
    rating: 4.9,
    reviewsCount: 310,
    badge: 'Хит',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&auto=format&fit=crop&q=80',
    description: 'Игровая консоль нового поколения в обновленном ультракомпактном корпусе с 1 ТБ сверхбыстрого SSD.',
    specs: {
      'Процессор': 'AMD Zen 2 (8 ядер / 16 потоков)',
      'Графика': 'AMD RDNA 2 с трассировкой лучей',
      'Память': '1 ТБ Custom SSD (5.5 ГБ/с)',
      'Разрешение': 'До 4K 120 FPS / 8K поддержка'
    }
  },
  {
    id: 10,
    name: 'Xbox Wireless Controller Elite Series 2',
    category: 'gaming',
    price: 179,
    oldPrice: 199,
    rating: 4.8,
    reviewsCount: 145,
    badge: '',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=600&auto=format&fit=crop&q=80',
    description: 'Кастомизируемый геймпад профессионального уровня с настраиваемыми лепестками и ходом курков.',
    specs: {
      'Совместимость': 'Xbox Series X/S, One, Windows, Android, iOS',
      'Автономность': 'До 40 часов',
      'Особенности': 'Сменные стики, регулировка натяжения'
    }
  },
  {
    id: 11,
    name: 'Google Pixel 8 Pro 128GB Bay Blue',
    category: 'smartphones',
    price: 899,
    oldPrice: 999,
    rating: 4.7,
    reviewsCount: 76,
    badge: 'Новинка',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80',
    description: 'Смартфон с лучшими возможностями мобильной фотографии, чистым Android и процессором Google Tensor G3.',
    specs: {
      'Экран': '6.7" Super Actua OLED (1-120 Гц)',
      'Процессор': 'Google Tensor G3',
      'Камера': '50 Мп + 48 Мп (зум 5x) + 48 Мп (ультраширик)',
      'Поддержка ПО': '7 лет обновлений ОС'
    }
  },
  {
    id: 12,
    name: 'Marshall Stanmore III Bluetooth Black',
    category: 'audio',
    price: 379,
    oldPrice: 420,
    rating: 4.9,
    reviewsCount: 89,
    badge: 'Топ выбор',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80',
    description: 'Легендарная домашняя акустическая система с глубокими басами, фирменным рок-н-ролльным дизайном и Bluetooth 5.2.',
    specs: {
      'Мощность': '80 Вт (1x50W вуфер + 2x15W твитеры)',
      'Частотный диапазон': '45 – 20 000 Гц',
      'Подключение': 'Bluetooth 5.2, AUX 3.5mm, RCA',
      'Вес': '4.25 кг'
    }
  }
];

export const PROMO_CODES = {
  'REACT2026': { discountPercent: 15, description: 'Скидка 15% на всё' },
  'PROMO10': { discountPercent: 10, description: 'Скидка 10% на заказ' },
  'SUPER20': { discountPercent: 20, description: 'Специальная скидка 20%' }
};
