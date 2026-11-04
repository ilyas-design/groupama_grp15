import type { Tone } from '@/lib/types';

/** Fond clair + texte lisible (contraste AA). */
export const toneSoft: Record<Tone, string> = {
  green: 'bg-green-100 text-green-800',
  leaf: 'bg-leaf-lt text-leaf-dk',
  water: 'bg-water-lt text-water-dk',
  teal: 'bg-[#DDF3F1] text-teal-dk',
  earth: 'bg-sand-2 text-earth-dk',
  coral: 'bg-coral-lt text-coral-dk',
  ink: 'bg-ink text-white',
  sand: 'bg-sand-2 text-ink-2',
};

/** Couleur pleine (barres, puces, traits). */
export const toneSolid: Record<Tone, string> = {
  green: 'bg-green-700',
  leaf: 'bg-leaf',
  water: 'bg-water',
  teal: 'bg-teal',
  earth: 'bg-earth',
  coral: 'bg-coral',
  ink: 'bg-ink',
  sand: 'bg-sand-2',
};

/** Dégradés « photo » pour PhotoPlaceholder. */
export const tonePhoto: Record<Tone, string> = {
  green: 'bg-[linear-gradient(160deg,#9CC48A,#3F7F5A_60%,#22513A)]',
  leaf: 'bg-[linear-gradient(160deg,#C4E3A8,#57B54D_55%,#2F7A28)]',
  water: 'bg-[linear-gradient(160deg,#9ED9E3,#2DA9DA_55%,#0E5F6E)]',
  teal: 'bg-[linear-gradient(160deg,#A6E0D8,#15968D_55%,#0B4F4A)]',
  earth: 'bg-[linear-gradient(160deg,#E9C996,#B8925F_55%,#6E5332)]',
  coral: 'bg-[linear-gradient(160deg,#F7B9A6,#E07457_55%,#8F3E2A)]',
  ink: 'bg-[linear-gradient(160deg,#4A5C53,#12291F)]',
  sand: 'bg-[linear-gradient(160deg,#E9DCC6,#B8925F)]',
};
