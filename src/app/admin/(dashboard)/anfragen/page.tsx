import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/utils';

async function getRequests() {
  const [contacts, quotes] = await Promise.all([
    prisma.contactRequest.findMany({ orderBy: { createdAt: 'desc' } }).catch(() => []),
    prisma.quoteRequest.findMany({ orderBy: { createdAt: 'desc' } }).catch(() => []),
  ]);
  return { contacts, quotes };
}

export default async function AnfragenPage() {
  const { contacts, quotes } = await getRequests();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Anfragen</h1>

      {/* Contact requests */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Kontaktanfragen ({contacts.length})</h2>
        {contacts.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center text-gray-500 shadow-sm">Keine Kontaktanfragen vorhanden.</div>
        ) : (
          <div className="space-y-3">
            {contacts.map((r: any) => (
              <div key={r.id} className="bg-white rounded-xl p-5 shadow-sm flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">{r.name.charAt(0)}</div>
                    <div>
                      <div className="font-semibold text-gray-800">{r.name}</div>
                      <div className="text-xs text-gray-500">{r.email}{r.phone ? ` · ${r.phone}` : ''}</div>
                    </div>
                    <span className={`ml-auto text-xs px-2 py-1 rounded-full ${r.status === 'neu' ? 'bg-red-100 text-red-700 font-medium' : r.status === 'gelesen' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                      {r.status}
                    </span>
                  </div>
                  {r.subject && <div className="text-sm font-medium text-gray-700 mb-1">{r.subject}</div>}
                  <p className="text-sm text-gray-600 leading-relaxed">{r.message}</p>
                  <div className="text-xs text-gray-400 mt-2">{formatDate(r.createdAt)}</div>
                </div>
                <div className="flex gap-2 md:flex-col shrink-0">
                  <a href={`mailto:${r.email}`} className="btn-primary text-xs px-3 py-2">Antworten</a>
                  {r.phone && <a href={`tel:${r.phone}`} className="btn-secondary text-xs px-3 py-2">Anrufen</a>}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Quote requests */}
      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Angebotsanfragen ({quotes.length})</h2>
        {quotes.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center text-gray-500 shadow-sm">Keine Angebotsanfragen vorhanden.</div>
        ) : (
          <div className="space-y-3">
            {quotes.map((r: any) => (
              <div key={r.id} className="bg-white rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 bg-accent rounded-full flex items-center justify-center text-white text-sm font-bold">{r.name.charAt(0)}</div>
                  <div>
                    <div className="font-semibold text-gray-800">{r.name}</div>
                    <div className="text-xs text-gray-500">{r.email} · {r.phone}</div>
                  </div>
                  <span className={`ml-auto text-xs px-2 py-1 rounded-full ${r.status === 'neu' ? 'bg-red-100 text-red-700 font-medium' : 'bg-green-100 text-green-700'}`}>{r.status}</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                  <div><span className="text-gray-400">Leistung:</span> <span className="font-medium">{r.service}</span></div>
                  {r.area && <div><span className="text-gray-400">Fläche:</span> <span className="font-medium">{r.area}</span></div>}
                  {r.frequency && <div><span className="text-gray-400">Häufigkeit:</span> <span className="font-medium">{r.frequency}</span></div>}
                  {r.company && <div><span className="text-gray-400">Firma:</span> <span className="font-medium">{r.company}</span></div>}
                </div>
                {r.estimatedMin && (
                  <div className="text-sm bg-green-50 text-green-700 px-3 py-1.5 rounded-lg inline-block mb-2">
                    Geschätzter Preis: {r.estimatedMin}€ – {r.estimatedMax}€
                  </div>
                )}
                {r.message && <p className="text-sm text-gray-600">{r.message}</p>}
                <div className="flex gap-2 mt-3">
                  <a href={`mailto:${r.email}`} className="btn-primary text-xs px-3 py-2">Angebot senden</a>
                  <a href={`tel:${r.phone}`} className="btn-secondary text-xs px-3 py-2">Anrufen</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
