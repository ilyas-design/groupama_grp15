import { IconBox, PhotoPlaceholder, Reveal, Section, SectionHeader, toneSoft, cn } from '@/components/ui';
import type { about } from '@/content/transverse';

type TeamContent = (typeof about)['team'];

/** Présentation du Groupe 15 : photo, membres, démarche. */
export function TeamSection({ team }: { team: TeamContent }) {
  const headingId = `${team.id}-titre`;
  return (
    <Section id={team.id} bg="white" aria-labelledby={headingId}>
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <div>
          <SectionHeader id={headingId} eyebrow={team.eyebrow} title={team.title} lead={team.lead} className="!mb-8" />
          <Reveal>
            <PhotoPlaceholder caption={team.photo.caption} src={team.photo.src} tone={team.photo.tone} overlay="roots" heightClass="min-h-[260px] sm:min-h-[340px]" />
            <p id={`${team.id}-noms`} className="mb-2.5 mt-5 text-xs font-extrabold uppercase tracking-[0.08em] text-ink-2">
              {team.namesTitle}
            </p>
            <ul aria-labelledby={`${team.id}-noms`} className="flex flex-wrap gap-1.5">
              <li className="rounded-full border border-green-700 bg-leaf-lt px-3 py-1 text-sm font-bold text-green-800">
                {team.facilitator.name} <span className="font-semibold">· {team.facilitator.role}</span>
              </li>
              {team.names.map((n, i) => (
                <li key={`${n}-${i}`} className="rounded-full border border-line bg-sand px-3 py-1 text-sm font-semibold text-ink">
                  {n}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {team.members.map((m, i) => (
              <Reveal
                as="li"
                key={m.name}
                delay={i * 0.06}
                className={cn('flex gap-4 rounded-card border border-line bg-sand p-5', i === 0 && 'sm:col-span-2')}
              >
                <span
                  aria-hidden
                  className={cn('grid h-12 w-12 flex-none place-items-center rounded-full font-serif text-lg font-semibold', toneSoft[m.tone])}
                >
                  {m.initials}
                </span>
                <div>
                  <h3 className="font-extrabold text-ink">{m.name}</h3>
                  <p className="text-sm font-bold text-green-800">{m.role}</p>
                  <p className="mt-1.5 text-sm text-ink-2">{m.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <p className="mt-3 text-xs text-ink-2">{team.membersNote}</p>

          <h3 className="mb-4 mt-10 font-serif text-2xl font-semibold">{team.approachTitle}</h3>
          <ol className="grid gap-3 sm:grid-cols-2">
            {team.approach.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.06} className="flex gap-3.5 rounded-card border border-line p-4">
                <IconBox icon={s.icon} tone="green" size="sm" />
                <div>
                  <p className="font-extrabold text-ink">
                    <span className="mr-1.5 font-serif italic text-green-700">{i + 1}.</span>
                    {s.title}
                  </p>
                  <p className="mt-1 text-sm text-ink-2">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
