'use client';

import { motion } from 'framer-motion';
import { useId } from 'react';
import type { RiskAlert, RiskType } from '@/content/anticiper';
import { riskColor } from './riskStyles';

interface FranceMapProps {
  alerts: RiskAlert[];
  active: RiskType | 'all';
  label: string;
}

/** Silhouette simplifiée de la France métropolitaine (viewBox 600 × 580). */
const FRANCE =
  'M330 40 L372 66 L420 88 L462 112 L500 128 L542 148 L532 200 L528 252 L500 298 L512 332 L540 372 L548 412 L566 452 L520 474 L490 480 L450 492 L420 480 L396 484 L370 504 L344 540 L300 532 L250 520 L200 516 L162 500 L176 456 L182 410 L170 376 L162 330 L140 296 L128 270 L84 248 L22 214 L46 188 L92 182 L150 190 L170 140 L194 152 L222 150 L262 128 L300 94 Z';
const CORSICA = 'M566 498 L580 506 L584 532 L576 562 L563 548 L560 516 Z';

/** Motif (en plus de la couleur) pour chaque type de risque. */
function Patterns({ uid }: { uid: string }) {
  return (
    <defs>
      <pattern id={`${uid}-hail`} width="10" height="10" patternUnits="userSpaceOnUse">
        <circle cx="5" cy="5" r="1.8" fill={riskColor.hail.stroke} />
      </pattern>
      <pattern id={`${uid}-flood`} width="16" height="8" patternUnits="userSpaceOnUse">
        <path d="M0 4 Q4 0 8 4 T16 4" fill="none" stroke={riskColor.flood.stroke} strokeWidth="1.4" />
      </pattern>
      <pattern id={`${uid}-drought`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="8" stroke={riskColor.drought.stroke} strokeWidth="1.6" />
      </pattern>
      <clipPath id={`${uid}-clip`}>
        <path d={FRANCE} />
        <path d={CORSICA} />
      </clipPath>
    </defs>
  );
}

export function FranceMap({ alerts, active, label }: FranceMapProps) {
  const uid = useId().replace(/:/g, '');
  const on = (a: RiskAlert) => active === 'all' || a.risk === active;

  return (
    <svg role="img" aria-label={label} viewBox="0 0 600 580" className="h-full w-full">
      <Patterns uid={uid} />
      <path d={FRANCE} fill="#fff" stroke="#C9D8CF" strokeWidth="2" strokeLinejoin="round" />
      <path d={CORSICA} fill="#fff" stroke="#C9D8CF" strokeWidth="2" strokeLinejoin="round" />

      {/* Fleuves : l'eau circule */}
      <g fill="none" stroke="var(--water)" strokeWidth="2" strokeLinecap="round" opacity=".55" aria-hidden>
        <path d="M420 400 C400 330 360 272 300 266 S180 282 132 272" className="flow-dash" />
        <path d="M500 322 C470 360 452 410 430 482" className="flow-dash" />
        <path d="M452 180 C410 192 344 154 264 132" className="flow-dash" />
      </g>

      {/* Zones de risque, découpées sur la silhouette */}
      <g clipPath={`url(#${uid}-clip)`}>
        {alerts.map((a) => (
          <motion.g key={a.id} initial={false} animate={{ opacity: on(a) ? 1 : 0.12 }} transition={{ duration: 0.4 }}>
            <circle cx={a.x} cy={a.y} r={a.r} fill={riskColor[a.risk].fill} opacity=".28" />
            <circle cx={a.x} cy={a.y} r={a.r} fill={`url(#${uid}-${a.risk})`} />
            <circle cx={a.x} cy={a.y} r={a.r} fill="none" stroke={riskColor[a.risk].stroke} strokeWidth="1.5" strokeDasharray="4 4" />
          </motion.g>
        ))}
      </g>

      {/* Points pulsants + libellés */}
      {alerts.map((a) => (
        <motion.g key={a.id} initial={false} animate={{ opacity: on(a) ? 1 : 0 }} transition={{ duration: 0.4 }}>
          {on(a) && (
            <circle cx={a.x} cy={a.y} r="7" fill={riskColor[a.risk].stroke} className="origin-center animate-ping [transform-box:fill-box]" />
          )}
          <circle cx={a.x} cy={a.y} r="6" fill={riskColor[a.risk].stroke} stroke="#fff" strokeWidth="2" />
          <text
            x={a.x}
            y={a.y + 24}
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--ink)"
            stroke="#fff"
            strokeWidth="4"
            paintOrder="stroke"
          >
            {a.mapLabel}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}
