import { Icon, Reveal, Section, SectionHeader } from '@/components/ui';
import { budgetSection, kpiSection, kpis, phases, timelineSection } from '@/content/projet';
import { BudgetBars } from './BudgetBars';

/** Calendrier 12 mois, budget 5 ans, indicateurs de réussite. */
export function PlanSection() {
  return (
    <>
      <Section id="calendrier" aria-labelledby="calendrier-titre">
        <SectionHeader id="calendrier-titre" {...timelineSection} />
        <ol className="relative grid gap-4 lg:grid-cols-5">
          <span aria-hidden className="absolute left-[19px] top-2 h-[calc(100%-1rem)] w-0.5 bg-leaf/40 lg:left-0 lg:top-[19px] lg:h-0.5 lg:w-full" />
          {phases.map((p, i) => (
            <Reveal as="li" key={p.months} delay={i * 0.08} className="relative flex gap-4 lg:flex-col">
              <span className="relative z-[1] grid h-10 w-10 flex-none place-items-center rounded-full bg-green-700 font-bold text-white">{i + 1}</span>
              <div className="rounded-card border border-line bg-white p-5 lg:mt-1">
                <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-green-700">{p.months}</p>
                <h3 className="mt-1 text-lg font-extrabold">{p.title}</h3>
                <p className="mt-1 text-sm text-ink-2">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section id="budget" bg="white" className="border-y border-line" aria-labelledby="budget-titre">
        <SectionHeader id="budget-titre" eyebrow={budgetSection.eyebrow} title={budgetSection.title} lead={budgetSection.lead} />
        <BudgetBars />
      </Section>

      <Section id="indicateurs" aria-labelledby="indicateurs-titre">
        <SectionHeader id="indicateurs-titre" {...kpiSection} />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((k, i) => (
            <Reveal as="li" key={k.label} delay={i * 0.05} className="rounded-card bg-green-900 p-6 text-white">
              <Icon name={k.icon} className="h-6 w-6 text-leaf" />
              <p className="mt-4 font-serif text-4xl font-semibold leading-none">{k.value}</p>
              <p className="mt-2 text-sm text-white/80">{k.label}</p>
            </Reveal>
          ))}
        </ul>
      </Section>
    </>
  );
}
