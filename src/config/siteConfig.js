/**
 * ⚙️ الإعدادات المركزية للموقع
 * Central business configuration — every phone number, link and brand detail
 * used anywhere in the UI comes from this file. Replace these values with the
 * client's real data before launch; nothing else needs to change.
 */
export const siteConfig = {
  // — الهوية / Brand identity —
  brandName: 'أثر',
  brandNameLatin: 'ATHAR',
  tagline: 'عطور مختارة بعناية',
  shortDescription:
    'مجموعة عطور منتقاة تجمع بين الفخامة والأناقة، مع تجربة شراء واضحة وسهلة.',

  // — التواصل / Contact —
  whatsappNumber: '966500000000', // بصيغة دولية بدون + أو مسافات
  phone: '+966 50 000 0000',
  email: 'hello@athar.example',

  // — الروابط الخارجية / External links —
  instagramUrl: 'https://www.instagram.com/',
  tiktokUrl: 'https://www.tiktok.com/',
  amazonStoreUrl: 'https://www.amazon.sa/',
  snapchatUrl: '', // اتركه فارغاً لإخفاء الأيقونة
  mapsUrl: '',

  // — العملة والموقع / Locale —
  currency: 'SAR',
  currencyLabel: 'ر.س',
  locale: 'ar-SA',
  siteUrl: 'https://athar.example',

  // — شريط الإعلان / Announcement bar —
  announcement: {
    enabled: true,
    text: 'شحن داخل المملكة العربية السعودية',
    secondaryText: 'للاستفسار والطلب عبر واتساب',
    linkLabel: 'تواصل معنا',
    linkHref: '#contact',
  },

  // — قالب رسالة واتساب / WhatsApp message templates —
  whatsapp: {
    generalMessage: 'السلام عليكم، أرغب في الاستفسار عن مجموعة العطور لديكم.',
    productMessage: ({ name, size, price, currencyLabel, sku }) =>
      `السلام عليكم،\nأرغب في الاستفسار عن عطر «${name}»${size ? ` (${size})` : ''} بسعر ${price} ${currencyLabel}.${sku ? `\nالرقم المرجعي: ${sku}` : ''}`,
  },
};

export default siteConfig;
