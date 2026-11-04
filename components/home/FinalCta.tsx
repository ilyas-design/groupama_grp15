import { AnimatedRoots, Button, Eyebrow, cn } from '@/components/ui';
import { finalSection } from '@/content/home';
import { finalCta } from '@/content/site';

/** CTA final : slogan secondaire sur dégradé signature. */
export function FinalCta() {
  return (
    <section aria-labelledby="final-titre" className="px-4 pb-16 sm:px-6 lg:px-12 lg:pb-[72px]">
      <div className="relative mx-auto flex max-w-[1184px] flex-col items-start justify-between gap-8 overflow-hidden rounded-[32px] bg-signature px-6 py-12 text-white sm:px-10 sm:py-16 lg:flex-row lg:items-center lg:px-14 lg:py-[72px]">
        {/* Voile sombre : garantit le contraste AA du texte blanc sur la partie verte claire du dégradé */}
        <span aria-hidden className="absolute inset-0 bg-green-900/30" />
        <AnimatedRoots className="pointer-events-none absolute -bottom-6 right-0 w-[420px] max-w-full opacity-20" color="#fff" />
        <div className="relative max-w-[680px]">
          <Eyebrow light>{finalSection.eyebrow}</Eyebrow>
          <h2 id="final-titre" className="h2 mt-3 text-white">
            {finalSection.title}
          </h2>
        </div>
        <div className="relative flex flex-wrap items-center gap-3">
          {finalCta.map((c) => (
            <Button
              key={c.href}
              href={c.href}
              variant={c.variant ?? 'light'}
              icon={c.icon}
              size="lg"
              className={cn(c.variant === 'ghost' && '!text-white hover:!text-white')}
            >
              {c.label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
