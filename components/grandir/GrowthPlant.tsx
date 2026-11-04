'use client';

import { motion } from 'framer-motion';
import type { LevelPlant } from '@/content/grandir';

const grow = (delay: number) => ({
  initial: { scale: 0.4, opacity: 0 },
  whileInView: { scale: 1, opacity: 1 },
  viewport: { once: true, amount: 0.6 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
  style: { transformOrigin: '50% 100%', transformBox: 'fill-box' as const },
});

/** Petites illustrations qui « poussent » à l'entrée dans le viewport : graine → forêt. */
export function GrowthPlant({ plant, delay = 0 }: { plant: LevelPlant; delay?: number }) {
  if (plant === 'seed')
    return (
      <svg viewBox="0 0 54 54" className="h-12 w-12 lg:h-14 lg:w-14" aria-hidden>
        <motion.g {...grow(delay)}>
          <ellipse cx="27" cy="40" rx="10" ry="6" fill="#B8925F" />
          <ellipse cx="27" cy="34" rx="6" ry="4" fill="#6E5332" />
        </motion.g>
      </svg>
    );
  if (plant === 'sprout')
    return (
      <svg viewBox="0 0 54 54" className="h-12 w-12 lg:h-14 lg:w-14" aria-hidden>
        <ellipse cx="27" cy="44" rx="12" ry="5" fill="#B8925F" />
        <motion.g {...grow(delay)}>
          <path d="M27 44V24" stroke="#3F9A5E" strokeWidth="3" />
          <path d="M27 30c0-6 5-9 11-9 0 6-5 9-11 9zM27 34c0-5-4-8-9-8 0 5 4 8 9 8z" fill="#8CCB5E" />
        </motion.g>
      </svg>
    );
  if (plant === 'tree')
    return (
      <svg viewBox="0 0 64 64" className="h-14 w-14 lg:h-16 lg:w-16" aria-hidden>
        <motion.g {...grow(delay)}>
          <path d="M32 58V30" stroke="#6E5332" strokeWidth="5" strokeLinecap="round" />
          <circle cx="32" cy="22" r="16" fill="#4FAE6B" />
          <circle cx="22" cy="30" r="10" fill="#3F9A5E" />
          <circle cx="42" cy="30" r="10" fill="#2F8550" />
        </motion.g>
      </svg>
    );
  return (
    <svg viewBox="0 0 70 64" className="h-14 w-16 lg:h-16 lg:w-[70px]" aria-hidden>
      <g opacity={0.35}>
        <motion.g {...grow(delay)}>
          <path d="M20 58V34M50 58V34M35 58V28" stroke="#6E5332" strokeWidth="4" />
          <circle cx="20" cy="28" r="12" fill="#4FAE6B" />
          <circle cx="50" cy="28" r="12" fill="#4FAE6B" />
          <circle cx="35" cy="20" r="14" fill="#3F9A5E" />
        </motion.g>
      </g>
    </svg>
  );
}

const dots = (dir: string) => `repeating-linear-gradient(${dir},var(--leaf) 0 10px,transparent 10px 18px)`;

/** Ligne pointillée qui relie les niveaux : verticale sur mobile, horizontale sur desktop. */
export function GrowthLine() {
  return (
    <>
      <motion.span
        aria-hidden
        className="absolute bottom-12 left-[42px] top-12 w-[3px] lg:hidden"
        style={{ backgroundImage: dots('180deg'), transformOrigin: 'top' }}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      />
      <motion.span
        aria-hidden
        className="absolute left-[12%] right-[12%] top-[61px] hidden h-[3px] lg:block"
        style={{ backgroundImage: dots('90deg'), transformOrigin: 'left' }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      />
    </>
  );
}
