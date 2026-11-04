import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { Section, SectionHeader } from '@/components/ui';
import { AiGuide } from '@/components/relier/AiGuide';
import { BalanceGauge } from '@/components/relier/BalanceGauge';
import { ClaimJourney } from '@/components/relier/ClaimJourney';
import { HeroVisual } from '@/components/relier/HeroVisual';
import { KeyMessages } from '@/components/relier/KeyMessages';
import { RelierFaq } from '@/components/relier/RelierFaq';
import { RelierFinalCta } from '@/components/relier/RelierFinalCta';
import { TrustColumns } from '@/components/relier/TrustColumns';
import { balanceHeader, guideHeader, relierHero, relierMeta } from '@/content/relier';

export const metadata: Metadata = {
  title: relierMeta.title,
  description: relierMeta.description,
};

export default function RelierPage() {
  return (
    <>
      <PageHero
        theme="roots"
        emClassName="text-earth-dk"
        crumbs={relierHero.crumbs}
        eyebrow={relierHero.eyebrow}
        title={relierHero.title}
        lead={relierHero.lead}
        ctas={relierHero.ctas}
        aside={<HeroVisual />}
      />

      <KeyMessages />

      <Section id="juste-milieu" aria-labelledby="juste-milieu-titre">
        <SectionHeader id="juste-milieu-titre" {...balanceHeader} />
        <BalanceGauge />
      </Section>

      <ClaimJourney />

      <Section id="guide" aria-labelledby="guide-titre" className="border-y border-line bg-[#F3EADB]">
        <SectionHeader id="guide-titre" {...guideHeader} />
        <AiGuide />
      </Section>

      <TrustColumns />

      <RelierFaq />

      <RelierFinalCta />
    </>
  );
}
