import { useEffect, useState } from 'react';
import { ExternalLink, X } from 'lucide-react';
import SmartImage from './ui/SmartImage';
import FragranceNotes from './FragranceNotes';
import { AmazonIcon, WhatsAppIcon } from './ui/Icons';
import {
  availabilityLabels,
  categoryLabels,
  genderLabels,
} from '../data/categories';
import {
  cn,
  discountPercent,
  formatPrice,
  productBadge,
  productWhatsappLink,
} from '../lib/utils';
import { useDialog } from '../hooks/useDialog';

const availabilityTone = {
  ok: 'border-whatsapp/30 bg-whatsapp/[0.08] text-whatsapp-darker',
  warn: 'border-gold-500/40 bg-gold-50 text-gold-700',
  off: 'border-ink-900/15 bg-ink-900/[0.04] text-ink-500',
};

/** تفاصيل المنتج داخل نافذة منبثقة (Drawer على الجوال) */
export default function ProductModal({ product, onClose }) {
  const open = Boolean(product);
  const containerRef = useDialog(open, onClose);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setActiveImage(0);
  }, [product?.id]);

  if (!product) return null;

  const gallery = product.gallery?.length ? product.gallery : [product.image];
  const badge = productBadge(product);
  const discount = discountPercent(product.price, product.oldPrice);
  const availability = availabilityLabels[product.availability];
  const soldOut = product.availability === 'out_of_stock';

  const meta = [
    { label: 'الحجم', value: product.size },
    { label: 'الجنس', value: genderLabels[product.gender] },
    { label: 'العائلة العطرية', value: categoryLabels[product.category] },
    { label: 'الرقم المرجعي', value: product.sku, ltr: true },
  ];

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center">
      <button
        type="button"
        tabIndex={-1}
        aria-label="إغلاق التفاصيل"
        onClick={onClose}
        className="absolute inset-0 h-full w-full animate-fade-in cursor-default bg-ink-950/70 backdrop-blur-sm"
      />

      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        className="relative flex max-h-[94svh] w-full animate-scale-in flex-col overflow-hidden rounded-t-[8px] bg-ivory-50 shadow-modal sm:max-h-[90svh] sm:max-w-5xl sm:rounded-[4px]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="إغلاق التفاصيل"
          className="absolute end-3 top-3 z-20 grid h-11 w-11 place-items-center rounded-[3px] border border-ink-900/10 bg-ivory-50/90 text-ink-600 backdrop-blur-sm transition-colors hover:bg-ivory-200 hover:text-ink-900"
        >
          <X size={18} aria-hidden="true" />
        </button>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <span
            aria-hidden="true"
            className="mx-auto mt-3 block h-1 w-10 rounded-full bg-ink-900/15 sm:hidden"
          />

          <div className="grid gap-0 lg:grid-cols-2">
            {/* المعرض */}
            <div className="bg-ivory-100 p-3 sm:p-6 lg:p-8">
              <div className="relative">
                <SmartImage
                  key={gallery[activeImage]}
                  src={gallery[activeImage]}
                  alt={`عطر ${product.name} من ${product.brand} — صورة ${activeImage + 1}`}
                  priority
                  className="aspect-square w-full rounded-[3px] border border-ink-900/[0.07] sm:aspect-[4/5]"
                />
                {badge && (
                  <span className="absolute start-3 top-3 rounded-[2px] bg-ink-900 px-2.5 py-1 text-[11px] font-medium leading-none text-ivory-100">
                    {badge.label}
                  </span>
                )}
              </div>

              {gallery.length > 1 && (
                <ul className="mt-2.5 flex gap-2.5 sm:mt-3 sm:gap-3">
                  {gallery.map((image, index) => (
                    <li key={image} className="w-[68px] sm:w-auto sm:flex-1">
                      <button
                        type="button"
                        onClick={() => setActiveImage(index)}
                        aria-label={`عرض الصورة ${index + 1} من ${gallery.length}`}
                        aria-pressed={index === activeImage}
                        className={cn(
                          'block w-full overflow-hidden rounded-[3px] border transition-colors duration-300',
                          index === activeImage
                            ? 'border-gold-400'
                            : 'border-ink-900/[0.07] hover:border-ink-900/25',
                        )}
                      >
                        <SmartImage
                          src={image}
                          alt=""
                          className="aspect-square w-full"
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* التفاصيل */}
            <div className="p-5 pb-6 sm:p-7 lg:p-9">
              <p className="text-[13px] text-gold-600">{product.brand}</p>
              <h2
                id="product-modal-title"
                className="mt-1.5 text-[26px] leading-[1.35] text-ink-900 sm:text-[32px]"
              >
                {product.name}
              </h2>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="text-[22px] font-medium text-ink-900">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-[15px] text-ink-400 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
                {discount > 0 && (
                  <span className="rounded-[2px] bg-gold-400 px-2 py-1 text-[11.5px] font-medium leading-none text-ink-900">
                    وفّر {discount}%
                  </span>
                )}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    'rounded-[2px] border px-2.5 py-1 text-[12px] leading-none',
                    availabilityTone[availability.tone],
                  )}
                >
                  {availability.label}
                </span>
                <span className="rounded-[2px] border border-ink-900/10 px-2.5 py-1 text-[12px] leading-none text-ink-500">
                  {genderLabels[product.gender]}
                </span>
                <span className="rounded-[2px] border border-ink-900/10 px-2.5 py-1 text-[12px] leading-none text-ink-500">
                  {categoryLabels[product.category]}
                </span>
              </div>

              <p className="body-text mt-5 text-[15px] text-ink-500">{product.description}</p>

              <div className="mt-6 border-t border-ink-900/[0.08] pt-5">
                <h3 className="text-[14px] font-medium text-ink-900">الهرم العطري</h3>
                <FragranceNotes notes={product.notes} className="mt-4" />
              </div>

              <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-[3px] border border-ink-900/[0.08] bg-ink-900/[0.08]">
                {meta.map((item) => (
                  <div key={item.label} className="bg-ivory-50 px-4 py-3.5">
                    <dt className="text-[12px] text-ink-400">{item.label}</dt>
                    <dd
                      className="mt-1 text-[14px] text-ink-800"
                      dir={item.ltr ? 'ltr' : undefined}
                      style={item.ltr ? { textAlign: 'start' } : undefined}
                    >
                      {item.value || '—'}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* أزرار الشراء الثابتة */}
        <div className="border-t border-ink-900/[0.08] bg-ivory-50 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:px-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={productWhatsappLink(product)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp flex-1"
            >
              <WhatsAppIcon size={19} />
              <span>اطلب عبر واتساب</span>
            </a>
            <a
              href={product.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-amazon flex-1"
            >
              <AmazonIcon size={19} className="text-gold-600" />
              <span>شراء عبر Amazon</span>
              <ExternalLink size={14} aria-hidden="true" className="text-ink-400" />
            </a>
          </div>
          <p className="mt-3 text-center text-[12px] text-ink-400 sm:text-start">
            {soldOut
              ? 'هذا العطر غير متوفر حالياً — راسلنا عبر واتساب لمعرفة موعد توفره.'
              : 'تفاصيل الشحن والدفع تعتمد على القناة التي تختارها.'}
          </p>
        </div>
      </div>
    </div>
  );
}
