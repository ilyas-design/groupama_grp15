'use client';

import { motion } from 'framer-motion';
import { cn } from './cn';

interface AnimatedRootsProps {
  className?: string;
  /** Couleur des racines (CSS) */
  color?: string;
  /** Afficher les nœuds lumineux (réseau neuronal) */
  nodes?: boolean;
  /** Délai avant le tracé (s) */
  delay?: number;
}

const roots = [
  'M200 0 C200 40 190 70 160 100 S90 150 40 190',
  'M200 0 C205 45 230 80 270 110 S340 160 380 200',
  'M200 0 C198 60 200 110 205 160 S210 210 200 240',
  'M182 70 C150 90 120 100 80 100',
  'M222 80 C250 100 300 110 330 105',
  'M160 100 C150 140 130 170 110 230',
  'M270 110 C275 150 290 190 300 235',
];
const knots: Array<[number, number]> = [
  [160, 100], [270, 110], [205, 160], [80, 100], [330, 105], [110, 230], [300, 235], [40, 190], [380, 200],
];

/** Racines qui se dessinent (stroke) au scroll — viewBox 400×240, s'étire en largeur. */
export function AnimatedRoots({ className, color = 'var(--earth)', nodes = true, delay = 0 }: AnimatedRootsProps) {
  return (
    <svg aria-hidden viewBox="0 0 400 240" fill="none" preserveAspectRatio="xMidYMin meet" className={cn('w-full', className)}>
      {roots.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke={color}
          strokeWidth={i < 3 ? 3 : 2}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.8, delay: delay + i * 0.15, ease: 'easeInOut' }}
        />
      ))}
      {nodes &&
        knots.map(([cx, cy], i) => (
          <motion.circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r={4}
            fill="var(--water)"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 1.2 + i * 0.08 }}
          />
        ))}
    </svg>
  );
}
