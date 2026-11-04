import Link from 'next/link';
import { Button, Eyebrow, Icon, RichText, WaterFlow } from '@/components/ui';
import { Seed } from '@/components/transverse/Seed';
import { notFound } from '@/content/transverse';

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#E3F1DA,var(--sand))] px-4 pb-20 pt-12 sm:px-6 lg:px-12 lg:pb-28 lg:pt-20">
      <div className="relative mx-auto grid max-w-[1184px] items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <Eyebrow>{notFound.eyebrow}</Eyebrow>
          <h1 className="h1 mb-5 mt-4">
            <RichText text={notFound.title} />
          </h1>
          <p className="lead">{notFound.text}</p>
          <div className="mt-8">
            <Button href={notFound.primary.href} iconLeft={notFound.primary.icon}>
              {notFound.primary.label}
            </Button>
          </div>
          <nav aria-labelledby="nf-liens" className="mt-10">
            <h2 id="nf-liens" className="mb-3 text-xs font-extrabold uppercase tracking-[0.12em] text-ink-2">
              {notFound.linksTitle}
            </h2>
            <ul className="flex flex-wrap gap-2">
              {notFound.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-bold text-ink transition-colors hover:border-green-700 hover:text-green-800"
                  >
                    <Icon name={l.icon} className="h-4 w-4 text-green-700" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <Seed className="mx-auto w-full max-w-[260px] sm:max-w-[340px] lg:max-w-[420px]" />
      </div>
      <WaterFlow className="pointer-events-none absolute inset-x-0 bottom-0 h-10" opacity={0.25} />
    </section>
  );
}
