import type { Link } from '@/lib/types';
import { defaultReply, intents } from '@/content/assistant';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  link?: Link;
}

/** Minuscules + suppression des accents, pour comparer aux mots-clés. */
function normalize(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’']/g, ' ');
}

/** Réponse scriptée : l'intention dont le plus de mots-clés apparaissent dans la question. */
export function scriptedReply(question: string): { content: string; link?: Link } {
  const q = normalize(question);
  let best = defaultReply;
  let bestScore = 0;
  for (const intent of intents) {
    const score = intent.keywords.filter((k) => q.includes(k)).length;
    if (score > bestScore) {
      best = intent;
      bestScore = score;
    }
  }
  return { content: best.reply, link: best.link };
}

const TIMEOUT_MS = 12000;

/**
 * Demande une réponse à /api/chat (API Claude si configurée côté serveur).
 * Repli sur les réponses scriptées si la route est absente (export statique),
 * en erreur, ou si elle renvoie { mode: 'scripted' }.
 */
export async function getReply(history: ChatMessage[]): Promise<{ content: string; link?: Link }> {
  const last = history[history.length - 1]?.content ?? '';
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history.map(({ role, content }) => ({ role, content })) }),
      signal: controller.signal,
    });
    if (res.ok) {
      const data: unknown = await res.json();
      if (data && typeof data === 'object' && 'mode' in data && data.mode === 'claude' && 'reply' in data && typeof data.reply === 'string' && data.reply.trim()) {
        return { content: data.reply };
      }
    }
  } catch {
    // Pas d'API (export statique) ou réseau indisponible → réponses scriptées.
  } finally {
    clearTimeout(timer);
  }
  // Petit délai pour que l'indicateur de saisie reste perceptible.
  await new Promise((r) => setTimeout(r, 650));
  return scriptedReply(last);
}
