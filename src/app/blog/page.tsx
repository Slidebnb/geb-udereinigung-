import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/shared/Breadcrumb';
import Newsletter from '@/components/features/Newsletter';
import { prisma } from '@/lib/prisma';
import { siteConfig } from '@/lib/site';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Blog & Ratgeber | Tipps zu Reinigung & Hausmeisterdiensten',
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
  }[] = [];

  try {
    posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
    });
  } catch {
    posts = [];
  }

  const [featured, ...rest] = posts;

  return (
    <>
      <section className="bg-primary-50 border-b border-primary-100 py-8">
        <div className="container mx-auto">
          <Breadcrumb items={[{ label: 'Blog' }]} />
          <h1 className="mt-4 mb-2">Blog & Ratgeber</h1>
          <p className="text-gray-600 max-w-2xl">
            Hilfreiche Tipps und Hintergrundwissen rund um professionelle Reinigung, Hausmeisterdienste und die Pflege Ihrer Immobilie.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto">
          {posts.length === 0 && (
            <p className="text-center text-gray-500">Aktuell sind keine Beiträge verfügbar.</p>
          )}

          {featured && (
            <Link href={`/blog/${featured.slug}`} className="card overflow-hidden grid md:grid-cols-2 mb-12 group">
              <div className="relative h-64 md:h-auto bg-primary-50">
                {featured.coverImage && (
                  <img src={featured.coverImage} alt={featured.title} className="absolute inset-0 w-full h-full object-cover" />
                )}
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="badge bg-accent/10 text-accent text-xs mb-3 w-fit">{featured.category}</span>
                <h2 className="mb-3 group-hover:text-primary transition-colors">{featured.title}</h2>
                <p className="text-gray-600 mb-4">{featured.excerpt}</p>
                <div className="text-sm text-gray-400">{featured.author} · {formatDate(featured.publishedAt)}</div>
              </div>
            </Link>
          )}

          {rest.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="card overflow-hidden group flex flex-col">
                  <div className="relative h-48 bg-primary-50">
                    {post.coverImage && (
                      <img src={post.coverImage} alt={post.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="badge bg-primary-50 text-primary text-xs mb-3 w-fit">{post.category}</span>
                    <h3 className="text-lg mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 flex-1">{post.excerpt}</p>
                    <div className="text-xs text-gray-400">{formatDate(post.publishedAt)}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container mx-auto">
          <Newsletter />
        </div>
      </section>
    </>
  );
}
