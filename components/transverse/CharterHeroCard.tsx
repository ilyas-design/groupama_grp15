import Image from 'next/image';
import { Icon, Tag } from '@/components/ui';
import { site } from '@/content/site';

interface CharterHeroCardProps {
  title: string;
  items: string[];
  version: string;
  note: string;
}

/** Visuel du hero de la charte : résumé en 4 règles + version du document. */
export function CharterHeroCard({ title, items, version, note }: CharterHeroCardProps) {
  return (
    <div className="relative mx-auto max-w-md rounded-xl3 border border-line bg-white p-7 shadow-lift">
      <span aria-hidden className="absolute -right-3 -top-3 h-16 w-16 animate-float rounded-full bg-leaf-lt" />
      <div className="relative flex items-center gap-3">
        <Image src="/logo-icon.png" alt="" width={48} height={48} className="h-12 w-12" />
        <div>
          <p className="font-serif text-xl font-semibold text-ink">{title}</p>
          <p className="text-xs text-ink-2">{site.brand}</p>
        </div>
      </div>
      <ul className="relative mt-6 grid gap-2.5">
        {items.map((item, i) => (
          <li key={item} className="flex items-center gap-3 rounded-xl bg-sand px-4 py-3 text-[15px] font-bold text-ink">
            <span aria-hidden className="font-serif text-lg italic text-green-700">
              {i + 1}
            </span>
            {item}
            <Icon name="CheckCircle2" className="ml-auto h-5 w-5 text-green-700" />
          </li>
        ))}
      </ul>
      <div className="relative mt-6 border-t border-line pt-4">
        <Tag tone="green" icon="Calendar">
          {version}
        </Tag>
        <p className="mt-2 text-xs text-ink-2">{note}</p>
      </div>
    </div>
  );
}
