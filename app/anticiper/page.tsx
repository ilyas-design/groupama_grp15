import type { Metadata } from 'next';
import { Icon, Section, SectionHeader } from '@/components/ui';
import { PageHero } from '@/components/layout/PageHero';
import { AnticiperFinalCta } from '@/components/anticiper/AnticiperFinalCta';
import { CaseLibrary } from '@/components/anticiper/CaseLibrary';
import { PredictiveScales } from '@/components/anticiper/PredictiveScales';
import { VisionQuote } from '@/components/anticiper/VisionQuote';
import { HeroVisual } from '@/components/anticiper/HeroVisual';
import { RiskContractLink } from '@/components/anticiper/RiskContractLink';
import { RiskMap } from '@/components/anticiper/RiskMap';
import { TrainingSteps } from '@/components/anticiper/TrainingSteps';
import {
  anticiperFinal,
  anticiperHero as hero,
  anticiperMeta,
  caseCategoryTone,
  caseFilters,
  cases,
  casesSection,
  casesUi,
  linkSchema,
  linkSection,
  predictiveSection,
  riskAlerts,
  riskMap,
  riskSection,
  riskTypes,
  trainingSection,
  trainingSteps,
} from '@/content/anticiper';

export const metadata: Metadata = {
  title: anticiperMeta.title,
  description: anticiperMeta.description,
};

export default function AnticiperPage() {
  return (
    <>
      <PageHero
        theme="climate"
        crumbs={hero.crumbs}
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead}
        ctas={hero.ctas}
        aside={<HeroVisual label={hero.visualLabel} chips={hero.chips} />}
      >
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[13px] text-ink-2">
          {hero.badges.map((b) => (
            <li key={b.label} className="flex items-center gap-1.5">
              <Icon name={b.icon} className="h-4 w-4 text-water-dk" />
              {b.label}
            </li>
          ))}
        </ul>
      </PageHero>

      <Section id="carte" aria-labelledby="carte-titre">
        <SectionHeader id="carte-titre" {...riskSection} />
        <RiskMap ui={riskMap} types={riskTypes} alerts={riskAlerts} />
      </Section>

      <Section id="echelles" bg="white" className="border-t border-line" aria-labelledby="echelles-titre">
        <SectionHeader id="echelles-titre" {...predictiveSection} />
        <PredictiveScales />
      </Section>

      <VisionQuote />

      <Section id="contrat" bg="white" className="border-y border-line" aria-labelledby="contrat-titre">
        <SectionHeader id="contrat-titre" {...linkSection} />
        <RiskContractLink content={linkSchema} />
      </Section>

      <Section id="entrainement" aria-labelledby="entrainement-titre">
        <SectionHeader id="entrainement-titre" {...trainingSection} />
        <TrainingSteps steps={trainingSteps} />
      </Section>

      <Section id="cas" bg="white" className="border-t border-line" aria-labelledby="cas-titre">
        <SectionHeader id="cas-titre" {...casesSection} />
        <CaseLibrary ui={casesUi} filters={caseFilters} cases={cases} tones={caseCategoryTone} />
      </Section>

      <div className="bg-white pt-4">
        <AnticiperFinalCta content={anticiperFinal} />
      </div>
    </>
  );
}
