'use client';

import { useState, useEffect } from 'react';

type Testimonial = {
  id: string; name: string; role: string | null; company: string | null;
  content: string; rating: number; location: string | null; published: boolean;
};

const EMPTY_FORM = { name: '', role: '', company: '', content: '', rating: 5, location: '' };

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState(EMPTY_FORM);

  useEffect(() => {
    fetch('/api/admin/testimonials').then(r => r.json()).then(d => setTestimonials(d || [])).catch(() => {});
  }, []);

  const save = async () => {
    if (!form.name || !form.content) return;
    setSaving(true);
    try {
      const res = await fetch('/api/admin/testimonials', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, published: true }),
      });
      if (res.ok) {
        const newT = await res.json();
        setTestimonials(prev => [newT, ...prev]);
        setForm(EMPTY_FORM);
        setShowForm(false);
      }
    } finally { setSaving(false); }
  };

  const remove = async (id: string) => {
    if (!confirm('Bewertung wirklich löschen?')) return;
    await fetch(`/api/admin/testimonials?id=${id}`, { method: 'DELETE' });
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  const togglePublish = async (t: Testimonial) => {
    const res = await fetch('/api/admin/testimonials', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: t.id, published: !t.published }),
    });
    if (res.ok) {
      setTestimonials(prev => prev.map(x => x.id === t.id ? { ...x, published: !t.published } : x));
    }
  };

  const startEdit = (t: Testimonial) => {
    setEditId(t.id);
    setEditForm({ name: t.name, role: t.role ?? '', company: t.company ?? '', content: t.content, rating: t.rating, location: t.location ?? '' });
  };

  const saveEdit = async () => {
    if (!editId || !editForm.name || !editForm.content) return;
    setSaving(true);
    try {
      const res = await fetch('/api/admin/testimonials', {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editId, ...editForm, rating: Number(editForm.rating) }),
      });
      if (res.ok) {
        const { testimonial } = await res.json();
        setTestimonials(prev => prev.map(x => x.id === editId ? testimonial : x));
        setEditId(null);
      }
    } finally { setSaving(false); }
  };

  const active = testimonials.filter(t => t.published);
  const inactive = testimonials.filter(t => !t.published);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kundenbewertungen</h1>
          <p className="text-sm text-gray-500 mt-0.5">{active.length} aktiv · {inactive.length} inaktiv</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">+ Neue Bewertung</button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6 border border-primary/20">
          <h2 className="font-semibold text-gray-700 mb-4">Neue Bewertung hinzufügen</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div><label className="label">Name *</label><input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="input-field" placeholder="Max Mustermann" /></div>
            <div><label className="label">Rolle</label><input value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} className="input-field" placeholder="Geschäftsführer" /></div>
            <div><label className="label">Unternehmen</label><input value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} className="input-field" placeholder="Firma GmbH" /></div>
            <div><label className="label">Ort</label><input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} className="input-field" placeholder="Neuwied" /></div>
            <div><label className="label">Bewertung</label>
              <select value={form.rating} onChange={e => setForm(f => ({ ...f, rating: Number(e.target.value) }))} className="input-field">
                {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Sterne</option>)}
              </select>
            </div>
          </div>
          <div className="mb-4"><label className="label">Bewertungstext *</label><textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows={4} className="input-field resize-none" placeholder="Ich bin sehr zufrieden mit..." /></div>
          <div className="flex gap-3">
            <button onClick={save} disabled={saving} className="btn-primary disabled:opacity-50">{saving ? 'Speichern...' : 'Bewertung hinzufügen'}</button>
            <button onClick={() => setShowForm(false)} className="btn-secondary">Abbrechen</button>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {testimonials.map((t) => (
          <div key={t.id} className={`bg-white rounded-xl p-5 shadow-sm border transition-all ${t.published ? 'border-slate-100' : 'border-orange-200 opacity-70'}`}>
            {editId === t.id ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="label text-xs">Name *</label><input value={editForm.name} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} className="input-field text-sm py-2" /></div>
                  <div><label className="label text-xs">Rolle</label><input value={editForm.role} onChange={e => setEditForm(f => ({ ...f, role: e.target.value }))} className="input-field text-sm py-2" /></div>
                  <div><label className="label text-xs">Unternehmen</label><input value={editForm.company} onChange={e => setEditForm(f => ({ ...f, company: e.target.value }))} className="input-field text-sm py-2" /></div>
                  <div><label className="label text-xs">Ort</label><input value={editForm.location} onChange={e => setEditForm(f => ({ ...f, location: e.target.value }))} className="input-field text-sm py-2" /></div>
                </div>
                <div><label className="label text-xs">Bewertung</label>
                  <select value={editForm.rating} onChange={e => setEditForm(f => ({ ...f, rating: Number(e.target.value) }))} className="input-field text-sm py-2">
                    {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Sterne</option>)}
                  </select>
                </div>
                <div><label className="label text-xs">Text *</label><textarea value={editForm.content} onChange={e => setEditForm(f => ({ ...f, content: e.target.value }))} rows={3} className="input-field resize-none text-sm" /></div>
                <div className="flex gap-2">
                  <button onClick={saveEdit} disabled={saving} className="btn-primary text-xs px-3 py-1.5 disabled:opacity-50">{saving ? '...' : 'Speichern'}</button>
                  <button onClick={() => setEditId(null)} className="btn-secondary text-xs px-3 py-1.5">Abbrechen</button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: t.rating }).map((_, i) => <span key={i} className="text-accent text-sm">★</span>)}
                    {!t.published && <span className="ml-2 text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">Inaktiv</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => togglePublish(t)} className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${t.published ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}>
                      {t.published ? 'Deaktivieren' : 'Aktivieren'}
                    </button>
                    <button onClick={() => startEdit(t)} className="text-xs text-primary hover:text-primary/70 transition-colors">Bearbeiten</button>
                    <button onClick={() => remove(t.id)} className="text-xs text-red-400 hover:text-red-600 transition-colors">Löschen</button>
                  </div>
                </div>
                <p className="text-gray-700 text-sm italic mb-3">&quot;{t.content}&quot;</p>
                <div className="text-sm font-medium text-gray-800">{t.name}</div>
                <div className="text-xs text-gray-500">{t.role}{t.company ? ` · ${t.company}` : ''}{t.location ? ` · ${t.location}` : ''}</div>
              </>
            )}
          </div>
        ))}
      </div>

      {testimonials.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center text-gray-400 shadow-sm">
          <div className="text-4xl mb-3">⭐</div>
          <p>Noch keine Bewertungen vorhanden.</p>
          <button onClick={() => setShowForm(true)} className="btn-primary mt-4">Erste Bewertung hinzufügen</button>
        </div>
      )}
    </div>
  );
}
