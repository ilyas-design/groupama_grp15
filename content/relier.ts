// Contenu de la page « Relier » (/relier) — l'humain et le sociétaire au centre.
import type { Crumb, Cta, FaqItem, IconName, Photo, SectionHeaderContent, Tone } from '@/lib/types';

/* ---------- Types locaux ---------- */

/** Morceau de phrase ; `strong` = mot en gras (texte validé). */
export interface Segment {
  text: string;
  strong?: boolean;
}

export interface KeyMessage {
  id: string;
  icon: IconName;
  tone: Tone;
  segments: Segment[];
  /** Lien optionnel vers une section de la page */
  link?: { label: string; href: string };
}

export interface BalanceStop {
  id: string;
  label: string;
  icon: IconName;
  tone: Tone;
  /** Position sur la jauge (0–100) */
  position: number;
  verdict: string;
  description: string;
  consequences: string[];
  reflexes: string[];
}

export interface JourneyStep {
  id: string;
  actor: 'human' | 'ai';
  title: string;
  text: string;
  icon: IconName;
}

export interface GuideChapter {
  id: string;
  title: string;
  icon: IconName;
  intro: string;
  dos: string[];
  donts: string[];
  example: { bad: string; good: string; note: string };
}

export interface TrustColumn {
  id: string;
  title: string;
  caption: string;
  icon: IconName;
  tone: Tone;
  items: string[];
}

export interface RelierCta {
  label: string;
  href: string;
  icon: IconName;
  variant: 'light' | 'dark';
}

/* ---------- Métadonnées & hero ---------- */

export const relierMeta = {
  title: 'Relier · Nos racines restent',
  description:
    'L’IA ne remplace pas la relation : mode d’emploi simple, juste milieu, parcours sinistre « qui fait quoi » et FAQ pour garder l’humain et le sociétaire au centre.',
};

export const relierHero: {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  lead: string;
  ctas: Cta[];
  photo: Photo;
  chips: { label: string; icon: IconName; tone: Tone }[];
} = {
  crumbs: [{ label: 'Accueil', href: '/' }, { label: 'Relier' }],
  eyebrow: 'Pilier 04 · Les racines',
  title: 'La technologie change. *Nos racines restent.*',
  lead: 'L’humain et le sociétaire au centre. L’IA libère du temps pour la relation, jamais pour la remplacer.',
  ctas: [
    { label: 'Lire le mode d’emploi', href: '#guide', icon: 'BookOpen' },
    { label: 'Trouver le juste milieu', href: '#juste-milieu', variant: 'secondary', icon: 'Scale' },
  ],
  photo: { caption: 'Conseillère en agence en face à face avec un sociétaire', src: '/photos/relier-hero.webp', tone: 'earth' },
  chips: [
    { label: 'Écoute', icon: 'HandHeart', tone: 'leaf' },
    { label: 'Face à face', icon: 'Users', tone: 'earth' },
    { label: 'IA en soutien', icon: 'Droplet', tone: 'water' },
  ],
};

/* ---------- Messages clés (TEXTE VALIDÉ) ---------- */

export const keyMessagesHeader: SectionHeaderContent = {
  eyebrow: 'Ce qui ne change pas',
  title: 'L’IA nourrit le terrain, *la relation reste humaine*',
  lead: 'Quatre repères partagés par toutes les équipes, de l’agence au service sinistre.',
};

export const keyMessages: KeyMessage[] = [
  {
    id: 'relation',
    icon: 'Handshake',
    tone: 'leaf',
    segments: [
      { text: 'L’IA ' },
      { text: 'ne remplace pas la relation', strong: true },
      { text: ' avec les clients, les fournisseurs ou les collègues.' },
    ],
  },
  {
    id: 'confiance',
    icon: 'Users',
    tone: 'earth',
    segments: [{ text: 'La confiance se construit en face à face.', strong: true }],
  },
  {
    id: 'mode-emploi',
    icon: 'BookOpen',
    tone: 'water',
    segments: [
      { text: 'Il faut un ' },
      { text: 'mode d’emploi simple', strong: true },
      { text: ' pour savoir ce qu’on peut confier à l’IA et ce qu’on doit vérifier soi-même.' },
    ],
    link: { label: 'Ouvrir le mode d’emploi', href: '#guide' },
  },
  {
    id: 'cadre',
    icon: 'Scale',
    tone: 'coral',
    segments: [
      { text: 'Sans ce cadre, on risque de ' },
      { text: 'trop lui faire confiance', strong: true },
      { text: ' ou de ' },
      { text: 'ne pas s’en servir du tout', strong: true },
      { text: '.' },
    ],
    link: { label: 'Voir les deux écueils', href: '#juste-milieu' },
  },
];

