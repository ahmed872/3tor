import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import EmptyState from './ui/EmptyState';
import ProductSkeleton from './ui/ProductSkeleton';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import { content } from '../config/content';
import { useCatalogue } from '../hooks/useCatalogue';
import { perfumeCount } from '../lib/utils';

/** المجموعة الكاملة مع البحث والتصنيف والترتيب */
export default function Collection({
  filter,
  onFilterChange,
  query,
  onQueryChange,
  sort,
  onSortChange,
  onSelectProduct,
  searchRef,
}) {
  const { loading, results, total } = useCatalogue({ filter, query, sort });
  const { collection: copy } = content;

  const resetAll = () => {
    onQueryChange('');
    onFilterChange('all');
  };

  return (
    <section
      id="collection"
      aria-labelledby="collection-title"
      className="bg-ivory-100 section-y"
    >
      <div className="container-x">
        <SectionHeading
          id="collection-title"
          eyebrow={copy.eyebrow}
          title={copy.title}
          subtitle={copy.subtitle}
        />

        <Reveal className="mt-8 space-y-4 sm:mt-10 sm:space-y-5">
          <SearchBar ref={searchRef} value={query} onChange={onQueryChange} />
          <FilterBar
            filter={filter}
            onFilterChange={onFilterChange}
            sort={sort}
            onSortChange={onSortChange}
          />
        </Reveal>

        <p
          className="mt-7 border-t border-ink-900/[0.08] pt-4 text-[13px] text-ink-400"
          role="status"
          aria-live="polite"
        >
          {loading && content.states.loading}
          {!loading && results.length === 0 && content.states.emptyStatus}
          {!loading &&
            results.length > 0 &&
            `عرض ${perfumeCount(results.length)} من أصل ${total}`}
        </p>

        <div className="mt-6">
          {loading && (
            <ul className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-11 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <li key={index}>
                  <ProductSkeleton />
                </li>
              ))}
            </ul>
          )}

          {!loading && results.length === 0 && <EmptyState onReset={resetAll} />}

          {!loading && results.length > 0 && (
            <ul className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-11 lg:grid-cols-4">
              {results.map((product, index) => (
                <Reveal as="li" key={product.id} delay={(index % 4) * 55}>
                  <ProductCard product={product} onSelect={onSelectProduct} />
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
