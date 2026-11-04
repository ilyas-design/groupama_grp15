import { Accordion, PhotoPlaceholder, Section, SectionHeader } from '@/components/ui';
import { faqHeader, faqItems, faqPhoto } from '@/content/relier';

/** FAQ : en-tête + photo à gauche, accordéon à droite (empilés sur mobile). */
export function RelierFaq() {
  return (
    <Section aria-labelledby="faq-titre">
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <SectionHeader id="faq-titre" {...faqHeader} className="!mb-0" />
          <PhotoPlaceholder caption={faqPhoto.caption} tone={faqPhoto.tone} overlay="roots" heightClass="min-h-[240px]" className="mt-8 hidden sm:flex" />
        </div>
        <Accordion
          defaultOpen={[faqItems[0].id]}
          items={faqItems.map((f) => ({ id: f.id, title: f.question, content: <p>{f.answer}</p> }))}
        />
      </div>
    </Section>
  );
}
