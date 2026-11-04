import { Icon } from '@/components/ui';
import { actions, grandirHero } from '@/content/grandir';

/** Sommaire des 5 actions (ancres), sous le titre du hero. */
export function ActionsToc() {
  return (
    <nav aria-label={grandirHero.tocLabel} className="mt-8">
      <ol className="flex flex-wrap gap-2">
        {actions.map((a) => (
          <li key={a.id}>
            <a
              href={`#${a.id}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-leaf-lt px-3.5 py-1.5 text-[13px] font-bold text-leaf-dk transition-colors hover:bg-green-700 hover:text-white"
            >
              <Icon name={a.icon} className="h-3.5 w-3.5" />
              <span>
                {a.number} · {a.label}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
