import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { ActionsToc } from '@/components/grandir/ActionsToc';
import { CommunitySection } from '@/components/grandir/CommunitySection';
import { CopilotSection } from '@/components/grandir/CopilotSection';
import { GrowthPath } from '@/components/grandir/GrowthPath';
import { JobSupport } from '@/components/grandir/JobSupport';
import { PassportBanner } from '@/components/grandir/PassportBanner';
import { SkillsForecast } from '@/components/grandir/SkillsForecast';
import { grandirHero, grandirMeta } from '@/content/grandir';

export const metadata: Metadata = {
  title: grandirMeta.title,
  description: grandirMeta.description,
};

export default function GrandirPage() {
  return (
    <>
      <PageHero
        theme="forest"
        crumbs={grandirHero.crumbs}
        eyebrow={grandirHero.eyebrow}
        title={grandirHero.title}
        lead={grandirHero.lead}
        ctas={[{ ...grandirHero.projectLink, variant: 'secondary' }]}
      >
        <ActionsToc />
      </PageHero>
      <CopilotSection />
      <GrowthPath />
      <CommunitySection />
      <SkillsForecast />
      <JobSupport />
      <PassportBanner />
    </>
  );
}
