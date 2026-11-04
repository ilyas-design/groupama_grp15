import { Button, Eyebrow, RichText, WaterFlow } from '@/components/ui';
import { vision2030 } from '@/content/anticiper';

/** Bandeau « Vision 2030 » : de l'indemnisation à l'anticipation. */
export function VisionQuote() {
  return (
    <section aria-labelledby="vision-2030" className="relative overflow-hidden bg-ink px-4 py-16 text-white sm:px-6 lg:px-12 lg:py-20">
      <WaterFlow className="pointer-events-none absolute inset-x-0 bottom-0 h-16" opacity={0.3} />
      <div className="relative mx-auto max-w-4xl text-center">
        <Eyebrow light>{vision2030.eyebrow}</Eyebrow>
        <h2 id="vision-2030" className="h2 mx-auto mt-4 max-w-3xl text-white">
          <RichText text={vision2030.quote} emClassName="text-leaf" />
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">{vision2030.text}</p>
        <Button href={vision2030.cta.href} icon={vision2030.cta.icon} variant="light" className="mt-8">
          {vision2030.cta.label}
        </Button>
      </div>
    </section>
  );
}
