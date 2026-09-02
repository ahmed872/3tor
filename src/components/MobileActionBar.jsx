import { LayoutGrid } from 'lucide-react';
import { WhatsAppIcon } from './ui/Icons';
import { cn, scrollToSection, whatsappLink } from '../lib/utils';
import { useScrolled } from '../hooks/useScrolled';

/** شريط إجراءات سفلي للجوال يظهر بعد تجاوز الواجهة الرئيسية */
export default function MobileActionBar({ hidden = false }) {
  const visible = useScrolled(520) && !hidden;

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 border-t border-ink-900/10 bg-ivory-50/95 backdrop-blur-md transition-transform duration-500 ease-smooth lg:hidden',
        visible ? 'translate-y-0' : 'translate-y-full',
      )}
      aria-hidden={!visible}
    >
      <div className="container-x flex items-center gap-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? 0 : -1}
          className="btn-whatsapp flex-1"
        >
          <WhatsAppIcon size={18} />
          <span>تواصل عبر واتساب</span>
        </a>
        <button
          type="button"
          onClick={() => scrollToSection('collection')}
          tabIndex={visible ? 0 : -1}
          aria-label="الانتقال إلى المجموعة"
          className="btn-outline w-14 px-0"
        >
          <LayoutGrid size={19} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
