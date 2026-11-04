// Contenu de la page /grandir — « les 5 actions innovantes ».
// Noms, chiffres, dates et témoignages : fictifs.
import type { Crumb, Cta, IconName, Photo, SectionHeaderContent, Tone } from '@/lib/types';

/* ---------- Types locaux ---------- */

export interface ActionLink {
  id: string;
  number: number;
  label: string;
  icon: IconName;
}

export interface Copilot {
  id: string;
  role: string;
  tag: { label: string; tone: Tone };
  icon: IconName;
  photo: Photo;
  summary: string;
  missions: string[];
  prompt: string;
}

export type LevelState = 'done' | 'current' | 'upcoming';
export type LevelPlant = 'seed' | 'sprout' | 'tree' | 'forest';

export interface GrowthLevel {
  id: string;
  plant: LevelPlant;
  name: string;
  description: string;
  state: LevelState;
  /** 0–100, pour le niveau en cours */
  progress?: number;
  /** Niveau de la Skill Academy, affiché au-dessus du nom */
  stage?: string;
}

export interface SkillPrediction {
  id: string;
  icon: IconName;
  tone: Tone;
  title: string;
  goal: string;
  items: string[];
  /** Exemples de trajectoires « avant → après » */
  paths?: { from: string; to: string }[];
  result: string;
}

export interface JobSupport {
  id: string;
  icon: IconName;
  tone: Tone;
  role: string;
  items: string[];
}

export type PostType = 'prompt' | 'rex' | 'question';

export interface Post {
  id: string;
  type: PostType;
  title: string;
  excerpt: string;
  author: string;
  initials: string;
  role: string;
  when: string;
  topic: string;
  avatarTone: Tone;
  useful: number;
}

export type EventFormat = 'atelier' | 'hackathon' | 'demo';

export interface LabEvent {
  id: string;
  /** ISO, pour <time dateTime> */
  dateTime: string;
  day: string;
  month: string;
  format: EventFormat;
  title: string;
  location: string;
  duration: string;
  /** null = pas de limite chiffrée (voir `note`) ; 0 = complet */
  places: number | null;
  note?: string;
  level: { label: string; tone: Tone };
}

/* ---------- Page ---------- */

export const grandirMeta = {
  title: 'Grandir — les 5 actions de CAP IA',
  description:
    'Copilote Groupama, Skill Academy, Binôme 360, Lab IA et Passeport compétences : les 5 actions du projet CAP IA pour grandir avec l’IA chez Groupama.',
};

export const grandirHero = {
  crumbs: [{ label: 'Accueil', href: '/' }, { label: 'Grandir' }] as Crumb[],
  eyebrow: 'Pilier 02 · La forêt',
  title: 'Une forêt se construit *arbre par arbre.*',
  lead: 'CAP IA, ce sont 5 actions concrètes pour que chacun grandisse avec l’IA, quel que soit son métier. L’outil allège le quotidien ; l’écoute, l’empathie, le conseil et la décision restent humains.',
  projectLink: { label: 'Découvrir le projet CAP IA', href: '/projet', icon: 'ArrowRight' } as Cta,
  tocLabel: 'Sommaire des 5 actions',
};

export const actions: ActionLink[] = [
  { id: 'copilote', number: 1, label: 'Copilote Groupama', icon: 'Bot' },
  { id: 'parcours-ia', number: 2, label: 'Skill Academy', icon: 'GraduationCap' },
  { id: 'entraide', number: 3, label: 'Binôme 360', icon: 'Handshake' },
  { id: 'lab', number: 4, label: 'Lab IA', icon: 'Lightbulb' },
  { id: 'passeport', number: 5, label: 'Passeport compétences', icon: 'Award' },
];

/* ---------- Action 1 · Copilote métiers ---------- */

export const copilotSection: SectionHeaderContent & { missionsLabel: string; promptLabel: string } = {
  eyebrow: 'Action 1 · Le copilote Groupama',
  title: 'Un copilote sécurisé pour *chaque métier*',
  lead: 'Un assistant IA protégé et réglé sur votre métier : gestion des sinistres, conseil, vente, RH, management. Il prépare le travail du quotidien. La décision reste la vôtre.',
  missionsLabel: 'Ce qu’il fait pour vous',
  promptLabel: 'Exemple de prompt',
};

