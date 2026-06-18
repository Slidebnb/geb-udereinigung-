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
    { url: `${base}/angebot`,           lastModified: TODAY, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/kontakt`,           lastModified: TODAY, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/preisrechner`,      lastModified: TODAY, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/gartenpflege`,      lastModified: TODAY, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${base}/winterdienst-anmeldung-2026`, lastModified: TODAY, changeFrequency: 'weekly', priority: 0.92 },
    { url: `${base}/gartenpflege-anmeldung-2026`, lastModified: TODAY, changeFrequency: 'weekly', priority: 0.92 },
    { url: `${base}/checkliste`,        lastModified: TODAY, changeFrequency: 'monthly', priority: 0.6 },
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

  // All city landing pages (5 services × 8 cities + winterdienst × 3 cities)
  const cities8 = ['neuwied', 'koblenz', 'bendorf', 'andernach', 'bad-neuenahr-ahrweiler', 'boppard', 'lahnstein', 'mayen'];
  const cities3 = ['neuwied', 'koblenz', 'bendorf'];

  const cityPages: MetadataRoute.Sitemap = [
    ...cities8.map(c => `gebaudereinigung-${c}`),
    ...cities8.map(c => `bueroeinigung-${c}`),
    ...cities8.map(c => `treppenhausreinigung-${c}`),
    ...cities8.map(c => `hausmeisterservice-${c}`),
    ...cities3.map(c => `winterdienst-${c}`),
  ].map((path) => ({
    url: `${base}/${path}`,
    lastModified: TODAY,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  // Blog posts with 3s timeout so sitemap never hangs
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
