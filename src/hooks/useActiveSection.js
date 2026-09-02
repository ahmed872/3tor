import { useEffect, useState } from 'react';

/** يحدد القسم الظاهر حالياً لإبراز رابط التنقل المناسب */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5] },
    );

    ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)
      .forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [ids]);

  return active;
}
