import { useEffect, useMemo, useState } from 'react';
import { products as catalogue } from '../data/products';
import { getFilter } from '../data/categories';
import { searchProducts, sortProducts } from '../lib/utils';

/**
 * إدارة حالة المجموعة: التحميل، البحث، التصنيف، والترتيب.
 * The data is local, but the short async phase gives the collection a real
 * loading state instead of content popping in.
 */
export function useCatalogue({ filter, query, sort }) {
  const [items, setItems] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const timer = window.setTimeout(() => {
      if (!cancelled) setItems(catalogue);
    }, 350);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  const results = useMemo(() => {
    if (!items) return [];
    const matcher = getFilter(filter).match;
    return sortProducts(searchProducts(items.filter(matcher), query), sort);
  }, [items, filter, query, sort]);

  return { loading: items === null, results, total: items?.length ?? 0 };
}
