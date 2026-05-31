import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';
import { getAllServiceSlugs } from '@/lib/services';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;

  // Static pages with their priorities and dates
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${base}/leistungen`,
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${base}/ueber-uns`,
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/referenzen`,
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/angebot`,
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/kontakt`,
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/blog`,
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${base}/faq`,
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'monthly',
      priority: 0.65,
    },
    {
      url: `${base}/impressum`,
      lastModified: new Date('2024-01-01'),
      changeFrequency: 'monthly',
      priority: 0.2,
    },
    {
      url: `${base}/datenschutz`,
      lastModified: new Date('2024-01-01'),
      changeFrequency: 'monthly',
      priority: 0.2,
    },
    {
      url: `${base}/agb`,
      lastModified: new Date('2024-01-01'),
      changeFrequency: 'monthly',
      priority: 0.2,
    },
  ];

  // Service pages (leistungen/[slug])
  const servicePages: MetadataRoute.Sitemap = getAllServiceSlugs().map((slug) => ({
    url: `${base}/leistungen/${slug}`,
    lastModified: new Date('2025-01-01'),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Ort-Leistungs-Seiten (city pages)
  const cityPages: MetadataRoute.Sitemap = [
    // Gebäudereinigung
    '/gebaudereinigung-neuwied',
    '/gebaudereinigung-koblenz',
    '/gebaudereinigung-bendorf',
    // Büroreinigung
    '/bueroeinigung-neuwied',
    '/bueroeinigung-koblenz',
    '/bueroeinigung-bendorf',
    // Treppenhausreinigung
    '/treppenhausreinigung-neuwied',
    '/treppenhausreinigung-koblenz',
    '/treppenhausreinigung-bendorf',
    // Hausmeisterservice
    '/hausmeisterservice-neuwied',
    '/hausmeisterservice-koblenz',
    '/hausmeisterservice-bendorf',
    // Winterdienst
    '/winterdienst-neuwied',
    '/winterdienst-koblenz',
    '/winterdienst-bendorf',
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date('2025-01-01'),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  // Blog posts with lastModified from DB
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });
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