export const copyUi = {
  copy: 'Copier le prompt',
  copied: 'Copié',
  error: 'Copie impossible',
  announceCopied: 'Prompt copié dans le presse-papiers.',
  announceError: 'La copie a échoué. Sélectionnez le texte pour le copier.',
};

export const copilots: Copilot[] = [
  {
    id: 'conseiller',
    role: 'Conseiller terrain',
    tag: { label: 'Métier terrain', tone: 'leaf' },
    icon: 'Compass',
    photo: { caption: 'Conseiller sur le terrain avec un sociétaire agriculteur', tone: 'green' },
    summary: 'Arrive en rendez-vous avec l’essentiel en tête.',
    missions: [
      'Prépare les rendez-vous',
      'Résume l’historique du sociétaire',
      'Propose les garanties adaptées',
    ],
    prompt: 'Prépare mon RDV avec M. Durand : contrats, sinistres, besoins probables.',
  },
  {
    id: 'commercial',
    role: 'Commercial en agence',
    tag: { label: 'Agence', tone: 'earth' },
    icon: 'Briefcase',
    photo: { caption: 'Commerciale en agence accueillant un jeune couple', tone: 'earth' },
    summary: 'Gagne du temps sur l’écrit, en garde pour l’écoute.',
    missions: [
      'Rédige les propositions',
      'Compare les offres',
      'Prépare les relances personnalisées',
    ],
    prompt: 'Rédige une proposition habitation pour un jeune couple primo-accédant.',
  },
  {
    id: 'gestionnaire',
    role: 'Gestionnaire sinistre',
    tag: { label: 'Gestion', tone: 'water' },
    icon: 'FileSearch',
    photo: { caption: 'Gestionnaire sinistre étudiant un dossier à son bureau', tone: 'water' },
    summary: 'Traite plus vite les dossiers simples, mieux les complexes.',
    missions: [
      'Pré-trie les dossiers',
      'Analyse les photos de sinistre',
      'Détecte les pièces manquantes',
    ],
    prompt: 'Liste les dossiers grêle incomplets et les pièces à demander.',
  },
  {
    id: 'rh',
    role: 'Ressources humaines',
    tag: { label: 'RH', tone: 'coral' },
    icon: 'Users',
    photo: { caption: 'Chargée RH en entretien de développement avec un collaborateur', tone: 'coral' },
    summary: 'Prépare les entretiens, garde du temps pour l’échange.',
    missions: [
      'Prépare les entretiens annuels',
      'Repère les formations utiles',
      'Rédige les fiches de poste',
    ],
    prompt: 'À partir de cette fiche de poste, propose 3 formations pour monter en compétence sur la data.',
  },
  {
    id: 'manager',
    role: 'Manager d’équipe',
    tag: { label: 'Management', tone: 'teal' },
    icon: 'Target',
    photo: { caption: 'Manageuse animant un point d’équipe autour d’un tableau', tone: 'teal' },
    summary: 'Pilote l’activité sans se noyer dans les tableaux.',
    missions: [
      'Synthétise l’activité de l’équipe',
      'Prépare les points d’équipe',
      'Repère les besoins d’accompagnement',
    ],
    prompt: 'Résume l’activité de l’équipe cette semaine en 5 points et les sujets à aborder lundi.',
  },
];

/* ---------- Action 2 · Parcours de domestication ---------- */

export const growthSection: SectionHeaderContent & { states: Record<LevelState, string>; progressLabel: string } = {
  eyebrow: 'Action 2 · La Skill Academy',
  title: 'Apprivoiser l’IA, *niveau par niveau*',
  lead: 'Une formation interne en trois niveaux : découverte, utilisation professionnelle, maîtrise avancée. Puis une quatrième étape, la forêt : transmettre à son tour.',
  states: { done: 'Validé', current: 'En cours', upcoming: 'À venir' },
  progressLabel: 'Progression du niveau',
};

