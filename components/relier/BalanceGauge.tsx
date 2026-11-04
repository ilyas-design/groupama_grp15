'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Icon, IconBox, Tag, cn, toneSoft, toneSolid } from '@/components/ui';
import { balanceStops, balanceUi } from '@/content/relier';
import type { IconName, Tone } from '@/lib/types';

/** Jauge « trop de confiance ↔ juste milieu ↔ pas du tout » : 3 positions, conséquences et réflexes. */
export function BalanceGauge() {
  const [activeId, setActiveId] = useState(balanceUi.defaultId);
  const active = balanceStops.find((s) => s.id === activeId) ?? balanceStops[0];

  return (
    <div className="rounded-xl3 border border-line bg-white p-5 shadow-soft sm:p-8 lg:p-10">
      {/* Piste */}
      <div aria-hidden className="relative mx-4 mb-6 h-3 rounded-full bg-[linear-gradient(90deg,var(--coral),var(--leaf)_50%,var(--earth))]">
        {balanceStops.map((s) => (
          <span key={s.id} className="absolute top-1/2 h-5 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded bg-white/90" style={{ left: `${s.position}%` }} />
        ))}
        <motion.span
          className={cn('absolute top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-white shadow-lift', toneSolid[active.tone])}
          initial={false}
          animate={{ left: `${active.position}%` }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        >
          <Icon name={active.icon} className="h-4 w-4 text-white" />
        </motion.span>
      </div>

      {/* Choix */}
      <div role="group" aria-label={balanceUi.groupLabel} className="grid grid-cols-3 gap-2 sm:gap-3">
        {balanceStops.map((s) => {
          const on = s.id === activeId;
          return (
            <button
              key={s.id}
              type="button"
              aria-pressed={on}
              onClick={() => setActiveId(s.id)}
              className={cn(
                'flex flex-col items-center gap-2 rounded-card border px-2 py-3 text-center text-[13px] font-bold leading-tight transition-colors sm:flex-row sm:justify-center sm:px-4 sm:text-sm',
                on ? cn('border-transparent', toneSoft[s.tone]) : 'border-line bg-white text-ink-2 hover:border-ink/40',
              )}
            >
              <Icon name={s.icon} className="h-5 w-5 flex-none" />
              {s.label}
            </button>
          );
        })}
      </div>

      {/* Détail */}
      <div aria-live="polite" className="mt-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <Tag tone={active.tone} icon={active.icon}>
              {active.verdict}
            </Tag>
            <p className="mt-4 max-w-3xl text-lg text-ink">{active.description}</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <List title={balanceUi.consequencesTitle} items={active.consequences} icon="Info" tone={active.tone} />
              <List title={balanceUi.reflexesTitle} items={active.reflexes} icon="CheckCircle2" tone="leaf" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function List({ title, items, icon, tone }: { title: string; items: string[]; icon: IconName; tone: Tone }) {
  return (
    <div className="rounded-card bg-sand p-5">
      <h3 className="mb-3 flex items-center gap-2.5 text-sm font-extrabold uppercase tracking-[0.08em] text-ink">
        <IconBox icon={icon} tone={tone} size="sm" />
        {title}
      </h3>
      <ul className="space-y-2 text-[15px] text-ink-2">
        {items.map((it) => (
          <li key={it} className="flex gap-2">
            <span aria-hidden className={cn('mt-2 h-1.5 w-1.5 flex-none rounded-full', toneSolid[tone])} />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
