import { SearchX } from 'lucide-react';
import { content } from '../../config/content';

/** حالة "لا توجد نتائج" بتصميم متناسق مع بقية الموقع */
export default function EmptyState({ onReset }) {
  return (
    <div className="card-surface flex flex-col items-center justify-center px-6 py-16 text-center sm:py-20">
      <span
        aria-hidden="true"
        className="grid h-14 w-14 place-items-center rounded-full border border-gold-400/40 text-gold-600"
      >
        <SearchX size={22} />
      </span>
      <p className="mt-5 text-[18px] text-ink-900">{content.states.emptyTitle}</p>
      <p className="mt-2 max-w-sm text-[14px] leading-[1.8] text-ink-400">{content.states.emptyBody}</p>
      <button type="button" onClick={onReset} className="btn-outline mt-7">
        {content.states.emptyAction}
      </button>
    </div>
  );
}
