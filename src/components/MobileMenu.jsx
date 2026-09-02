import { Instagram, Mail, Phone } from 'lucide-react';
import { navLinks } from './Navbar';
import { TikTokIcon, WhatsAppIcon } from './ui/Icons';
import { siteConfig } from '../config/siteConfig';
import { cn, whatsappLink } from '../lib/utils';
import { useDialog } from '../hooks/useDialog';

/** قائمة الجوال بملء الشاشة مع مساحات لمس مريحة */
export default function MobileMenu({ open, active, onClose, onNavigate }) {
  const containerRef = useDialog(open, onClose);

  if (!open) return null;

  return (
    <div
      id="mobile-menu"
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="قائمة التنقل"
      tabIndex={-1}
      className="fixed inset-0 z-40 flex animate-fade-in flex-col bg-ink-950 pt-[68px] lg:hidden"
    >
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <nav aria-label="التنقل في الجوال" className="container-x pt-6">
          <ul className="divide-y divide-ivory-100/10 border-y border-ivory-100/10">
            {navLinks.map((link, index) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    onNavigate(link.id);
                  }}
                  style={{ animationDelay: `${index * 45}ms` }}
                  className={cn(
                    'flex animate-slide-down items-center justify-between py-5 text-xl transition-colors',
                    active === link.id ? 'text-gold-300' : 'text-ivory-100 hover:text-gold-200',
                  )}
                >
                  <span>{link.label}</span>
                  <span className="latin text-xs text-ink-400">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="container-x mt-8 space-y-3 pb-10">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp w-full"
          >
            <WhatsAppIcon size={19} />
            <span>تواصل عبر واتساب</span>
          </a>

          <div className="grid grid-cols-2 gap-3">
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-light"
            >
              <Instagram size={18} aria-hidden="true" />
              <span>Instagram</span>
            </a>
            <a
              href={siteConfig.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-light"
            >
              <TikTokIcon size={18} />
              <span>TikTok</span>
            </a>
          </div>

          <div className="space-y-3 pt-6 text-[14px] text-ink-300">
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-3 transition-colors hover:text-gold-200"
            >
              <Phone size={16} aria-hidden="true" className="text-gold-500" />
              <span dir="ltr">{siteConfig.phone}</span>
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-3 transition-colors hover:text-gold-200"
            >
              <Mail size={16} aria-hidden="true" className="text-gold-500" />
              <span dir="ltr">{siteConfig.email}</span>
            </a>
          </div>

          <p className="mt-10 border-t border-ivory-100/10 pt-6 text-[12.5px] text-ink-400">
            {siteConfig.brandName} — {siteConfig.tagline}
          </p>
        </div>
      </div>
    </div>
  );
}
