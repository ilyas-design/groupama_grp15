// Contenu de la page /projet — fiche projet CAP IA (Groupe 15).
// Budget, calendrier et indicateurs : propositions du Groupe 15, à valider par Groupama.
import type { Crumb, Cta, IconName, SectionHeaderContent, Tone } from '@/lib/types';

/* ---------- Types locaux ---------- */

export interface Objective {
  icon: IconName;
  tone: Tone;
  text: string;
}

export interface ActionSummary {
  number: number;
  name: string;
  text: string;
  href: string;
  icon: IconName;
}

export interface Phase {
  months: string;
  title: string;
  text: string;
}

export interface BudgetYear {
  year: string;
  amount: number;
  text: string;
}

export interface Kpi {
  value: string;
  label: string;
  icon: IconName;
}

export interface Pillar {
  title: string;
  icon: IconName;
  tone: Tone;
  items: string[];
}

/* ---------- Page ---------- */

export const projetMeta = {
  title: 'Le projet CAP IA',
  description:
    'CAP IA : 5 actions, 12 mois de déploiement, 500 000 € sur 5 ans pour faire grandir les compétences des collaborateurs Groupama avec l’IA.',
};

export const projetHero = {
  crumbs: [{ label: 'Accueil', href: '/' }, { label: 'Le projet CAP IA' }] as Crumb[],
  eyebrow: 'Fiche projet · Groupe 15',
  title: 'CAP IA : faire grandir *chaque talent* avec l’IA.',
  lead: 'Un projet progressif sur 5 ans pour former les collaborateurs, alléger les tâches répétitives et transmettre les savoir-faire, sans jamais perdre ce qui fait notre force : l’écoute, l’empathie, le conseil et la décision humaine.',
  ctas: [
    { label: 'Voir les 5 actions', href: '/grandir', icon: 'ArrowRight' },
    { label: 'Budget et calendrier', href: '#budget', variant: 'secondary' },
  ] as Cta[],
  keyFigures: [
    { value: '5', label: 'actions' },
    { value: '12 mois', label: 'pour déployer' },
    { value: '200', label: 'salariés pilotes' },
    { value: '500 k€', label: 'sur 5 ans' },
  ],
  keyFiguresLabel: 'Le projet en chiffres',
};

/* ---------- Objectifs ---------- */

export const objectivesSection: SectionHeaderContent = {
  eyebrow: 'Pourquoi',
  title: 'Cinq objectifs, *une seule boussole* : l’humain',
};

export const objectives: Objective[] = [
  { icon: 'GraduationCap', tone: 'green', text: 'Développer les compétences numériques et métier de chaque salarié.' },
  { icon: 'Handshake', tone: 'earth', text: 'Faciliter la transmission des savoir-faire entre générations.' },
  { icon: 'Timer', tone: 'water', text: 'Réduire les tâches répétitives grâce à l’IA.' },
  { icon: 'Heart', tone: 'coral', text: 'Préserver les compétences humaines : écoute, empathie, conseil, décision.' },
  { icon: 'Sprout', tone: 'leaf', text: 'Accompagner l’évolution des métiers sans fragiliser personne.' },
];

/* ---------- Les 5 actions ---------- */

export const actionsSection: SectionHeaderContent = {
  eyebrow: 'Quoi',
  title: 'Les 5 actions *innovantes*',
  lead: 'Chacune répond à un besoin précis. Ensemble, elles forment un parcours complet.',
};

export const actionsUi = { more: 'En savoir plus' };

export const actionSummaries: ActionSummary[] = [
  { number: 1, name: 'Le copilote Groupama', icon: 'Bot', href: '/grandir#copilote', text: 'Un assistant IA sécurisé, adapté à chaque métier. Il facilite le quotidien sans remplacer la décision humaine.' },
  { number: 2, name: 'La Skill Academy', icon: 'GraduationCap', href: '/grandir#parcours-ia', text: 'Une formation interne à l’IA en 3 niveaux : découverte, utilisation professionnelle, maîtrise avancée.' },
  { number: 3, name: 'Le Binôme 360', icon: 'Handshake', href: '/grandir#entraide', text: 'Un salarié expérimenté et un collègue à l’aise avec le numérique apprennent l’un de l’autre.' },
  { number: 4, name: 'Le Lab IA', icon: 'Lightbulb', href: '/grandir#lab', text: 'Chacun peut proposer et tester une idée. Les meilleures sont récompensées et déployées.' },
  { number: 5, name: 'Le Passeport compétences', icon: 'Award', href: '/parcours#passeport', text: 'Un espace personnel pour suivre ses formations, ses compétences et son évolution.' },
];

/* ---------- Calendrier ---------- */

export const timelineSection: SectionHeaderContent = {
  eyebrow: 'Quand',
  title: 'Douze mois pour *prendre racine*',
  lead: 'On commence petit, on mesure, on ajuste, puis on généralise.',
};

export const phases: Phase[] = [
  { months: 'Mois 1–2', title: 'Diagnostic', text: 'Cartographier les métiers et les compétences.' },
  { months: 'Mois 3–4', title: 'Conception', text: 'Choisir les outils et construire les formations.' },
  { months: 'Mois 5–7', title: 'Expérimentation', text: 'Tester avec 200 salariés pilotes.' },
  { months: 'Mois 8–10', title: 'Évaluation', text: 'Mesurer les résultats et ajuster.' },
  { months: 'Mois 11–12', title: 'Déploiement', text: 'Étendre progressivement à tous.' },
];

