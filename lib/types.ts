// Types partagés du contenu. Les types propres à une page vivent dans /content/<page>.ts.
import type { IconName } from '@/components/ui/Icon';

export type { IconName };

/** Teinte sémantique utilisée par Tag, IconBox, ProgressBar, PhotoPlaceholder… */
export type Tone = 'green' | 'leaf' | 'water' | 'teal' | 'earth' | 'coral' | 'ink' | 'sand';

/** Texte de titre : entourer un mot de *astérisques* pour l'italique Fraunces en couleur. */
export type RichText = string;

export interface Link {
  label: string;
  href: string;
}

export interface Cta extends Link {
  variant?: 'primary' | 'secondary' | 'ghost' | 'ghostLight' | 'light' | 'dark';
  icon?: IconName;
}

export interface NavItem extends Link {
  /** Libellé court pour la nav mobile */
  short?: string;
  icon?: IconName;
}

export interface Crumb {
  label: string;
  href?: string;
}

export interface PageHeroContent {
  crumbs: Crumb[];
  eyebrow: string;
  title: RichText;
  lead: string;
  ctas?: Cta[];
  tone?: Tone;
}

export interface SectionHeaderContent {
  eyebrow?: string;
  title: RichText;
  lead?: string;
}

export interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  /** 0–100, pour une barre de progression optionnelle */
  progress?: number;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface Photo {
  /** Description de la photo attendue (sert de légende ET d'alt) */
  caption: string;
  tone?: Tone;
  /** Chemin dans /public (ex. « /photos/home-sophie.webp ») */
  src?: string;
}

export interface FooterColumn {
  title: string;
  links: Link[];
}
