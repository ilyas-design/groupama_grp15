import type { ReactNode } from 'react';
import { Eyebrow } from './Eyebrow';
import { RichText } from './RichText';
import { cn } from './cn';

interface SectionHeaderProps {
  eyebrow?: string;
  /** Supporte *italique* */
  title: string;
  lead?: string;
  align?: 'left' | 'center';
  /** Pour fonds sombres */
  light?: boolean;
  /** Élément à droite sur desktop (CTA, filtres…) */
  aside?: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
  id?: string;
}

export function SectionHeader({ eyebrow, title, lead, align = 'left', light, aside, className, as: H = 'h2', id }: SectionHeaderProps) {
  const center = align === 'center';
  return (
    <div className={cn('mb-10 flex flex-col gap-6 lg:mb-12', aside && 'lg:flex-row lg:items-end lg:justify-between', className)}>
      <div className={cn('max-w-3xl', center && 'mx-auto text-center')}>
        {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
        <H id={id} className={cn('h2 mb-3.5 mt-3', light && 'text-white')}>
          <RichText text={title} emClassName={light ? 'text-leaf-lt' : undefined} />
        </H>
        {lead && <p className={cn('lead', center && 'mx-auto', light && 'text-white/80')}>{lead}</p>}
      </div>
      {aside && <div className="shrink-0">{aside}</div>}
    </div>
  );
}
