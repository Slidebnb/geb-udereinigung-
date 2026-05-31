import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';
import { getAllServiceSlugs } from '@/lib/services';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;

  const staticRoutes = [
    '',
    '/leistungen',
    '/ueber-uns',
    '/kontakt',
    '/angebot',
    '/referenzen',
    '/blog',
    '/faq',
    '/impressum',
    '/datenschutz',
    '/agb',
  ];

  const serviceRoutes = getAllServiceSlugs().map((slug) => `/leistungen/${slug}`);

  let blogRoutes: string[] = [];
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });
    blogRoutes = posts.map((p) => `/blog/${p.slug}`);
  } catch {
    blogRoutes = [];
  }

  const now = new Date();

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes].map((route) => ({
    url: `${base}${route}`,
    lastModified: now,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route.startsWith('/leistungen') ? 0.8 : 0.6,
  }));
}
