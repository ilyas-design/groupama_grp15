import { Button, Eyebrow, Reveal, RichText, WaterFlow } from '@/components/ui';
import type { CtaBandContent } from '@/content/transverse';

/** Bandeau d'appel à l'action final, sur dégradé signature (cf. `.final` de la maquette). */
export function CtaBand({ content }: { content: CtaBandContent }) {
  return (
    <section aria-labelledby="cta-final-titre" className="px-4 pb-16 sm:px-6 lg:px-12 lg:pb-[72px]">
      <Reveal className="relative mx-auto flex max-w-[1184px] flex-wrap items-center justify-between gap-8 overflow-hidden rounded-[32px] bg-signature-dk px-7 py-10 text-white sm:px-14 sm:py-[72px]">
        <WaterFlow className="pointer-events-none absolute inset-x-0 bottom-0 h-16" color="#E3F8FF" opacity={0.2} />
        <div className="relative max-w-[620px]">
          <Eyebrow light>{content.eyebrow}</Eyebrow>
          <h2 id="cta-final-titre" className="h2 mt-3 text-white">
            <RichText text={content.title} emClassName="text-leaf-lt" />
          </h2>
          <p className="mt-3 text-white/85">{content.text}</p>
        </div>
        <div className="relative flex flex-wrap items-center gap-3">
          {content.ctas.map((c) => (
            <Button
              key={c.label}
              href={c.href}
              variant={c.variant ?? 'light'}
              icon={c.icon}
              className={c.variant === 'ghost' ? '!text-white hover:!text-leaf-lt' : undefined}
            >
              {c.label}
            </Button>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
