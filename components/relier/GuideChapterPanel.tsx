'use client';

import { useState } from 'react';
import { Button, Icon, IconBox, Tag, cn } from '@/components/ui';
import { guideUi, type GuideChapter } from '@/content/relier';

interface GuideChapterPanelProps {
  chapter: GuideChapter;
  number: number;
  onPrev?: () => void;
  onNext?: () => void;
}

/** Contenu d'un chapitre : intro, À faire / À éviter, exemple, retour, navigation. */
export function GuideChapterPanel({ chapter, number, onPrev, onNext }: GuideChapterPanelProps) {
  const [feedback, setFeedback] = useState(false);

  return (
    <>
      <div className="flex items-start gap-4">
        <IconBox icon={chapter.icon} tone="earth" size="lg" className="hidden sm:grid" />
        <div>
          <Tag tone="earth" icon="Clock">
            {guideUi.chapterLabel} {number} · {guideUi.duration}
          </Tag>
          <h3 className="mt-3 font-serif text-2xl font-semibold sm:text-[1.75rem]">{chapter.title}</h3>
          <p className="mt-2 text-base text-ink-2">{chapter.intro}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-3.5 sm:grid-cols-2">
        <DoList title={guideUi.doTitle} items={chapter.dos} kind="do" />
        <DoList title={guideUi.dontTitle} items={chapter.donts} kind="dont" />
      </div>

      <figure className="mt-5 rounded-card border border-dashed border-earth/60 bg-sand p-5">
        <figcaption className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.08em] text-earth-dk">
          <Icon name="Lightbulb" className="h-4 w-4" />
          {guideUi.exampleTitle}
        </figcaption>
        <dl className="grid gap-3 text-[15px] md:grid-cols-2">
          <div className="rounded-xl bg-white p-4">
            <dt className="mb-1 text-xs font-bold text-coral-dk">{guideUi.badLabel}</dt>
            <dd className="text-ink-2">« {chapter.example.bad} »</dd>
          </div>
          <div className="rounded-xl bg-white p-4 ring-1 ring-leaf/50">
            <dt className="mb-1 text-xs font-bold text-green-800">{guideUi.goodLabel}</dt>
            <dd className="text-ink">« {chapter.example.good} »</dd>
          </div>
        </dl>
        <p className="mt-3 text-sm text-ink-2">{chapter.example.note}</p>
      </figure>

      <div className="mt-6 flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2 text-sm text-ink-2" aria-live="polite">
          {feedback ? (
            <span className="font-semibold text-green-800">{guideUi.feedbackThanks}</span>
          ) : (
            <>
              <span>{guideUi.feedbackQuestion}</span>
              <Button size="sm" variant="secondary" iconLeft="ThumbsUp" onClick={() => setFeedback(true)}>
                {guideUi.feedbackYes}
              </Button>
              <Button size="sm" variant="secondary" onClick={() => setFeedback(true)}>
                {guideUi.feedbackNo}
              </Button>
            </>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {onPrev && (
            <Button size="sm" variant="secondary" onClick={onPrev}>
              {guideUi.prev}
            </Button>
          )}
          {onNext && (
            <Button size="sm" icon="ArrowRight" onClick={onNext}>
              {guideUi.next}
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

function DoList({ title, items, kind }: { title: string; items: string[]; kind: 'do' | 'dont' }) {
  const isDo = kind === 'do';
  return (
    <div className={cn('rounded-card p-5', isDo ? 'bg-leaf-lt' : 'bg-coral-lt')}>
      <h4 className={cn('mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.08em]', isDo ? 'text-green-800' : 'text-coral-dk')}>
        <Icon name={isDo ? 'Check' : 'X'} className="h-4 w-4" />
        {title}
      </h4>
      <ul className="space-y-2 text-[15px] text-ink">
        {items.map((it) => (
          <li key={it} className="flex gap-2">
            <Icon name={isDo ? 'CheckCircle2' : 'Ban'} className={cn('mt-0.5 h-4 w-4 flex-none', isDo ? 'text-green-700' : 'text-coral-dk')} />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