/* ---------- Jauge : 2 écueils et juste milieu ---------- */

export const balanceHeader: SectionHeaderContent = {
  eyebrow: 'Trouver le juste milieu',
  title: 'Ni *aveugle*, ni *absent*',
  lead: 'Déplacez le curseur pour voir ce qui se passe à chaque extrême, et les bons réflexes pour rester au centre.',
};

export const balanceUi = {
  groupLabel: 'Choisir une attitude face à l’IA',
  consequencesTitle: 'Ce qui se passe',
  reflexesTitle: 'Les bons réflexes',
  defaultId: 'equilibre',
};

export const balanceStops: BalanceStop[] = [
  {
    id: 'trop',
    label: 'Trop lui faire confiance',
    icon: 'AlertTriangle',
    tone: 'coral',
    position: 0,
    verdict: 'Écueil n° 1 · La confiance aveugle',
    description: 'On copie, on colle, on envoie. L’IA devient le décideur sans que personne ne l’ait choisi.',
    consequences: [
      'Une erreur de montant ou de date part chez le sociétaire.',
      'Le conseil perd sa touche personnelle.',
      'Des données sensibles finissent dans un outil non validé.',
    ],
    reflexes: ['Relire chaque réponse avant envoi.', 'Croiser avec le contrat source.', 'Garder la décision finale.'],
  },
  {
    id: 'equilibre',
    label: 'Juste milieu',
    icon: 'Scale',
    tone: 'leaf',
    position: 50,
    verdict: 'Le bon équilibre · L’IA prépare, vous décidez',
    description: 'L’IA fait gagner du temps sur la préparation. Vous gardez le jugement, la relation et la décision.',
    consequences: [
      'Plus de temps pour écouter et conseiller.',
      'Des dossiers mieux préparés, vérifiés par un humain.',
      'Un sociétaire qui sait à qui il parle.',
    ],
    reflexes: [
      'Confier le répétitif, vérifier l’important.',
      'Utiliser uniquement les outils validés.',
      'Expliquer simplement l’usage de l’IA.',
    ],
  },
  {
    id: 'jamais',
    label: 'Ne pas s’en servir du tout',
    icon: 'Ban',
    tone: 'earth',
    position: 100,
    verdict: 'Écueil n° 2 · Le refus par prudence',
    description: 'Par peur de mal faire, on laisse l’outil de côté. Le temps passe dans la paperasse plutôt qu’avec les sociétaires.',
    consequences: [
      'Moins de temps pour la relation.',
      'Des tâches répétitives qui s’accumulent.',
      'Un écart qui se creuse avec les collègues formés.',
    ],
    reflexes: [
      'Tester sur une tâche simple et non sensible.',
      'Suivre le niveau Graine du parcours.',
      'Demander conseil au Lab IA ou à un collègue.',
    ],
  },
];

/* ---------- Parcours sinistre « Qui fait quoi » ---------- */

export const journeyHeader: SectionHeaderContent = {
  eyebrow: 'Relation sociétaire',
  title: 'Qui fait quoi dans un *parcours sinistre*',
  lead: 'Trois moments humains, deux moments d’IA : l’outil travaille entre deux échanges, jamais à la place.',
};

export const journeyUi = {
  listLabel: 'Étapes du parcours sinistre',
  actors: { human: 'Humain', ai: 'IA' } as Record<JourneyStep['actor'], string>,
  stepLabel: 'Étape',
};

export const journeySteps: JourneyStep[] = [
  { id: 'ecoute', actor: 'human', title: 'Écoute', text: 'Le sociétaire appelle, le conseiller rassure.', icon: 'HandHeart' },
  { id: 'pre-analyse', actor: 'ai', title: 'Pré-analyse', text: 'Photos, contrat, garanties : tout est préparé.', icon: 'FileSearch' },
  { id: 'decision', actor: 'human', title: 'Décision', text: 'Le gestionnaire valide et ajuste.', icon: 'UserCheck' },
  { id: 'suivi', actor: 'ai', title: 'Suivi', text: 'Notifications et documents automatiques.', icon: 'Bell' },
  { id: 'accompagnement', actor: 'human', title: 'Accompagnement', text: 'Rappel prévention et conseil personnalisé.', icon: 'Heart' },
];

/* ---------- Mode d'emploi / Guide ---------- */

