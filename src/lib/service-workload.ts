import type { ServiceKey } from '@/lib/operations-catalog';
import type { CalculatorAnswers } from '@/lib/service-calculator-config';

type Workload = {
  productiveHours: number;
  visits: number;
  period: 'Monat' | 'Auftrag' | 'Saison';
  quantity: number;
  summary: string;
  materialFactor: number;
  equipmentFactor: number;
};

const n = (answers: CalculatorAnswers, key: string, fallback = 0) => {
  const value = Number(answers[key]);
  return Number.isFinite(value) ? Math.max(0, value) : fallback;
};
const s = (answers: CalculatorAnswers, key: string, fallback = '') => String(answers[key] ?? fallback);
const factor = (value: string, values: Record<string, number>, fallback = 1) => values[value] ?? fallback;

export function calculateServiceWorkload(serviceKey: ServiceKey, answers: CalculatorAnswers, performancePerHour: number): Workload {
  const performance = Math.max(0.1, performancePerHour);
  if (serviceKey === 'buero') {
    const visits = n(answers, 'visitsPerMonth', 4.33);
    const complexity = factor(s(answers, 'furnishing'), { light: 0.9, normal: 1, dense: 1.25 });
    const soil = factor(s(answers, 'dirt'), { low: 0.9, normal: 1, high: 1.25 });
    const perVisit = (n(answers, 'area') / performance) * complexity * soil + n(answers, 'workstations') * 0.01 + n(answers, 'sanitaryRooms') * 0.12 + n(answers, 'kitchens') * 0.15;
    return { productiveHours: perVisit * visits, visits, period: 'Monat', quantity: n(answers, 'area'), summary: `${n(answers, 'area')} m² Bürofläche, ${visits} Einsätze/Monat`, materialFactor: 1, equipmentFactor: 1 };
  }
  if (serviceKey === 'unterhalt') {
    const visits = n(answers, 'visitsPerMonth', 4.33);
    const traffic = factor(s(answers, 'publicTraffic'), { low: 0.9, normal: 1, high: 1.25 });
    const soil = factor(s(answers, 'dirt'), { low: 0.9, normal: 1, high: 1.25 });
    const perVisit = (n(answers, 'area') / performance) * traffic * soil + n(answers, 'sanitaryRooms') * 0.15 + n(answers, 'wastePoints') * 0.025;
    return { productiveHours: perVisit * visits, visits, period: 'Monat', quantity: n(answers, 'area'), summary: `${n(answers, 'area')} m² Unterhaltsfläche, ${visits} Einsätze/Monat`, materialFactor: 1, equipmentFactor: 1 };
  }
  if (serviceKey === 'treppenhaus') {
    const visits = n(answers, 'visitsPerMonth', 4.33);
    const soil = factor(s(answers, 'dirt'), { low: 0.9, normal: 1, high: 1.25 });
    const perVisit = (n(answers, 'floors') * 0.2 * n(answers, 'entrances', 1) + n(answers, 'elevators') * 0.12 + n(answers, 'cellarArea') / 180 + n(answers, 'glassDoors') * 0.06) * soil;
    return { productiveHours: perVisit * visits, visits, period: 'Monat', quantity: n(answers, 'floors'), summary: `${n(answers, 'floors')} Etagen, ${n(answers, 'entrances')} Eingang/Eingänge`, materialFactor: 0.9, equipmentFactor: 0.6 };
  }
  if (serviceKey === 'glas') {
    const sides = n(answers, 'sides', 2);
    const windowFactor = factor(s(answers, 'windowType'), { large: 0.85, standard: 1, small: 1.45 });
    const frameFactor = factor(s(answers, 'frames'), { no: 1, yes: 1.25, intensive: 1.5 });
    const accessFactor = factor(s(answers, 'access'), { ground: 1, ladder: 1.35, lift: 1.65 });
    const soil = factor(s(answers, 'dirt'), { low: 0.9, normal: 1, high: 1.35 });
    const hours = (n(answers, 'glassArea') * sides / performance) * windowFactor * frameFactor * accessFactor * soil;
    return { productiveHours: hours, visits: 1, period: 'Auftrag', quantity: n(answers, 'glassArea'), summary: `${n(answers, 'glassArea')} m² Glasfläche, ${sides === 2 ? 'beidseitig' : 'einseitig'}`, materialFactor: 1, equipmentFactor: accessFactor };
  }
  if (serviceKey === 'grund') {
    const floor = factor(s(answers, 'floorType'), { pvc: 1, stone: 1.3, tile: 1.1, carpet: 1.2 });
    const coating = s(answers, 'coatingRemoval') === 'yes' ? 1.45 : 1;
    const soil = factor(s(answers, 'dirt'), { low: 0.9, normal: 1, high: 1.35 });
    const access = factor(s(answers, 'machineAccess'), { yes: 1, limited: 1.25, no: 1.6 });
    const hours = (n(answers, 'area') / performance) * floor * coating * soil * access + n(answers, 'rooms') * 0.08;
    return { productiveHours: hours, visits: 1, period: 'Auftrag', quantity: n(answers, 'area'), summary: `${n(answers, 'area')} m² Grundreinigung`, materialFactor: coating * soil, equipmentFactor: 1.5 };
  }
  if (serviceKey === 'bau') {
    const phase = factor(s(answers, 'phase'), { rough: 0.85, intermediate: 1, final: 1.35 });
    const soil = factor(s(answers, 'dirt'), { low: 0.85, normal: 1, high: 1.4 });
    const floorFactor = 1 + Math.max(0, n(answers, 'floors', 1) - 1) * 0.025;
    const hours = (n(answers, 'area') / performance) * phase * soil * floorFactor + n(answers, 'glassArea') / 22 + n(answers, 'wasteHours');
    return { productiveHours: hours, visits: 1, period: 'Auftrag', quantity: n(answers, 'area'), summary: `${n(answers, 'area')} m² Baureinigung`, materialFactor: soil, equipmentFactor: 1.3 };
  }
  if (serviceKey === 'hausmeister') {
    const visits = n(answers, 'visitsPerMonth', 4.33);
    const repairs = s(answers, 'smallRepairs') === 'yes' ? 0.5 : 0;
    const perVisit = n(answers, 'hoursPerVisit', 1) + n(answers, 'units') * 0.025 + n(answers, 'technicalPoints') * 0.06 + n(answers, 'exteriorArea') / 1500 + repairs;
    return { productiveHours: perVisit * visits, visits, period: 'Monat', quantity: n(answers, 'units'), summary: `${n(answers, 'units')} Einheiten, ${visits} Kontrollen/Monat`, materialFactor: repairs ? 1.4 : 0.5, equipmentFactor: 1 };
  }
  if (serviceKey === 'winter') {
    const events = n(answers, 'expectedEvents', 20);
    const surface = factor(s(answers, 'surface'), { walkway: 1.15, parking: 0.85, mixed: 1 });
    const access = factor(s(answers, 'access'), { easy: 0.8, normal: 1, manual: 1.45 });
    const grit = factor(s(answers, 'gritLevel'), { low: 0.8, normal: 1, high: 1.35 });
    const hours = (n(answers, 'area') / performance) * surface * access * events + n(answers, 'standbyHours');
    return { productiveHours: hours, visits: events, period: 'Saison', quantity: n(answers, 'area'), summary: `${n(answers, 'area')} m², Kalkulationsannahme ${events} Einsätze/Saison`, materialFactor: grit * events / Math.max(events, 1), equipmentFactor: access === 0.8 ? 1.4 : 1 };
  }
  const visits = n(answers, 'visitsPerMonth', 2.17);
  const hedge = factor(s(answers, 'hedgeHeight'), { low: 0.85, medium: 1, high: 1.5 });
  const disposal = s(answers, 'disposal') === 'yes' ? 1.2 : 1;
  const perVisit = n(answers, 'lawnArea') / 600 + (n(answers, 'hedgeLength') / 25) * hedge + n(answers, 'bedArea') / 80 + n(answers, 'leafArea') / 600;
  return { productiveHours: perVisit * visits, visits, period: 'Monat', quantity: n(answers, 'lawnArea') + n(answers, 'bedArea'), summary: `${n(answers, 'lawnArea')} m² Rasen, ${n(answers, 'hedgeLength')} lfm Hecke`, materialFactor: disposal, equipmentFactor: 1.5 };
}
