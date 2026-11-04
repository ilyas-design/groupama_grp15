import { IconBox, Icon, Reveal } from '@/components/ui';
import type { PillarCard } from '@/content/simplifier';

interface PillarCardsProps {
  cards: PillarCard[];
  roleLabel: string;
}

/** 4 cartes d'usage, chacune avec son encadré « Votre rôle ». */
export function PillarCards({ cards, roleLabel }: PillarCardsProps) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c, i) => (
        <Reveal as="li" key={c.id} delay={i * 0.08} className="flex">
          <article className="flex w-full flex-col rounded-card border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
            <IconBox icon={c.icon} tone={c.tone} />
            <h3 className="h3 mt-5 text-lg">{c.title}</h3>
            <p className="mt-2 flex-1 text-[15px] text-ink-2">{c.text}</p>
            <div className="mt-5 rounded-[14px] border border-green-700/15 bg-leaf-lt p-4">
              <p className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.1em] text-green-800">
                <Icon name="UserCheck" className="h-4 w-4" />
                {roleLabel}
              </p>
              <p className="mt-1.5 text-sm font-semibold text-ink">{c.role}</p>
            </div>
          </article>
        </Reveal>
      ))}
    </ul>
  );
}
