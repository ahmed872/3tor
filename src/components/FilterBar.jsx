import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import { filters, sortOptions } from '../data/categories';
import { cn } from '../lib/utils';

/** فلاتر التصنيف وخيارات الترتيب */
export default function FilterBar({ filter, onFilterChange, sort, onSortChange }) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div
        role="group"
        aria-label="تصفية حسب التصنيف"
        className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-wrap lg:px-0"
      >
        {filters.map((item) => {
          const active = item.id === filter;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onFilterChange(item.id)}
              aria-pressed={active}
              className={cn(
                'shrink-0 rounded-[3px] border px-4 py-2.5 text-[14px] transition-all duration-300 ease-smooth',
                active
                  ? 'border-ink-900 bg-ink-900 text-ivory-100'
                  : 'border-ink-900/12 bg-ivory-50 text-ink-500 hover:border-ink-900/35 hover:text-ink-900',
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="relative w-full shrink-0 lg:w-auto">
        <label htmlFor="sort-select" className="sr-only">
          ترتيب النتائج
        </label>
        <SlidersHorizontal
          size={16}
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 start-3.5 my-auto text-gold-600"
        />
        <select
          id="sort-select"
          value={sort}
          onChange={(event) => onSortChange(event.target.value)}
          className="h-12 w-full appearance-none lg:min-w-[230px] rounded-[3px] border border-ink-900/12 bg-ivory-50 pe-10 ps-10 text-[14px] text-ink-700 transition-colors duration-300 hover:border-ink-900/30 focus:border-gold-400 focus:outline-none"
        >
          {sortOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 end-3.5 my-auto text-ink-400"
        />
      </div>
    </div>
  );
}