/* ---------- Budget ---------- */

export const budgetSection: SectionHeaderContent & { total: string; totalLabel: string; caption: string; note: string } = {
  eyebrow: 'Combien',
  title: 'Un budget *maîtrisé*, année après année',
  lead: 'Un déploiement progressif pour maîtriser les investissements, mesurer les résultats et adapter les dépenses aux besoins de Groupama.',
  caption: 'Budget prévisionnel de CAP IA par année, en euros',
  total: '500 000 €',
  totalLabel: 'Total sur 5 ans',
  note: 'Budget prévisionnel proposé par le Groupe 15, à affiner avec les équipes Groupama.',
};

export const budgetYears: BudgetYear[] = [
  { year: 'Année 1', amount: 130000, text: 'Lancement, pilote avec 200 salariés, outils et premières formations' },
  { year: 'Année 2', amount: 100000, text: 'Extension à de nouveaux services, nouvelles formations' },
  { year: 'Année 3', amount: 120000, text: 'Généralisation progressive, copilote enrichi' },
  { year: 'Année 4', amount: 80000, text: 'Outils perfectionnés, accompagnement des compétences' },
  { year: 'Année 5', amount: 70000, text: 'Maintenance, formations mises à jour, bilan global' },
];

/* ---------- Indicateurs ---------- */

export const kpiSection: SectionHeaderContent = {
  eyebrow: 'Comment on mesure',
  title: 'Nos *indicateurs* de réussite',
  lead: 'Les cibles fixées pour la phase pilote.',
};

export const kpis: Kpi[] = [
  { value: '200', label: 'salariés engagés dans le pilote', icon: 'Users' },
  { value: '100 %', label: 'des participants formés aux bases de l’IA', icon: 'GraduationCap' },
  { value: '85 %', label: 'de satisfaction', icon: 'ThumbsUp' },
  { value: '70 %', label: 'd’utilisateurs réguliers', icon: 'Repeat' },
  { value: '30 min', label: 'gagnées par semaine et par salarié sur les tâches ciblées', icon: 'Timer' },
  { value: '100', label: 'participants aux actions de partage de savoir-faire', icon: 'Handshake' },
  { value: '0', label: 'incident grave de confidentialité', icon: 'ShieldCheck' },
];

/* ---------- Cadre & facteurs clés ---------- */

export const frameworkSection: SectionHeaderContent = {
  eyebrow: 'Dans quel cadre',
  title: 'Un projet *bien encadré*',
  lead: 'La réussite de CAP IA repose sur trois piliers, et sur le respect strict des règles qui s’appliquent à l’assurance.',
};

export const successPillars: Pillar[] = [
  { title: 'Gouvernance', icon: 'Scale', tone: 'green', items: ['L’humain reste dans la boucle', 'La décision finale appartient au salarié', 'Les modèles sont contrôlés en permanence'] },
  { title: 'Conformité', icon: 'ShieldCheck', tone: 'water', items: ['RGPD', 'AI Act européen', 'Exigences de l’ACPR'] },
  { title: 'Formation', icon: 'GraduationCap', tone: 'coral', items: ['Des parcours adaptés à chaque métier', 'Des cas pratiques tirés du portefeuille Groupama', 'Un référent IA dans chaque équipe'] },
];

export const legalLabel = 'Cadre juridique et réglementaire';

export const legalFramework: { name: string; text: string }[] = [
  { name: 'RGPD', text: 'Protection des données personnelles.' },
  { name: 'AI Act', text: 'Formation des utilisateurs à l’IA et encadrement des usages à risque.' },
  { name: 'Code du travail', text: 'Information et accompagnement des salariés.' },
  { name: 'DORA', text: 'Gestion des risques numériques et des prestataires.' },
  { name: 'Cybersécurité', text: 'Protection des outils et des données.' },
];

export const charterLink: Cta = { label: 'Lire notre charte IA', href: '/charte', icon: 'ArrowRight', variant: 'secondary' };

/* ---------- Résultats & bénéfices ---------- */

export const outcomesSection: SectionHeaderContent & { benefitsTitle: string; resultsTitle: string } = {
  eyebrow: 'Ce qui va pousser',
  title: 'Les *fruits* attendus',
  resultsTitle: 'Pour les collaborateurs',
  benefitsTitle: 'Pour Groupama',
};

export const results: string[] = [
  'Des salariés plus autonomes et mieux formés',
  'Des savoir-faire mieux transmis',
  'Un service de meilleure qualité',
  'Des métiers qui évoluent à leur rythme',
  'Une entreprise plus innovante, fidèle à ses valeurs mutualistes',
];

export const benefits: string[] = [
  'Des risques climatiques et économiques mieux anticipés',
  'Une meilleure expérience sociétaire',
  'Des compétences stratégiques développées',
  'Des parcours de carrière accélérés',
  'Une mobilité interne renforcée',
  'Une performance économique durable',
  'Un modèle mutualiste et de proximité renforcé',
];

export const projetFinal = {
  title: 'Passer d’une assurance qui *indemnise* à une assurance qui *anticipe*.',
  lead: 'Notre vision pour 2030 : anticiper les risques, faire grandir les compétences, accompagner les sociétaires dans la durée.',
  ctas: [
    { label: 'Cultiver mes compétences', href: '/parcours', variant: 'light', icon: 'Sprout' },
    { label: 'Voir l’IA prédictive', href: '/anticiper#echelles', variant: 'ghostLight', icon: 'ArrowRight' },
  ] as Cta[],
};
