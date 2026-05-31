export interface CalculatorService {
  key: string;
  label: string;
  unit: 'm2' | 'fenster' | 'stunde';
  unitLabel: string;
  basePrice: number; // pro Einheit
  minArea: number;
  maxArea: number;
  step: number;
  defaultArea: number;
}

export const calculatorServices: CalculatorService[] = [
  { key: 'unterhaltsreinigung', label: 'Unterhaltsreinigung', unit: 'm2', unitLabel: 'm²', basePrice: 0.45, minArea: 20, maxArea: 2000, step: 10, defaultArea: 150 },
  { key: 'bueroeinigung', label: 'Büroreinigung', unit: 'm2', unitLabel: 'm²', basePrice: 0.5, minArea: 20, maxArea: 2000, step: 10, defaultArea: 200 },
  { key: 'grundreinigung', label: 'Grundreinigung', unit: 'm2', unitLabel: 'm²', basePrice: 4.0, minArea: 20, maxArea: 2000, step: 10, defaultArea: 100 },
  { key: 'baureinigung', label: 'Baureinigung', unit: 'm2', unitLabel: 'm²', basePrice: 4.5, minArea: 20, maxArea: 5000, step: 25, defaultArea: 300 },
  { key: 'glasreinigung', label: 'Glasreinigung', unit: 'fenster', unitLabel: 'Fenster', basePrice: 3.5, minArea: 1, maxArea: 200, step: 1, defaultArea: 15 },
  { key: 'treppenhausreinigung', label: 'Treppenhausreinigung', unit: 'm2', unitLabel: 'm²', basePrice: 0.6, minArea: 20, maxArea: 800, step: 10, defaultArea: 120 },
];

export interface FrequencyOption {
  key: string;
  label: string;
  factor: number; // monatlicher Multiplikator gegenüber Einzelreinigung
  recurring: boolean;
}

export const frequencyOptions: FrequencyOption[] = [
  { key: 'einmalig', label: 'Einmalig', factor: 1, recurring: false },
  { key: 'woechentlich', label: 'Wöchentlich', factor: 4.33, recurring: true },
  { key: 'zweiwoechentlich', label: '14-tägig', factor: 2.17, recurring: true },
  { key: 'monatlich', label: 'Monatlich', factor: 1, recurring: true },
];

export interface CalculatorResult {
  min: number;
  max: number;
  recurring: boolean;
  perVisit: number;
}

export function calculatePrice(
  serviceKey: string,
  area: number,
  frequencyKey: string
): CalculatorResult {
  const service = calculatorServices.find((s) => s.key === serviceKey) ?? calculatorServices[0];
  const frequency = frequencyOptions.find((f) => f.key === frequencyKey) ?? frequencyOptions[0];

  // Grundpreis pro Einzelreinigung
  let perVisit = area * service.basePrice;

  // Mindestpreis pro Einsatz
  const minVisit = service.unit === 'fenster' ? 35 : 49;
  perVisit = Math.max(perVisit, minVisit);

  // Mengenrabatt bei größeren Flächen
  if (service.unit === 'm2' && area > 500) perVisit *= 0.9;

  const monthly = perVisit * frequency.factor;
  const value = frequency.recurring ? monthly : perVisit;

  return {
    min: Math.round((value * 0.9) / 5) * 5,
    max: Math.round((value * 1.15) / 5) * 5,
    recurring: frequency.recurring,
    perVisit: Math.round(perVisit),
  };
}

export function formatEuro(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
}
