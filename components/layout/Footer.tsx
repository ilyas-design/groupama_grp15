import Image from 'next/image';
import Link from 'next/link';
import { footer, site } from '@/content/site';
import { WaterFlow } from '@/components/ui/WaterFlow';

export function Footer() {
  return (
    <footer className="relative bg-ink text-[#C9D3CD]">
      <WaterFlow className="absolute inset-x-0 -top-8 h-10" color="var(--water)" opacity={0.35} />
      <div className="mx-auto max-w-[1280px] px-4 pb-24 pt-14 sm:px-6 sm:pb-24 lg:px-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="inline-flex rounded-2xl bg-white px-4 py-3">
              <Image src="/logo.png" alt={site.logoAlt} width={1553} height={800} className="h-12 w-auto" />
            </div>
            <p className="mt-5 font-serif text-xl italic text-white">{footer.tagline}</p>
            <p className="mt-3 max-w-sm text-sm">{footer.about}</p>
          </div>
          {footer.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.08em] text-white">{col.title}</h2>
              <ul className="grid gap-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="transition-colors hover:text-white hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <p className="mt-10 rounded-xl bg-white/5 px-4 py-3 text-xs text-[#C9D3CD]">{footer.disclaimer}</p>
        <div className="mt-6 flex flex-wrap justify-between gap-3 border-t border-white/10 pt-5 text-xs">
          <span>{footer.copyright}</span>
          <ul className="flex gap-4">
            {footer.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
