import { IconBox, Reveal, Section, SectionHeader, cn, toneSolid } from '@/components/ui';
import { trustColumns, trustHeader } from '@/content/relier';
import type { Tone } from '@/lib/types';

const border: Partial<Record<Tone, string>> = {
  water: 'border-t-water',
  earth: 'border-t-earth',
  coral: 'border-t-coral',
};

/** « Je peux confier » / « Je vérifie » / « Je ne confie jamais » — 3 listes titrées (empilées sur mobile). */
export function TrustColumns() {
  return (
    <Section bg="white" aria-labelledby="confier-titre" className="border-y border-line">
      <SectionHeader id="confier-titre" {...trustHeader} />
      <div className="grid gap-5 md:grid-cols-3">
        {trustColumns.map((col, i) => (
          <Reveal key={col.id} delay={i * 0.1} as="article" className={cn('flex flex-col rounded-xl2 border border-t-[6px] border-line bg-sand p-6', border[col.tone])}>
            <header className="mb-5 flex items-center gap-3.5">
              <IconBox icon={col.icon} tone={col.tone} />
              <div>
                <h3 className="text-lg font-extrabold leading-tight text-ink">{col.title}</h3>
                <p className="text-sm text-ink-2">{col.caption}</p>
              </div>
            </header>
            <ul className="space-y-2.5">
              {col.items.map((it) => (
                <li key={it} className="flex gap-2.5 rounded-xl bg-white px-3.5 py-3 text-[15px] text-ink">
                  <span aria-hidden className={cn('mt-[7px] h-2 w-2 flex-none rounded-full', toneSolid[col.tone])} />
                  {it}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
