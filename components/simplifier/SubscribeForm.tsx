'use client';

import { useId, useState, type FormEvent } from 'react';
import { Button, Icon, cn } from '@/components/ui';
import type { WatchContent } from '@/content/simplifier';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Abonnement « synthèse du lundi » : validation simple, aucun envoi réseau. */
export function SubscribeForm({ form }: { form: WatchContent['form'] }) {
  const uid = useId();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const v = email.trim();
    if (!v) return setError(form.errorEmpty);
    if (!EMAIL.test(v)) return setError(form.errorInvalid);
    setError('');
    setDone(true);
  };

  return (
    <div className="rounded-card bg-water-lt p-5 sm:p-6">
      <h3 id={`${uid}-t`} className="flex items-center gap-2 text-lg font-extrabold text-ink">
        <Icon name="Calendar" className="h-5 w-5 text-water-dk" />
        {form.title}
      </h3>
      <p className="mt-1 text-sm text-ink-2">{form.text}</p>

      <div role="status" aria-live="polite">
        {done && (
          <p className="mt-4 flex items-start gap-2 rounded-[12px] bg-white p-4 text-sm font-semibold text-green-800">
            <Icon name="CheckCircle2" className="mt-0.5 h-5 w-5 flex-none" />
            {form.success}
          </p>
        )}
      </div>

      {!done && (
        <form noValidate onSubmit={submit} aria-labelledby={`${uid}-t`} className="mt-4">
          <label htmlFor={`${uid}-email`} className="mb-1.5 block text-sm font-bold text-ink">
            {form.label}
          </label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              id={`${uid}-email`}
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              value={email}
              placeholder={form.placeholder}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={error ? true : undefined}
              aria-describedby={cn(error && `${uid}-err`, `${uid}-help`)}
              className={cn(
                'min-w-0 flex-1 rounded-full border bg-white px-5 py-3 text-[15px] text-ink placeholder:text-ink-2/70',
                error ? 'border-coral-dk' : 'border-line',
              )}
            />
            <Button type="submit" icon="Send">
              {form.submit}
            </Button>
          </div>
          {error && (
            <p id={`${uid}-err`} className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-coral-dk">
              <Icon name="AlertTriangle" className="h-4 w-4" />
              {error}
            </p>
          )}
          <p id={`${uid}-help`} className="mt-2 text-xs text-ink-2">
            {form.privacy}
          </p>
        </form>
      )}
    </div>
  );
}
