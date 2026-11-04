import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Crumb, Cta } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RichText } from '@/components/ui/RichText';
import { WaterFlow } from '@/components/ui/WaterFlow';
import { cn } from '@/components/ui/cn';

type HeroTheme = 'climate' | 'forest' | 'river' | 'roots' | 'sand';

const themes: Record<HeroTheme, string> = {
  climate: 'bg-[linear-gradient(180deg,#E6F2F5,var(--sand))]',
  forest: 'bg-[linear-gradient(180deg,#E3F1DA,var(--sand))]',
  river: 'bg-[linear-gradient(180deg,#DDF1F4,var(--sand))]',
  roots: 'bg-[linear-gradient(180deg,#F1E6D3,var(--sand))]',
  sand: 'bg-sand',
};

interface PageHeroProps {
  crumbs: Crumb[];
  eyebrow: string;
  /** Supporte *italique* */
  title: string;
  lead: string;
  ctas?: Cta[];
  theme?: HeroTheme;
  /** Visuel à droite (SVG, photo…) — sinon le texte prend toute la largeur */
  aside?: ReactNode;
  /** Classe des mots *en italique* du titre (défaut vert) */
  emClassName?: string;
  /** Contenu sous les CTA (badges, stats…) */
  children?: ReactNode;
}

/** En-tête de page intérieure : fil d'Ariane + eyebrow + H1 + chapeau + CTA. */
export function PageHero({ crumbs, eyebrow, title, lead, ctas, theme = 'sand', aside, emClassName, children }: PageHeroProps) {
  return (
    <section className={cn('relative overflow-hidden px-4 pb-14 pt-10 sm:px-6 lg:px-12 lg:pb-16 lg:pt-16', themes[theme])}>
      <div className={cn('relative mx-auto grid max-w-[1184px] items-center gap-10', aside && 'lg:grid-cols-[1.1fr_.9fr]')}>
        <div>
          <nav aria-label="Fil d’Ariane" className="mb-6 text-[13px] text-ink-2">
            <ol className="flex flex-wrap items-center gap-1.5">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  {i > 0 && <span aria-hidden>/</span>}
                  {c.href ? (
                    <Link href={c.href} className="hover:text-ink hover:underline">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="font-bold text-green-700">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="h1 mb-5 mt-4 max-w-[860px]">
            <RichText text={title} emClassName={emClassName} />
          </h1>
          <p className="lead">{lead}</p>
          {ctas && ctas.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {ctas.map((c) => (
                <Button key={c.href + c.label} href={c.href} variant={c.variant ?? 'primary'} icon={c.icon}>
                  {c.label}
                </Button>
              ))}
            </div>
          )}
          {children}
        </div>
        {aside && <div className="relative">{aside}</div>}
      </div>
      <WaterFlow className="pointer-events-none absolute inset-x-0 bottom-0 h-10" opacity={0.25} />
    </section>
  );
}
