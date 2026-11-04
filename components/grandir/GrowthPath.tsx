import { Reveal, Section, SectionHeader, Tag, cn } from '@/components/ui';
import { growthLevels, growthSection, type LevelState } from '@/content/grandir';
import { GrowthLine, GrowthPlant } from './GrowthPlant';

const pot: Record<LevelState, string> = {
  done: 'border-leaf bg-leaf-lt',
  current: 'border-green-700 bg-white shadow-[0_0_0_8px_rgba(27,126,77,0.12)]',
  upcoming: 'border-dashed border-line bg-white',
};

/** Action 2 — Skill Academy : 3 niveaux + « Transmettre », Graine → Forêt, reliés par un pointillé. */
export function GrowthPath() {
  const { states } = growthSection;
  return (
    <Section id="parcours-ia" bg="white" className="border-y border-line" aria-labelledby="parcours-ia-titre">
      <SectionHeader id="parcours-ia-titre" eyebrow={growthSection.eyebrow} title={growthSection.title} lead={growthSection.lead} />
      <div className="relative">
        <GrowthLine />
        <ol className="relative grid gap-8 lg:grid-cols-4 lg:gap-4">
          {growthLevels.map((l, i) => (
            <Reveal
              as="li"
              key={l.id}
              delay={i * 0.12}
              className="flex items-center gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
            >
              <span
                className={cn(
                  'relative z-[1] grid h-[88px] w-[88px] flex-none place-items-center rounded-full border-[3px] lg:mb-5 lg:h-[124px] lg:w-[124px]',
                  pot[l.state],
                )}
              >
                <GrowthPlant plant={l.plant} delay={0.2 + i * 0.15} />
              </span>
              <div>
                {l.stage && <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-green-700">{l.stage}</p>}
                <h3 className={cn('mt-1 font-serif text-xl font-semibold', l.state === 'upcoming' && 'text-ink-2')}>{l.name}</h3>
                <p className="mt-1.5 text-sm text-ink-2">{l.description}</p>
                <div className="mt-3">
                  {l.state === 'done' && (
                    <Tag tone="leaf" icon="Check">
                      {states.done}
                    </Tag>
                  )}
                  {l.state === 'current' && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-700 px-3 py-1 text-xs font-bold text-white">
                      {states.current}
                      {l.progress !== undefined && ` · ${l.progress} %`}
                    </span>
                  )}
                  {l.state === 'upcoming' && (
                    <Tag tone="sand" icon="Clock">
                      {states.upcoming}
                    </Tag>
                  )}
                </div>
                {l.state === 'current' && l.progress !== undefined && (
                  <div
                    role="progressbar"
                    aria-label={growthSection.progressLabel}
                    aria-valuenow={l.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    className="mt-3 h-1.5 w-40 overflow-hidden rounded-full bg-sand-2 lg:mx-auto"
                  >
                    <span className="block h-full rounded-full bg-signature" style={{ width: `${l.progress}%` }} />
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