export const growthLevels: GrowthLevel[] = [
  { id: 'graine', plant: 'seed', stage: 'Niveau 1 · Découverte', name: 'Graine', description: 'Comprendre ce qu’est l’IA, ce qu’elle sait faire, ses limites et ses règles.', state: 'done' },
  { id: 'pousse', plant: 'sprout', stage: 'Niveau 2 · Usage pro', name: 'Pousse', description: 'Utiliser le copilote dans son métier, chaque jour, en vérifiant ses réponses.', state: 'done' },
  { id: 'arbre', plant: 'tree', stage: 'Niveau 3 · Maîtrise avancée', name: 'Arbre', description: 'Créer ses propres usages et prompts, proposer des idées au Lab IA.', state: 'current', progress: 64 },
  { id: 'foret', plant: 'forest', stage: 'Transmettre', name: 'Forêt', description: 'Devenir référent IA de son équipe et former ses collègues.', state: 'upcoming' },
];

/* ---------- Action 3 · Entraide ---------- */

export const entraideSection = {
  eyebrow: 'Action 3 · Le Binôme 360',
  title: 'Apprendre *dans les deux sens*',
  lead: 'Un salarié expérimenté et un collègue à l’aise avec le numérique font équipe. L’un transmet le métier, l’autre les outils, comme les arbres d’une forêt partagent leurs ressources par leurs racines. Leurs trouvailles nourrissent ce fil de partage.',
  pairLabel: 'Ce que chacun apporte au binôme',
  pair: [
    { icon: 'Award', label: 'Le savoir-faire métier', text: 'Expérience terrain, relation sociétaire, cas complexes.' },
    { icon: 'Sparkles', label: 'L’aisance numérique', text: 'Prompts, outils, réflexes de vérification.' },
  ] as { icon: IconName; label: string; text: string }[],
  filterLabel: 'Filtrer le fil de partage',
  filters: [
    { id: 'all', label: 'Tout' },
    { id: 'prompt', label: 'Prompts' },
    { id: 'rex', label: 'Retours d’expérience' },
    { id: 'question', label: 'Questions' },
  ] as { id: PostType | 'all'; label: string }[],
  types: {
    prompt: { label: 'Prompt', tone: 'leaf' },
    rex: { label: 'REX', tone: 'water' },
    question: { label: 'Question', tone: 'coral' },
  } as Record<PostType, { label: string; tone: Tone }>,
  usefulLabel: 'Utile',
  usefulUnit: 'utiles',
  usefulAria: 'Marquer comme utile :',
  results: { one: '1 publication', other: '{n} publications' },
  cta: { label: 'Tester une idée au Lab IA', href: '#lab', icon: 'ArrowRight' } as Cta,
};

export const posts: Post[] = [
  {
    id: 'p1', type: 'prompt', title: 'Mon prompt pour résumer un constat amiable',
    excerpt: '« Résume ce constat en 5 points : circonstances, tiers, dommages, responsabilités, pièces manquantes. »',
    author: 'Sophie L.', initials: 'SL', role: 'Conseillère', when: 'il y a 2 h', topic: 'Auto', avatarTone: 'leaf', useful: 48,
  },
  {
    id: 'p2', type: 'rex', title: 'Retour d’expérience : tri des dossiers grêle',
    excerpt: 'Pré-tri en 20 minutes au lieu d’une matinée. Je relis chaque dossier signalé « complexe ».',
    author: 'Marc B.', initials: 'MB', role: 'Gestionnaire', when: 'hier', topic: 'Agricole', avatarTone: 'earth', useful: 31,
  },
  {
    id: 'p3', type: 'question', title: 'Qui a testé l’IA pour les relances clients ?',
    excerpt: 'Je cherche un ton chaleureux sans être insistant. Vos astuces ?',
    author: 'Karim A.', initials: 'KA', role: 'Commercial', when: 'il y a 3 j', topic: 'Relation client', avatarTone: 'water', useful: 12,
  },
  {
    id: 'p4', type: 'prompt', title: 'Préparer un bilan prévoyance en 3 questions',
    excerpt: '« À partir de ce profil, liste 3 questions ouvertes pour faire émerger les besoins de prévoyance. »',
    author: 'Nadia T.', initials: 'NT', role: 'Conseillère', when: 'il y a 4 j', topic: 'Prévoyance', avatarTone: 'teal', useful: 27,
  },
  {
    id: 'p5', type: 'rex', title: 'L’IA m’a aidé à expliquer une franchise',
    excerpt: 'Un exemple chiffré simple, relu par moi, et le sociétaire a tout compris du premier coup.',
    author: 'Julien P.', initials: 'JP', role: 'Commercial', when: 'la semaine dernière', topic: 'Habitation', avatarTone: 'coral', useful: 19,
  },
  {
    id: 'p6', type: 'question', title: 'Peut-on partager une photo de sinistre au copilote ?',
    excerpt: 'Oui si elle ne montre ni visage ni plaque ? J’aimerais une règle claire.',
    author: 'Élise R.', initials: 'ER', role: 'Gestionnaire', when: 'la semaine dernière', topic: 'Données', avatarTone: 'green', useful: 9,
  },
];

