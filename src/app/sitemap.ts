import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';
import { publicSeoRoutes } from '@/lib/seo-routes';
import { siteConfig } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const publicPages: MetadataRoute.Sitemap = publicSeoRoutes.map((route) => ({
    url: route.path === '/' ? siteConfig.url : new URL(route.path, siteConfig.url).toString(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: 'desc' },
    });
    blogPages = posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.65,
    }));
  } catch {
    // The static public sitemap remains available during a temporary DB outage.
  }

  return [...publicPages, ...blogPages];
}
