'use client';

import { useState, useEffect } from 'react';

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [form, setForm] = useState({ name: '', role: '', company: '', content: '', rating: 5, location: '' });
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch('/api/admin/testimonials').then(r => r.json()).then(data => setTestimonials(data || [])).catch(() => {});
  }, []);

  const save = async () => {
    if (!form.name || !form.content) return;
    setSaving(true);
    try {
      const res = await fetch('/api/admin/testimonials', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) {
        const newT = await res.json();
        setTestimonials(prev => [newT, ...prev]);
        setForm({ name: '', role: '', company: '', content: '', rating: 5, location: '' });
        setShowForm(false);
      }
    } finally { setSaving(false); }
  };

  const remove = async (id: string) => {
    if (!confirm('Bewertung wirklich löschen?')) return;
    await fetch(`/api/admin/testimonials?id=${id}`, { method: 'DELETE' });
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Kundenbewertungen ({testimonials.length})</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">+ Neue Bewertung</button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="font-semibold text-gray-700 mb-4">Neue Bewertung hinzufügen</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="label">Name *</label>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="input-field" placeholder="Max Mustermann" />
            </div>
            <div>
              <label className="label">Rolle / Funktion</label>
              <input value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} className="input-field" placeholder="Geschäftsführer" />
            </div>
            <div>
              <label className="label">Unternehmen</label>
              <input value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} className="input-field" placeholder="Firma GmbH" />
            </div>
            <div>
              <label className="label">Ort</label>
              <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} className="input-field" placeholder="Neuwied" />
            </div>
            <div>
              <label className="label">Bewertung</label>
              <select value={form.rating} onChange={e => setForm(f => ({ ...f, rating: Number(e.target.value) }))} className="input-field">
                {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Sterne</option>)}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="label">Bewertungstext *</label>
            <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows={4} className="input-field resize-none" placeholder="Ich bin sehr zufrieden mit..." />
          </div>
          <div className="flex gap-3">
            <button onClick={save} disabled={saving} className="btn-primary disabled:opacity-50">
              {saving ? 'Speichern...' : 'Bewertung hinzufügen'}
            </button>
            <button onClick={() => setShowForm(false)} className="btn-secondary">Abbrechen</button>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {testimonials.map((t: any) => (
          <div key={t.id} className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: t.rating }).map((_, i) => <span key={i} className="text-accent">★</span>)}
              </div>
              <button onClick={() => remove(t.id)} className="text-xs text-red-400 hover:text-red-600 transition-colors">Löschen</button>
            </div>
            <p className="text-gray-700 text-sm italic mb-3">"{t.content}"</p>
            <div className="text-sm font-medium text-gray-800">{t.name}</div>
            <div className="text-xs text-gray-500">{t.role}{t.company ? ` · ${t.company}` : ''}{t.location ? ` · ${t.location}` : ''}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
