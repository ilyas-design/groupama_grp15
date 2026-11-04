import { Icon, IconBox, Reveal, Section, SectionHeader } from '@/components/ui';
import { jobSupportSection, jobSupports } from '@/content/grandir';

/** Plan d'accompagnement — ce que chaque métier apprend à faire avec les outils prédictifs. */
export function JobSupport() {
  return (
    <Section id="accompagnement" bg="white" className="border-y border-line" aria-labelledby="accompagnement-titre">
      <SectionHeader id="accompagnement-titre" {...jobSupportSection} />
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {jobSupports.map((j, i) => (
          <Reveal as="li" key={j.id} delay={i * 0.08} className="rounded-card border border-line bg-sand p-6">
            <IconBox icon={j.icon} tone={j.tone} />
            <h3 className="mb-3 mt-4 text-lg font-extrabold">{j.role}</h3>
            <ul className="space-y-2 text-sm text-ink-2">
              {j.items.map((it) => (
                <li key={it} className="flex gap-2">
                  <Icon name="Check" className="mt-0.5 h-4 w-4 flex-none text-green-700" />
                  {it}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
