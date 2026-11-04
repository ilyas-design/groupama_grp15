// Contenu de l'assistant « Le Jardinier IA » (bouton flottant + panneau de chat).
import type { Link } from '@/lib/types';
import { navUser } from '@/content/site';

const firstName = navUser.name.split(' ')[0];

/* ---------- Types locaux ---------- */

export interface ScriptedIntent {
  id: string;
  /** Mots-clés (minuscules, sans accents) déclenchant la réponse */
  keywords: string[];
  reply: string;
  link?: Link;
}

export interface Suggestion {
  label: string;
  /** Texte envoyé (par défaut : label) */
  prompt?: string;
}

/* ---------- Interface ---------- */

export const assistantUi = {
  fabLabel: 'Le Jardinier IA',
  openLabel: 'Ouvrir l’assistant Le Jardinier IA',
  closeLabel: 'Fermer l’assistant',
  title: 'Le Jardinier IA',
  subtitle: 'Votre guide · répond en quelques secondes',
  inputLabel: 'Votre question au Jardinier IA',
  placeholder: 'Posez votre question…',
  send: 'Envoyer',
  suggestionsLabel: 'Suggestions de questions',
  typing: 'Le Jardinier IA écrit…',
  youLabel: 'Vous',
  botLabel: 'Le Jardinier IA',
  disclaimer: 'L’IA peut se tromper : vérifiez toujours.',
  logLabel: 'Conversation avec le Jardinier IA',
};

export const welcome = `Bonjour ${firstName} 🌱 Je peux vous guider dans le programme IA : prompts, données, sinistres, synthèses, formations… Que souhaitez-vous faire ?`;

export const suggestions: Suggestion[] = [
  { label: 'Par où commencer ?' },
  { label: 'Écrire un bon prompt' },
  { label: 'Règles sur les données' },
  { label: 'Mon prochain atelier' },
];

/* ---------- Réponses scriptées (mode hors ligne / export statique) ---------- */

export const intents: ScriptedIntent[] = [
  {
    id: 'start',
    keywords: ['commencer', 'debut', 'debuter', 'demarrer', 'premiers pas', 'graine'],
    reply:
      'Commencez par le niveau Graine : 3 modules de 15 min pour comprendre l’IA et ses règles. Ensuite, place à la pratique avec le Copilote métiers.',
    link: { label: 'Voir le parcours en 4 niveaux', href: '/grandir' },
  },
  {
    id: 'prompt',
    keywords: ['prompt', 'formuler', 'demande', 'question a l', 'rediger une demande'],
    reply:
      'Un bon prompt tient en 4 graines : le rôle (« Tu es conseiller Groupama »), le contexte, la tâche précise et le format attendu. Relisez toujours la réponse avant de l’utiliser.',
    link: { label: 'Guide : bien formuler un prompt', href: '/relier#guide' },
  },
  {
    id: 'data',
    keywords: ['donnee', 'rgpd', 'confidenti', 'personnel', 'sante', 'anonym', 'securite'],
    reply:
      'Uniquement les outils validés par Groupama, jamais de données de santé ni d’informations personnelles d’un sociétaire, et anonymisez dès que possible. Dans le doute, ne partagez pas.',
    link: { label: 'Lire la charte IA', href: '/charte' },
  },
  {
    id: 'claim',
    keywords: ['sinistre', 'declaration', 'indemnis', 'expert', 'grele', 'degat'],
    reply:
      'Sur un sinistre, l’IA pré-analyse le dossier et prépare le suivi. L’écoute, la décision et l’accompagnement du sociétaire restent les vôtres.',
    link: { label: 'Voir « Qui fait quoi »', href: '/relier' },
  },
  {
    id: 'summary',
    keywords: ['synthese', 'resume', 'rapport', 'resumer', 'synthetiser'],
    reply:
      'L’IA transforme un rapport de 40 pages en synthèse claire, chiffres clés surlignés. Vous vérifiez ensuite les 3 points signalés avant de valider.',
    link: { label: 'Essayer la démo synthèse', href: '/simplifier' },
  },
  {
    id: 'training',
    keywords: ['formation', 'atelier', 'module', 'cours', 'apprendre', 'lab', 'hackathon'],
    reply:
      'Prochain atelier : « Mes 10 premiers prompts », le 12 novembre en visio, 18 places restantes. Votre formation en cours : Copilote conseiller (75 %).',
    link: { label: 'Agenda du Lab IA', href: '/grandir#lab' },
  },
  {
    id: 'charter',
    keywords: ['charte', 'regle', 'ethique', 'ai act', 'responsable', 'gouvernance'],
    reply:
      'La charte tient en 4 règles : l’humain décide, transparence, données protégées, sobriété. Simple à retenir, essentiel à appliquer.',
    link: { label: 'Charte IA responsable', href: '/charte' },
  },
  {
    id: 'path',
    keywords: ['parcours', 'niveau', 'progression', 'passeport', 'badge', 'competence', 'foret'],
    reply:
      'Vous êtes au niveau Arbre, à 64 % de la Forêt. Prochaine étape : partager encore 1 prompt utile avec votre équipe pour débloquer le badge Créateur.',
    link: { label: 'Mon passeport', href: '/parcours#passeport' },
  },
  {
    id: 'mail',
    keywords: ['mail', 'courriel', 'relance', 'compte rendu', 'administratif'],
    reply:
      'L’IA peut pré-rédiger mails types, comptes rendus et relances à partir du dossier. Règle d’or : rien ne part sans votre relecture.',
    link: { label: 'Voir les tâches répétitives', href: '/simplifier' },
  },
  {
    id: 'hello',
    keywords: ['bonjour', 'salut', 'hello', 'merci', 'coucou'],
    reply: `Avec plaisir, ${firstName} ! Posez-moi une question sur les prompts, les données, les formations ou votre parcours.`,
  },
];

export const defaultReply: ScriptedIntent = {
  id: 'default',
  keywords: [],
  reply:
    'Bonne question ! Je n’ai pas encore de réponse toute prête. Le guide de l’IA couvre l’essentiel, et l’équipe programme IA peut vous aider pour le reste.',
  link: { label: 'Ouvrir le guide de l’IA', href: '/relier#guide' },
};
