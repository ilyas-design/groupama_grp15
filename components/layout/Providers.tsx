'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

/** reducedMotion="user" : Framer Motion coupe les transforms si prefers-reduced-motion. */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
