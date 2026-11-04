'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Tag, cn } from '@/components/ui';
import { tree, type TreeSkill } from '@/content/parcours';
import { Flower, Bud } from './FlowerGlyphs';

const VB_W = 600;
const VB_H = 440;

/** Arbre personnel : chaque fleur (bouton) = une compétence validée, les bourgeons restent à cultiver. */
export function PersonalTree() {
  const [active, setActive] = useState<TreeSkill | null>(null);
  const acquired = tree.skills.filter((s) => s.acquired).length;

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-xl2 border border-line bg-[linear-gradient(180deg,#EAF6F0_0_68%,#E7DAC4_68%)]">
      <div className="flex items-start justify-between gap-4 p-6 pb-0 sm:p-7 sm:pb-0">
        <div>
          <Tag tone="ink" className="!bg-green-700">{tree.levelTag}</Tag>
          <h2 className="h3 mt-2.5">{tree.title}</h2>
          <p className="text-sm text-ink-2">{tree.subtitle}</p>
        </div>
        <p className="text-right">
          <span className="block font-serif text-[2.125rem] font-semibold leading-none text-green-700">{acquired}</span>
          <span className="text-xs text-ink-2">{tree.countLabel}</span>
        </p>
      </div>

      <div className="relative mx-auto mt-2 w-full max-w-[640px]" style={{ aspectRatio: `${VB_W} / ${VB_H}` }}>
        <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 h-full w-full" role="img" aria-label={tree.svgLabel}>
          <path d="M300 312 V200" stroke="#6E5332" strokeWidth="16" strokeLinecap="round" />
          <path d="M300 250 L250 215 M300 235 L350 200" stroke="#6E5332" strokeWidth="8" strokeLinecap="round" />
          <circle cx="300" cy="160" r="78" fill="#3F9A5E" />
          <circle cx="240" cy="200" r="52" fill="#4FAE6B" />
          <circle cx="362" cy="190" r="56" fill="#2F8550" />
          <circle cx="305" cy="110" r="50" fill="#5DBB76" />
          <circle cx="395" cy="160" r="36" fill="#3F9A5E" />
          <g fill="none" stroke="#7A5A30" strokeWidth="4" strokeLinecap="round">
            <path d="M300 312 C290 350 240 360 200 400" />
            <path d="M300 312 C310 350 360 360 400 400" />
            <path d="M300 312 V420" />
          </g>
          <g fill="none" stroke="#2DA9DA" strokeWidth="2.5" strokeLinecap="round">
            <path className="flow-dash" d="M200 400 C240 360 290 350 300 312" />
            <path className="flow-dash" d="M400 400 C360 360 310 350 300 312" />
          </g>
        </svg>

        <ul aria-label={tree.listLabel}>
          {tree.skills.map((s, i) => {
            const status = s.acquired ? tree.acquiredStatus : tree.budStatus;
            const isActive = active?.id === s.id;
            return (
              <li
                key={s.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${(s.x / VB_W) * 100}%`, top: `${(s.y / VB_H) * 100}%` }}
              >
                <button
                  type="button"
                  aria-label={`${s.label} : ${status}`}
                  aria-pressed={isActive}
                  onClick={() => setActive(isActive ? null : s)}
                  onMouseEnter={() => setActive(s)}
                  onFocus={() => setActive(s)}
                  className={cn(
                    'group relative grid h-7 w-7 place-items-center rounded-full transition-transform hover:scale-125 focus-visible:scale-125 sm:h-9 sm:w-9',
                    isActive && 'scale-125',
                  )}
                >
                  <motion.span
                    className="block h-full w-full"
                    initial={{ scale: 0, rotate: -40 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.3 + i * 0.07 }}
                  >
                    {s.acquired ? <Flower /> : <Bud />}
                  </motion.span>
                  <span
                    aria-hidden
                    className={cn(
                      'pointer-events-none absolute bottom-full left-1/2 z-10 mb-1.5 w-max max-w-[160px] -translate-x-1/2 rounded-lg bg-ink px-2.5 py-1.5 text-center text-xs font-semibold text-white opacity-0 shadow-soft transition-opacity',
                      'group-hover:opacity-100 group-focus-visible:opacity-100',
                    )}
                  >
                    {s.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-auto flex flex-col gap-3 border-t border-earth/30 bg-white/60 px-6 py-4 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <p aria-live="polite" className="min-h-[1.5rem] font-semibold text-ink">
          {active ? (
            <>
              {active.label} · <span className={active.acquired ? 'text-coral-dk' : 'text-leaf-dk'}>{active.acquired ? tree.acquiredStatus : tree.budStatus}</span>
            </>
          ) : (
            <span className="font-normal text-ink-2">{tree.hint}</span>
          )}
        </p>
        <ul className="flex shrink-0 flex-wrap gap-x-4 gap-y-1 text-xs text-ink-2">
          <li className="flex items-center gap-1.5"><span className="h-4 w-4"><Flower /></span>{tree.legend.acquired}</li>
          <li className="flex items-center gap-1.5"><span className="h-4 w-4"><Bud /></span>{tree.legend.bud}</li>
        </ul>
      </div>
    </div>
  );
}
