import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui';
import { CharterHeroCard } from '@/components/transverse/CharterHeroCard';
import { CharterSection } from '@/components/transverse/CharterSection';
import { CharterToc, type TocItem } from '@/components/transverse/CharterToc';
import { ReportBox } from '@/components/transverse/ReportBox';
import { charter } from '@/content/transverse';

export const metadata: Metadata = {
  title: charter.meta.title,
  description: charter.meta.description,
};

export default function CharterPage() {
  const tocItems: TocItem[] = [
    ...charter.sections.map((s) => ({ id: s.id, label: s.short, icon: s.icon })),
    { id: charter.report.id, label: charter.report.short, icon: charter.report.icon },
  ];

  return (
    <>
      <PageHero
        {...charter.hero}
        theme="sand"
        aside={
          <CharterHeroCard
            title={charter.summaryCard.title}
            items={charter.summaryCard.items}
            version={charter.version.label}
            note={charter.version.note}
          />
        }
      />
      <Section bg="none">
        <div className="grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-14">
          <aside className="lg:self-start lg:sticky lg:top-24">
            <CharterToc items={tocItems} title={charter.toc.title} label={charter.toc.label} />
          </aside>
          <div className="grid min-w-0 gap-14 lg:gap-16">
            {charter.sections.map((s) => (
              <CharterSection key={s.id} section={s} labels={charter.labels} />
            ))}
            <ReportBox report={charter.report} />
          </div>
        </div>
      </Section>
    </>
  );
}
