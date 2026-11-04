import { Fragment } from 'react';
import { Icon, cn, toneSolid } from '@/components/ui';
import { equation } from '@/content/home';

/** Bandeau « + IA → + Compétences → + Protection des sociétaires ». */
export function Equation() {
  return (
    <section aria-label={equation.label} className="px-4 pt-5 sm:px-6 lg:px-12">
      <div className="mx-auto flex max-w-[1184px] flex-col gap-5 rounded-xl2 bg-ink px-6 py-7 text-white sm:px-10 lg:flex-row lg:items-center lg:justify-between">
        <p className="flex flex-col gap-3 text-lg font-extrabold sm:flex-row sm:flex-wrap sm:items-center sm:gap-3.5 sm:text-[22px]">
          {equation.steps.map((s, i) => {
            const [plus, ...rest] = s.split(' ');
            return (
              <Fragment key={s}>
                {i > 0 && <Icon name="ArrowRight" className="hidden h-6 w-6 opacity-50 sm:block" />}
                <span className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className={cn('grid h-[38px] w-[38px] flex-none place-items-center rounded-xl text-[22px] text-ink', toneSolid[equation.tones[i]])}
                  >
                    {plus}
                  </span>
                  <span className="sr-only">{plus} </span>
                  {rest.join(' ')}
                </span>
              </Fragment>
            );
          })}
        </p>
        <p className="max-w-[280px] text-sm text-white/75">{equation.text}</p>
      </div>
    </section>
  );
}
