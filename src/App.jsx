import { useCallback, useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import Categories from './components/Categories';
import Collection from './components/Collection';
import BrandStory from './components/BrandStory';
import TrustSection from './components/TrustSection';
import MarketplaceSection from './components/MarketplaceSection';
import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';
import MobileActionBar from './components/MobileActionBar';
import ProductModal from './components/ProductModal';
import { products } from './data/products';
import { siteConfig } from './config/siteConfig';
import { scrollToSection } from './lib/utils';

const BASE_TITLE = document.title;

export default function App() {
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('newest');
  const [activeProduct, setActiveProduct] = useState(null);
  const [overlayOpen, setOverlayOpen] = useState(false);

  const searchRef = useRef(null);
  const pushedHistory = useRef(false);

  /* مزامنة المنتج المفتوح مع رابط الصفحة ‎?p=slug‎ لتسهيل المشاركة */
  useEffect(() => {
    const readFromUrl = () => {
      const slug = new URLSearchParams(window.location.search).get('p');
      setActiveProduct(products.find((item) => item.slug === slug) || null);
    };

    readFromUrl();
    window.addEventListener('popstate', readFromUrl);
    return () => window.removeEventListener('popstate', readFromUrl);
  }, []);

  useEffect(() => {
    document.title = activeProduct
      ? `${activeProduct.name} — ${activeProduct.brand} | ${siteConfig.brandName}`
      : BASE_TITLE;
  }, [activeProduct]);

  const openProduct = useCallback((product) => {
    setActiveProduct(product);
    const url = new URL(window.location.href);
    url.searchParams.set('p', product.slug);
    window.history.pushState({ product: product.slug }, '', url);
    pushedHistory.current = true;
  }, []);

  const closeProduct = useCallback(() => {
    setActiveProduct(null);
    if (pushedHistory.current) {
      pushedHistory.current = false;
      window.history.back();
      return;
    }
    const url = new URL(window.location.href);
    url.searchParams.delete('p');
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
  }, []);

  const handleSelectCategory = useCallback((categoryId) => {
    setFilter(categoryId);
    setQuery('');
    scrollToSection('collection');
  }, []);

  const handleSearchAll = useCallback((value) => {
    setQuery(value);
    setFilter('all');
    scrollToSection('collection');
    window.setTimeout(() => searchRef.current?.focus({ preventScroll: true }), 600);
  }, []);

  return (
    <>
      <a
        href="#collection"
        onClick={(event) => {
          event.preventDefault();
          scrollToSection('collection');
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:end-4 focus:top-4 focus:z-[80] focus:rounded-[3px] focus:bg-ink-900 focus:px-5 focus:py-3 focus:text-[14px] focus:text-ivory-100"
      >
        تخطي إلى المجموعة
      </a>

      <Navbar
        onSelectProduct={openProduct}
        onSearchAll={handleSearchAll}
        onOverlayChange={setOverlayOpen}
      />

      <main id="main">
        <Hero />
        <FeaturedProducts onSelectProduct={openProduct} />
        <Categories onSelectCategory={handleSelectCategory} />
        <Collection
          filter={filter}
          onFilterChange={setFilter}
          query={query}
          onQueryChange={setQuery}
          sort={sort}
          onSortChange={setSort}
          onSelectProduct={openProduct}
          searchRef={searchRef}
        />
        <BrandStory />
        <TrustSection />
        <MarketplaceSection />
        <ContactCTA />
      </main>

      <Footer />
      <MobileActionBar hidden={Boolean(activeProduct) || overlayOpen} />
      <ProductModal product={activeProduct} onClose={closeProduct} />
    </>
  );
}
