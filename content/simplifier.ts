// Contenu de la page /simplifier (Pilier 03 · La rivière). Tous les chiffres, noms et concurrents sont fictifs.
import type { Crumb, Cta, IconName, RichText, SectionHeaderContent, Tone } from '@/lib/types';

/* ---------- Types locaux ---------- */

export interface SimplifierHero {
  crumbs: Crumb[];
  eyebrow: string;
  title: RichText;
  lead: string;
  ctas: Cta[];
  visual: { label: string; ia: { title: string; verbs: string[] }; you: { title: string; verbs: string[] }; flowLabel: string };
}

export interface PillarCard {
  id: string;
  icon: IconName;
  tone: Tone;
  title: string;
  text: string;
  role: string;
}

export interface SimTask {
  label: string;
  /** Heures libérées par semaine */
  hours: number;
  /** Part de la tâche prise en charge par l'IA, 0–100 (longueur de la barre) */
  share: number;
}

export interface SimProfile {
  id: string;
  label: string;
  icon: IconName;
  tasks: SimTask[];
}

export interface SimulatorContent {
  id: string;
  eyebrow: string;
  title: string;
  chooseLabel: string;
  resultLabel: string;
  perWeek: string;
  unit: string;
  taskShareLabel: string;
  /** {profil} et {heures} sont remplacés */
  announce: string;
  note: string;
  profiles: SimProfile[];
}

export interface SourceDoc {
  type: string;
  tone: Tone;
  name: string;
  meta: string;
}

/** Segment de texte ; `mark` = chiffre surligné */
export interface Segment {
  text: string;
  mark?: boolean;
}

export interface SynthesisContent {
  id: string;
  header: SectionHeaderContent;
  sourcesLabel: string;
  docs: SourceDoc[];
  generate: string;
  regenerate: string;
  generating: string;
  generatingStatus: string;
  readyStatus: string;
  emptyText: string;
  badge: string;
  generatedIn: string;
  sections: { title: string; paragraphs?: Segment[][]; items?: Segment[][] }[];
  checklist: { title: string; items: { id: string; label: string }[] };
  actions: {
    validate: string;
    edit: string;
    save: string;
    cancel: string;
    editLabel: string;
    mustCheck: string;
    validated: string;
    validatedHint: string;
    editedNote: string;
    reopen: string;
  };
  gain: { label: string; before: string; beforeLabel: string; after: string; afterLabel: string };
}

export interface Draft {
  id: string;
  label: string;
  icon: IconName;
  badge: string;
  meta: { label: string; value: string }[];
  subject: string;
  body: string[];
  signature: string;
  gain: { before: string; after: string; volume: string };
}

export interface RepetitiveContent {
  id: string;
  header: SectionHeaderContent;
  tabsLabel: string;
  subjectLabel: string;
  gainTitle: string;
  beforeLabel: string;
  afterLabel: string;
  rule: { eyebrow: string; title: string; text: string };
  drafts: Draft[];
}

export interface PriceRow {
  product: string;
  /** Prix mensuels en euros, dans l'ordre des colonnes */
  prices: number[];
}

export interface WatchContent {
  id: string;
  header: SectionHeaderContent;
  topics: string[];
  table: { caption: string; productHeader: string; columns: string[]; unit: string; lowest: string; rows: PriceRow[]; note: string; scrollHint: string };
  newsTitle: string;
  news: { id: string; code: string; title: string; text: string }[];
  form: {
    title: string;
    text: string;
    label: string;
    placeholder: string;
    submit: string;
    errorEmpty: string;
    errorInvalid: string;
    success: string;
    privacy: string;
  };
}

export interface BeforeAfterContent {
  id: string;
  header: SectionHeaderContent;
  caption: string;
  beforeLabel: string;
  afterLabel: string;
  rows: { before: string; after: string }[];
}

/* ---------- Contenu ---------- */

export const meta = {
  title: 'Simplifier — Moins d’administratif, plus de temps pour l’essentiel',
  description:
    'Comme une rivière devient énergie, l’IA transforme l’administratif en temps utile. Elle prépare, résume et trie. Vous vérifiez, décidez et conseillez.',
};

