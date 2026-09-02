import { cn } from '../../lib/utils';
import { useReveal } from '../../hooks/useReveal';

/** غلاف بسيط لإظهار العناصر تدريجياً عند التمرير */
export default function Reveal({ as: Tag = 'div', delay = 0, className, children, ...rest }) {
  const [ref, visible] = useReveal();

  return (
    <Tag
      ref={ref}
      style={delay ? { '--reveal-delay': `${delay}ms` } : undefined}
      className={cn('reveal', visible && 'reveal-visible', className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
