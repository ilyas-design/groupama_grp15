'use client';

import { useEffect, useState } from 'react';
import { Icon, type IconName, cn } from '@/components/ui';

export interface TocItem {
  id: string;
  label: string;
  icon: IconName;
}

interface CharterTocProps {
  items: TocItem[];
  title: string;
  /** aria-label de la navigation */
  label: string;
}

/** Sommaire ancré : liste compacte sur mobile, colonne collante avec section active sur desktop. */
export function CharterToc({ items, title, label }: CharterTocProps) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const targets = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el);
    if (!targets.length || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-20% 0px -65% 0px' },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label={label} className="rounded-xl2 border border-line bg-white p-5">
      <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.12em] text-green-700">{title}</p>
      <ol className="grid gap-1 sm:grid-cols-2 lg:grid-cols-1">
        {items.map((item, i) => {
          const isActive = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? 'location' : undefined}
                className={cn(
                  'flex min-h-[44px] items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition-colors',
                  isActive ? 'bg-leaf-lt text-green-800' : 'text-ink-2 hover:bg-sand hover:text-ink',
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    'grid h-7 w-7 flex-none place-items-center rounded-lg text-xs font-bold',
                    isActive ? 'bg-green-700 text-white' : 'bg-sand-2 text-ink-2',
                  )}
                >
                  {i < items.length - 1 ? String(i + 1).padStart(2, '0') : <Icon name={item.icon} className="h-4 w-4" />}
                </span>
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
