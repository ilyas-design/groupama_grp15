import { Icon, Reveal } from '@/components/ui';
import type { BeforeAfterContent } from '@/content/simplifier';

/** Tableau Avant / Avec l'IA (une ligne = une même tâche). */
export function BeforeAfter({ content }: { content: BeforeAfterContent }) {
  return (
    <Reveal className="overflow-hidden rounded-xl2 border border-line bg-white">
      <table className="w-full table-fixed border-collapse text-left text-sm sm:text-[15px]">
        <caption className="sr-only">{content.caption}</caption>
        <thead>
          <tr>
            <th scope="col" className="bg-coral-lt px-4 py-4 text-xs font-extrabold uppercase tracking-[0.1em] text-coral-dk sm:px-6">
              {content.beforeLabel}
            </th>
            <th scope="col" className="bg-leaf-lt px-4 py-4 text-xs font-extrabold uppercase tracking-[0.1em] text-green-800 sm:px-6">
              {content.afterLabel}
            </th>
          </tr>
        </thead>
        <tbody>
          {content.rows.map((r) => (
            <tr key={r.before} className="border-t border-line align-top">
              <td className="px-4 py-4 text-ink-2 sm:px-6">
                <span className="flex gap-2.5">
                  <Icon name="X" className="mt-0.5 h-4 w-4 flex-none text-coral-dk" />
                  {r.before}
                </span>
              </td>
              <td className="border-l border-line px-4 py-4 font-semibold text-ink sm:px-6">
                <span className="flex gap-2.5">
                  <Icon name="Check" className="mt-0.5 h-4 w-4 flex-none text-green-700" />
                  {r.after}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Reveal>
  );
}
