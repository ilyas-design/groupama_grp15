'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { nav, navUi, navUser, site } from '@/content/site';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/components/ui/cn';

const isActive = (path: string, href: string) => (href === '/' ? path === '/' : path.startsWith(href));

export function Nav() {
  const path = usePathname() ?? '/';
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const meActive = isActive(path, navUser.href);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-sand/90 backdrop-blur-md">
      <a href="#contenu" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
        {navUi.skipLink}
      </a>
      <div className="mx-auto flex h-[68px] max-w-[1280px] items-center gap-6 px-4 sm:px-6 lg:px-12">
        <Link href="/" aria-label={navUi.homeLabel} className="flex shrink-0 items-center gap-2">
          <Image src="/logo-icon.png" alt="" width={36} height={36} priority className="h-9 w-9 sm:hidden" />
          <Image src="/logo.png" alt={site.logoAlt} width={1553} height={800} priority className="hidden h-11 w-auto sm:block" />
        </Link>

        <nav aria-label={navUi.mainNavLabel} className="ml-auto hidden lg:block">
          <ul className="flex gap-1">
            {nav.map((n) => {
              const on = isActive(path, n.href);
              return (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    aria-current={on ? 'page' : undefined}
                    className={cn('block rounded-full px-3.5 py-2 text-sm font-semibold transition-colors', on ? 'bg-leaf-lt text-green-800' : 'text-ink-2 hover:bg-white hover:text-ink')}
                  >
                    {n.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <Link
          href={navUser.href}
          aria-current={meActive ? 'page' : undefined}
          className={cn('hidden items-center gap-2 rounded-full border py-2 pl-2 pr-3.5 text-sm font-bold transition-colors lg:flex', meActive ? 'border-green-700 bg-leaf-lt text-green-800' : 'border-line bg-white hover:border-green-700')}
        >
          <span aria-hidden className="grid h-7 w-7 place-items-center rounded-full bg-signature text-xs font-extrabold text-white">
            {navUser.initials}
          </span>
          {navUser.label}
        </Link>

        <button
          type="button"
          className="ml-auto grid h-11 w-11 place-items-center rounded-xl border border-line bg-white lg:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? navUi.closeMenu : navUi.openMenu}
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name={open ? 'X' : 'Menu'} className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu-mobile"
            aria-label={navUi.mainNavLabel}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-full h-[calc(100dvh-68px)] overflow-y-auto border-t border-line bg-sand px-4 pb-10 pt-4 lg:hidden"
          >
            <ul className="grid gap-1.5">
              {[...nav, { label: navUser.label, href: navUser.href, icon: 'Sprout' as const }].map((n) => {
                const on = isActive(path, n.href);
                return (
                  <li key={n.href}>
                    <Link
                      href={n.href}
                      aria-current={on ? 'page' : undefined}
                      className={cn('flex items-center gap-3 rounded-2xl px-4 py-3.5 text-lg font-bold', on ? 'bg-leaf-lt text-green-800' : 'bg-white text-ink')}
                    >
                      {n.icon && <Icon name={n.icon} className="h-5 w-5" />}
                      {n.label}
                      <Icon name="ChevronRight" className="ml-auto h-5 w-5 opacity-50" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
