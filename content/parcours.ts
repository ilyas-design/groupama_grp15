// Contenu de la page « Mon parcours » (/parcours). Données fictives.
import type { Crumb, Cta, IconName, Tone } from '@/lib/types';
import { navUser } from '@/content/site';

const firstName = navUser.name.split(' ')[0];

/* ---------- Types locaux ---------- */

export type LevelId = 'graine' | 'pousse' | 'arbre' | 'foret';

export interface Level {
  id: LevelId;
  label: string;
  icon: IconName;
}

export interface TreeSkill {
  id: string;
  label: string;
  /** Position dans le viewBox 600 × 440 de l'arbre */
  x: number;
  y: number;
  acquired: boolean;
}

export interface PassportBadge {
  id: string;
  label: string;
  icon: IconName;
  tone: Tone;
  locked: boolean;
  /** Condition de déblocage (badges verrouillés) ou date d'obtention */
  detail: string;
}

export interface Course {
  id: string;
  title: string;
  meta: string;
  value: number;
  icon: IconName;
  tone: Tone;
}

export interface SkillGauge {
  id: string;
  label: string;
  value: number;
}

/* ---------- Page ---------- */

export const parcoursMeta = {
  title: 'Mon parcours',
  description:
    'Votre tableau de bord IA : arbre de compétences, progression vers le niveau suivant, passeport compétences et formations en cours.',
};

export const parcoursHero: { crumbs: Crumb[]; eyebrow: string; title: string; lead: string; ctas: Cta[] } = {
  crumbs: [{ label: 'Accueil', href: '/' }, { label: 'Mon parcours' }],
  eyebrow: `Bonjour ${firstName}`,
  title: 'Votre arbre *grandit*.',
  lead: 'Chaque compétence validée fait éclore une fleur. Continuez à cultiver : la forêt n’est plus très loin.',
  ctas: [
    { label: 'Continuer mon parcours', href: '#prochaine-etape', icon: 'ArrowRight' },
    { label: 'Voir mon passeport', href: '#passeport', variant: 'secondary', icon: 'Award' },
  ],
};

export const dashboardLabel = 'Tableau de bord de mon parcours IA';

/* ---------- Arbre personnel ---------- */

export const tree = {
  levelTag: 'Niveau Arbre',
  title: 'Mon arbre de compétences',
  subtitle: 'Chaque fleur = une compétence validée',
  countLabel: 'compétences validées',
  acquiredStatus: 'validée',
  budStatus: 'à cultiver',
  hint: 'Survolez ou sélectionnez une fleur pour découvrir la compétence.',
  legend: { acquired: 'Compétence validée', bud: 'Bourgeon : à cultiver' },
  listLabel: 'Compétences de mon arbre',
  svgLabel: 'Illustration : un arbre dont les racines puisent l’eau, la canopée est parsemée de fleurs.',
  skills: [
    { id: 's1', label: 'Comprendre l’IA et ses limites', x: 275, y: 75, acquired: true },
    { id: 's2', label: 'Choisir un outil validé', x: 330, y: 72, acquired: true },
    { id: 's3', label: 'Formuler un prompt', x: 235, y: 130, acquired: true },
    { id: 's4', label: 'Reformuler une demande', x: 285, y: 125, acquired: true },
    { id: 's5', label: 'Protéger les données', x: 335, y: 120, acquired: true },
    { id: 's6', label: 'Créer ses propres prompts', x: 380, y: 135, acquired: false },
    { id: 's7', label: 'Vérifier une réponse', x: 210, y: 180, acquired: true },
    { id: 's8', label: 'Synthétiser un rapport', x: 260, y: 170, acquired: true },
    { id: 's9', label: 'Rédiger un mail type', x: 310, y: 165, acquired: true },
    { id: 's10', label: 'Lire une alerte prédictive', x: 360, y: 175, acquired: true },
    { id: 's11', label: 'Animer un atelier IA', x: 405, y: 185, acquired: false },
    { id: 's12', label: 'Préparer un compte rendu', x: 230, y: 225, acquired: true },
    { id: 's13', label: 'Repérer une erreur de l’IA', x: 280, y: 212, acquired: true },
    { id: 's14', label: 'Expliquer l’IA au sociétaire', x: 330, y: 210, acquired: true },
    { id: 's15', label: 'Accompagner un collègue', x: 375, y: 225, acquired: false },
  ] satisfies TreeSkill[],
};

