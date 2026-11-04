import { Icon, PhotoPlaceholder, Reveal, Section, SectionHeader, cn } from '@/components/ui';
import type { Tone } from '@/lib/types';
import { testimonials, testimonialsHeader } from '@/content/home';

const avatar: Partial<Record<Tone, string>> = {
  green: 'bg-[linear-gradient(135deg,#2F7A28,#0D6F95)]',
  earth: 'bg-[linear-gradient(135deg,#7A5A30,#B3442B)]',
  water: 'bg-[linear-gradient(135deg,#0D6F95,#135E87)]',
};

/** 3 témoignages (fictifs) avec photo, citation et auteur. */
export function Testimonials() {
  return (
    <Section aria-labelledby="temoignages-titre">
      <SectionHeader id="temoignages-titre" {...testimonialsHeader} />
      <ul className="grid gap-5 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal as="li" key={t.name} delay={i * 0.1} className="flex flex-col gap-[18px] rounded-card border border-line bg-white p-6 sm:p-7">
            <PhotoPlaceholder caption={t.photo} tone={t.tone} heightClass="min-h-[160px]" />
            <figure className="flex flex-1 flex-col gap-[18px]">
              <blockquote className="flex-1 font-serif text-xl leading-snug">
                <Icon name="Quote" className="mb-2 h-5 w-5 text-green-700" />
                <p>« {t.quote} »</p>
              </blockquote>
              <figcaption className="flex items-center gap-3 text-[13px] text-ink-2">
                <span
                  aria-hidden
                  className={cn('grid h-[42px] w-[42px] flex-none place-items-center rounded-full text-sm font-extrabold text-white', avatar[t.tone] ?? 'bg-green-700')}
                >
                  {t.initials}
                </span>
                <span>
                  <b className="block text-sm text-ink">{t.name}</b>
                  {t.role}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
