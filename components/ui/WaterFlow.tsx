import { cn } from './cn';

interface WaterFlowProps {
  className?: string;
  /** Nombre de lignes d'eau */
  lines?: number;
  color?: string;
  /** Opacité globale 0–1 */
  opacity?: number;
}

/** Lignes d'eau ondulées, la ligne centrale circule (dash animé, coupé si reduced-motion). */
export function WaterFlow({ className, lines = 3, color = 'var(--water)', opacity = 0.6 }: WaterFlowProps) {
  return (
    <svg aria-hidden viewBox="0 0 1200 80" preserveAspectRatio="none" fill="none" className={cn('h-16 w-full', className)} style={{ opacity }}>
      {Array.from({ length: lines }, (_, i) => {
        const y = 20 + i * (40 / Math.max(1, lines - 1));
        return (
          <path
            key={i}
            d={`M0 ${y} Q150 ${y - 14} 300 ${y} T600 ${y} T900 ${y} T1200 ${y}`}
            stroke={color}
            strokeWidth={i === Math.floor(lines / 2) ? 2.5 : 1.5}
            strokeLinecap="round"
            className={i === Math.floor(lines / 2) ? 'flow-dash' : undefined}
            opacity={i === Math.floor(lines / 2) ? 1 : 0.5}
          />
        );
      })}
    </svg>
  );
}