export const hero: SimplifierHero = {
  crumbs: [{ label: 'Accueil', href: '/' }, { label: 'Simplifier' }],
  eyebrow: 'Pilier 03 · La rivière',
  title: 'Moins d’administratif, *plus de temps pour l’essentiel*.',
  lead: 'Comme une rivière devient énergie, l’IA transforme l’administratif en temps utile. Elle prépare, résume et trie. Vous vérifiez, décidez et conseillez.',
  ctas: [
    { label: 'Estimer mon temps libéré', href: '#simulateur', icon: 'Timer' },
    { label: 'Voir la démo synthèse', href: '#synthese', variant: 'secondary', icon: 'FileSearch' },
  ],
  visual: {
    label: 'Le partage des rôles',
    ia: { title: 'L’IA', verbs: ['Prépare', 'Résume', 'Trie'] },
    you: { title: 'Vous', verbs: ['Vérifiez', 'Décidez', 'Conseillez'] },
    flowLabel: 'Du temps rendu aux sociétaires',
  },
};

export const pillarsHeader: SectionHeaderContent = {
  eyebrow: 'Quatre courants',
  title: 'L’IA fait le travail de fond, *vous gardez la main*.',
  lead: 'Quatre usages concrets pour alléger le quotidien. À chaque fois, votre rôle est clair.',
};

export const roleLabel = 'Votre rôle';

export const pillars: PillarCard[] = [
  {
    id: 'alleger',
    icon: 'FileCheck',
    tone: 'water',
    title: 'Alléger l’administratif',
    text: 'L’IA prend en charge la paperasse du quotidien pour vous rendre du temps auprès des sociétaires.',
    role: 'Vous gardez la main sur chaque dossier.',
  },
  {
    id: 'synthetiser',
    icon: 'FileSearch',
    tone: 'teal',
    title: 'Synthétiser les rapports',
    text: 'Un rapport de 40 pages devient une synthèse claire en quelques minutes, points clés mis en évidence.',
    role: 'Vous vérifiez uniquement les points importants.',
  },
  {
    id: 'automatiser',
    icon: 'Repeat',
    tone: 'leaf',
    title: 'Automatiser le répétitif',
    text: 'Mails types, comptes rendus, relances pré-rédigés à partir du dossier.',
    role: 'Vous relisez, ajustez, envoyez.',
  },
  {
    id: 'eclairer',
    icon: 'Lightbulb',
    tone: 'earth',
    title: 'Éclairer la veille',
    text: 'L’IA rassemble et résume les infos sur les concurrents, leurs produits et leurs prix.',
    role: 'Vous en tirez les décisions commerciales.',
  },
];

export const simulator: SimulatorContent = {
  id: 'simulateur',
  eyebrow: 'Simulateur',
  title: 'Ce que l’IA change pour mon métier',
  chooseLabel: 'Je suis…',
  resultLabel: 'Temps libéré estimé',
  perWeek: 'par semaine',
  unit: 'h',
  taskShareLabel: 'Part préparée par l’IA',
  announce: '{profil} : environ {heures} heures libérées par semaine.',
  note: 'Estimation indicative et fictive, basée sur des pilotes internes simulés.',
  profiles: [
    {
      id: 'terrain',
      label: 'Conseiller terrain',
      icon: 'Tractor',
      tasks: [
        { label: 'Préparation des rendez-vous', hours: 2, share: 85 },
        { label: 'Comptes rendus de visite', hours: 1.5, share: 70 },
        { label: 'Recherche dans les contrats', hours: 1.5, share: 60 },
        { label: 'Courriers et relances', hours: 1.5, share: 50 },
      ],
    },
    {
      id: 'agence',
      label: 'Commercial en agence',
      icon: 'Building2',
      tasks: [
        { label: 'Rédaction de propositions', hours: 2, share: 80 },
        { label: 'Comparaison d’offres', hours: 1, share: 55 },
        { label: 'Relances personnalisées', hours: 1.5, share: 60 },
        { label: 'Saisie CRM', hours: 0.5, share: 35 },
      ],
    },
    {
      id: 'sinistre',
      label: 'Gestionnaire sinistre',
      icon: 'ShieldCheck',
      tasks: [
        { label: 'Pré-tri des dossiers', hours: 3, share: 90 },
        { label: 'Analyse des photos', hours: 2, share: 70 },
        { label: 'Pièces manquantes', hours: 1.5, share: 65 },
        { label: 'Synthèse de rapports', hours: 1.5, share: 60 },
      ],
    },
    {
      id: 'support',
      label: 'Fonction support / admin',
      icon: 'Briefcase',
      tasks: [
        { label: 'Synthèse de rapports', hours: 2.5, share: 85 },
        { label: 'Tâches répétitives', hours: 2, share: 75 },
        { label: 'Veille concurrentielle', hours: 1.5, share: 70 },
        { label: 'Reporting', hours: 1, share: 45 },
      ],
    },
  ],
};

