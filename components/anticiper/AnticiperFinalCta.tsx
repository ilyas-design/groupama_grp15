import { Button, Eyebrow, RichText, WaterFlow } from '@/components/ui';
import type { anticiperFinal as FinalContent } from '@/content/anticiper';

interface AnticiperFinalCtaProps {
  content: typeof FinalContent;
}

/** Bandeau de fin sur dégradé signature, vers /grandir et /parcours. */
export function AnticiperFinalCta({ content }: AnticiperFinalCtaProps) {
  return (
    <section aria-labelledby="anticiper-final" className="px-4 pb-16 sm:px-6 lg:px-12 lg:pb-[88px]">
      <div className="relative mx-auto flex max-w-[1184px] flex-col gap-8 overflow-hidden rounded-xl3 bg-signature-dk px-6 py-12 text-white sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-14 lg:py-16">
        <WaterFlow className="pointer-events-none absolute inset-x-0 bottom-0 h-16" color="#fff" opacity={0.18} />
        <div className="relative max-w-2xl">
          <Eyebrow light>{content.eyebrow}</Eyebrow>
          <h2 id="anticiper-final" className="h2 mb-3 mt-3 text-white">
            <RichText text={content.title} emClassName="text-leaf-lt" />
          </h2>
          <p className="text-white/85">{content.lead}</p>
        </div>
        <div className="relative flex flex-wrap gap-3">
          {content.ctas.map((c) => (
            <Button key={c.href} href={c.href} variant={c.variant === 'light' ? 'light' : 'dark'} icon={c.icon}>
              {c.label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
