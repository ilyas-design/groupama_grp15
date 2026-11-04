'use client';

import { motion } from 'framer-motion';
import { Counter } from '@/components/ui';
import type { Stat } from '@/lib/types';

/** Bandeau vert des 4 chiffres animés, avec barre décorative qui « pousse ». */
export function StatGrid({ stats }: { stats: Stat[] }) {
  return (
    <ul className="relative grid gap-8 overflow-hidden rounded-xl3 bg-green-700 px-6 py-10 text-white sm:grid-cols-2 sm:px-10 sm:py-12 lg:grid-cols-4 lg:gap-6 lg:px-12 lg:py-14">
      {stats.map((s) => (
        <li key={s.label}>
          <p className="font-serif text-[44px] font-semibold leading-none sm:text-[54px]">
            <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
          </p>
          <p className="mt-2 text-sm text-white/90">{s.label}</p>
          {s.progress !== undefined && (
            <div aria-hidden className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/15">
              <motion.div
                className="h-full rounded-full bg-leaf"
                initial={{ width: 0 }}
                whileInView={{ width: `${s.progress}%` }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
