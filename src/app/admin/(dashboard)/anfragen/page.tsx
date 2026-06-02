'use client';

import { useState, useEffect } from 'react';

type Status = 'neu' | 'gelesen' | 'beantwortet';

type ContactRequest = {
  id: string; name: string; email: string; phone: string | null;
  subject: string | null; message: string; status: Status;
  mailSent: boolean; createdAt: string;
};

type QuoteRequest = {
  id: string; name: string; email: string; phone: string;
  service: string; area: string | null; frequency: string | null;
  company: string | null; message: string | null; status: Status;
  mailSent: boolean; estimatedMin: number | null; estimatedMax: number | null;
  createdAt: string;
};

function formatDate(d: string) {
  return new Date(d).toLocaleString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

const STATUS_LABELS: Record<Status, string> = { neu: 'Neu', gelesen: 'Gelesen', beantwortet: 'Beantwortet' };
const STATUS_STYLES: Record<Status, string> = {
  neu: 'bg-red-100 text-red-700 font-medium',
  gelesen: 'bg-yellow-100 text-yellow-700',
  beantwortet: 'bg-green-100 text-green-700',
};

export default function AnfragenPage() {
  const [contacts, setContacts] = useState<ContactRequest[]>([]);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/requests')
      .then(r => r.json())
      .then(d => { setContacts(d.contacts || []); setQuotes(d.quotes || []); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id: string, type: 'contact' | 'quote', status: Status) => {
    await fetch('/api/admin/requests', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, type, status }),
    });
    if (type === 'contact') {
      setContacts(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    } else {
      setQuotes(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    }
  };

  const remove = async (id: string, type: 'contact' | 'quote') => {
    if (!confirm('Anfrage wirklich löschen?')) return;
    await fetch('/api/admin/requests', {
      method: 'DELETE', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, type }),
    });
    if (type === 'contact') {
      setContacts(prev => prev.filter(r => r.id !== id));
    } else {
      setQuotes(prev => prev.filter(r => r.id !== id));
    }
  };

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Anfragen</h1>
        <div className="bg-white rounded-xl p-12 text-center text-gray-400 shadow-sm">Lade Anfragen…</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Anfragen</h1>
        <p className="text-sm text-gray-500">
          {contacts.filter(r => r.status === 'neu').length + quotes.filter(r => r.status === 'neu').length} neue Anfragen
        </p>
      </div>

      {/* Contact requests */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Kontaktanfragen ({contacts.length})</h2>
        {contacts.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center text-gray-500 shadow-sm">Keine Kontaktanfragen vorhanden.</div>
        ) : (
          <div className="space-y-3">
            {contacts.map((r) => (
              <div key={r.id} className={`bg-white rounded-xl p-5 shadow-sm flex flex-col md:flex-row md:items-start gap-4 border transition-colors ${r.status === 'neu' ? 'border-red-100' : 'border-transparent'}`}>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">{r.name.charAt(0)}</div>
                    <div>
                      <div className="font-semibold text-gray-800">{r.name}</div>
                      <div className="text-xs text-gray-500">{r.email}{r.phone ? ` · ${r.phone}` : ''}</div>
                    </div>
                    <span className={`ml-auto text-xs px-2 py-1 rounded-full ${STATUS_STYLES[r.status]}`}>{STATUS_LABELS[r.status]}</span>
                    {!r.mailSent && (
                      <span className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-700 font-medium" title="E-Mail-Benachrichtigung wurde nicht gesendet">⚠️ Mail fehlt</span>
                    )}
                  </div>
                  {r.subject && <div className="text-sm font-medium text-gray-700 mb-1">{r.subject}</div>}
                  <p className="text-sm text-gray-600 leading-relaxed">{r.message}</p>
                  <div className="text-xs text-gray-400 mt-2">{formatDate(r.createdAt)}</div>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {r.status !== 'gelesen' && (
                      <button onClick={() => updateStatus(r.id, 'contact', 'gelesen')} className="text-xs px-2.5 py-1 rounded-full bg-yellow-50 text-yellow-700 hover:bg-yellow-100 transition-colors font-medium">Als gelesen</button>
                    )}
                    {r.status !== 'beantwortet' && (
                      <button onClick={() => updateStatus(r.id, 'contact', 'beantwortet')} className="text-xs px-2.5 py-1 rounded-full bg-green-50 text-green-700 hover:bg-green-100 transition-colors font-medium">Als beantwortet</button>
                    )}
                    {r.status !== 'neu' && (
                      <button onClick={() => updateStatus(r.id, 'contact', 'neu')} className="text-xs px-2.5 py-1 rounded-full bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors">Zurücksetzen</button>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 md:flex-col shrink-0">
                  <a href={`mailto:${r.email}`} className="btn-primary text-xs px-3 py-2">Antworten</a>
                  {r.phone && <a href={`tel:${r.phone}`} className="btn-secondary text-xs px-3 py-2">Anrufen</a>}
                  <button onClick={() => remove(r.id, 'contact')} className="text-xs px-3 py-2 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors border border-transparent hover:border-red-100">🗑</button>
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
            {quotes.map((r) => (
              <div key={r.id} className={`bg-white rounded-xl p-5 shadow-sm border transition-colors ${r.status === 'neu' ? 'border-red-100' : 'border-transparent'}`}>
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <div className="w-9 h-9 bg-accent rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">{r.name.charAt(0)}</div>
                  <div>
                    <div className="font-semibold text-gray-800">{r.name}</div>
                    <div className="text-xs text-gray-500">{r.email} · {r.phone}</div>
                  </div>
                  <span className={`ml-auto text-xs px-2 py-1 rounded-full ${STATUS_STYLES[r.status] ?? 'bg-gray-100 text-gray-600'}`}>{STATUS_LABELS[r.status] ?? r.status}</span>
                  {!r.mailSent && (
                    <span className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-700 font-medium" title="E-Mail-Benachrichtigung wurde nicht gesendet">⚠️ Mail fehlt</span>
                  )}
                  <button onClick={() => remove(r.id, 'quote')} className="text-xs px-3 py-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors border border-transparent hover:border-red-100">🗑</button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                  <div><span className="text-gray-400">Leistung:</span> <span className="font-medium">{r.service}</span></div>
                  {r.area && <div><span className="text-gray-400">Fläche:</span> <span className="font-medium">{r.area}</span></div>}
                  {r.frequency && <div><span className="text-gray-400">Häufigkeit:</span> <span className="font-medium">{r.frequency}</span></div>}
                  {r.company && <div><span className="text-gray-400">Firma:</span> <span className="font-medium">{r.company}</span></div>}
                </div>
                {r.estimatedMin != null && (
                  <div className="text-sm bg-green-50 text-green-700 px-3 py-1.5 rounded-lg inline-block mb-2">
                    Geschätzter Preis: {r.estimatedMin}€ – {r.estimatedMax}€
                  </div>
                )}
                {r.message && <p className="text-sm text-gray-600 mb-3">{r.message}</p>}
                <div className="flex gap-2 mt-1 flex-wrap items-center">
                  <a href={`mailto:${r.email}`} className="btn-primary text-xs px-3 py-2">Angebot senden</a>
                  <a href={`tel:${r.phone}`} className="btn-secondary text-xs px-3 py-2">Anrufen</a>
                  <div className="ml-auto flex gap-2 flex-wrap">
                    {r.status !== 'gelesen' && (
                      <button onClick={() => updateStatus(r.id, 'quote', 'gelesen')} className="text-xs px-2.5 py-1 rounded-full bg-yellow-50 text-yellow-700 hover:bg-yellow-100 transition-colors font-medium">Als gelesen</button>
                    )}
                    {r.status !== 'beantwortet' && (
                      <button onClick={() => updateStatus(r.id, 'quote', 'beantwortet')} className="text-xs px-2.5 py-1 rounded-full bg-green-50 text-green-700 hover:bg-green-100 transition-colors font-medium">Als beantwortet</button>
                    )}
                    {r.status !== 'neu' && (
                      <button onClick={() => updateStatus(r.id, 'quote', 'neu')} className="text-xs px-2.5 py-1 rounded-full bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors">Zurücksetzen</button>
                    )}
                  </div>
                </div>
                <div className="text-xs text-gray-400 mt-2">{formatDate(r.createdAt)}</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
