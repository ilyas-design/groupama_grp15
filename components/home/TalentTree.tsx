'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Button, Icon, cn } from '@/components/ui';
import type { TalentBranch } from '@/content/home';

interface TalentTreeProps {
  branches: TalentBranch[];
  groupLabel: string;
  moreLabel: string;
}

/** Centre de chaque bouton-feuille, en unités du viewBox 520×460 (même ordre que `branches`). */
const spots = [
  { x: 84, y: 196 },
  { x: 166, y: 100 },
  { x: 260, y: 58 },
  { x: 354, y: 100 },
  { x: 436, y: 196 },
];
const boughs = [
  'M260 300 C220 280 140 270 84 200',
  'M260 280 C230 220 190 160 166 104',
  'M260 255 V70',
  'M260 280 C290 220 330 160 354 104',
  'M260 300 C300 280 380 270 436 200',
];

/** Arbre des talents : 5 branches = 5 boutons (aria-pressed) qui pilotent le panneau détail. */
export function TalentTree({ branches, groupLabel, moreLabel }: TalentTreeProps) {
  const [active, setActive] = useState(0);
  const b = branches[active];
  const panelId = 'arbre-detail';

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
      <div className="relative mx-auto aspect-[520/460] w-full max-w-[560px] bg-[radial-gradient(circle_at_50%_45%,#fff_0,#fff_40%,transparent_70%)]">
        <svg aria-hidden viewBox="0 0 520 460" className="absolute inset-0 h-full w-full">
          <path d="M260 450 V250" stroke="#7A5A30" strokeWidth="16" strokeLinecap="round" />
          <g stroke="#7A5A30" strokeWidth="8" strokeLinecap="round" fill="none">
            {boughs.map((d, i) => (
              <path key={d} d={d} className={cn('transition-[stroke] duration-300', i === active && 'stroke-green-700')} />
            ))}
          </g>
          <path d="M200 452 Q260 438 320 452" stroke="#B8925F" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M260 450 V300" stroke="#2DA9DA" strokeWidth="3" fill="none" strokeLinecap="round" className="flow-dash" />
        </svg>

        <div role="group" aria-label={groupLabel}>
          {branches.map((br, i) => {
            const s = spots[i] ?? spots[0];
            const on = i === active;
            return (
              <button
                key={br.id}
                type="button"
                aria-pressed={on}
                aria-controls={panelId}
                onClick={() => setActive(i)}
                style={{ left: `${(s.x / 520) * 100}%`, top: `${(s.y / 460) * 100}%` }}
                className={cn(
                  'absolute grid aspect-square w-[20%] -translate-x-1/2 -translate-y-1/2 place-content-center rounded-full border-2 border-green-700 px-1 text-center leading-tight shadow-soft transition-colors duration-300 sm:w-[18%]',
                  on ? 'bg-green-700 text-white' : 'bg-leaf-lt text-green-800 hover:bg-green-700 hover:text-white',
                )}
              >
                <span className="block text-[11px] font-extrabold sm:text-[13px]">{br.label[0]}</span>
                <span className="block text-[9.5px] font-semibold sm:text-xs">{br.label[1]}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div id={panelId} aria-live="polite" className="min-h-[380px] rounded-xl2 border border-line bg-white p-6 sm:p-[34px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={b.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <p aria-hidden className="font-serif text-[56px] leading-none text-leaf">
              {String(active + 1).padStart(2, '0')}
            </p>
            <h3 className="h3 mb-2 mt-3 font-serif text-[26px] font-semibold">{b.title}</h3>
            <p className="text-ink-2">{b.description}</p>
            <ul className="mt-[18px] grid gap-2.5">
              {b.items.map((it) => (
                <li key={it.title} className="flex items-start gap-3 rounded-xl bg-sand px-3.5 py-3 text-sm">
                  <span className="grid h-8 w-8 flex-none place-items-center rounded-[10px] bg-leaf-lt text-green-700">
                    <Icon name="Check" className="h-4 w-4" />
                  </span>
                  <span>
                    <b className="block">{it.title}</b>
                    <span className="text-ink-2">{it.text}</span>
                  </span>
                </li>
              ))}
            </ul>
            <Button href={b.href} variant="ghost" icon="ArrowRight" className="mt-4">
              {moreLabel}
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
