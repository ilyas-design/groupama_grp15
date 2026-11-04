import { Icon, Reveal, Tag, cn } from '@/components/ui';
import type { LinkSide, linkSchema as LinkSchemaContent } from '@/content/anticiper';

interface RiskContractLinkProps {
  content: typeof LinkSchemaContent;
}

const emphasis = { risk: 'text-coral-dk', ok: 'text-green-700' };

function SideCard({ side, tone, footer }: { side: LinkSide; tone: 'coral' | 'leaf'; footer?: string }) {
  return (
    <div className="rounded-[20px] border border-line bg-white p-6 shadow-soft">
      <Tag tone={tone} icon={side.tagIcon}>
        {side.tag}
      </Tag>
      <h3 className="h3 mb-2.5 mt-3">{side.title}</h3>
      <dl>
        {side.rows.map((r) => (
          <div key={r.label} className="flex justify-between gap-4 border-b border-dashed border-line py-2.5 text-sm last:border-0">
            <dt className="text-ink-2">{r.label}</dt>
            <dd className={cn('text-right font-bold', r.emphasis && emphasis[r.emphasis])}>{r.value}</dd>
          </div>
        ))}
      </dl>
      {footer && (
        <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-green-700 px-3 py-1.5 text-xs font-bold text-white">
          <Icon name="UserCheck" className="h-4 w-4" />
          {footer}
        </p>
      )}
    </div>
  );
}

/** Ligne d'eau animée : horizontale sur desktop, verticale sur mobile. */
function Connector() {
  return (
    <span aria-hidden className="flex items-center justify-center">
      <svg viewBox="0 0 64 16" className="hidden h-4 w-16 lg:block" fill="none">
        <path d="M0 8 Q16 2 32 8 T64 8" stroke="var(--water)" strokeWidth="3" strokeLinecap="round" className="flow-dash" />
      </svg>
      <svg viewBox="0 0 16 48" className="h-12 w-4 lg:hidden" fill="none">
        <path d="M8 0 Q2 12 8 24 T8 48" stroke="var(--water)" strokeWidth="3" strokeLinecap="round" className="flow-dash" />
      </svg>
    </span>
  );
}

/** Schéma fiche risque → nœud IA → recommandation contrat validée par le conseiller. */
export function RiskContractLink({ content }: RiskContractLinkProps) {
  return (
    <figure>
      <div className="grid items-center lg:grid-cols-[1fr_auto_1fr]">
        <Reveal>
          <SideCard side={content.risk} tone="coral" />
        </Reveal>
        <div className="flex flex-col items-center lg:flex-row">
          <Connector />
          <Reveal delay={0.15} y={0}>
            <div className="relative grid h-[120px] w-[120px] place-items-center rounded-full bg-ink text-center text-white shadow-lift">
              <span aria-hidden className="absolute inset-[-8px] rounded-full border-2 border-dashed border-water/60" />
              <span>
                <Icon name="Sparkles" className="mx-auto mb-1 h-5 w-5 text-water" />
                <span className="block font-serif text-2xl font-semibold leading-none">{content.node.title}</span>
                <span className="mt-1 block text-xs font-bold">{content.node.sub}</span>
              </span>
            </div>
          </Reveal>
          <Connector />
        </div>
        <Reveal delay={0.3}>
          <SideCard side={content.contract} tone="leaf" footer={content.validated} />
        </Reveal>
      </div>
      <figcaption className="sr-only">{content.flowLabel}</figcaption>
    </figure>
  );
}