/* ---------- Action 4 · Lab IA ---------- */

export const labSection = {
  eyebrow: 'Action 4 · Lab IA',
  title: 'Le *Lab IA*',
  lead: 'Une idée ? Proposez-la et testez-la dans un espace sécurisé. Les meilleures initiatives sont récompensées, puis déployées dans les équipes.',
  agendaLabel: 'Agenda des prochaines sessions',
  formats: { atelier: 'Atelier', hackathon: 'Hackathon', demo: 'Démo' } as Record<EventFormat, string>,
  places: { one: '1 place restante', other: '{n} places restantes', none: 'Complet' },
  register: 'Je m’inscris',
  registered: 'Inscrit·e',
  full: 'Complet',
  announceRegistered: 'Inscription confirmée :',
  announceCancelled: 'Inscription annulée :',
  photo: { caption: 'Équipe en atelier au Lab IA', tone: 'coral' } as Photo,
};

export const labEvents: LabEvent[] = [
  {
    id: 'e1', dateTime: '2026-11-12', day: '12', month: 'nov.', format: 'atelier',
    title: 'Atelier « Mes 10 premiers prompts »', location: 'Visio', duration: '1 h', places: 18,
    level: { label: 'Graine', tone: 'leaf' },
  },
  {
    id: 'e2', dateTime: '2026-11-19', day: '19', month: 'nov.', format: 'hackathon',
    title: 'Hackathon « Sinistre zéro papier »', location: 'Paris', duration: '2 jours', places: null,
    note: 'équipes de 4', level: { label: 'Arbre', tone: 'green' },
  },
  {
    id: 'e3', dateTime: '2026-12-03', day: '03', month: 'déc.', format: 'demo',
    title: 'Démo : analyse d’images agricoles', location: 'Visio', duration: '45 min', places: 1,
    level: { label: 'Pousse', tone: 'leaf' },
  },
  {
    id: 'e4', dateTime: '2026-12-10', day: '10', month: 'déc.', format: 'atelier',
    title: 'Atelier « Vérifier une réponse de l’IA »', location: 'Lyon', duration: '2 h', places: 0,
    level: { label: 'Pousse', tone: 'leaf' },
  },
];

/* ---------- Action 5 · Passeport compétences ---------- */

export const passportBanner = {
  eyebrow: 'Action 5 · Passeport compétences',
  title: 'Votre arbre grandit avec *chaque compétence* acquise.',
  lead: 'Votre espace personnel pour suivre vos formations, vos compétences acquises et votre évolution professionnelle.',
  cta: { label: 'Voir mon passeport', href: '/parcours#passeport', icon: 'ArrowRight' } as Cta,
};

/* ---------- Prédire les compétences de demain (IA prédictive RH) ---------- */

