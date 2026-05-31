import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CTABanner from '@/components/home/CTABanner';
import { prisma } from '@/lib/prisma';
import { siteConfig } from '@/lib/site';
import { formatDate } from '@/lib/utils';
import { renderMarkdown } from '@/lib/markdown';

export const revalidate = 60;

interface Props {
  params: { slug: string };
}

async function getPost(slug: string) {
  try {
    return await prisma.blogPost.findUnique({ where: { slug } });
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: 'Beitrag nicht gefunden' };
  return {
    title: post.metaTitle || post.title,
    description: post.metaDesc || post.excerpt,
    alternates: { canonical: `${siteConfig.url}/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.metaTitle || post.title,
      description: post.metaDesc || post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
      publishedTime: post.publishedAt.toISOString(),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPost(params.slug);
  if (!post || !post.published) notFound();

  let related: { id: string; title: string; slug: string; excerpt: string }[] = [];
  try {
    related = await prisma.blogPost.findMany({
      where: { published: true, slug: { not: post.slug } },
      orderBy: { publishedAt: 'desc' },
      take: 2,
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
      logo: { '@type': 'ImageObject', url: `${siteConfig.url}/logo.png` },
    },
    datePublished: post.publishedAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteConfig.url}/blog/${post.slug}` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <section className="bg-primary-50 border-b border-primary-100 py-8">
        <div className="container mx-auto">
          <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: post.title }]} />
        </div>
      </section>

      <article className="section-padding">
        <div className="container mx-auto max-w-3xl">
          <span className="badge bg-primary-50 text-primary text-xs mb-4">{post.category}</span>
          <h1 className="mb-4">{post.title}</h1>
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-8">
            <span>{post.author}</span>
            <span>·</span>
            <time dateTime={post.publishedAt.toISOString()}>{formatDate(post.publishedAt)}</time>
          </div>

          {post.coverImage && (
            <img src={post.coverImage} alt={post.title} className="w-full h-72 md:h-96 object-cover rounded-2xl mb-10" />
          )}

          <div className="prose-content">{renderMarkdown(post.content)}</div>

          <div className="mt-12 p-6 bg-primary-50 rounded-2xl text-center">
            <h3 className="mb-2">Interessiert an unseren Leistungen?</h3>
            <p className="text-gray-600 mb-4">Fordern Sie jetzt ein kostenloses und unverbindliches Angebot an.</p>
            <Link href="/angebot" className="btn-primary">Kostenloses Angebot</Link>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container mx-auto max-w-4xl">
            <h2 className="mb-8 text-center">Weitere Artikel</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {related.map((r) => (
                <Link key={r.id} href={`/blog/${r.slug}`} className="card p-6 group">
                  <h3 className="text-lg mb-2 group-hover:text-primary transition-colors">{r.title}</h3>
                  <p className="text-sm text-gray-600">{r.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner />
    </>
  );
}
