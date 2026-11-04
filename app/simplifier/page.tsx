import type { Metadata } from 'next';
import { Reveal, Section, SectionHeader } from '@/components/ui';
import { PageHero } from '@/components/layout/PageHero';
import { BeforeAfter } from '@/components/simplifier/BeforeAfter';
import { CompetitiveWatch } from '@/components/simplifier/CompetitiveWatch';
import { HeroVisual } from '@/components/simplifier/HeroVisual';
import { PillarCards } from '@/components/simplifier/PillarCards';
import { RepetitiveTasks } from '@/components/simplifier/RepetitiveTasks';
import { Simulator } from '@/components/simplifier/Simulator';
import { SynthesisDemo } from '@/components/simplifier/SynthesisDemo';
import {
  beforeAfter,
  hero,
  meta,
  pillars,
  pillarsHeader,
  repetitive,
  roleLabel,
  simulator,
  synthesis,
  watch,
} from '@/content/simplifier';

export const metadata: Metadata = { title: meta.title, description: meta.description };

export default function SimplifierPage() {
  return (
    <>
      <PageHero
        theme="river"
        crumbs={hero.crumbs}
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead}
        ctas={hero.ctas}
        aside={<HeroVisual visual={hero.visual} />}
      />

      <Section aria-labelledby="usages-titre">
        <SectionHeader id="usages-titre" {...pillarsHeader} />
        <PillarCards cards={pillars} roleLabel={roleLabel} />
      </Section>

      <Section id={simulator.id} aria-labelledby={`${simulator.id}-titre`} className="!pt-0">
        <Reveal>
          <Simulator content={simulator} />
        </Reveal>
      </Section>

      <Section id={synthesis.id} bg="white" aria-labelledby={`${synthesis.id}-titre`} className="border-y border-line">
        <SectionHeader id={`${synthesis.id}-titre`} {...synthesis.header} />
        <SynthesisDemo content={synthesis} />
      </Section>

      <Section id={repetitive.id} aria-labelledby={`${repetitive.id}-titre`}>
        <SectionHeader id={`${repetitive.id}-titre`} {...repetitive.header} />
        <RepetitiveTasks content={repetitive} />
      </Section>

      <Section id={watch.id} bg="white" aria-labelledby={`${watch.id}-titre`} className="border-y border-line">
        <CompetitiveWatch content={watch} />
      </Section>

      <Section id={beforeAfter.id} aria-labelledby={`${beforeAfter.id}-titre`} narrow>
        <SectionHeader id={`${beforeAfter.id}-titre`} align="center" {...beforeAfter.header} />
        <BeforeAfter content={beforeAfter} />
      </Section>
    </>
  );
}
