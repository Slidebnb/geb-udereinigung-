import { prisma } from '@/lib/prisma';
import { siteConfig } from '@/lib/site';
import { serviceModules } from '@/lib/document-generator/service-modules';
import { createAcquisitionPdf, type AcquisitionPdfCompany, type AcquisitionPdfInput } from '@/lib/acquisition-pdf';

export const ACQUISITION_DOCUMENT_KEY = 'leistungsuebersicht';

export const publicAcquisitionPdfInput: AcquisitionPdfInput = {
  title: 'Professionelle Gebäudedienste aus einer Hand',
  audience: 'Hausverwaltungen, Gewerbe, Eigentümer und Objektbetreiber',
  intro:
    'Diese Leistungsübersicht zeigt, welche Dienstleistungen Huwa für gepflegte, sichere und zuverlässig betreute Objekte übernimmt. Die Inhalte helfen bei der ersten Orientierung und ersetzen kein objektbezogenes Angebot.',
  callToAction:
    'Gerne prüfen wir Ihr Objekt persönlich und erstellen ein passendes Leistungsangebot mit klaren Absprachen, festem Ansprechpartner und nachvollziehbarem Leistungsumfang.',
  serviceKeys: serviceModules.map((module) => module.key),
};

export async function getPublicAcquisitionCompany(): Promise<AcquisitionPdfCompany> {
  const settings = Object.fromEntries((await prisma.setting.findMany()).map(item => [item.key, item.value]));
  return {
    name: settings.legal_company_name || siteConfig.name,
    street: settings.legal_street || siteConfig.address.street,
    zip: settings.legal_zip || siteConfig.address.zip,
    city: settings.legal_city || siteConfig.address.city,
    phone: settings.phone || siteConfig.phone,
    email: settings.contact_email || siteConfig.email,
    website: siteConfig.url.replace(/^https?:\/\//, ''),
  };
}

export async function createPublicAcquisitionPdf() {
  return createAcquisitionPdf(publicAcquisitionPdfInput, await getPublicAcquisitionCompany());
}
