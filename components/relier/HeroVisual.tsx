import { AnimatedRoots, PhotoPlaceholder, Tag } from '@/components/ui';
import { relierHero } from '@/content/relier';

/** Visuel du hero : photo de relation + racines qui se dessinent + étiquettes flottantes. */
export function HeroVisual() {
  const { photo, chips } = relierHero;
  return (
    <div className="relative">
      <PhotoPlaceholder caption={photo.caption} tone={photo.tone} overlay="roots" heightClass="min-h-[260px] sm:min-h-[320px]" className="rounded-xl3 shadow-soft" />
      <AnimatedRoots className="-mt-6 h-28 sm:h-36" color="var(--earth)" />
      <ul className="absolute right-3 top-3 flex flex-col items-end gap-2 sm:right-4 sm:top-4">
        {chips.map((c, i) => (
          <li key={c.label} className="animate-float" style={{ animationDelay: `${i * 0.6}s` }}>
            <Tag tone={c.tone} icon={c.icon} className="shadow-soft">
              {c.label}
            </Tag>
          </li>
        ))}
      </ul>
    </div>
  );
}
