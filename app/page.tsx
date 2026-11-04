import type { Metadata } from 'next';
import { Section, SectionHeader } from '@/components/ui';
import { Charter } from '@/components/home/Charter';
import { Equation } from '@/components/home/Equation';
import { FinalCta } from '@/components/home/FinalCta';
import { HomeHero } from '@/components/home/HomeHero';
import { Pillars } from '@/components/home/Pillars';
import { StatGrid } from '@/components/home/StatGrid';
import { TalentTree } from '@/components/home/TalentTree';
import { Testimonials } from '@/components/home/Testimonials';
import { branches, homeMeta, stats, statsHeader, statsNote, treeHeader, treeUi } from '@/content/home';

export const metadata: Metadata = {
  title: { absolute: homeMeta.title },
  description: homeMeta.description,
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Equation />
      <Pillars />

      <Section bg="white" className="border-y border-line" aria-labelledby="arbre-titre">
        <SectionHeader id="arbre-titre" {...treeHeader} />
        <TalentTree branches={branches} groupLabel={treeUi.groupLabel} moreLabel={treeUi.more} />
      </Section>

      <Section aria-labelledby="chiffres-titre">
        <SectionHeader id="chiffres-titre" {...statsHeader} />
        <StatGrid stats={stats} />
        <p className="mt-4 text-xs text-ink-2">{statsNote}</p>
      </Section>

      <Testimonials />
      <Charter />
      <div className="h-16 lg:h-[88px]" aria-hidden />
      <FinalCta />
    </>
  );
}
