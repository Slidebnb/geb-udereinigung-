'use client';

import { useEffect, useState } from 'react';

interface Subscriber {
  id: string;
  email: string;
  createdAt: string;
}

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/admin/newsletter')
      .then(r => r.json())
      .then(d => setSubscribers(d.subscribers || []))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string, email: string) => {
    if (!confirm(`Abonnent "${email}" wirklich löschen?`)) return;
    const res = await fetch('/api/admin/newsletter', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) setSubscribers(prev => prev.filter(s => s.id !== id));
  };

  const handleExport = () => {
    const header = 'E-Mail,Datum\n';
    const rows = filtered.map(s => `${s.email},${new Date(s.createdAt).toLocaleDateString('de-DE')}`).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-abonnenten-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = subscribers.filter(s => s.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Newsletter-Abonnenten</h1>
          <p className="text-sm text-gray-500 mt-0.5">{subscribers.length} Abonnenten gesamt</p>
        </div>
        <button
          onClick={handleExport}
          disabled={subscribers.length === 0}
          className="btn-primary text-sm px-4 py-2 disabled:opacity-50"
        >
          CSV exportieren
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="E-Mail suchen…"
            className="input-field text-sm"
          />
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-400">Laden…</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-4xl mb-3">📧</div>
            <p className="text-gray-500">
              {search ? 'Keine Treffer für diese Suche.' : 'Noch keine Abonnenten vorhanden.'}
            </p>
          </div>
        ) : (
          <>
            <div className="hidden md:grid grid-cols-[1fr_1fr_auto] gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              <div>E-Mail</div>
              <div>Angemeldet am</div>
              <div></div>
            </div>
            <div className="divide-y divide-gray-100">
              {filtered.map(s => (
                <div key={s.id} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-2 md:gap-4 px-6 py-3 items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-xs font-bold shrink-0">
                      {s.email.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm text-gray-800">{s.email}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(s.createdAt).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </div>
                  <button
                    onClick={() => handleDelete(s.id, s.email)}
                    className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition-colors"
                    title="Abonnent löschen"
                  >
                    Löschen
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
