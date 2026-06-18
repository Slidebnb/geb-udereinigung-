import { mkdir, writeFile } from 'node:fs/promises';
import { createDocumentPdf } from '../src/lib/document-pdf';
import { createChecklistPdf } from '../src/lib/checklist-pdf';

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
  await writeFile('tmp/pdfs/checklist-smoke.pdf', await createChecklistPdf('qualitaetskontrolle'));
  console.log('PDF smoke files created.');
}

main().catch(error => { console.error(error); process.exit(1); });
