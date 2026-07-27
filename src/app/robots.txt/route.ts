import { siteConfig } from '@/lib/site';

export const dynamic = 'force-static';

const robotsBody = [
  'User-agent: *',
  'Allow: /',
  'Disallow: /admin',
  'Disallow: /admin/',
  'Disallow: /api',
  'Disallow: /api/',
  'Disallow: /portal',
  'Disallow: /portal/',
  '',
  `Sitemap: ${siteConfig.url}/sitemap.xml`,
  '',
].join('\n');

export function GET() {
  return new Response(robotsBody, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
