/**
 * 🗂️ التصنيفات والفلاتر
 * A single source of truth shared by the categories section and the collection
 * filter bar, so clicking a category card applies the matching filter.
 */

/**
 * @typedef {Object} Category
 * @property {string} id
 * @property {string} label        اسم مختصر يظهر في شريط الفلاتر
 * @property {string} title        عنوان البطاقة في قسم التصنيفات
 * @property {string} description
 * @property {string} image
 * @property {(product: import('./products').Product) => boolean} match
 */

/** @type {Category[]} */
export const categories = [
  {
    id: 'men',
    label: 'رجالي',
    title: 'عطور رجالية',
    description: 'تركيبات خشبية وشرقية بحضور قوي.',
    image: '/images/scenes/category-men.svg',
    match: (p) => p.gender === 'men',
  },
  {
    id: 'women',
    label: 'نسائي',
    title: 'عطور نسائية',
    description: 'زهور ناعمة ولمسات مسكية أنيقة.',
    image: '/images/scenes/category-women.svg',
    match: (p) => p.gender === 'women',
  },
  {
    id: 'unisex',
    label: 'للجنسين',
    title: 'عطور للجنسين',
    description: 'توازن يناسب الجميع في كل المناسبات.',
    image: '/images/scenes/category-unisex.svg',
    match: (p) => p.gender === 'unisex',
  },
  {
    id: 'oriental',
    label: 'شرقي',
    title: 'عطور شرقية',
    description: 'عود، عنبر، وبخور بروح خليجية.',
    image: '/images/scenes/category-oriental.svg',
    match: (p) => p.category === 'oriental',
  },
  {
    id: 'western',
    label: 'غربي',
    title: 'عطور غربية',
    description: 'حمضيات وزهور بأسلوب عصري خفيف.',
    image: '/images/scenes/category-western.svg',
    match: (p) => p.category === 'western',
  },
  {
    id: 'luxury',
    label: 'فاخر',
    title: 'عطور فاخرة',
    description: 'تركيزات عالية وتركيبات نادرة.',
    image: '/images/scenes/category-luxury.svg',
    match: (p) => p.tags?.includes('luxury'),
  },
];

/** خيارات شريط الفلاتر (الكل + التصنيفات) */
export const filters = [
  { id: 'all', label: 'الكل', match: () => true },
  ...categories.map(({ id, label, match }) => ({ id, label, match })),
];

export const getFilter = (id) => filters.find((f) => f.id === id) || filters[0];

/** خيارات الترتيب */
export const sortOptions = [
  { id: 'newest', label: 'الأحدث' },
  { id: 'price-asc', label: 'السعر: من الأقل للأعلى' },
  { id: 'price-desc', label: 'السعر: من الأعلى للأقل' },
  { id: 'name', label: 'الاسم' },
];

/** تسميات الجنس وحالة التوفر للعرض */
export const genderLabels = {
  men: 'رجالي',
  women: 'نسائي',
  unisex: 'للجنسين',
};

export const categoryLabels = {
  oriental: 'شرقي',
  western: 'غربي',
};

export const availabilityLabels = {
  in_stock: { label: 'متوفر', tone: 'ok' },
  low_stock: { label: 'الكمية محدودة', tone: 'warn' },
  out_of_stock: { label: 'غير متوفر حالياً', tone: 'off' },
};
