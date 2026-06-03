import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';
import { getAllServiceSlugs } from '@/lib/services';
import { prisma } from '@/lib/prisma';

const TODAY = new Date('2026-06-03');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: base,                        lastModified: TODAY, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/leistungen`,        lastModified: TODAY, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${base}/ueber-uns`,         lastModified: TODAY, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/referenzen`,        lastModified: TODAY, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/angebot`,           lastModified: TODAY, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/kontakt`,           lastModified: TODAY, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/preisrechner`,      lastModified: TODAY, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${base}/gartenpflege`,      lastModified: TODAY, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${base}/checkliste`,        lastModified: TODAY, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/galerie`,           lastModified: TODAY, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/blog`,              lastModified: TODAY, changeFrequency: 'weekly',  priority: 0.6 },
    { url: `${base}/faq`,               lastModified: TODAY, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${base}/impressum`,         lastModified: TODAY, changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${base}/datenschutz`,       lastModified: TODAY, changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${base}/agb`,               lastModified: TODAY, changeFrequency: 'yearly',  priority: 0.2 },
  ];

  // Service detail pages (/leistungen/[slug])
  const servicePages: MetadataRoute.Sitemap = getAllServiceSlugs().map((slug) => ({
    url: `${base}/leistungen/${slug}`,
    lastModified: TODAY,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // City landing pages
  const cityPages: MetadataRoute.Sitemap = [
    '/gebaudereinigung-neuwied',
    '/gebaudereinigung-koblenz',
    '/gebaudereinigung-bendorf',
    '/bueroeinigung-neuwied',
    '/bueroeinigung-koblenz',
    '/bueroeinigung-bendorf',
    '/treppenhausreinigung-neuwied',
    '/treppenhausreinigung-koblenz',
    '/treppenhausreinigung-bendorf',
    '/hausmeisterservice-neuwied',
    '/hausmeisterservice-koblenz',
    '/hausmeisterservice-bendorf',
    '/winterdienst-neuwied',
    '/winterdienst-koblenz',
    '/winterdienst-bendorf',
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: TODAY,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  // Blog posts – with 3s timeout so sitemap never hangs if DB is slow
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const posts = await Promise.race([
      prisma.blogPost.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
      }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('timeout')), 3000)
      ),
    ]);
    blogPages = posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch {
    blogPages = [];
  }

  return [...staticPages, ...servicePages, ...cityPages, ...blogPages];
}
