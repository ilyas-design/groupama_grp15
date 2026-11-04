// Contenu des pages transverses : Charte IA, À propos, 404.
import type { Crumb, Cta, IconName, Photo, RichText, Tone } from '@/lib/types';

/* ------------------------------------------------------------------ */
/* Types locaux                                                        */
/* ------------------------------------------------------------------ */

export interface CharterPrinciple {
  title: string;
  text: string;
}

export interface CharterSectionContent {
  id: string;
  /** Libellé court pour le sommaire */
  short: string;
  icon: IconName;
  tone: Tone;
  eyebrow: string;
  title: RichText;
  intro: string;
  principles: CharterPrinciple[];
  concretely: string[];
  commitments: string[];
}

export interface ReportBoxContent {
  id: string;
  short: string;
  icon: IconName;
  title: RichText;
  text: string;
  steps: { icon: IconName; title: string; text: string }[];
  reassurance: string;
  ctas: Cta[];
}

export interface TimelineItem {
  period: string;
  title: string;
  text: string;
  icon: IconName;
  tone: Tone;
}

export interface TeamMember {
  initials: string;
  name: string;
  role: string;
  text: string;
  tone: Tone;
}

export interface MetaphorItem {
  icon: IconName;
  tone: Tone;
  element: string;
  meaning: string;
  text: string;
}

export interface ApproachStep {
  icon: IconName;
  title: string;
  text: string;
}

export interface CtaBandContent {
  eyebrow: string;
  title: RichText;
  text: string;
  ctas: Cta[];
}

/* ------------------------------------------------------------------ */
/* Charte IA responsable                                               */
/* ------------------------------------------------------------------ */

