import { Card, Icon, cn, toneSoft } from '@/components/ui';
import { passport } from '@/content/parcours';

/** Badges du passeport compétences (ancre #passeport), dont badges verrouillés. */
export function PassportBadges() {
  return (
    <Card id={passport.id} className="scroll-mt-24" as="section">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="h3" id={`${passport.id}-titre`}>{passport.title}</h2>
        <p className="text-sm font-semibold text-ink-2">{passport.lead}</p>
      </div>
      <ul className="grid grid-cols-2 gap-3 min-[420px]:grid-cols-4" aria-labelledby={`${passport.id}-titre`}>
        {passport.badges.map((b) => (
          <li
            key={b.id}
            title={b.detail}
            className={cn(
              'flex flex-col items-center rounded-2xl px-2 py-4 text-center',
              b.locked ? 'border border-dashed border-ink-2/40 bg-sand' : 'bg-sand',
            )}
          >
            <span
              className={cn(
                'relative mb-2.5 grid h-[54px] w-[54px] place-items-center rounded-full',
                b.locked ? 'bg-sand-2 text-ink-2' : toneSoft[b.tone],
              )}
            >
              <Icon name={b.icon} className={cn('h-6 w-6', b.locked && 'opacity-50')} />
              {b.locked && (
                <span className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-ink text-white">
                  <Icon name="Lock" className="h-3.5 w-3.5" />
                </span>
              )}
            </span>
            <span className={cn('text-xs font-bold', b.locked ? 'text-ink-2' : 'text-ink')}>{b.label}</span>
            <span className={cn('mt-0.5 text-[11px] font-semibold', b.locked ? 'text-ink-2' : 'text-green-800')}>
              {b.locked ? passport.lockedLabel : passport.earnedLabel}
            </span>
            <span className="sr-only">{b.detail}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
