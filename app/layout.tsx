import type { Metadata, Viewport } from 'next';
import { Fraunces, Manrope } from 'next/font/google';
import type { ReactNode } from 'react';
import { Assistant } from '@/components/assistant/Assistant';
import { Footer } from '@/components/layout/Footer';
import { Nav } from '@/components/layout/Nav';
import { Providers } from '@/components/layout/Providers';
import { site, slogans } from '@/content/site';
import './globals.css';

const fraunces = Fraunces({ subsets: ['latin'], style: ['normal', 'italic'], axes: ['opsz'], variable: '--font-fraunces', display: 'swap' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.brand} · ${site.name}`, template: `%s · ${site.brand}` },
  description: site.description,
  icons: { icon: [{ url: '/favicon.ico' }, { url: '/logo-icon.png', type: 'image/png' }], apple: '/apple-icon.png' },
  openGraph: {
    title: `${site.brand} · ${site.name}`,
    description: slogans.main,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: slogans.short }],
    locale: 'fr_FR',
    type: 'website',
  },
};

export const viewport: Viewport = { themeColor: '#1B7E4D' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${manrope.variable}`} data-scroll-behavior="smooth">
      <body>
        <Providers>
          <Nav />
          <main id="contenu" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <Assistant />
        </Providers>
      </body>
    </html>
  );
}
