'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Icon, cn } from '@/components/ui';
import { toneSoft } from '@/components/ui/tones';
import type { AlertLevel, RiskAlert, RiskTypeDef } from '@/content/anticiper';
import { levelStyle } from './riskStyles';

interface AlertListProps {
  alerts: RiskAlert[];
  types: RiskTypeDef[];
  levels: Record<AlertLevel, string>;
  levelPrefix: string;
  membersSuffix: string;
  empty: string;
}

const fmt = new Intl.NumberFormat('fr-FR');

/** Liste des alertes prédictives filtrées (niveau, zone, horizon, sociétaires concernés). */
export function AlertList({ alerts, types, levels, levelPrefix, membersSuffix, empty }: AlertListProps) {
  return (
    <ul className="grid gap-2.5">
      <AnimatePresence initial={false} mode="popLayout">
        {alerts.map((a) => {
          const t = types.find((x) => x.id === a.risk);
          return (
            <motion.li
              key={a.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
              className="flex gap-3 rounded-[14px] bg-sand p-3.5 text-[13px]"
            >
              {t && (
                <span className={cn('grid h-[38px] w-[38px] flex-none place-items-center rounded-[12px]', toneSoft[t.tone])}>
                  <Icon name={t.icon} className="h-[18px] w-[18px]" />
                </span>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-ink">
                  {a.title} — {a.horizon}
                </p>
                <p className="text-ink-2">
                  {a.zone} · {a.detail}
                </p>
                <p className="mt-1 font-bold text-ink">
                  {fmt.format(a.members)} <span className="font-medium text-ink-2">{membersSuffix}</span>
                </p>
              </div>
              <span className={cn('h-fit flex-none rounded-lg px-2 py-1 text-xs font-extrabold', levelStyle[a.level])}>
                <span className="sr-only">{levelPrefix} </span>
                {levels[a.level]}
              </span>
            </motion.li>
          );
        })}
      </AnimatePresence>
      {alerts.length === 0 && <li className="rounded-[14px] bg-sand p-4 text-sm text-ink-2">{empty}</li>}
    </ul>
  );
}
