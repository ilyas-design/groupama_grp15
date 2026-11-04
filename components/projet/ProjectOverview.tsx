import Link from 'next/link';
import { Icon, IconBox, Reveal, Section, SectionHeader } from '@/components/ui';
import { actionSummaries, actionsSection, actionsUi, objectives, objectivesSection } from '@/content/projet';

/** Objectifs + résumé des 5 actions (liens vers /grandir et /parcours). */
export function ProjectOverview() {
  return (
    <>
      <Section id="objectifs" aria-labelledby="objectifs-titre">
        <SectionHeader id="objectifs-titre" {...objectivesSection} />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {objectives.map((o, i) => (
            <Reveal as="li" key={o.text} delay={i * 0.06} className="rounded-card border border-line bg-white p-5">
              <IconBox icon={o.icon} tone={o.tone} size="sm" />
              <p className="mt-4 text-[15px] font-semibold leading-snug">{o.text}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section id="actions" bg="white" className="border-y border-line" aria-labelledby="actions-titre">
        <SectionHeader id="actions-titre" {...actionsSection} />
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {actionSummaries.map((a, i) => (
            <Reveal as="li" key={a.name} delay={i * 0.06} className="flex">
              <Link
                href={a.href}
                className="group flex w-full flex-col rounded-card border border-line bg-sand p-5 transition-all hover:-translate-y-1 hover:border-green-700 hover:shadow-soft"
              >
                <span className="flex items-center justify-between">
                  <span className="font-serif text-3xl text-green-700">{String(a.number).padStart(2, '0')}</span>
                  <Icon name={a.icon} className="h-6 w-6 text-green-700" />
                </span>
                <span className="mt-3 text-lg font-extrabold">{a.name}</span>
                <span className="mt-2 flex-1 text-sm text-ink-2">{a.text}</span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-green-800">
                  {actionsUi.more}
                  <Icon name="ArrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ol>
      </Section>
    </>
  );
}
