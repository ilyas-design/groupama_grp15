import { Button, Card, Icon, Tag, cn } from '@/components/ui';
import { levels, nextStep, progress } from '@/content/parcours';
import { ProgressRing } from './ProgressRing';

/** Anneau de progression + prochaine étape (CTA) + frise des 4 niveaux. */
export function LevelCard() {
  const currentIdx = levels.findIndex((l) => l.id === progress.current);

  return (
    <Card id={nextStep.id} className="scroll-mt-24">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
        <ProgressRing value={progress.value} caption={progress.toLabel} label={progress.ringLabel} />
        <div className="text-center sm:text-left">
          <h2 className="h3">{nextStep.title}</h2>
          <p className="mb-3.5 mt-1.5 text-sm text-ink-2">{nextStep.text}</p>
          <Tag tone="leaf" icon="CheckCircle2">{nextStep.tag}</Tag>
          <div className="mt-4">
            <Button href={nextStep.cta.href} size="sm" icon={nextStep.cta.icon}>
              {nextStep.cta.label}
            </Button>
          </div>
        </div>
      </div>

      <ol aria-label={progress.levelsLabel} className="mt-6 grid grid-cols-4 gap-2 border-t border-line pt-5">
        {levels.map((l, i) => {
          const state = i < currentIdx ? 'done' : i === currentIdx ? 'current' : 'next';
          return (
            <li key={l.id} className="flex flex-col items-center gap-1.5 text-center" aria-current={state === 'current' ? 'step' : undefined}>
              <span
                className={cn(
                  'grid h-10 w-10 place-items-center rounded-full border-2',
                  state === 'done' && 'border-green-700 bg-green-700 text-white',
                  state === 'current' && 'border-green-700 bg-leaf-lt text-green-800',
                  state === 'next' && 'border-dashed border-line bg-sand text-ink-2',
                )}
              >
                <Icon name={state === 'done' ? 'Check' : l.icon} className="h-5 w-5" />
              </span>
              <span className={cn('text-xs font-bold', state === 'next' ? 'text-ink-2' : 'text-ink')}>{l.label}</span>
              <span className="text-[11px] text-ink-2">{progress.states[state]}</span>
            </li>
          );
        })}
      </ol>
    </Card>
  );
}
