'use client';

import { useEffect, useRef } from 'react';
import { cn } from './cn';
import { useSafeReducedMotion } from './useSafeReducedMotion';

interface LoopVideoProps {
  /** Vidéo MP4 dans /public (muette, conçue pour boucler) */
  src: string;
  /** Première image : affichée pendant le chargement et si l'animation est réduite */
  poster: string;
  className?: string;
  /** Cadrage CSS object-position */
  position?: string;
}

/** Vidéo d'ambiance décorative : muette, en boucle, en pause hors écran ; image fixe si « réduire les animations ». */
export function LoopVideo({ src, poster, className, position }: LoopVideoProps) {
  const reduce = useSafeReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || reduce) return;
    // React ne pose pas l'attribut muted au rendu serveur : sans lui, certains navigateurs bloquent la lecture auto
    video.muted = true;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduce]);

  const style = position ? { objectPosition: position } : undefined;

  if (reduce) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={poster} alt="" aria-hidden className={cn('object-cover', className)} style={style} />;
  }
  return <video ref={ref} src={src} poster={poster} muted loop playsInline preload="metadata" aria-hidden className={cn('object-cover', className)} style={style} />;
}
