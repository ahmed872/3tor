/**
 * ✍️ نصوص الموقع التحريرية
 * All editorial copy in one place so it can be rewritten by the client without
 * touching any component. No business claims (guarantees, certifications,
 * statistics or reviews) are made here — add them only if the client confirms them.
 */
import { siteConfig } from './siteConfig';

export const content = {
  hero: {
    eyebrow: 'مجموعة مختارة',
    title: ['عطرك...', 'توقيعك الخاص'],
    subtitle:
      'اكتشف مجموعة مختارة من العطور التي تجمع بين الفخامة، الأناقة، والشخصية — بروائح تبقى في الذاكرة.',
    primaryCta: 'اكتشف المجموعة',
    secondaryCta: 'تواصل معنا',
    stats: [
      { value: 'عود وبخور', label: 'عائلات شرقية' },
      { value: 'زهور وحمضيات', label: 'عائلات غربية' },
      { value: 'للجنسين', label: 'خيارات متنوعة' },
    ],
  },

  featured: {
    eyebrow: 'الأكثر تميّزاً',
    title: 'مختاراتنا',
    subtitle: 'اكتشف العطور الأكثر تميزاً في مجموعتنا.',
    cta: 'عرض المجموعة كاملة',
  },

  categories: {
    eyebrow: 'تصفّح حسب',
    title: 'التصنيفات',
    subtitle: 'اختر العائلة العطرية التي تناسب ذوقك ومناسبتك.',
  },

  collection: {
    eyebrow: 'كل العطور',
    title: 'المجموعة',
    subtitle: 'ابحث، صنّف، ورتّب حتى تصل إلى عطرك المفضل.',
  },

  story: {
    eyebrow: 'عن العلامة',
    title: 'أثرٌ يبقى بعد الرحيل',
    paragraphs: [
      'نختار مجموعتنا بعناية لنقدّم تجربة عطور تجمع بين الذوق الرفيع والتنوع، من العود الشرقي الدافئ إلى الزهور الغربية الأنيقة.',
      'كل عطر في المجموعة يمر باختيار دقيق من حيث التركيبة، الثبات، والانطباع الذي يتركه — لأن العطر ليس تفصيلاً عابراً، بل توقيع شخصي يعرفك به من حولك.',
    ],
    points: ['اختيار دقيق للتركيبات', 'تنوّع بين الشرقي والغربي', 'وضوح في المعلومات والأسعار'],
    cta: 'تعرّف على المجموعة',
  },

  trust: {
    eyebrow: 'لماذا أثر',
    title: 'تجربة عطور بمعايير واضحة',
    subtitle: 'نركّز على ما يهم فعلاً: اختيار جيد، معلومات صادقة، وتواصل مباشر.',
    // عدّل هذه النقاط حسب ما يؤكده العميل فقط
    items: [
      {
        icon: 'sparkles',
        title: 'اختيار بعناية',
        description: 'كل عطر يُضاف إلى المجموعة بعد اختيار مدروس للتركيبة والانطباع العام.',
      },
      {
        icon: 'layers',
        title: 'تنوّع مميز',
        description: 'عائلات عطرية متعددة بين الشرقي والغربي، للرجال والنساء وللجنسين.',
      },
      {
        icon: 'tag',
        title: 'أسعار واضحة',
        description: 'السعر والحجم مذكوران بوضوح لكل عطر، دون رسوم أو تفاصيل مخفية.',
      },
      {
        icon: 'message',
        title: 'تواصل مباشر',
        description: 'فريقنا متاح عبر واتساب لمساعدتك في اختيار العطر المناسب لك.',
      },
    ],
  },

  marketplace: {
    eyebrow: 'قنوات الشراء',
    title: 'تسوّق بالطريقة التي تناسبك',
    subtitle: 'اطلب مباشرة عبر واتساب، أو أكمل عملية الشراء عبر متجرنا على Amazon.',
    channels: [
      {
        id: 'amazon',
        title: 'الشراء عبر Amazon',
        description: 'أكمل طلبك عبر منصة Amazon باستخدام حسابك وطرق الدفع المتاحة لديها.',
        action: 'زيارة متجرنا',
      },
      {
        id: 'whatsapp',
        title: 'الطلب عبر واتساب',
        description: 'راسلنا مباشرة لاختيار العطر المناسب وإتمام تفاصيل طلبك خطوة بخطوة.',
        action: 'ابدأ المحادثة',
      },
    ],
    note: 'تختلف تفاصيل الشحن والدفع حسب القناة التي تختارها.',
  },

  contact: {
    eyebrow: 'تواصل معنا',
    title: 'هل تبحث عن عطرك القادم؟',
    subtitle: 'تواصل معنا وسنساعدك في الوصول إلى اختيارك المناسب.',
    whatsappCta: 'تواصل عبر واتساب',
    instagramCta: 'Instagram',
  },

  footer: {
    about: siteConfig.shortDescription,
    rightsLabel: 'جميع الحقوق محفوظة',
    builtLabel: 'صُمم بعناية في المملكة العربية السعودية',
  },

  // — الحالات الفارغة والتحميل / states —
  states: {
    loading: 'جارٍ تحميل المجموعة...',
    emptyStatus: 'لم نعثر على عطور مطابقة',
    emptyTitle: 'لا توجد نتائج مطابقة',
    emptyBody: 'جرّب تعديل كلمات البحث أو اختيار تصنيف آخر لعرض عطور أخرى.',
    emptyAction: 'إعادة ضبط البحث',
    imageFallback: 'الصورة غير متوفرة',
  },
};

export default content;
