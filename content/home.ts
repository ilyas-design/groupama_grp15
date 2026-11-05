// Contenu de la page d'accueil (Agent A). Chiffres, noms et témoignages fictifs.
import type { Cta, IconName, SectionHeaderContent, Stat, Testimonial, Tone } from '@/lib/types';
import { site, slogans } from '@/content/site';

/* ---------- Types locaux ---------- */

export type PillarTone = 'water' | 'green' | 'blue' | 'earth';

export interface HeroChip {
  title: string;
  sub: string;
  icon: IconName;
  tone: Tone;
  /** Position dans l'illustration */
  position: 'left' | 'topRight' | 'bottomRight';
}

export interface Pillar {
  num: string;
  meta: string;
  title: string;
  href: string;
  icon: IconName;
  tone: PillarTone;
  points: string[];
}

export interface TalentBranch {
  id: string;
  /** Libellé sur deux lignes dans l'arbre */
  label: [string, string];
  title: string;
  description: string;
  items: { title: string; text: string }[];
  href: string;
}

export interface HomeTestimonial extends Testimonial {
  photo: string;
  photoSrc?: string;
  tone: Tone;
}

export interface CharterRule {
  title: string;
  text: string;
}

/** Entoure de *…* les fragments donnés (italique coloré via RichText). */
const emphasize = (text: string, words: string[]) => words.reduce((t, w) => t.replace(w, `*${w}*`), text);

/* ---------- Contenu ---------- */

export const homeMeta = {
  title: `${site.brand} · ${site.name}`,
  description: site.description,
};

export const hero = {
  eyebrow: 'Programme IA · Groupama × Groupe 15',
  title: emphasize(slogans.main, ['eau', 'cultivons l’intelligence']),
  lead: 'L’IA au service de nos métiers, de nos compétences et de nos sociétaires : pour mieux protéger, aider et assurer.',
  ctas: [
    { label: 'Cultiver mes compétences', href: '/parcours', variant: 'primary', icon: 'ArrowRight' },
    { label: 'Découvrir les 5 actions', href: '/grandir', variant: 'secondary' },
  ] satisfies Cta[],
  trustLabel: 'Nos engagements',
  trust: [
    { label: 'IA responsable', icon: 'ShieldCheck' },
    { label: 'Humain dans la boucle', icon: 'UserCheck' },
    { label: 'RGPD & AI Act', icon: 'Lock' },
  ] satisfies { label: string; icon: IconName }[],
  artLabel:
    'Illustration : un arbre dont les racines forment un réseau, nourri par de l’eau qui circule jusqu’à ses feuilles et ses fleurs.',
  chips: [
    { title: '−40 % de tâches répétitives', sub: 'Simplification admin', icon: 'Waves', tone: 'water', position: 'left' },
    { title: '1 240 talents', sub: 'en parcours IA', icon: 'Sparkles', tone: 'coral', position: 'topRight' },
    { title: 'Sociétaire mieux protégé', sub: 'Prédiction des risques', icon: 'ShieldCheck', tone: 'leaf', position: 'bottomRight' },
  ] satisfies HeroChip[],
};

export const equation = {
  label: 'Notre promesse',
  steps: slogans.promise,
  tones: ['water', 'leaf', 'coral'] satisfies Tone[],
  text: 'Groupama, société mutualiste : protéger, aider, assurer. L’IA renforce chacune de ces missions.',
};

export const pillarsHeader: SectionHeaderContent = {
  eyebrow: 'Nos 4 piliers',
  title: 'Une IA qui pousse *dans le bon sens*',
  lead: 'Quatre terrains d’action, inspirés de la nature, pour faire entrer l’IA dans notre quotidien.',
};

export const pillarMore = 'Explorer';

export const pillars: Pillar[] = [
  { num: '01', meta: 'Le climat', title: 'Anticiper', href: '/anticiper', icon: 'CloudSun', tone: 'water', points: ['Prédiction des risques', 'Lien risque ↔ contrat', 'Entraînement sur cas réels'] },
  { num: '02', meta: 'La forêt', title: 'Grandir', href: '/grandir', icon: 'Trees', tone: 'green', points: ['Copilote métiers', 'Lab IA & entraide', 'Passeport compétences'] },
  { num: '03', meta: 'La rivière', title: 'Simplifier', href: '/simplifier', icon: 'Waves', tone: 'blue', points: ['Synthèse de rapports', 'Tâches répétitives', 'Veille concurrentielle'] },
  { num: '04', meta: 'Les racines', title: 'Relier', href: '/relier', icon: 'Network', tone: 'earth', points: ['Relation sociétaire', 'Mode d’emploi & guide', 'Humain avant tout'] },
];

export const treeHeader: SectionHeaderContent = {
  eyebrow: '5 actions innovantes',
  title: 'L’arbre des *talents*',
  lead: 'Chaque branche est une action concrète. Choisissez une branche pour la découvrir.',
};

export const treeUi = {
  groupLabel: 'Les 5 branches de l’arbre des talents',
  more: 'En savoir plus',
};

