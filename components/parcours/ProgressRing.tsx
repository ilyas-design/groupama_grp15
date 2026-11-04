'use client';

import { motion } from 'framer-motion';

interface ProgressRingProps {
  /** 0–100 */
  value: number;
  /** Texte sous le pourcentage (ex. « vers Forêt ») */
  caption: string;
  /** Nom accessible de la jauge */
  label: string;
}

const SIZE = 150;
const R = 62;
const C = 2 * Math.PI * R;

/** Anneau de progression qui se remplit à l'entrée dans le viewport. */
export function ProgressRing({ value, caption, label }: ProgressRingProps) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div
      role="progressbar"
      aria-valuenow={v}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className="relative h-[150px] w-[150px] flex-none"
    >
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="-rotate-90" aria-hidden focusable="false">
        <circle cx="75" cy="75" r={R} fill="none" stroke="#EFE6D8" strokeWidth="14" />
        <motion.circle
          cx="75"
          cy="75"
          r={R}
          fill="none"
          stroke="url(#ring-grad)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          whileInView={{ strokeDashoffset: C * (1 - v / 100) }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <defs>
          <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#57B54D" />
            <stop offset="100%" stopColor="#1B7E4D" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center" aria-hidden>
        <div>
          <span className="block font-serif text-4xl font-semibold leading-none text-ink">{v} %</span>
          <span className="text-xs text-ink-2">{caption}</span>
        </div>
      </div>
    </div>
  );
}
