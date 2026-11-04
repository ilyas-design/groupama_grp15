import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { FrameworkSection } from '@/components/projet/FrameworkSection';
import { PlanSection } from '@/components/projet/PlanSection';
import { ProjectOverview } from '@/components/projet/ProjectOverview';
import { Button, RichText, WaterFlow } from '@/components/ui';
import { projetFinal, projetHero as hero, projetMeta } from '@/content/projet';

export const metadata: Metadata = {
  title: projetMeta.title,
  description: projetMeta.description,
};

export default function ProjetPage() {
  return (
    <>
      <PageHero theme="forest" crumbs={hero.crumbs} eyebrow={hero.eyebrow} title={hero.title} lead={hero.lead} ctas={hero.ctas}>
        <ul aria-label={hero.keyFiguresLabel} className="mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {hero.keyFigures.map((f) => (
            <li key={f.label} className="rounded-card border border-line bg-white/80 p-4">
              <span className="block font-serif text-3xl font-semibold text-green-800">{f.value}</span>
              <span className="text-sm text-ink-2">{f.label}</span>
            </li>
          ))}
        </ul>
      </PageHero>

      <ProjectOverview />
      <PlanSection />
      <FrameworkSection />

      <section aria-labelledby="projet-final" className="px-4 pb-16 sm:px-6 lg:px-12 lg:pb-[88px]">
        <div className="relative mx-auto max-w-[1184px] overflow-hidden rounded-xl3 bg-signature-dk px-6 py-12 text-white sm:px-10 lg:px-14 lg:py-16">
          <WaterFlow className="pointer-events-none absolute inset-x-0 bottom-0 h-16" color="#fff" opacity={0.18} />
          <h2 id="projet-final" className="h2 relative max-w-3xl text-white">
            <RichText text={projetFinal.title} emClassName="text-leaf-lt" />
          </h2>
          <p className="relative mt-4 max-w-2xl text-white/85">{projetFinal.lead}</p>
          <div className="relative mt-8 flex flex-wrap gap-3">
            {projetFinal.ctas.map((c) => (
              <Button key={c.href} href={c.href} variant={c.variant} icon={c.icon}>
                {c.label}
              </Button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
