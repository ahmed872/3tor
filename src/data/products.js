/**
 * 🧴 بيانات المنتجات (بيانات تجريبية)
 * Demo catalogue. Replace with the client's real products — the shape below is
 * what every component expects.
 *
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} slug          معرف نصي يستخدم في الرابط
 * @property {string} name
 * @property {string} brand
 * @property {string} description
 * @property {number} price
 * @property {number|null} oldPrice  السعر قبل التخفيض (اختياري)
 * @property {'SAR'} currency
 * @property {string} size
 * @property {'men'|'women'|'unisex'} gender
 * @property {'oriental'|'western'} category   العائلة العطرية
 * @property {string[]} tags        وسوم إضافية مثل "luxury"
 * @property {{top:string[],heart:string[],base:string[]}} notes
 * @property {string} image
 * @property {string[]} gallery
 * @property {boolean} featured
 * @property {boolean} newArrival
 * @property {boolean} bestseller
 * @property {string} amazonUrl     ← استبدل بروابط Amazon الحقيقية
 * @property {string} sku
 * @property {'in_stock'|'low_stock'|'out_of_stock'} availability
 */

const img = (slug) => ({
  image: `/images/products/${slug}-1.svg`,
  gallery: [
    `/images/products/${slug}-1.svg`,
    `/images/products/${slug}-2.svg`,
    `/images/products/${slug}-3.svg`,
  ],
});

