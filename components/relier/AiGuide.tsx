'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { Icon, cn } from '@/components/ui';
import { guideChapters, guideUi } from '@/content/relier';
import { GuideChapterPanel } from './GuideChapterPanel';

const prevKeys = ['ArrowUp', 'ArrowLeft'];
const nextKeys = ['ArrowDown', 'ArrowRight'];

/** Mode d'emploi en 5 chapitres : liste latérale (desktop) / défilante (mobile) + panneau. */
export function AiGuide() {
  const uid = useId();
  const [index, setIndex] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const n = guideChapters.length;
  const chapter = guideChapters[index];

  const go = (i: number, focusTab = false) => {
    const next = (i + n) % n;
    setIndex(next);
    if (focusTab) refs.current[next]?.focus();
  };

  const onKey = (e: KeyboardEvent, i: number) => {
    let target = -1;
    if (prevKeys.includes(e.key)) target = i - 1;
    if (nextKeys.includes(e.key)) target = i + 1;
    if (e.key === 'Home') target = 0;
    if (e.key === 'End') target = n - 1;
    if (target === -1) return;
    e.preventDefault();
    go(target, true);
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[280px_1fr] lg:gap-6">
      <div
        role="tablist"
        aria-label={guideUi.navLabel}
        aria-orientation="vertical"
        className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:mx-0 lg:h-fit lg:flex-col lg:gap-1 lg:rounded-[20px] lg:border lg:border-line lg:bg-white lg:p-3"
      >
        {guideChapters.map((c, i) => {
          const on = i === index;
          return (
            <button
              key={c.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="tab"
              type="button"
              id={`${uid}-tab-${c.id}`}
              aria-selected={on}
              aria-controls={`${uid}-panel`}
              tabIndex={on ? 0 : -1}
              onClick={() => go(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                'flex shrink-0 items-center gap-3 rounded-xl border px-3.5 py-3 text-left text-sm font-semibold transition-colors lg:w-full',
                on ? 'border-leaf bg-leaf-lt text-green-900' : 'border-line bg-white text-ink-2 hover:bg-sand lg:border-transparent',
              )}
            >
              <span
                aria-hidden
                className={cn('grid h-7 w-7 flex-none place-items-center rounded-lg text-xs font-extrabold', on ? 'bg-green-700 text-white' : 'bg-sand text-ink')}
              >
                {i + 1}
              </span>
              <span className="whitespace-nowrap lg:whitespace-normal">{c.title}</span>
              <Icon name="ChevronRight" className={cn('ml-auto hidden h-4 w-4 lg:block', on ? 'opacity-100' : 'opacity-0')} />
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-tab-${chapter.id}`}
        tabIndex={0}
        className="min-w-0 rounded-[20px] border border-line bg-white p-5 sm:p-8 lg:p-9"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={chapter.id}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25 }}
          >
            <GuideChapterPanel
              chapter={chapter}
              number={index + 1}
              onPrev={index > 0 ? () => go(index - 1) : undefined}
              onNext={index < n - 1 ? () => go(index + 1) : undefined}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
