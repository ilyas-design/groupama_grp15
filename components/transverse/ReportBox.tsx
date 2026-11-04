import { Button, Icon, IconBox, Reveal, RichText, WaterFlow } from '@/components/ui';
import type { ReportBoxContent } from '@/content/transverse';

/** Encadré « Signaler un usage problématique » (fond sombre signature). */
export function ReportBox({ report }: { report: ReportBoxContent }) {
  const headingId = `${report.id}-titre`;
  return (
    <section id={report.id} aria-labelledby={headingId} className="scroll-mt-24">
      <Reveal className="relative overflow-hidden rounded-xl3 bg-signature-dk p-7 text-white sm:p-10">
        <WaterFlow className="pointer-events-none absolute inset-x-0 bottom-0 h-14" color="#E3F8FF" opacity={0.18} />
        <div className="relative">
          <div className="flex items-center gap-3">
            <IconBox icon={report.icon} tone="coral" />
            <h2 id={headingId} className="font-serif text-[1.75rem] font-semibold leading-tight sm:text-[2.125rem]">
              <RichText text={report.title} emClassName="text-leaf-lt" />
            </h2>
          </div>
          <p className="mt-4 max-w-2xl text-white/85">{report.text}</p>

          <ol className="mt-8 grid gap-4 sm:grid-cols-3">
            {report.steps.map((s, i) => (
              <li key={s.title} className="rounded-card bg-white/10 p-5 ring-1 ring-white/15 backdrop-blur-sm">
                <div className="mb-3 flex items-center gap-2.5">
                  <span aria-hidden className="grid h-7 w-7 place-items-center rounded-full bg-white text-xs font-bold text-green-900">
                    {i + 1}
                  </span>
                  <Icon name={s.icon} className="h-5 w-5 text-leaf-lt" />
                </div>
                <h3 className="mb-1 font-extrabold">{s.title}</h3>
                <p className="text-sm text-white/80">{s.text}</p>
              </li>
            ))}
          </ol>

          <p className="mt-6 flex items-start gap-2 text-sm text-white/85">
            <Icon name="ShieldCheck" className="mt-0.5 h-4 w-4 flex-none text-leaf-lt" />
            {report.reassurance}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            {report.ctas.map((c) => (
              <Button
                key={c.label}
                href={c.href}
                variant={c.variant ?? 'light'}
                icon={c.icon}
                className={c.variant === 'ghost' ? '!text-white hover:!text-leaf-lt' : undefined}
              >
                {c.label}
              </Button>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
