import { Icon, Tabs, Tag } from '@/components/ui';
import type { Draft, RepetitiveContent } from '@/content/simplifier';

function DraftView({ draft, c }: { draft: Draft; c: RepetitiveContent }) {
  return (
    <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
      <article className="overflow-hidden rounded-card border border-line bg-white shadow-soft">
        <header className="border-b border-line bg-sand px-5 py-4 sm:px-6">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Tag tone="water" icon="Sparkles">
              {draft.badge}
            </Tag>
          </div>
          <dl className="grid gap-1 text-sm">
            {draft.meta.map((m) => (
              <div key={m.label} className="flex gap-2">
                <dt className="w-16 flex-none font-bold text-ink-2">{m.label}</dt>
                <dd className="text-ink">{m.value}</dd>
              </div>
            ))}
            <div className="flex gap-2">
              <dt className="w-16 flex-none font-bold text-ink-2">{c.subjectLabel}</dt>
              <dd className="font-bold text-ink">{draft.subject}</dd>
            </div>
          </dl>
        </header>
        <div className="space-y-3 px-5 py-5 text-[15px] leading-relaxed text-ink sm:px-6">
          {draft.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p className="whitespace-pre-line text-ink-2">{draft.signature}</p>
        </div>
      </article>

      <aside className="rounded-card border border-line bg-white p-5 sm:p-6" aria-label={`${c.gainTitle} · ${draft.label}`}>
        <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.1em] text-water-dk">
          <Icon name="Timer" className="h-4 w-4" />
          {c.gainTitle}
        </p>
        <dl className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-[14px] bg-coral-lt p-4">
            <dt className="text-xs font-bold text-coral-dk">{c.beforeLabel}</dt>
            <dd className="mt-1 font-serif text-3xl text-ink">{draft.gain.before}</dd>
          </div>
          <div className="rounded-[14px] bg-leaf-lt p-4">
            <dt className="text-xs font-bold text-green-800">{c.afterLabel}</dt>
            <dd className="mt-1 font-serif text-3xl text-ink">{draft.gain.after}</dd>
          </div>
        </dl>
        <p className="mt-3 text-sm font-semibold text-ink-2">{draft.gain.volume}</p>
      </aside>
    </div>
  );
}

/** Onglets Mails types / Comptes rendus / Relances + règle d'or. */
export function RepetitiveTasks({ content }: { content: RepetitiveContent }) {
  return (
    <div className="space-y-8">
      <div
        role="note"
        className="flex flex-col gap-4 rounded-xl2 bg-ink p-6 text-white sm:flex-row sm:items-center sm:gap-6 sm:p-7"
      >
        <span className="grid h-14 w-14 flex-none place-items-center rounded-[16px] bg-leaf text-ink">
          <Icon name="ShieldCheck" className="h-7 w-7" />
        </span>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-leaf-lt">{content.rule.eyebrow}</p>
          <p className="mt-1 font-serif text-2xl font-semibold sm:text-[1.75rem]">{content.rule.title}</p>
          <p className="mt-1 text-white/80">{content.rule.text}</p>
        </div>
      </div>
      <Tabs
        label={content.tabsLabel}
        items={content.drafts.map((d) => ({ id: d.id, label: d.label, icon: d.icon, content: <DraftView draft={d} c={content} /> }))}
      />
    </div>
  );
}
