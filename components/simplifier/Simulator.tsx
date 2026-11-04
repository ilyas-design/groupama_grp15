'use client';

import { animate, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Eyebrow, Icon, cn } from '@/components/ui';
import type { SimulatorContent } from '@/content/simplifier';

const fmt = (n: number) => n.toLocaleString('fr-FR', { maximumFractionDigits: 1 });

/** Nombre qui glisse de l'ancienne valeur vers la nouvelle. */
function AnimatedHours({ value }: { value: number }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(value);
  const from = useRef(value);

  useEffect(() => {
    if (reduce) {
      setN(value);
      from.current = value;
      return;
    }
    const ctrl = animate(from.current, value, { duration: 0.8, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v * 10) / 10) });
    from.current = value;
    return () => ctrl.stop();
  }, [value, reduce]);

  return <>{fmt(n)}</>;
}

/** Simulateur « Ce que l'IA change pour mon métier » : profil → heures libérées + barres par tâche. */
export function Simulator({ content }: { content: SimulatorContent }) {
  const [activeId, setActiveId] = useState(content.profiles[0].id);
  const profile = content.profiles.find((p) => p.id === activeId) ?? content.profiles[0];
  const total = profile.tasks.reduce((s, t) => s + t.hours, 0);
  const message = content.announce.replace('{profil}', profile.label).replace('{heures}', fmt(total));

  return (
    <div className="grid overflow-hidden rounded-xl3 border border-line bg-white lg:grid-cols-[.8fr_1.2fr]">
      <div className="bg-ink p-6 text-white sm:p-9">
        <Eyebrow light>{content.eyebrow}</Eyebrow>
        <h2 id={`${content.id}-titre`} className="mt-3 font-serif text-[1.625rem] font-semibold leading-tight sm:text-3xl">
          {content.title}
        </h2>
        <p id={`${content.id}-choix`} className="mb-2.5 mt-6 text-xs font-extrabold uppercase tracking-[0.1em] text-white/70">
          {content.chooseLabel}
        </p>
        <div role="group" aria-labelledby={`${content.id}-choix`} className="flex flex-col gap-2">
          {content.profiles.map((p) => {
            const on = p.id === activeId;
            return (
              <button
                key={p.id}
                type="button"
                aria-pressed={on}
                onClick={() => setActiveId(p.id)}
                className={cn(
                  'flex items-center gap-3 rounded-[14px] border px-4 py-3.5 text-left font-semibold transition-colors',
                  on ? 'border-leaf bg-leaf text-ink' : 'border-white/15 bg-white/5 text-white hover:bg-white/10',
                )}
              >
                <Icon name={p.icon} className="h-[18px] w-[18px] flex-none" />
                <span className="flex-1">{p.label}</span>
                {on && <Icon name="Check" className="h-4 w-4" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-6 sm:p-9">
        <p className="text-sm font-bold text-ink-2">{content.resultLabel}</p>
        <p className="mb-6 mt-2 flex items-baseline gap-2.5" aria-hidden>
          <span className="font-serif text-6xl leading-none text-water-dk sm:text-[4rem]">
            <AnimatedHours value={total} /> {content.unit}
          </span>
          <span className="text-ink-2">{content.perWeek}</span>
        </p>
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {message}
        </p>

        <ul key={profile.id}>
          {profile.tasks.map((t, i) => (
            <li
              key={t.label}
              className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 border-b border-line py-3 text-sm sm:grid-cols-[1fr_150px_64px]"
            >
              <span className="font-semibold text-ink">{t.label}</span>
              <span className="col-span-2 row-start-2 h-2 overflow-hidden rounded-full bg-water-lt sm:col-span-1 sm:row-start-auto">
                <motion.span
                  className="block h-full rounded-full bg-water"
                  initial={{ width: 0 }}
                  animate={{ width: `${t.share}%` }}
                  transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                />
                <span className="sr-only">
                  {content.taskShareLabel} : {t.share} %
                </span>
              </span>
              <b className="col-start-2 row-start-1 text-right text-water-dk sm:col-start-auto sm:row-start-auto">
                −{fmt(t.hours)} {content.unit}
              </b>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-ink-2">{content.note}</p>
      </div>
    </div>
  );
}
