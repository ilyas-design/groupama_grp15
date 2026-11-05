'use client';

import { useEffect, useRef, useState } from 'react';
import { Icon, cn } from '@/components/ui';
import { copyUi } from '@/content/grandir';

type Status = 'idle' | 'copied' | 'error';

/** Copie un prompt dans le presse-papiers, avec retour visuel et annonce vocale. */
export function CopyPromptButton({ text }: { text: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus('copied');
    } catch {
      setStatus('error');
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus('idle'), 2200);
  }

  const label = status === 'copied' ? copyUi.copied : status === 'error' ? copyUi.error : copyUi.copy;

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className={cn(
          'inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-colors',
          status === 'copied'
            ? 'border-green-700 bg-green-700 text-white'
            : 'border-line bg-white text-green-800 hover:border-green-700',
        )}
      >
        <Icon name={status === 'copied' ? 'Check' : status === 'error' ? 'AlertTriangle' : 'FileText'} className="h-4 w-4" />
        {label}
      </button>
      <span role="status" className="sr-only">
        {status === 'copied' ? copyUi.announceCopied : status === 'error' ? copyUi.announceError : ''}
      </span>
    </>
  );
}
