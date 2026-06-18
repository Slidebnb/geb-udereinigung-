import { PrismaClient } from '@prisma/client';
import { communicationTemplates, defaultTemplateContent, objectDocumentTypes, serviceCatalog } from '../src/lib/operations-catalog';

const prisma = new PrismaClient();

async function main() {
  const portalCustomers = await prisma.user.findMany({ where: { role: 'kunde' }, orderBy: { createdAt: 'asc' } });
  for (let index = 0; index < portalCustomers.length; index += 1) {
    const user = portalCustomers[index];
    await prisma.customer.upsert({
      where: { portalUserId: user.id },
      update: { name: user.name || user.email, email: user.email },
      create: {
        customerNumber: `K-${user.createdAt.getFullYear()}-${String(index + 1).padStart(4, '0')}`,
        name: user.name || user.email,
        email: user.email,
        portalUserId: user.id,
      },
    });
  }

  for (let customerIndex = 0; customerIndex < portalCustomers.length; customerIndex += 1) {
    const user = portalCustomers[customerIndex];
    const customer = await prisma.customer.findUnique({ where: { portalUserId: user.id } });
    if (!customer) continue;
    const protocols = await prisma.cleaningProtocol.findMany({ where: { customerId: user.id, objectId: null } });
    const locations = [...new Set(protocols.map(protocol => protocol.location).filter(Boolean))];
    for (let locationIndex = 0; locationIndex < locations.length; locationIndex += 1) {
      const location = locations[locationIndex];
      let object = await prisma.serviceObject.findFirst({ where: { customerId: customer.id, name: location } });
      if (!object) {
        object = await prisma.serviceObject.create({
          data: {
            objectNumber: `O-LEG-${String(customerIndex + 1).padStart(3, '0')}-${String(locationIndex + 1).padStart(2, '0')}`,
            customerId: customer.id,
            name: location,
            street: location,
            zip: '',
            city: '',
            notes: 'Automatisch aus bestehenden Reinigungsprotokollen übernommen. Adresse bitte prüfen.',
          },
        });
      }
      await prisma.cleaningProtocol.updateMany({ where: { customerId: user.id, location, objectId: null }, data: { objectId: object.id } });
    }
  }

  for (const service of serviceCatalog) {
    const sourceNote = ['buero', 'unterhalt', 'treppenhaus', 'glas', 'grund', 'bau'].includes(service.key)
      ? 'Leistungswert aus der bereitgestellten Fachunterlage „Professionelle Kalkulation in der Gebäudereinigung (Stand 2025)“; Tariflohn auf Stand 2026. Vor Angebotsfreigabe mit Objektbegehung prüfen.'
      : 'Betrieblicher Kalkulationsansatz. Vor dem ersten verbindlichen Angebot anhand eigener Zeitaufschreibungen und tatsächlicher Kosten prüfen.';
    await prisma.servicePriceSetting.upsert({
      where: { serviceKey: service.key },
      update: { sourceNote, effectiveFrom: new Date('2026-01-01') },
      create: {
        serviceKey: service.key,
        title: service.title,
        unit: service.unit,
        performancePerHour: service.performance,
        wagePerHour: service.wage,
        materialPercent: service.material,
        setupMinutes: service.setup,
        sourceNote,
        effectiveFrom: new Date('2026-01-01'),
      },
    });
    for (const category of ['vertrag', 'angebot', 'leistungsverzeichnis', 'objekt-checkliste', 'sop', 'zusatzleistungskatalog']) {
      const key = `${category}-${service.key}`;
      await prisma.documentTemplate.upsert({
        where: { key },
        update: {},
        create: {
          key,
          category,
          serviceKey: service.key,
          title: `${category === 'sop' ? 'Arbeitsanweisung / SOP' : category} - ${service.title}`,
          content: defaultTemplateContent(category, service.title),
        },
      });
    }
  }

  for (const type of objectDocumentTypes.filter(item => !['leistungsverzeichnis', 'objekt-checkliste', 'sop', 'zusatzleistungskatalog'].includes(item.key))) {
    await prisma.documentTemplate.upsert({
      where: { key: type.key },
      update: {},
      create: {
        key: type.key,
        category: type.key,
        title: type.title,
        content: defaultTemplateContent(type.key, 'Objektdokumentation'),
      },
    });
  }

  const templates = await prisma.documentTemplate.findMany();
  for (const template of templates) {
    const isGeneric = template.content.includes('Diese Vorlage wird mit den Daten')
      || template.content.includes('Objektbereiche und Intervalle werden objektbezogen ergänzt')
      || template.content.includes('Objekt- und Sicherheitshinweise vor Beginn prüfen');
    if (!isGeneric) continue;
    const service = serviceCatalog.find(item => item.key === template.serviceKey);
    await prisma.documentTemplate.update({
      where: { id: template.id },
      data: { content: defaultTemplateContent(template.category, service?.title || 'Objektdokumentation') },
    });
  }

  for (const [key, title, subject, content] of communicationTemplates) {
    await prisma.communicationTemplate.upsert({
      where: { key },
      update: {},
      create: { key, title, subject, content },
    });
  }

  const defaults: Record<string, string> = {
    pricing_min_hourly_rate: '38', pricing_target_hourly_rate: '42', pricing_min_margin: '20',
    pricing_payroll_burden: '75', pricing_vat_rate: '19', pricing_public_range: '12',
    legal_templates_approved: 'false', legal_company_name: 'Huwa Gebäudereinigung & Hausmeisterdienste',
    legal_representative: 'Familie Huwa', legal_street: 'Mittelweg 24', legal_zip: '56566', legal_city: 'Neuwied',
  };
  for (const [key, value] of Object.entries(defaults)) {
    await prisma.setting.upsert({ where: { key }, update: {}, create: { key, value } });
  }
}

main().then(() => prisma.$disconnect()).catch(async error => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
