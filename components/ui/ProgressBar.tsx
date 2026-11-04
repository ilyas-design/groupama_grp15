'use client';

import { motion } from 'framer-motion';
import type { Tone } from '@/lib/types';
import { toneSolid } from './tones';
import { cn } from './cn';

interface ProgressBarProps {
  /** 0–100 */
  value: number;
  label?: string;
  /** Texte affiché à droite (ex. « 72 % ») ; par défaut `${value} %` si label présent */
  valueLabel?: string;
  tone?: Tone;
  /** Piste claire pour fonds sombres */
  onDark?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

/** Barre qui « pousse » quand elle entre dans le viewport. */
export function ProgressBar({ value, label, valueLabel, tone = 'leaf', onDark, size = 'md', className }: ProgressBarProps) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className={className}>
      {label && (
        <div className={cn('mb-1.5 flex justify-between gap-3 text-sm font-semibold', onDark ? 'text-white/85' : 'text-ink-2')}>
          <span>{label}</span>
          <span className={onDark ? 'text-white' : 'text-ink'}>{valueLabel ?? `${v} %`}</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={v}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        className={cn('overflow-hidden rounded-full', size === 'sm' ? 'h-1.5' : 'h-2', onDark ? 'bg-white/15' : 'bg-sand-2')}
      >
        <motion.div
          className={cn('h-full rounded-full', toneSolid[tone])}
          initial={{ width: 0 }}
          whileInView={{ width: `${v}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
