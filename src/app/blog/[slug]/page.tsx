import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CTABanner from '@/components/home/CTABanner';
import { prisma } from '@/lib/prisma';
import { siteConfig } from '@/lib/site';
import { formatDate } from '@/lib/utils';
import { renderMarkdown } from '@/lib/markdown';
import { getBlogReadingMinutes } from '@/lib/blog-content';

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
  try {
    return await prisma.blogPost.findFirst({ where: { slug, published: true } });
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: 'Beitrag nicht gefunden' };

  const image = post.coverImage || '/opengraph-image';

  return {
    title: post.metaTitle || post.title,
    description: post.metaDesc || post.excerpt,
    alternates: { canonical: `${siteConfig.url}/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.metaTitle || post.title,
      description: post.metaDesc || post.excerpt,
      url: `${siteConfig.url}/blog/${post.slug}`,
      images: [image],
      publishedTime: post.publishedAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle || post.title,
      description: post.metaDesc || post.excerpt,
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  let related: { id: string; title: string; slug: string; excerpt: string; category: string; coverImage: string | null }[] = [];
  try {
    related = await prisma.blogPost.findMany({
      where: { published: true, slug: { not: post.slug } },
      orderBy: { publishedAt: 'desc' },
      take: 3,
      select: { id: true, title: true, slug: true, excerpt: true, category: true, coverImage: true },
    });
  } catch {
    related = [];
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage ? [post.coverImage] : undefined,
    author: { '@type': 'Organization', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.legalName,
      logo: { '@type': 'ImageObject', url: siteConfig.logoUrl },
    },
    datePublished: post.publishedAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteConfig.url}/blog/${post.slug}` },
  };

  return (
    <div className="blog-article-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <section className="blog-hero">
        <div className="container mx-auto">
          <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: post.title }]} />
          <span className="badge bg-primary/10 text-primary mt-8">{post.category}</span>
          <h1 className="mt-5 mb-0">{post.title}</h1>
          <p className="blog-hero-lead">{post.excerpt}</p>
          <div className="blog-meta">
            <span>{post.author}</span>
            <span>·</span>
            <time dateTime={post.publishedAt.toISOString()}>{formatDate(post.publishedAt)}</time>
            <span>·</span>
            <span>{getBlogReadingMinutes(post.content)} Min. Lesezeit</span>
          </div>
          <div className="blog-cover">
            {post.coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={post.coverImage} alt={post.title} />
            ) : (
              <div className="grid h-[300px] place-items-center bg-[radial-gradient(circle_at_20%_20%,rgba(30,95,216,.18),transparent_34%),linear-gradient(135deg,#f8fbff,#eaf3ff_52%,#eefaf3)] md:h-[460px]">
                <div className="max-w-xl px-8 text-center">
                  <span className="section-label mb-4">Huwa Ratgeber</span>
                  <strong className="block text-3xl font-extrabold leading-tight text-slate-950 md:text-5xl">{post.category}</strong>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <article className="section-padding">
        <div className="container mx-auto blog-layout">
          <div className="blog-article-card">
            <div className="prose-content">{renderMarkdown(post.content)}</div>

            <div className="blog-inline-cta">
              <h2>Sie möchten eine Einschätzung für Ihr Objekt?</h2>
              <p>Wir prüfen Leistung, Turnus und Objektanforderungen sauber und erstellen ein unverbindliches Angebot ohne versteckte Fachbegriffe.</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/angebot" className="btn-primary">Angebot anfragen</Link>
                <Link href="/preisrechner" className="btn-white">Preis schätzen</Link>
              </div>
            </div>
          </div>

          <aside className="blog-sidebar">
            <div className="blog-side-card">
              <h2>Kurz zusammengefasst</h2>
              <p>{post.excerpt}</p>
            </div>
            <div className="blog-side-card">
              <h2>Direkt zur Anfrage</h2>
              <p>Für Hausverwaltungen, Gewerbe, Büros und Wohnanlagen in der Region.</p>
              <Link href="/angebot" className="btn-primary mt-4 w-full justify-center">Kostenlos anfragen</Link>
            </div>
          </aside>
        </div>
      </article>

      {related.length > 0 ? (
        <section className="section-padding bg-slate-50">
          <div className="container mx-auto">
            <div className="mb-10 text-center">
              <span className="section-label">Weiterlesen</span>
              <h2>Weitere Ratgeber</h2>
            </div>
            <div className="blog-card-grid">
              {related.map((item) => (
                <Link key={item.id} href={`/blog/${item.slug}`} className="blog-card">
                  <div className="blog-card-image">
                    {item.coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.coverImage} alt={item.title} loading="lazy" />
                    ) : null}
                  </div>
                  <div className="blog-card-body">
                    <span className="badge bg-primary-50 text-primary text-xs mb-3">{item.category}</span>
                    <h3 className="text-lg mb-2 transition-colors">{item.title}</h3>
                    <p className="text-sm leading-6 text-slate-600">{item.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CTABanner />
    </div>
  );
}
