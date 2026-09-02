import { Instagram, Mail, Phone } from 'lucide-react';
import Reveal from './ui/Reveal';
import { WhatsAppIcon } from './ui/Icons';
import { content } from '../config/content';
import { siteConfig } from '../config/siteConfig';
import { whatsappLink } from '../lib/utils';

/** دعوة التواصل النهائية */
export default function ContactCTA() {
  const { contact } = content;

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="bg-ivory-50 py-20 sm:py-24 lg:py-28"
    >
      <div className="container-x">
        <Reveal className="relative isolate overflow-hidden rounded-[5px] border border-ink-900/10 bg-ink-950 px-6 py-14 text-center sm:px-10 sm:py-16 lg:py-20">
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <span className="absolute inset-0 bg-[radial-gradient(80%_80%_at_50%_0%,#26272D_0%,#0E0E11_65%,#08080A_100%)]" />
            <span className="absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-gold-500/15 blur-[100px]" />
          </span>

          <span className="eyebrow eyebrow-light justify-center">{contact.eyebrow}</span>
          <h2
            id="contact-title"
            className="heading-lg mx-auto mt-5 max-w-2xl font-medium text-ivory-100"
          >
            {contact.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-8 text-ink-200">
            {contact.subtitle}
          </p>

          <div className="mx-auto mt-9 flex max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp px-8"
            >
              <WhatsAppIcon size={19} />
              <span>{contact.whatsappCta}</span>
            </a>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-light px-8"
            >
              <Instagram size={18} aria-hidden="true" />
              <span>{contact.instagramCta}</span>
            </a>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 border-t border-ivory-100/10 pt-8 text-[14px] text-ink-300 sm:flex-row sm:gap-8">
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2.5 transition-colors hover:text-gold-300"
            >
              <Phone size={16} aria-hidden="true" className="text-gold-500" />
              <span dir="ltr">{siteConfig.phone}</span>
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2.5 transition-colors hover:text-gold-300"
            >
              <Mail size={16} aria-hidden="true" className="text-gold-500" />
              <span dir="ltr">{siteConfig.email}</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
