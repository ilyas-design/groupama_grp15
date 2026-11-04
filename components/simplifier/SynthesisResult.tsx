'use client';

import { useId, useState } from 'react';
import { Button, Icon, Tag, cn } from '@/components/ui';
import type { Segment, SynthesisContent } from '@/content/simplifier';

type Status = 'review' | 'editing' | 'validated';

function Segments({ segs }: { segs: Segment[] }) {
  return (
    <>
      {segs.map((s, i) =>
        s.mark ? (
          <mark key={i} className="rounded bg-[#FFF0B3] px-1 font-bold text-ink">
            {s.text}
          </mark>
        ) : (
          <span key={i}>{s.text}</span>
        ),
      )}
    </>
  );
}

const plain = (segs: Segment[][] = []) => segs.map((p) => p.map((s) => s.text).join('')).join('\n');

/** Synthèse générée : chiffres surlignés, checklist humaine, Valider / Modifier. */
export function SynthesisResult({ content }: { content: SynthesisContent }) {
  const uid = useId();
  const a = content.actions;
  const [checked, setChecked] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>('review');
  const [edited, setEdited] = useState<string | null>(null);
  const [draft, setDraft] = useState('');
  const [warn, setWarn] = useState(false);
  const allChecked = checked.length === content.checklist.items.length;

  const toggle = (id: string) => {
    setWarn(false);
    setChecked((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));
  };
  const validate = () => (allChecked ? setStatus('validated') : setWarn(true));
  const startEdit = () => {
    setDraft(edited ?? plain(content.sections[0].paragraphs));
    setStatus('editing');
  };
  const save = () => {
    setEdited(draft.trim() || null);
    setStatus('review');
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Tag tone={status === 'validated' ? 'green' : 'water'} icon={status === 'validated' ? 'BadgeCheck' : 'Sparkles'}>
          {status === 'validated' ? a.validated : content.badge}
        </Tag>
        <span className="text-xs text-ink-2">{content.generatedIn}</span>
      </div>

      {content.sections.map((sec, si) => (
        <div key={sec.title}>
          <h3 className="mb-2 mt-4 text-xs font-extrabold uppercase tracking-[0.08em] text-ink-2">{sec.title}</h3>
          {si === 0 && status === 'editing' ? (
            <>
              <label htmlFor={`${uid}-edit`} className="sr-only">
                {a.editLabel}
              </label>
              <textarea
                id={`${uid}-edit`}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                rows={4}
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                className="w-full rounded-[12px] border border-line bg-sand p-3 text-sm text-ink focus:border-water-dk"
              />
            </>
          ) : si === 0 && edited ? (
            <p className="text-sm">
              {edited}
              <span className="ml-2 inline-flex items-center gap-1 text-xs font-bold text-earth-dk">
                <Icon name="Pencil" className="h-3 w-3" />
                {a.editedNote}
              </span>
            </p>
          ) : (
            <>
              {sec.paragraphs?.map((p, i) => (
                <p key={i} className="text-sm">
                  <Segments segs={p} />
                </p>
              ))}
              {sec.items && (
                <ul className="ml-5 list-disc space-y-1 text-sm">
                  {sec.items.map((it, i) => (
                    <li key={i}>
                      <Segments segs={it} />
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      ))}

      <fieldset className="mt-5 rounded-[14px] border border-coral/40 bg-coral-lt/60 p-4 pt-2">
        <legend className="flex items-center gap-1.5 rounded-full bg-coral-lt px-2 text-xs font-extrabold uppercase tracking-[0.08em] text-coral-dk">
          <Icon name="ListChecks" className="h-4 w-4" />
          {content.checklist.title}
        </legend>
        <ul className="mt-1 space-y-2">
          {content.checklist.items.map((it) => {
            const on = checked.includes(it.id);
            return (
              <li key={it.id}>
                <label className="flex cursor-pointer items-start gap-2.5 text-sm text-ink">
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={() => toggle(it.id)}
                    disabled={status === 'validated'}
                    className="mt-0.5 h-4 w-4 flex-none accent-green-700"
                  />
                  <span className={cn(on && 'text-ink-2 line-through decoration-green-700/60')}>{it.label}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {status === 'editing' ? (
          <>
            <Button size="sm" iconLeft="Check" onClick={save}>
              {a.save}
            </Button>
            <Button size="sm" variant="secondary" onClick={() => setStatus('review')}>
              {a.cancel}
            </Button>
          </>
        ) : status === 'validated' ? (
          <>
            <p className="flex items-center gap-2 text-sm font-bold text-green-800">
              <Icon name="CheckCircle2" className="h-5 w-5" />
              {a.validatedHint}
            </p>
            <Button size="sm" variant="ghost" onClick={() => setStatus('review')}>
              {a.reopen}
            </Button>
          </>
        ) : (
          <>
            <Button size="sm" iconLeft="Check" onClick={validate} aria-describedby={`${uid}-warn`}>
              {a.validate}
            </Button>
            <Button size="sm" variant="secondary" iconLeft="Pencil" onClick={startEdit}>
              {a.edit}
            </Button>
          </>
        )}
      </div>
      <p id={`${uid}-warn`} role="status" className={cn('mt-2 text-sm font-semibold', warn ? 'text-coral-dk' : 'sr-only')}>
        {warn ? a.mustCheck : status === 'validated' ? a.validatedHint : ''}
      </p>
    </div>
  );
}
