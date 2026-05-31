'use client';

import { useState, useEffect, useRef } from 'react';
import { siteConfig } from '@/lib/site';

export default function EinstellungenPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  // Logo upload state
  const [logoPreview, setLogoPreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Password change state
  const [pwForm, setPwForm] = useState({ current: '', next: '', confirm: '' });
  const [pwSaving, setPwSaving] = useState(false);
  const [pwMsg, setPwMsg] = useState('');
  const [pwError, setPwError] = useState('');

  useEffect(() => {
    fetch('/api/admin/settings').then(r => r.json()).then(data => {
      if (Array.isArray(data)) {
        const map: Record<string, string> = {};
        data.forEach((s: { key: string; value: string }) => { map[s.key] = s.value; });
        setSettings(map);
        if (map.logo_url) setLogoPreview(map.logo_url);
      }
    }).catch(() => {});
  }, []);

  const update = (key: string, value: string) => setSettings(prev => ({ ...prev, [key]: value }));

  const save = async () => {
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error();
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError('Fehler beim Speichern. Bitte nochmal versuchen.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload fehlgeschlagen.');
      setLogoPreview(data.url);
      setSettings(prev => ({ ...prev, logo_url: data.url }));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Upload fehlgeschlagen.');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const removeLogo = async () => {
    setLogoPreview('');
    setSettings(prev => ({ ...prev, logo_url: '' }));
    await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ logo_url: '' }),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const changePassword = async () => {
    setPwError('');
    setPwMsg('');
    if (!pwForm.current || !pwForm.next) { setPwError('Alle Felder ausfüllen.'); return; }
    if (pwForm.next !== pwForm.confirm) { setPwError('Neues Passwort stimmt nicht überein.'); return; }
    if (pwForm.next.length < 8) { setPwError('Passwort muss mindestens 8 Zeichen haben.'); return; }
    setPwSaving(true);
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword: pwForm.current, newPassword: pwForm.next }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Fehler');
      setPwMsg('✓ Passwort erfolgreich geändert!');
      setPwForm({ current: '', next: '', confirm: '' });
    } catch (err: unknown) {
      setPwError(err instanceof Error ? err.message : 'Fehler beim Ändern des Passworts.');
    } finally {
      setPwSaving(false);
    }
  };

  const fields = [
    { key: 'site_title', label: 'Firmenname', placeholder: siteConfig.name },
    { key: 'phone', label: 'Telefonnummer', placeholder: '02601 9131820' },
    { key: 'contact_email', label: 'Kontakt-E-Mail', placeholder: 'info@huwa-gebaeudedienste.de' },
    { key: 'whatsapp', label: 'WhatsApp-Nummer (mit Ländervorwahl)', placeholder: '492601913182' },
    { key: 'address', label: 'Adresse', placeholder: 'Musterstraße 12, 40210 Düsseldorf' },
    { key: 'opening_hours', label: 'Öffnungszeiten Woche', placeholder: 'Mo–Fr 07:00–18:00 Uhr' },
    { key: 'opening_hours_sat', label: 'Öffnungszeiten Samstag', placeholder: 'Sa 08:00–14:00 Uhr' },
    { key: 'google_rating', label: 'Google-Bewertung', placeholder: '4.9' },
    { key: 'review_count', label: 'Anzahl Bewertungen', placeholder: '127' },
    { key: 'years_experience', label: 'Jahre Erfahrung', placeholder: '15' },
    { key: 'clients_count', label: 'Kundenanzahl', placeholder: '500+' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Einstellungen</h1>

      <div className="max-w-2xl space-y-6">

        {/* Logo */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-semibold text-gray-700 border-b border-gray-100 pb-3 mb-4">Logo</h2>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center bg-gray-50 overflow-hidden">
              {logoPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoPreview} alt="Logo" className="object-contain w-full h-full p-1" />
              ) : (
                <svg className="w-10 h-10 text-gray-300" fill="currentColor" viewBox="0 0 24 24"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg>
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-3">PNG, JPG oder SVG · max. 2 MB</p>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="btn-primary py-2 px-4 text-sm disabled:opacity-50"
                >
                  {uploading ? 'Wird hochgeladen...' : logoPreview ? 'Logo ändern' : 'Logo hochladen'}
                </button>
                {logoPreview && (
                  <button onClick={removeLogo} className="btn-secondary py-2 px-4 text-sm text-red-600 border-red-200 hover:bg-red-50">
                    Entfernen
                  </button>
                )}
              </div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
            </div>
          </div>
        </div>

        {/* General settings */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-semibold text-gray-700 border-b border-gray-100 pb-3 mb-4">Allgemeine Einstellungen</h2>
          <div className="space-y-4">
            {fields.map(f => (
              <div key={f.key}>
                <label className="label">{f.label}</label>
                <input
                  value={settings[f.key] || ''}
                  onChange={e => update(f.key, e.target.value)}
                  className="input-field"
                  placeholder={f.placeholder}
                />
              </div>
            ))}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mt-4">
              {error}
            </div>
          )}
          {saved && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm mt-4">
              ✓ Einstellungen wurden gespeichert! Die Website wird automatisch aktualisiert.
            </div>
          )}

          <button onClick={save} disabled={saving} className="btn-primary px-8 py-3 mt-4 disabled:opacity-50">
            {saving ? 'Speichern...' : '✓ Einstellungen speichern'}
          </button>
        </div>

        {/* Password change */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-semibold text-gray-700 border-b border-gray-100 pb-3 mb-4">Passwort ändern</h2>
          <div className="space-y-4">
            <div>
              <label className="label">Aktuelles Passwort</label>
              <input
                type="password"
                value={pwForm.current}
                onChange={e => setPwForm(p => ({ ...p, current: e.target.value }))}
                className="input-field"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="label">Neues Passwort</label>
              <input
                type="password"
                value={pwForm.next}
                onChange={e => setPwForm(p => ({ ...p, next: e.target.value }))}
                className="input-field"
                placeholder="Mindestens 8 Zeichen"
              />
            </div>
            <div>
              <label className="label">Neues Passwort bestätigen</label>
              <input
                type="password"
                value={pwForm.confirm}
                onChange={e => setPwForm(p => ({ ...p, confirm: e.target.value }))}
                className="input-field"
                placeholder="••••••••"
              />
            </div>

            {pwError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {pwError}
              </div>
            )}
            {pwMsg && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                {pwMsg}
              </div>
            )}

            <button onClick={changePassword} disabled={pwSaving} className="btn-primary px-8 py-3 disabled:opacity-50">
              {pwSaving ? 'Wird geändert...' : 'Passwort ändern'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
