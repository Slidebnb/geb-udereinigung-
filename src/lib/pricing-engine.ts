import { serviceCatalog, type ServiceKey } from '@/lib/operations-catalog';

export type PricingInput = {
  serviceKey: ServiceKey;
  quantity: number;
  visitsPerMonth: number;
  setupMinutes?: number;
  travelCostPerVisit?: number;
  equipmentFlatPerMonth?: number;
  materialPercent?: number;
  performancePerHour?: number;
  wagePerHour?: number;
  payrollBurdenPercent?: number;
  riskPercent?: number;
  minimumHourlyRate?: number;
  targetHourlyRate?: number;
  minimumMarginPercent?: number;
  publicRangePercent?: number;
  productiveHoursOverride?: number;
  visitsForSetup?: number;
  materialFactor?: number;
  equipmentFactor?: number;
  period?: 'Monat' | 'Auftrag' | 'Saison';
  summary?: string;
};

export type PricingResult = {
  productiveHours: number;
  monthlyHours: number;
  laborCost: number;
  materialCost: number;
  travelCost: number;
  equipmentCost: number;
  directCost: number;
  floorRevenue: number;
  targetRevenue: number;
  netMonthly: number;
  grossMonthly: number;
  effectiveHourlyRate: number;
  marginPercent: number;
  publicMin: number;
  publicMax: number;
  meetsHourlyFloor: boolean;
  meetsMinimumMargin: boolean;
  period: 'Monat' | 'Auftrag' | 'Saison';
  summary?: string;
};

const money = (value: number) => Math.round(value * 100) / 100;
const publicRound = (value: number) => Math.max(50, Math.round(value / 10) * 10);

export function getServicePreset(serviceKey: ServiceKey) {
  return serviceCatalog.find(service => service.key === serviceKey) ?? serviceCatalog[0];
}

export function calculatePrice(input: PricingInput): PricingResult {
  const preset = getServicePreset(input.serviceKey);
  const quantity = Math.max(0, input.quantity || 0);
  const visits = Math.max(0.1, input.visitsPerMonth || 1);
  const performance = Math.max(0.1, input.performancePerHour ?? preset.performance);
  const setupHours = Math.max(0, input.setupMinutes ?? preset.setup) / 60;
  const productiveHoursPerVisit = preset.unit === 'Std.' ? quantity : quantity / performance;
  const productiveHours = input.productiveHoursOverride ?? productiveHoursPerVisit * visits;
  const setupVisits = input.visitsForSetup ?? visits;
  const monthlyHours = productiveHours + setupHours * setupVisits;
  const wage = input.wagePerHour ?? preset.wage;
  const burden = Math.max(0, input.payrollBurdenPercent ?? 75) / 100;
  const laborCost = monthlyHours * wage * (1 + burden);
  const materialPercent = (Math.max(0, input.materialPercent ?? preset.material) / 100) * Math.max(0, input.materialFactor ?? 1);
  const materialCost = laborCost * materialPercent;
  const travelCost = Math.max(0, input.travelCostPerVisit ?? 18) * visits;
  const equipmentCost = Math.max(0, input.equipmentFlatPerMonth ?? 0) * Math.max(0, input.equipmentFactor ?? 1);
  const directCostBeforeRisk = laborCost + materialCost + travelCost + equipmentCost;
  const risk = Math.max(0, input.riskPercent ?? 5) / 100;
  const directCost = directCostBeforeRisk * (1 + risk);
  const minimumHourlyRate = Math.max(38, input.minimumHourlyRate ?? 38);
  const targetHourlyRate = Math.max(minimumHourlyRate, input.targetHourlyRate ?? 42);
  const minimumMargin = Math.max(0.01, (input.minimumMarginPercent ?? 20) / 100);
  const floorRevenue = monthlyHours * minimumHourlyRate + materialCost + travelCost + equipmentCost;
  const targetRevenue = monthlyHours * targetHourlyRate + materialCost + travelCost + equipmentCost;
  const marginProtectedRevenue = directCost / (1 - minimumMargin);
  const netMonthly = Math.max(floorRevenue, targetRevenue, marginProtectedRevenue);
  const grossMonthly = netMonthly * 1.19;
  const effectiveHourlyRate = monthlyHours > 0
    ? (netMonthly - materialCost - travelCost - equipmentCost) / monthlyHours
    : 0;
  const marginPercent = netMonthly > 0 ? ((netMonthly - directCost) / netMonthly) * 100 : 0;
  const range = Math.max(5, input.publicRangePercent ?? 12) / 100;

  return {
    productiveHours: money(productiveHours),
    monthlyHours: money(monthlyHours),
    laborCost: money(laborCost),
    materialCost: money(materialCost),
    travelCost: money(travelCost),
    equipmentCost: money(equipmentCost),
    directCost: money(directCost),
    floorRevenue: money(floorRevenue),
    targetRevenue: money(targetRevenue),
    netMonthly: money(netMonthly),
    grossMonthly: money(grossMonthly),
    effectiveHourlyRate: money(effectiveHourlyRate),
    marginPercent: money(marginPercent),
    publicMin: publicRound(netMonthly * (1 - range)),
    publicMax: publicRound(netMonthly * (1 + range)),
    meetsHourlyFloor: effectiveHourlyRate >= minimumHourlyRate,
    meetsMinimumMargin: marginPercent >= minimumMargin * 100,
    period: input.period ?? 'Monat',
    summary: input.summary,
  };
}

export function formatEuro(value: number) {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
}
