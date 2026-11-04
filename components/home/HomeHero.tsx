import { Button, Eyebrow, Icon, RichText, WaterFlow } from '@/components/ui';
import { hero } from '@/content/home';
import { HeroArt } from './HeroArt';

/** Hero d'accueil : slogan principal (seul <h1> de la page), CTA, engagements, illustration animée. */
export function HomeHero() {
  return (
    <section
      aria-labelledby="accueil-titre"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#EAF6EE,var(--sand)_70%)] px-4 pb-10 pt-10 sm:px-6 lg:px-12 lg:pb-12 lg:pt-[72px]"
    >
      <div className="relative mx-auto grid max-w-[1184px] items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1 id="accueil-titre" className="h1 mb-5 mt-4 text-[2.15rem] sm:text-5xl lg:mb-6 lg:text-[3.5rem] xl:text-[3.85rem]">
            <RichText text={hero.title} />
          </h1>
          <p className="lead">{hero.lead}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {hero.ctas.map((c) => (
              <Button key={c.href} href={c.href} variant={c.variant} icon={'icon' in c ? c.icon : undefined} size="lg">
                {c.label}
              </Button>
            ))}
          </div>
          <ul aria-label={hero.trustLabel} className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-[13px] font-semibold text-ink-2">
            {hero.trust.map((t) => (
              <li key={t.label} className="flex items-center gap-1.5">
                <Icon name={t.icon} className="h-4 w-4 text-green-700" />
                {t.label}
              </li>
            ))}
          </ul>
        </div>
        <HeroArt label={hero.artLabel} chips={hero.chips} />
      </div>
      <WaterFlow className="pointer-events-none absolute inset-x-0 bottom-0 h-10" opacity={0.25} />
    </section>
  );
}
