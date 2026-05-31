'use client';

import { useState } from 'react';
import Link from 'next/link';

const LEISTUNGEN = [
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

const ORTE = ['Neuwied', 'Koblenz', 'Bendorf', 'Andernach', 'Mayen', 'Allgemein'];

const ZIELGRUPPEN = [
  'Hausverwaltungen',
  'Gewerbeobjekte',
  'Privatpersonen',
  'WEGs',
  'Allgemein',
];

const ARTIKELTYPEN = [
  'Ratgeber/How-To',
  'Kosten-Artikel',
  'Vergleich',
  'FAQ-Artikel',
  'Lokaler Ratgeber',
];

const LAENGEN = [
  { label: 'Kurz ~400 Wörter', value: 'kurz' },
  { label: 'Mittel ~700 Wörter', value: 'mittel' },
  { label: 'Lang ~1000 Wörter', value: 'lang' },
];

const TONALITAETEN = [
  'Professionell & sachlich',
  'Beratend & hilfsbereit',
  'Direkt & lokal',
];

type State = 'idle' | 'generating' | 'preview' | 'saving' | 'saved';

interface GeneratedArticle {
  title: string;
  slug: string;
  excerpt: string;
  metaTitle: string;
  metaDesc: string;
  category: string;
  content: string;
  coverImageSuggestion: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default function KiBlogPage() {
  const [state, setState] = useState<State>('idle');
  const [savedId, setSavedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Form fields
  const [keyword, setKeyword] = useState('');
  const [leistung, setLeistung] = useState(LEISTUNGEN[0]);
  const [ort, setOrt] = useState(ORTE[0]);
  const [zielgruppe, setZielgruppe] = useState(ZIELGRUPPEN[0]);
  const [artikeltyp, setArtikeltyp] = useState(ARTIKELTYPEN[0]);
  const [laenge, setLaenge] = useState('mittel');
  const [tonalitaet, setTonalitaet] = useState(TONALITAETEN[0]);

  // Generated / editable article fields
  const [article, setArticle] = useState<GeneratedArticle>({
    title: '',
    slug: '',
    excerpt: '',
    metaTitle: '',
    metaDesc: '',
    category: '',
    content: '',
    coverImageSuggestion: '',
  });

  const handleGenerate = async () => {
    if (!keyword.trim()) {
      setError('Bitte ein Hauptkeyword eingeben.');
      return;
    }
    setError(null);
    setState('generating');

    try {
      const res = await fetch('/api/admin/ai-blog/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword, leistung, ort, zielgruppe, artikeltyp, laenge, tonalitaet }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || 'Unbekannter Fehler.');
        setState('idle');
        return;
      }

      setArticle({
        title: data.article.title || '',
        slug: data.article.slug || slugify(data.article.title || ''),
        excerpt: data.article.excerpt || '',
        metaTitle: data.article.metaTitle || '',
        metaDesc: data.article.metaDesc || '',
        category: data.article.category || 'Ratgeber',
        content: data.article.content || '',
        coverImageSuggestion: data.article.coverImageSuggestion || '',
      });
      setState('preview');
    } catch {
      setError('Netzwerkfehler. Bitte erneut versuchen.');
      setState('idle');
    }
  };

  const handleSave = async (contentStatus: 'draft' | 'review') => {
    setState('saving');
    setError(null);

    try {
      const res = await fetch('/api/admin/ai-blog/save-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...article,
          targetKeyword: keyword,
          targetCity: ort !== 'Allgemein' ? ort : null,
          targetService: leistung,
          aiPrompt: `keyword:${keyword};leistung:${leistung};ort:${ort};zielgruppe:${zielgruppe};artikeltyp:${artikeltyp};laenge:${laenge};tonalitaet:${tonalitaet}`,
          contentStatus,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || 'Speichern fehlgeschlagen.');
        setState('preview');
        return;
      }

      setSavedId(data.id);
      setState('saved');
    } catch {
      setError('Netzwerkfehler. Bitte erneut versuchen.');
      setState('preview');
    }
  };

  const handleTitleChange = (val: string) => {
    setArticle(prev => ({ ...prev, title: val, slug: slugify(val) }));
  };

  if (state === 'saved' && savedId) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl p-10 shadow-sm text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Artikel gespeichert!</h2>
          <p className="text-gray-500 mb-6">Der Artikel wurde als Entwurf gespeichert.</p>
          <div className="flex gap-3 justify-center">
            <Link href={`/admin/blog/${savedId}`} className="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-800 transition-colors">
              Artikel bearbeiten
            </Link>
            <button
              onClick={() => { setState('idle'); setSavedId(null); setArticle({ title: '', slug: '', excerpt: '', metaTitle: '', metaDesc: '', category: '', content: '', coverImageSuggestion: '' }); setKeyword(''); }}
              className="border border-gray-200 text-gray-600 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Neuen Artikel erstellen
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">KI Blog-Generator</h1>
        <p className="text-gray-500 text-sm mt-1">Erstelle SEO-optimierte Blog-Artikel mit KI-Unterstützung.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-5 text-sm">
          {error}
        </div>
      )}

      {/* FORM */}
      {(state === 'idle' || state === 'generating') && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-5">Artikel-Parameter</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Hauptkeyword *</label>
              <input
                type="text"
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                placeholder="z.B. Treppenhausreinigung Neuwied Kosten"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                disabled={state === 'generating'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Leistung</label>
              <select
                value={leistung}
                onChange={e => setLeistung(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                disabled={state === 'generating'}
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
                disabled={state === 'generating'}
              >
                {ORTE.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Zielgruppe</label>
              <select
                value={zielgruppe}
                onChange={e => setZielgruppe(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                disabled={state === 'generating'}
              >
                {ZIELGRUPPEN.map(z => <option key={z} value={z}>{z}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Artikeltyp</label>
              <select
                value={artikeltyp}
                onChange={e => setArtikeltyp(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                disabled={state === 'generating'}
              >
                {ARTIKELTYPEN.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Gewünschte Länge</label>
              <select
                value={laenge}
                onChange={e => setLaenge(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                disabled={state === 'generating'}
              >
                {LAENGEN.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Tonalität</label>
              <select
                value={tonalitaet}
                onChange={e => setTonalitaet(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                disabled={state === 'generating'}
              >
                {TONALITAETEN.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleGenerate}
              disabled={state === 'generating'}
              className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {state === 'generating' ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Generiere Artikel…
                </>
              ) : (
                <>🤖 Entwurf generieren</>
              )}
            </button>
          </div>
        </div>
      )}

      {/* PREVIEW */}
      {(state === 'preview' || state === 'saving') && (
        <div className="space-y-5">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-semibold text-gray-800">Generierter Inhalt</h2>
              <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full font-medium">KI-generiert</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Titel</label>
                <input
                  type="text"
                  value={article.title}
                  onChange={e => handleTitleChange(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  disabled={state === 'saving'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Slug</label>
                <input
                  type="text"
                  value={article.slug}
                  onChange={e => setArticle(prev => ({ ...prev, slug: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  disabled={state === 'saving'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Excerpt</label>
                <textarea
                  value={article.excerpt}
                  onChange={e => setArticle(prev => ({ ...prev, excerpt: e.target.value }))}
                  rows={2}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  disabled={state === 'saving'}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Meta Title</label>
                  <input
                    type="text"
                    value={article.metaTitle}
                    onChange={e => setArticle(prev => ({ ...prev, metaTitle: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    disabled={state === 'saving'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Kategorie</label>
                  <input
                    type="text"
                    value={article.category}
                    onChange={e => setArticle(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    disabled={state === 'saving'}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Meta Description <span className="text-gray-400 font-normal">({article.metaDesc.length}/160)</span>
                </label>
                <textarea
                  value={article.metaDesc}
                  onChange={e => setArticle(prev => ({ ...prev, metaDesc: e.target.value }))}
                  rows={2}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  disabled={state === 'saving'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Inhalt (HTML)</label>
                <textarea
                  value={article.content}
                  onChange={e => setArticle(prev => ({ ...prev, content: e.target.value }))}
                  rows={20}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  disabled={state === 'saving'}
                />
              </div>

              {article.coverImageSuggestion && (
                <div className="bg-gray-50 rounded-lg px-4 py-3">
                  <div className="text-xs font-medium text-gray-500 mb-1">Titelbild-Vorschlag</div>
                  <div className="text-sm text-gray-700">{article.coverImageSuggestion}</div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-between items-center bg-white rounded-xl shadow-sm p-4">
            <button
              onClick={() => setState('idle')}
              disabled={state === 'saving'}
              className="border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-60"
            >
              ↩ Neu generieren
            </button>
            <div className="flex gap-3">
              <button
                onClick={() => handleSave('draft')}
                disabled={state === 'saving'}
                className="border border-primary text-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/5 transition-colors disabled:opacity-60 flex items-center gap-2"
              >
                {state === 'saving' ? (
                  <><span className="inline-block w-3.5 h-3.5 border-2 border-primary/40 border-t-primary rounded-full animate-spin" />Speichern…</>
                ) : '💾 Als Entwurf speichern'}
              </button>
              <button
                onClick={() => handleSave('review')}
                disabled={state === 'saving'}
                className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-800 transition-colors disabled:opacity-60"
              >
                Zur Überprüfung freigeben
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
