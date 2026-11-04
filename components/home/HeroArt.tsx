'use client';

import { motion } from 'framer-motion';
import { useSafeReducedMotion } from '@/components/ui/useSafeReducedMotion';
import { Icon, cn, toneSoft } from '@/components/ui';
import type { HeroChip } from '@/content/home';

interface HeroArtProps {
  label: string;
  chips: HeroChip[];
}

const roots = [
  'M250 268 C250 320 200 330 160 370 S90 430 70 470',
  'M250 268 C250 330 300 340 340 380 S410 440 430 480',
  'M250 268 V470',
  'M250 330 C220 360 220 400 180 440',
  'M250 340 C285 370 290 410 320 450',
];
const water = ['M70 470 S90 430 160 370 S250 320 250 268', 'M430 480 S410 440 340 380 S250 330 250 268', 'M250 470 V268'];
const nodes: [number, number, number][] = [
  [160, 370, 7], [340, 380, 7], [250, 400, 7], [180, 440, 6], [320, 450, 6], [70, 470, 6], [430, 480, 6],
];
const flowers: [number, number, number, string][] = [
  [215, 105, 8, '#F2785C'], [290, 95, 7, '#F2785C'], [315, 160, 8, '#F7A58F'], [190, 165, 6, '#F7A58F'], [255, 60, 6, '#F2785C'],
];

const chipPos: Record<HeroChip['position'], string> = {
  left: 'left-3 top-[40%] sm:left-[18px]',
  topRight: 'right-3 top-4 sm:right-[18px] sm:top-[30px]',
  bottomRight: 'bottom-4 right-3 sm:bottom-6 sm:right-[18px]',
};

/** Illustration du hero : arbre, racines-réseau, eau qui monte, 3 chips flottantes. */
export function HeroArt({ label, chips }: HeroArtProps) {
  const reduce = useSafeReducedMotion();
  return (
    <div
      role="img"
      aria-label={label}
      className="relative aspect-[1/1.02] overflow-hidden rounded-xl3 bg-[linear-gradient(180deg,#E8F6EE_0%,#E8F6EE_52%,#E7DAC4_52%,#D9C6A6_100%)] shadow-soft"
    >
      <svg aria-hidden viewBox="0 0 500 510" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <circle cx="400" cy="80" r="38" fill="#FCE9B8" />
        <circle cx="400" cy="80" r="26" fill="#F8D57E" />
        <path d="M0 250 Q120 200 250 235 T500 225 V265 H0Z" fill="#CFE6C4" />
        <g className="animate-float">
          <path d="M250 265 V150" stroke="#6E5332" strokeWidth="12" strokeLinecap="round" />
          <path d="M250 200 L210 170 M250 185 L290 150" stroke="#6E5332" strokeWidth="7" strokeLinecap="round" />
          <circle cx="250" cy="120" r="72" fill="#1B7E4D" />
          <circle cx="198" cy="150" r="48" fill="#2C9E65" />
          <circle cx="305" cy="140" r="52" fill="#145F3A" />
          <circle cx="255" cy="78" r="44" fill="#57B54D" />
          {flowers.map(([cx, cy, r, f]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={f} />
          ))}
        </g>
        <rect x="0" y="262" width="500" height="6" fill="#B8925F" opacity=".5" />
        <g fill="none" stroke="#7A5A30" strokeWidth="4" strokeLinecap="round">
          {roots.map((d, i) => (
            <motion.path
              key={d}
              d={d}
              initial={reduce ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.4, delay: 0.2 + i * 0.15, ease: 'easeOut' }}
            />
          ))}
        </g>
        <g fill="none" stroke="#2DA9DA" strokeWidth="3" strokeLinecap="round">
          {water.map((d) => (
            <path key={d} d={d} className="flow-dash" />
          ))}
        </g>
        <g fill="#1A78AA">
          {nodes.map(([cx, cy, r], i) => (
            <motion.circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r={r}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              animate={reduce ? undefined : { scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: (i * 0.4) % 1.6 }}
            />
          ))}
        </g>
      </svg>

      <div aria-hidden>
        {chips.map((c, i) => (
          <div
            key={c.title}
            style={{ animationDelay: `${i * 1.2}s` }}
            className={cn(
              'absolute flex max-w-[62%] animate-float items-center gap-2.5 rounded-[14px] bg-white px-3 py-2 text-xs font-bold text-ink shadow-soft sm:max-w-none sm:px-3.5 sm:py-2.5 sm:text-[13px]',
              chipPos[c.position],
            )}
          >
            <span className={cn('grid h-[30px] w-[30px] flex-none place-items-center rounded-[10px]', toneSoft[c.tone])}>
              <Icon name={c.icon} className="h-[18px] w-[18px]" />
            </span>
            <span className="leading-tight">
              {c.title}
              <small className="block text-[11px] font-medium text-ink-2">{c.sub}</small>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
