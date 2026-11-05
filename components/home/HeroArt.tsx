'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { useSafeReducedMotion } from '@/components/ui/useSafeReducedMotion';
import { Icon, cn, toneSoft } from '@/components/ui';
import type { HeroChip } from '@/content/home';

interface HeroArtProps {
  label: string;
  chips: HeroChip[];
}

/* ---------- Génération déterministe (même rendu serveur / client) ---------- */

function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = seeded(15);
const r1 = (n: number) => Math.round(n * 10) / 10;
const pick = <T,>(list: T[]) => list[Math.floor(rand() * list.length)];

/** Point aléatoire dans la couronne d'une ellipse (dMin–dMax = fraction du rayon). */
function inEllipse(cx: number, cy: number, rx: number, ry: number, dMin: number, dMax: number): [number, number] {
  const a = rand() * Math.PI * 2;
  const d = dMin + (dMax - dMin) * Math.sqrt(rand());
  return [r1(cx + Math.cos(a) * rx * d), r1(cy + Math.sin(a) * ry * d)];
}

// Houppier : le soleil est en haut à gauche, les touffes claires s'y concentrent
const CX = 250;
const CY = 135;
const RX = 118;
const RY = 82;

const clumps = (count: number, dMax: number, rMin: number, rMax: number, dx = 0, dy = 0) =>
  Array.from({ length: count }, () => {
    const [x, y] = inEllipse(CX + dx, CY + dy, RX, RY, 0, dMax);
    return { x, y, r: r1(rMin + rand() * (rMax - rMin)) };
  }).sort((a, b) => a.y - b.y);

const backClumps = clumps(18, 0.95, 24, 36, 0, 8);
const midClumps = clumps(22, 0.85, 18, 28);
const frontClumps = clumps(14, 0.65, 12, 20, -14, -14);

type Clump = (typeof midClumps)[number];

/** Feuilles qui recouvrent chaque touffe : plus claires côté soleil (haut gauche), elles cassent les contours ronds. */
function leavesFor(cs: Clump[], palette: string[], perClump: number) {
  return cs.flatMap((c) =>
    Array.from({ length: perClump }, () => {
      const a = rand() * Math.PI * 2;
      const d = c.r * (0.3 + Math.sqrt(rand()) * 0.82);
      const x = c.x + Math.cos(a) * d;
      const y = c.y + Math.sin(a) * d;
      const light = ((CX - 40 - x) * 0.6 + (CY - 40 - y) * 0.8) / 160;
      const idx = Math.round((light * 0.5 + 0.5) * (palette.length - 1) + (rand() - 0.5) * 1.4);
      return { x: r1(x), y: r1(y), rot: Math.round(rand() * 360), s: r1(1 + rand() * 0.6), fill: palette[Math.min(palette.length - 1, Math.max(0, idx))] };
    }),
  );
}
const backLeaves = leavesFor(backClumps, ['#0F3A2A', '#145F3A', '#1B7E4D'], 9);
const midLeaves = leavesFor(midClumps, ['#145F3A', '#1B7E4D', '#2C9E65', '#3F8F4A'], 10);
const frontLeaves = leavesFor(frontClumps, ['#2C9E65', '#57B54D', '#7CC66A', '#9ED37F'], 8);
const blossoms = Array.from({ length: 9 }, () => inEllipse(CX, CY, RX, RY, 0.15, 0.8));
const glints = Array.from({ length: 7 }, (_, i) => ({ p: inEllipse(CX, CY, RX, RY, 0.2, 0.85), delay: r1(i * 0.9 + rand()) }));

const grass = Array.from({ length: 84 }, (_, i) => {
  const x = r1((i / 84) * 504 + rand() * 4 - 2);
  const b = r1(264 + rand() * 3);
  const h = r1(6 + rand() * 11);
  const lean = r1(rand() * 8 - 4);
  return {
    d: `M${r1(x - 1.3)} ${b} Q${r1(x + lean * 0.3)} ${r1(b - h * 0.6)} ${r1(x + lean)} ${r1(b - h)} Q${r1(x + lean * 0.2 + 0.6)} ${r1(b - h * 0.5)} ${r1(x + 1.3)} ${b} Z`,
    fill: pick(['#3F7F3A', '#4F8F45', '#5FA04F', '#2F6A30']),
    group: i % 2,
  };
});
const wildflowers = Array.from({ length: 8 }, () => ({ x: r1(20 + rand() * 460), y: r1(256 + rand() * 6), fill: pick(['#F2785C', '#FFFFFF', '#F7A58F']) }));

