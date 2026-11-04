'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  /** Délai (s) — utile pour échelonner une grille : delay={i * 0.08} */
  delay?: number;
  className?: string;
  /** Décalage vertical initial (px) */
  y?: number;
  as?: 'div' | 'li' | 'section' | 'article';
}

/** Apparition douce au scroll (désactivée automatiquement si reduced-motion via MotionConfig). */
export function Reveal({ children, delay = 0, className, y = 24, as = 'div' }: RevealProps) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
}
