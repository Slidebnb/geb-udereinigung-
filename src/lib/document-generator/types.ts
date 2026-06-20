export type DocumentTypeKey =
  | 'checkliste'
  | 'vertrag'
  | 'leistungsverzeichnis'
  | 'angebotstext'
  | 'arbeitsanweisung'
  | 'uebergabeprotokoll'
  | 'objektmappe';

export type FrequencyKey = 'taeglich' | 'woechentlich' | 'vierzehntaegig' | 'monatlich' | 'nach-bedarf' | 'einmalig';

export type ObjectTypeKey =
  | 'mehrfamilienhaus'
  | 'buero'
  | 'praxis'
  | 'gewerbeobjekt'
  | 'halle'
  | 'kita-schule'
  | 'aussenanlage'
  | 'privatobjekt';

export type ServiceOption = {
  key: string;
  label: string;
  documentText: string;
  additional?: boolean;
  defaultSelected?: boolean;
};

export type ServiceModule = {
  key: string;
  title: string;
  description: string;
  options: ServiceOption[];
};

export type DocumentType = {
  key: DocumentTypeKey;
  title: string;
  description: string;
};

export type GeneratorSelection = {
  documentType: DocumentTypeKey;
  title: string;
  customerName: string;
  objectName: string;
  objectAddress: string;
  objectType: ObjectTypeKey;
  frequency: FrequencyKey;
  serviceKeys: string[];
  selectedOptions: Record<string, string[]>;
  features: string[];
  executionTimes?: string;
  notes?: string;
};

export type GeneratedDocument = {
  title: string;
  body: string;
  serviceTitles: string[];
};