const pebbles = Array.from({ length: 28 }, () => ({
  x: r1(rand() * 500),
  y: r1(290 + rand() * 155),
  rx: r1(1.5 + rand() * 2.5),
  ry: r1(1.2 + rand() * 1.6),
  fill: pick(['#8E7452', '#6E5839', '#A08560', '#5A4329']),
}));
const specks = Array.from({ length: 70 }, () => ({ x: r1(rand() * 500), y: r1(280 + rand() * 175), r: r1(0.6 + rand() * 0.7) }));

/* ---------- Racines (tracé aller) et eau qui remonte (tracé retour) ---------- */

const roots: [string, number][] = [
  ['M250 268 C246 310 210 330 170 365 C130 400 100 425 72 470', 5.5],
  ['M250 268 C256 315 295 335 335 372 C375 409 405 430 428 476', 5.5],
  ['M250 268 C252 320 246 380 250 470', 5],
  ['M248 300 C225 330 205 360 182 438', 3],
  ['M253 305 C280 335 300 380 318 448', 3],
  ['M170 365 C150 372 128 380 110 405', 2],
  ['M335 372 C360 378 380 392 395 410', 2],
  ['M250 400 C235 420 225 440 214 462', 1.6],
  ['M250 410 C266 428 274 446 286 466', 1.6],
  ['M110 405 C100 412 94 420 90 432', 1],
  ['M395 410 C405 416 410 424 414 436', 1],
  ['M182 438 C176 446 172 452 166 460', 1],
  ['M318 448 C324 454 328 460 334 466', 1],
];
const sap = [
  'M72 470 C100 425 130 400 170 365 C210 330 246 310 250 268',
  'M428 476 C405 430 375 409 335 372 C295 335 256 315 250 268',
  'M250 470 C246 380 252 320 250 268',
];
const trunkSap = 'M250 266 C249 230 248 200 250 160';
const nodes: [number, number, number][] = [
  [170, 365, 4], [335, 372, 4], [250, 400, 4], [182, 438, 3], [318, 448, 3], [72, 470, 3], [428, 476, 3],
];

const fallingLeaves = [
  { x: 196, y: 176, dx: '-38px', dur: '11s', delay: '0s', fill: '#57B54D' },
  { x: 304, y: 170, dx: '46px', dur: '13s', delay: '-5s', fill: '#9ED37F' },
  { x: 262, y: 196, dx: '-24px', dur: '9s', delay: '-2.5s', fill: '#F7A58F' },
];

const chipPos: Record<HeroChip['position'], string> = {
  left: 'left-3 top-[40%] sm:left-[18px]',
  topRight: 'right-3 top-4 sm:right-[18px] sm:top-[30px]',
  bottomRight: 'bottom-4 right-3 sm:bottom-6 sm:right-[18px]',
};