const charterSections: CharterSectionContent[] = [
  {
    id: 'gerance',
    short: 'Gérance & gouvernance',
    icon: 'Compass',
    tone: 'green',
    eyebrow: '01 · Gérance',
    title: 'Une IA *bien gardée*, comme un jardin entretenu',
    intro:
      'Une IA utile se cultive dans un cadre clair. Chaque outil a un responsable, chaque usage est revu, et chacun sait à qui poser ses questions.',
    principles: [
      {
        title: 'Un comité IA responsable',
        text: 'Métiers, conformité, juridique, sécurité, données et représentants des collaborateurs se réunissent chaque trimestre pour valider les nouveaux usages.',
      },
      {
        title: 'Des rôles clairs',
        text: 'Un « jardinier » métier porte chaque cas d’usage, un référent données veille à leur qualité, un référent conformité vérifie le cadre.',
      },
      {
        title: 'Une revue des cas d’usage',
        text: 'Avant d’être déployé, chaque usage est évalué : utilité, risques, données concernées, place de l’humain. Puis revu au moins une fois par an.',
      },
    ],
    concretely: [
      'Un registre interne liste les outils d’IA validés et leurs usages autorisés.',
      'Un nouvel outil ne s’utilise qu’après passage en comité, même pour un test.',
      'Chaque équipe connaît son référent IA et peut le solliciter simplement.',
    ],
    commitments: [
      'Publier le registre des usages validés sur l’intranet.',
      'Rendre compte chaque année des décisions du comité.',
      'Retirer un outil si les risques dépassent les bénéfices.',
    ],
  },
  {
    id: 'ethique',
    short: 'Éthique',
    icon: 'Scale',
    tone: 'earth',
    eyebrow: '02 · Éthique',
    title: 'Équité, respect et *explications* claires',
    intro:
      'Mutualiste, Groupama protège chacun de la même manière. Une IA ne doit jamais créer d’injustice entre sociétaires ni entre collaborateurs.',
    principles: [
      {
        title: 'Équité',
        text: 'Les résultats d’un outil sont testés pour vérifier qu’ils ne désavantagent pas un groupe de sociétaires sans raison objective.',
      },
      {
        title: 'Non-discrimination',
        text: 'Aucun critère interdit (origine, religion, santé hors cadre légal, opinions…) n’est utilisé, ni directement ni par des données qui le révèlent indirectement.',
      },
      {
        title: 'Explicabilité',
        text: 'Toute proposition de l’IA doit pouvoir être expliquée simplement, au collaborateur comme au sociétaire : sur quoi elle repose et pourquoi.',
      },
    ],
    concretely: [
      'Si vous ne comprenez pas pourquoi l’IA propose quelque chose, vous ne l’appliquez pas.',
      'Une réponse surprenante se signale : c’est peut-être un biais à corriger.',
      'Le sociétaire peut toujours demander une explication à un humain.',
    ],
    commitments: [
      'Tester régulièrement les outils pour détecter les biais.',
      'Documenter, en langage clair, la logique de chaque outil validé.',
      'Corriger ou suspendre un outil dont un biais est avéré.',
    ],
  },
  {
    id: 'rgpd',
    short: 'RGPD & données',
    icon: 'Lock',
    tone: 'water',
    eyebrow: '03 · RGPD',
    title: 'Les données des sociétaires, *un bien précieux*',
    intro:
      'Comme l’eau, les données font vivre l’IA. Elles se puisent avec mesure et se protègent avec soin, dans le respect du RGPD.',
    principles: [
      {
        title: 'Minimisation',
        text: 'On utilise uniquement les données nécessaires à l’usage prévu. Pas plus, et pas plus longtemps que nécessaire.',
      },
      {
        title: 'Base légale',
        text: 'Chaque traitement repose sur une base légale identifiée (contrat, obligation légale, intérêt légitime ou consentement) et est inscrit au registre.',
      },
      {
        title: 'Outils validés uniquement',
        text: 'Aucune donnée personnelle ou sensible ne doit être copiée dans un outil d’IA non validé par l’entreprise (outils grand public, extensions, sites en ligne).',
      },
      {
        title: 'Droits des sociétaires',
        text: 'Accès, rectification, opposition, effacement : ces droits s’appliquent aussi aux traitements qui utilisent l’IA, avec un interlocuteur humain.',
      },
    ],
    concretely: [
      'Avant de coller un texte dans un outil, on retire noms, numéros de contrat et données de santé.',
      'On privilégie des exemples anonymisés pour se former ou tester un prompt.',
      'En cas de doute sur un outil, on demande au référent données avant de l’utiliser.',
    ],
    commitments: [
      'Associer le délégué à la protection des données à chaque nouveau cas d’usage.',
      'Mettre à disposition des outils validés, sûrs et faciles à utiliser.',
      'Répondre aux demandes des sociétaires dans les délais prévus par la loi.',
    ],
  },
  {
    id: 'ai-act',
    short: 'AI Act',
    icon: 'ShieldCheck',
    tone: 'teal',
    eyebrow: '04 · AI Act',
    title: 'Se préparer au *règlement européen* sur l’IA',
    intro:
      'L’Union européenne encadre désormais l’IA selon le niveau de risque de chaque usage. Nous suivons son entrée en application progressive, avec l’appui de nos équipes juridiques et conformité.',
    principles: [
      {
        title: 'Classer les usages par niveau de risque',
        text: 'Chaque cas d’usage est rattaché à une catégorie de risque. Certains usages liés à l’assurance de personnes peuvent être considérés à haut risque : ils demandent davantage de précautions.',
      },
      {
        title: 'Transparence',
        text: 'Quand une personne échange avec une IA ou reçoit un contenu généré par une IA, elle doit pouvoir le savoir.',
      },
      {
        title: 'Obligations proportionnées',
        text: 'Plus le risque est élevé, plus les exigences sont fortes : documentation, qualité des données, contrôle humain, suivi dans le temps.',
      },
    ],
    concretely: [
      'Chaque fiche de cas d’usage indique son niveau de risque estimé.',
      'Un message signale clairement au sociétaire quand l’IA intervient.',
      'Les points précis d’application sont validés avec le juridique, pas improvisés.',
    ],
    commitments: [
      'Tenir à jour la cartographie des usages au fil des évolutions réglementaires.',
      'Former les équipes concernées aux exigences du règlement.',
      'Ne jamais déployer un usage dont le niveau de risque n’est pas évalué.',
    ],
  },
  {
    id: 'humain',
    short: 'Humain dans la boucle',
    icon: 'UserCheck',
    tone: 'coral',
    eyebrow: '05 · Humain dans la boucle',
    title: 'L’IA propose, *l’humain décide*',
    intro:
      'L’IA prépare, résume et trie. Le collaborateur vérifie, décide et accompagne. Aucune décision importante pour un sociétaire n’est prise par une machine seule.',
    principles: [
      {
        title: 'Décision humaine',
        text: 'Une indemnisation, un refus, une résiliation ou une recommandation de contrat restent toujours validés par un collaborateur.',
      },
      {
        title: 'Droit de dire non',
        text: 'Chacun peut ignorer ou corriger une proposition de l’IA, sans avoir à se justifier. Le bon sens reste humain.',
      },
      {
        title: 'Relation préservée',
        text: 'L’IA libère du temps pour le face-à-face. Elle ne remplace ni l’écoute, ni le conseil, ni la confiance.',
      },
    ],
    concretely: [
      'Sinistre : l’IA pré-analyse le dossier, le gestionnaire décide de l’indemnisation.',
      'Courrier : l’IA rédige un brouillon, le conseiller relit, ajuste et envoie.',
      'Prévention : l’IA repère des sociétaires exposés, le conseiller choisit qui appeler et comment.',
    ],
    commitments: [
      'Garder une trace de la validation humaine sur les décisions sensibles.',
      'Former chacun à vérifier une réponse d’IA.',
      'Mesurer et publier la part des décisions finales prises par un humain.',
    ],
  },
  {
    id: 'sobriete',
    short: 'Sobriété',
    icon: 'Recycle',
    tone: 'leaf',
    eyebrow: '06 · Sobriété',
    title: 'Une IA *sobre*, comme on économise l’eau',
    intro:
      'L’IA consomme de l’énergie. On l’utilise quand elle apporte vraiment quelque chose, avec des outils proportionnés au besoin.',
    principles: [
      {
        title: 'Usage proportionné',
        text: 'Pas d’IA pour une tâche qu’un modèle de courrier ou une recherche simple règle déjà très bien.',
      },
      {
        title: 'Numérique responsable',
        text: 'On choisit des outils et des modèles adaptés à la tâche, sans surdimensionner, et on mutualise les usages.',
      },
      {
        title: 'Mesurer pour progresser',
        text: 'L’impact environnemental des principaux usages est estimé et pris en compte dans les choix.',
      },
    ],
    concretely: [
      'Un prompt clair du premier coup évite dix essais inutiles.',
      'On réutilise les prompts partagés par la communauté plutôt que de repartir de zéro.',
      'On ne génère pas d’images ou de vidéos « pour voir ».',
    ],
    commitments: [
      'Intégrer un critère de sobriété dans la revue des cas d’usage.',
      'Partager des bonnes pratiques de sobriété dans les formations.',
      'Privilégier des solutions moins énergivores à service égal.',
    ],
  },
];

