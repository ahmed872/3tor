import { Check } from 'lucide-react';
import SmartImage from './ui/SmartImage';
import Reveal from './ui/Reveal';
import { content } from '../config/content';
import { siteConfig } from '../config/siteConfig';
import { scrollToSection } from '../lib/utils';

/** عن العلامة — تخطيط تحريري بصورة كبيرة ولمسة ذهبية */
export default function BrandStory() {
  const { story } = content;

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="border-t border-ink-900/[0.07] bg-ivory-50 py-20 sm:py-24 lg:py-28"
    >
      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -start-4 h-full w-full rounded-[4px] border border-gold-400/35 sm:-bottom-5 sm:-start-5"
            />
            <SmartImage
              src="/images/scenes/story.svg"
              alt={`مجموعة عطور ${siteConfig.brandName} معروضة على سطح دافئ`}
              className="aspect-[4/5] w-full rounded-[4px] shadow-card"
            />
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal delay={80}>
            <span className="eyebrow">{story.eyebrow}</span>
            <h2 id="about-title" className="heading-lg mt-4 font-medium text-ink-900">
              {story.title}
            </h2>
            {story.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-5 text-[15px] leading-9 text-ink-500 sm:text-base">
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal delay={160}>
            <ul className="mt-8 space-y-3.5 border-t border-ink-900/[0.08] pt-8">
              {story.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-[15px] text-ink-700">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-gold-400/50 text-gold-600"
                  >
                    <Check size={13} strokeWidth={2.5} />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => scrollToSection('collection')}
              className="btn-primary mt-9 px-8"
            >
              {story.cta}
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
