'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button, Icon, Tag, cn } from '@/components/ui';
import type { RiskAlert, RiskType, RiskTypeDef, riskMap as RiskMapContent } from '@/content/anticiper';
import { AlertList } from './AlertList';
import { FranceMap } from './FranceMap';
import { riskSwatch } from './riskStyles';

interface RiskMapProps {
  ui: typeof RiskMapContent;
  types: RiskTypeDef[];
  alerts: RiskAlert[];
}

type Filter = RiskType | 'all';
const fmt = new Intl.NumberFormat('fr-FR');

/** Carte prédictive + filtres + légende + alertes + CTA « Prévenir les sociétaires ». */
export function RiskMap({ ui, types, alerts }: RiskMapProps) {
  const [filter, setFilter] = useState<Filter>('all');
  const [confirmed, setConfirmed] = useState(false);

  const visible = alerts.filter((a) => filter === 'all' || a.risk === filter);
  const total = visible.reduce((s, a) => s + a.members, 0);
  const mapLabel = `${ui.mapAlt} ${visible.map((a) => `${a.mapLabel} : ${types.find((t) => t.id === a.risk)?.label}`).join(', ')}.`;

  const choose = (f: Filter) => {
    setFilter(f);
    setConfirmed(false);
  };

  const filters: { id: Filter; label: string; icon?: RiskTypeDef['icon'] }[] = [
    { id: 'all', label: ui.allLabel },
    ...types.map((t) => ({ id: t.id, label: t.label, icon: t.icon })),
  ];

  return (
    <div className="grid gap-8 rounded-xl2 border border-line bg-white p-4 sm:p-6 lg:grid-cols-[1.3fr_1fr] lg:gap-6 lg:p-7">
      <div className="min-w-0">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h3 className="h3">{ui.mapTitle}</h3>
          <Tag tone="water" icon="RefreshCw">
            {ui.updated}
          </Tag>
        </div>

        <div role="group" aria-label={ui.filtersLabel} className="mb-4 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => choose(f.id)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[13px] font-semibold transition-colors',
                filter === f.id ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink hover:border-green-700',
              )}
            >
              {f.icon && <Icon name={f.icon} className="h-4 w-4" />}
              {f.label}
            </button>
          ))}
        </div>

        <div className="relative aspect-[600/580] max-h-[520px] w-full overflow-hidden rounded-card bg-[linear-gradient(160deg,#EEF6EE,#E4EFE8)] p-2 sm:p-4">
          <FranceMap alerts={alerts} active={filter} label={mapLabel} />
        </div>

        <div className="mt-3">
          <p className="sr-only">{ui.legendTitle}</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-ink-2">
            {types.map((t) => (
              <li key={t.id} className="flex items-center gap-2">
                <span aria-hidden className={cn('inline-block h-3.5 w-3.5 rounded-[4px]', riskSwatch[t.id])} />
                <span>
                  <b className="text-ink">{t.label}</b> · {t.patternLabel}
                </span>
              </li>
            ))}
            <li className="flex items-center gap-2">
              <span aria-hidden className="relative inline-flex h-3 w-3">
                <span className="absolute inset-0 animate-ping rounded-full bg-coral/60" />
                <span className="relative h-3 w-3 rounded-full border-2 border-white bg-coral-dk" />
              </span>
              {ui.pulseLegend}
            </li>
          </ul>
        </div>
      </div>

      <div className="flex min-w-0 flex-col">
        <h3 className="h3 mb-4">{ui.alertsTitle}</h3>
        <AlertList
          alerts={visible}
          types={types}
          levels={ui.levels}
          levelPrefix={ui.levelPrefix}
          membersSuffix={ui.membersSuffix}
          empty={ui.empty}
        />

        <div className="mt-4 lg:mt-auto lg:pt-4">
          <Button
            className="w-full"
            iconLeft={confirmed ? 'CheckCircle2' : 'Bell'}
            onClick={() => setConfirmed(true)}
            disabled={total === 0}
          >
            {ui.cta}
          </Button>
          <AnimatePresence initial={false}>
            {confirmed && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-3 rounded-[14px] border border-green-700/30 bg-leaf-lt p-4 text-sm text-green-900"
              >
                <p className="flex items-start gap-2 font-bold">
                  <Icon name="UserCheck" className="mt-0.5 h-4 w-4 flex-none" />
                  <span>{ui.confirm.replace('{n}', fmt.format(total))}</span>
                </p>
                <p className="mt-1 text-green-800">{ui.confirmSub}</p>
                <button
                  type="button"
                  onClick={() => setConfirmed(false)}
                  className="mt-2 font-bold text-green-800 underline underline-offset-4 hover:text-green-900"
                >
                  {ui.cancel}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          <p role="status" aria-live="polite" className="sr-only">
            {confirmed ? `${ui.confirm.replace('{n}', fmt.format(total))} ${ui.confirmSub}` : ''}
          </p>
        </div>
      </div>
    </div>
  );
}
