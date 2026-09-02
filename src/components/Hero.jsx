import { ArrowLeft, ChevronDown } from 'lucide-react';
import SmartImage from './ui/SmartImage';
import { content } from '../config/content';
import { siteConfig } from '../config/siteConfig';
import { scrollToSection } from '../lib/utils';

/** واجهة رئيسية بأسلوب حملة عطور فاخرة */
export default function Hero() {
  const { hero } = content;

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-ink-950 pb-16 pt-[124px] sm:pb-20 lg:flex lg:min-h-[100svh] lg:items-center lg:pb-24 lg:pt-[148px]"
    >
      {/* خلفية زخرفية */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_20%_10%,#26272D_0%,#101014_55%,#08080A_100%)]" />
        <div className="absolute -top-40 start-[-10%] h-[520px] w-[520px] rounded-full bg-gold-500/[0.13] blur-[120px]" />
        <div className="absolute bottom-[-15%] end-[-5%] h-[420px] w-[420px] rounded-full bg-gold-400/[0.07] blur-[110px]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-l from-transparent via-gold-400/25 to-transparent" />
      </div>

      <div className="container-x grid w-full items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <span className="eyebrow eyebrow-light animate-fade-up">{hero.eyebrow}</span>

          <h1
            id="hero-title"
            className="heading-xl mt-5 animate-fade-up font-light text-ivory-100 text-shadow-hero"
            style={{ animationDelay: '80ms' }}
          >
            <span className="block">{hero.title[0]}</span>
            <span className="mt-1 block text-gold-300">{hero.title[1]}</span>
          </h1>

          <p
            className="mt-7 max-w-xl animate-fade-up text-[15px] leading-9 text-ink-200 sm:text-[17px]"
            style={{ animationDelay: '160ms' }}
          >
            {hero.subtitle}
          </p>

          <div
            className="mt-9 flex animate-fade-up flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: '240ms' }}
          >
            <a
              href="#collection"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection('collection');
              }}
              className="btn-gold group px-8"
            >
              <span>{hero.primaryCta}</span>
              <ArrowLeft
                size={18}
                aria-hidden="true"
                className="transition-transform duration-300 ease-smooth group-hover:-translate-x-1"
              />
            </a>
            <a
              href="#contact"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection('contact');
              }}
              className="btn-outline-light px-8"
            >
              {hero.secondaryCta}
            </a>
          </div>

          <dl
            className="mt-12 grid animate-fade-up grid-cols-3 gap-px overflow-hidden border-y border-ivory-100/10 bg-ivory-100/10 sm:max-w-lg"
            style={{ animationDelay: '320ms' }}
          >
            {hero.stats.map((stat) => (
              <div key={stat.label} className="bg-ink-950 px-3 py-5 text-center sm:px-4">
                <dt className="text-[13px] leading-6 text-gold-300 sm:text-[14px]">{stat.value}</dt>
                <dd className="mt-1 text-[12px] text-ink-300">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-6">
          <div
            className="relative mx-auto w-full max-w-[380px] animate-fade-up sm:max-w-[420px] lg:me-0 lg:ms-auto lg:max-w-[440px]"
            style={{ animationDelay: '200ms' }}
          >
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[4px] border border-gold-400/20 sm:-inset-5"
            />
            <SmartImage
              src="/images/scenes/hero.svg"
              alt={`زجاجة عطر من مجموعة ${siteConfig.brandName}`}
              priority
              tone="dark"
              className="aspect-[4/5] rounded-[4px] shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9)] lg:aspect-[3/4]"
            />

            <div className="absolute bottom-4 start-4 rounded-[3px] border border-ivory-100/15 bg-ink-950/75 px-4 py-3 backdrop-blur-sm sm:bottom-6 sm:start-6">
              <p className="latin-caps text-[9px] text-gold-300">{siteConfig.brandNameLatin}</p>
              <p className="mt-1.5 text-[13px] text-ivory-100">{siteConfig.tagline}</p>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#collection"
        onClick={(event) => {
          event.preventDefault();
          scrollToSection('collection');
        }}
        aria-label="الانتقال إلى المجموعة"
        className="absolute inset-x-0 bottom-6 mx-auto hidden w-fit flex-col items-center gap-2 text-ink-300 transition-colors hover:text-gold-300 lg:flex"
      >
        <span className="text-[12px]">اكتشف المزيد</span>
        <ChevronDown size={18} aria-hidden="true" className="animate-bounce" />
      </a>
    </section>
  );
}
