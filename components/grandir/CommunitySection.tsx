import { Button, Eyebrow, Icon, PhotoPlaceholder, Reveal, RichText, Section } from '@/components/ui';
import { entraideSection, labSection } from '@/content/grandir';
import { EntraideFeed } from './EntraideFeed';
import { LabAgenda } from './LabAgenda';

const card = 'scroll-mt-24 rounded-card border border-line bg-white p-6 sm:p-7';
const title = 'mb-2 mt-3 font-serif text-[1.75rem] font-semibold sm:text-[2rem]';

/** Actions 3 et 4 — Binôme 360 (fil de partage) et Lab IA (agenda), côte à côte sur desktop. */
export function CommunitySection() {
  return (
    <Section>
      <div className="grid items-start gap-5 lg:grid-cols-2">
        <Reveal>
          <section id="entraide" aria-labelledby="entraide-titre" className={card}>
            <Eyebrow>{entraideSection.eyebrow}</Eyebrow>
            <h2 id="entraide-titre" className={title}>
              <RichText text={entraideSection.title} />
            </h2>
            <p className="mb-5 text-sm text-ink-2">{entraideSection.lead}</p>
            <ul aria-label={entraideSection.pairLabel} className="mb-6 grid gap-3 sm:grid-cols-2">
              {entraideSection.pair.map((p) => (
                <li key={p.label} className="flex gap-3 rounded-xl bg-sand p-4">
                  <Icon name={p.icon} className="mt-0.5 h-5 w-5 flex-none text-green-700" />
                  <span className="text-sm">
                    <b className="block text-ink">{p.label}</b>
                    <span className="text-ink-2">{p.text}</span>
                  </span>
                </li>
              ))}
            </ul>
            <EntraideFeed />
            <Button href={entraideSection.cta.href} icon={entraideSection.cta.icon} variant="secondary" className="mt-4">
              {entraideSection.cta.label}
            </Button>
          </section>
        </Reveal>
        <Reveal delay={0.1}>
          <section id="lab" aria-labelledby="lab-titre" className={card}>
            <Eyebrow>{labSection.eyebrow}</Eyebrow>
            <h2 id="lab-titre" className={title}>
              <RichText text={labSection.title} />
            </h2>
            <p className="mb-5 text-sm text-ink-2">{labSection.lead}</p>
            <LabAgenda />
            <PhotoPlaceholder
              caption={labSection.photo.caption}
              src={labSection.photo.src}
              tone={labSection.photo.tone}
              overlay="roots"
              heightClass="min-h-[140px]"
              className="mt-4"
            />
          </section>
        </Reveal>
      </div>
    </Section>
  );
}
