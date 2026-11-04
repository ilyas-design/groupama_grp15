import { Icon, IconBox, Reveal, cn } from '@/components/ui';
import type { TrainingStep } from '@/content/anticiper';

interface TrainingStepsProps {
  steps: TrainingStep[];
}

/** Entraînement en 4 étapes, bandeau continu sur desktop (cf. `.steps4` de la maquette). */
export function TrainingSteps({ steps }: TrainingStepsProps) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
      {steps.map((s, i) => (
        <Reveal
          as="li"
          key={s.title}
          delay={i * 0.08}
          className={cn(
            'relative rounded-[20px] border border-line bg-white p-6 lg:rounded-none',
            i === 0 && 'lg:rounded-l-[20px]',
            i === steps.length - 1 && 'lg:rounded-r-[20px]',
            i > 0 && 'lg:border-l-0',
          )}
        >
          <div className="mb-3 flex items-center justify-between">
            <span aria-hidden className="font-serif text-[32px] font-semibold leading-none text-water">
              {String(i + 1).padStart(2, '0')}
            </span>
            <IconBox icon={s.icon} tone="water" size="sm" />
          </div>
          <h3 className="mb-1.5 text-[17px] font-extrabold">{s.title}</h3>
          <p className="text-sm text-ink-2">{s.text}</p>
          {i < steps.length - 1 && (
            <span
              aria-hidden
              className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 place-items-center rounded-full border border-line bg-white text-xs text-water-dk lg:grid"
            >
              <Icon name="ArrowRight" className="h-3.5 w-3.5" />
            </span>
          )}
        </Reveal>
      ))}
    </ol>
  );
}
