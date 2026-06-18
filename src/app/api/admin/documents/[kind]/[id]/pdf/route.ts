import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/admin-guard';
import { createDocumentPdf } from '@/lib/document-pdf';
import { defaultTemplateContent, serviceCatalog } from '@/lib/operations-catalog';

export async function GET(_request: Request, { params }: { params: Promise<{ kind: string; id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  const { kind, id } = await params;
  const settings = Object.fromEntries((await prisma.setting.findMany()).map(item => [item.key, item.value]));
  const company = {
    name: settings.legal_company_name || 'Huwa Gebäudereinigung & Hausmeisterdienste',
    representative: settings.legal_representative || 'Familie Huwa',
    street: settings.legal_street || 'Mittelweg 24', zip: settings.legal_zip || '56566', city: settings.legal_city || 'Neuwied',
    taxNumber: settings.legal_tax_number, vatId: settings.legal_vat_id,
  };
  let payload;
  if (kind === 'angebot') {
    const item = await prisma.offer.findUnique({ where: { id }, include: { customer: true, object: true, versions: { orderBy: { version: 'desc' }, take: 1 } } });
    if (!item) return NextResponse.json({ error: 'Angebot nicht gefunden.' }, { status: 404 });
    const snapshot = item.versions[0] ? JSON.parse(item.versions[0].snapshot) : {};
    payload = { documentType: 'Angebot', number: item.offerNumber, title: item.title, status: item.status, customer: item.customer, object: item.object, netTotal: item.netTotal, vatRate: item.vatRate, grossTotal: item.grossTotal, body: snapshot.content || defaultTemplateContent('angebot', item.serviceKey), company };
  } else if (kind === 'vertrag') {
    const item = await prisma.contract.findUnique({ where: { id }, include: { customer: true, object: true, versions: { orderBy: { version: 'desc' }, take: 1 } } });
    if (!item) return NextResponse.json({ error: 'Vertrag nicht gefunden.' }, { status: 404 });
    const snapshot = item.versions[0] ? JSON.parse(item.versions[0].snapshot) : {};
    const serviceTitle = serviceCatalog.find(service => service.key === item.serviceKey)?.title || item.serviceKey;
    payload = { documentType: 'Vertrag', number: item.contractNumber, title: item.title, status: item.status, customer: item.customer, object: item.object, netTotal: item.netMonthly, vatRate: item.vatRate, grossTotal: item.grossMonthly, body: snapshot.content || defaultTemplateContent('vertrag', serviceTitle), company };
  } else {
    const item = await prisma.objectDocument.findUnique({ where: { id }, include: { object: { include: { customer: true } } } });
    if (!item) return NextResponse.json({ error: 'Dokument nicht gefunden.' }, { status: 404 });
    const snapshot = JSON.parse(item.snapshot || '{}');
    const notes = snapshot.notes ? `\n\nOBJEKTBEZOGENE ERGÄNZUNGEN\n${snapshot.notes}` : '';
    payload = { documentType: item.type, number: item.documentNumber, title: item.title, status: item.status, customer: item.object.customer, object: item.object, body: `${snapshot.content || defaultTemplateContent(item.type, item.serviceKey || 'Objekt')}${notes}`, company };
  }
  const bytes = await createDocumentPdf(payload);
  return new NextResponse(Buffer.from(bytes), { headers: { 'Content-Type': 'application/pdf', 'Content-Disposition': `inline; filename="${payload.number}.pdf"`, 'Cache-Control': 'private, no-store' } });
}
