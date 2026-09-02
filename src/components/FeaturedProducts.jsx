import { ArrowLeft } from 'lucide-react';
import ProductCard from './ProductCard';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import { products } from '../data/products';
import { content } from '../config/content';
import { scrollToSection } from '../lib/utils';

const featured = products.filter((product) => product.featured).slice(0, 6);

/** مختاراتنا — عرض أفقي على الجوال وشبكة على الشاشات الكبيرة */
export default function FeaturedProducts({ onSelectProduct }) {
  const { featured: copy } = content;

  return (
    <section id="featured" aria-labelledby="featured-title" className="bg-ivory-100 py-20 sm:py-24 lg:py-28">
      <div className="container-x">
        <SectionHeading
          id="featured-title"
          eyebrow={copy.eyebrow}
          title={copy.title}
          subtitle={copy.subtitle}
          action={
            <button
              type="button"
              onClick={() => scrollToSection('collection')}
              className="group inline-flex items-center gap-2 border-b border-ink-900/20 pb-1 text-[14px] text-ink-700 transition-colors hover:border-gold-500 hover:text-ink-900"
            >
              <span>{copy.cta}</span>
              <ArrowLeft
                size={16}
                aria-hidden="true"
                className="text-gold-600 transition-transform duration-300 ease-smooth group-hover:-translate-x-1"
              />
            </button>
          }
        />
      </div>

      <div className="container-x mt-12 sm:mt-14">
        <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:gap-y-14 lg:overflow-visible lg:px-0">
          {featured.map((product, index) => (
            <Reveal
              as="li"
              key={product.id}
              delay={(index % 3) * 90}
              className="w-[74vw] shrink-0 snap-start sm:w-[46%] lg:w-auto lg:shrink"
            >
              <ProductCard product={product} onSelect={onSelectProduct} priority={index < 3} />
            </Reveal>
          ))}
        </ul>
        <p className="mt-5 text-center text-[12.5px] text-ink-300 lg:hidden">
          اسحب لعرض المزيد من المختارات
        </p>
      </div>
    </section>
  );
}
