import { Card, Icon, PhotoPlaceholder, Reveal, Section, SectionHeader, Tag } from '@/components/ui';
import { copilotSection, copilots } from '@/content/grandir';
import { CopyPromptButton } from './CopyPromptButton';

/** Action 1 — un copilote par métier, avec exemple de prompt copiable. */
export function CopilotSection() {
  return (
    <Section id="copilote" aria-labelledby="copilote-titre" className="!pt-10 lg:!pt-12">
      <SectionHeader id="copilote-titre" eyebrow={copilotSection.eyebrow} title={copilotSection.title} lead={copilotSection.lead} />
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {copilots.map((c, i) => (
          <Reveal as="li" key={c.id} delay={i * 0.08} className="flex">
            <Card padding="none" interactive className="flex w-full flex-col overflow-hidden">
              <PhotoPlaceholder caption={c.photo.caption} src={c.photo.src} tone={c.photo.tone} heightClass="min-h-[160px]" className="!rounded-none" />
              <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
                <Tag tone={c.tag.tone} icon={c.icon} className="w-fit">
                  {c.tag.label}
                </Tag>
                <div>
                  <h3 className="h3">{c.role}</h3>
                  <p className="mt-1.5 text-sm text-ink-2">{c.summary}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.1em] text-ink-2">{copilotSection.missionsLabel}</p>
                  <ul className="space-y-1.5 text-sm text-ink">
                    {c.missions.map((m) => (
                      <li key={m} className="flex items-start gap-2">
                        <Icon name="Check" className="mt-0.5 h-4 w-4 flex-none text-green-700" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
                <figure className="mt-auto space-y-3">
                  <figcaption className="text-xs font-extrabold uppercase tracking-[0.1em] text-ink-2">{copilotSection.promptLabel}</figcaption>
                  <blockquote className="rounded-xl bg-sand px-3.5 py-3 text-[13px] italic text-ink-2">« {c.prompt} »</blockquote>
                  <CopyPromptButton text={c.prompt} />
                </figure>
              </div>
            </Card>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
