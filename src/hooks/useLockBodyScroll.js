import { useEffect } from 'react';

/** يمنع تمرير الصفحة خلف النوافذ المنبثقة دون إحداث قفزة في التخطيط */
export function useLockBodyScroll(active) {
  useEffect(() => {
    if (!active) return undefined;
    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingInlineEnd;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = 'hidden';
    if (scrollbar > 0) body.style.paddingInlineEnd = `${scrollbar}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingInlineEnd = previousPadding;
    };
  }, [active]);
}
