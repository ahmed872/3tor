import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Search, X } from 'lucide-react';
import SmartImage from './ui/SmartImage';
import { products } from '../data/products';
import { formatPrice, searchProducts } from '../lib/utils';
import { useDialog } from '../hooks/useDialog';

const SUGGESTIONS = ['عود', 'ورد', 'مسك', 'زعفران', 'رجالي', 'نسائي'];

/** بحث فوري بنافذة علوية مع نتائج مباشرة */
export default function SearchOverlay({ open, onClose, onSelectProduct, onSearchAll }) {
  const containerRef = useDialog(open, onClose);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  const results = useMemo(
    () => (query.trim() ? searchProducts(products, query).slice(0, 6) : []),
    [query],
  );

  if (!open) return null;

  const trimmed = query.trim();

  return (
    <div className="fixed inset-0 z-[60] animate-fade-in">
      <button
        type="button"
        aria-label="إغلاق البحث"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-ink-950/70 backdrop-blur-sm"
        tabIndex={-1}
      />

      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-label="البحث في المجموعة"
        className="container-x relative pt-[76px] sm:pt-24"
      >
        <div className="mx-auto max-w-2xl animate-scale-in overflow-hidden rounded-[4px] border border-ink-900/10 bg-ivory-50 shadow-modal">
          <div className="flex items-center gap-3 border-b border-ink-900/10 px-4 sm:px-5">
            <Search size={19} className="shrink-0 text-gold-500" aria-hidden="true" />
            <input
              data-autofocus
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && trimmed) onSearchAll(trimmed);
              }}
              placeholder="ابحث باسم العطر، العلامة، أو الملاحظات..."
              aria-label="ابحث في المجموعة"
              className="h-16 w-full border-0 bg-transparent text-[15px] text-ink-900 placeholder:text-ink-300 focus:outline-none"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="إغلاق البحث"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-[3px] text-ink-400 transition-colors hover:bg-ink-900/5 hover:text-ink-900"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          <div className="max-h-[58vh] overflow-y-auto overscroll-contain">
            {!trimmed && (
              <div className="px-5 py-6">
                <p className="text-[13px] text-ink-400">عمليات بحث مقترحة</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {SUGGESTIONS.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setQuery(item)}
                      className="rounded-[3px] border border-ink-900/10 px-3.5 py-2 text-[13px] text-ink-600 transition-colors hover:border-gold-400 hover:text-ink-900"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {trimmed && results.length === 0 && (
              <p className="px-5 py-10 text-center text-[14px] text-ink-400">
                لا توجد نتائج مطابقة لـ «{trimmed}»
              </p>
            )}

            {results.length > 0 && (
              <ul className="divide-y divide-ink-900/[0.07]">
                {results.map((product) => (
                  <li key={product.id}>
                    <button
                      type="button"
                      onClick={() => onSelectProduct(product)}
                      className="flex w-full items-center gap-4 px-4 py-3.5 text-start transition-colors hover:bg-ivory-100 sm:px-5"
                    >
                      <SmartImage
                        src={product.image}
                        alt={`عطر ${product.name} من ${product.brand}`}
                        className="h-16 w-14 shrink-0 rounded-[2px]"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[15px] text-ink-900">{product.name}</span>
                        <span className="mt-1 block truncate text-[13px] text-ink-400">
                          {product.brand} · {product.size}
                        </span>
                      </span>
                      <span className="shrink-0 text-[14px] text-gold-600">
                        {formatPrice(product.price)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {trimmed && (
            <button
              type="button"
              onClick={() => onSearchAll(trimmed)}
              className="flex w-full items-center justify-between gap-3 border-t border-ink-900/10 bg-ivory-100 px-5 py-4 text-[14px] text-ink-700 transition-colors hover:bg-ivory-200"
            >
              <span>عرض كل النتائج في المجموعة</span>
              <ArrowLeft size={17} aria-hidden="true" className="text-gold-600" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
