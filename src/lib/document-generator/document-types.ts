import type { DocumentType, FrequencyKey, ObjectTypeKey } from './types';

export const documentTypes: DocumentType[] = [
  { key: 'checkliste', title: 'Checkliste', description: 'Abhakbare Leistungs- und Kontrollpunkte für den Einsatz' },
  { key: 'vertrag', title: 'Dienstleistungsvertrag', description: 'Strukturierter Vertragsentwurf zur fachlichen und rechtlichen Prüfung' },
  { key: 'leistungsverzeichnis', title: 'Leistungsverzeichnis', description: 'Verbindliche Beschreibung von Umfang, Turnus und Abgrenzung' },
  { key: 'angebotstext', title: 'Angebotstext', description: 'Professioneller Leistungstext für ein separates Angebot' },
  { key: 'arbeitsanweisung', title: 'Arbeitsanweisung', description: 'Objektbezogene Ausführungsvorgaben für das eingesetzte Team' },
  { key: 'uebergabeprotokoll', title: 'Übergabeprotokoll', description: 'Dokumentierte Objekt-, Schlüssel- und Leistungsübergabe' },
  { key: 'objektmappe', title: 'Objektmappe', description: 'Kompakte Zusammenfassung von Objekt, Leistungen und Besonderheiten' },
];

export const frequencyOptions: { key: FrequencyKey; label: string }[] = [
  { key: 'taeglich', label: 'täglich' },
  { key: 'woechentlich', label: 'wöchentlich' },
  { key: 'vierzehntaegig', label: '14-tägig' },
  { key: 'monatlich', label: 'monatlich' },
  { key: 'nach-bedarf', label: 'nach Bedarf' },
  { key: 'einmalig', label: 'einmalig' },
];

export const objectTypeOptions: { key: ObjectTypeKey; label: string }[] = [
  { key: 'mehrfamilienhaus', label: 'Mehrfamilienhaus' },
  { key: 'buero', label: 'Büro' },
  { key: 'praxis', label: 'Praxis' },
  { key: 'gewerbeobjekt', label: 'Gewerbeobjekt' },
  { key: 'halle', label: 'Halle' },
  { key: 'kita-schule', label: 'Kita / Schule' },
  { key: 'aussenanlage', label: 'Außenanlage' },
  { key: 'privatobjekt', label: 'Privatobjekt' },
];

export const objectFeatureOptions = [
  'Schlüssel vorhanden', 'Zugangscode', 'Mülltonnenservice', 'Winterdienstpflicht', 'Außenflächen',
  'Treppenhaus', 'Keller', 'Tiefgarage', 'Glasflächen', 'Grünflächen', 'Sonderflächen',
] as const;
