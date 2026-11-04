'use client';

import { motion } from 'framer-motion';
import { useSafeReducedMotion } from '@/components/ui/useSafeReducedMotion';

/** Graine animée pour la 404 : elle se balance dans la terre, une pousse hésite à sortir, l'eau goutte. */
export function Seed({ className }: { className?: string }) {
  const reduce = useSafeReducedMotion();
  return (
    <svg aria-hidden viewBox="0 0 240 220" fill="none" className={className}>
      {/* Goutte d'eau */}
      {!reduce && (
        <motion.path
          d="M120 18 C112 30 108 37 108 43 a12 12 0 0 0 24 0 C132 37 128 30 120 18 Z"
          fill="var(--water)"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: [-10, 52, 52], opacity: [0, 1, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 0.8, times: [0, 0.7, 1], ease: 'easeIn' }}
        />
      )}
      {/* Sol */}
      <path d="M20 132 Q120 112 220 132 L220 220 L20 220 Z" fill="var(--sand-2)" />
      <path d="M20 132 Q120 112 220 132" stroke="var(--earth)" strokeWidth="3" strokeLinecap="round" />
      {/* Radicelles */}
      <motion.path
        d="M120 168 C112 185 100 192 86 200 M120 170 C128 186 142 194 156 198 M120 172 C121 186 119 196 120 210"
        stroke="var(--earth)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: reduce ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.6, ease: 'easeInOut' }}
      />
      {/* Graine */}
      <motion.g
        style={{ originX: '120px', originY: '160px' }}
        animate={{ rotate: [-6, 6, -6] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ellipse cx="120" cy="156" rx="17" ry="12" fill="#7A5A30" />
        <path d="M108 154 Q120 146 132 154" stroke="#E9C996" strokeWidth="2" strokeLinecap="round" />
        {/* Pousse qui hésite */}
        <motion.path
          d="M120 144 C120 136 121 130 124 124"
          stroke="var(--leaf)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: reduce ? 1 : 0 }}
          animate={reduce ? { pathLength: 1 } : { pathLength: [0, 1, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, times: [0, 0.35, 0.75, 1], ease: 'easeInOut' }}
        />
      </motion.g>
      {/* Petites pousses voisines */}
      <path d="M50 126 C50 116 54 110 60 106 M50 118 C46 112 40 110 36 110" stroke="var(--leaf)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M192 126 C192 118 189 112 184 108 M192 120 C196 114 202 112 206 112" stroke="var(--leaf)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
