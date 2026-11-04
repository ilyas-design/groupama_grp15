import { Fragment } from 'react';
import { cn } from './cn';

interface RichTextProps {
  text: string;
  /** Classe appliquée aux segments *en italique* */
  emClassName?: string;
}

/** Rend « Lire le ciel *avant l'orage*. » avec l'italique Fraunces coloré. */
export function RichText({ text, emClassName }: RichTextProps) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('*') && p.endsWith('*') ? (
          <em key={i} className={cn('font-serif italic', emClassName ?? 'text-green-700')}>
            {p.slice(1, -1)}
          </em>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}
