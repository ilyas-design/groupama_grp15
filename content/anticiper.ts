// Contenu de la page « Anticiper » (pilier 01 · le climat). Données fictives.
import type { Crumb, Cta, IconName, SectionHeaderContent, Tone } from '@/lib/types';

/* ---------- Types locaux ---------- */

export type RiskType = 'hail' | 'flood' | 'drought';
export type AlertLevel = 'high' | 'medium' | 'low';
export type CaseCategory = 'climate' | 'agri' | 'home' | 'auto' | 'pro';

export interface HeroChip {
  icon: IconName;
  title: string;
  sub: string;
}

export interface RiskTypeDef {
  id: RiskType;
  label: string;
  icon: IconName;
  tone: Tone;
  /** Description du motif pour la légende (l'info ne passe pas que par la couleur) */
  patternLabel: string;
}

export interface RiskAlert {
  id: string;
  risk: RiskType;
  title: string;
  zone: string;
  /** Libellé court affiché sur la carte */
  mapLabel: string;
  horizon: string;
  detail: string;
  level: AlertLevel;
  members: number;
  /** Position sur la carte (viewBox 600 × 580) */
  x: number;
  y: number;
  r: number;
}

export interface LinkRow {
  label: string;
  value: string;
  emphasis?: 'risk' | 'ok';
}

export interface LinkSide {
  tag: string;
  tagIcon: IconName;
  title: string;
  rows: LinkRow[];
}

export interface TrainingStep {
  title: string;
  text: string;
  icon: IconName;
}

export interface CaseFilter {
  id: CaseCategory | 'all';
  label: string;
}

export interface CaseStudy {
  id: string;
  category: CaseCategory;
  title: string;
  summary: string;
  duration: string;
  date: string;
  region: string;
}

/* ---------- Métadonnées ---------- */

export const anticiperMeta = {
  title: 'Anticiper · Lire le ciel avant l’orage',
  description:
    'Carte prédictive des risques climatiques, contrats ajustés avec le conseiller et bibliothèque de cas réels pour mieux protéger les sociétaires Groupama.',
};

/* ---------- Hero ---------- */

export const anticiperHero = {
  crumbs: [{ label: 'Accueil', href: '/' }, { label: 'Anticiper' }] satisfies Crumb[],
  eyebrow: 'Pilier 01 · Le climat',
  title: 'Lire le ciel *avant l’orage*.',
  lead: 'Prédire les risques, ajuster les contrats et s’entraîner sur des cas réels : l’IA voit venir, le conseiller décide, le sociétaire est protégé plus tôt.',
  ctas: [
    { label: 'Voir la carte des risques', href: '#carte', icon: 'Map' },
    { label: 'Explorer les cas réels', href: '#cas', variant: 'secondary', icon: 'BookOpen' },
  ] satisfies Cta[],
  badges: [
    { icon: 'CloudSun', label: 'Prévisions jusqu’à J+30' },
    { icon: 'UserCheck', label: 'Validé par le conseiller' },
    { icon: 'ShieldCheck', label: 'Cas anonymisés' },
  ] satisfies { icon: IconName; label: string }[],
  visualLabel: 'Illustration : un nuage d’orage au-dessus de champs, avec deux alertes prédictives.',
  chips: [
    { icon: 'CloudHail', title: 'Grêle · J+2', sub: 'Calvados · Orne' },
    { icon: 'Bell', title: '312 sociétaires', sub: 'à prévenir avant l’épisode' },
  ] satisfies HeroChip[],
};

/* ---------- Carte prédictive ---------- */

export const riskSection: SectionHeaderContent = {
  eyebrow: 'Prédiction',
  title: 'Voir venir le risque, *zone par zone*.',
  lead: 'L’IA croise météo, historique de sinistres et contrats pour repérer les sociétaires exposés quelques jours avant l’épisode.',
};

export const riskMap = {
  mapTitle: 'Carte prédictive des risques',
  updated: 'Mis à jour il y a 12 min',
  mapAlt: 'Carte stylisée de la France montrant les zones de risque prévues.',
  filtersLabel: 'Filtrer par type de risque',
  allLabel: 'Tous les risques',
  legendTitle: 'Légende',
  pulseLegend: 'Point pulsant : épisode en approche',
  alertsTitle: 'Alertes prédictives',
  membersSuffix: 'sociétaires concernés',
  levels: { high: 'Élevé', medium: 'Moyen', low: 'Modéré' } satisfies Record<AlertLevel, string>,
  levelPrefix: 'Niveau',
  cta: 'Prévenir les sociétaires concernés',
  /** {n} = nombre de sociétaires */
  confirm: '{n} sociétaires seront prévenus après validation du conseiller.',
  confirmSub: 'Un message personnalisé est prêt dans votre file de validation. Rien ne part sans vous.',
  cancel: 'Annuler',
  empty: 'Aucune alerte pour ce filtre.',
};

