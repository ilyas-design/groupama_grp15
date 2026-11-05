import { Icon, LoopVideo } from '@/components/ui';
import type { HeroChip } from '@/content/anticiper';

interface HeroVisualProps {
  label: string;
  chips: HeroChip[];
}

/** Orage qui avance sur les champs (vidéo en boucle) et deux alertes flottantes. */
export function HeroVisual({ label, chips }: HeroVisualProps) {
  return (
    <figure
      role="img"
      aria-label={label}
      className="relative mx-auto aspect-[1/0.9] w-full max-w-[520px] overflow-hidden rounded-xl3 bg-[linear-gradient(180deg,#9AA4A8_0%,#C9CFC6_55%,#7FA05C_55%,#B89A5E_100%)] shadow-soft"
    >
      <LoopVideo src="/videos/hero-orage.mp4" poster="/videos/hero-orage.webp" position="center 62%" className="absolute inset-0 h-full w-full" />
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
