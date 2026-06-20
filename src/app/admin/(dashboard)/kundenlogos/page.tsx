'use client';

import { useCallback, useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, Eye, EyeOff, Plus, Trash2, Upload } from 'lucide-react';
import { AdminPageHeader, AdminPanel, EmptyState } from '@/components/admin/AdminUi';
import type { TrustedClient } from '@/lib/trusted-clients';

export default function KundenlogosPage() {
  const [clients, setClients] = useState<TrustedClient[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const load = useCallback(async () => {
    const response = await fetch('/api/admin/trusted-clients');
    const data = await response.json();
    if (response.ok) setClients(data);
    else setMessage(data.error || 'Kundenlogos konnten nicht geladen werden.');
    setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);

  async function create(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true); setMessage('');
    const response = await fetch('/api/admin/trusted-clients', { method: 'POST', body: new FormData(event.currentTarget) });
    const data = await response.json();
    if (response.ok) { setClients(data); event.currentTarget.reset(); setMessage('Kundenlogo wurde veröffentlicht.'); }
    else setMessage(data.error || 'Kundenlogo konnte nicht gespeichert werden.');
    setSaving(false);
  }

  async function persist(next: TrustedClient[]) {
    setClients(next); setSaving(true); setMessage('');
    const response = await fetch('/api/admin/trusted-clients', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(next) });
    const data = await response.json();
    if (response.ok) { setClients(data); setMessage('Reihenfolge und Sichtbarkeit wurden gespeichert.'); }
    else { setMessage(data.error || 'Änderung konnte nicht gespeichert werden.'); await load(); }
    setSaving(false);
  }

  async function remove(id: string) {
    if (!window.confirm('Dieses Kundenlogo wirklich entfernen?')) return;
    setSaving(true); setMessage('');
    const response = await fetch(`/api/admin/trusted-clients?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    const data = await response.json();
    if (response.ok) { setClients(data); setMessage('Kundenlogo wurde entfernt.'); }
    else setMessage(data.error || 'Kundenlogo konnte nicht entfernt werden.');
    setSaving(false);
  }

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= clients.length) return;
    const next = [...clients];
    [next[index], next[target]] = [next[target], next[index]];
    persist(next);
  }

  return (
    <>
      <AdminPageHeader title="Kundenlogos" description="Veröffentlichen Sie ausschließlich echte Kundenunternehmen, deren Logo auf der Startseite gezeigt werden darf." />
      <div className="admin-grid">
        <AdminPanel title="Unternehmen hinzufügen" description="Bilddateien bis 20 MB werden automatisch ausgerichtet, verkleinert und als optimiertes WebP gespeichert.">
          <form className="admin-form p-5" onSubmit={create}>
            <div className="admin-field"><label>Unternehmensname *</label><input name="name" required maxLength={120} placeholder="Name des Kundenunternehmens" /></div>
            <div className="admin-field"><label>Webseite (optional)</label><input name="website" type="url" placeholder="https://..." /></div>
            <div className="admin-field"><label>Logo *</label><input name="file" type="file" required accept="image/*,.heic,.heif,.avif,.tif,.tiff,.svg" /><small>Gängige Raster- und Vektorformate werden automatisch komprimiert.</small></div>
            <button className="admin-button" disabled={saving}><Upload size={16} /> {saving ? 'Wird optimiert' : 'Logo hochladen'}</button>
            {message ? <p className="text-sm text-slate-600" role="status">{message}</p> : null}
          </form>
        </AdminPanel>
        <AdminPanel title="Darstellung auf der Startseite" description="Ab vier veröffentlichten Logos läuft die Leiste automatisch nach links. Die Reihenfolge beginnt oben.">
          <div className="p-5 text-sm leading-6 text-slate-600">
            <p>Logos werden neutral dargestellt und beim Überfahren hervorgehoben. Besucher mit reduzierter Bewegung sehen eine ruhende Logozeile.</p>
            <div className="mt-4 flex items-center gap-2 text-blue-700"><Plus size={16} /><strong>{clients.filter(client => client.published).length} Logos veröffentlicht</strong></div>
          </div>
        </AdminPanel>
      </div>
      <div className="mt-5">
        <AdminPanel title="Kunden, die uns vertrauen">
          {loading ? <EmptyState title="Kundenlogos werden geladen" text="Einen Moment bitte." /> : clients.length ? (
            <div className="admin-list">
              {clients.map((client, index) => (
                <div className="trusted-client-admin-row" key={client.id}>
                  <div className="trusted-client-admin-logo"><img src={client.logoUrl} alt={`${client.name} Logo`} /></div>
                  <div className="min-w-0 flex-1"><strong>{client.name}</strong><small>{client.website || 'Keine Webseite hinterlegt'}</small></div>
                  <div className="trusted-client-admin-actions">
                    <button type="button" className="admin-icon-button" onClick={() => move(index, -1)} disabled={saving || index === 0} title="Nach oben"><ArrowUp size={16} /></button>
                    <button type="button" className="admin-icon-button" onClick={() => move(index, 1)} disabled={saving || index === clients.length - 1} title="Nach unten"><ArrowDown size={16} /></button>
                    <button type="button" className="admin-button admin-button-secondary" onClick={() => persist(clients.map(item => item.id === client.id ? { ...item, published: !item.published } : item))} disabled={saving}>{client.published ? <Eye size={16} /> : <EyeOff size={16} />}{client.published ? 'Sichtbar' : 'Ausgeblendet'}</button>
                    <button type="button" className="admin-icon-button admin-icon-button-danger" onClick={() => remove(client.id)} disabled={saving} title="Entfernen"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          ) : <EmptyState title="Noch keine Kundenlogos" text="Fügen Sie nur Unternehmen hinzu, die der Veröffentlichung zugestimmt haben." />}
        </AdminPanel>
      </div>
    </>
  );
}
