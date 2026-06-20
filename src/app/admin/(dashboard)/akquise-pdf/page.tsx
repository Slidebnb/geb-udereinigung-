'use client';

import { useMemo, useState } from 'react';
import { Check, Download, FileDown, Mail } from 'lucide-react';
import { AdminPageHeader, AdminPanel } from '@/components/admin/AdminUi';
import { serviceModules } from '@/lib/document-generator/service-modules';

const defaultSelection = serviceModules.map(module => module.key);

export default function AkquisePdfPage() {
  const [serviceKeys, setServiceKeys] = useState(defaultSelection);
  const [title, setTitle] = useState('Professionelle Gebäudedienste aus einer Hand');
  const [audience, setAudience] = useState('Hausverwaltungen, Gewerbe und Eigentümer');
  const [intro, setIntro] = useState('Huwa unterstützt Sie bei der zuverlässigen Betreuung, Reinigung und Pflege Ihrer Immobilien. Unsere Leistungen werden passend zu Objekt, Nutzung und gewünschtem Turnus zusammengestellt. Sie erhalten feste Ansprechpartner, klare Absprachen und eine nachvollziehbare Ausführung.');
  const [callToAction, setCallToAction] = useState('Gerne besichtigen wir Ihr Objekt unverbindlich und erstellen anschließend ein passendes Leistungsangebot. Kontaktieren Sie uns telefonisch oder per E-Mail.');
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState('');
  const selectedModules = useMemo(() => serviceModules.filter(module => serviceKeys.includes(module.key)), [serviceKeys]);

  function toggle(key: string) {
    setServiceKeys(current => current.includes(key) ? current.filter(item => item !== key) : [...current, key]);
  }

  async function download() {
    setDownloading(true); setError('');
    try {
      const response = await fetch('/api/admin/acquisition-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, audience, intro, callToAction, serviceKeys }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'PDF konnte nicht erstellt werden.');
      }
      const url = URL.createObjectURL(await response.blob());
      const link = document.createElement('a');
      link.href = url; link.download = 'huwa-leistungsuebersicht.pdf'; link.click();
      URL.revokeObjectURL(url);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'PDF konnte nicht erstellt werden.');
    } finally { setDownloading(false); }
  }

  return (
    <>
      <AdminPageHeader
        title="Akquise-PDF"
        description="Erstellen Sie eine professionelle HUWA-Leistungsübersicht als Anhang für die Kundenansprache. Es werden keine internen Preise oder Kalkulationswerte ausgegeben."
        action={<button className="admin-button" onClick={download} disabled={downloading || !serviceKeys.length}><Download size={16} /> {downloading ? 'PDF wird erstellt' : 'PDF herunterladen'}</button>}
      />
      <div className="acquisition-layout">
        <div className="admin-stack">
          <AdminPanel title="Ansprache" description="Diese Texte erscheinen auf dem Titelblatt und im Kontaktabschluss.">
            <div className="admin-form p-5">
              <div className="admin-field"><label>Titel</label><input value={title} maxLength={120} onChange={event => setTitle(event.target.value)} /></div>
              <div className="admin-field"><label>Zielgruppe</label><input value={audience} maxLength={120} onChange={event => setAudience(event.target.value)} /></div>
              <div className="admin-field"><label>Einleitung</label><textarea value={intro} rows={6} maxLength={900} onChange={event => setIntro(event.target.value)} /></div>
              <div className="admin-field"><label>Kontaktabschluss</label><textarea value={callToAction} rows={4} maxLength={500} onChange={event => setCallToAction(event.target.value)} /></div>
              {error ? <p className="text-sm text-red-700" role="alert">{error}</p> : null}
            </div>
          </AdminPanel>
          <AdminPanel title="Leistungsbereiche" description="Nur ausgewählte Bereiche werden in die PDF übernommen.">
            <div className="acquisition-service-grid">
              {serviceModules.map(module => {
                const selected = serviceKeys.includes(module.key);
                return <button type="button" key={module.key} onClick={() => toggle(module.key)} className={selected ? 'is-selected' : ''}><span>{selected ? <Check size={15} /> : null}</span><div><strong>{module.title}</strong><small>{module.description}</small></div></button>;
              })}
            </div>
          </AdminPanel>
        </div>
        <aside className="acquisition-preview">
          <div className="acquisition-preview-toolbar"><div><Mail size={16} /><strong>Anhang-Vorschau</strong></div><span>{selectedModules.length} Leistungsbereiche</span></div>
          <div className="acquisition-paper">
            <header><img src="/brand/huwa-logo.png" alt="HUWA" /><span>LEISTUNGSÜBERSICHT</span></header>
            <main>
              <h2>{title || 'Titel der Leistungsübersicht'}</h2>
              <p className="acquisition-audience">Für {audience || 'Ihre Zielgruppe'}</p>
              <p>{intro}</p>
              <h3>Ausgewählte Leistungen</h3>
              <div className="acquisition-preview-services">{selectedModules.map((module, index) => <div key={module.key}><span>{String(index + 1).padStart(2, '0')}</span><strong>{module.title}</strong></div>)}</div>
              <section><FileDown size={18} /><p>{callToAction}</p></section>
            </main>
            <footer>HUWA Gebäudereinigung &amp; Hausmeisterdienste</footer>
          </div>
        </aside>
      </div>
    </>
  );
}