export const guideHeader: SectionHeaderContent = {
  eyebrow: 'Mode d’emploi',
  title: 'Le guide de l’IA *chez Groupama*',
  lead: 'Cinq chapitres courts pour savoir quoi confier à l’IA et quoi vérifier soi-même.',
};

export const guideUi = {
  navLabel: 'Chapitres du guide',
  chapterLabel: 'Chapitre',
  duration: '3 min',
  doTitle: 'À faire',
  dontTitle: 'À éviter',
  exampleTitle: 'Exemple',
  badLabel: 'Plutôt que',
  goodLabel: 'Essayez',
  prev: 'Chapitre précédent',
  next: 'Chapitre suivant',
  feedbackQuestion: 'Ce chapitre vous a-t-il aidé ?',
  feedbackYes: 'Oui',
  feedbackNo: 'Pas encore',
  feedbackThanks: 'Merci, votre avis aide à améliorer le guide.',
};

export const guideChapters: GuideChapter[] = [
  {
    id: 'premiers-pas',
    title: 'Premiers pas',
    icon: 'Sprout',
    intro: 'Trois minutes pour bien démarrer avec les outils IA validés par Groupama.',
    dos: ['Se connecter avec son compte Groupama', 'Choisir le copilote de son métier', 'Tester avec une tâche simple et non sensible'],
    donts: ['Utiliser un outil IA grand public', 'Copier-coller des données clients hors outil validé', 'Commencer par un dossier urgent ou délicat'],
    example: {
      bad: 'Tester l’IA sur le dossier sinistre le plus sensible de la semaine.',
      good: 'Résume en 5 points la note interne sur la nouvelle garantie grêle.',
      note: 'Une première tâche simple permet de comprendre l’outil sans risque.',
    },
  },
  {
    id: 'prompt',
    title: 'Bien formuler un prompt',
    icon: 'MessageSquare',
    intro: 'Un bon prompt, c’est comme une bonne graine : il donne une bonne récolte.',
    dos: ['Donner le contexte et le rôle', 'Préciser le format attendu', 'Demander de citer ses sources'],
    donts: ['Rester vague (« fais un résumé »)', 'Mélanger plusieurs demandes', 'Oublier de dire à qui s’adresse le texte'],
    example: {
      bad: 'Fais un résumé.',
      good: 'Tu es gestionnaire sinistre. Résume ce rapport d’expertise en 5 points, signale montants et dates, et indique la page de chaque information.',
      note: 'Rôle, tâche, format, sources : quatre ingrédients pour une réponse utile.',
    },
  },
  {
    id: 'donnees',
    title: 'Données & confidentialité',
    icon: 'Lock',
    intro: 'Les données de nos sociétaires sont notre bien le plus précieux.',
    dos: ['Utiliser uniquement les outils validés', 'Anonymiser quand c’est possible', 'Signaler tout doute'],
    donts: ['Partager des données de santé', 'Exporter des fichiers clients', 'Saisir ses identifiants dans un outil IA'],
    example: {
      bad: 'Voici le dossier de Mme Durand, née le 3 mars 1961, suivie pour une maladie chronique…',
      good: 'Dossier anonymisé (sociétaire A, habitation, dégât des eaux) : liste les pièces manquantes.',
      note: 'L’IA n’a pas besoin de savoir qui est le sociétaire pour vous aider.',
    },
  },
  {
    id: 'verifier',
    title: 'Vérifier une réponse',
    icon: 'FileCheck',
    intro: 'L’IA peut se tromper. Le bon sens reste humain.',
    dos: ['Croiser avec le contrat source', 'Vérifier chiffres et dates', 'Garder la décision finale'],
    donts: ['Envoyer une réponse sans relecture', 'Faire confiance aveuglément', 'Prendre une source citée pour acquise sans l’ouvrir'],
    example: {
      bad: 'L’IA indique une franchise de 150 € : j’envoie la réponse au sociétaire.',
      good: 'Je retrouve la franchise dans les conditions particulières, je compare, puis j’envoie.',
      note: 'Montants, dates, garanties : ce sont les trois points à contrôler à chaque fois.',
    },
  },
  {
    id: 'societaire',
    title: 'Parler de l’IA au sociétaire',
    icon: 'MessageCircle',
    intro: 'Transparence et simplicité : le sociétaire doit comprendre.',
    dos: ['Expliquer que l’IA aide, l’humain décide', 'Rassurer sur ses données', 'Proposer un interlocuteur humain'],
    donts: ['Utiliser un jargon technique', 'Cacher l’usage de l’IA', 'Laisser entendre que « c’est la machine qui a décidé »'],
    example: {
      bad: 'Votre dossier a été traité par notre algorithme.',
      good: 'Un outil nous aide à préparer votre dossier plus vite. C’est moi qui l’étudie et je reste votre interlocuteur.',
      note: 'Une phrase simple suffit pour rassurer et rester transparent.',
    },
  },
];

