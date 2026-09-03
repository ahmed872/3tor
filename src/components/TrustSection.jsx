import { Layers, MessageSquare, Sparkles, Tag } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import { content } from '../config/content';

const ICONS = {
  sparkles: Sparkles,
  layers: Layers,
  tag: Tag,
  message: MessageSquare,
};

/** لماذا أثر — نقاط قيمة واقعية وقابلة للتعديل من ملف المحتوى */
export default function TrustSection() {
  const { trust } = content;

  return (
    <section
      id="trust"
      aria-labelledby="trust-title"
      className="bg-ivory-100 section-y"
    >
      <div className="container-x">
        <SectionHeading
          id="trust-title"
          eyebrow={trust.eyebrow}
          title={trust.title}
          subtitle={trust.subtitle}
          align="center"
        />

        <ul className="mt-9 grid gap-px overflow-hidden rounded-[4px] border border-ink-900/[0.08] bg-ink-900/[0.08] sm:mt-11 sm:grid-cols-2 lg:grid-cols-4">
          {trust.items.map((item, index) => {
            const Icon = ICONS[item.icon] || Sparkles;
            return (
              <Reveal
                as="li"
                key={item.title}
                delay={index * 65}
                className="flex flex-col bg-ivory-50 p-7 lg:p-8"
              >
                <span
                  aria-hidden="true"
                  className="grid h-12 w-12 place-items-center rounded-[3px] border border-gold-400/40 bg-gold-50 text-gold-600"
                >
                  <Icon size={20} strokeWidth={1.6} />
                </span>
                <h3 className="mt-6 text-[17px] text-ink-900">{item.title}</h3>
                <p className="mt-2.5 text-[14px] leading-[1.8] text-ink-400">{item.description}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
