'use client';

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { Icon, type IconName } from './Icon';
import { cn } from './cn';

export interface TabItem {
  id: string;
  label: string;
  icon?: IconName;
  content: ReactNode;
}

interface TabsProps {
  items: TabItem[];
  /** Libellé accessible de la liste d'onglets */
  label: string;
  defaultId?: string;
  /** Mode contrôlé */
  value?: string;
  onChange?: (id: string) => void;
  variant?: 'pill' | 'dark';
  className?: string;
  panelClassName?: string;
}

/** Onglets accessibles (ARIA tabs, flèches gauche/droite, Home/End). */
export function Tabs({ items, label, defaultId, value, onChange, variant = 'pill', className, panelClassName }: TabsProps) {
  const uid = useId();
  const [inner, setInner] = useState(defaultId ?? items[0]?.id);
  const active = value ?? inner;
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const select = (id: string) => {
    if (value === undefined) setInner(id);
    onChange?.(id);
  };

  const onKey = (e: KeyboardEvent, i: number) => {
    let n = -1;
    if (e.key === 'ArrowRight') n = (i + 1) % items.length;
    if (e.key === 'ArrowLeft') n = (i - 1 + items.length) % items.length;
    if (e.key === 'Home') n = 0;
    if (e.key === 'End') n = items.length - 1;
    if (n < 0) return;
    e.preventDefault();
    select(items[n].id);
    refs.current[n]?.focus();
  };

  return (
    <div className={className}>
      <div role="tablist" aria-label={label} className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {items.map((t, i) => {
          const on = t.id === active;
          return (
            <button
              key={t.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="tab"
              type="button"
              id={`${uid}-tab-${t.id}`}
              aria-selected={on}
              aria-controls={`${uid}-panel-${t.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => select(t.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                'inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors',
                variant === 'pill' && (on ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink-2 hover:border-ink/40'),
                variant === 'dark' && (on ? 'border-leaf bg-leaf text-ink' : 'border-white/15 bg-white/5 text-white/85 hover:bg-white/10'),
              )}
            >
              {t.icon && <Icon name={t.icon} className="h-4 w-4" />}
              {t.label}
            </button>
          );
        })}
      </div>
      {items.map((t) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`${uid}-panel-${t.id}`}
          aria-labelledby={`${uid}-tab-${t.id}`}
          hidden={t.id !== active}
          tabIndex={0}
          className={cn('mt-6 focus-visible:outline-offset-4', panelClassName)}
        >
          {t.id === active && t.content}
        </div>
      ))}
    </div>
  );
}
