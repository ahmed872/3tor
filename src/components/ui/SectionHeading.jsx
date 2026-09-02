import { cn } from '../../lib/utils';
import Reveal from './Reveal';

/** ترويسة موحّدة لجميع الأقسام */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  tone = 'dark',
  align = 'start',
  action,
  id,
  className,
}) {
  const light = tone === 'light';

  return (
    <div
      className={cn(
        'flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between',
        align === 'center' && 'items-center text-center sm:flex-col sm:items-center',
        className,
      )}
    >
      <Reveal className={cn('max-w-2xl', align === 'center' && 'sm:mx-auto')}>
        {eyebrow && (
          <span className={cn('eyebrow', light && 'eyebrow-light')}>{eyebrow}</span>
        )}
        <h2
          id={id}
          className={cn(
            'heading-lg mt-4 font-medium',
            light ? 'text-ivory-100' : 'text-ink-900',
          )}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={cn(
              'mt-4 text-[15px] leading-8 sm:text-base',
              light ? 'text-ink-200' : 'text-ink-400',
            )}
          >
            {subtitle}
          </p>
        )}
      </Reveal>

      {action && <Reveal delay={120} className="shrink-0">{action}</Reveal>}
    </div>
  );
}