/** @type {Product[]} */
export const products = [
  {
    id: 1,
    slug: 'layali-oud',
    name: 'ليالي العود',
    brand: 'دار أثر',
    description:
      'عطر شرقي دافئ يتصدره العود الكمبودي مع لمسة من الزعفران والورد. يناسب الأمسيات والمناسبات، ويترك أثراً واضحاً يدوم طويلاً على الملابس.',
    price: 480,
    oldPrice: 560,
    currency: 'SAR',
    size: '100 مل',
    gender: 'men',
    category: 'oriental',
    tags: ['luxury', 'oud'],
    notes: {
      top: ['زعفران', 'هيل', 'برغموت'],
      heart: ['ورد دمشقي', 'عنبر'],
      base: ['عود كمبودي', 'خشب الصندل', 'مسك'],
    },
    ...img('layali-oud'),
    featured: true,
    newArrival: false,
    bestseller: true,
    amazonUrl: 'https://www.amazon.sa/',
    sku: 'ATH-OR-001',
    availability: 'in_stock',
  },
  {
    id: 2,
    slug: 'noor-al-sabah',
    name: 'نور الصباح',
    brand: 'مقام',
    description:
      'افتتاحية منعشة من الحمضيات تتحول تدريجياً إلى قلب زهري ناعم. خيار خفيف ومناسب للاستخدام اليومي وساعات النهار.',
    price: 320,
    oldPrice: null,
    currency: 'SAR',
    size: '75 مل',
    gender: 'women',
    category: 'western',
    tags: ['fresh'],
    notes: {
      top: ['ليمون صقلي', 'برتقال', 'نعناع'],
      heart: ['ياسمين', 'زنبق', 'فريزيا'],
      base: ['مسك أبيض', 'خشب الأرز'],
    },
    ...img('noor-al-sabah'),
    featured: true,
    newArrival: true,
    bestseller: false,
    amazonUrl: 'https://www.amazon.sa/',
    sku: 'ATH-WE-002',
    availability: 'in_stock',
  },
  {
    id: 3,
    slug: 'ward-taifi',
    name: 'ورد طائفي',
    brand: 'نُدرة',
    description:
      'تركيبة زهرية غنية يتصدرها الورد الطائفي مع طبقات من العنبر والمسك. عطر أنثوي كلاسيكي بحضور هادئ ومتوازن.',
    price: 395,
    oldPrice: 450,
    currency: 'SAR',
    size: '50 مل',
    gender: 'women',
    category: 'oriental',
    tags: ['rose'],
    notes: {
      top: ['ورد طائفي', 'ليتشي'],
      heart: ['ورد بلغاري', 'بنفسج'],
      base: ['عنبر', 'مسك', 'باتشولي'],
    },
    ...img('ward-taifi'),
    featured: true,
    newArrival: false,
    bestseller: true,
    amazonUrl: 'https://www.amazon.sa/',
    sku: 'ATH-OR-003',
    availability: 'low_stock',
  },
  {
    id: 4,
    slug: 'rimal-dhahabiya',
    name: 'رمال ذهبية',
    brand: 'دار أثر',
    description:
      'عطر للجنسين يمزج الزعفران والتوابل الدافئة مع قاعدة من العنبر والفانيليا. حضور فاخر يناسب المساء والأجواء الباردة.',
    price: 540,
    oldPrice: null,
    currency: 'SAR',
    size: '100 مل',
    gender: 'unisex',
    category: 'oriental',
    tags: ['luxury', 'spicy'],
    notes: {
      top: ['زعفران', 'فلفل وردي'],
      heart: ['عسل', 'لبان'],
      base: ['عنبر', 'فانيليا', 'خشب العود'],
    },
    ...img('rimal-dhahabiya'),
    featured: true,
    newArrival: false,
    bestseller: false,
    amazonUrl: 'https://www.amazon.sa/',
    sku: 'ATH-LX-004',
    availability: 'in_stock',
  },
  {
    id: 5,
    slug: 'sada-al-arz',
    name: 'صدى الأرز',
    brand: 'مقام',
    description:
      'عطر خشبي عصري يعتمد على الأرز والفيتيفر مع لمسة حمضية في المقدمة. مناسب للعمل والاستخدام اليومي.',
    price: 285,
    oldPrice: null,
    currency: 'SAR',
    size: '100 مل',
    gender: 'men',
    category: 'western',
    tags: ['woody'],
    notes: {
      top: ['جريب فروت', 'حبهان'],
      heart: ['خزامى', 'إكليل الجبل'],
      base: ['خشب الأرز', 'فيتيفر', 'مسك'],
    },
    ...img('sada-al-arz'),
    featured: false,
    newArrival: true,
    bestseller: false,
    amazonUrl: 'https://www.amazon.sa/',
    sku: 'ATH-WE-005',
    availability: 'in_stock',
  },
  {
    id: 6,
    slug: 'misk-al-hujra',
    name: 'مسك الحجرة',
    brand: 'نُدرة',
    description:
      'مسك أبيض ناعم بلمسة من الزهور البيضاء. عطر هادئ ومناسب للأجواء المغلقة والاستخدام المتكرر.',
    price: 250,
    oldPrice: null,
    currency: 'SAR',
    size: '50 مل',
    gender: 'unisex',
    category: 'oriental',
    tags: ['musk'],
    notes: {
      top: ['برغموت', 'أوزون'],
      heart: ['زهر البرتقال', 'ياسمين'],
      base: ['مسك أبيض', 'خشب أبيض'],
    },
    ...img('misk-al-hujra'),
    featured: false,
    newArrival: false,
    bestseller: true,
    amazonUrl: 'https://www.amazon.sa/',
    sku: 'ATH-OR-006',
    availability: 'in_stock',
  },
  {
    id: 7,
    slug: 'layl-tawil',
    name: 'ليل طويل',
    brand: 'قصر الند',
    description:
      'تركيبة عميقة تجمع بين الجلد والتبغ والتوابل السوداء. عطر مسائي قوي الحضور، يُنصح باستخدامه بكميات قليلة.',
    price: 610,
    oldPrice: null,
    currency: 'SAR',
    size: '100 مل',
    gender: 'men',
    category: 'western',
    tags: ['luxury', 'leather'],
    notes: {
      top: ['فلفل أسود', 'برغموت'],
      heart: ['جلد', 'تبغ', 'قرفة'],
      base: ['فيتيفر', 'عنبر', 'باتشولي'],
    },
    ...img('layl-tawil'),
    featured: true,
    newArrival: false,
    bestseller: false,
    amazonUrl: 'https://www.amazon.sa/',
    sku: 'ATH-LX-007',
    availability: 'in_stock',
  },
  {
    id: 8,
    slug: 'bahar-al-ain',
    name: 'بهار العين',
    brand: 'مقام',
    description:
      'عطر للجنسين بتركيبة عطرية أروماتية خفيفة تجمع بين التين والأعشاب الخضراء. مناسب للأجواء المعتدلة والنهار.',
    price: 220,
    oldPrice: 265,
    currency: 'SAR',
    size: '75 مل',
    gender: 'unisex',
    category: 'western',
    tags: ['fresh', 'green'],
    notes: {
      top: ['تين أخضر', 'ليمون'],
      heart: ['أوراق التين', 'ريحان'],
      base: ['خشب الأرز', 'مسك أخضر'],
    },
    ...img('bahar-al-ain'),
    featured: false,
    newArrival: false,
    bestseller: false,
    amazonUrl: 'https://www.amazon.sa/',
    sku: 'ATH-WE-008',
    availability: 'in_stock',
  },
  {
    id: 9,
    slug: 'oud-malaki',
    name: 'عود ملكي',
    brand: 'قصر الند',
    description:
      'تركيز عالٍ من دهن العود مع الورد والعنبر في حجم صغير. عطر شرقي فاخر مخصص للمناسبات الخاصة.',
    price: 890,
    oldPrice: null,
    currency: 'SAR',
    size: '60 مل',
    gender: 'men',
    category: 'oriental',
    tags: ['luxury', 'oud'],
    notes: {
      top: ['زعفران', 'قرنفل'],
      heart: ['ورد', 'لبان'],
      base: ['دهن العود', 'عنبر', 'صندل'],
    },
    ...img('oud-malaki'),
    featured: false,
    newArrival: false,
    bestseller: false,
    amazonUrl: 'https://www.amazon.sa/',
    sku: 'ATH-LX-009',
    availability: 'out_of_stock',
  },
  {
    id: 10,
    slug: 'zahr-al-yasmin',
    name: 'زهر الياسمين',
    brand: 'نُدرة',
    description:
      'ياسمين نقي بلمسة من زهر البرتقال والمسك. عطر أنثوي ناعم يصلح للاستخدام اليومي وللمناسبات النهارية.',
    price: 340,
    oldPrice: null,
    currency: 'SAR',
    size: '75 مل',
    gender: 'women',
    category: 'oriental',
    tags: ['floral'],
    notes: {
      top: ['زهر البرتقال', 'مندرين'],
      heart: ['ياسمين سامباك', 'توبروز'],
      base: ['مسك', 'خشب الصندل', 'فانيليا'],
    },
    ...img('zahr-al-yasmin'),
    featured: true,
    newArrival: true,
    bestseller: false,
    amazonUrl: 'https://www.amazon.sa/',
    sku: 'ATH-OR-010',
    availability: 'in_stock',
  },
];

export default products;
