import { Icon, IconBox, Reveal, Section, SectionHeader, cn } from '@/components/ui';
import { journeyHeader, journeySteps, journeyUi } from '@/content/relier';

const actorStyle = {
  human: { card: 'border-leaf/40 bg-leaf-lt', label: 'bg-white text-green-800', tone: 'earth' as const, icon: 'User' as const },
  ai: { card: 'border-water/40 bg-water-lt', label: 'bg-white text-water-dk', tone: 'water' as const, icon: 'Sparkles' as const },
};

/** Connecteur animé (eau qui circule) entre deux étapes — vertical sur mobile, horizontal sur desktop. */
function Connector() {
  return (
    <>
      <svg aria-hidden width="4" height="24" className="absolute left-9 top-full lg:hidden" fill="none">
        <path d="M2 0 V24" stroke="var(--water)" strokeWidth="2.5" strokeLinecap="round" className="flow-dash" />
      </svg>
      <svg aria-hidden width="20" height="4" className="absolute left-full top-1/2 hidden -translate-y-1/2 lg:block" fill="none">
        <path d="M0 2 H20" stroke="var(--water)" strokeWidth="2.5" strokeLinecap="round" className="flow-dash" />
      </svg>
    </>
  );
}

/** Frise « Qui fait quoi » d'un parcours sinistre : Humain ↔ IA. */
export function ClaimJourney() {
  return (
    <Section bg="white" aria-labelledby="parcours-titre" className="border-y border-line">
      <SectionHeader id="parcours-titre" {...journeyHeader} />
      <ol aria-label={journeyUi.listLabel} className="grid gap-6 lg:grid-cols-5 lg:gap-5">
        {journeySteps.map((s, i) => {
          const st = actorStyle[s.actor];
          return (
            <Reveal as="li" key={s.id} delay={i * 0.12} className="relative">
              <article className={cn('flex h-full gap-4 rounded-xl2 border p-5 lg:flex-col lg:p-6', st.card)}>
                <IconBox icon={s.icon} tone={st.tone} />
                <div>
                  <p className="mb-2 flex flex-wrap items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.1em] text-ink-2">
                    <span>
                      {journeyUi.stepLabel} {i + 1}
                    </span>
                    <span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5', st.label)}>
                      <Icon name={st.icon} className="h-3 w-3" />
                      {journeyUi.actors[s.actor]}
                    </span>
                  </p>
                  <h3 className="text-lg font-extrabold text-ink">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-ink-2">{s.text}</p>
                </div>
              </article>
              {i < journeySteps.length - 1 && <Connector />}
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
