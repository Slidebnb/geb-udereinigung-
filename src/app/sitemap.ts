import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';
import { getAllServiceSlugs } from '@/lib/services';
import { prisma } from '@/lib/prisma';

const LAST_SEO_UPDATE = new Date('2026-06-04');

const knownLandingPages = [
  { path: '/gebaudereinigung-neuwied', priority: 0.9 },
  { path: '/gebaudereinigung-koblenz', priority: 0.9 },
  { path: '/gebaudereinigung-bendorf', priority: 0.85 },
  { path: '/bueroreinigung-koblenz', priority: 0.85 },
  { path: '/bueroreinigung-neuwied', priority: 0.8 },
  { path: '/bueroreinigung-bendorf', priority: 0.75 },
  { path: '/treppenhausreinigung-koblenz', priority: 0.85 },
  { path: '/treppenhausreinigung-neuwied', priority: 0.8 },
  { path: '/treppenhausreinigung-bendorf', priority: 0.75 },
  { path: '/hausmeisterservice-koblenz', priority: 0.85 },
  { path: '/hausmeisterservice-neuwied', priority: 0.8 },
  { path: '/hausmeisterservice-bendorf', priority: 0.75 },
  { path: '/winterdienst-koblenz', priority: 0.8 },
  { path: '/winterdienst-neuwied', priority: 0.75 },
  { path: '/winterdienst-bendorf', priority: 0.7 },
  { path: '/unterhaltsreinigung-koblenz', priority: 0.8 },
  { path: '/fensterreinigung-koblenz', priority: 0.75 },
  { path: '/gartenpflege-koblenz', priority: 0.75 },
  { path: '/gartenpflege', priority: 0.7 },
  { path: '/gartenpflege-anmeldung-2026', priority: 0.65 },
  { path: '/winterdienst-anmeldung-2026', priority: 0.65 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;

  const staticPages: MetadataRoute.Sitemap = [
    { url: base,                   lastModified: LAST_SEO_UPDATE, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/leistungen`,   lastModified: LAST_SEO_UPDATE, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/ueber-uns`,    lastModified: LAST_SEO_UPDATE, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/angebot`,      lastModified: LAST_SEO_UPDATE, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/kontakt`,      lastModified: LAST_SEO_UPDATE, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog`,         lastModified: LAST_SEO_UPDATE, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${base}/faq`,          lastModified: LAST_SEO_UPDATE, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${base}/checkliste`,   lastModified: LAST_SEO_UPDATE, changeFrequency: 'yearly',  priority: 0.5 },
    { url: `${base}/impressum`,    lastModified: LAST_SEO_UPDATE, changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${base}/datenschutz`,  lastModified: LAST_SEO_UPDATE, changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${base}/agb`,          lastModified: LAST_SEO_UPDATE, changeFrequency: 'yearly',  priority: 0.2 },
  ];

  const servicePages: MetadataRoute.Sitemap = getAllServiceSlugs().map(slug => ({
    url: `${base}/leistungen/${slug}`,
    lastModified: LAST_SEO_UPDATE,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  const landingPages: MetadataRoute.Sitemap = knownLandingPages.map(page => ({
    url: `${base}${page.path}`,
    lastModified: LAST_SEO_UPDATE,
    changeFrequency: 'monthly' as const,
    priority: page.priority,
  }));

  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });
    blogPages = posts.map(p => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch {
    blogPages = [];
  }

  return [...staticPages, ...servicePages, ...landingPages, ...blogPages];
}
