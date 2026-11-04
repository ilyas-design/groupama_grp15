import type { ReactNode } from 'react';
import { cn } from './cn';

interface EyebrowProps {
  children: ReactNode;
  className?: string;
  /** Couleur claire pour fonds sombres */
  light?: boolean;
  /** Classe de couleur du texte (remplace le vert par défaut), ex. 'text-earth-dk' */
  color?: string;
}

export function Eyebrow({ children, className, light, color }: EyebrowProps) {
  return (
    <p
      className={cn(
        'inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em]',
        color ?? (light ? 'text-leaf-lt' : 'text-green-700'),
        className,
      )}
    >
      <span aria-hidden className="h-2 w-2 rounded-full bg-current" />
      {children}
    </p>
  );
}
