'use client';

import { useState } from 'react';
import { Button, Tag } from '@/components/ui';
import { labEvents, labSection as ui, type LabEvent } from '@/content/grandir';

function placesText(e: LabEvent, taken: boolean) {
  if (e.places === null) return e.note ?? '';
  if (e.places === 0) return ui.places.none;
  const left = e.places - (taken ? 1 : 0);
  if (left === 0) return ui.places.none;
  return left === 1 ? ui.places.one : ui.places.other.replace('{n}', String(left));
}

/** Action 4 — agenda du Lab IA avec inscription (état local). */
export function LabAgenda() {
  const [reg, setReg] = useState<Record<string, boolean>>({});
  const [announce, setAnnounce] = useState('');

  function toggle(e: LabEvent) {
    const next = !reg[e.id];
    setReg((s) => ({ ...s, [e.id]: next }));
    setAnnounce(`${next ? ui.announceRegistered : ui.announceCancelled} ${e.title}`);
  }

  return (
    <>
      <ul aria-label={ui.agendaLabel} className="space-y-2.5">
        {labEvents.map((e) => {
          const on = !!reg[e.id];
          const full = e.places === 0;
          const places = placesText(e, on);
          return (
            <li key={e.id} className="flex flex-wrap items-center gap-x-4 gap-y-3 rounded-[14px] bg-sand p-3.5">
              <time dateTime={e.dateTime} className="w-14 flex-none rounded-xl bg-white py-2 text-center">
                <b className="block font-serif text-xl leading-none">{e.day}</b>
                <small className="text-[11px] font-bold uppercase text-ink-2">{e.month}</small>
              </time>
              <div className="min-w-0 flex-1 basis-40">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-green-800">{ui.formats[e.format]}</p>
                <h3 className="text-[15px] font-extrabold leading-snug">{e.title}</h3>
                <p className="text-[13px] text-ink-2">
                  {e.location} · {e.duration}
                  {places && ` · ${places}`}
                </p>
              </div>
              <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:flex-col sm:items-end">
                <Tag tone={e.level.tone}>{e.level.label}</Tag>
                <Button
                  size="sm"
                  variant={on ? 'secondary' : 'primary'}
                  iconLeft={on ? 'Check' : undefined}
                  aria-pressed={full ? undefined : on}
                  disabled={full}
                  onClick={() => toggle(e)}
                  className="whitespace-nowrap"
                >
                  {full ? ui.full : on ? ui.registered : ui.register}
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
      <p role="status" className="sr-only">
        {announce}
      </p>
    </>
  );
}
