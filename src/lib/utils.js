import { siteConfig } from '../config/siteConfig';

/** دمج أصناف tailwind بشكل مشروط */
export const cn = (...classes) => classes.filter(Boolean).join(' ');

const numberFormatter = new Intl.NumberFormat('ar-SA-u-nu-latn', {
  maximumFractionDigits: 0,
});

/** تنسيق الرقم فقط (بدون عملة) */
export const formatNumber = (value) => numberFormatter.format(value ?? 0);

/** تنسيق السعر مع رمز العملة */
export const formatPrice = (value) => `${numberFormatter.format(value ?? 0)} ${siteConfig.currencyLabel}`;

/** نسبة التوفير عند وجود سعر قديم */
export const discountPercent = (price, oldPrice) =>
  oldPrice && oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

/** رابط واتساب عام أو برسالة مخصصة */
export const whatsappLink = (message = siteConfig.whatsapp.generalMessage) =>
  `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;

/** رابط واتساب خاص بمنتج معيّن */
export const productWhatsappLink = (product) =>
  whatsappLink(
    siteConfig.whatsapp.productMessage({
      name: product.name,
      size: product.size,
      price: formatNumber(product.price),
      currencyLabel: siteConfig.currencyLabel,
      sku: product.sku,
    }),
  );

/** صياغة عدد العطور بشكل صحيح نحوياً */
export const perfumeCount = (count) => {
  if (count === 0) return 'لا توجد عطور';
  if (count === 1) return 'عطر واحد';
  if (count === 2) return 'عطران';
  if (count <= 10) return `${formatNumber(count)} عطور`;
  return `${formatNumber(count)} عطراً`;
};

/** تنسيق رقم دولي للعرض: 966500000000 ← ‎+966 50 000 0000‎ */
export const formatIntlNumber = (digits = '') => {
  const clean = String(digits).replace(/\D/g, '');
  if (clean.length < 9) return `+${clean}`;
  const country = clean.slice(0, clean.length - 9);
  const rest = clean.slice(-9);
  return `+${country} ${rest.slice(0, 2)} ${rest.slice(2, 5)} ${rest.slice(5)}`;
};

/** نص البحث المجمّع لكل منتج */
const haystack = (product) =>
  [
    product.name,
    product.brand,
    product.size,
    product.sku,
    ...(product.tags || []),
    ...product.notes.top,
    ...product.notes.heart,
    ...product.notes.base,
  ]
    .join(' ')
    .toLowerCase();

/** تطبيع النص العربي للبحث (إزالة التشكيل وتوحيد الألف والهاء) */
export const normalizeArabic = (value = '') =>
  value
    .toLowerCase()
    .replace(/[ً-ٰٟـ]/g, '')
    .replace(/[إأآا]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/[ؤئ]/g, 'ء')
    .trim();

/** بحث فوري في الاسم والعلامة والملاحظات */
export const searchProducts = (list, query) => {
  const q = normalizeArabic(query);
  if (!q) return list;
  const terms = q.split(/\s+/).filter(Boolean);
  return list.filter((product) => {
    const text = normalizeArabic(haystack(product));
    return terms.every((term) => text.includes(term));
  });
};

/** ترتيب المنتجات حسب الخيار المحدد */
export const sortProducts = (list, sortId) => {
  const copy = [...list];
  switch (sortId) {
    case 'price-asc':
      return copy.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return copy.sort((a, b) => b.price - a.price);
    case 'name':
      return copy.sort((a, b) => a.name.localeCompare(b.name, 'ar'));
    case 'newest':
    default:
      return copy.sort(
        (a, b) => Number(b.newArrival) - Number(a.newArrival) || b.id - a.id,
      );
  }
};

/** شارة المنتج المعتمدة على البيانات فقط */
export const productBadge = (product) => {
  if (product.newArrival) return { label: 'جديد', tone: 'new' };
  if (product.bestseller) return { label: 'الأكثر طلباً', tone: 'best' };
  if (product.featured) return { label: 'مميز', tone: 'featured' };
  return null;
};

/** تمرير سلس إلى قسم مع مراعاة الشريط العلوي الثابت */
export const scrollToSection = (id) => {
  const target = document.getElementById(id);
  if (!target) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
};