/** Illustration du hero : arbre vivant, racines-réseau, eau qui remonte de la nappe jusqu'aux feuilles, 3 chips flottantes. */
export function HeroArt({ label, chips }: HeroArtProps) {
  const reduce = useSafeReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Hors écran : on fige toutes les animations (CSS + SMIL) pour ne pas repeindre la scène pendant le scroll
  useEffect(() => {
    const root = ref.current;
    const svg = root?.querySelector('svg');
    if (!root || !svg) return;
    const observer = new IntersectionObserver(([entry]) => {
      root.toggleAttribute('data-paused', !entry.isIntersecting);
      if (entry.isIntersecting) svg.unpauseAnimations();
      else svg.pauseAnimations();
    });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} role="img" aria-label={label} className="relative aspect-[1/1.02] overflow-hidden rounded-xl3 bg-[#E3F0EA] shadow-soft">
      <svg aria-hidden viewBox="0 0 500 510" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="ha-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#D3EAEE" />
            <stop offset=".55" stopColor="#E9F4EA" />
            <stop offset="1" stopColor="#F7EED9" />
          </linearGradient>
          <radialGradient id="ha-sun">
            <stop offset="0" stopColor="#FFF4CF" stopOpacity=".95" />
            <stop offset=".35" stopColor="#FCE3A0" stopOpacity=".45" />
            <stop offset="1" stopColor="#FCE3A0" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ha-hill-far" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#BCD8C2" />
            <stop offset="1" stopColor="#A6CBB0" />
          </linearGradient>
          <linearGradient id="ha-hill-near" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#93C27E" />
            <stop offset="1" stopColor="#6FA860" />
          </linearGradient>
          <linearGradient id="ha-mist" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset=".6" stopColor="#fff" stopOpacity=".45" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ha-bark" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#3E2C1A" />
            <stop offset=".35" stopColor="#7A5A30" />
            <stop offset=".55" stopColor="#9C7648" />
            <stop offset="1" stopColor="#4A3520" />
          </linearGradient>
          {/* Dégradés doux, sans bord sombre : ce sont les feuilles qui font le relief */}
          <radialGradient id="ha-clump-back" cx=".38" cy=".32" r=".9">
            <stop offset="0" stopColor="#1E8250" />
            <stop offset="1" stopColor="#155E3A" />
          </radialGradient>
          <radialGradient id="ha-clump-mid" cx=".36" cy=".3" r=".9">
            <stop offset="0" stopColor="#3FA058" />
            <stop offset="1" stopColor="#257A47" />
          </radialGradient>
          <radialGradient id="ha-clump-front" cx=".34" cy=".28" r=".9">
            <stop offset="0" stopColor="#86C76E" />
            <stop offset="1" stopColor="#4FA84A" />
          </radialGradient>
          <linearGradient id="ha-soil" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8C6B44" />
            <stop offset=".35" stopColor="#765A37" />
            <stop offset=".8" stopColor="#5F472C" />
            <stop offset="1" stopColor="#4E3B25" />
          </linearGradient>
          <linearGradient id="ha-aquifer" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2DA9DA" stopOpacity=".35" />
            <stop offset="1" stopColor="#1A78AA" stopOpacity=".7" />
          </linearGradient>
          <radialGradient id="ha-drop">
            <stop offset="0" stopColor="#fff" />
            <stop offset=".35" stopColor="#9BE0F7" />
            <stop offset="1" stopColor="#2DA9DA" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="ha-node">
            <stop offset="0" stopColor="#7FD3F0" stopOpacity=".9" />
            <stop offset="1" stopColor="#2DA9DA" stopOpacity="0" />
          </radialGradient>
          <path id="ha-leaf" d="M-4 0 C-2 -2.6 2 -2.6 4 0 C2 2.6 -2 2.6 -4 0 Z" />
          <clipPath id="ha-sky-clip">
            <rect width="500" height="262" />
          </clipPath>
        </defs>

        {/* Ciel, soleil, rayons, nuages, oiseaux */}
        <rect width="500" height="270" fill="url(#ha-sky)" />
        <g clipPath="url(#ha-sky-clip)">
          <circle cx="92" cy="66" r="120" fill="url(#ha-sun)" />
          <circle cx="92" cy="66" r="22" fill="#FFF1C7" />
          <g fill="#fff" className="ha-rays">
            <path d="M92 66 L520 230 L520 280 Z" />
            <path d="M92 66 L330 262 L270 262 Z" />
            <path d="M92 66 L520 120 L520 150 Z" />
          </g>
          <g fill="#fff" opacity=".75" className="ha-cloud">
            <ellipse cx="200" cy="36" rx="34" ry="9" />
            <ellipse cx="222" cy="30" rx="20" ry="9" />
          </g>
          <g fill="#fff" opacity=".6" className="ha-cloud" style={{ animationDelay: '-14s' }}>
            <ellipse cx="440" cy="148" rx="40" ry="8" />
            <ellipse cx="458" cy="142" rx="22" ry="8" />
          </g>
          <g fill="none" stroke="#4A5C53" strokeWidth="1.3" strokeLinecap="round" className="ha-birds">
            <path d="M-40 108 q4 -4 8 0 q4 -4 8 0" />
            <path d="M-62 120 q3 -3 6 0 q3 -3 6 0" />
          </g>
        </g>

        {/* Collines, brume, bosquets lointains */}
        <path d="M0 228 C60 205 140 210 210 222 S360 200 500 214 V262 H0 Z" fill="url(#ha-hill-far)" />
        <g fill="#2F6A40" opacity=".35">
          <ellipse cx="62" cy="214" rx="12" ry="8" />
          <ellipse cx="78" cy="216" rx="9" ry="6" />
          <ellipse cx="446" cy="206" rx="11" ry="7" />
        </g>
        <rect y="212" width="500" height="40" fill="url(#ha-mist)" />
        <path d="M0 246 C80 232 170 238 250 244 S410 232 500 240 V266 H0 Z" fill="url(#ha-hill-near)" />

        {/* Sol en coupe : strates, cailloux, nappe d'eau */}
        <rect y="266" width="500" height="244" fill="url(#ha-soil)" />
        <path d="M0 338 C90 330 180 346 260 338 S420 330 500 340 V362 C420 354 340 364 250 358 S80 352 0 362 Z" fill="#000" opacity=".06" />
        <path d="M0 412 C110 404 200 420 280 412 S440 404 500 414 V432 C430 426 330 436 250 430 S90 424 0 432 Z" fill="#000" opacity=".07" />
        <g fill="#3E2E1C" opacity=".5">
          {specks.map((s) => (
            <circle key={`${s.x}-${s.y}`} cx={s.x} cy={s.y} r={s.r} />
          ))}
        </g>
        {pebbles.map((p) => (
          <g key={`${p.x}-${p.y}`}>
            <ellipse cx={p.x} cy={p.y} rx={p.rx} ry={p.ry} fill={p.fill} />
            <ellipse cx={r1(p.x - p.rx * 0.3)} cy={r1(p.y - p.ry * 0.35)} rx={r1(p.rx * 0.4)} ry={r1(p.ry * 0.3)} fill="#fff" opacity=".12" />
          </g>
        ))}
        <g className="ha-wave">
          <path d="M0 458 Q62.5 448 125 458 T250 458 T375 458 T500 458 T625 458 T750 458 T875 458 T1000 458 V510 H0 Z" fill="url(#ha-aquifer)" />
        </g>
        <g className="ha-wave ha-wave-slow" opacity=".5">
          <path d="M0 466 Q62.5 458 125 466 T250 466 T375 466 T500 466 T625 466 T750 466 T875 466 T1000 466 V510 H0 Z" fill="#2DA9DA" />
        </g>

        {/* Racines qui poussent : trait sombre + reflet pour le volume */}
        <g fill="none" strokeLinecap="round">
          {roots.map(([d, w], i) => (
            <g key={d}>
              <motion.path
                d={d}
                stroke="#4A3520"
                strokeWidth={w}
                initial={reduce ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.4, delay: 0.2 + i * 0.12, ease: 'easeOut' }}
              />
              {w > 1.5 && (
                <motion.path
                  d={d}
                  stroke="#9C7648"
                  strokeWidth={w * 0.35}
                  transform="translate(-0.6 -0.6)"
                  initial={reduce ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2.4, delay: 0.2 + i * 0.12, ease: 'easeOut' }}
                />
              )}
            </g>
          ))}
        </g>

        {/* Nœuds du réseau (l'IA) : halo + onde */}
        {nodes.map(([cx, cy, r], i) => (
          <g key={`${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r={r * 3} fill="url(#ha-node)" />
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="#7FD3F0" strokeWidth="1.2" className="ha-ping" style={{ animationDelay: `${(i * 0.45) % 2.8}s` }} />
            <circle cx={cx} cy={cy} r={r} fill="#1A78AA" />
            <circle cx={cx - r * 0.3} cy={cy - r * 0.3} r={r * 0.35} fill="#fff" opacity=".8" />
          </g>
        ))}

        {/* Bande d'herbe et ombre de l'arbre */}
        <path d="M0 260 H500 V271 C460 275 420 269 380 273 S300 269 250 274 S150 269 100 273 S30 270 0 273 Z" fill="#4C7838" />
        <ellipse cx="258" cy="265" rx="96" ry="6" fill="#0F3A2A" opacity=".2" />

        {/* Arbre (tronc + houppier) qui se balance */}
        <g className="ha-sway">
          <path d="M232 268 C238 258 241 240 242 215 C243 190 244 170 246 140 L254 140 C256 170 257 190 258 215 C259 240 262 258 270 268 Z" fill="url(#ha-bark)" />
          <g fill="none" stroke="#3E2C1A" strokeWidth=".9" opacity=".45" strokeLinecap="round">
            <path d="M246 258 C247 232 247 204 248 172" />
            <path d="M253 252 C253 226 252 200 252 176" />
            <path d="M249 236 C250 220 250 210 250 196" />
          </g>

          <g className="ha-rustle-slow">
            {backClumps.map((c) => (
              <circle key={`b${c.x}-${c.y}`} cx={c.x} cy={c.y} r={c.r} fill="url(#ha-clump-back)" />
            ))}
            {backLeaves.map((l, i) => (
              <use key={`bl${i}`} href="#ha-leaf" fill={l.fill} transform={`translate(${l.x} ${l.y}) rotate(${l.rot}) scale(${l.s})`} />
            ))}
          </g>

          <g fill="url(#ha-bark)">
            <path d="M245 205 C232 192 218 182 200 172 L203 168 C220 176 235 186 247 196 Z" />
            <path d="M255 190 C268 175 284 162 302 150 L304 154 C288 166 273 180 257 198 Z" />
            <path d="M247 160 C238 145 228 132 214 120 L217 117 C231 128 241 140 249 152 Z" />
            <path d="M253 150 C262 135 270 120 282 104 L285 107 C274 121 266 137 256 156 Z" />
          </g>

          <ellipse cx="252" cy="200" rx="70" ry="16" fill="#0F3A2A" opacity=".25" />

          <g className="ha-rustle">
            {midClumps.map((c) => (
              <circle key={`m${c.x}-${c.y}`} cx={c.x} cy={c.y} r={c.r} fill="url(#ha-clump-mid)" />
            ))}
            {midLeaves.map((l, i) => (
              <use key={`ml${i}`} href="#ha-leaf" fill={l.fill} transform={`translate(${l.x} ${l.y}) rotate(${l.rot}) scale(${l.s})`} />
            ))}
          </g>

          <g className="ha-rustle-fast">
            {frontClumps.map((c) => (
              <circle key={`f${c.x}-${c.y}`} cx={c.x} cy={c.y} r={c.r} fill="url(#ha-clump-front)" opacity=".85" />
            ))}
            {frontLeaves.map((l, i) => (
              <use key={`fr${i}`} href="#ha-leaf" fill={l.fill} transform={`translate(${l.x} ${l.y}) rotate(${l.rot}) scale(${l.s})`} />
            ))}
            {blossoms.map(([x, y]) => (
              <g key={`fl${x}-${y}`} transform={`translate(${x} ${y})`}>
                {[0, 72, 144, 216, 288].map((a) => (
                  <circle key={a} cx={r1(Math.cos((a * Math.PI) / 180) * 2.6)} cy={r1(Math.sin((a * Math.PI) / 180) * 2.6)} r="2.4" fill="#F2785C" />
                ))}
                <circle r="1.5" fill="#FCE9B8" />
              </g>
            ))}
            {glints.map(({ p: [x, y], delay }) => (
              <circle key={`g${x}-${y}`} cx={x} cy={y} r="1.8" fill="#E9FBFF" className="ha-twinkle" style={{ animationDelay: `${delay}s` }} />
            ))}
          </g>
        </g>

        {/* Feuilles qui tombent */}
        {fallingLeaves.map((l) => (
          <g key={l.x} transform={`translate(${l.x} ${l.y})`}>
            <use
              href="#ha-leaf"
              fill={l.fill}
              className="ha-leaf-fall"
              style={{ '--dx': l.dx, animationDuration: l.dur, animationDelay: l.delay } as CSSProperties}
            />
          </g>
        ))}

        {/* Herbes et fleurs des champs */}
        {[0, 1].map((g) => (
          <g key={g} className={g ? 'ha-grass ha-grass-alt' : 'ha-grass'}>
            {grass
              .filter((b) => b.group === g)
              .map((b) => (
                <path key={b.d} d={b.d} fill={b.fill} />
              ))}
          </g>
        ))}
        {wildflowers.map((f) => (
          <circle key={`${f.x}-${f.y}`} cx={f.x} cy={f.y} r="1.8" fill={f.fill} />
        ))}

        {/* L'eau remonte de la nappe par les racines jusqu'au houppier */}
        {!reduce && (
          <g>
            {sap.flatMap((path, i) =>
              [0, 1.2, 2.4].map((offset) => (
                <g key={`${i}-${offset}`} opacity="0">
                  <circle r="3.4" fill="url(#ha-drop)" />
                  <circle r="1.2" fill="#fff" />
                  <animateMotion dur="3.6s" begin={`${offset + i * 0.4}s`} repeatCount="indefinite" path={path} />
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.12;.85;1" dur="3.6s" begin={`${offset + i * 0.4}s`} repeatCount="indefinite" />
                </g>
              )),
            )}
            {[0, 0.8, 1.6].map((offset) => (
              <g key={`t${offset}`} opacity="0">
                <circle r="2.8" fill="url(#ha-drop)" />
                <animateMotion dur="2.4s" begin={`${offset}s`} repeatCount="indefinite" path={trunkSap} />
                <animate attributeName="opacity" values="0;.8;.8;0" keyTimes="0;.15;.7;1" dur="2.4s" begin={`${offset}s`} repeatCount="indefinite" />
              </g>
            ))}
          </g>
        )}
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
