import Link from 'next/link';
import { Icon, Reveal, Section, SectionHeader, cn } from '@/components/ui';
import { pillarMore, pillars, pillarsHeader, type PillarTone } from '@/content/home';

const toneCls: Record<PillarTone, { box: string; text: string; dot: string; deco: string }> = {
  water: { box: 'bg-water-lt text-water-dk', text: 'text-water-dk', dot: 'bg-water', deco: 'text-water' },
  green: { box: 'bg-leaf-lt text-green-700', text: 'text-green-700', dot: 'bg-leaf', deco: 'text-green-700' },
  blue: { box: 'bg-[#E3EEF7] text-blue-800', text: 'text-blue-800', dot: 'bg-blue-700', deco: 'text-blue-700' },
  earth: { box: 'bg-sand-2 text-earth-dk', text: 'text-earth-dk', dot: 'bg-earth', deco: 'text-earth-dk' },
};

/** Les 4 piliers, en cartes-liens vers chaque page. */
export function Pillars() {
  return (
    <Section aria-labelledby="piliers-titre">
      <SectionHeader id="piliers-titre" {...pillarsHeader} />
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((p, i) => {
          const t = toneCls[p.tone];
          return (
            <Reveal as="li" key={p.href} delay={i * 0.08}>
              <Link
                href={p.href}
                className="group relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-card border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft lg:min-h-[330px]"
              >
                <span className="font-serif text-[15px] text-ink-2">{p.num}</span>
                <span className={cn('mt-4 grid h-12 w-12 place-items-center rounded-[14px]', t.box)}>
                  <Icon name={p.icon} className="h-6 w-6" />
                </span>
                <span className={cn('mb-1.5 mt-[18px] text-xs font-extrabold uppercase tracking-[0.1em]', t.text)}>{p.meta}</span>
                <h3 className="h3 text-[22px]">{p.title}</h3>
                <ul className="mb-6 mt-4 grid gap-2 text-sm text-ink-2">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2">
                      <span aria-hidden className={cn('h-1.5 w-1.5 flex-none rounded-full', t.dot)} />
                      {pt}
                    </li>
                  ))}
                </ul>
                <span className={cn('mt-auto flex items-center gap-1.5 text-sm font-bold', t.text)}>
                  {pillarMore}
                  <Icon name="ArrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <Icon name={p.icon} className={cn('pointer-events-none absolute -bottom-[18px] -right-[18px] h-24 w-24 opacity-[0.08]', t.deco)} />
              </Link>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
