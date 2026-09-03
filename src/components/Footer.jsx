import { Instagram, Mail, Phone } from 'lucide-react';
import BrandMark from './BrandMark';
import { SnapchatIcon, TikTokIcon, WhatsAppIcon } from './ui/Icons';
import { navLinks } from './Navbar';
import { content } from '../config/content';
import { siteConfig } from '../config/siteConfig';
import { formatIntlNumber, scrollToSection, whatsappLink } from '../lib/utils';

const socials = [
  { id: 'instagram', label: 'Instagram', href: siteConfig.instagramUrl, Icon: Instagram },
  { id: 'tiktok', label: 'TikTok', href: siteConfig.tiktokUrl, Icon: TikTokIcon },
  { id: 'snapchat', label: 'Snapchat', href: siteConfig.snapchatUrl, Icon: SnapchatIcon },
].filter((item) => Boolean(item.href));

/** تذييل الموقع */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-950 pb-[calc(76px+env(safe-area-inset-bottom))] pt-14 sm:pt-16 lg:pb-0">
      <div className="container-x">
        <div className="grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <BrandMark tone="light" />
            <p className="mt-5 max-w-sm text-[14px] leading-[1.85] text-ink-300">{content.footer.about}</p>

            {socials.length > 0 && (
              <ul className="mt-7 flex items-center gap-3">
                {socials.map(({ id, label, href, Icon }) => (
                  <li key={id}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="grid h-11 w-11 place-items-center rounded-[3px] border border-ivory-100/12 text-ink-200 transition-colors duration-300 hover:border-gold-400/60 hover:text-gold-300"
                    >
                      <Icon size={18} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label="روابط التذييل" className="lg:col-span-3">
            <h2 className="text-[14px] font-medium text-ivory-100">تصفّح</h2>
            <ul className="mt-5 columns-2 gap-x-6">
              {navLinks.map((link) => (
                <li key={link.id} className="mb-3.5 break-inside-avoid">
                  <a
                    href={`#${link.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToSection(link.id);
                    }}
                    className="text-[14px] text-ink-300 transition-colors duration-300 hover:text-gold-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="text-[14px] font-medium text-ivory-100">تواصل معنا</h2>
            <ul className="mt-5 space-y-4 text-[14px] text-ink-300">
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 transition-colors duration-300 hover:text-gold-300"
                >
                  <WhatsAppIcon size={17} className="text-gold-500" />
                  <span dir="ltr">{formatIntlNumber(siteConfig.whatsappNumber)}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-3 transition-colors duration-300 hover:text-gold-300"
                >
                  <Phone size={16} aria-hidden="true" className="text-gold-500" />
                  <span dir="ltr">{siteConfig.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-3 transition-colors duration-300 hover:text-gold-300"
                >
                  <Mail size={16} aria-hidden="true" className="text-gold-500" />
                  <span dir="ltr">{siteConfig.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-ivory-100/10 py-6 text-center sm:flex-row sm:text-start">
          <p className="text-[13px] text-ink-300">
            © {year} {siteConfig.brandName} — {content.footer.rightsLabel}
          </p>
          <p className="text-[13px] text-ink-300">{content.footer.builtLabel}</p>
        </div>
      </div>
    </footer>
  );
}
