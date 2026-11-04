import { AnimatedRoots, Button, Eyebrow, Reveal, RichText, WaterFlow } from '@/components/ui';
import { passportBanner as c } from '@/content/grandir';

/** Action 5 — bandeau CTA sur dégradé signature vers le passeport compétences. */
export function PassportBanner() {
  return (
    <section id="passeport" aria-labelledby="passeport-titre" className="scroll-mt-24 px-4 pb-16 sm:px-6 lg:px-12 lg:pb-[72px]">
      <Reveal className="relative mx-auto flex max-w-[1184px] flex-col items-start justify-between gap-8 overflow-hidden rounded-[32px] bg-signature px-6 py-10 text-white sm:px-10 lg:flex-row lg:items-center lg:px-14 lg:py-[72px]">
        {/* Voile sombre : garantit le contraste AA du texte blanc sur tout le dégradé */}
        <span aria-hidden className="absolute inset-0 bg-green-900/30" />
        <AnimatedRoots className="pointer-events-none absolute -right-10 -top-6 hidden w-[420px] opacity-25 lg:block" color="#fff" />
        <div className="relative max-w-[620px]">
          <Eyebrow light>{c.eyebrow}</Eyebrow>
          <h2 id="passeport-titre" className="h2 mb-3 mt-3 text-white">
            <RichText text={c.title} emClassName="text-leaf-lt" />
          </h2>
          <p className="max-w-[520px] text-white/95">{c.lead}</p>
        </div>
        <Button href={c.cta.href} icon={c.cta.icon} variant="light" size="lg" className="relative">
          {c.cta.label}
        </Button>
        <WaterFlow className="pointer-events-none absolute inset-x-0 bottom-0 h-12" color="#fff" opacity={0.2} />
      </Reveal>
    </section>
  );
}
