'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Icon, Tag, cn } from '@/components/ui';
import type { Tone } from '@/lib/types';
import type { CaseCategory, CaseFilter, CaseStudy, casesUi as CasesUiContent } from '@/content/anticiper';

interface CaseLibraryProps {
  ui: typeof CasesUiContent;
  filters: CaseFilter[];
  cases: CaseStudy[];
  tones: Record<CaseCategory, Tone>;
}

/** Bibliothèque de cas réels filtrable, avec animation de tri et compteur annoncé. */
export function CaseLibrary({ ui, filters, cases, tones }: CaseLibraryProps) {
  const [active, setActive] = useState<CaseFilter['id']>('all');
  const visible = cases.filter((c) => active === 'all' || c.category === active);
  const labelOf = (id: CaseCategory) => filters.find((f) => f.id === id)?.label ?? id;
  const count = (visible.length > 1 ? ui.resultsMany : ui.resultsOne).replace('{n}', String(visible.length));

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div role="group" aria-label={ui.filtersLabel} className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={active === f.id}
              onClick={() => setActive(f.id)}
              className={cn(
                'rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors',
                active === f.id ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink hover:border-green-700',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <p role="status" aria-live="polite" className="text-sm font-bold text-ink-2">
          {count}
        </p>
      </div>

      <motion.ul layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((c) => (
            <motion.li
              key={c.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-3 rounded-card border border-line bg-white p-6 transition-shadow hover:shadow-soft"
            >
              <Tag tone={tones[c.category]} className="self-start">
                {labelOf(c.category)}
              </Tag>
              <h3 className="text-[17px] font-extrabold leading-snug">{c.title}</h3>
              <p className="text-sm text-ink-2">{c.summary}</p>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3 text-xs text-ink-2">
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="Clock" className="h-3.5 w-3.5" />
                  <span className="sr-only">{ui.durationLabel} :</span>
                  {c.duration} · {c.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin aria-hidden strokeWidth={1.75} className="h-3.5 w-3.5" />
                  <span className="sr-only">{ui.regionLabel} :</span>
                  {c.region}
                </span>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
