/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
      { source: '/preisrechner', destination: '/angebot', permanent: true },
      { source: '/gebaeudereinigung-neuwied', destination: '/gebaudereinigung-neuwied', permanent: true },
      { source: '/gebaeudereinigung-koblenz', destination: '/gebaudereinigung-koblenz', permanent: true },
      { source: '/gebaeudereinigung-bendorf', destination: '/gebaudereinigung-bendorf', permanent: true },
      { source: '/bueroeinigung-koblenz', destination: '/bueroreinigung-koblenz', permanent: true },
      { source: '/bueroeinigung-neuwied', destination: '/bueroreinigung-neuwied', permanent: true },
      { source: '/bueroeinigung-bendorf', destination: '/bueroreinigung-bendorf', permanent: true },
      { source: '/bueroeinigung-andernach', destination: '/bueroreinigung-andernach', permanent: true },
      { source: '/bueroeinigung-boppard', destination: '/bueroreinigung-boppard', permanent: true },
      { source: '/bueroeinigung-lahnstein', destination: '/bueroreinigung-lahnstein', permanent: true },
      { source: '/bueroeinigung-mayen', destination: '/bueroreinigung-mayen', permanent: true },
      { source: '/bueroeinigung-bad-neuenahr-ahrweiler', destination: '/bueroreinigung-bad-neuenahr-ahrweiler', permanent: true },
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
