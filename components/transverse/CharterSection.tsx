import { Icon, IconBox, Reveal, RichText, toneSoft, cn } from '@/components/ui';
import type { CharterSectionContent } from '@/content/transverse';

interface CharterSectionProps {
  section: CharterSectionContent;
  labels: { principles: string; concretely: string; commitments: string };
}

/** Une section de la charte : principes + « Concrètement… » + engagements. */
export function CharterSection({ section, labels }: CharterSectionProps) {
  const headingId = `${section.id}-titre`;
  return (
    <article id={section.id} aria-labelledby={headingId} className="scroll-mt-24 border-b border-line pb-14 last:border-b-0 lg:pb-16">
      <Reveal>
        <div className="flex items-start gap-4">
          <IconBox icon={section.icon} tone={section.tone} size="lg" className="hidden sm:grid" />
          <div>
            <p className={cn('inline-flex rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-[0.1em]', toneSoft[section.tone])}>
              {section.eyebrow}
            </p>
            <h2 id={headingId} className="h2 mb-3 mt-3 !text-[1.875rem] sm:!text-4xl">
              <RichText text={section.title} />
            </h2>
            <p className="lead !text-base sm:!text-lg">{section.intro}</p>
          </div>
        </div>
      </Reveal>

      <p className="mb-4 mt-9 text-xs font-extrabold uppercase tracking-[0.12em] text-ink-2">{labels.principles}</p>
      <ul className={cn('grid gap-4', section.principles.length === 4 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 xl:grid-cols-3')}>
        {section.principles.map((p, i) => (
          <Reveal as="li" key={p.title} delay={i * 0.06} className="rounded-card border border-line bg-white p-5 transition-shadow hover:shadow-soft">
            <h3 className="mb-2 text-base font-extrabold text-ink">{p.title}</h3>
            <p className="text-[15px] text-ink-2">{p.text}</p>
          </Reveal>
        ))}
      </ul>

      <div className="mt-5 grid gap-4 md:grid-cols-[1.15fr_1fr]">
        <Reveal className="rounded-card bg-sand-2 p-6">
          <h3 className="mb-4 flex items-center gap-2 font-serif text-xl font-semibold italic text-green-800">
            <Icon name="Lightbulb" className="h-5 w-5" />
            {labels.concretely}
          </h3>
          <ul className="grid gap-3">
            {section.concretely.map((c) => (
              <li key={c} className="flex gap-3 text-[15px] text-ink">
                <Icon name="ArrowRight" className="mt-1 h-4 w-4 flex-none text-green-700" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.08} className="rounded-card border-2 border-dashed border-green-700/30 bg-white p-6">
          <h3 className="mb-4 flex items-center gap-2 text-base font-extrabold text-green-800">
            <Icon name="BadgeCheck" className="h-5 w-5" />
            {labels.commitments}
          </h3>
          <ul className="grid gap-3">
            {section.commitments.map((c) => (
              <li key={c} className="flex gap-3 text-[15px] text-ink-2">
                <span aria-hidden className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-green-700 text-white">
                  <Icon name="Check" className="h-3 w-3" strokeWidth={3} />
                </span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </article>
  );
}
