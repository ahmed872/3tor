import { cn } from '../lib/utils';

const GROUPS = [
  { key: 'top', label: 'مقدمة العطر', hint: 'الانطباع الأول' },
  { key: 'heart', label: 'قلب العطر', hint: 'الطبقة الوسطى' },
  { key: 'base', label: 'قاعدة العطر', hint: 'الأثر الأخير' },
];

/** عرض الهرم العطري بشكل بسيط وواضح */
export default function FragranceNotes({ notes, className }) {
  return (
    <div className={cn('relative', className)}>
      <span
        aria-hidden="true"
        className="absolute bottom-2 top-2 start-[5px] w-px bg-gradient-to-b from-gold-400/70 via-gold-400/35 to-transparent"
      />
      <ul className="space-y-6">
        {GROUPS.map(({ key, label, hint }) => {
          const values = notes?.[key] || [];
          if (values.length === 0) return null;
          return (
            <li key={key} className="relative ps-7">
              <span
                aria-hidden="true"
                className="absolute start-0 top-1.5 h-[11px] w-[11px] rounded-full border border-gold-400 bg-ivory-50"
              />
              <p className="flex items-baseline gap-2.5">
                <span className="text-[13px] font-medium text-ink-900">{label}</span>
                <span className="text-[12px] text-ink-300">{hint}</span>
              </p>
              <p className="mt-1.5 text-[14px] leading-7 text-ink-500">{values.join(' · ')}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
