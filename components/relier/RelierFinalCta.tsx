import { AnimatedRoots, Button, RichText, Section } from '@/components/ui';
import { relierFinal } from '@/content/relier';

/** Bandeau final sur dégradé signature : vers la charte et le parcours. */
export function RelierFinalCta() {
  return (
    <Section aria-labelledby="relier-cta-titre" className="!pt-0">
      <div className="relative overflow-hidden rounded-xl3 bg-signature px-6 py-12 text-white sm:px-12 lg:py-16">
        <AnimatedRoots className="pointer-events-none absolute -bottom-6 right-0 w-[420px] max-w-[70%] opacity-30" color="#fff" nodes={false} />
        <div className="relative max-w-2xl">
          <h2 id="relier-cta-titre" className="h2 text-white">
            <RichText text={relierFinal.title} emClassName="text-leaf-lt" />
          </h2>
          <p className="mt-4 text-lg text-white/90">{relierFinal.text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {relierFinal.ctas.map((c) => (
              <Button key={c.href} href={c.href} variant={c.variant} icon={c.icon}>
                {c.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
