import { prisma } from '@/lib/prisma';
import Link from 'next/link';

async function getStats() {
  const [totalRequests, pendingRequests, totalBlog, totalTestimonials, recentRequests] = await Promise.all([
    prisma.contactRequest.count().catch(() => 0),
    prisma.contactRequest.count({ where: { status: 'neu' } }).catch(() => 0),
    prisma.blogPost.count().catch(() => 0),
    prisma.testimonial.count().catch(() => 0),
    prisma.contactRequest.findMany({ take: 5, orderBy: { createdAt: 'desc' } }).catch(() => []),
  ]);
  const quoteCount = await prisma.quoteRequest.count().catch(() => 0);
  const quotePending = await prisma.quoteRequest.count({ where: { status: 'neu' } }).catch(() => 0);
  return { totalRequests: totalRequests + quoteCount, pendingRequests: pendingRequests + quotePending, totalBlog, totalTestimonials, recentRequests };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    { label: 'Neue Anfragen', value: stats.pendingRequests, icon: '📬', color: 'bg-red-50 text-red-600', href: '/admin/anfragen' },
    { label: 'Alle Anfragen', value: stats.totalRequests, icon: '📋', color: 'bg-blue-50 text-blue-600', href: '/admin/anfragen' },
    { label: 'Blog-Artikel', value: stats.totalBlog, icon: '✍️', color: 'bg-green-50 text-green-600', href: '/admin/blog' },
    { label: 'Bewertungen', value: stats.totalTestimonials, icon: '⭐', color: 'bg-yellow-50 text-yellow-600', href: '/admin/testimonials' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map(c => (
          <Link key={c.label} href={c.href} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 rounded-lg ${c.color} flex items-center justify-center text-xl mb-3`}>{c.icon}</div>
            <div className="text-2xl font-bold text-gray-800">{c.value}</div>
            <div className="text-sm text-gray-500 mt-0.5">{c.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent requests */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-gray-800">Neueste Anfragen</h2>
            <Link href="/admin/anfragen" className="text-primary text-sm hover:underline">Alle anzeigen</Link>
          </div>
          {stats.recentRequests.length === 0 ? (
            <p className="text-gray-500 text-sm">Noch keine Anfragen vorhanden.</p>
          ) : (
            <div className="space-y-3">
              {stats.recentRequests.map((r: any) => (
                <div key={r.id} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">{r.name.charAt(0)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-800">{r.name}</div>
                    <div className="text-xs text-gray-500 truncate">{r.subject || r.email}</div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${r.status === 'neu' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-bold text-gray-800 mb-4">Schnellaktionen</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Neuer Blog-Artikel', href: '/admin/blog/neu', icon: '✍️' },
              { label: 'Anfragen prüfen', href: '/admin/anfragen', icon: '📬' },
              { label: 'Bewertung hinzufügen', href: '/admin/testimonials', icon: '⭐' },
              { label: 'Einstellungen', href: '/admin/einstellungen', icon: '⚙️' },
            ].map(a => (
              <Link key={a.href} href={a.href} className="flex items-center gap-2 p-3 border border-gray-200 rounded-xl hover:border-primary hover:bg-primary-50 transition-colors text-sm font-medium text-gray-700 hover:text-primary">
                <span>{a.icon}</span>{a.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
