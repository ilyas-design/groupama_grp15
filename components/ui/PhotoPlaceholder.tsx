import type { Tone } from '@/lib/types';
import { tonePhoto } from './tones';
import { cn } from './cn';

interface PhotoPlaceholderProps {
  /** Description de la photo attendue — sert de légende ET de texte alternatif */
  caption: string;
  tone?: Tone;
  className?: string;
  /** Habillage par-dessus la « photo » */
  overlay?: 'water' | 'roots' | 'none';
  /** Hauteur minimale Tailwind */
  heightClass?: string;
}

/** Emplacement photo : dégradé + légende. À remplacer par next/image quand les photos existent. */
export function PhotoPlaceholder({ caption, tone = 'green', className, overlay = 'water', heightClass = 'min-h-[220px]' }: PhotoPlaceholderProps) {
  return (
    <figure role="img" aria-label={caption} className={cn('relative flex items-end overflow-hidden rounded-card p-3.5', heightClass, tonePhoto[tone], className)}>
      <span aria-hidden className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,.07)_0_2px,transparent_2px_14px)]" />
      {overlay !== 'none' && (
        <svg aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 w-full opacity-40" viewBox="0 0 400 120" preserveAspectRatio="none" fill="none" stroke="white" strokeWidth="1.5">
          {overlay === 'water' ? (
            <>
              <path d="M0 60 Q50 40 100 60 T200 60 T300 60 T400 60" />
              <path d="M0 85 Q50 65 100 85 T200 85 T300 85 T400 85" className="flow-dash" />
            </>
          ) : (
            <>
              <path d="M200 0 C200 40 150 60 90 120" />
              <path d="M200 0 C205 50 260 70 330 120" />
              <path d="M200 20 C190 60 200 90 200 120" className="flow-dash" />
            </>
          )}
        </svg>
      )}
      <figcaption aria-hidden className="relative rounded-lg bg-black/45 px-2.5 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
        {caption}
      </figcaption>
    </figure>
  );
}