export const synthesis: SynthesisContent = {
  id: 'synthese',
  header: {
    eyebrow: 'Génération & synthèse',
    title: 'De 40 pages *à l’essentiel*.',
    lead: 'L’IA lit les documents du dossier et met en évidence les chiffres clés. Vous vérifiez trois points, puis vous validez.',
  },
  sourcesLabel: 'Documents source',
  docs: [
    { type: 'PDF', tone: 'coral', name: 'Rapport_expertise_grele.pdf', meta: '28 pages' },
    { type: 'DOC', tone: 'water', name: 'Compte-rendu_visite.docx', meta: '6 pages' },
    { type: 'DOC', tone: 'water', name: 'Contrat_multirisque_agricole.docx', meta: '6 pages' },
    { type: 'IMG', tone: 'green', name: 'Photos_parcelle (24)', meta: 'Analyse d’images' },
  ],
  generate: 'Générer la synthèse',
  regenerate: 'Régénérer',
  generating: 'Analyse en cours…',
  generatingStatus: 'Synthèse en cours de génération.',
  readyStatus: 'Synthèse générée. Trois points sont à vérifier par vous.',
  emptyText: 'Lancez la synthèse : l’IA lit les 40 pages et vous présente l’essentiel.',
  badge: 'Synthèse IA · à valider',
  generatedIn: 'Générée en 42 s',
  sections: [
    {
      title: 'Résumé',
      paragraphs: [
        [
          { text: 'Épisode de grêle du ' },
          { text: '14/06', mark: true },
          { text: ' ayant touché ' },
          { text: '70 %', mark: true },
          { text: ' de la parcelle de pommiers. Dommages estimés à ' },
          { text: '18 400 €', mark: true },
          { text: '. Garantie récolte applicable.' },
        ],
      ],
    },
    {
      title: 'Points d’attention',
      items: [
        [{ text: 'Filets anti-grêle absents sur la parcelle nord' }],
        [{ text: '2 sinistres', mark: true }, { text: ' similaires en ' }, { text: '5 ans', mark: true }],
      ],
    },
    {
      title: 'Action proposée',
      paragraphs: [[{ text: 'Indemnisation + RDV prévention avec le conseiller.' }]],
    },
  ],
  checklist: {
    title: 'À vérifier par vous · 3 points',
    items: [
      { id: 'surface', label: 'La surface touchée (70 %) correspond aux photos de la parcelle' },
      { id: 'montant', label: 'Le montant de 18 400 € est cohérent avec le rapport d’expertise' },
      { id: 'garantie', label: 'La garantie récolte est bien active au 14/06' },
    ],
  },
  actions: {
    validate: 'Valider',
    edit: 'Modifier',
    save: 'Enregistrer',
    cancel: 'Annuler',
    editLabel: 'Modifier le résumé de la synthèse',
    mustCheck: 'Cochez d’abord les 3 points à vérifier avant de valider.',
    validated: 'Synthèse validée',
    validatedHint: 'Validée par vous. Elle peut rejoindre le dossier.',
    editedNote: 'Résumé modifié par vous',
    reopen: 'Rouvrir',
  },
  gain: { label: 'Gain de temps', before: '3 h', beforeLabel: 'de lecture', after: '5 min', afterLabel: 'de vérification' },
};