export const charter = {
  meta: {
    title: 'Charte IA responsable',
    description:
      'La charte IA responsable de Groupama × Groupe 15 : gouvernance, éthique, RGPD, AI Act, humain dans la boucle et sobriété.',
  },
  hero: {
    crumbs: [{ label: 'Accueil', href: '/' }, { label: 'Charte IA responsable' }] satisfies Crumb[],
    eyebrow: 'Gérance · Confiance',
    title: 'Notre charte *IA responsable*',
    lead: 'Six engagements pour que l’IA reste un outil au service des collaborateurs et des sociétaires. Simple à lire, concrète à appliquer, partagée par tous.',
    ctas: [
      { label: 'Lire la charte', href: '#gerance', icon: 'ArrowRight' },
      { label: 'Signaler un usage', href: '#signaler', variant: 'secondary', icon: 'AlertTriangle' },
    ] satisfies Cta[],
  },
  version: {
    label: 'Version 1.2 · mise à jour le 15 septembre 2026',
    note: 'Document fictif réalisé pour la maquette. Revu chaque année par le comité IA responsable.',
  },
  summaryCard: {
    title: 'En un coup d’œil',
    items: ['L’humain décide', 'Transparence', 'Données protégées', 'Sobriété'],
  },
  toc: {
    label: 'Sommaire de la charte',
    title: 'Sommaire',
  },
  labels: {
    principles: 'Nos principes',
    concretely: 'Concrètement, ça veut dire…',
    commitments: 'Nos engagements',
  },
  sections: charterSections,
  report: {
    id: 'signaler',
    short: 'Signaler un usage',
    icon: 'AlertTriangle',
    title: 'Signaler un *usage problématique*',
    text: 'Une réponse biaisée, une donnée mal protégée, une décision prise sans vérification ? Le signaler, c’est protéger les sociétaires et améliorer nos outils.',
    steps: [
      { icon: 'Eye', title: 'Je repère', text: 'Je note ce qui me semble anormal : outil, date, contexte.' },
      { icon: 'MessageSquare', title: 'Je signale', text: 'J’écris à mon référent IA ou à la boîte dédiée, sans données sensibles.' },
      { icon: 'CheckCircle2', title: 'On traite', text: 'Le comité analyse et répond sous 10 jours ouvrés.' },
    ],
    reassurance: 'Aucun signalement fait de bonne foi ne peut être reproché. Il est même encouragé.',
    ctas: [
      { label: 'Contacter mon référent IA', href: '/relier#guide', variant: 'light', icon: 'Send' },
      { label: 'Relire le guide de l’IA', href: '/relier#guide', variant: 'ghost', icon: 'ArrowRight' },
    ],
  } satisfies ReportBoxContent,
};