/* ---------- Progression ---------- */

export const levels: Level[] = [
  { id: 'graine', label: 'Graine', icon: 'Sprout' },
  { id: 'pousse', label: 'Pousse', icon: 'Leaf' },
  { id: 'arbre', label: 'Arbre', icon: 'TreeDeciduous' },
  { id: 'foret', label: 'Forêt', icon: 'Trees' },
];

export const progress = {
  current: 'arbre' as LevelId,
  value: 64,
  toLabel: 'vers Forêt',
  ringLabel: 'Progression vers le niveau Forêt',
  levelsLabel: 'Les 4 niveaux du parcours',
  states: { done: 'validé', current: 'en cours', next: 'à venir' },
};

export const nextStep = {
  id: 'prochaine-etape',
  title: 'Prochaine étape',
  text: 'Créer et partager 3 prompts utiles à votre équipe.',
  tag: '2 / 3 réalisés',
  cta: { label: 'Partager un prompt', href: '/grandir', icon: 'ArrowRight' } satisfies Cta,
};

/* ---------- Passeport ---------- */

export const passport = {
  id: 'passeport',
  title: 'Passeport compétences',
  lead: '5 badges obtenus sur 8',
  earnedLabel: 'Obtenu',
  lockedLabel: 'Verrouillé',
  badges: [
    { id: 'b1', label: 'Bases IA', icon: 'Sprout', tone: 'leaf', locked: false, detail: 'Obtenu en septembre' },
    { id: 'b2', label: 'Prompt', icon: 'MessageCircle', tone: 'water', locked: false, detail: 'Obtenu en septembre' },
    { id: 'b3', label: 'Éthique', icon: 'ShieldCheck', tone: 'coral', locked: false, detail: 'Obtenu en octobre' },
    { id: 'b4', label: 'Vérification', icon: 'FileSearch', tone: 'teal', locked: false, detail: 'Obtenu en octobre' },
    { id: 'b5', label: 'Synthèse', icon: 'FileText', tone: 'earth', locked: false, detail: 'Obtenu en octobre' },
    { id: 'b6', label: 'Anticipation', icon: 'CloudSun', tone: 'sand', locked: true, detail: 'Terminer « Cas réel : grêle sur vergers »' },
    { id: 'b7', label: 'Créateur', icon: 'Lightbulb', tone: 'sand', locked: true, detail: 'Partager 3 prompts utiles' },
    { id: 'b8', label: 'Mentor', icon: 'Trees', tone: 'sand', locked: true, detail: 'Atteindre le niveau Forêt' },
  ] satisfies PassportBadge[],
};

/* ---------- Formations & compétences ---------- */

export const courses = {
  title: 'Mes formations',
  doneLabel: 'Terminé',
  items: [
    { id: 'c1', title: 'Copilote conseiller : niveau avancé', meta: '4 modules · 45 min', value: 75, icon: 'TreeDeciduous', tone: 'leaf' },
    { id: 'c2', title: 'Cas réel : grêle sur vergers', meta: '18 min', value: 30, icon: 'CloudHail', tone: 'water' },
    { id: 'c3', title: 'Parler de l’IA au sociétaire', meta: '12 min', value: 100, icon: 'Handshake', tone: 'earth' },
  ] satisfies Course[],
};

export const skillGauges = {
  title: 'Mes compétences',
  valueSuffix: ' / 100',
  items: [
    { id: 'g1', label: 'Formuler un prompt', value: 85 },
    { id: 'g2', label: 'Vérifier une réponse', value: 70 },
    { id: 'g3', label: 'Analyse de risques', value: 55 },
    { id: 'g4', label: 'Synthèse de documents', value: 80 },
    { id: 'g5', label: 'Éthique & données', value: 90 },
    { id: 'g6', label: 'Transmettre', value: 35 },
  ] satisfies SkillGauge[],
};