export const repetitive: RepetitiveContent = {
  id: 'repetitif',
  header: {
    eyebrow: 'Tâches répétitives',
    title: 'Le brouillon est prêt, *vous avez le dernier mot*.',
    lead: 'L’IA pré-rédige à partir du dossier. Vous relisez, ajustez, envoyez.',
  },
  tabsLabel: 'Exemples de brouillons préparés par l’IA',
  subjectLabel: 'Objet',
  gainTitle: 'Gain par tâche',
  beforeLabel: 'Avant',
  afterLabel: 'Avec l’IA',
  rule: {
    eyebrow: 'Règle d’or',
    title: 'Rien ne part sans votre relecture.',
    text: 'L’IA propose, vous disposez. Chaque mail, compte rendu ou relance est relu, ajusté et envoyé par vous.',
  },
  drafts: [
    {
      id: 'mails',
      label: 'Mails types',
      icon: 'Mail',
      badge: 'Brouillon IA · à relire',
      meta: [
        { label: 'À', value: 'Mme Claire Durand (sociétaire fictive)' },
        { label: 'Dossier', value: 'Habitation · dégât des eaux' },
      ],
      subject: 'Votre déclaration de dégât des eaux : les prochaines étapes',
      body: [
        'Bonjour Madame Durand,',
        'Nous avons bien reçu votre déclaration du 3 novembre concernant le dégât des eaux dans votre cuisine. Votre contrat habitation couvre ce type de sinistre.',
        'Pour avancer rapidement, il nous manque deux éléments : la facture de réparation du plombier et deux ou trois photos des dommages.',
        'Vous pouvez les déposer dans votre espace sociétaire ou me les envoyer en réponse à ce mail. Je reste disponible pour en parler par téléphone.',
      ],
      signature: 'Bien cordialement,\nVotre conseiller Groupama',
      gain: { before: '15 min', after: '2 min', volume: '≈ 12 mails par semaine' },
    },
    {
      id: 'comptes-rendus',
      label: 'Comptes rendus',
      icon: 'FileText',
      badge: 'Brouillon IA · à relire',
      meta: [
        { label: 'Visite', value: 'EARL des Vergers (exploitation fictive)' },
        { label: 'Source', value: 'Notes vocales du conseiller · 6 min' },
      ],
      subject: 'Compte rendu de visite – EARL des Vergers – 28 octobre',
      body: [
        'Objet de la visite : bilan annuel du contrat multirisque agricole.',
        'Points abordés : extension du verger de 2 hectares prévue au printemps ; projet d’installation de filets anti-grêle ; questions sur la garantie perte de récolte.',
        'Décisions : envoi d’un devis pour la nouvelle surface ; rendez-vous prévention à programmer avant mars.',
        'Prochaine étape : appel de suivi dans 15 jours.',
      ],
      signature: 'Rédigé à partir de vos notes, à compléter si besoin.',
      gain: { before: '30 min', after: '5 min', volume: '≈ 5 visites par semaine' },
    },
    {
      id: 'relances',
      label: 'Relances',
      icon: 'Bell',
      badge: 'Brouillon IA · à relire',
      meta: [
        { label: 'À', value: 'M. Karim Benali (sociétaire fictif)' },
        { label: 'Motif', value: 'Pièce manquante depuis 10 jours' },
      ],
      subject: 'Petit rappel : votre dossier auto attend un document',
      body: [
        'Bonjour Monsieur Benali,',
        'Pour finaliser l’indemnisation de votre sinistre auto du 18 octobre, il ne manque plus que le constat amiable signé.',
        'Dès réception, votre dossier sera traité sous 48 heures. Si vous rencontrez une difficulté pour l’obtenir, appelez-moi : nous trouverons une solution ensemble.',
      ],
      signature: 'Bien cordialement,\nVotre gestionnaire Groupama',
      gain: { before: '10 min', after: '1 min', volume: '≈ 20 relances par semaine' },
    },
  ],
};

