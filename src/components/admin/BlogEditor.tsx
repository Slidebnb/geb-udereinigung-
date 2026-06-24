'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BlogContentPreview from '@/components/admin/BlogContentPreview';

interface PostData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  author: string;
  published: boolean;
  metaTitle: string;
  metaDesc: string;
}

export default function BlogEditor({ post }: { post: PostData }) {
  const router = useRouter();
  const [form, setForm] = useState(post);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState('');

  const update = (key: keyof PostData, value: string | boolean) => setForm((current) => ({ ...current, [key]: value }));

  const uploadCoverImage = async (file: File | null) => {
    if (!file) return;
    setUploadingImage(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/admin/blog/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Titelbild konnte nicht hochgeladen werden.');
      update('coverImage', data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Titelbild konnte nicht hochgeladen werden.');
    } finally {
      setUploadingImage(false);
    }
  };

  const save = async () => {
    if (!form.title || !form.content) {
      setError('Titel und Inhalt sind Pflichtfelder.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/admin/blog', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error((await res.json()).error || 'Fehler beim Speichern.');
      router.push('/admin/blog');
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Fehler');
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!confirm('Diesen Artikel wirklich löschen?')) return;
    setDeleting(true);
    try {
      const res = await fetch('/api/admin/blog', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: form.id }),
      });
      if (!res.ok) throw new Error('Fehler beim Löschen.');
      router.push('/admin/blog');
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Fehler');
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()} className="text-gray-500 hover:text-gray-800 transition-colors">← Zurück</button>
        <h1 className="text-2xl font-bold text-gray-800">Artikel bearbeiten</h1>
        <button onClick={remove} disabled={deleting} className="ml-auto text-sm text-red-600 hover:text-red-800 disabled:opacity-50">
          {deleting ? 'Wird gelöscht...' : 'Löschen'}
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
            <div>
              <label className="label">Titel *</label>
              <input value={form.title} onChange={(e) => update('title', e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="label">Slug (URL)</label>
              <input value={form.slug} onChange={(e) => update('slug', e.target.value)} className="input-field font-mono text-sm" />
            </div>
            <div className="space-y-3">
              <label className="label">Titelbild</label>
              {form.coverImage ? (
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={form.coverImage} alt="Aktuelles Titelbild" className="h-56 w-full object-cover" />
                </div>
              ) : (
                <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 text-sm text-gray-500">
                  Noch kein Titelbild hinterlegt
                </div>
              )}
              <div className="flex flex-wrap items-center gap-3">
                <label className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-800">
                  {uploadingImage ? 'Wird hochgeladen...' : 'Bild hochladen'}
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/avif,image/gif"
                    className="sr-only"
                    disabled={uploadingImage}
                    onChange={(e) => uploadCoverImage(e.target.files?.[0] || null)}
                  />
                </label>
                {form.coverImage ? (
                  <button type="button" onClick={() => update('coverImage', '')} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50">
                    Bild entfernen
                  </button>
                ) : null}
              </div>
              <div>
                <label className="label">Bild-URL als Fallback</label>
                <input value={form.coverImage} onChange={(e) => update('coverImage', e.target.value)} className="input-field text-sm" placeholder="https://..." />
              </div>
            </div>
            <div>
              <label className="label">Kurzbeschreibung *</label>
              <textarea value={form.excerpt} onChange={(e) => update('excerpt', e.target.value)} rows={3} className="input-field resize-none" />
            </div>
            <div>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <label className="label mb-0">Artikelinhalt *</label>
                  <p className="text-xs text-slate-500">Markdown verwenden: ## Überschrift, - Liste, [Linktext](/angebot). HTML wird beim Speichern automatisch bereinigt.</p>
                </div>
                <div className="admin-tabs mb-0">
                  <button type="button" className={activeTab === 'edit' ? 'active' : ''} onClick={() => setActiveTab('edit')}>Bearbeiten</button>
                  <button type="button" className={activeTab === 'preview' ? 'active' : ''} onClick={() => setActiveTab('preview')}>Vorschau</button>
                </div>
              </div>
              {activeTab === 'edit' ? (
                <textarea value={form.content} onChange={(e) => update('content', e.target.value)} rows={22} className="input-field resize-none font-mono text-sm" />
              ) : (
                <BlogContentPreview content={form.content} />
              )}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-700">Einstellungen</h3>
            <div>
              <label className="label">Kategorie</label>
              <select value={form.category} onChange={(e) => update('category', e.target.value)} className="input-field">
                {['Reinigungswissen', 'Büroreinigung', 'Winterdienst', 'Hausmeister', 'Tipps & Tricks', 'Ratgeber', 'Reinigung'].map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Autor</label>
              <input value={form.author} onChange={(e) => update('author', e.target.value)} className="input-field text-sm" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Veröffentlicht</label>
              <button type="button" onClick={() => update('published', !form.published)} className={`relative w-12 h-6 rounded-full transition-colors ${form.published ? 'bg-primary' : 'bg-gray-300'}`}>
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${form.published ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-700">SEO</h3>
            <div>
              <label className="label">Meta-Titel</label>
              <input value={form.metaTitle} onChange={(e) => update('metaTitle', e.target.value)} className="input-field text-sm" />
              <p className="text-xs text-gray-400 mt-1">{form.metaTitle.length}/60 Zeichen</p>
            </div>
            <div>
              <label className="label">Meta-Beschreibung</label>
              <textarea value={form.metaDesc} onChange={(e) => update('metaDesc', e.target.value)} rows={3} className="input-field resize-none text-sm" />
              <p className="text-xs text-gray-400 mt-1">{form.metaDesc.length}/160 Zeichen</p>
            </div>
          </div>

          {error ? <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div> : null}

          <button onClick={save} disabled={saving} className="btn-primary w-full justify-center py-3 disabled:opacity-50">
            {saving ? 'Wird gespeichert...' : 'Änderungen speichern'}
          </button>
        </div>
      </div>
    </div>
  );
}
