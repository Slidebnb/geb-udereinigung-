import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';
import { getAllServiceSlugs } from '@/lib/services';
import { prisma } from '@/lib/prisma';

// Leistungen, für die Ort-Seiten existieren (slug → URL-Präfix)
const CITY_SERVICES = [
  { slug: 'gebaudereinigung',    label: 'Gebäudereinigung' },
  { slug: 'bueroreinigung',      label: 'Büroreinigung' },
  { slug: 'treppenhausreinigung',label: 'Treppenhausreinigung' },
  { slug: 'hausmeisterservice',  label: 'Hausmeisterservice' },
  { slug: 'winterdienst',        label: 'Winterdienst' },
];

// Städte mit URL-freundlichem Slug
function citySlug(city: string): string {
  return city
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base,                   lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/leistungen`,   lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/ueber-uns`,    lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/angebot`,      lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/kontakt`,      lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog`,         lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${base}/faq`,          lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${base}/checkliste`,   lastModified: now, changeFrequency: 'yearly',  priority: 0.5 },
    { url: `${base}/impressum`,    lastModified: now, changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${base}/datenschutz`,  lastModified: now, changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${base}/agb`,          lastModified: now, changeFrequency: 'yearly',  priority: 0.2 },
  ];

  // Leistungsseiten aus services.ts (single source of truth)
  const servicePages: MetadataRoute.Sitemap = getAllServiceSlugs().map(slug => ({
    url: `${base}/leistungen/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  // Ort-Leistungsseiten – generiert aus siteConfig.serviceAreas × CITY_SERVICES
  // Nur Hauptstädte (erste 3) mit höchster Priorität, Rest mit niedrigerer
  const primaryCities = siteConfig.serviceAreas.slice(0, 3);
  const secondaryCities = siteConfig.serviceAreas.slice(3);

  const cityPages: MetadataRoute.Sitemap = [
    ...primaryCities.flatMap(city =>
      CITY_SERVICES.map(svc => ({
        url: `${base}/${svc.slug}-${citySlug(city)}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.85,
      }))
    ),
    ...secondaryCities.flatMap(city =>
      CITY_SERVICES.slice(0, 4).map(svc => ({
        url: `${base}/${svc.slug}-${citySlug(city)}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
    ),
  ];

  // Blog-Beiträge aus DB (nur veröffentlichte)
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

  return [...staticPages, ...servicePages, ...cityPages, ...blogPages];
}