export const riskTypes: RiskTypeDef[] = [
  { id: 'hail', label: 'Grêle', icon: 'CloudHail', tone: 'coral', patternLabel: 'motif à points' },
  { id: 'flood', label: 'Inondation', icon: 'Waves', tone: 'water', patternLabel: 'motif à vagues' },
  { id: 'drought', label: 'Sécheresse', icon: 'Sun', tone: 'earth', patternLabel: 'motif hachuré' },
];

export const riskAlerts: RiskAlert[] = [
  { id: 'a1', risk: 'hail', title: 'Épisode de grêle', zone: 'Calvados · Orne', mapLabel: 'Normandie', horizon: 'J+2', detail: 'Vergers et serres exposés', level: 'high', members: 186, x: 222, y: 158, r: 46 },
  { id: 'a4', risk: 'flood', title: 'Épisode méditerranéen', zone: 'Gard · Hérault', mapLabel: 'Gard', horizon: 'J+1', detail: 'Habitations en zone inondable', level: 'high', members: 238, x: 392, y: 462, r: 38 },
  { id: 'a3', risk: 'flood', title: 'Crue de la Loire', zone: 'Loiret · Indre-et-Loire', mapLabel: 'Val de Loire', horizon: 'J+4', detail: 'Maisons et commerces en bord de rivière', level: 'medium', members: 420, x: 262, y: 282, r: 42 },
  { id: 'a2', risk: 'hail', title: 'Orages de grêle', zone: 'Gers · Lot-et-Garonne', mapLabel: 'Gascogne', horizon: 'J+3', detail: 'Vignes et cultures de printemps', level: 'medium', members: 126, x: 232, y: 440, r: 40 },
  { id: 'a6', risk: 'drought', title: 'Sécheresse des sols', zone: 'Vaucluse · Drôme', mapLabel: 'Provence', horizon: '21 jours', detail: 'Retrait-gonflement des argiles à surveiller', level: 'medium', members: 97, x: 468, y: 420, r: 36 },
  { id: 'a5', risk: 'drought', title: 'Déficit de pluie', zone: 'Beauce · Eure-et-Loir', mapLabel: 'Beauce', horizon: '30 jours', detail: 'Contrats récolte à réviser', level: 'low', members: 154, x: 322, y: 205, r: 38 },
];

/* ---------- Risque ↔ contrat ---------- */

export const linkSection: SectionHeaderContent = {
  eyebrow: 'Risque ↔ contrat',
  title: 'Le risque et le contrat, *enfin reliés*.',
  lead: 'L’IA rapproche ce qu’elle détecte de ce que prévoit le contrat. Le conseiller garde le dernier mot.',
};

export const linkSchema = {
  risk: {
    tag: 'Risque détecté',
    tagIcon: 'AlertTriangle',
    title: 'Exploitation Martin · Calvados',
    rows: [
      { label: 'Exposition grêle', value: 'Élevée', emphasis: 'risk' },
      { label: 'Historique sinistres', value: '2 en 5 ans' },
      { label: 'Culture', value: 'Pommiers' },
    ],
  } satisfies LinkSide,
  node: { title: 'IA', sub: 'Analyse croisée' },
  contract: {
    tag: 'Recommandation contrat',
    tagIcon: 'FileCheck',
    title: 'Ajustement suggéré',
    rows: [
      { label: 'Option filets anti-grêle', value: '+ Prévention', emphasis: 'ok' },
      { label: 'Garantie récolte', value: 'À renforcer' },
      { label: 'Validation', value: 'Conseiller' },
    ],
  } satisfies LinkSide,
  validated: 'Validée par le conseiller',
  flowLabel: 'Les données circulent de la fiche risque vers l’IA, puis vers la recommandation.',
};

/* ---------- Entraînement ---------- */

export const trainingSection: SectionHeaderContent = {
  eyebrow: 'Entraînement',
  title: 'Apprendre des *cas réels*.',
  lead: 'Capturer, analyser, classer, transmettre : chaque sinistre devient un cours.',
};

