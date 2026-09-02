import { siteConfig } from '../config/siteConfig';
import { cn } from '../lib/utils';

/** شعار نصي بسيط للعلامة (يُستبدل بشعار العميل عند توفره) */
export default function BrandMark({ tone = 'dark', className, compact = false }) {
  const light = tone === 'light';

  return (
    <span className={cn('flex items-center gap-3', className)}>
      <span
        className={cn(
          'grid h-9 w-9 shrink-0 place-items-center rounded-[3px] border transition-colors duration-500',
          light ? 'border-gold-300/45' : 'border-gold-400/60',
        )}
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none">
          <path
            d="M12 3 L19 12 L12 21 L5 12 Z"
            stroke="currentColor"
            strokeWidth="1.3"
            className="text-gold-400"
          />
          <path d="M12 8.4 L15.4 12 L12 15.6 L8.6 12 Z" fill="currentColor" className="text-gold-400" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'text-[19px] font-medium transition-colors duration-500',
            light ? 'text-ivory-100' : 'text-ink-900',
          )}
        >
          {siteConfig.brandName}
        </span>
        {!compact && (
          <span
            className={cn(
              'latin-caps mt-1.5 text-[9px] transition-colors duration-500',
              light ? 'text-gold-300/80' : 'text-gold-600/80',
            )}
          >
            {siteConfig.brandNameLatin}
          </span>
        )}
      </span>
    </span>
  );
}
