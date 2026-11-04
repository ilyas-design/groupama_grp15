import Link from 'next/link';
import { Icon, IconBox, Reveal, Section, SectionHeader } from '@/components/ui';
import { keyMessages, keyMessagesHeader, type Segment } from '@/content/relier';

function Sentence({ segments }: { segments: Segment[] }) {
  return (
    <>
      {segments.map((s, i) =>
        s.strong ? (
          <strong key={i} className="font-extrabold text-green-800">
            {s.text}
          </strong>
        ) : (
          <span key={i}>{s.text}</span>
        ),
      )}
    </>
  );
}

/** Les 4 messages clés validés. */
export function KeyMessages() {
  return (
    <Section bg="white" aria-labelledby="messages-titre" className="border-y border-line">
      <SectionHeader id="messages-titre" {...keyMessagesHeader} />
      <ul className="grid gap-5 sm:grid-cols-2">
        {keyMessages.map((m, i) => (
          <Reveal as="li" key={m.id} delay={i * 0.08} className="flex gap-5 rounded-xl2 border border-line bg-sand p-6 sm:p-7">
            <IconBox icon={m.icon} tone={m.tone} />
            <div className="flex flex-col gap-3">
              <p className="font-serif text-xl leading-snug text-ink sm:text-[1.375rem]">
                <Sentence segments={m.segments} />
              </p>
              {m.link && (
                <Link href={m.link.href} className="inline-flex items-center gap-1.5 text-sm font-bold text-green-800 underline-offset-4 hover:underline">
                  {m.link.label}
                  <Icon name="ArrowRight" className="h-4 w-4" />
                </Link>
              )}
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
