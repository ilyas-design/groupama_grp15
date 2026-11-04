'use client';

import { useState } from 'react';
import { Icon, Tag, cn } from '@/components/ui';
import type { Tone } from '@/lib/types';
import { entraideSection as ui, posts, type PostType } from '@/content/grandir';

const avatar: Record<Tone, string> = {
  green: 'from-green-500 to-green-800',
  leaf: 'from-leaf-dk to-water-dk',
  water: 'from-water-dk to-blue-800',
  teal: 'from-teal to-teal-dk',
  earth: 'from-earth-dk to-coral-dk',
  coral: 'from-coral-dk to-earth-dk',
  ink: 'from-ink-2 to-ink',
  sand: 'from-earth to-earth-dk',
};

const plural = (n: number, f: { one: string; other: string }) => (n === 1 ? f.one : f.other.replace('{n}', String(n)));

/** Action 3 — fil de partage filtrable, avec bouton « Utile » (une fois par post). */
export function EntraideFeed() {
  const [filter, setFilter] = useState<PostType | 'all'>('all');
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const visible = posts.filter((p) => filter === 'all' || p.type === filter);

  return (
    <div>
      <div role="group" aria-label={ui.filterLabel} className="mb-2 flex flex-wrap gap-2">
        {ui.filters.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              'rounded-full border px-3.5 py-1.5 text-[13px] font-bold transition-colors',
              filter === f.id
                ? 'border-green-700 bg-green-700 text-white'
                : 'border-line bg-white text-ink-2 hover:border-green-700 hover:text-green-800',
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
      <p role="status" className="mb-1 text-xs font-semibold text-ink-2">
        {plural(visible.length, ui.results)}
      </p>
      <ul>
        {visible.map((p) => {
          const on = !!liked[p.id];
          const count = p.useful + (on ? 1 : 0);
          const type = ui.types[p.type];
          return (
            <li key={p.id} className="flex items-start gap-3.5 border-b border-line py-4 last:border-0 sm:gap-4">
              <span
                aria-hidden
                className={cn(
                  'grid h-9 w-9 flex-none place-items-center rounded-full bg-gradient-to-br text-xs font-extrabold text-white',
                  avatar[p.avatarTone],
                )}
              >
                {p.initials}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-[15px] font-extrabold leading-snug">{p.title}</h3>
                <p className="mt-1 text-[13px] text-ink-2">{p.excerpt}</p>
                <p className="mt-1.5 text-xs text-ink-2">
                  {p.author} · {p.role} · {p.when}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <Tag tone={type.tone}>{type.label}</Tag>
                  <Tag>{p.topic}</Tag>
                </div>
              </div>
              <button
                type="button"
                aria-pressed={on}
                aria-label={`${ui.usefulAria} ${p.title} (${count} ${ui.usefulUnit})`}
                onClick={() => setLiked((s) => ({ ...s, [p.id]: !s[p.id] }))}
                className={cn(
                  'flex w-[68px] flex-none flex-col items-center rounded-xl border px-2 py-2 text-[11px] font-bold transition-colors',
                  on ? 'border-green-700 bg-leaf-lt text-green-800' : 'border-line bg-white text-ink-2 hover:border-green-700',
                )}
              >
                <Icon name="ThumbsUp" className={cn('mb-0.5 h-4 w-4', on && 'fill-current')} />
                <span className="text-lg font-extrabold leading-none text-ink">{count}</span>
                <span>{on ? ui.usefulUnit : ui.usefulLabel}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
