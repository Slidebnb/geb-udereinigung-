import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/admin-guard';
import { nextNumber } from '@/lib/numbering';
import { calculateConfiguredServicePrice } from '@/lib/configured-pricing';
import { defaultTemplateContent, serviceCatalog, type ServiceKey } from '@/lib/operations-catalog';
import { normalizeCalculatorAnswers } from '@/lib/service-calculator-config';
import { buildDocument } from '@/lib/document-generator/document-builder';
import type { GeneratorSelection } from '@/lib/document-generator/types';

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  const [customers, objects, calculations, offers, contracts, documents, deadlines, materials, equipment, priceSettings, templates, communication] = await Promise.all([
    prisma.customer.findMany({ include: { _count: { select: { objects: true, offers: true, contracts: true } } }, orderBy: { updatedAt: 'desc' } }),
    prisma.serviceObject.findMany({ include: { customer: true, _count: { select: { documents: true, protocols: true } } }, orderBy: { updatedAt: 'desc' } }),
    prisma.calculation.findMany({ include: { customer: true, object: true }, orderBy: { updatedAt: 'desc' }, take: 100 }),
    prisma.offer.findMany({ include: { customer: true, object: true, versions: { orderBy: { version: 'desc' }, take: 1 } }, orderBy: { updatedAt: 'desc' }, take: 100 }),
    prisma.contract.findMany({ include: { customer: true, object: true, versions: { orderBy: { version: 'desc' }, take: 1 } }, orderBy: { updatedAt: 'desc' }, take: 100 }),
    prisma.objectDocument.findMany({ include: { object: { include: { customer: true } } }, orderBy: { updatedAt: 'desc' }, take: 100 }),
    prisma.deadline.findMany({ include: { object: true, contract: true }, where: { status: 'offen' }, orderBy: { dueAt: 'asc' }, take: 100 }),
    prisma.materialItem.findMany({ orderBy: { name: 'asc' } }),
    prisma.equipmentItem.findMany({ orderBy: { name: 'asc' } }),
    prisma.servicePriceSetting.findMany({ orderBy: { title: 'asc' } }),
    prisma.documentTemplate.findMany({ orderBy: [{ category: 'asc' }, { title: 'asc' }] }),
    prisma.communicationTemplate.findMany({ orderBy: { title: 'asc' } }),
  ]);
  return NextResponse.json({ customers, objects, calculations, offers, contracts, documents, deadlines, materials, equipment, priceSettings, templates, communication });
}

