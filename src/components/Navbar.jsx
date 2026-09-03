import { useCallback, useEffect, useMemo, useState } from 'react';
import { Menu, Search, X } from 'lucide-react';
import AnnouncementBar from './AnnouncementBar';
import BrandMark from './BrandMark';
import MobileMenu from './MobileMenu';
import SearchOverlay from './SearchOverlay';
import { WhatsAppIcon } from './ui/Icons';
import { siteConfig } from '../config/siteConfig';
import { cn, scrollToSection, whatsappLink } from '../lib/utils';
import { useScrolled } from '../hooks/useScrolled';
import { useActiveSection } from '../hooks/useActiveSection';

/**
 * روابط التنقل — مرتّبة بنفس ترتيب ظهور الأقسام في الصفحة من الأعلى إلى الأسفل.
 * Single source of truth for the desktop navbar, the mobile menu and the footer,
 * kept in the same order as the sections render in App.jsx.
 */
export const navLinks = [
  { id: 'home', label: 'الرئيسية' },
  { id: 'featured', label: 'مختاراتنا' },
  { id: 'categories', label: 'التصنيفات' },
  { id: 'collection', label: 'المجموعة' },
  { id: 'about', label: 'من نحن' },
  { id: 'trust', label: 'لماذا أثر' },
  { id: 'marketplace', label: 'قنوات الشراء' },
  { id: 'contact', label: 'تواصل معنا' },
];

const SECTION_IDS = navLinks.map((link) => link.id);

/** شريط تنقل ثابت يتحول من شفاف فوق الواجهة إلى خلفية صلبة عند التمرير */
export default function Navbar({ onSelectProduct, onSearchAll, onOverlayChange }) {
  const scrolled = useScrolled(28);
  const active = useActiveSection(SECTION_IDS);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // فوق قائمة الجوال الداكنة يبقى الشريط داكناً، وإلا يتحول إلى خلفية فاتحة بعد التمرير
  const solid = scrolled && !menuOpen;

  useEffect(() => {
    onOverlayChange?.(menuOpen || searchOpen);
  }, [menuOpen, searchOpen, onOverlayChange]);

  const handleNavigate = useCallback((id) => {
    setMenuOpen(false);
    scrollToSection(id);
  }, []);

  const generalWhatsapp = useMemo(() => whatsappLink(), []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <AnnouncementBar collapsed={scrolled || menuOpen} />

        <div
          className={cn(
            'border-b transition-all duration-500 ease-smooth',
            menuOpen
              ? 'border-ivory-100/10 bg-ink-950'
              : solid
                ? 'border-ink-900/10 bg-ivory-100/95 shadow-[0_1px_24px_-12px_rgba(16,16,20,0.35)] backdrop-blur-md'
                : 'border-transparent bg-gradient-to-b from-ink-950/55 to-transparent',
          )}
        >
          <div className="container-x flex h-[68px] items-center justify-between gap-4 lg:h-20">
            <a
              href="#home"
              onClick={(event) => {
                event.preventDefault();
                handleNavigate('home');
              }}
              aria-label={`${siteConfig.brandName} — الصفحة الرئيسية`}
            >
              <BrandMark tone={solid ? 'dark' : 'light'} />
            </a>

            <nav aria-label="التنقل الرئيسي" className="hidden lg:block">
              <ul className="flex items-center gap-5 xl:gap-8">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={(event) => {
                        event.preventDefault();
                        handleNavigate(link.id);
                      }}
                      aria-current={active === link.id ? 'true' : undefined}
                      className={cn(
                        'group relative block py-2 text-[14px] transition-colors duration-300 xl:text-[15px]',
                        solid
                          ? active === link.id
                            ? 'text-ink-900'
                            : 'text-ink-400 hover:text-ink-900'
                          : active === link.id
                            ? 'text-ivory-100'
                            : 'text-ivory-100/70 hover:text-ivory-100',
                      )}
                    >
                      {link.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          'absolute inset-x-0 -bottom-0.5 h-px origin-center bg-gold-400 transition-transform duration-300 ease-smooth',
                          active === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                        )}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="البحث في المجموعة"
                className={cn(
                  'grid h-11 w-11 place-items-center rounded-[3px] transition-colors duration-300',
                  solid
                    ? 'text-ink-600 hover:bg-ink-900/[0.05] hover:text-ink-900'
                    : 'text-ivory-100/85 hover:bg-ivory-100/10 hover:text-ivory-100',
                )}
              >
                <Search size={19} aria-hidden="true" />
              </button>

              <a
                href={generalWhatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'hidden h-11 items-center gap-2 rounded-[3px] border px-4 text-[14px] transition-colors duration-300 sm:inline-flex',
                  solid
                    ? 'border-ink-900/15 text-ink-700 hover:border-gold-400 hover:text-ink-900'
                    : 'border-ivory-100/25 text-ivory-100 hover:border-gold-300 hover:text-gold-200',
                )}
              >
                <WhatsAppIcon size={17} />
                <span>واتساب</span>
              </a>

              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className={cn(
                  'grid h-11 w-11 place-items-center rounded-[3px] transition-colors duration-300 lg:hidden',
                  solid
                    ? 'text-ink-700 hover:bg-ink-900/[0.05]'
                    : 'text-ivory-100 hover:bg-ivory-100/10',
                )}
              >
                {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        active={active}
        onClose={() => setMenuOpen(false)}
        onNavigate={handleNavigate}
      />

      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={(product) => {
          setSearchOpen(false);
          onSelectProduct(product);
        }}
        onSearchAll={(query) => {
          setSearchOpen(false);
          onSearchAll(query);
        }}
      />
    </>
  );
}
