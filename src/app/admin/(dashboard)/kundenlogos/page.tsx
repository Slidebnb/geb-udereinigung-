'use client';

import { useCallback, useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, Eye, EyeOff, Plus, Trash2, Upload } from 'lucide-react';
import { AdminPageHeader, AdminPanel, EmptyState } from '@/components/admin/AdminUi';
import type { TrustedClient } from '@/lib/trusted-clients';

export default function KundenlogosPage() {
  const [clients, setClients] = useState<TrustedClient[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [busyAction, setBusyAction] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const load = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/trusted-clients');
      const data = await response.json().catch(() => null);
      if (response.ok && Array.isArray(data)) setClients(data);
      else setMessage(data?.error || 'Kundenlogos konnten nicht geladen werden.');
    } catch {
      setMessage('Kundenlogos konnten nicht geladen werden. Bitte laden Sie die Seite neu.');
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => { load(); }, [load]);

  async function create(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setUploading(true); setMessage('');
    try {
      const response = await fetch('/api/admin/trusted-clients', { method: 'POST', body: new FormData(form) });
      const data = await response.json().catch(() => null);
      if (response.ok && Array.isArray(data)) { setClients(data); form.reset(); setMessage('Kundenlogo wurde veröffentlicht und optimiert.'); }
      else setMessage(data?.error || 'Kundenlogo konnte nicht gespeichert werden.');
    } catch {
      setMessage('Upload fehlgeschlagen. Bitte prüfen Sie die Verbindung und versuchen Sie es erneut.');
    } finally {
      setUploading(false);
    }
  }

  async function persist(next: TrustedClient[], action: string) {
    setClients(next); setBusyAction(action); setMessage('');
    try {
      const response = await fetch('/api/admin/trusted-clients', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(next) });
      const data = await response.json().catch(() => null);
      if (response.ok && Array.isArray(data)) { setClients(data); setMessage('Reihenfolge und Sichtbarkeit wurden gespeichert.'); }
      else { setMessage(data?.error || 'Änderung konnte nicht gespeichert werden.'); await load(); }
    } catch {
      setMessage('Änderung konnte nicht gespeichert werden. Bitte versuchen Sie es erneut.');
      await load();
    } finally {
      setBusyAction(null);
    }
  }

  async function remove(id: string) {
    if (!window.confirm('Dieses Kundenlogo wirklich entfernen?')) return;
    setBusyAction(`delete-${id}`); setMessage('');
    try {
      const response = await fetch(`/api/admin/trusted-clients?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      const data = await response.json().catch(() => null);
      if (response.ok && Array.isArray(data)) { setClients(data); setMessage('Kundenlogo wurde entfernt.'); }
      else setMessage(data?.error || 'Kundenlogo konnte nicht entfernt werden.');
    } catch {
      setMessage('Kundenlogo konnte nicht entfernt werden. Bitte versuchen Sie es erneut.');
    } finally {
      setBusyAction(null);
    }
  }

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= clients.length) return;
    const next = [...clients];
    [next[index], next[target]] = [next[target], next[index]];
    persist(next, `move-${clients[index].id}`);
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
            <button className="admin-button" disabled={uploading}><Upload size={16} /> {uploading ? 'Wird optimiert' : 'Logo hochladen'}</button>
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
                  <div className={`trusted-client-admin-logo trusted-client-logo-${client.backdrop}`}><img src={client.logoUrl} alt={`${client.name} Logo`} /></div>
                  <div className="min-w-0 flex-1"><strong>{client.name}</strong><small>{client.website || 'Keine Webseite hinterlegt'}</small></div>
                  <div className="trusted-client-admin-actions">
                    <label className="trusted-client-backdrop"><span>Darstellung</span><select value={client.backdrop} onChange={event => persist(clients.map(item => item.id === client.id ? { ...item, backdrop: event.target.value as TrustedClient['backdrop'] } : item), `backdrop-${client.id}`)} disabled={busyAction !== null}><option value="auto">Automatisch</option><option value="light">Originalfarbe</option><option value="dark">Helles Logo abdunkeln</option></select></label>
                    <button type="button" className="admin-icon-button" onClick={() => move(index, -1)} disabled={busyAction !== null || index === 0} title="Nach oben"><ArrowUp size={16} /></button>
                    <button type="button" className="admin-icon-button" onClick={() => move(index, 1)} disabled={busyAction !== null || index === clients.length - 1} title="Nach unten"><ArrowDown size={16} /></button>
                    <button type="button" className={`admin-button admin-button-secondary client-visibility-toggle ${client.published ? 'is-active' : ''}`} aria-pressed={client.published} onClick={() => persist(clients.map(item => item.id === client.id ? { ...item, published: !item.published } : item), `visibility-${client.id}`)} disabled={busyAction !== null}>{client.published ? <Eye size={16} /> : <EyeOff size={16} />}{busyAction === `visibility-${client.id}` ? 'Speichert' : client.published ? 'Auf Startseite' : 'Ausgeblendet'}</button>
                    <button type="button" className="admin-icon-button admin-icon-button-danger" onClick={() => remove(client.id)} disabled={busyAction !== null} title="Logo löschen"><Trash2 size={16} /></button>
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
