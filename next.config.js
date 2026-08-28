/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  transpilePackages: ['gsap', 'three'],
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.huwa-gebaeudedienste.de' }],
        destination: 'https://huwa-gebaeudedienste.de/:path*',
        permanent: true,
      },
      {
        source: '/blog/winterdienst-2024-2025-pflichten-eigentuemer-vermieter',
        destination: '/blog/winterdienst-2026-2027-pflichten-eigentuemer-vermieter',
        permanent: true,
      },
      { source: '/unsere-leistungen', destination: '/leistungen', permanent: true },
      { source: '/anfrage', destination: '/angebot', permanent: true },
      { source: '/reinigungneuwied', destination: '/gebaudereinigung-neuwied', permanent: true },
      { source: '/bueroreinigung-neuwied', destination: '/bueroeinigung-neuwied', permanent: true },
      { source: '/bueroreinigung-koblenz', destination: '/bueroeinigung-koblenz', permanent: true },
      { source: '/bueroreinigung-andernach', destination: '/bueroeinigung-andernach', permanent: true },
      { source: '/bueroreinigung-bendorf', destination: '/bueroeinigung-bendorf', permanent: true },
      { source: '/bueroreinigung-hoehr-grenzhausen', destination: '/bueroeinigung-hoehr-grenzhausen', permanent: true },
      { source: '/galerie', destination: '/', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
