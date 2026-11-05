import type { ReactNode } from 'react';

/** Remonté à chaque navigation : sert de point d'accroche au fondu entre les pages. */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-in">{children}</div>;
}
