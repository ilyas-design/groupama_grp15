import { Card, IconBox, ProgressBar } from '@/components/ui';
import { courses } from '@/content/parcours';

/** Formations en cours, avec barre de progression. */
export function CoursesCard() {
  return (
    <Card>
      <h2 className="h3 mb-2">{courses.title}</h2>
      <ul>
        {courses.items.map((c) => {
          const done = c.value >= 100;
          return (
            <li key={c.id} className="flex items-center gap-3.5 border-b border-line py-3.5 last:border-0">
              <IconBox icon={done ? 'CheckCircle2' : c.icon} tone={done ? 'green' : c.tone} />
              <div className="min-w-0 flex-1">
                <ProgressBar
                  value={c.value}
                  label={c.title}
                  valueLabel={done ? courses.doneLabel : `${c.value} %`}
                  tone={done ? 'green' : 'leaf'}
                  size="sm"
                />
                <p className="mt-1.5 text-xs text-ink-2">{c.meta}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
