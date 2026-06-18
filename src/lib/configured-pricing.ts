import { calculatePrice } from '@/lib/pricing-engine';
import type { ServiceKey } from '@/lib/operations-catalog';
import type { CalculatorAnswers } from '@/lib/service-calculator-config';
import { calculateServiceWorkload } from '@/lib/service-workload';

export type PricingSetting = {
  performancePerHour: number;
  wagePerHour: number;
  payrollBurdenPercent: number;
  materialPercent: number;
  equipmentFlat: number;
  setupMinutes: number;
  minimumHourlyRate: number;
  targetHourlyRate: number;
  minimumMarginPercent: number;
  publicRangePercent: number;
};

export function calculateConfiguredServicePrice(serviceKey: ServiceKey, answers: CalculatorAnswers, setting: PricingSetting, overrides: { travelCostPerVisit?: number; equipmentFlat?: number; riskPercent?: number } = {}) {
  const workload = calculateServiceWorkload(serviceKey, answers, setting.performancePerHour);
  return calculatePrice({
    serviceKey,
    quantity: workload.quantity,
    visitsPerMonth: 1,
    productiveHoursOverride: workload.productiveHours,
    visitsForSetup: workload.visits,
    period: workload.period,
    summary: workload.summary,
    materialFactor: workload.materialFactor,
    equipmentFactor: workload.equipmentFactor,
    performancePerHour: setting.performancePerHour,
    wagePerHour: setting.wagePerHour,
    payrollBurdenPercent: setting.payrollBurdenPercent,
    materialPercent: setting.materialPercent,
    setupMinutes: setting.setupMinutes,
    minimumHourlyRate: setting.minimumHourlyRate,
    targetHourlyRate: setting.targetHourlyRate,
    minimumMarginPercent: setting.minimumMarginPercent,
    publicRangePercent: setting.publicRangePercent,
    travelCostPerVisit: overrides.travelCostPerVisit ?? 0,
    equipmentFlatPerMonth: overrides.equipmentFlat ?? setting.equipmentFlat,
    riskPercent: overrides.riskPercent ?? 0,
  });
}
