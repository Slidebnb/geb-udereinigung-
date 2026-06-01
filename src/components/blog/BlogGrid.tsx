'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  coverImage: string | null;
  author: string;
  publishedAt: string;
}

interface BlogGridProps {
  posts: Post[];
}

const catBadge: Record<string, string> = {
  'Ratgeber':          'bg-indigo-100 text-indigo-700',
  'Tipps':             'bg-emerald-100 text-emerald-700',
  'Kosten':            'bg-amber-100 text-amber-700',
  'Winterdienst':      'bg-sky-100 text-sky-700',
  'Hausmeisterdienste':'bg-purple-100 text-purple-700',
  'FAQ':               'bg-orange-100 text-orange-700',
  'Reinigung':         'bg-blue-100 text-blue-700',
};
const defaultBadge = 'bg-blue-100 text-blue-700';

const catGradient: Record<string, string> = {
  'Ratgeber':          'linear-gradient(135deg,#1e40af 0%,#60a5fa 100%)',
  'Tipps':             'linear-gradient(135deg,#065f46 0%,#34d399 100%)',
  'Kosten':            'linear-gradient(135deg,#92400e 0%,#fbbf24 100%)',
  'Winterdienst':      'linear-gradient(135deg,#0e7490 0%,#38bdf8 100%)',
  'Hausmeisterdienste':'linear-gradient(135deg,#4c1d95 0%,#a78bfa 100%)',
  'FAQ':               'linear-gradient(135deg,#9a3412 0%,#fb923c 100%)',
  'Reinigung':         'linear-gradient(135deg,#1B3E62 0%,#4BB8F5 100%)',
};
const defaultGradient = 'linear-gradient(135deg,#0C2340 0%,#1B3E62 100%)';

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' });
}

export default function BlogGrid({ posts }: BlogGridProps) {
  const categories = ['Alle', ...Array.from(new Set(posts.map(p => p.category)))];
  const [active, setActive] = useState('Alle');

  const filtered = active === 'Alle' ? posts : posts.filter(p => p.category === active);
  const [featured, ...rest] = filtered;

  return (
    <div>
      {/* Category filter */}
      {categories.length > 2 && (
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                active === cat
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-primary/50 hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 py-16">Keine Beiträge in dieser Kategorie.</p>
      )}

      {/* Featured post */}
      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="group block rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 mb-10 md:grid md:grid-cols-5"
        >
          <div className="md:col-span-2 relative h-56 md:h-auto" style={{ background: catGradient[featured.category] || defaultGradient }}>
            {featured.coverImage && (
              <img src={featured.coverImage} alt={featured.title} className="absolute inset-0 w-full h-full object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:bg-gradient-to-r" />
            <span className="absolute top-4 left-4 text-xs font-bold text-white bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30">
              ⭐ Empfohlen
            </span>
          </div>
          <div className="md:col-span-3 p-7 md:p-10 flex flex-col justify-center bg-white">
            <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 w-fit ${catBadge[featured.category] || defaultBadge}`}>
              {featured.category}
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors leading-snug">
              {featured.title}
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3">{featured.excerpt}</p>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs flex-shrink-0">H</div>
              <span>{featured.author}</span>
              <span>·</span>
              <span>{formatDate(featured.publishedAt)}</span>
            </div>
          </div>
        </Link>
      )}

      {/* Grid */}
      {rest.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map(post => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 overflow-hidden bg-white"
            >
              <div className="relative h-48" style={{ background: catGradient[post.category] || defaultGradient }}>
                {post.coverImage && (
                  <img src={post.coverImage} alt={post.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <span className={`absolute bottom-3 left-3 text-xs font-semibold px-2.5 py-0.5 rounded-full ${catBadge[post.category] || defaultBadge}`}>
                  {post.category}
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-50">
                  <span>{formatDate(post.publishedAt)}</span>
                  <span className="text-primary font-medium group-hover:underline">Weiterlesen →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
