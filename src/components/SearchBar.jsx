import { forwardRef } from 'react';
import { Search, X } from 'lucide-react';

/** حقل بحث فوري داخل المجموعة */
const SearchBar = forwardRef(function SearchBar({ value, onChange, id = 'collection-search' }, ref) {
  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">
        ابحث باسم العطر أو العلامة التجارية أو الملاحظات
      </label>
      <Search
        size={18}
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 start-4 my-auto text-ink-300"
      />
      <input
        id={id}
        ref={ref}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="ابحث باسم العطر، العلامة، أو الملاحظات..."
        className="h-[52px] w-full rounded-[3px] border border-ink-900/10 bg-ivory-50 py-3.5 pe-12 ps-12 text-[15px] text-ink-900 transition-colors duration-300 placeholder:text-ink-300 hover:border-ink-900/20 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400/40"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="مسح البحث"
          className="absolute inset-y-0 end-2 my-auto grid h-9 w-9 place-items-center rounded-[3px] text-ink-400 transition-colors hover:bg-ink-900/5 hover:text-ink-900"
        >
          <X size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );
});

export default SearchBar;
