import { Card, ProgressBar } from '@/components/ui';
import { skillGauges } from '@/content/parcours';

/** Jauges de compétences (score sur 100). */
export function SkillGaugesCard() {
  return (
    <Card>
      <h2 className="h3 mb-4">{skillGauges.title}</h2>
      <ul className="grid gap-4">
        {skillGauges.items.map((g) => (
          <li key={g.id}>
            <ProgressBar value={g.value} label={g.label} valueLabel={`${g.value}${skillGauges.valueSuffix}`} tone="green" />
          </li>
        ))}
      </ul>
    </Card>
  );
}