export const trainingSteps: TrainingStep[] = [
  { title: 'Capture de cas réels', text: 'Les sinistres vécus sont collectés et anonymisés.', icon: 'FileSearch' },
  { title: 'Analyse', text: 'L’IA extrait causes, coûts et signaux faibles.', icon: 'Sparkles' },
  { title: 'Typologie', text: 'Classement par type de risque et par métier.', icon: 'ListChecks' },
  { title: 'Cours', text: 'Transformés en modules d’entraînement courts.', icon: 'GraduationCap' },
];

/* ---------- Bibliothèque de cas ---------- */

export const casesSection: SectionHeaderContent = {
  eyebrow: 'Bibliothèque',
  title: 'Des cas réels, *prêts à l’emploi*.',
  lead: 'Des situations vécues par nos équipes, anonymisées et transformées en modules de 10 à 20 minutes.',
};

export const casesUi = {
  filtersLabel: 'Filtrer les cas par catégorie',
  /** {n} = nombre de cas */
  resultsOne: '{n} cas affiché',
  resultsMany: '{n} cas affichés',
  durationLabel: 'Durée',
  regionLabel: 'Région',
};

export const caseFilters: CaseFilter[] = [
  { id: 'all', label: 'Tous' },
  { id: 'climate', label: 'Climatique' },
  { id: 'agri', label: 'Agricole' },
  { id: 'home', label: 'Habitation' },
  { id: 'auto', label: 'Auto' },
  { id: 'pro', label: 'Pro' },
];

export const caseCategoryTone: Record<CaseCategory, Tone> = {
  climate: 'water',
  agri: 'leaf',
  home: 'coral',
  auto: 'earth',
  pro: 'teal',
};

export const cases: CaseStudy[] = [
  { id: 'c1', category: 'climate', title: 'Inondation en zone périurbaine', summary: 'Reconnaître les signaux d’alerte et accompagner le sociétaire dans les 48 premières heures.', duration: '12 min', date: 'Mars 2026', region: 'Hauts-de-France' },
  { id: 'c2', category: 'agri', title: 'Grêle sur vergers : estimer vite', summary: 'Utiliser l’analyse d’images pour pré-évaluer les dégâts sur récolte, puis confirmer sur place.', duration: '18 min', date: 'Juin 2026', region: 'Normandie' },
  { id: 'c3', category: 'home', title: 'Dégât des eaux en copropriété', summary: 'Identifier les responsabilités et la bonne garantie grâce au copilote, sans perdre le fil humain.', duration: '10 min', date: 'Janv. 2026', region: 'Île-de-France' },
  { id: 'c4', category: 'climate', title: 'Tempête et toitures arrachées', summary: 'Prioriser les visites d’expert quand 300 déclarations arrivent la même nuit.', duration: '15 min', date: 'Nov. 2025', region: 'Bretagne' },
  { id: 'c5', category: 'agri', title: 'Sécheresse et rendement de blé', summary: 'Lire les indices satellites pour expliquer une indemnisation récolte au sociétaire.', duration: '20 min', date: 'Sept. 2025', region: 'Centre-Val de Loire' },
  { id: 'c6', category: 'auto', title: 'Grêle sur un parking de concession', summary: 'Gérer un sinistre de masse : 80 véhicules, un seul interlocuteur, des délais tenus.', duration: '14 min', date: 'Mai 2026', region: 'Occitanie' },
  { id: 'c7', category: 'home', title: 'Fissures après un été sec', summary: 'Repérer le retrait-gonflement des argiles et orienter vers la bonne démarche.', duration: '16 min', date: 'Oct. 2025', region: 'Nouvelle-Aquitaine' },
  { id: 'c8', category: 'pro', title: 'Boulangerie à l’arrêt après un orage', summary: 'Chiffrer la perte d’exploitation et proposer une reprise rapide de l’activité.', duration: '13 min', date: 'Juil. 2026', region: 'Grand Est' },
  { id: 'c9', category: 'auto', title: 'Véhicule emporté par une crue', summary: 'Distinguer catastrophe naturelle et garantie dommages, expliquer simplement.', duration: '11 min', date: 'Avr. 2026', region: 'Provence-Alpes-Côte d’Azur' },
  { id: 'c10', category: 'pro', title: 'Entrepôt agricole et chambre froide', summary: 'Anticiper une coupure d’électricité liée à la canicule et ses conséquences sur les stocks.', duration: '17 min', date: 'Août 2026', region: 'Auvergne-Rhône-Alpes' },
];

