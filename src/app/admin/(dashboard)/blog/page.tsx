import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { publishedAt: 'desc' } }).catch(() => []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Blog-Artikel</h1>
        <Link href="/admin/blog/neu" className="btn-primary">+ Neuer Artikel</Link>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <div className="text-4xl mb-4">✍️</div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Noch keine Artikel</h2>
          <p className="text-gray-500 mb-4">Erstellen Sie Ihren ersten Blog-Artikel.</p>
          <Link href="/admin/blog/neu" className="btn-primary">Artikel erstellen</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post: any) => (
            <div key={post.id} className="bg-white rounded-xl p-5 shadow-sm flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs bg-primary-50 text-primary px-2 py-0.5 rounded-full">{post.category}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${post.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {post.published ? 'Veröffentlicht' : 'Entwurf'}
                  </span>
                </div>
                <h2 className="font-semibold text-gray-800 mb-1">{post.title}</h2>
                <p className="text-sm text-gray-500 line-clamp-1">{post.excerpt}</p>
                <div className="text-xs text-gray-400 mt-1">{formatDate(post.publishedAt)} · {post.author}</div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Link href={`/blog/${post.slug}`} target="_blank" className="text-xs border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">Ansehen</Link>
                <Link href={`/admin/blog/${post.id}`} className="text-xs bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-primary-800 transition-colors">Bearbeiten</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
