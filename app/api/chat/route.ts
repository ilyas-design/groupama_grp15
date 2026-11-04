/**
 * POST /api/chat — « Le Jardinier IA ».
 *
 * Par défaut (aucune clé) : renvoie { mode: 'scripted' } et le client utilise
 * ses réponses scriptées locales (content/assistant.ts).
 *
 * Pour brancher l'API Claude (déploiement serveur, ex. Vercel — pas l'export statique) :
 *   1. Définir ANTHROPIC_API_KEY dans les variables d'environnement (.env.local ou projet Vercel).
 *   2. Optionnel : ANTHROPIC_MODEL pour changer de modèle (défaut ci-dessous).
 *   3. Redéployer. La clé reste côté serveur, elle n'est jamais envoyée au navigateur.
 *
 * Note : avec STATIC_EXPORT=1 (output: 'export'), cette route doit être retirée du build ;
 * le client se replie alors automatiquement sur les réponses scriptées.
 */

const API_URL = 'https://api.anthropic.com/v1/messages';
const DEFAULT_MODEL = 'claude-sonnet-5-5';
const MAX_MESSAGES = 20;
const MAX_CHARS = 2000;

const SYSTEM_PROMPT = `Tu es « Le Jardinier IA », l'assistant du programme « Cultiver l'IA » de Groupama, destiné aux collaborateurs (conseillers terrain, commerciaux en agence, gestionnaires sinistre, fonctions support).
Ta mission : guider chacun dans l'usage de l'IA au quotidien (prompts, synthèses, tâches répétitives, prévention des risques, formations, charte IA responsable).
Règles impératives :
- L'humain décide toujours : l'IA prépare, résume et trie ; le collaborateur vérifie, décide et conseille. Rappelle-le quand c'est pertinent.
- Ne demande jamais et n'utilise jamais de données personnelles (sociétaires, santé, coordonnées). Si l'utilisateur en partage, invite-le à les retirer et à anonymiser.
- Rappelle de n'utiliser que les outils validés par Groupama et de vérifier toute réponse de l'IA.
- Si tu ne sais pas, dis-le simplement et oriente vers le guide de l'IA ou l'équipe programme IA.
Ton : français, chaleureux, optimiste, concret, phrases courtes, quelques images tirées de la nature (graines, racines, eau, forêt) sans en abuser. Réponds en 2 à 5 phrases.`;

type Role = 'user' | 'assistant';
interface InMessage {
  role: Role;
  content: string;
}

function json(body: unknown, status = 200) {
  return Response.json(body, { status });
}

/** Valide et nettoie la conversation reçue ; null si invalide. */
function parseMessages(body: unknown): InMessage[] | null {
  if (!body || typeof body !== 'object' || !('messages' in body)) return null;
  const raw = (body as { messages: unknown }).messages;
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > MAX_MESSAGES) return null;
  const out: InMessage[] = [];
  for (const m of raw) {
    if (!m || typeof m !== 'object') return null;
    const { role, content } = m as { role?: unknown; content?: unknown };
    if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string') return null;
    const text = content.trim();
    if (!text || text.length > MAX_CHARS) return null;
    out.push({ role, content: text });
  }
  if (out[0].role !== 'user' || out[out.length - 1].role !== 'user') return null;
  return out;
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Requête invalide.' }, 400);
  }
  const messages = parseMessages(body);
  if (!messages) return json({ error: 'Conversation invalide.' }, 400);

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return json({ mode: 'scripted' });

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL ?? DEFAULT_MODEL,
        max_tokens: 600,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });
    if (!res.ok) {
      console.error('[api/chat] Erreur API Claude', res.status);
      return json({ mode: 'scripted' });
    }
    const data = (await res.json()) as { content?: { type: string; text?: string }[] };
    const reply = (data.content ?? [])
      .filter((b) => b.type === 'text' && typeof b.text === 'string')
      .map((b) => b.text)
      .join('\n')
      .trim();
    return reply ? json({ mode: 'claude', reply }) : json({ mode: 'scripted' });
  } catch (err) {
    console.error('[api/chat] Appel impossible', err);
    return json({ mode: 'scripted' });
  }
}