const baseString = z.string().trim().min(1);
const generatorSelectionSchema = z.object({
  documentType: z.enum(['checkliste', 'vertrag', 'leistungsverzeichnis', 'angebotstext', 'arbeitsanweisung', 'uebergabeprotokoll', 'objektmappe']),
  title: baseString.max(180),
  customerName: baseString.max(240),
  objectName: baseString.max(240),
  objectAddress: baseString.max(400),
  objectType: z.enum(['mehrfamilienhaus', 'buero', 'praxis', 'gewerbeobjekt', 'halle', 'kita-schule', 'aussenanlage', 'privatobjekt']),
  frequency: z.enum(['taeglich', 'woechentlich', 'vierzehntaegig', 'monatlich', 'nach-bedarf', 'einmalig']),
  serviceKeys: z.array(baseString).min(1).max(12),
  selectedOptions: z.record(z.array(baseString).max(30)),
  features: z.array(z.string().trim().min(1).max(100)).max(20),
  executionTimes: z.string().trim().max(300).optional(),
  notes: z.string().trim().max(5000).optional(),
});

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  const body = await request.json();
  const action = String(body.action || '');
  try {
    if (action === 'customer') {
      const data = z.object({ name: baseString, company: z.string().optional(), email: z.string().email().or(z.literal('')).optional(), phone: z.string().optional(), street: z.string().optional(), zip: z.string().optional(), city: z.string().optional(), billingAddress: z.string().optional(), notes: z.string().optional() }).parse(body);
      const customer = await prisma.customer.create({ data: { ...data, email: data.email || null, customerNumber: await nextNumber('customer') } });
      return NextResponse.json(customer, { status: 201 });
    }
    if (action === 'object') {
      const data = z.object({ customerId: baseString, name: baseString, objectType: z.string().optional(), street: baseString, zip: baseString, city: baseString, areaSqm: z.coerce.number().nonnegative().optional(), floors: z.coerce.number().int().nonnegative().optional(), accessDetails: z.string().optional(), keyDetails: z.string().optional(), serviceWindow: z.string().optional(), specialFeatures: z.string().optional(), notes: z.string().optional() }).parse(body);
      const object = await prisma.serviceObject.create({ data: { ...data, objectNumber: await nextNumber('object') } });
      return NextResponse.json(object, { status: 201 });
    }
    if (action === 'previewCalculation' || action === 'calculation') {
      const data = z.object({ customerId: z.string().optional(), objectId: z.string().optional(), title: z.string().optional(), serviceKey: baseString, answers: z.record(z.union([z.string(), z.number(), z.boolean()])), travelCostPerVisit: z.coerce.number().nonnegative().default(0), equipmentFlatPerMonth: z.coerce.number().nonnegative().default(0), riskPercent: z.coerce.number().nonnegative().default(5), overrideReason: z.string().optional() }).parse(body);
      const serviceKey = data.serviceKey as ServiceKey;
      const stored = await prisma.servicePriceSetting.findUnique({ where: { serviceKey } });
      if (!stored?.active) return NextResponse.json({ error: 'Die Kalkulationsgrundlage dieser Dienstleistung ist nicht freigegeben.' }, { status: 409 });
      const answers = normalizeCalculatorAnswers(serviceKey, data.answers);
      const result = calculateConfiguredServicePrice(serviceKey, answers, stored, { travelCostPerVisit: data.travelCostPerVisit, equipmentFlat: data.equipmentFlatPerMonth || stored.equipmentFlat, riskPercent: data.riskPercent });
      if (action === 'previewCalculation') return NextResponse.json(result);
      if (!data.title?.trim()) return NextResponse.json({ error: 'Bitte einen Kalkulationstitel eingeben.' }, { status: 400 });
      const calculation = await prisma.calculation.create({ data: { calculationNumber: await nextNumber('calculation'), customerId: data.customerId || null, objectId: data.objectId || null, title: data.title.trim(), serviceKey, inputSnapshot: JSON.stringify({ ...data, answers }), resultSnapshot: JSON.stringify(result), netTotal: result.netMonthly, grossTotal: result.grossMonthly, productiveHours: result.monthlyHours, effectiveHourlyRate: result.effectiveHourlyRate, marginPercent: result.marginPercent, overrideReason: data.overrideReason || null } });
      return NextResponse.json(calculation, { status: 201 });
    }
    if (action === 'offer' || action === 'contract') {
      const data = z.object({ customerId: baseString, objectId: z.string().optional(), calculationId: z.string().optional(), title: baseString, serviceKey: baseString, netTotal: z.coerce.number().positive(), notes: z.string().optional(), validUntil: z.string().optional(), startsAt: z.string().optional(), endsAt: z.string().optional(), noticeMonths: z.coerce.number().int().positive().default(1) }).parse(body);
      const grossTotal = Math.round(data.netTotal * 1.19 * 100) / 100;
      const serviceTitle = serviceCatalog.find(item => item.key === data.serviceKey)?.title || data.serviceKey;
      const snapshot = JSON.stringify({ ...data, grossTotal, content: defaultTemplateContent(action === 'offer' ? 'angebot' : 'vertrag', serviceTitle), createdAt: new Date().toISOString() });
      if (action === 'offer') {
        const offer = await prisma.offer.create({ data: { offerNumber: await nextNumber('offer'), customerId: data.customerId, objectId: data.objectId || null, calculationId: data.calculationId || null, title: data.title, serviceKey: data.serviceKey, validUntil: data.validUntil ? new Date(data.validUntil) : null, netTotal: data.netTotal, grossTotal, notes: data.notes || null, versions: { create: { version: 1, snapshot } } }, include: { versions: true } });
        return NextResponse.json(offer, { status: 201 });
      }
      const contract = await prisma.contract.create({ data: { contractNumber: await nextNumber('contract'), customerId: data.customerId, objectId: data.objectId || null, calculationId: data.calculationId || null, title: data.title, serviceKey: data.serviceKey, startsAt: data.startsAt ? new Date(data.startsAt) : null, endsAt: data.endsAt ? new Date(data.endsAt) : null, noticeMonths: data.noticeMonths, netMonthly: data.netTotal, grossMonthly: grossTotal, notes: data.notes || null, versions: { create: { version: 1, snapshot } } }, include: { versions: true } });
      if (contract.endsAt) await prisma.deadline.create({ data: { contractId: contract.id, objectId: contract.objectId, title: `Kündigungsfrist ${contract.contractNumber}`, type: 'kuendigung', dueAt: new Date(contract.endsAt.getTime() - contract.noticeMonths * 30 * 86400000) } });
      return NextResponse.json(contract, { status: 201 });
    }
    if (action === 'objectDocument') {
      const data = z.object({ objectId: baseString, type: baseString, title: baseString, serviceKey: z.string().optional(), notes: z.string().optional() }).parse(body);
      const service = serviceCatalog.find(item => item.key === data.serviceKey);
      const templateKey = data.serviceKey ? `${data.type}-${data.serviceKey}` : data.type;
      const template = await prisma.documentTemplate.findUnique({ where: { key: templateKey } });
      const content = template?.content || defaultTemplateContent(data.type, service?.title || 'Objektdokumentation');
      const snapshot = JSON.stringify({ content, templateKey, templateUpdatedAt: template?.updatedAt?.toISOString() || null, notes: data.notes || null, createdAt: new Date().toISOString() });
      const document = await prisma.objectDocument.create({ data: { objectId: data.objectId, type: data.type, title: data.title, serviceKey: data.serviceKey || null, snapshot, documentNumber: await nextNumber('document') } });
      return NextResponse.json(document, { status: 201 });
    }
    if (action === 'modularDocument') {
      const data = z.object({
        customerId: baseString,
        objectId: baseString,
        selection: generatorSelectionSchema,
        content: baseString.max(100000),
      }).parse(body);
      const object = await prisma.serviceObject.findFirst({ where: { id: data.objectId, customerId: data.customerId }, include: { customer: true } });
      if (!object) return NextResponse.json({ error: 'Das ausgewählte Objekt gehört nicht zum Auftraggeber oder wurde nicht gefunden.' }, { status: 404 });
      const normalizedSelection: GeneratorSelection = {
        ...data.selection,
        customerName: object.customer.company || object.customer.name,
        objectName: object.name,
        objectAddress: `${object.street}, ${object.zip} ${object.city}`,
        serviceKeys: [...new Set(data.selection.serviceKeys)],
        features: [...new Set(data.selection.features)],
      };
      const generated = buildDocument(normalizedSelection);
      const snapshot = JSON.stringify({
        generator: 'modular-service-document',
        generatorVersion: 1,
        selection: normalizedSelection,
        generatedContent: generated.body,
        content: data.content,
        serviceTitles: generated.serviceTitles,
        createdAt: new Date().toISOString(),
      });
      const document = await prisma.objectDocument.create({
        data: {
          objectId: object.id,
          type: normalizedSelection.documentType,
          title: normalizedSelection.title,
          serviceKey: normalizedSelection.serviceKeys.length === 1 ? normalizedSelection.serviceKeys[0] : null,
          snapshot,
          documentNumber: await nextNumber('document'),
        },
      });
      return NextResponse.json(document, { status: 201 });
    }
    if (action === 'deadline') {
      const data = z.object({ objectId: z.string().optional(), contractId: z.string().optional(), title: baseString, type: baseString, dueAt: baseString, notes: z.string().optional() }).parse(body);
      return NextResponse.json(await prisma.deadline.create({ data: { ...data, objectId: data.objectId || null, contractId: data.contractId || null, dueAt: new Date(data.dueAt) } }), { status: 201 });
    }
    if (action === 'material') {
      const data = z.object({ name: baseString, sku: z.string().optional(), category: z.string().optional(), unit: z.string().default('Stück'), stock: z.coerce.number().nonnegative(), minimumStock: z.coerce.number().nonnegative(), unitCost: z.coerce.number().nonnegative(), storageLocation: z.string().optional(), notes: z.string().optional() }).parse(body);
      return NextResponse.json(await prisma.materialItem.create({ data: { ...data, sku: data.sku || null } }), { status: 201 });
    }
    if (action === 'equipment') {
      const data = z.object({ inventoryNumber: baseString, name: baseString, category: z.string().optional(), manufacturer: z.string().optional(), model: z.string().optional(), serialNumber: z.string().optional(), nextMaintenance: z.string().optional(), status: z.string().default('einsatzbereit'), location: z.string().optional(), notes: z.string().optional() }).parse(body);
      return NextResponse.json(await prisma.equipmentItem.create({ data: { ...data, nextMaintenance: data.nextMaintenance ? new Date(data.nextMaintenance) : null } }), { status: 201 });
    }
    if (action === 'priceSetting') {
      const data = z.object({ serviceKey: baseString, title: baseString, unit: baseString, performancePerHour: z.coerce.number().positive(), wagePerHour: z.coerce.number().positive(), payrollBurdenPercent: z.coerce.number().nonnegative(), materialPercent: z.coerce.number().nonnegative(), equipmentFlat: z.coerce.number().nonnegative(), setupMinutes: z.coerce.number().int().nonnegative(), minimumHourlyRate: z.coerce.number().min(38), targetHourlyRate: z.coerce.number().min(38), minimumMarginPercent: z.coerce.number().min(20), publicRangePercent: z.coerce.number().min(5), sourceNote: z.string().optional(), active: z.boolean().default(true) }).parse(body);
      const setting = await prisma.servicePriceSetting.findUnique({ where: { serviceKey: data.serviceKey } });
      return NextResponse.json(setting
        ? await prisma.servicePriceSetting.update({ where: { serviceKey: data.serviceKey }, data: { ...data, reviewedAt: new Date(), version: { increment: 1 } } })
        : await prisma.servicePriceSetting.create({ data: { ...data, reviewedAt: new Date() } }));
    }
    if (action === 'documentTemplate') {
      const data = z.object({ id: baseString, title: baseString, content: baseString, active: z.boolean().default(true), legalApproved: z.boolean().default(false) }).parse(body);
      return NextResponse.json(await prisma.documentTemplate.update({ where: { id: data.id }, data: { title: data.title, content: data.content, active: data.active, legalApproved: data.legalApproved } }));
    }
    if (action === 'communicationTemplate') {
      const data = z.object({ id: baseString, title: baseString, subject: baseString, content: baseString, active: z.boolean().default(true) }).parse(body);
      return NextResponse.json(await prisma.communicationTemplate.update({ where: { id: data.id }, data: { title: data.title, subject: data.subject, content: data.content, active: data.active } }));
    }
    if (action === 'newDocumentVersion') {
      const data = z.object({ kind: z.enum(['offer', 'contract']), id: baseString }).parse(body);
      if (data.kind === 'offer') {
        const item = await prisma.offer.findUnique({ where: { id: data.id }, include: { versions: true } });
        if (!item) throw new Error('Angebot nicht gefunden.');
        const template = await prisma.documentTemplate.findUnique({ where: { key: `angebot-${item.serviceKey}` } });
        const version = Math.max(0, ...item.versions.map(entry => entry.version)) + 1;
        await prisma.documentVersion.create({ data: { offerId: item.id, version, snapshot: JSON.stringify({ title: item.title, serviceKey: item.serviceKey, netTotal: item.netTotal, grossTotal: item.grossTotal, notes: item.notes, content: template?.content || defaultTemplateContent('angebot', item.serviceKey), createdAt: new Date().toISOString() }) } });
        await prisma.offer.update({ where: { id: item.id }, data: { status: 'entwurf' } });
        return NextResponse.json({ ok: true, version });
      }
      const item = await prisma.contract.findUnique({ where: { id: data.id }, include: { versions: true } });
      if (!item) throw new Error('Vertrag nicht gefunden.');
      const template = await prisma.documentTemplate.findUnique({ where: { key: `vertrag-${item.serviceKey}` } });
      const version = Math.max(0, ...item.versions.map(entry => entry.version)) + 1;
      await prisma.documentVersion.create({ data: { contractId: item.id, version, snapshot: JSON.stringify({ title: item.title, serviceKey: item.serviceKey, netTotal: item.netMonthly, grossTotal: item.grossMonthly, notes: item.notes, content: template?.content || defaultTemplateContent('vertrag', item.serviceKey), createdAt: new Date().toISOString() }) } });
      await prisma.contract.update({ where: { id: item.id }, data: { status: 'entwurf' } });
      return NextResponse.json({ ok: true, version });
    }
    if (action === 'finalizeDocument') {
      const data = z.object({ kind: z.enum(['offer', 'contract']), id: baseString }).parse(body);
      const requiredKeys = ['legal_company_name', 'legal_representative', 'legal_street', 'legal_zip', 'legal_city', 'legal_tax_number'];
      const stored = Object.fromEntries((await prisma.setting.findMany({ where: { key: { in: [...requiredKeys, 'legal_templates_approved'] } } })).map(item => [item.key, item.value]));
      if (stored.legal_templates_approved !== 'true' || requiredKeys.some(key => !stored[key]?.trim())) {
        return NextResponse.json({ error: 'Finale Freigabe gesperrt: Unternehmensdaten oder rechtliche Vorlagenprüfung fehlen.' }, { status: 409 });
      }
      if (data.kind === 'offer') {
        await prisma.offer.update({ where: { id: data.id }, data: { status: 'final', versions: { updateMany: { where: { status: 'entwurf' }, data: { status: 'final' } } } } });
      } else {
        await prisma.contract.update({ where: { id: data.id }, data: { status: 'final', versions: { updateMany: { where: { status: 'entwurf' }, data: { status: 'final' } } } } });
      }
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: 'Unbekannte Aktion.' }, { status: 400 });
  } catch (error) {
    console.error('[api/admin/operations]', error);
    return NextResponse.json({ error: error instanceof z.ZodError ? error.errors[0]?.message : 'Die Daten konnten nicht gespeichert werden.' }, { status: 400 });
  }
}