export const watch: WatchContent = {
  id: 'veille',
  header: {
    eyebrow: 'Veille concurrentielle',
    title: 'Le marché, *résumé chaque lundi*.',
    lead: 'L’IA surveille, trie et synthétise. Vous ne lisez que ce qui compte, et vous en tirez les décisions commerciales.',
  },
  topics: ['Agricole', 'Habitation', 'Auto', 'Réglementation'],
  table: {
    caption: 'Comparatif des prix moyens mensuels observés cette semaine (données fictives, concurrents anonymisés)',
    productHeader: 'Offre',
    columns: ['Groupama', 'Concurrent A', 'Concurrent B', 'Concurrent C'],
    unit: '€/mois',
    lowest: 'prix le plus bas',
    rows: [
      { product: 'Habitation · T3 en ville', prices: [24, 22, 27, 25] },
      { product: 'Auto · tous risques', prices: [58, 61, 55, 63] },
      { product: 'Multirisque agricole', prices: [142, 155, 149, 138] },
      { product: 'Santé · famille', prices: [176, 182, 169, 190] },
    ],
    note: 'Le prix le plus bas de chaque ligne est mis en avant par une pastille verte cochée. Chiffres fictifs, à titre d’illustration.',
    scrollHint: 'Faites défiler le tableau horizontalement',
  },
  newsTitle: 'Les 3 infos de la semaine',
  news: [
    {
      id: 'news',
      code: 'NEWS',
      title: 'Un concurrent lance une offre paramétrique sécheresse',
      text: 'Impact potentiel : élevé sur le marché agricole · 3 sources',
    },
    {
      id: 'reg',
      code: 'REG',
      title: 'AI Act : nouvelles obligations pour l’assurance',
      text: 'Calendrier d’application et points à vérifier · 5 sources',
    },
    {
      id: 'tech',
      code: 'TECH',
      title: 'Déclaration de sinistre par photo : tendances 2026',
      text: '4 acteurs, 2 approches · 7 sources',
    },
  ],
  form: {
    title: 'Recevoir la synthèse du lundi',
    text: 'Chaque lundi à 8 h, l’essentiel du marché en 5 minutes de lecture.',
    label: 'Votre adresse e-mail professionnelle',
    placeholder: 'prenom.nom@exemple.fr',
    submit: 'Je m’abonne',
    errorEmpty: 'Indiquez votre adresse e-mail.',
    errorInvalid: 'Cette adresse ne semble pas valide. Exemple : prenom.nom@exemple.fr',
    success: 'C’est noté ! Votre première synthèse arrivera lundi prochain. (Démonstration : aucun envoi réel.)',
    privacy: 'Votre adresse sert uniquement à cet envoi. Désabonnement en un clic.',
  },
};

export const beforeAfter: BeforeAfterContent = {
  id: 'avant-apres',
  header: {
    eyebrow: 'Avant / Avec l’IA',
    title: 'Le même métier, *un courant plus fluide*.',
  },
  caption: 'Comparaison du quotidien avant et avec l’IA',
  beforeLabel: 'Avant',
  afterLabel: 'Avec l’IA',
  rows: [
    { before: '3 h pour lire et résumer un rapport d’expertise', after: 'Synthèse générée en 5 min, relue et validée' },
    { before: 'Ressaisie des mêmes infos dans 4 outils', after: 'Saisie unique, propagation automatique' },
    { before: 'Veille concurrentielle manuelle, chaque mois', after: 'Veille hebdomadaire synthétisée et ciblée' },
    { before: 'Courriers types recopiés à la main', after: 'Courriers personnalisés pré-rédigés, relus par vous' },
    { before: 'Relances oubliées, dossiers qui traînent', after: 'Relances proposées au bon moment, envoyées par vous' },
  ],
};
