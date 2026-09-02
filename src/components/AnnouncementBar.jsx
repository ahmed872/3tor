import { Truck } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { cn } from '../lib/utils';

/** شريط إعلان علوي يختفي بهدوء عند بدء التمرير */
export default function AnnouncementBar({ collapsed = false }) {
  const { announcement } = siteConfig;
  if (!announcement.enabled) return null;

  return (
    <div
      className={cn(
        'overflow-hidden bg-ink-950 transition-all duration-500 ease-smooth',
        collapsed ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100',
      )}
    >
      <div className="container-x flex h-10 items-center justify-center gap-3 text-[12.5px] text-ivory-200/80">
        <Truck size={15} className="shrink-0 text-gold-400" aria-hidden="true" />
        <p className="truncate">{announcement.text}</p>
        {announcement.secondaryText && (
          <>
            <span className="hidden h-3 w-px bg-ink-500 sm:block" aria-hidden="true" />
            <p className="hidden truncate sm:block">{announcement.secondaryText}</p>
          </>
        )}
      </div>
    </div>
  );
}
