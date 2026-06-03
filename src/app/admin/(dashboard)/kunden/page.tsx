'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Kunde {
  id: string;
  name: string | null;
  email: string;
  createdAt: string;
  _count: { protocols: number };
}

export default function KundenPage() {
  const [kunden, setKunden] = useState<Kunde[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/admin/kunden')
      .then(r => r.json())
      .then(d => setKunden(d.kunden || []))
      .finally(() => setLoading(false));
  }, []);

  const startEdit = (k: Kunde) => {
    setEditId(k.id);
    setEditName(k.name || '');
    setEditEmail(k.email);
  };

  const saveEdit = async () => {
    if (!editId) return;
    setSaving(true);
    const res = await fetch(`/api/admin/kunden/${editId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editName, email: editEmail }),
    });
    if (res.ok) {
      setKunden(prev => prev.map(k => k.id === editId ? { ...k, name: editName, email: editEmail } : k));
      setEditId(null);
    }
    setSaving(false);
  };

  const handleDelete = async (k: Kunde) => {
    if (!confirm(`Kunde "${k.name || k.email}" und alle zugehörigen Protokolle wirklich löschen?`)) return;
    const res = await fetch(`/api/admin/kunden/${k.id}`, { method: 'DELETE' });
    if (res.ok) setKunden(prev => prev.filter(c => c.id !== k.id));
  };

  const filtered = kunden.filter(k =>
    (k.name || '').toLowerCase().includes(search.toLowerCase()) ||
    k.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Kunden</h1>
        <Link href="/admin/kunden/neu" className="btn-primary text-sm px-4 py-2">
          + Neuer Kunde
        </Link>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl p-8 text-center text-gray-400 shadow-sm">Laden…</div>
      ) : kunden.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center text-gray-500 shadow-sm">
          <div className="text-4xl mb-3">👥</div>
          <div className="font-medium mb-1">Noch keine Kunden angelegt</div>
          <p className="text-sm text-gray-400 mb-4">Legen Sie Ihr erstes Kundenkonto an.</p>
          <Link href="/admin/kunden/neu" className="btn-primary text-sm px-4 py-2">Ersten Kunden anlegen</Link>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Name oder E-Mail suchen…"
              className="input-field text-sm"
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="hidden md:grid grid-cols-[auto_1fr_1.5fr_0.8fr_1fr_auto] gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              <div></div>
              <div>Name</div>
              <div>E-Mail</div>
              <div>Protokolle</div>
              <div>Erstellt</div>
              <div>Aktionen</div>
            </div>

            <div className="divide-y divide-gray-100">
              {filtered.map(k => (
                <div key={k.id}>
                  {editId === k.id ? (
                    <div className="px-6 py-4 bg-blue-50 flex flex-col md:flex-row gap-3 items-start md:items-center">
                      <div className="flex gap-3 flex-1">
                        <input
                          value={editName}
                          onChange={e => setEditName(e.target.value)}
                          placeholder="Name"
                          className="input-field text-sm flex-1"
                        />
                        <input
                          value={editEmail}
                          onChange={e => setEditEmail(e.target.value)}
                          placeholder="E-Mail"
                          className="input-field text-sm flex-1"
                          type="email"
                        />
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={saveEdit}
                          disabled={saving}
                          className="text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                        >
                          {saving ? 'Speichern…' : 'Speichern'}
                        </button>
                        <button
                          onClick={() => setEditId(null)}
                          className="text-xs border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Abbrechen
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_1.5fr_0.8fr_1fr_auto] gap-2 md:gap-4 px-6 py-4 items-center">
                      <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold shrink-0">
                        {(k.name || k.email).charAt(0).toUpperCase()}
                      </div>
                      <div className="font-medium text-gray-800">{k.name || '–'}</div>
                      <div className="text-sm text-gray-600 truncate">{k.email}</div>
                      <div className="text-sm text-gray-700 font-medium">{k._count.protocols}</div>
                      <div className="text-sm text-gray-500">{new Date(k.createdAt).toLocaleDateString('de-DE')}</div>
                      <div className="flex gap-2 shrink-0">
                        <Link
                          href={`/admin/kunden/${k.id}/protokoll`}
                          className="text-xs px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                        >
                          + Protokoll
                        </Link>
                        <button
                          onClick={() => startEdit(k)}
                          className="text-xs border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Bearbeiten
                        </button>
                        <button
                          onClick={() => handleDelete(k)}
                          className="text-xs text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          Löschen
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
