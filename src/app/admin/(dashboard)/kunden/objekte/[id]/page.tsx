'use client';

import { use, useMemo, useState } from 'react';
import Link from 'next/link';
import { ClipboardCheck, Download, FilePlus2, MapPin } from 'lucide-react';
import { AdminMetric, AdminPageHeader, AdminPanel, AdminStatus, EmptyState } from '@/components/admin/AdminUi';
import { useOperations } from '@/components/admin/useOperations';
import { objectDocumentTypes, serviceCatalog } from '@/lib/operations-catalog';

export default function ObjektaktePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data, loading, create } = useOperations();
  const object = useMemo(() => data.objects.find(item => item.id === id), [data.objects, id]);
  const documents = useMemo(() => data.documents.filter(item => item.objectId === id), [data.documents, id]);
  const deadlines = useMemo(() => data.deadlines.filter(item => item.objectId === id), [data.deadlines, id]);
  const [tab, setTab] = useState('uebersicht');
  const [showDocument, setShowDocument] = useState(false);
  const [message, setMessage] = useState('');

  if (loading) return <EmptyState title="Objektakte wird geladen" text="Einen Moment bitte." />;
  if (!object) return <EmptyState title="Objekt nicht gefunden" text="Die Objektakte ist nicht vorhanden oder wurde archiviert." />;

  async function createDocument(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const type = String(values.type);
    const typeTitle = objectDocumentTypes.find(item => item.key === type)?.title || type;
    try {
      await create({ action: 'objectDocument', objectId: id, type, serviceKey: values.serviceKey, title: `${typeTitle} - ${object.name}`, snapshot: JSON.stringify({ content: `Objekt: ${object.name}\nAdresse: ${object.street}, ${object.zip} ${object.city}\n\nDie objektbezogenen Prüfpunkte und Feststellungen werden bei der Bearbeitung ergänzt.` }) });
      setShowDocument(false); setMessage('Dokument wurde als Entwurf angelegt.');
    } catch (err) { setMessage(err instanceof Error ? err.message : 'Fehler'); }
  }

  return <>
    <AdminPageHeader title={`Objektakte · ${object.name}`} description={`${object.customer.company || object.customer.name} · ${object.objectNumber}`} action={<button className="admin-button" onClick={() => setShowDocument(value => !value)}><FilePlus2 size={16} /> Dokument erstellen</button>} />
    <div className="admin-metrics"><AdminMetric label="Fläche" value={object.areaSqm ? `${object.areaSqm.toLocaleString('de-DE')} m²` : 'Offen'} detail={object.objectType || 'Objektart nicht hinterlegt'} icon={<MapPin size={19} />} /><AdminMetric label="Dokumente" value={documents.length} detail="Nachweise und Objektunterlagen" icon={<ClipboardCheck size={19} />} /><AdminMetric label="Offene Fristen" value={deadlines.length} detail="Kontrollen und Vertragsfristen" icon={<ClipboardCheck size={19} />} /></div>
    <div className="admin-tabs"><button className={tab === 'uebersicht' ? 'active' : ''} onClick={() => setTab('uebersicht')}>Übersicht</button><button className={tab === 'leistungsverzeichnis' ? 'active' : ''} onClick={() => setTab('leistungsverzeichnis')}>Leistungsverzeichnis</button><button className={tab === 'checklisten' ? 'active' : ''} onClick={() => setTab('checklisten')}>Checklisten & Protokolle</button><button className={tab === 'dokumente' ? 'active' : ''} onClick={() => setTab('dokumente')}>Dokumente</button><button className={tab === 'fristen' ? 'active' : ''} onClick={() => setTab('fristen')}>Fristen</button></div>
    {showDocument ? <AdminPanel title="Objektdokument anlegen" description="Das Dokument wird als geschützter Entwurf in dieser Objektakte gespeichert."><form className="admin-form" onSubmit={createDocument}><div className="admin-form-grid"><div className="admin-field"><label>Dokumenttyp</label><select name="type" required>{objectDocumentTypes.map(type => <option value={type.key} key={type.key}>{type.title}</option>)}</select></div><div className="admin-field"><label>Dienstleistung</label><select name="serviceKey"><option value="">Allgemein</option>{serviceCatalog.map(service => <option value={service.key} key={service.key}>{service.title}</option>)}</select></div></div><button className="admin-button">Entwurf anlegen</button></form></AdminPanel> : null}
    {message ? <p className="my-4 text-sm text-emerald-700">{message}</p> : null}
    <div className="admin-grid mt-5"><div className="admin-stack">
      {tab === 'uebersicht' ? <><AdminPanel title="Objektdaten"><div className="admin-form-grid p-5"><Fact label="Adresse" value={`${object.street}, ${object.zip} ${object.city}`} /><Fact label="Etagen" value={object.floors?.toString() || 'Nicht hinterlegt'} /><Fact label="Zugang" value={object.accessDetails || 'Nicht hinterlegt'} /><Fact label="Schlüssel / Codes" value={object.keyDetails || 'Nicht hinterlegt'} /><Fact label="Leistungszeit" value={object.serviceWindow || 'Nicht hinterlegt'} /><Fact label="Besonderheiten" value={object.specialFeatures || 'Keine'} /></div></AdminPanel><AdminPanel title="Letzte Objektdokumente">{documents.length ? <DocumentTable documents={documents} /> : <EmptyState title="Noch keine Dokumente" text="Erstellen Sie Objektstart, Checkliste oder Leistungsnachweis." />}</AdminPanel></> : null}
      {tab === 'leistungsverzeichnis' ? <AdminPanel title="Leistungsverzeichnisse">{documents.filter(item => item.type === 'leistungsverzeichnis').length ? <DocumentTable documents={documents.filter(item => item.type === 'leistungsverzeichnis')} /> : <EmptyState title="Noch kein Leistungsverzeichnis" text="Erstellen Sie ein kundensichtbares Leistungsverzeichnis für dieses Objekt." />}</AdminPanel> : null}
      {tab === 'checklisten' ? <AdminPanel title="Checklisten und Protokolle">{documents.filter(item => item.type !== 'leistungsverzeichnis').length ? <DocumentTable documents={documents.filter(item => item.type !== 'leistungsverzeichnis')} /> : <EmptyState title="Noch keine Nachweise" text="Objektstart, Qualitätskontrolle und Leistungsnachweise erscheinen hier." />}</AdminPanel> : null}
      {tab === 'dokumente' ? <AdminPanel title="Alle Objektdokumente">{documents.length ? <DocumentTable documents={documents} /> : <EmptyState title="Dokumentenakte leer" text="Dokumente werden immer geschützt über die Objektakte ausgegeben." />}</AdminPanel> : null}
      {tab === 'fristen' ? <AdminPanel title="Fristen">{deadlines.length ? <div className="admin-list">{deadlines.map(item => <div className="admin-list-row" key={item.id}><div><strong>{item.title}</strong><small>{item.type}</small></div><AdminStatus tone="warning">{new Date(item.dueAt).toLocaleDateString('de-DE')}</AdminStatus></div>)}</div> : <EmptyState title="Keine offenen Fristen" text="Qualitäts- und Vertragsfristen können im Dokumentbereich angelegt werden." />}</AdminPanel> : null}
    </div><div className="admin-stack"><AdminPanel title="Kunde"><div className="admin-form"><Fact label="Kunde" value={object.customer.company || object.customer.name} /><Fact label="Kontakt" value={object.customer.email || object.customer.phone || 'Nicht hinterlegt'} /><Link href="/admin/kunden" className="admin-button admin-button-secondary">Zum Kundenstamm</Link></div></AdminPanel><AdminPanel title="Schnellaktionen"><div className="admin-form"><button onClick={() => setShowDocument(true)} className="admin-button">Qualitätskontrolle anlegen</button><Link href={`/admin/kalkulation?object=${id}`} className="admin-button admin-button-secondary">Kalkulation starten</Link><Link href="/admin/dokumente" className="admin-button admin-button-secondary">Angebot / Vertrag</Link></div></AdminPanel></div></div>
  </>;
}

function Fact({ label, value }: { label: string; value: string }) { return <div><div className="text-[10px] font-bold uppercase text-slate-400 mb-1">{label}</div><div className="text-sm text-slate-700">{value}</div></div>; }
function DocumentTable({ documents }: { documents: any[] }) { return <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Nummer</th><th>Dokument</th><th>Status</th><th>Erstellt</th><th></th></tr></thead><tbody>{documents.map(item => <tr key={item.id}><td>{item.documentNumber}</td><td>{item.title}</td><td><AdminStatus tone="warning">{item.status}</AdminStatus></td><td>{new Date(item.createdAt).toLocaleDateString('de-DE')}</td><td><a href={`/api/admin/documents/objekt/${item.id}/pdf`} target="_blank" rel="noreferrer" className="admin-button admin-button-secondary"><Download size={14} /> PDF</a></td></tr>)}</tbody></table></div>; }
