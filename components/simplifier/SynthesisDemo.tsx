'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Button, Icon, cn } from '@/components/ui';
import type { SynthesisContent } from '@/content/simplifier';
import type { Tone } from '@/lib/types';
import { SynthesisResult } from './SynthesisResult';

type Phase = 'idle' | 'loading' | 'ready';

/** Pastilles de type de fichier : fonds foncés pour un texte blanc lisible (AA). */
const docBg: Partial<Record<Tone, string>> = { coral: 'bg-coral-dk', water: 'bg-water-dk', green: 'bg-green-700', earth: 'bg-earth-dk' };

/** Démo : pile de documents source → synthèse IA à vérifier puis valider. */
export function SynthesisDemo({ content }: { content: SynthesisContent }) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (phase !== 'loading') return;
    const t = window.setTimeout(() => setPhase('ready'), 1100);
    return () => window.clearTimeout(t);
  }, [phase]);

  const start = () => {
    setPhase('loading');
    setRun((r) => r + 1);
  };

  const status = phase === 'loading' ? content.generatingStatus : phase === 'ready' ? content.readyStatus : '';

  return (
    <div>
      <div className="grid overflow-hidden rounded-xl2 border border-line bg-white lg:grid-cols-2">
        <div className="bg-sand-2 p-6 sm:p-7">
          <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-ink-2">{content.sourcesLabel}</p>
          <ul className="mt-4 space-y-2.5">
            {content.docs.map((d, i) => (
              <motion.li
                key={d.name}
                className="flex items-center gap-3 rounded-[10px] bg-white p-3.5 text-sm shadow-[0_2px_6px_rgba(0,0,0,.05)]"
                style={{ marginLeft: `${i * 6}px` }}
                animate={phase === 'loading' ? { x: [0, 8, 0], opacity: [1, 0.7, 1] } : { x: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: i * 0.1 }}
              >
                <span
                  className={cn(
                    'grid h-10 w-[34px] flex-none place-items-center rounded-md text-[10px] font-extrabold text-white',
                    docBg[d.tone] ?? 'bg-ink',
                  )}
                >
                  {d.type}
                </span>
                <span className="min-w-0">
                  <b className="block truncate font-bold text-ink">{d.name}</b>
                  <small className="text-ink-2">{d.meta}</small>
                </span>
              </motion.li>
            ))}
          </ul>
          <Button className="mt-5" iconLeft="Sparkles" onClick={start} disabled={phase === 'loading'}>
            {phase === 'loading' ? content.generating : phase === 'ready' ? content.regenerate : content.generate}
          </Button>
        </div>

        <div className="relative min-h-[360px] p-6 sm:p-7">
          <p className="sr-only" role="status">
            {status}
          </p>
          <AnimatePresence mode="wait">
            {phase === 'ready' ? (
              <motion.div
                key={`r${run}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
              >
                <SynthesisResult content={content} />
              </motion.div>
            ) : (
              <motion.div
                key={phase}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid h-full min-h-[300px] place-items-center text-center"
              >
                <div className="max-w-xs">
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-water-lt text-water-dk">
                    <Icon
                      name={phase === 'loading' ? 'RefreshCw' : 'FileSearch'}
                      className={cn('h-7 w-7', phase === 'loading' && 'animate-spin')}
                    />
                  </span>
                  <p className="mt-4 text-[15px] text-ink-2">{phase === 'loading' ? content.generating : content.emptyText}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-5 flex flex-col items-start gap-3 rounded-card bg-signature-dk p-5 text-white sm:flex-row sm:items-center sm:gap-6 sm:px-7">
        <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.1em] text-leaf-lt">
          <Icon name="Timer" className="h-4 w-4" />
          {content.gain.label}
        </p>
        <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span>
            <s className="font-serif text-3xl text-white/80">{content.gain.before}</s>{' '}
            <span className="text-white/85">{content.gain.beforeLabel}</span>
          </span>
          <Icon name="ArrowRight" className="h-5 w-5 self-center" />
          <span>
            <strong className="font-serif text-3xl">{content.gain.after}</strong>{' '}
            <span className="text-white/90">{content.gain.afterLabel}</span>
          </span>
        </p>
      </div>
    </div>
  );
}
