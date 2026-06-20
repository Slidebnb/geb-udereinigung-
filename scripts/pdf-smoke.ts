import { mkdir, writeFile } from 'node:fs/promises';
import { createDocumentPdf } from '../src/lib/document-pdf';
import { createChecklistPdf } from '../src/lib/checklist-pdf';
import { defaultTemplateContent } from '../src/lib/operations-catalog';
import { buildDocument } from '../src/lib/document-generator/document-builder';
import { createAcquisitionPdf } from '../src/lib/acquisition-pdf';

async function main() {
  await mkdir('tmp/pdfs', { recursive: true });
  const document = await createDocumentPdf({
    documentType: 'Vertrag', number: 'VTR-2026-0001', title: 'Dienstleistungsvertrag Unterhaltsreinigung', status: 'entwurf',
    customer: { name: 'Max Mustermann', company: 'Musterverwaltung GmbH', street: 'Beispielstraße 12', zip: '56564', city: 'Neuwied' },
    object: { name: 'Bürogebäude Süd', street: 'Objektstraße 4', zip: '56068', city: 'Koblenz' },
    netTotal: 1250, vatRate: 19, grossTotal: 1487.5,
    body: '1. Vertragsgegenstand\nDer Auftragnehmer übernimmt die fachgerechte Unterhaltsreinigung gemäß beigefügtem Leistungsverzeichnis.\n\n2. Leistung und Qualität\nLeistungsumfang, Häufigkeit und Qualitätsprüfung werden objektbezogen dokumentiert.\n\n3. Laufzeit und Kündigung\nBeginn, Verlängerung und Kündigungsfrist ergeben sich aus den individuellen Vertragsdaten.',
    company: { name: 'Huwa Gebäudereinigung & Hausmeisterdienste', representative: 'Familie Huwa', street: 'Mittelweg 24', zip: '56566', city: 'Neuwied', taxNumber: '32/074/56310' },
  });
  await writeFile('tmp/pdfs/admin-document-smoke.pdf', document);
  await writeFile('tmp/pdfs/leistungsverzeichnis-smoke.pdf', await createDocumentPdf({
    documentType: 'Leistungsverzeichnis', number: 'DOK-2026-0001', title: 'Leistungsverzeichnis Unterhaltsreinigung', status: 'entwurf',
    customer: { name: 'Max Mustermann', company: 'Musterverwaltung GmbH' },
    object: { name: 'Bürogebäude Süd', street: 'Objektstraße 4', zip: '56068', city: 'Koblenz' },
    body: defaultTemplateContent('leistungsverzeichnis', 'Unterhaltsreinigung'),
    company: { name: 'Huwa Gebäudereinigung & Hausmeisterdienste', representative: 'Familie Huwa', street: 'Mittelweg 24', zip: '56566', city: 'Neuwied' },
  }));
  await writeFile('tmp/pdfs/checklist-smoke.pdf', await createChecklistPdf('qualitaetskontrolle'));
  const modular = buildDocument({
    documentType: 'leistungsverzeichnis', title: 'Leistungsverzeichnis Wohnanlage Rheinblick', customerName: 'Musterverwaltung GmbH', objectName: 'Wohnanlage Rheinblick', objectAddress: 'Musterstraße 10, 56564 Neuwied', objectType: 'mehrfamilienhaus', frequency: 'woechentlich', serviceKeys: ['gebaeudereinigung', 'hausmeisterdienst', 'gartenpflege'], selectedOptions: { gebaeudereinigung: ['boden', 'sanitaer'], hausmeisterdienst: ['sichtkontrolle', 'muelltonnen'], gartenpflege: ['rasen', 'hecken'] }, features: ['Treppenhaus', 'Grünflächen'], executionTimes: 'Montag bis Freitag nach Abstimmung', notes: 'Zusatzleistungen nur nach Freigabe.',
  });
  await writeFile('tmp/pdfs/modular-document-smoke.pdf', await createDocumentPdf({
    documentType: 'Leistungsverzeichnis', number: 'DOK-2026-0099', title: modular.title, status: 'entwurf',
    customer: { name: 'Max Mustermann', company: 'Musterverwaltung GmbH' }, object: { name: 'Wohnanlage Rheinblick', street: 'Musterstraße 10', zip: '56564', city: 'Neuwied' },
    body: modular.body.split('\n').slice(2).join('\n').trim(), company: { name: 'Huwa Gebäudereinigung & Hausmeisterdienste', representative: 'Familie Huwa', street: 'Mittelweg 24', zip: '56566', city: 'Neuwied' },
  }));
  await writeFile('tmp/pdfs/acquisition-smoke.pdf', await createAcquisitionPdf({
    title: 'Professionelle Gebäudedienste aus einer Hand',
    audience: 'Hausverwaltungen, Gewerbe und Eigentümer',
    intro: 'Huwa unterstützt Sie bei der zuverlässigen Betreuung, Reinigung und Pflege Ihrer Immobilien. Unsere Leistungen werden passend zu Objekt, Nutzung und gewünschtem Turnus zusammengestellt.',
    serviceKeys: ['gebaeudereinigung', 'hausmeisterdienst', 'gartenpflege', 'winterdienst', 'fensterreinigung', 'bauendreinigung'],
    callToAction: 'Gerne besichtigen wir Ihr Objekt unverbindlich und erstellen anschließend ein passendes Leistungsangebot.',
  }, {
    name: 'Huwa Gebäudereinigung & Hausmeisterdienste', street: 'Mittelweg 24', zip: '56566', city: 'Neuwied', phone: '02601 9131820', email: 'info@huwa-gebaeudedienste.de', website: 'huwa-gebaeudedienste.de',
  }));
  console.log('PDF smoke files created.');
}

main().catch(error => { console.error(error); process.exit(1); });
