'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Download, FileCog, FileText, FolderOpen } from 'lucide-react';
import { AdminPageHeader, AdminPanel, AdminStatus, EmptyState } from '@/components/admin/AdminUi';
import { useOperations } from '@/components/admin/useOperations';
import { objectDocumentTypes, serviceCatalog } from '@/lib/operations-catalog';

const categoryLabels: Record<string, string> = {
  angebot: 'Angebotsvorlage',
  vertrag: 'Vertragsvorlage',
  leistungsverzeichnis: 'Leistungsverzeichnis',
  'objekt-checkliste': 'Objekt-Checkliste',
  sop: 'Arbeitsanweisung / SOP',
  zusatzleistungskatalog: 'Preis- und Zusatzleistungskatalog',
  objektstart: 'Objektstart-Protokoll',
  uebergabe: 'Übergabeprotokoll',
  qualitaetskontrolle: 'Qualitätskontrollbogen',
  leistungsnachweis: 'Leistungsnachweis',
  sonderauftrag: 'Sonderauftrag-Formular',
  winterdokumentation: 'Winterdienst-Dokumentation',
};

export default function ObjektdokumentePage() {
  const { data, loading } = useOperations();
  const [serviceKey, setServiceKey] = useState('unterhalt');
  const service = serviceCatalog.find(item => item.key === serviceKey) || serviceCatalog[0];
  const templates = useMemo(
    () => data.templates.filter(item => item.serviceKey === serviceKey || (
      !item.serviceKey
      && objectDocumentTypes.some(type => type.key === item.key)
      && (item.key !== 'winterdokumentation' || serviceKey === 'winter')
    )),
    [data.templates, serviceKey],
  );

  return <>
    <AdminPageHeader title="Objektdokumente" description="Fachvorlagen, Leistungsverzeichnisse, Checklisten und unveränderliche PDF-Nachweise je Objekt." action={<Link className="admin-button" href="/admin/generator"><FileCog size={16} /> Neues Dokument</Link>} />

    <AdminPanel title="Vorlagenbestand" description="Wählen Sie eine Dienstleistung. Die Objektakte verbindet die Fachvorlage anschließend mit den echten Kunden-, Objekt- und Leistungsdaten.">
      <div className="admin-form p-5 pb-0">
        <div className="admin-field max-w-md">
          <label>Dienstleistung</label>
          <select value={serviceKey} onChange={event => setServiceKey(event.target.value)}>
            {serviceCatalog.map(item => <option key={item.key} value={item.key}>{item.title}</option>)}
          </select>
        </div>
      </div>
      {loading ? <EmptyState title="Vorlagen werden geladen" text="Einen Moment bitte." /> : (
        <div className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-3">
          {templates.map(template => <article key={template.id} className="rounded-lg border border-slate-200 bg-white p-5">
            <div className="mb-4 flex items-start justify-between gap-4">
              <span className="rounded-md bg-blue-50 p-2 text-blue-700"><FileText size={18} /></span>
              <AdminStatus tone="success">Aktiv</AdminStatus>
            </div>
            <h3 className="text-sm font-bold text-slate-900">{categoryLabels[template.category] || template.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">{template.description || `${categoryLabels[template.category] || template.category} für ${service.title}.`}</p>
          </article>)}
        </div>
      )}
    </AdminPanel>

    <div className="admin-grid mt-5">
      <AdminPanel title="Dokument aus Objektakte erstellen" description="Nur echte Objektdaten werden in ein Dokument übernommen.">
        {loading ? <EmptyState title="Objekte werden geladen" text="Einen Moment bitte." /> : data.objects.length ? (
          <div className="admin-list">
            {data.objects.slice(0, 8).map(item => <Link className="admin-list-row" href={`/admin/kunden/objekte/${item.id}`} key={item.id}>
              <div className="flex items-center gap-3"><FolderOpen size={17} className="text-blue-600" /><div><strong>{item.name}</strong><small>{item.customer.company || item.customer.name} · {item.objectNumber}</small></div></div>
              <ArrowRight size={16} />
            </Link>)}
          </div>
        ) : <EmptyState title="Noch kein Objekt angelegt" text="Legen Sie zuerst einen echten Kunden und sein Objekt an." />}
      </AdminPanel>

      <AdminPanel title="Erzeugte Dokumente" description="Jede Version wird als geschützter Daten-Snapshot gespeichert.">
        {loading ? <EmptyState title="Dokumente werden geladen" text="Einen Moment bitte." /> : data.documents.length ? (
          <div className="admin-list">
            {data.documents.slice(0, 8).map(item => <div className="admin-list-row" key={item.id}>
              <div><strong>{item.title}</strong><small>{item.documentNumber} · {item.object.name}</small></div>
              <a className="admin-button admin-button-secondary" href={`/api/admin/documents/objekt/${item.id}/pdf`} target="_blank" rel="noreferrer"><Download size={14} /> PDF</a>
            </div>)}
          </div>
        ) : <EmptyState title="Noch keine Objektdokumente" text="Wählen Sie links eine Objektakte und erstellen Sie dort den ersten Entwurf." />}
      </AdminPanel>
    </div>
  </>;
}
