import { AnimatedRoots, IconBox, Reveal, Section, SectionHeader, WaterFlow } from '@/components/ui';
import type { MetaphorItem } from '@/content/transverse';

interface MetaphorProps {
  eyebrow: string;
  title: string;
  lead: string;
  items: MetaphorItem[];
}

/** La métaphore nature expliquée : eau = IA, racines = collaborateurs, fleurs = talents. */
export function Metaphor({ eyebrow, title, lead, items }: MetaphorProps) {
  return (
    <Section bg="leaf" aria-labelledby="metaphore-titre" className="relative overflow-hidden">
      <SectionHeader id="metaphore-titre" eyebrow={eyebrow} title={title} lead={lead} align="center" />
      <ul className="relative grid gap-5 md:grid-cols-3">
        {items.map((m, i) => (
          <Reveal as="li" key={m.element} delay={i * 0.1} className="relative overflow-hidden rounded-xl2 bg-white p-7 shadow-soft">
            <IconBox icon={m.icon} tone={m.tone} size="lg" />
            <h3 className="mt-5 font-serif text-2xl font-semibold text-ink">
              {m.element} <em className="text-green-700">{m.meaning}</em>
            </h3>
            <p className="mt-3 text-[15px] text-ink-2">{m.text}</p>
            {i === 0 && <WaterFlow className="mt-5 h-8" />}
            {i === 1 && <AnimatedRoots className="mt-3 h-14" nodes={false} />}
            {i === 2 && (
              <svg aria-hidden viewBox="0 0 200 40" className="mt-5 h-8 w-full" fill="none">
                {[30, 80, 130, 175].map((x, k) => (
                  <g key={x} className="origin-bottom animate-float" style={{ animationDelay: `${k * 0.4}s` }}>
                    <path d={`M${x} 40 V22`} stroke="var(--leaf)" strokeWidth="2" />
                    <circle cx={x} cy={16} r={7} fill="var(--coral)" opacity={0.85} />
                    <circle cx={x} cy={16} r={2.5} fill="#FDE7E1" />
                  </g>
                ))}
              </svg>
            )}
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
