import { Icon } from '@/components/ui';
import type { HeroChip } from '@/content/anticiper';

interface HeroVisualProps {
  label: string;
  chips: HeroChip[];
}

const rain = [150, 185, 220, 255, 290, 325];

/** Ciel d'orage stylisé : nuage, pluie/grêle qui tombe (dash animé), champs, et deux alertes flottantes. */
export function HeroVisual({ label, chips }: HeroVisualProps) {
  return (
    <figure className="relative mx-auto aspect-[1/0.9] w-full max-w-[520px] overflow-hidden rounded-xl3 bg-[linear-gradient(180deg,#DCEFF5_0%,#EAF6F0_55%,#E7DAC4_55%,#D9C6A6_100%)] shadow-soft">
      <svg role="img" aria-label={label} viewBox="0 0 480 432" className="absolute inset-0 h-full w-full">
        {/* Soleil derrière le nuage */}
        <circle cx="330" cy="92" r="46" fill="#F8D57E" opacity=".75" />
        {/* Pluie / grêle : dash vertical qui « tombe » */}
        <g stroke="var(--water)" strokeWidth="3" strokeLinecap="round" opacity=".8">
          {rain.map((x, i) => (
            <path key={x} d={`M${x} ${150 + (i % 2) * 8} L${x - 18} 228`} className="flow-dash" style={{ animationDelay: `${i * -0.4}s` }} />
          ))}
        </g>
        {/* Nuage */}
        <g fill="#fff" stroke="#C9D8CF" strokeWidth="2">
          <path d="M120 150 C90 150 80 112 112 104 C110 70 156 58 176 82 C194 44 260 48 268 94 C306 88 322 128 300 150 Z" />
        </g>
        <g fill="var(--water-dk)" opacity=".85">
          <circle cx="196" cy="246" r="5" />
          <circle cx="252" cy="252" r="4" />
          <circle cx="300" cy="244" r="5" />
        </g>
        {/* Champs en perspective */}
        <g stroke="#B8925F" strokeWidth="2" opacity=".55" fill="none">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <path key={i} d={`M${240 + (i - 3) * 22} 238 L${240 + (i - 3) * 110} 432`} />
          ))}
        </g>
        <path d="M0 238 H480" stroke="#9CC48A" strokeWidth="6" />
        {/* Courant d'eau qui traverse les champs */}
        <path
          d="M0 360 C80 330 140 390 230 360 S380 320 480 350"
          fill="none"
          stroke="var(--water)"
          strokeWidth="4"
          strokeLinecap="round"
          className="flow-dash"
        />
      </svg>
      {chips.map((c, i) => (
        <div
          key={c.title}
          className={
            'absolute flex animate-float items-center gap-2.5 rounded-[14px] bg-white px-3.5 py-2.5 text-[13px] font-bold shadow-soft ' +
            (i === 0 ? 'left-4 top-[46%] sm:left-6' : 'bottom-6 right-4 sm:right-6')
          }
          style={{ animationDelay: `${i * -2.5}s` }}
        >
          <span className={'grid h-[30px] w-[30px] place-items-center rounded-[10px] ' + (i === 0 ? 'bg-coral-lt text-coral-dk' : 'bg-leaf-lt text-leaf-dk')}>
            <Icon name={c.icon} className="h-4 w-4" />
          </span>
          <span>
            {c.title}
            <small className="block text-[11px] font-medium text-ink-2">{c.sub}</small>
          </span>
        </div>
      ))}
    </figure>
  );
}
