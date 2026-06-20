import { documentTypes, frequencyOptions, objectTypeOptions } from './document-types';
import { serviceModuleMap } from './service-modules';
import type { GeneratedDocument, GeneratorSelection } from './types';

const unique = <T,>(values: T[]) => [...new Set(values)];

function numberedSections(sections: { title: string; lines: string[] }[]) {
  return sections
    .filter(section => section.lines.some(line => line.trim()))
    .map((section, index) => `${index + 1}. ${section.title.toUpperCase()}\n${section.lines.filter(Boolean).join('\n')}`)
    .join('\n\n');
}

export function validateGeneratorSelection(selection: GeneratorSelection) {
  if (!selection.title.trim()) throw new Error('Ein Dokumenttitel ist erforderlich.');
  if (!selection.serviceKeys.length) throw new Error('Mindestens ein Leistungsbereich ist erforderlich.');
  for (const serviceKey of selection.serviceKeys) {
    const serviceModule = serviceModuleMap.get(serviceKey);
    if (!serviceModule) throw new Error(`Unbekannter Leistungsbereich: ${serviceKey}`);
    const allowed = new Set(serviceModule.options.map(option => option.key));
    const selected = selection.selectedOptions[serviceKey] || [];
    if (!selected.length) throw new Error(`Für ${serviceModule.title} muss mindestens eine Leistung gewählt werden.`);
    if (selected.some(key => !allowed.has(key))) throw new Error(`Ungültiger Leistungsbaustein in ${serviceModule.title}.`);
  }
}

export function buildDocument(selection: GeneratorSelection): GeneratedDocument {
  validateGeneratorSelection(selection);
  const documentType = documentTypes.find(item => item.key === selection.documentType);
  const frequency = frequencyOptions.find(item => item.key === selection.frequency)?.label || selection.frequency;
  const objectType = objectTypeOptions.find(item => item.key === selection.objectType)?.label || selection.objectType;
  const modules = selection.serviceKeys.map(key => serviceModuleMap.get(key)).filter((value): value is NonNullable<typeof value> => Boolean(value));
  const serviceSections = modules.map(serviceModule => {
    const selected = new Set(selection.selectedOptions[serviceModule.key] || []);
    const lines = unique(serviceModule.options.filter(option => selected.has(option.key)).map(option => {
      const prefix = selection.documentType === 'checkliste' || selection.documentType === 'arbeitsanweisung' ? '[ ] ' : '- ';
      return `${prefix}${option.label}: ${option.documentText}`;
    }));
    return { title: serviceModule.title, lines };
  });

  const commonStart = {
    title: 'Allgemeine Objektangaben',
    lines: [
      `Auftraggeber: ${selection.customerName}`,
      `Objekt: ${selection.objectName}`,
      `Anschrift: ${selection.objectAddress}`,
      `Objektart: ${objectType}`,
    ],
  };
  const timing = {
    title: 'Turnus und Ausführungszeiten',
    lines: [`Regelturnus: ${frequency}`, selection.executionTimes ? `Ausführungszeit: ${selection.executionTimes}` : 'Ausführungszeiten werden mit dem Auftraggeber abgestimmt.'],
  };
  const features = {
    title: 'Objektbesonderheiten',
    lines: selection.features.length ? unique(selection.features).map(value => `- ${value}`) : ['Keine zusätzlichen Objektbesonderheiten erfasst.'],
  };
  const extras = {
    title: 'Sonderleistungen und Ergänzungen',
    lines: selection.notes?.trim() ? [selection.notes.trim()] : ['Zusätzliche Leistungen werden vor Ausführung gesondert abgestimmt und dokumentiert.'],
  };
  const contractor = {
    title: 'Pflichten des Auftragnehmers',
    lines: ['Die Leistungen sind fachgerecht, materialschonend und entsprechend den dokumentierten Objektvorgaben auszuführen.', 'Abweichungen, Schäden und nicht zugängliche Bereiche sind dem benannten Ansprechpartner zeitnah zu melden.'],
  };
  const client = {
    title: 'Pflichten des Auftraggebers',
    lines: ['Der Auftraggeber stellt die vereinbarten Zugänge und erforderlichen Objektinformationen rechtzeitig bereit.', 'Gefahrenstellen, sensible Materialien und Änderungen am Objekt sind vor Ausführung mitzuteilen.'],
  };
  const documentation = {
    title: 'Dokumentation',
    lines: ['Ausführung, Abweichungen und besondere Feststellungen werden entsprechend der gewählten Dokumentart nachvollziehbar festgehalten.'],
  };

  let sections = [commonStart, ...serviceSections, timing, features, extras, documentation];
  if (selection.documentType === 'vertrag') sections = [commonStart, ...serviceSections, timing, features, contractor, client, extras, documentation, { title: 'Laufzeit, Vergütung und Kündigung', lines: ['Laufzeit, Vergütung, Umsatzsteuer und Kündigungsregelungen sind vor Freigabe individuell einzutragen und rechtlich zu prüfen.'] }, { title: 'Unterschriften', lines: ['Ort, Datum: ______________________________', 'Auftraggeber: ___________________________    Auftragnehmer: ___________________________'] }];
  if (selection.documentType === 'leistungsverzeichnis') sections = [commonStart, ...serviceSections, timing, features, contractor, client, extras, documentation, { title: 'Freigabe', lines: ['Auftraggeber: ___________________________    Datum: ___________________________'] }];
  if (selection.documentType === 'angebotstext') sections = [commonStart, { title: 'Angebotener Leistungsumfang', lines: modules.map(serviceModule => `${serviceModule.title}: ${serviceModule.description}`) }, ...serviceSections, timing, features, extras, { title: 'Preis und Gültigkeit', lines: ['Preis, Umsatzsteuer, Gültigkeitsdauer und Zahlungsbedingungen werden im Angebot ergänzt.'] }];
  if (selection.documentType === 'arbeitsanweisung') sections = [commonStart, { title: 'Vor Arbeitsbeginn', lines: ['[ ] Zugang und Objektbesonderheiten prüfen', '[ ] Geeignete Materialien, Geräte und persönliche Schutzausrüstung bereitstellen'] }, ...serviceSections, timing, features, { title: 'Nach Arbeitsende', lines: ['[ ] Ergebnis kontrollieren', '[ ] Abweichungen und Schäden dokumentieren', '[ ] Objekt ordnungsgemäß verschließen'] }];
  if (selection.documentType === 'uebergabeprotokoll') sections = [commonStart, features, { title: 'Zugänge und Schlüssel', lines: ['[ ] Schlüssel / Transponder vollständig übergeben', '[ ] Zugangscode oder Alarmablauf erläutert', '[ ] Rückgabe oder Verwahrung dokumentiert'] }, ...serviceSections, { title: 'Feststellungen und offene Punkte', lines: [selection.notes?.trim() || '____________________________________________________________________'] }, { title: 'Unterschriften', lines: ['Übergeben durch: ________________________    Übernommen durch: ________________________'] }];
  if (selection.documentType === 'objektmappe') sections = [commonStart, features, timing, ...serviceSections, { title: 'Ansprechpartner und Eskalation', lines: ['Kundenseitiger Ansprechpartner und interne Zuständigkeit werden in der Objektakte gepflegt.'] }, documentation, extras];

  const heading = `${(documentType?.title || selection.documentType).toUpperCase()}\n${selection.title}`;
  return { title: selection.title, body: `${heading}\n\n${numberedSections(sections)}`, serviceTitles: modules.map(serviceModule => serviceModule.title) };
}