export const skillsForecastSection: SectionHeaderContent = {
  eyebrow: 'Anticiper les talents',
  title: 'Prédire les *compétences de demain*',
  lead: 'L’IA ne sert pas qu’à lire le ciel. Elle aide aussi à voir venir les métiers qui changent, pour former avant de manquer de compétences. Chaque recommandation se discute avec le collaborateur et son manager.',
};

export const skillsForecastUi = {
  goalLabel: 'Objectif',
  resultLabel: 'Résultat',
  pathsLabel: 'Exemples de trajectoires',
  pathArrow: 'évolue vers',
};

export const skillPredictions: SkillPrediction[] = [
  {
    id: 'metiers',
    icon: 'Compass',
    tone: 'green',
    title: 'Les métiers de demain',
    goal: 'Repérer les métiers stratégiques à développer.',
    items: ['Expert risques climatiques', 'Conseiller prévention', 'Analyste de données assurantielles', 'Spécialiste cybersécurité', 'Référent IA'],
    result: 'Préparer les transformations avant qu’elles ne deviennent des pénuries de compétences.',
  },
  {
    id: 'formation',
    icon: 'GraduationCap',
    tone: 'water',
    title: 'Les besoins de formation',
    goal: 'Adapter les formations aux évolutions du secteur.',
    items: ['IA et data', 'Risques climatiques', 'Risques cyber', 'Analyse prédictive', 'Conseil à forte valeur ajoutée'],
    result: 'Un plan de formation personnalisé pour chaque collaborateur.',
  },
  {
    id: 'carriere',
    icon: 'TrendingUp',
    tone: 'coral',
    title: 'Les évolutions de carrière',
    goal: 'Accompagner chacun dans sa progression.',
    items: ['Lecture du parcours professionnel', 'Bilan des compétences', 'Repérage des potentiels'],
    paths: [
      { from: 'Conseiller clientèle', to: 'Conseiller professionnel' },
      { from: 'Gestionnaire sinistres', to: 'Expert climatique' },
      { from: 'Conseiller expérimenté', to: 'Manager d’équipe' },
    ],
    result: 'Un parcours d’évolution construit sur mesure.',
  },
  {
    id: 'mobilite',
    icon: 'Map',
    tone: 'earth',
    title: 'Les mobilités internes',
    goal: 'Ouvrir des opportunités au sein du Groupe.',
    items: ['Compétences transférables détectées', 'Postes compatibles identifiés', 'Mobilité géographique ou fonctionnelle suggérée'],
    result: 'Plus de mobilité interne, des talents fidélisés, moins de recrutement externe.',
  },
];

/* ---------- Accompagner chaque métier ---------- */

export const jobSupportSection: SectionHeaderContent = {
  eyebrow: 'Plan d’accompagnement',
  title: 'Chaque métier *a sa feuille de route*',
  lead: 'Les outils prédictifs changent le travail de chacun. Voici ce que chaque métier apprend à faire, avec un accompagnement dédié.',
};

export const jobSupports: JobSupport[] = [
  {
    id: 'souscripteurs',
    icon: 'FileCheck',
    tone: 'green',
    role: 'Souscripteurs',
    items: ['Lire et analyser les scores de risque', 'Expliquer les décisions aux sociétaires', 'Utiliser les outils d’aide à la souscription'],
  },
  {
    id: 'gestionnaires',
    icon: 'FileSearch',
    tone: 'water',
    role: 'Gestionnaires de sinistres',
    items: ['Prioriser les dossiers avec l’aide de l’IA', 'Repérer fraudes et anomalies', 'Traiter les dossiers avec un assistant IA'],
  },
  {
    id: 'commerciaux',
    icon: 'Briefcase',
    tone: 'coral',
    role: 'Conseillers commerciaux',
    items: ['Recevoir une synthèse des risques avant chaque rendez-vous', 'S’appuyer sur des recommandations de solutions', 'Préparer des échanges personnalisés'],
  },
  {
    id: 'actuaires',
    icon: 'BarChart3',
    tone: 'teal',
    role: 'Actuaires et data analysts',
    items: ['Exploiter les modèles prédictifs', 'Analyser les données climatiques', 'Piloter les indicateurs de risque'],
  },
];