/* ---------- CTA de fin ---------- */

export const anticiperFinal = {
  eyebrow: 'Et maintenant ?',
  title: 'Anticiper, ça *s’apprend*.',
  lead: 'Passez de la lecture des risques à la pratique : formez-vous avec les 5 actions et suivez vos progrès dans votre parcours.',
  ctas: [
    { label: 'Découvrir les 5 actions', href: '/grandir', variant: 'light', icon: 'Sprout' },
    { label: 'Voir mon parcours', href: '/parcours', icon: 'ArrowRight' },
  ] satisfies Cta[],
};

/* ---------- L'IA prédictive, à trois échelles ---------- */

export interface PredictiveScale {
  id: string;
  icon: IconName;
  tone: Tone;
  scale: string;
  title: string;
  goal: string;
  aiDoesLabel: string;
  aiDoes: string[];
  outcomesLabel: string;
  outcomes: string[];
  examples?: { label: string; text: string }[];
}

export const predictiveSection: SectionHeaderContent = {
  eyebrow: 'IA prédictive',
  title: 'Anticiper à *trois échelles*',
  lead: 'Du sociétaire au Groupe tout entier, l’IA aide à voir venir. Les modèles sont contrôlés en permanence, et la décision finale reste toujours humaine.',
};

export const predictiveUi = { goalLabel: 'Objectif', examplesLabel: 'Exemples' };

export const predictiveScales: PredictiveScale[] = [
  {
    id: 'societaire',
    icon: 'HandHeart',
    tone: 'green',
    scale: 'Le sociétaire',
    title: 'Prévenir avant le sinistre',
    goal: 'Anticiper les besoins de chaque sociétaire avant qu’un sinistre ne survienne.',
    aiDoesLabel: 'Ce que fait l’IA',
    aiDoes: [
      'Croise contrats, historique de sinistres et données climatiques',
      'Repère les sociétaires les plus exposés',
      'Détecte les risques à venir, zone par zone',
    ],
    outcomesLabel: 'Ce que ça change',
    outcomes: ['Des conseils personnalisés', 'Une prévention renforcée', 'Des garanties ajustées avant le sinistre'],
    examples: [
      { label: 'Habitation', text: 'risque de fissures lié à la sécheresse' },
      { label: 'Agriculture', text: 'épisodes de gel ou de grêle' },
      { label: 'Entreprises', text: 'exposition au risque cyber et recommandations adaptées' },
    ],
  },
  {
    id: 'portefeuille',
    icon: 'BarChart3',
    tone: 'water',
    scale: 'Le portefeuille',
    title: 'Piloter le risque du Groupe',
    goal: 'Piloter le risque à l’échelle de tout le portefeuille Groupama.',
    aiDoesLabel: 'Ce que fait l’IA',
    aiDoes: [
      'Cartographie les zones où la sinistralité va augmenter',
      'Estime le coût des sinistres à venir',
      'Repère les contrats sous-tarifés ou mal calibrés',
    ],
    outcomesLabel: 'Ce que ça change',
    outcomes: ['Une réassurance mieux ajustée', 'Des budgets mieux anticipés', 'Un meilleur équilibre sinistres / primes'],
  },
  {
    id: 'strategie',
    icon: 'Compass',
    tone: 'earth',
    scale: 'La stratégie',
    title: 'Préparer les transformations',
    goal: 'Préparer l’entreprise aux transformations qui arrivent.',
    aiDoesLabel: 'Ce que l’IA repère',
    aiDoes: [
      'Les risques émergents',
      'Les nouvelles attentes des sociétaires',
      'Les compétences critiques de demain',
      'Les territoires les plus exposés',
    ],
    outcomesLabel: 'Les décisions qu’elle éclaire',
    outcomes: [
      'Où recruter',
      'Quels investissements prioriser',
      'Comment faire évoluer l’offre',
      'Quelles expertises développer',
    ],
  },
];

export const vision2030 = {
  eyebrow: 'Vision 2030',
  quote: 'Passer d’une assurance qui *indemnise* à une assurance qui *anticipe*.',
  text: 'Tout en faisant grandir les compétences des collaborateurs et en accompagnant les sociétaires dans la durée.',
  cta: { label: 'Voir le projet CAP IA', href: '/projet', icon: 'ArrowRight' } as Cta,
};
