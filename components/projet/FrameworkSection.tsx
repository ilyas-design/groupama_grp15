import { Button, Icon, IconBox, Reveal, Section, SectionHeader } from '@/components/ui';
import { benefits, charterLink, frameworkSection, legalFramework, legalLabel, outcomesSection, results, successPillars } from '@/content/projet';

/** Facteurs clés, cadre juridique, résultats et bénéfices attendus. */
export function FrameworkSection() {
  return (
    <>
      <Section id="cadre" bg="white" className="border-y border-line" aria-labelledby="cadre-titre">
        <SectionHeader id="cadre-titre" {...frameworkSection} />
        <ul className="grid gap-5 md:grid-cols-3">
          {successPillars.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 0.08} className="rounded-card border border-line bg-sand p-6">
              <IconBox icon={p.icon} tone={p.tone} />
              <h3 className="mb-3 mt-4 text-lg font-extrabold">{p.title}</h3>
              <ul className="space-y-2 text-sm text-ink-2">
                {p.items.map((it) => (
                  <li key={it} className="flex gap-2">
                    <Icon name="Check" className="mt-0.5 h-4 w-4 flex-none text-green-700" />
                    {it}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>
        <div className="mt-8 rounded-card bg-ink p-6 text-white sm:p-8">
          <h3 className="mb-5 text-xs font-extrabold uppercase tracking-[0.12em] text-leaf-lt">{legalLabel}</h3>
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {legalFramework.map((l) => (
              <div key={l.name}>
                <dt className="font-extrabold">{l.name}</dt>
                <dd className="mt-1 text-sm text-white/75">{l.text}</dd>
              </div>
            ))}
          </dl>
        </div>
        <Button href={charterLink.href} icon={charterLink.icon} variant="secondary" className="mt-6">
          {charterLink.label}
        </Button>
      </Section>

      <Section id="resultats" aria-labelledby="resultats-titre">
        <SectionHeader id="resultats-titre" eyebrow={outcomesSection.eyebrow} title={outcomesSection.title} />
        <div className="grid gap-5 lg:grid-cols-2">
          {[
            { title: outcomesSection.resultsTitle, items: results, icon: 'Users' as const },
            { title: outcomesSection.benefitsTitle, items: benefits, icon: 'TreeDeciduous' as const },
          ].map((col) => (
            <Reveal key={col.title} className="rounded-card border border-line bg-white p-6 sm:p-8">
              <h3 className="mb-4 flex items-center gap-2.5 text-xl font-extrabold">
                <Icon name={col.icon} className="h-6 w-6 text-green-700" />
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.items.map((it) => (
                  <li key={it} className="flex gap-2.5 text-[15px]">
                    <Icon name="Flower2" className="mt-0.5 h-5 w-5 flex-none text-coral-dk" />
                    {it}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
