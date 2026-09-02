import { useEffect, useState } from 'react';
import { ImageOff } from 'lucide-react';
import { cn } from '../../lib/utils';
import { content } from '../../config/content';

/**
 * صورة بنسبة ثابتة مع حالة تحميل وبديل أنيق عند فشل التحميل.
 * Keeps aspect ratio, never stretches, lazy-loads by default and degrades to a
 * branded placeholder instead of a broken image icon.
 */
export default function SmartImage({
  src,
  alt,
  className,
  imgClassName,
  priority = false,
  tone = 'light',
}) {
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    setStatus(src ? 'loading' : 'error');
  }, [src]);

  const dark = tone === 'dark';

  return (
    <div
      className={cn(
        'relative isolate overflow-hidden',
        dark ? 'bg-ink-800' : 'bg-ivory-200',
        className,
      )}
    >
      {src && status !== 'error' && (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          draggable="false"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={cn(
            'h-full w-full object-cover transition-opacity duration-700 ease-smooth',
            status === 'loaded' ? 'opacity-100' : 'opacity-0',
            imgClassName,
          )}
        />
      )}

      {status === 'loading' && (
        <div
          aria-hidden="true"
          className={cn(
            'absolute inset-0 animate-pulse',
            dark ? 'bg-ink-700/60' : 'bg-ivory-300/70',
          )}
        />
      )}

      {status === 'error' && (
        <div
          className={cn(
            'absolute inset-0 flex flex-col items-center justify-center gap-2.5 px-4 text-center',
            dark ? 'bg-ink-800 text-ink-300' : 'bg-ivory-200 text-ink-400',
          )}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-current/25">
            <ImageOff size={18} aria-hidden="true" />
          </span>
          <span className="text-xs">{content.states.imageFallback}</span>
          <span className="sr-only">{alt}</span>
        </div>
      )}
    </div>
  );
}
