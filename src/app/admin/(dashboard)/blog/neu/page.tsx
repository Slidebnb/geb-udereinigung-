'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewBlogPostPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: '', slug: '', excerpt: '', content: '', category: 'Reinigungswissen', published: true, metaTitle: '', metaDesc: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const generateSlug = (title: string) =>
    title.toLowerCase()
      .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

  const handleTitleChange = (v: string) => {
    setForm(f => ({ ...f, title: v, slug: generateSlug(v), metaTitle: v ? `${v} | Huwa Gebäudereinigung` : '' }));
  };

  const save = async () => {
    if (!form.title || !form.content) { setError('Titel und Inhalt sind Pflichtfelder.'); return; }
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/admin/blog', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error((await res.json()).error || 'Fehler');
      router.push('/admin/blog');
    } catch (e: any) {
      setError(e.message);
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()} className="text-gray-500 hover:text-gray-800 transition-colors">← Zurück</button>
        <h1 className="text-2xl font-bold text-gray-800">Neuer Artikel</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
            <div>
              <label className="label">Titel *</label>
              <input value={form.title} onChange={e => handleTitleChange(e.target.value)} className="input-field" placeholder="Artikeltitel..." />
            </div>
            <div>
              <label className="label">Slug (URL)</label>
              <input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} className="input-field font-mono text-sm" />
            </div>
            <div>
              <label className="label">Kurzbeschreibung *</label>
              <textarea value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} rows={3} className="input-field resize-none" placeholder="Kurze Beschreibung des Artikels..." />
            </div>
            <div>
              <label className="label">Inhalt * (Markdown)</label>
              <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows={20} className="input-field resize-none font-mono text-sm" placeholder="# Überschrift&#10;&#10;Inhalt des Artikels..." />
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-700">Einstellungen</h3>
            <div>
              <label className="label">Kategorie</label>
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="input-field">
                {['Reinigungswissen', 'Büroreinigung', 'Winterdienst', 'Hausmeister', 'Tipps & Tricks', 'Ratgeber'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Veröffentlicht</label>
              <button onClick={() => setForm(f => ({ ...f, published: !f.published }))} className={`relative w-12 h-6 rounded-full transition-colors ${form.published ? 'bg-primary' : 'bg-gray-300'}`}>
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${form.published ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-700">SEO</h3>
            <div>
              <label className="label">Meta-Titel</label>
              <input value={form.metaTitle} onChange={e => setForm(f => ({ ...f, metaTitle: e.target.value }))} className="input-field text-sm" />
              <p className="text-xs text-gray-400 mt-1">{form.metaTitle.length}/60 Zeichen</p>
            </div>
            <div>
              <label className="label">Meta-Beschreibung</label>
              <textarea value={form.metaDesc} onChange={e => setForm(f => ({ ...f, metaDesc: e.target.value }))} rows={3} className="input-field resize-none text-sm" />
              <p className="text-xs text-gray-400 mt-1">{form.metaDesc.length}/160 Zeichen</p>
            </div>
          </div>

          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>}

          <button onClick={save} disabled={saving} className="btn-primary w-full justify-center py-3 disabled:opacity-50">
            {saving ? 'Wird gespeichert...' : '✓ Artikel speichern'}
          </button>
        </div>
      </div>
    </div>
  );
}
