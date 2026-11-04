import { Card, Icon, IconBox, Reveal, Section, SectionHeader } from '@/components/ui';
import { skillPredictions, skillsForecastSection, skillsForecastUi as ui } from '@/content/grandir';

/** IA prédictive RH — métiers, formations, carrières, mobilités. */
export function SkillsForecast() {
  return (
    <Section id="competences-demain" aria-labelledby="competences-demain-titre">
      <SectionHeader id="competences-demain-titre" {...skillsForecastSection} />
      <ul className="grid gap-5 md:grid-cols-2">
        {skillPredictions.map((p, i) => (
          <Reveal as="li" key={p.id} delay={i * 0.08} className="flex">
            <Card className="flex w-full flex-col gap-4">
              <div className="flex items-center gap-4">
                <IconBox icon={p.icon} tone={p.tone} />
                <h3 className="h3">{p.title}</h3>
              </div>
              <p className="text-sm text-ink-2">
                <b className="text-ink">{ui.goalLabel} : </b>
                {p.goal}
              </p>
              <ul className="flex flex-wrap gap-2">
                {p.items.map((it) => (
                  <li key={it} className="rounded-full bg-sand px-3 py-1.5 text-[13px] font-semibold text-ink">
                    {it}
                  </li>
                ))}
              </ul>
              {p.paths && (
                <div>
                  <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.1em] text-ink-2">{ui.pathsLabel}</p>
                  <ul className="space-y-2 text-sm">
                    {p.paths.map((path) => (
                      <li key={path.from} className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold">{path.from}</span>
                        <Icon name="ArrowRight" className="h-4 w-4 text-coral-dk" />
                        <span className="sr-only">{ui.pathArrow}</span>
                        <span className="font-semibold text-green-800">{path.to}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <p className="mt-auto flex gap-2 rounded-xl bg-leaf-lt p-3.5 text-sm text-green-900">
                <Icon name="Sprout" className="mt-0.5 h-4 w-4 flex-none" />
                <span>
                  <b>{ui.resultLabel} : </b>
                  {p.result}
                </span>
              </p>
            </Card>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