/* ------------------------------------------------------------------ */
/* À propos / Histoire                                                 */
/* ------------------------------------------------------------------ */

export const about = {
  meta: {
    title: 'À propos',
    description:
      'Des racines mutualistes de Groupama à l’IA d’aujourd’hui, et l’équipe Groupe 15 qui porte le projet « Cultiver l’IA ».',
  },
  hero: {
    crumbs: [{ label: 'Accueil', href: '/' }, { label: 'À propos' }] satisfies Crumb[],
    eyebrow: 'Histoire · Racines',
    title: 'Des racines profondes, *de nouvelles pousses*',
    lead: 'Groupama est né de l’entraide entre agriculteurs. Aujourd’hui, cette même entraide fait grandir l’IA au service des collaborateurs et des sociétaires.',
    ctas: [
      { label: 'Parcourir notre histoire', href: '#histoire', icon: 'ArrowRight' },
      { label: 'Rencontrer le Groupe 15', href: '#groupe-15', variant: 'secondary' },
    ] satisfies Cta[],
    photo: { caption: 'Mains d’agriculteur tenant une jeune pousse dans la terre', tone: 'earth' } satisfies Photo,
  },
  timeline: {
    id: 'histoire',
    eyebrow: 'Notre histoire',
    title: 'De la caisse locale *à l’IA*',
    lead: 'Plus d’un siècle d’entraide, résumé en quelques étapes.',
    disclaimer: 'Repères simplifiés, présentés à titre illustratif. Pour l’histoire détaillée, se référer aux sources officielles du groupe.',
    items: [
      {
        period: 'Fin du XIXe siècle',
        title: 'Les premières caisses mutuelles agricoles',
        text: 'Des agriculteurs s’unissent localement pour se protéger ensemble contre les aléas : grêle, incendie, perte de bétail. L’entraide devient assurance.',
        icon: 'Wheat',
        tone: 'earth',
      },
      {
        period: 'XXe siècle',
        title: 'Les caisses se fédèrent',
        text: 'Les caisses locales et régionales se regroupent peu à peu. Le réseau s’organise sans perdre son ancrage dans les territoires.',
        icon: 'Network',
        tone: 'green',
      },
      {
        period: 'Fin du XXe siècle',
        title: 'Naissance du groupe Groupama',
        text: 'Le groupe se constitue sous le nom Groupama et s’ouvre au-delà du monde agricole : particuliers, professionnels, collectivités.',
        icon: 'TreeDeciduous',
        tone: 'leaf',
      },
      {
        period: 'Années 2000',
        title: 'Développement et diversification',
        text: 'Assurance, banque, services : le groupe grandit en France et à l’international, fidèle à son modèle mutualiste.',
        icon: 'Trees',
        tone: 'teal',
      },
      {
        period: 'Années 2010',
        title: 'Le virage du numérique',
        text: 'Espaces en ligne, applications, outils pour les conseillers : le numérique rapproche les sociétaires de leur agence.',
        icon: 'Waves',
        tone: 'water',
      },
      {
        period: 'Aujourd’hui',
        title: 'Cultiver l’IA',
        text: 'L’IA arrive dans les métiers. Comme l’eau nourrit la terre, elle nourrit les compétences, avec l’humain qui décide.',
        icon: 'Sprout',
        tone: 'coral',
      },
    ] satisfies TimelineItem[],
  },
  team: {
    id: 'groupe-15',
    eyebrow: 'Le Groupe 15',
    title: 'Une équipe, *une même graine*',
    lead: 'Le Groupe 15 réunit des profils complémentaires autour d’une conviction : l’IA n’a de valeur que si elle fait grandir les personnes.',
    photo: { caption: 'L’équipe du Groupe 15 en atelier autour d’une table', tone: 'green' } satisfies Photo,
    members: [
      { initials: 'LM', name: 'Léa M.', role: 'Cheffe de projet', text: 'Fait pousser le projet dans la bonne direction et relie toutes les équipes.', tone: 'green' },
      { initials: 'YB', name: 'Yanis B.', role: 'Stratégie & usages IA', text: 'Identifie les cas d’usage qui font vraiment gagner du temps aux métiers.', tone: 'water' },
      { initials: 'CR', name: 'Chloé R.', role: 'Design & expérience', text: 'Imagine un site simple, accueillant et accessible à tous.', tone: 'coral' },
      { initials: 'TD', name: 'Thomas D.', role: 'Données & conformité', text: 'Veille au respect du RGPD et prépare l’arrivée de l’AI Act.', tone: 'teal' },
      { initials: 'SA', name: 'Sarah A.', role: 'Formation & conduite du changement', text: 'Conçoit les parcours qui font passer chacun de la graine à la forêt.', tone: 'leaf' },
    ] satisfies TeamMember[],
    membersNote: 'Noms et rôles fictifs.',
    approachTitle: 'Notre démarche',
    approach: [
      { icon: 'Users', title: 'Écouter', text: 'Rencontrer conseillers, commerciaux et gestionnaires pour comprendre leur quotidien.' },
      { icon: 'Lightbulb', title: 'Imaginer', text: 'Transformer leurs irritants en cinq actions concrètes, avec la nature pour fil rouge.' },
      { icon: 'Hammer', title: 'Prototyper', text: 'Construire une maquette cliquable pour tester les idées avec les équipes.' },
      { icon: 'RefreshCw', title: 'Améliorer', text: 'Recueillir les retours et ajuster, comme on taille un arbre pour qu’il grandisse mieux.' },
    ] satisfies ApproachStep[],
  },
  metaphor: {
    eyebrow: 'Notre métaphore',
    title: 'Pourquoi *la nature* ?',
    lead: 'Parce qu’une entreprise mutualiste grandit comme une forêt : lentement, ensemble, en s’appuyant sur ses racines.',
    items: [
      {
        icon: 'Droplets',
        tone: 'water',
        element: 'L’eau',
        meaning: 'c’est l’IA',
        text: 'Elle circule partout, nourrit sans se voir et fait gagner en énergie. Bien dosée, elle fait pousser. En excès, elle déborde.',
      },
      {
        icon: 'Network',
        tone: 'earth',
        element: 'Les racines',
        meaning: 'ce sont les collaborateurs',
        text: 'Ancrés dans les territoires, reliés entre eux, ils tiennent l’ensemble debout et puisent ce qui est utile.',
      },
      {
        icon: 'Flower2',
        tone: 'coral',
        element: 'Les fleurs',
        meaning: 'ce sont les talents',
        text: 'Les compétences qui éclosent grâce à l’IA, à la formation et à l’entraide. Visibles, et faites pour être partagées.',
      },
    ] satisfies MetaphorItem[],
  },
  cta: {
    eyebrow: 'À vous de jouer',
    title: 'Plantez *votre première graine*',
    text: 'Commencez votre parcours IA ou découvrez les cinq actions imaginées par le Groupe 15.',
    ctas: [
      { label: 'Cultiver mes compétences', href: '/parcours', variant: 'light', icon: 'Sprout' },
      { label: 'Lire la charte IA', href: '/charte', variant: 'ghost', icon: 'ArrowRight' },
    ],
  } satisfies CtaBandContent,
};

/* ------------------------------------------------------------------ */
/* 404                                                                 */
/* ------------------------------------------------------------------ */

export const notFound = {
  eyebrow: 'Erreur 404',
  title: 'Cette graine n’a pas *encore germé*',
  text: 'La page que vous cherchez n’existe pas, ou elle a été déplacée. Pas d’inquiétude : le reste du jardin vous attend.',
  primary: { label: 'Retour à l’accueil', href: '/', icon: 'Home' } satisfies Cta,
  linksTitle: 'Ou explorez une autre parcelle',
  links: [
    { label: 'Anticiper', href: '/anticiper', icon: 'CloudSun' },
    { label: 'Grandir', href: '/grandir', icon: 'Trees' },
    { label: 'Simplifier', href: '/simplifier', icon: 'Waves' },
    { label: 'Relier', href: '/relier', icon: 'Network' },
    { label: 'Mon parcours', href: '/parcours', icon: 'Sprout' },
    { label: 'Charte IA', href: '/charte', icon: 'ShieldCheck' },
  ] satisfies { label: string; href: string; icon: IconName }[],
};
