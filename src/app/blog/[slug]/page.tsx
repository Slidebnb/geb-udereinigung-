import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CTABanner from '@/components/home/CTABanner';
import ScrollProgress from '@/components/blog/ScrollProgress';
import { prisma } from '@/lib/prisma';
import { siteConfig } from '@/lib/site';
import { renderMarkdown } from '@/lib/markdown';

export const revalidate = 60;

interface Props { params: { slug: string } }

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

const catBadge: Record<string, string> = {
  'Ratgeber': 'bg-indigo-100 text-indigo-700',
  'Tipps': 'bg-emerald-100 text-emerald-700',
  'Kosten': 'bg-amber-100 text-amber-700',
  'Winterdienst': 'bg-sky-100 text-sky-700',
  'Hausmeisterdienste': 'bg-purple-100 text-purple-700',
  'FAQ': 'bg-orange-100 text-orange-700',
  'Reinigung': 'bg-blue-100 text-blue-700',
};

const catGradient: Record<string, string> = {
  'Ratgeber': 'linear-gradient(135deg,#1e40af 0%,#60a5fa 100%)',
  'Tipps': 'linear-gradient(135deg,#065f46 0%,#34d399 100%)',
  'Kosten': 'linear-gradient(135deg,#92400e 0%,#fbbf24 100%)',
  'Winterdienst': 'linear-gradient(135deg,#0e7490 0%,#38bdf8 100%)',
  'Hausmeisterdienste': 'linear-gradient(135deg,#4c1d95 0%,#a78bfa 100%)',
  'FAQ': 'linear-gradient(135deg,#9a3412 0%,#fb923c 100%)',
  'Reinigung': 'linear-gradient(135deg,#1B3E62 0%,#4BB8F5 100%)',
};
const defaultGradient = 'linear-gradient(135deg,#0C2340 0%,#1B3E62 100%)';

export default async function BlogPostPage({ params }: Props) {
  const post = await getPost(params.slug);
  if (!post || !post.published) notFound();

  let related: { id: string; title: string; slug: string; category: string; coverImage: string | null }[] = [];
  try {
    related = await prisma.blogPost.findMany({
      where: { published: true, slug: { not: post.slug } },
      orderBy: { publishedAt: 'desc' },
      take: 3,
      select: { id: true, title: true, slug: true, category: true, coverImage: true },
    });
  } catch { related = []; }

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

  const date = post.publishedAt.toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' });
  const badge = catBadge[post.category] || 'bg-blue-100 text-blue-700';
  const gradient = catGradient[post.category] || defaultGradient;
  const readingTime = Math.max(1, Math.round(post.content.trim().split(/\s+/).length / 200));
  const shareUrl = `${siteConfig.url}/blog/${post.slug}`;
  const shareText = encodeURIComponent(post.title);

  return (
    <>
      <ScrollProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      {/* Hero */}
      <section className="relative h-64 md:h-96 overflow-hidden" style={{ background: gradient }}>
        {post.coverImage && (
          <img src={post.coverImage} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(12,35,64,0.85) 0%, rgba(12,35,64,0.4) 60%, transparent 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto pb-8">
          <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: post.title }]} dark />
        </div>
      </section>

      <article className="section-padding bg-white">
        <div className="container mx-auto max-w-3xl">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${badge}`}>{post.category}</span>
            <span className="text-gray-400 text-sm">{date}</span>
            <span className="text-gray-300">·</span>
            <span className="text-gray-400 text-sm">⏱ {readingTime} Min. Lesezeit</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-dark leading-tight mb-6">{post.title}</h1>

          <p className="text-lg text-gray-500 leading-relaxed mb-8 border-l-4 border-primary/30 pl-4 italic">{post.excerpt}</p>

          {/* Author */}
          <div className="flex items-center gap-3 mb-10 pb-8 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">H</div>
            <div>
              <div className="font-semibold text-gray-800 text-sm">{post.author}</div>
              <div className="text-gray-400 text-xs">Huwa Gebäudereinigung · Neuwied</div>
            </div>
          </div>

          {/* Content */}
          <div className="prose-content">
            {renderMarkdown(post.content)}
          </div>

          {/* Share */}
          <div className="mt-10 pt-8 border-t border-gray-100">
            <p className="text-sm font-semibold text-gray-500 mb-4">Artikel teilen:</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`https://wa.me/?text=${shareText}%20${encodeURIComponent(shareUrl)}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 text-sm font-medium hover:bg-[#25D366]/20 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.83L.057 23.428a.5.5 0 00.606.665l5.765-1.512A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.875a9.864 9.864 0 01-5.022-1.373l-.36-.214-3.73.978.996-3.639-.235-.374A9.864 9.864 0 012.125 12C2.125 6.554 6.554 2.125 12 2.125S21.875 6.554 21.875 12 17.446 21.875 12 21.875z"/></svg>
                WhatsApp
              </a>
              <a
                href={`mailto:?subject=${shareText}&body=${encodeURIComponent(shareUrl)}`}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 text-gray-600 border border-gray-200 text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                Per E-Mail
              </a>
              <Link href="/blog" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/8 text-primary border border-primary/20 text-sm font-medium hover:bg-primary/15 transition-colors">
                ← Alle Artikel
              </Link>
            </div>
          </div>

          {/* CTA box */}
          <div className="mt-10 rounded-2xl p-8 text-center" style={{ background: 'linear-gradient(135deg, #0C2340 0%, #1B3E62 100%)' }}>
            <div className="text-3xl mb-3">💬</div>
            <h3 className="text-white text-xl font-bold mb-2">Kostenlose Beratung anfragen</h3>
            <p className="text-slate-300 text-sm mb-5">Wir erstellen Ihnen ein individuelles Angebot – kostenlos und innerhalb von 24 Stunden.</p>
            <Link href="/angebot" className="btn-primary">Jetzt Angebot anfordern</Link>
          </div>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="section-padding" style={{ background: '#F8FAFC' }}>
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-dark mb-8">Weitere Artikel</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map(r => (
                <Link key={r.id} href={`/blog/${r.slug}`}
                  className="group rounded-2xl border border-gray-100 overflow-hidden bg-white hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 flex flex-col">
                  <div className="h-32 relative" style={{ background: catGradient[r.category] || defaultGradient }}>
                    {r.coverImage && <img src={r.coverImage} alt={r.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />}
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full w-fit mb-2 ${catBadge[r.category] || 'bg-blue-100 text-blue-700'}`}>{r.category}</span>
                    <h3 className="text-sm font-bold text-gray-800 group-hover:text-primary transition-colors leading-snug line-clamp-2">{r.title}</h3>
                  </div>
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
