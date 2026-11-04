import { Icon, Reveal, SectionHeader, Tag, cn } from '@/components/ui';
import type { WatchContent } from '@/content/simplifier';
import { SubscribeForm } from './SubscribeForm';

const euro = (n: number) => `${n.toLocaleString('fr-FR')} €`;

function PriceTable({ table, id }: { table: WatchContent['table']; id: string }) {
  return (
    <div>
      <div
        role="region"
        aria-labelledby={`${id}-caption`}
        tabIndex={0}
        className="relative overflow-x-auto rounded-card border border-line bg-white"
      >
        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
          <caption id={`${id}-caption`} className="px-5 pb-2 pt-4 text-left text-sm font-bold text-ink">
            {table.caption}
          </caption>
          <thead>
            <tr className="border-b border-line bg-sand">
              <th scope="col" className="px-5 py-3 font-bold text-ink-2">
                {table.productHeader} <span className="font-semibold">({table.unit})</span>
              </th>
              {table.columns.map((col, i) => (
                <th key={col} scope="col" className={cn('px-4 py-3 text-right font-bold', i === 0 ? 'text-green-800' : 'text-ink-2')}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((r) => {
              const min = Math.min(...r.prices);
              return (
                <tr key={r.product} className="border-b border-line last:border-0">
                  <th scope="row" className="px-5 py-3 font-semibold text-ink">
                    {r.product}
                  </th>
                  {r.prices.map((p, i) => (
                    <td key={table.columns[i]} className={cn('px-4 py-3 text-right tabular-nums', i === 0 && 'bg-leaf-lt/50')}>
                      {p === min ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-leaf-lt px-2 py-0.5 font-extrabold text-green-800">
                          <Icon name="Check" className="h-3.5 w-3.5" />
                          {euro(p)}
                          <span className="sr-only">, {table.lowest}</span>
                        </span>
                      ) : (
                        <span className="text-ink">{euro(p)}</span>
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-2 sm:hidden">
        <Icon name="ArrowRight" className="h-3.5 w-3.5" />
        {table.scrollHint}
      </p>
      <p className="mt-2 text-xs text-ink-2">{table.note}</p>
    </div>
  );
}

/** Veille concurrentielle : tableau de prix + 3 infos de la semaine + abonnement. */
export function CompetitiveWatch({ content }: { content: WatchContent }) {
  return (
    <>
      <SectionHeader
        id={`${content.id}-titre`}
        eyebrow={content.header.eyebrow}
        title={content.header.title}
        lead={content.header.lead}
        aside={
          <ul className="flex flex-wrap gap-2">
            {content.topics.map((t) => (
              <li key={t}>
                <Tag tone="water">{t}</Tag>
              </li>
            ))}
          </ul>
        }
      />
      <Reveal>
        <PriceTable table={content.table} id={content.id} />
      </Reveal>

      <div className="mt-8 grid items-start gap-5 lg:grid-cols-[1.2fr_1fr]">
        <Reveal className="rounded-card border border-line bg-sand p-5 sm:p-6">
          <h3 className="text-lg font-extrabold text-ink">{content.newsTitle}</h3>
          <ul>
            {content.news.map((n) => (
              <li key={n.id} className="flex gap-3.5 border-b border-line py-4 last:border-0 last:pb-0">
                <span className="grid h-11 w-11 flex-none place-items-center rounded-[12px] bg-water-lt text-[11px] font-extrabold text-water-dk">
                  {n.code}
                </span>
                <div>
                  <h4 className="text-[15px] font-bold text-ink">{n.title}</h4>
                  <p className="text-sm text-ink-2">{n.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <SubscribeForm form={content.form} />
        </Reveal>
      </div>
    </>
  );
}
