import { ArrowLeft } from 'lucide-react';
import SmartImage from './ui/SmartImage';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import { categories } from '../data/categories';
import { content } from '../config/content';

/** التصنيفات — الضغط على أي بطاقة يطبّق الفلتر في المجموعة */
export default function Categories({ onSelectCategory }) {
  const { categories: copy } = content;

  return (
    <section
      id="categories"
      aria-labelledby="categories-title"
      className="border-y border-ink-900/[0.07] bg-ivory-50 section-y"
    >
      <div className="container-x">
        <SectionHeading
          id="categories-title"
          eyebrow={copy.eyebrow}
          title={copy.title}
          subtitle={copy.subtitle}
        />

        <ul className="mt-9 grid grid-cols-2 gap-4 sm:mt-11 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {categories.map((category, index) => (
            <Reveal as="li" key={category.id} delay={(index % 3) * 65}>
              <button
                type="button"
                onClick={() => onSelectCategory(category.id)}
                className="group relative block h-full w-full overflow-hidden rounded-[3px] border border-ink-900/[0.07] text-start"
              >
                <SmartImage
                  src={category.image}
                  alt={`${category.title} — ${category.description}`}
                  className="aspect-[3/4] w-full sm:aspect-[4/5]"
                  imgClassName="transition-transform duration-700 ease-smooth group-hover:scale-[1.06]"
                />

                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/25 to-transparent"
                />

                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                  <span className="min-w-0">
                    <span className="block text-[15px] text-ivory-100 sm:text-[17px]">
                      {category.title}
                    </span>
                    <span className="mt-1 hidden text-[12.5px] leading-6 text-ink-200 sm:block">
                      {category.description}
                    </span>
                  </span>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[2px] border border-ivory-100/25 text-ivory-100 transition-colors duration-300 group-hover:border-gold-300 group-hover:bg-gold-400 group-hover:text-ink-900">
                    <ArrowLeft size={16} aria-hidden="true" />
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
