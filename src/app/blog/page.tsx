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
      select: { id: true, title: true, slug: true, excerpt: true, category: true, coverImage: true, author: true, publishedAt: true },
    });
  } catch {
    posts = [];
  }

  const [featured, ...rest] = posts;
  const categories = Array.from(new Set(posts.map((post) => post.category).filter(Boolean))).slice(0, 8);

  return (
    <>
      <section className="blog-hero">
        <div className="container mx-auto">
          <Breadcrumb items={[{ label: 'Blog' }]} />
          <span className="section-label mt-8">Huwa Ratgeber</span>
          <h1 className="mb-0 max-w-4xl">Blog & Ratgeber für Gebäudedienste</h1>
          <p className="blog-hero-lead">
            Verständliche Antworten zu Reinigung, Hausmeisterservice, Winterdienst, Objektpflege und Kosten. Für Hausverwaltungen, Gewerbe und Eigentümer in der Region.
          </p>
          {categories.length > 0 ? (
            <div className="mt-7 flex flex-wrap gap-2">
              {categories.map((category) => (
                <span key={category} className="badge bg-white text-slate-700 shadow-sm ring-1 ring-slate-200">{category}</span>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto">
          {posts.length === 0 ? (
            <p className="text-center text-gray-500">Aktuell sind keine Beiträge verfügbar.</p>
          ) : null}

          {featured ? (
            <Link href={`/blog/${featured.slug}`} className="group mb-12 grid overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_22px_80px_rgba(15,34,64,0.12)] md:grid-cols-[1.05fr_.95fr]">
              <div className="relative min-h-[320px] overflow-hidden bg-gradient-to-br from-primary-50 via-white to-green/10">
                {featured.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={featured.coverImage} alt={featured.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : null}
              </div>
              <div className="flex flex-col justify-center p-8 md:p-10">
                <span className="badge bg-accent/10 text-accent text-xs mb-4 w-fit">{featured.category}</span>
                <h2 className="mb-4 group-hover:text-primary transition-colors">{featured.title}</h2>
                <p className="text-lg leading-8 text-slate-600 mb-6">{featured.excerpt}</p>
                <div className="text-sm text-slate-400">{featured.author} · {formatDate(featured.publishedAt)}</div>
              </div>
            </Link>
          ) : null}

          {rest.length > 0 ? (
            <div className="blog-card-grid">
              {rest.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="blog-card">
                  <div className="blog-card-image">
                    {post.coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={post.coverImage} alt={post.title} loading="lazy" />
                    ) : null}
                  </div>
                  <div className="blog-card-body flex min-h-[245px] flex-col">
                    <span className="badge bg-primary-50 text-primary text-xs mb-3 w-fit">{post.category}</span>
                    <h3 className="text-xl mb-3 transition-colors">{post.title}</h3>
                    <p className="text-sm leading-6 text-slate-600 mb-5 flex-1">{post.excerpt}</p>
                    <div className="text-xs text-slate-400">{formatDate(post.publishedAt)}</div>
                  </div>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container mx-auto">
          <Newsletter />
        </div>
      </section>
    </>
  );
}
