'use client';

import { motion } from 'framer-motion';
import { budgetSection, budgetYears } from '@/content/projet';

const euro = (n: number) => `${n.toLocaleString('fr-FR')} €`;

/** Budget sur 5 ans : une barre par année, valeur écrite en clair (lisible sans la couleur). */
export function BudgetBars() {
  const max = Math.max(...budgetYears.map((y) => y.amount));
  return (
    <figure className="rounded-xl3 border border-line bg-white p-6 sm:p-8">
      <figcaption className="mb-6 text-sm font-bold text-ink-2">{budgetSection.caption}</figcaption>
      <ol className="space-y-5">
        {budgetYears.map((y, i) => (
          <li key={y.year} className="grid gap-2 sm:grid-cols-[110px_1fr_110px] sm:items-center sm:gap-5">
            <span className="font-serif text-lg font-semibold">{y.year}</span>
            <div>
              <div className="h-3 overflow-hidden rounded-r bg-sand" aria-hidden>
                <motion.div
                  className="h-full rounded-r bg-green-700"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(y.amount / max) * 100}%` }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <p className="mt-1.5 text-[13px] text-ink-2">{y.text}</p>
            </div>
            <span className="text-lg font-extrabold tabular-nums sm:text-right">{euro(y.amount)}</span>
          </li>
        ))}
      </ol>
      <div className="mt-8 flex flex-wrap items-baseline justify-between gap-3 border-t border-line pt-6">
        <span className="text-sm font-bold uppercase tracking-[0.08em] text-ink-2">{budgetSection.totalLabel}</span>
        <span className="font-serif text-4xl font-semibold text-green-800">{budgetSection.total}</span>
      </div>
      <p className="mt-3 text-xs text-ink-2">{budgetSection.note}</p>
    </figure>
  );
}
