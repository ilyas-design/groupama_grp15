import type { ReactNode } from 'react';
import { cn } from './cn';

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  /** Fond de section */
  bg?: 'sand' | 'white' | 'ink' | 'leaf' | 'water' | 'none';
  /** Largeur max interne (1280 par défaut) */
  narrow?: boolean;
  'aria-labelledby'?: string;
}

const bgs = { sand: 'bg-sand', white: 'bg-white', ink: 'bg-ink text-white', leaf: 'bg-leaf-lt', water: 'bg-water-lt', none: '' };

/** Section standard : padding vertical + gouttières responsives + conteneur centré. */
export function Section({ children, id, className, bg = 'none', narrow, ...rest }: SectionProps) {
  return (
    <section id={id} className={cn('section scroll-mt-24', bgs[bg], className)} {...rest}>
      <div className={cn('mx-auto w-full', narrow ? 'max-w-4xl' : 'max-w-[1184px]')}>{children}</div>
    </section>
  );
}