export const branches: TalentBranch[] = [
  {
    id: 'copilote', label: ['Copilote', 'métiers'], title: 'Copilote métiers', href: '/grandir',
    description: 'Un assistant IA adapté à chaque métier, intégré aux outils du quotidien.',
    items: [
      { title: 'Métier terrain', text: 'Le conseiller prépare ses visites et ses recommandations.' },
      { title: 'Agence', text: 'Le commercial rédige ses propositions et relances.' },
      { title: 'Gestion sinistre', text: 'Le gestionnaire pré-trie et analyse les dossiers.' },
    ],
  },
  {
    id: 'parcours', label: ['Parcours', 'IA'], title: 'Parcours de domestication à l’IA', href: '/grandir',
    description: 'Un parcours progressif en 4 niveaux, de la découverte à la transmission.',
    items: [
      { title: 'Graine', text: 'Comprendre l’IA et ses règles.' },
      { title: 'Pousse → Arbre', text: 'Pratiquer, puis créer ses propres usages.' },
      { title: 'Forêt', text: 'Accompagner ses collègues.' },
    ],
  },
  {
    id: 'entraide', label: ['Entraide', 'expérimenter'], title: 'Entraide & expérimentation', href: '/grandir',
    description: 'Un espace pour partager prompts, astuces et retours d’expérience entre collègues.',
    items: [
      { title: 'Bibliothèque de prompts', text: 'Notés et commentés par la communauté.' },
      { title: 'Retours d’expérience', text: 'Ce qui marche, ce qui ne marche pas.' },
      { title: 'Binômes', text: 'Un collègue avancé accompagne un débutant.' },
    ],
  },
  {
    id: 'lab', label: ['Lab', 'IA'], title: 'Lab IA', href: '/grandir#lab',
    description: 'Un bac à sable sécurisé pour tester de nouveaux usages, sans risque.',
    items: [
      { title: 'Ateliers', text: 'Formats courts, en visio ou en présentiel.' },
      { title: 'Hackathons', text: 'Résoudre un vrai irritant métier en équipe.' },
      { title: 'Pilotes', text: 'Les meilleures idées passent en production.' },
    ],
  },
  {
    id: 'passeport', label: ['Passeport', 'compétences'], title: 'Passeport compétences', href: '/parcours#passeport',
    description: 'Les compétences IA reconnues, visibles et utiles pour votre évolution.',
    items: [
      { title: 'Badges', text: 'Chaque compétence validée fait fleurir votre arbre.' },
      { title: 'Évolution', text: 'Pris en compte dans les entretiens et mobilités.' },
      { title: 'Mentorat', text: 'Le niveau Forêt ouvre le rôle de mentor.' },
    ],
  },
];

export const statsHeader: SectionHeaderContent = {
  eyebrow: 'Ça pousse déjà',
  title: 'Nos chiffres *en croissance*',
};

export const statsNote = 'Chiffres illustratifs (fictifs).';

export const stats: Stat[] = [
  { value: 1240, label: 'collaborateurs en parcours IA', progress: 62 },
  { value: 38, suffix: ' %', label: 'de temps gagné sur les tâches répétitives', progress: 38 },
  { value: 27, label: 'cas d’usage IA en production', progress: 54 },
  { value: 96, suffix: ' %', label: 'de décisions finales prises par un humain', progress: 96 },
];

export const testimonialsHeader: SectionHeaderContent = {
  eyebrow: 'Témoignages',
  title: 'Ils cultivent *déjà* l’IA',
};

export const testimonials: HomeTestimonial[] = [
  {
    quote: 'Le copilote prépare mes rendez-vous. Je passe enfin plus de temps à écouter.',
    name: 'Sophie L.', role: 'Conseillère · Agence de Rennes', initials: 'SL',
    photo: 'Conseillère en agence avec un sociétaire', photoSrc: '/photos/home-sophie.webp', tone: 'green',
  },
  {
    quote: 'Après la grêle, l’IA a pré-trié 600 dossiers en une nuit. On a pu appeler chaque agriculteur.',
    name: 'Marc B.', role: 'Gestionnaire sinistre · Centre-Manche', initials: 'MB',
    photo: 'Gestionnaire sinistre sur le terrain', photoSrc: '/photos/home-marc.webp', tone: 'earth',
  },
  {
    quote: 'Au Lab IA, j’ai testé, raté, recommencé. Mon passeport est passé au niveau Arbre.',
    name: 'Karim A.', role: 'Commercial · Agence Lyon Sud', initials: 'KA',
    photo: 'Atelier Lab IA en équipe', photoSrc: '/photos/home-karim.webp', tone: 'water',
  },
];

export const charter = {
  eyebrow: 'Gérance & éthique',
  title: 'Notre charte *IA responsable*',
  lead: 'Une IA cultivée avec bon sens : transparente, maîtrisée, et toujours au service de l’humain.',
  cta: { label: 'Lire la charte complète', href: '/charte', variant: 'ghost', icon: 'ArrowRight' } satisfies Cta,
  rules: [
    { title: 'L’humain décide', text: 'L’IA propose, le collaborateur dispose. Toujours.' },
    { title: 'Transparence', text: 'Le sociétaire sait quand une IA intervient dans son dossier.' },
    { title: 'Données protégées', text: 'Hébergement maîtrisé, conformité RGPD et AI Act.' },
    { title: 'Sobriété', text: 'Des usages utiles, mesurés, respectueux de l’environnement.' },
  ] satisfies CharterRule[],
};

export const finalSection = {
  eyebrow: 'Rejoindre le mouvement',
  title: slogans.secondary,
};
