'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/components/ui';
import { assistantUi, welcome } from '@/content/assistant';
import { ChatPanel } from './ChatPanel';
import { getReply, type ChatMessage } from './reply';

const PANEL_ID = 'jardinier-ia';
const WELCOME_ID = 'welcome';

/** Assistant « Le Jardinier IA » : bouton flottant + panneau de chat (monté dans app/layout.tsx). */
export function Assistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{ id: WELCOME_ID, role: 'assistant', content: welcome }]);
  const [typing, setTyping] = useState(false);
  const [announce, setAnnounce] = useState('');
  const fabRef = useRef<HTMLButtonElement>(null);
  const counter = useRef(0);

  const close = useCallback(() => {
    setOpen(false);
    fabRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  const ask = useCallback(
    async (question: string) => {
      const text = question.trim();
      if (!text || typing) return;
      const userMsg: ChatMessage = { id: `u${++counter.current}`, role: 'user', content: text };
      const history = [...messages, userMsg];
      setMessages(history);
      setTyping(true);
      setAnnounce(assistantUi.typing);
      // L'API attend une conversation qui commence par l'utilisateur : on écarte l'accueil.
      const reply = await getReply(history.filter((m) => m.id !== WELCOME_ID));
      setMessages((prev) => [...prev, { id: `a${++counter.current}`, role: 'assistant', ...reply }]);
      setTyping(false);
      setAnnounce(reply.content);
    },
    [messages, typing],
  );

  return (
    <>
      {open && (
        <ChatPanel
          id={PANEL_ID}
          messages={messages}
          typing={typing}
          announce={announce}
          onAsk={ask}
          onClose={close}
        />
      )}
      <button
        ref={fabRef}
        type="button"
        aria-expanded={open}
        aria-controls={open ? PANEL_ID : undefined}
        aria-label={assistantUi.openLabel}
        onClick={() => (open ? close() : setOpen(true))}
        className={cn(
          'fixed bottom-4 right-4 z-30 flex items-center gap-2.5 rounded-full bg-ink p-2 font-bold text-white shadow-lift transition-transform hover:-translate-y-0.5 sm:bottom-7 sm:right-[max(1.75rem,calc(50%-612px))] sm:py-3 sm:pl-3 sm:pr-5',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700',
        )}
      >
        <span className="grid h-10 w-10 place-items-center rounded-full bg-white sm:h-[34px] sm:w-[34px]">
          <Image src="/logo-icon.png" alt="" width={26} height={26} className="h-6 w-6" />
        </span>
        <span className="hidden text-sm sm:inline" aria-hidden>
          {assistantUi.fabLabel}
        </span>
      </button>
    </>
  );
}
