'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  published: boolean;
  publishedAt: string;
  author: string;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'alle' | 'veröffentlicht' | 'entwurf'>('alle');

  useEffect(() => {
    fetch('/api/admin/blog')
      .then(r => r.json())
      .then(d => setPosts(d.posts || []))
      .finally(() => setLoading(false));
  }, []);

  const handleToggle = async (post: BlogPost) => {
    const res = await fetch('/api/admin/blog', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: post.id, published: !post.published }),
    });
    if (res.ok) {
      setPosts(prev => prev.map(p => p.id === post.id ? { ...p, published: !p.published } : p));
    }
  };

  const handleDelete = async (post: BlogPost) => {
    if (!confirm(`Artikel "${post.title}" wirklich löschen?`)) return;
    const res = await fetch('/api/admin/blog', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: post.id }),
    });
    if (res.ok) setPosts(prev => prev.filter(p => p.id !== post.id));
  };

  const filtered = posts.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'alle' || (filter === 'veröffentlicht' ? p.published : !p.published);
    return matchSearch && matchFilter;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Blog-Artikel</h1>
        <Link href="/admin/blog/neu" className="btn-primary">+ Neuer Artikel</Link>
      </div>

      <div className="flex gap-3 mb-4 flex-wrap">
        <input
          type="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Titel oder Kategorie suchen…"
          className="input-field text-sm flex-1 min-w-48"
        />
        <div className="flex rounded-lg border border-gray-200 overflow-hidden bg-white text-sm">
          {(['alle', 'veröffentlicht', 'entwurf'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 capitalize transition-colors ${filter === f ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl p-8 text-center text-gray-400 shadow-sm">Laden…</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <div className="text-4xl mb-4">✍️</div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            {posts.length === 0 ? 'Noch keine Artikel' : 'Keine Treffer'}
          </h2>
          <p className="text-gray-500 mb-4">
            {posts.length === 0 ? 'Erstellen Sie Ihren ersten Blog-Artikel.' : 'Suche oder Filter anpassen.'}
          </p>
          {posts.length === 0 && <Link href="/admin/blog/neu" className="btn-primary">Artikel erstellen</Link>}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(post => (
            <div key={post.id} className="bg-white rounded-xl p-5 shadow-sm flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs bg-primary-50 text-primary px-2 py-0.5 rounded-full">{post.category}</span>
                  <button
                    onClick={() => handleToggle(post)}
                    className={`text-xs px-2 py-0.5 rounded-full font-medium transition-colors ${
                      post.published
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                    title={post.published ? 'Auf Entwurf setzen' : 'Veröffentlichen'}
                  >
                    {post.published ? '✓ Veröffentlicht' : '○ Entwurf'}
                  </button>
                </div>
                <h2 className="font-semibold text-gray-800 mb-1 truncate">{post.title}</h2>
                <p className="text-sm text-gray-500 line-clamp-1">{post.excerpt}</p>
                <div className="text-xs text-gray-400 mt-1">
                  {new Date(post.publishedAt).toLocaleDateString('de-DE')} · {post.author}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Link
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  className="text-xs border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Ansehen
                </Link>
                <Link
                  href={`/admin/blog/${post.id}`}
                  className="text-xs bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Bearbeiten
                </Link>
                <button
                  onClick={() => handleDelete(post)}
                  className="text-xs text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Löschen
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
