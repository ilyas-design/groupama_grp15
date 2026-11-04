import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { Reveal } from '@/components/ui';
import { CoursesCard } from '@/components/parcours/CoursesCard';
import { LevelCard } from '@/components/parcours/LevelCard';
import { PassportBadges } from '@/components/parcours/PassportBadges';
import { PersonalTree } from '@/components/parcours/PersonalTree';
import { SkillGaugesCard } from '@/components/parcours/SkillGaugesCard';
import { dashboardLabel, parcoursHero, parcoursMeta } from '@/content/parcours';

export const metadata: Metadata = {
  title: parcoursMeta.title,
  description: parcoursMeta.description,
};

export default function ParcoursPage() {
  return (
    <>
      <PageHero
        theme="forest"
        crumbs={parcoursHero.crumbs}
        eyebrow={parcoursHero.eyebrow}
        title={parcoursHero.title}
        lead={parcoursHero.lead}
        ctas={parcoursHero.ctas}
      />

      <div aria-label={dashboardLabel} role="region" className="px-4 pb-16 pt-10 sm:px-6 lg:px-12 lg:pb-[72px]">
        <div className="mx-auto grid max-w-[1184px] gap-5">
          <div className="grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
            <Reveal className="min-h-[440px]">
              <PersonalTree />
            </Reveal>
            <div className="grid content-start gap-5">
              <Reveal delay={0.08}>
                <LevelCard />
              </Reveal>
              <Reveal delay={0.16}>
                <PassportBadges />
              </Reveal>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <Reveal>
              <CoursesCard />
            </Reveal>
            <Reveal delay={0.08}>
              <SkillGaugesCard />
            </Reveal>
          </div>
        </div>
      </div>
    </>
  );
}
