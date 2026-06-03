import type { Metadata } from 'next';
import Breadcrumb from '@/components/shared/Breadcrumb';
import Newsletter from '@/components/features/Newsletter';
import BlogGrid from '@/components/blog/BlogGrid';
import { prisma } from '@/lib/prisma';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Blog & Ratgeber | Tipps zu Reinigung & Hausmeisterdiensten | Huwa',
  description:
    'Praktische Tipps, Ratgeber und Wissenswertes rund um Gebäudereinigung, Büroreinigung, Winterdienst und Hausmeisterdienste. Jetzt im Huwa-Blog lesen.',
  alternates: { canonical: `${siteConfig.url}/blog` },
};

export const revalidate = 60;

export default async function BlogPage() {
  let posts: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    coverImage: string | null;
    author: string;
    publishedAt: Date;
    content: string;
  }[] = [];

  try {
    posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      select: { id: true, title: true, slug: true, excerpt: true, category: true, coverImage: true, author: true, publishedAt: true, content: true },
    });
  } catch {
    posts = [];
  }

  function readingTime(content: string): number {
    const words = content.trim().split(/\s+/).length;
    return Math.max(1, Math.round(words / 200));
  }

  // Serialize dates for client component
  const serialized = posts.map(p => ({
    ...p,
    publishedAt: p.publishedAt.toISOString(),
    readingTime: readingTime(p.content),
    content: undefined,
  }));

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}>
        {/* decorative orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #4BB8F5, transparent)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #2DC94E, transparent)' }} />
        <div className="container mx-auto relative z-10">
          <Breadcrumb items={[{ label: 'Blog' }]} dark />
          <div className="mt-8 max-w-2xl">
            <div className="section-label mb-4">Blog & Ratgeber</div>
            <h1 className="text-white mb-4">Tipps & Wissen rund um <span className="gradient-text">Gebäudereinigung</span></h1>
            <p className="text-slate-300 text-lg">
              Praktische Ratgeber, Kosten-Übersichten und lokales Wissen – von unserem Team in Neuwied für Sie aufbereitet.
            </p>
            <div className="flex gap-6 mt-8">
              <div className="text-center">
                <div className="text-2xl font-black text-white">{posts.length}</div>
                <div className="text-slate-400 text-xs mt-0.5">Artikel</div>
              </div>
              <div className="w-px bg-white/10" />
              <div className="text-center">
                <div className="text-2xl font-black text-white">{new Set(posts.map(p => p.category)).size}</div>
                <div className="text-slate-400 text-xs mt-0.5">Kategorien</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">✍️</div>
              <h2 className="text-xl font-bold text-gray-700 mb-2">Bald verfügbar</h2>
              <p className="text-gray-500">Die ersten Artikel werden gerade vorbereitet.</p>
            </div>
          ) : (
            <BlogGrid posts={serialized} />
          )}
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <Newsletter />
        </div>
      </section>
    </>
  );
}
