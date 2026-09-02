import { ArrowLeft, Plus } from 'lucide-react';
import SmartImage from './ui/SmartImage';
import { WhatsAppIcon } from './ui/Icons';
import { availabilityLabels } from '../data/categories';
import { cn, discountPercent, formatPrice, productBadge, productWhatsappLink } from '../lib/utils';

const badgeStyles = {
  new: 'bg-ink-900 text-ivory-100',
  best: 'bg-gold-400 text-ink-900',
  featured: 'border border-ink-900/20 bg-ivory-50/90 text-ink-700',
};

/** بطاقة منتج تحريرية: الصورة هي البطل، والتفاصيل هادئة ومنظمة */
export default function ProductCard({ product, onSelect, priority = false }) {
  const badge = productBadge(product);
  const discount = discountPercent(product.price, product.oldPrice);
  const soldOut = product.availability === 'out_of_stock';
  const availability = availabilityLabels[product.availability];
  const primaryNotes = [...product.notes.top, ...product.notes.heart].slice(0, 3).join(' · ');

  return (
    <article className="group relative flex h-full flex-col">
      <button
        type="button"
        onClick={() => onSelect(product)}
        aria-label={`عرض تفاصيل عطر ${product.name} من ${product.brand}`}
        className="relative block w-full overflow-hidden rounded-[3px] border border-ink-900/[0.07] bg-ivory-200 text-start"
      >
        <SmartImage
          src={product.image}
          alt={`زجاجة عطر ${product.name} من ${product.brand}`}
          priority={priority}
          className="aspect-[4/5] w-full"
          imgClassName="transition-transform duration-[900ms] ease-smooth group-hover:scale-[1.05]"
        />

        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink-950/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        <span className="absolute start-3 top-3 flex flex-col items-start gap-2">
          {badge && (
            <span
              className={cn(
                'rounded-[2px] px-2.5 py-1 text-[11px] font-medium leading-none',
                badgeStyles[badge.tone],
              )}
            >
              {badge.label}
            </span>
          )}
          {discount > 0 && !soldOut && (
            <span className="rounded-[2px] bg-ivory-50/95 px-2.5 py-1 text-[11px] font-medium leading-none text-ink-700">
              خصم {discount}%
            </span>
          )}
        </span>

        {soldOut && (
          <span className="absolute inset-0 flex items-center justify-center bg-ivory-100/75">
            <span className="rounded-[2px] border border-ink-900/15 bg-ivory-50 px-4 py-2 text-[12.5px] text-ink-600">
              {availability.label}
            </span>
          </span>
        )}

        {/* كشف عند التأشير على الشاشات الكبيرة فقط */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-3 bottom-3 hidden translate-y-3 items-center justify-between gap-2 rounded-[2px] bg-ivory-50/95 px-4 py-3 text-[13px] text-ink-800 opacity-0 backdrop-blur-sm transition-all duration-500 ease-smooth group-hover:translate-y-0 group-hover:opacity-100 lg:flex"
        >
          <span>عرض التفاصيل</span>
          <ArrowLeft size={16} className="text-gold-600" />
        </span>
      </button>

      <div className="flex flex-1 flex-col pt-4">
        <div className="flex items-baseline justify-between gap-3">
          <p className="truncate text-[12.5px] text-ink-400">{product.brand}</p>
          <p className="shrink-0 text-[12.5px] text-ink-300">{product.size}</p>
        </div>

        <h3 className="mt-1.5 text-[17px] leading-7 text-ink-900">
          <button
            type="button"
            onClick={() => onSelect(product)}
            className="text-start transition-colors duration-300 hover:text-gold-600"
          >
            {product.name}
          </button>
        </h3>

        <p className="mt-1.5 line-clamp-1 text-[13px] leading-6 text-ink-400">{primaryNotes}</p>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-ink-900/[0.08] pt-4">
          <p className="flex flex-wrap items-baseline gap-2">
            <span
              className={cn(
                'text-[16px] font-medium',
                soldOut ? 'text-ink-400' : 'text-ink-900',
              )}
            >
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-[13px] text-ink-300 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </p>

          <div className="flex items-center gap-1.5">
            <a
              href={productWhatsappLink(product)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`الاستفسار عن عطر ${product.name} عبر واتساب`}
              className="grid h-11 w-11 place-items-center rounded-[3px] border border-ink-900/10 text-ink-500 transition-colors duration-300 hover:border-[#1FA855]/50 hover:bg-[#1FA855]/[0.06] hover:text-[#1FA855]"
            >
              <WhatsAppIcon size={18} />
            </a>
            <button
              type="button"
              onClick={() => onSelect(product)}
              aria-label={`عرض تفاصيل عطر ${product.name}`}
              className="grid h-11 w-11 place-items-center rounded-[3px] border border-ink-900/10 text-ink-500 transition-colors duration-300 hover:border-gold-400 hover:bg-gold-50 hover:text-ink-900 lg:hidden"
            >
              <Plus size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
