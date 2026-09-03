import { ArrowLeft } from 'lucide-react';
import Reveal from './ui/Reveal';
import { AmazonIcon, WhatsAppIcon } from './ui/Icons';
import { content } from '../config/content';
import { siteConfig } from '../config/siteConfig';
import { whatsappLink } from '../lib/utils';

/** قنوات الشراء المتاحة: Amazon وواتساب */
export default function MarketplaceSection() {
  const { marketplace } = content;

  const channelProps = {
    amazon: {
      href: siteConfig.amazonStoreUrl,
      icon: <AmazonIcon size={22} className="text-gold-300" />,
      accent: 'hover:border-gold-400/60',
    },
    whatsapp: {
      href: whatsappLink(),
      icon: <WhatsAppIcon size={22} className="text-[#4ADE80]" />,
      accent: 'hover:border-[#4ADE80]/50',
    },
  };

  return (
    <section
      id="marketplace"
      aria-labelledby="marketplace-title"
      className="relative isolate overflow-hidden bg-ink-950 section-y"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_80%_0%,#26272D_0%,#0E0E11_60%,#08080A_100%)]" />
        <div className="absolute -bottom-24 start-1/4 h-[380px] w-[380px] rounded-full bg-gold-500/[0.09] blur-[120px]" />
      </div>

      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow eyebrow-light">{marketplace.eyebrow}</span>
          <h2 id="marketplace-title" className="heading-lg mt-4 font-medium text-ivory-100">
            {marketplace.title}
          </h2>
          <p className="body-text mt-4 text-[15px] text-ink-200">{marketplace.subtitle}</p>
        </Reveal>

        <ul className="mx-auto mt-9 grid max-w-4xl gap-4 sm:mt-11 sm:gap-5 md:grid-cols-2">
          {marketplace.channels.map((channel, index) => {
            const props = channelProps[channel.id];
            return (
              <Reveal as="li" key={channel.id} delay={index * 100}>
                <a
                  href={props.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex h-full flex-col rounded-[4px] border border-ivory-100/12 bg-ivory-100/[0.03] p-7 transition-colors duration-500 sm:p-8 ${props.accent}`}
                >
                  <span className="grid h-12 w-12 place-items-center rounded-[3px] border border-ivory-100/15">
                    {props.icon}
                  </span>
                  <h3 className="mt-6 text-[19px] text-ivory-100">{channel.title}</h3>
                  <p className="mt-3 text-[14px] leading-[1.8] text-ink-200">{channel.description}</p>
                  <span className="mt-7 inline-flex items-center gap-2 text-[14px] text-gold-300">
                    <span>{channel.action}</span>
                    <ArrowLeft
                      size={16}
                      aria-hidden="true"
                      className="transition-transform duration-300 ease-smooth group-hover:-translate-x-1"
                    />
                  </span>
                </a>
              </Reveal>
            );
          })}
        </ul>

        <p className="mt-7 text-center text-[13px] text-ink-300">{marketplace.note}</p>
      </div>
    </section>
  );
}
