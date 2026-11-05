import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { PhotoPlaceholder, Section, SectionHeader } from '@/components/ui';
import { CtaBand } from '@/components/transverse/CtaBand';
import { Metaphor } from '@/components/transverse/Metaphor';
import { TeamSection } from '@/components/transverse/TeamSection';
import { Timeline } from '@/components/transverse/Timeline';
import { about } from '@/content/transverse';

export const metadata: Metadata = {
  title: about.meta.title,
  description: about.meta.description,
};

export default function AboutPage() {
  const { hero, timeline } = about;
  return (
    <>
      <PageHero
        crumbs={hero.crumbs}
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead}
        ctas={hero.ctas}
        theme="roots"
        aside={<PhotoPlaceholder caption={hero.photo.caption} src={hero.photo.src} tone={hero.photo.tone} overlay="roots" heightClass="min-h-[280px] lg:min-h-[400px]" className="rounded-xl3" />}
      />

      <Section id={timeline.id} bg="sand" narrow aria-labelledby="histoire-titre">
        <SectionHeader id="histoire-titre" eyebrow={timeline.eyebrow} title={timeline.title} lead={timeline.lead} align="center" />
        <Timeline items={timeline.items} />
        <p className="mx-auto mt-10 max-w-xl rounded-xl bg-sand-2 px-4 py-3 text-center text-sm text-ink-2">{timeline.disclaimer}</p>
      </Section>

      <TeamSection team={about.team} />
      <Metaphor {...about.metaphor} />
      <div className="pt-16 lg:pt-[72px]">
        <CtaBand content={about.cta} />
      </div>
    </>
  );
}
