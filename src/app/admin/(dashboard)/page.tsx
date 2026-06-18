import Link from 'next/link';
import { AlertTriangle, Calculator, FileCheck2, Inbox, Plus, Users } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { AdminMetric, AdminPageHeader, AdminPanel, AdminStatus, EmptyState } from '@/components/admin/AdminUi';

export const dynamic = 'force-dynamic';

async function getDashboard() {
  const now = new Date();
  const inThirtyDays = new Date(now.getTime() + 30 * 86400000);
  const [contact, quote, customers, offers, contracts, calculations, deadlines, recentObjects] = await Promise.all([
    prisma.contactRequest.count({ where: { status: 'neu' } }).catch(() => 0),
    prisma.quoteRequest.count({ where: { status: 'neu' } }).catch(() => 0),
    prisma.customer.count({ where: { status: 'aktiv' } }).catch(() => 0),
    prisma.offer.findMany({ include: { customer: true }, orderBy: { updatedAt: 'desc' }, take: 5 }).catch(() => []),
    prisma.contract.findMany({ include: { customer: true, object: true }, where: { status: { not: 'beendet' } }, orderBy: { updatedAt: 'desc' } }).catch(() => []),
    prisma.calculation.findMany({ include: { customer: true }, orderBy: { updatedAt: 'desc' }, take: 6 }).catch(() => []),
    prisma.deadline.findMany({ include: { object: true }, where: { status: 'offen', dueAt: { lte: inThirtyDays } }, orderBy: { dueAt: 'asc' }, take: 6 }).catch(() => []),
    prisma.serviceObject.findMany({ include: { customer: true }, orderBy: { updatedAt: 'desc' }, take: 5 }).catch(() => []),
  ]);
  return { requests: contact + quote, customers, offers, contracts, calculations, deadlines, recentObjects };
}

const euro = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

export default async function AdminDashboard() {
  const data = await getDashboard();
  const monthly = data.contracts.reduce((sum, item) => sum + item.netMonthly, 0);
  const warnings = data.calculations.filter(item => item.marginPercent < 20 || item.effectiveHourlyRate < 38);
  return (
    <>
      <AdminPageHeader title="Übersicht" description="Die wichtigsten Vorgänge, Fristen und wirtschaftlichen Kennzahlen auf einen Blick." action={<Link href="/admin/kalkulation" className="admin-button"><Plus size={16} /> Neue Kalkulation</Link>} />
      <div className="admin-metrics">
        <AdminMetric label="Neue Anfragen" value={data.requests} detail="noch nicht bearbeitet" icon={<Inbox size={19} />} />
        <AdminMetric label="Aktive Kunden" value={data.customers} detail="CRM-Kundenstamm" icon={<Users size={19} />} />
        <AdminMetric label="Aktive Verträge" value={data.contracts.length} detail="laufende Betreuung" icon={<FileCheck2 size={19} />} />
        <AdminMetric label="Monatswert netto" value={euro.format(monthly)} detail="aus aktiven Verträgen" icon={<Calculator size={19} />} />
      </div>
      <div className="admin-grid">
        <div className="admin-stack">
          <AdminPanel title="Aktuelle Kalkulationen" description="Wirtschaftlichkeit wird intern geprüft, bevor ein Preis nach außen geht." action={<Link href="/admin/kalkulation" className="admin-button admin-button-secondary">Alle öffnen</Link>}>
            {data.calculations.length ? <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Nummer</th><th>Kalkulation</th><th>Kunde</th><th>Monat netto</th><th>Marge</th></tr></thead><tbody>{data.calculations.map(item => <tr key={item.id}><td><Link href="/admin/kalkulation">{item.calculationNumber}</Link></td><td>{item.title}</td><td>{item.customer?.company || item.customer?.name || 'Noch offen'}</td><td>{euro.format(item.netTotal)}</td><td><AdminStatus tone={item.marginPercent >= 20 && item.effectiveHourlyRate >= 38 ? 'success' : 'danger'}>{item.marginPercent.toFixed(1)} %</AdminStatus></td></tr>)}</tbody></table></div> : <EmptyState title="Noch keine Kalkulation" text="Erstellen Sie die erste wirtschaftlich geprüfte Kalkulation." />}
          </AdminPanel>
          <AdminPanel title="Zuletzt bearbeitete Objekte" description="Direkter Einstieg in die digitale Objektakte.">
            {data.recentObjects.length ? <div className="admin-list">{data.recentObjects.map(item => <div className="admin-list-row" key={item.id}><div><strong>{item.name}</strong><small>{item.customer.company || item.customer.name} · {item.city}</small></div><Link href={`/admin/kunden/objekte/${item.id}`} className="admin-button admin-button-secondary">Objektakte</Link></div>)}</div> : <EmptyState title="Keine Objekte vorhanden" text="Legen Sie zuerst einen Kunden und sein Objekt an." />}
          </AdminPanel>
        </div>
        <div className="admin-stack">
          <AdminPanel title="Fristen in den nächsten 30 Tagen">
            {data.deadlines.length ? <div className="admin-list">{data.deadlines.map(item => <div className="admin-list-row" key={item.id}><div><strong>{item.title}</strong><small>{item.object?.name || 'Allgemein'}</small></div><AdminStatus tone="warning">{item.dueAt.toLocaleDateString('de-DE')}</AdminStatus></div>)}</div> : <EmptyState title="Keine akuten Fristen" text="In den nächsten 30 Tagen ist nichts fällig." />}
          </AdminPanel>
          <AdminPanel title="Wirtschaftliche Warnungen">
            {warnings.length ? <div className="admin-list">{warnings.map(item => <div className="admin-list-row" key={item.id}><div><strong>{item.title}</strong><small>{item.effectiveHourlyRate.toFixed(2)} €/Std. · {item.marginPercent.toFixed(1)} % Marge</small></div><AlertTriangle size={18} className="text-amber-600" /></div>)}</div> : <EmptyState title="Alle Kalkulationen gesund" text="Keine Kalkulation liegt unter Mindeststundensatz oder Mindestmarge." />}
          </AdminPanel>
          <AdminPanel title="Schnellzugriff"><div className="admin-form"><Link href="/admin/kunden" className="admin-button">Kunden oder Objekt anlegen</Link><Link href="/admin/dokumente" className="admin-button admin-button-secondary">Angebot oder Vertrag erstellen</Link><Link href="/admin/objektdokumente" className="admin-button admin-button-secondary">Objektdokument erzeugen</Link></div></AdminPanel>
        </div>
      </div>
    </>
  );
}
