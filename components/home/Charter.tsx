import { Button, Card, Eyebrow, RichText, Section } from '@/components/ui';
import { charter } from '@/content/home';

/** Charte IA responsable en 4 règles + lien vers /charte. */
export function Charter() {
  return (
    <Section bg="none" className="bg-sand-2" aria-labelledby="charte-titre">
      <div className="grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-12">
        <div>
          <Eyebrow>{charter.eyebrow}</Eyebrow>
          <h2 id="charte-titre" className="h2 mb-3.5 mt-3">
            <RichText text={charter.title} />
          </h2>
          <p className="lead">{charter.lead}</p>
          <Button href={charter.cta.href} variant={charter.cta.variant} icon={charter.cta.icon} className="mt-5">
            {charter.cta.label}
          </Button>
        </div>
        <Card padding="none" className="px-6 py-3 sm:px-[30px]">
          <ol className="divide-y divide-line">
            {charter.rules.map((r, i) => (
              <li key={r.title} className="flex gap-4 py-[18px]">
                <span aria-hidden className="w-[34px] flex-none font-serif text-2xl text-green-700">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold">{r.title}</h3>
                  <p className="text-sm text-ink-2">{r.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </Section>
  );
}
