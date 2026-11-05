import Image from 'next/image';
import type { Tone } from '@/lib/types';
import { tonePhoto } from './tones';
import { cn } from './cn';

interface PhotoPlaceholderProps {
  /** Description de la photo — sert de texte alternatif (et de légende tant qu'il n'y a pas d'image) */
  caption: string;
  tone?: Tone;
  /** Chemin de la photo dans /public — sans lui, on affiche l'emplacement dégradé */
  src?: string;
  className?: string;
  /** Habillage par-dessus la « photo » (emplacement seulement) */
  overlay?: 'water' | 'roots' | 'none';
  /** Hauteur minimale Tailwind (emplacement seulement : une photo garde ses proportions) */
  heightClass?: string;
}

/** Photo entière, à ses proportions (jamais recadrée) ; à défaut, emplacement : dégradé + légende. */
export function PhotoPlaceholder({ caption, tone = 'green', src, className, overlay = 'water', heightClass = 'min-h-[220px]' }: PhotoPlaceholderProps) {
  if (src) {
    // width/height ne servent qu'à réserver la place avant chargement (3:2) ; ensuite le navigateur suit le ratio réel du fichier
    return (
      <figure className={cn('overflow-hidden rounded-card', tonePhoto[tone], className)}>
        <Image src={src} alt={caption} width={1168} height={784} sizes="(min-width: 1024px) 40vw, 100vw" className="block h-auto w-full" />
      </figure>
    );
  }

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
