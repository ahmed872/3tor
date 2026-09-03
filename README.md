# أثر — Athar | Premium Perfume Website

A production-ready, Arabic-first (RTL) frontend for a Saudi perfume seller.
Built with **React + Vite + Tailwind CSS + lucide-react**. No backend, no
database, no authentication — all product data is local, and every interaction
(search, filtering, sorting, product details, WhatsApp and Amazon ordering)
works entirely in the browser.

---

## Quick start

```bash
npm install     # تثبيت الحزم
npm run dev     # خادم التطوير  → http://localhost:5173
npm run build   # نسخة الإنتاج  → dist/
npm run preview # معاينة نسخة الإنتاج
npm run art     # إعادة توليد صور العطور (SVG)
```

Node 18+ is required.

---

## What the client must replace before launch

Everything business-specific lives in **two files**.

### 1. `src/config/siteConfig.js` — business data

| Key | Current placeholder | Replace with |
| --- | --- | --- |
| `brandName` / `brandNameLatin` | `أثر` / `ATHAR` | Real brand name |
| `tagline`, `shortDescription` | demo copy | Real positioning line |
| `whatsappNumber` | `966500000000` | Real number, international format, digits only |
| `phone` | `+966 50 000 0000` | Real phone |
| `email` | `hello@athar.example` | Real email |
| `instagramUrl`, `tiktokUrl`, `snapchatUrl` | generic profiles | Real profiles (leave `''` to hide the icon) |
| `amazonStoreUrl` | `https://www.amazon.sa/` | Real Amazon storefront |
| `siteUrl` | `https://athar.example` | Real domain (used by SEO/structured data) |
| `announcement` | shipping notice | Any confirmed announcement, or `enabled: false` |
| `whatsapp.productMessage` | message template | Preferred wording |
| `currency`, `currencyLabel`, `locale` | `SAR`, `ر.س`, `ar-SA` | Only if selling outside Saudi Arabia |

### 2. `src/config/content.js` — all editorial copy

Hero, section headings, brand story, trust points, marketplace and contact copy.
No claims about guarantees, certifications, awards, reviews, delivery times or
customer numbers are made anywhere — add them here only if the client confirms them.

### 3. `src/data/products.js` — the catalogue

Ten demo products. Replace with real ones using the same shape:

```js
{
  id, slug, name, brand, description,
  price, oldPrice, currency: 'SAR', size,
  gender: 'men' | 'women' | 'unisex',
  category: 'oriental' | 'western',
  tags: ['luxury', ...],                  // "luxury" feeds the فاخر filter
  notes: { top: [], heart: [], base: [] },
  image, gallery: [],
  featured, newArrival, bestseller,        // badges are data-driven only
  amazonUrl,                               // ← real Amazon product link
  sku,
  availability: 'in_stock' | 'low_stock' | 'out_of_stock',
}
```

### 4. Images

Product photography goes in `public/images/products/` (4:5 portrait works best).
Point `image` and `gallery` at the new files. The demo artwork is generated
vector art (`npm run art`, source: `scripts/generate-art.mjs`) — delete it once
real photography exists. `public/og-image.svg` should be replaced with a real
1200×630 share image, and `public/favicon.svg` with the client's logo.
Missing or failed images degrade to a designed placeholder, never a broken icon.

### 5. Head metadata

Title, description, Open Graph and canonical URL are in `index.html`.

---

## Structure

```
src/
├── components/            # واجهة المستخدم
│   ├── ui/                # SmartImage, Reveal, SectionHeading, EmptyState, …
│   ├── AnnouncementBar, Navbar, MobileMenu, SearchOverlay
│   ├── Hero, FeaturedProducts, Categories, Collection
│   ├── SearchBar, FilterBar, ProductCard, ProductModal, FragranceNotes
│   ├── BrandStory, TrustSection, MarketplaceSection, ContactCTA
│   └── Footer, MobileActionBar, BrandMark
├── config/                # siteConfig.js (business) + content.js (copy)
├── data/                  # products.js + categories.js (filters & labels)
├── hooks/                 # useCatalogue, useDialog, useReveal, useScrolled, …
├── lib/                   # utils.js (search/sort/format/WhatsApp), seo.js
├── App.jsx, main.jsx, index.css, fonts.css
```

## Notes

- **RTL**: `dir="rtl"` with Tailwind logical properties (`ps/pe`, `ms/me`,
  `start/end`) throughout. Arabic text is never letter-spaced.
- **Fonts**: IBM Plex Sans Arabic (300/400/500) + Cormorant Garamond (400),
  self-hosted in `public/fonts` — no third-party font requests at runtime. Only
  the weights the UI uses are bundled; add a face to `src/fonts.css` if new copy
  needs one.
- **Product links**: opening a product pushes `?p=<slug>` so a product view can
  be shared; `Escape`, the back button and the close button all restore the page.
- **Accessibility**: semantic landmarks, single `h1`, focus-visible rings, focus
  trapping and focus restore in every overlay, `aria-label`s on icon-only
  controls, 48px minimum touch targets, and `prefers-reduced-motion` support.
- **Performance**: lazy-loaded images, no animation library, no router,
  three runtime dependencies (react, react-dom, lucide-react).
