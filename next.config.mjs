const isDev = process.env.NODE_ENV !== 'production';

// Tout est servi par le site lui-même (polices next/font, photos, vidéos, /api/chat).
// 'unsafe-inline' : Next.js insère ses scripts d'hydratation en ligne (pas de nonce sur un site statique).
// vercel.live : barre d'outils des déploiements de prévisualisation Vercel.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://vercel.live`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "media-src 'self'",
  "connect-src 'self' https://vercel.live",
  'frame-src https://vercel.live',
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // STATIC_EXPORT=1 npm run build → export statique (sans la route /api/chat, voir README).
  output: process.env.STATIC_EXPORT ? 'export' : undefined,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
  // En export statique, les en-têtes sont à configurer chez l'hébergeur
  ...(process.env.STATIC_EXPORT ? {} : { headers: async () => [{ source: '/:path*', headers: securityHeaders }] }),
};

export default nextConfig;