/* ---------- Tableau confier / vérifier / jamais ---------- */

export const trustHeader: SectionHeaderContent = {
  eyebrow: 'Le mode d’emploi en un coup d’œil',
  title: 'Ce que je confie, ce que je vérifie, *ce que je garde*',
  lead: 'Trois colonnes à garder en tête au quotidien.',
};

export const trustColumns: TrustColumn[] = [
  {
    id: 'confier',
    title: 'Je peux confier à l’IA',
    caption: 'Le répétitif et la préparation',
    icon: 'Droplets',
    tone: 'water',
    items: [
      'Résumer un rapport ou un compte rendu long',
      'Préparer un brouillon de mail ou de relance',
      'Reformuler un texte plus simplement',
      'Trier et classer les pièces d’un dossier',
      'Rassembler une veille sur les offres du marché',
      'Proposer des questions avant un rendez-vous',
    ],
  },
  {
    id: 'verifier',
    title: 'Je vérifie moi-même',
    caption: 'Tout ce qui engage Groupama',
    icon: 'Eye',
    tone: 'earth',
    items: [
      'Les montants, franchises et plafonds',
      'Les dates, délais et échéances',
      'Les garanties citées et leurs exclusions',
      'Les références au contrat ou à la réglementation',
      'Le ton et la justesse d’un message avant envoi',
    ],
  },
  {
    id: 'jamais',
    title: 'Je ne confie jamais',
    caption: 'Ce qui reste humain et protégé',
    icon: 'ShieldCheck',
    tone: 'coral',
    items: [
      'La décision d’indemniser ou de refuser',
      'L’annonce d’une mauvaise nouvelle à un sociétaire',
      'Des données de santé ou sensibles hors outil validé',
      'Des fichiers clients dans un outil grand public',
      'Mes identifiants et mots de passe',
      'Le jugement sur une situation humaine délicate',
    ],
  },
];

/* ---------- FAQ ---------- */

export const faqHeader: SectionHeaderContent = {
  eyebrow: 'Questions fréquentes',
  title: 'Vos questions, *nos réponses*',
  lead: 'Et pour tout le reste, le Jardinier IA vous répond en bas à droite.',
};

export const faqPhoto: Photo = { caption: 'Conseiller et agricultrice échangeant dans un champ', src: '/photos/relier-faq.webp', tone: 'green' };

export const faqItems: FaqItem[] = [
  {
    id: 'remplacer',
    question: 'L’IA va-t-elle remplacer mon métier ?',
    answer:
      'Non. Elle prend en charge les tâches répétitives pour vous laisser plus de temps pour le conseil et la relation. Chaque décision importante reste humaine.',
  },
  {
    id: 'donnees',
    question: 'Puis-je utiliser des données clients dans l’IA ?',
    answer: 'Uniquement dans les outils validés par Groupama, hébergés de manière sécurisée. Jamais dans un outil grand public.',
  },
  {
    id: 'commencer',
    question: 'Comment commencer si je n’y connais rien ?',
    answer: 'Commencez par le niveau Graine du parcours : 3 modules de 15 minutes, puis un atelier au Lab IA.',
  },
  {
    id: 'erreur',
    question: 'Que faire si l’IA se trompe ?',
    answer: 'Signalez la réponse avec le bouton dédié. Vos retours améliorent l’outil pour tous.',
  },
  {
    id: 'passeport',
    question: 'Le passeport compte-t-il dans mon évolution ?',
    answer: 'Oui, les compétences validées sont visibles lors de vos entretiens annuels et mobilités internes.',
  },
];

/* ---------- CTA final ---------- */

export const relierFinal: { title: string; text: string; ctas: RelierCta[] } = {
  title: 'Gardons nos racines, *cultivons la confiance*',
  text: 'La charte fixe le cadre, votre parcours vous fait grandir. Les deux se complètent pour une IA utile et humaine.',
  ctas: [
    { label: 'Lire la charte IA', href: '/charte', icon: 'ShieldCheck', variant: 'light' },
    { label: 'Commencer mon parcours', href: '/parcours', icon: 'Sprout', variant: 'dark' },
  ],
};
