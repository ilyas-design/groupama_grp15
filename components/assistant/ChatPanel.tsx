'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Icon, cn } from '@/components/ui';
import { assistantUi, suggestions } from '@/content/assistant';
import type { ChatMessage } from './reply';
import { TypingDots } from './TypingDots';

interface ChatPanelProps {
  id: string;
  messages: ChatMessage[];
  typing: boolean;
  /** Texte annoncé aux lecteurs d'écran (dernière réponse) */
  announce: string;
  onAsk: (q: string) => void;
  onClose: () => void;
}

/** Panneau de conversation non modal (role="dialog"). */
export function ChatPanel({ id, messages, typing, announce, onAsk, onClose }: ChatPanelProps) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const titleId = `${id}-titre`;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim() || typing) return;
    onAsk(value);
    setValue('');
  };

  return (
    <div
      id={id}
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      className="fixed inset-x-2 bottom-[5.5rem] z-[31] flex max-h-[calc(100dvh-7rem)] flex-col overflow-hidden rounded-xl2 bg-white shadow-[0_30px_60px_-20px_rgba(0,0,0,.35)] sm:inset-x-auto sm:bottom-28 sm:right-[max(1.75rem,calc(50%-612px))] sm:w-[370px]"
    >
      <div className="flex items-center gap-3 bg-green-700 px-5 py-4 text-white">
        <span className="grid h-[38px] w-[38px] flex-none place-items-center rounded-full bg-white">
          <Image src="/logo-icon.png" alt="" width={28} height={28} className="h-7 w-7" />
        </span>
        <div className="min-w-0">
          <h2 id={titleId} className="text-base font-bold leading-tight">{assistantUi.title}</h2>
          <p className="text-xs text-white/85">{assistantUi.subtitle}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={assistantUi.closeLabel}
          className="ml-auto grid h-9 w-9 place-items-center rounded-full hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        >
          <Icon name="X" className="h-5 w-5" />
        </button>
      </div>

      <div
        ref={bodyRef}
        aria-label={assistantUi.logLabel}
        role="log"
        aria-live="off"
        tabIndex={0}
        className="flex min-h-[180px] flex-1 flex-col gap-2.5 overflow-y-auto bg-sand p-4 sm:h-[300px] sm:flex-none"
      >
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm',
              m.role === 'user' ? 'ml-auto rounded-br-[4px] bg-green-700 text-white' : 'rounded-bl-[4px] bg-white text-ink',
            )}
          >
            <span className="sr-only">{m.role === 'user' ? assistantUi.youLabel : assistantUi.botLabel} : </span>
            <p className="whitespace-pre-line">{m.content}</p>
            {m.link && (
              <Link href={m.link.href} className="mt-1.5 inline-flex items-center gap-1 font-bold text-green-800 underline-offset-2 hover:underline">
                {m.link.label}
                <Icon name="ArrowRight" className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        ))}
        {typing && <TypingDots label={assistantUi.typing} />}
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {announce}
      </p>

      <ul aria-label={assistantUi.suggestionsLabel} className="flex flex-wrap gap-1.5 px-4 pt-3">
        {suggestions.map((s) => (
          <li key={s.label}>
            <button
              type="button"
              disabled={typing}
              onClick={() => onAsk(s.prompt ?? s.label)}
              className="rounded-full bg-leaf-lt px-3 py-1.5 text-xs font-bold text-green-800 transition-colors hover:bg-green-100 disabled:opacity-60"
            >
              {s.label}
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={submit} className="flex gap-2 px-4 pb-2 pt-3">
        <label htmlFor={`${id}-input`} className="sr-only">
          {assistantUi.inputLabel}
        </label>
        <input
          ref={inputRef}
          id={`${id}-input`}
          type="text"
          value={value}
          maxLength={500}
          autoComplete="off"
          onChange={(e) => setValue(e.target.value)}
          placeholder={assistantUi.placeholder}
          className="min-w-0 flex-1 rounded-full border border-line px-4 py-2.5 text-sm placeholder:text-ink-2 focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-700/30"
        />
        <button
          type="submit"
          aria-label={assistantUi.send}
          disabled={typing || !value.trim()}
          className="grid h-[42px] w-[42px] flex-none place-items-center rounded-full bg-green-700 text-white transition-colors hover:bg-green-800 disabled:opacity-60"
        >
          <Icon name="Send" className="h-[18px] w-[18px]" />
        </button>
      </form>
      <p className="flex items-center gap-1.5 px-4 pb-3.5 text-[11px] text-ink-2">
        <Icon name="Info" className="h-3.5 w-3.5 flex-none" />
        {assistantUi.disclaimer}
      </p>
    </div>
  );
}
