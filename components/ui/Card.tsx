import type { ElementType, ReactNode } from 'react';
import { cn } from './cn';

interface CardProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Soulèvement + ombre au survol */
  interactive?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  tone?: 'white' | 'sand' | 'ink' | 'signature';
  id?: string;
}

const pads = { none: '', sm: 'p-5', md: 'p-6 sm:p-7', lg: 'p-7 sm:p-9' };
const tones = {
  white: 'bg-white border border-line',
  sand: 'bg-sand border border-line',
  ink: 'bg-ink text-white',
  signature: 'bg-signature text-white',
};

export function Card({ children, className, as: Tag = 'div', interactive, padding = 'md', tone = 'white', id }: CardProps) {
  return (
    <Tag
      id={id}
      className={cn(
        'rounded-card',
        tones[tone],
        pads[padding],
        interactive && 'transition-all duration-300 hover:-translate-y-1 hover:shadow-soft',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
