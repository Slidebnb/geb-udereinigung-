'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LEISTUNGEN = [
  'Alle',
  'Gebäudereinigung',
  'Büroreinigung',
  'Treppenhausreinigung',
  'Glasreinigung',
  'Grundreinigung',
  'Unterhaltsreinigung',
  'Baureinigung',
  'Hausmeisterdienste',
  'Winterdienst',
  'Gartenarbeiten',
];

const ORTE = ['Alle', 'Neuwied', 'Koblenz', 'Bendorf', 'Andernach', 'Mayen', 'Höhr-Grenzhausen', 'Haiger', 'Vallendar', 'Nauort', 'Westerwald', 'Puderbach', 'Dierdorf', 'Allgemein'];

const ARTIKELTYPEN = [
  'Alle',
  'Ratgeber/How-To',
  'Kosten-Artikel',
  'Vergleich',
  'FAQ-Artikel',
  'Lokaler Ratgeber',
];

const TYPE_COLORS: Record<string, string> = {
  ratgeber: 'bg-blue-100 text-blue-700',
  'kosten-artikel': 'bg-yellow-100 text-yellow-700',
  vergleich: 'bg-purple-100 text-purple-700',
  'faq-artikel': 'bg-green-100 text-green-700',
  'lokaler-ratgeber': 'bg-orange-100 text-orange-700',
};

interface Topic {
  title: string;
  keyword: string;
  type: string;
  leistung: string;
  ort: string;
}

export default function ThemenplanerPage() {
  const router = useRouter();
  const [leistung, setLeistung] = useState('Alle');
  const [ort, setOrt] = useState('Alle');
  const [artikeltyp, setArtikeltyp] = useState('Alle');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);

  const handleSuggest = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/ai-blog/suggest-topics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leistung: leistung === 'Alle' ? null : leistung,
          ort: ort === 'Alle' ? null : ort,
          artikeltyp: artikeltyp === 'Alle' ? null : artikeltyp,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || 'Fehler beim Laden der Themen.');
        return;
      }

      setTopics(data.topics || []);
    } catch {
      setError('Netzwerkfehler. Bitte erneut versuchen.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = (topic: Topic) => {
    const params = new URLSearchParams();
    params.set('keyword', topic.keyword);
    if (topic.leistung) params.set('leistung', topic.leistung);
    if (topic.ort) params.set('ort', topic.ort);
    router.push(`/admin/blog/ki-erstellen?${params.toString()}`);
  };

  const getTypeBadgeClass = (type: string) => {
    const key = type.toLowerCase().replace(/[/\s]+/g, '-');
    return TYPE_COLORS[key] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Themenplaner</h1>
        <p className="text-gray-500 text-sm mt-1">Lass dir passende Blog-Themen für deine Leistungen vorschlagen.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-5 text-sm">
          {error}
        </div>
      )}

      {/* Filter */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-base font-semibold text-gray-800 mb-4">Filter</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Leistung</label>
            <select
              value={leistung}
              onChange={e => setLeistung(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              disabled={loading}
            >
              {LEISTUNGEN.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Ort</label>
            <select
              value={ort}
              onChange={e => setOrt(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              disabled={loading}
            >
              {ORTE.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Artikeltyp</label>
            <select
              value={artikeltyp}
              onChange={e => setArtikeltyp(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              disabled={loading}
            >
              {ARTIKELTYPEN.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSuggest}
            disabled={loading}
            className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Lade Themen…
              </>
            ) : (
              <>📋 Themen vorschlagen</>
            )}
          </button>
        </div>
      </div>

      {/* Topics */}
      {topics.length > 0 && (
        <div>
          <h2 className="text-base font-semibold text-gray-700 mb-3">{topics.length} Themenvorschläge</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topics.map((topic, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-medium text-gray-800 text-sm leading-snug flex-1">{topic.title}</h3>
                  <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${getTypeBadgeClass(topic.type)}`}>
                    {topic.type}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  <span className="font-medium text-gray-600">Keyword:</span> {topic.keyword}
                  {topic.leistung && <> &middot; <span className="font-medium text-gray-600">Leistung:</span> {topic.leistung}</>}
                  {topic.ort && <> &middot; <span className="font-medium text-gray-600">Ort:</span> {topic.ort}</>}
                </div>
                <button
                  onClick={() => handleCreate(topic)}
                  className="mt-auto w-full border border-primary text-primary px-3 py-2 rounded-lg text-xs font-medium hover:bg-primary/5 transition-colors"
                >
                  Dieses Thema erstellen →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {topics.length === 0 && !loading && (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <div className="text-4xl mb-3">📋</div>
          <p className="text-gray-500 text-sm">Wähle Filter und klicke auf &quot;Themen vorschlagen&quot;.</p>
        </div>
      )}
    </div>
  );
}
