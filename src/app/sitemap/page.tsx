import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { prisma } from '@/lib/prisma';
import { caseStudySeoRoutes, citySeoRoutes, coreSeoRoutes, costSeoRoutes, downloadSeoRoutes, locationHubSeoRoutes, serviceSeoRoutes } from '@/lib/seo-routes';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Seitenübersicht | Huwa Gebäudedienste',
  description: 'Alle öffentlichen Seiten, Leistungen, Einsatzorte und Ratgeber von Huwa Gebäudedienste auf einen Blick.',
  alternates: { canonical: `${siteConfig.url}/sitemap` },
  openGraph: {
    title: 'Seitenübersicht | Huwa Gebäudedienste',
    description: 'Leistungen, Einsatzorte, Kontaktmöglichkeiten und Ratgeber von Huwa.',
    url: `${siteConfig.url}/sitemap`,
    images: ['/opengraph-image'],
  },
};

const linkClass = 'text-slate-600 hover:text-primary transition-colors text-sm leading-relaxed';

export default async function HtmlSitemapPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    select: { slug: true, title: true },
    orderBy: { publishedAt: 'desc' },
  }).catch(() => []);

  const groups = [
    { title: 'Unternehmen & Kontakt', routes: coreSeoRoutes.filter((route) => route.path !== '/sitemap') },
    { title: 'Leistungen', routes: serviceSeoRoutes },
    { title: 'Kosten & Preisinfos', routes: costSeoRoutes },
    { title: 'Kostenlose Vorlagen', routes: downloadSeoRoutes },
    { title: 'Standorte', routes: locationHubSeoRoutes },
    { title: 'Fallstudien', routes: caseStudySeoRoutes },
    { title: 'Leistungen nach Einsatzort', routes: citySeoRoutes },
  ];

  return (
    <>
      <section className="bg-dark py-16 md:py-20">
        <div className="container mx-auto">
          <Breadcrumb items={[{ label: 'Seitenübersicht' }]} dark />
          <h1 className="text-white mt-8 mb-4">Seitenübersicht</h1>
          <p className="text-slate-300 max-w-2xl">Direkter Zugang zu unseren Leistungen, Einsatzorten, Ratgebern und Kontaktmöglichkeiten.</p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
          {groups.map((group) => (
            <div key={group.title}>
              <h2 className="text-xl mb-5">{group.title}</h2>
              <ul className="space-y-2.5">
                {group.routes.map((route) => <li key={route.path}><Link href={route.path} className={linkClass}>{route.label}</Link></li>)}
              </ul>
            </div>
          ))}
          <div>
            <h2 className="text-xl mb-5">Ratgeber</h2>
            <ul className="space-y-2.5">
              {posts.map((post) => <li key={post.slug}><Link href={`/blog/${post.slug}`} className={linkClass}>{post.title}</Link></li>)}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
