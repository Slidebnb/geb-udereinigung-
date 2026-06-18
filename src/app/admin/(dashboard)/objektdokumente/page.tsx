'use client';

import { Download, FileText } from 'lucide-react';
import { AdminPageHeader, AdminPanel, AdminStatus, EmptyState } from '@/components/admin/AdminUi';
import { useOperations } from '@/components/admin/useOperations';

export default function ObjektdokumentePage() {
  const { data, loading } = useOperations();
  return <><AdminPageHeader title="Objektdokumente" description="Leistungsverzeichnisse, Checklisten, SOPs, Übergaben, Qualitätskontrollen und Leistungsnachweise aus allen Objektakten." />
    <AdminPanel title="Geschützte Dokumentenbibliothek" description="Jeder Download wird ausschließlich über eine Admin-geschützte Route ausgeliefert.">{loading ? <EmptyState title="Dokumente werden geladen" text="Einen Moment bitte." /> : data.documents.length ? <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Nummer</th><th>Dokument</th><th>Typ</th><th>Objekt</th><th>Kunde</th><th>Status</th><th></th></tr></thead><tbody>{data.documents.map(item => <tr key={item.id}><td>{item.documentNumber}</td><td><span className="flex items-center gap-2"><FileText size={14} className="text-blue-600" />{item.title}</span></td><td>{item.type}</td><td>{item.object.name}</td><td>{item.object.customer.company || item.object.customer.name}</td><td><AdminStatus tone="warning">{item.status}</AdminStatus></td><td><a className="admin-button admin-button-secondary" href={`/api/admin/documents/objekt/${item.id}/pdf`} target="_blank" rel="noreferrer"><Download size={14} /> PDF</a></td></tr>)}</tbody></table></div> : <EmptyState title="Noch keine Objektdokumente" text="Dokumente werden direkt aus der jeweiligen Objektakte erzeugt." />}</AdminPanel></>;
}
