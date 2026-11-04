import { Icon, WaterFlow } from '@/components/ui';
import type { SimplifierHero } from '@/content/simplifier';

interface HeroVisualProps {
  visual: SimplifierHero['visual'];
}

/** Visuel du hero : l'IA prépare (eau) → vous décidez (vert), sur fond de rivière. */
export function HeroVisual({ visual }: HeroVisualProps) {
  return (
    <figure className="relative overflow-hidden rounded-xl3 border border-line bg-white/80 p-6 shadow-soft backdrop-blur sm:p-8">
      <figcaption className="text-xs font-extrabold uppercase tracking-[0.12em] text-ink-2">{visual.label}</figcaption>
      <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-5">
        <Column title={visual.ia.title} verbs={visual.ia.verbs} icon="Sparkles" ia />
        <span className="grid h-10 w-10 place-items-center rounded-full bg-signature text-white animate-float">
          <Icon name="ArrowRight" className="h-5 w-5" />
        </span>
        <Column title={visual.you.title} verbs={visual.you.verbs} icon="UserCheck" />
      </div>
      <div className="mt-6 flex items-center gap-2 text-sm font-bold text-water-dk">
        <Icon name="Waves" className="h-4 w-4" />
        {visual.flowLabel}
      </div>
      <WaterFlow className="pointer-events-none absolute inset-x-0 -bottom-2 h-12" opacity={0.35} />
    </figure>
  );
}

function Column({ title, verbs, icon, ia }: { title: string; verbs: string[]; icon: 'Sparkles' | 'UserCheck'; ia?: boolean }) {
  return (
    <div className={ia ? 'rounded-card bg-water-lt p-4' : 'rounded-card bg-leaf-lt p-4'}>
      <p className={ia ? 'flex items-center gap-2 font-extrabold text-water-dk' : 'flex items-center gap-2 font-extrabold text-green-800'}>
        <Icon name={icon} className="h-4 w-4" />
        {title}
      </p>
      <ul className="mt-3 space-y-2">
        {verbs.map((v) => (
          <li key={v} className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-ink">
            {v}
          </li>
        ))}
      </ul>
    </div>
  );
}
