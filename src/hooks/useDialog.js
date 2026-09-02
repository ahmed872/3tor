import { useEffect, useRef } from 'react';
import { useLockBodyScroll } from './useLockBodyScroll';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * سلوك موحّد للنوافذ المنبثقة: إغلاق بـ Escape، حصر التركيز، وإعادته عند الإغلاق.
 * Shared dialog behaviour: ESC to close, focus trap, focus restore, scroll lock.
 */
export function useDialog(open, onClose) {
  const containerRef = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return undefined;
    const node = containerRef.current;
    const previouslyFocused = document.activeElement;

    const frame = window.requestAnimationFrame(() => {
      const target = node?.querySelector('[data-autofocus]') || node?.querySelector(FOCUSABLE) || node;
      target?.focus?.({ preventScroll: true });
    });

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeRef.current?.();
        return;
      }
      if (event.key !== 'Tab' || !node) return;

      const items = Array.from(node.querySelectorAll(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener('keydown', onKeyDown);
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, [open]);

  return containerRef;
}
