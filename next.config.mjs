/** @type {import('next').NextConfig} */
const nextConfig = {
  // STATIC_EXPORT=1 npm run build → export statique (sans la route /api/chat, voir README).
  output: process.env.STATIC_EXPORT ? 'export' : undefined,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
