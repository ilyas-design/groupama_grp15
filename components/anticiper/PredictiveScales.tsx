import { Card, Icon, IconBox, Reveal, Tag } from '@/components/ui';
import { predictiveScales, predictiveUi as ui } from '@/content/anticiper';

/** IA prédictive à trois échelles : sociétaire, portefeuille, stratégie. */
export function PredictiveScales() {
  return (
    <ol className="grid gap-5 lg:grid-cols-3">
      {predictiveScales.map((s, i) => (
        <Reveal as="li" key={s.id} delay={i * 0.1} className="flex">
          <Card className="flex w-full flex-col gap-5">
            <div className="flex items-start justify-between gap-3">
              <IconBox icon={s.icon} tone={s.tone} />
              <Tag tone={s.tone}>{`${i + 1} · ${s.scale}`}</Tag>
            </div>
            <div>
              <h3 className="h3">{s.title}</h3>
              <p className="mt-2 text-sm text-ink-2">
                <b className="text-ink">{ui.goalLabel} : </b>
                {s.goal}
              </p>
            </div>
            <div>
              <h4 className="mb-2 text-xs font-extrabold uppercase tracking-[0.1em] text-ink-2">{s.aiDoesLabel}</h4>
              <ul className="space-y-1.5 text-sm">
                {s.aiDoes.map((a) => (
                  <li key={a} className="flex gap-2">
                    <Icon name="Droplet" className="mt-0.5 h-4 w-4 flex-none text-water-dk" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl bg-leaf-lt p-4">
              <h4 className="mb-2 text-xs font-extrabold uppercase tracking-[0.1em] text-green-800">{s.outcomesLabel}</h4>
              <ul className="space-y-1.5 text-sm text-green-900">
                {s.outcomes.map((o) => (
                  <li key={o} className="flex gap-2">
                    <Icon name="Sprout" className="mt-0.5 h-4 w-4 flex-none" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
            {s.examples && (
              <div className="mt-auto">
                <h4 className="mb-2 text-xs font-extrabold uppercase tracking-[0.1em] text-ink-2">{ui.examplesLabel}</h4>
                <ul className="space-y-1.5 text-sm text-ink-2">
                  {s.examples.map((e) => (
                    <li key={e.label}>
                      <b className="text-ink">{e.label} : </b>
                      {e.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        </Reveal>
      ))}
    </ol>
  );
}
