import assert from 'node:assert/strict';
import { calculatePrice } from '../src/lib/pricing-engine';
import { calculateConfiguredServicePrice } from '../src/lib/configured-pricing';
import { serviceCalculatorConfigs } from '../src/lib/service-calculator-config';

const base = calculatePrice({ serviceKey: 'unterhalt', quantity: 500, visitsPerMonth: 4.33 });
assert.equal(base.meetsHourlyFloor, true, '38-Euro-Grenze muss eingehalten werden');
assert.equal(base.meetsMinimumMargin, true, '20-Prozent-Marge muss eingehalten werden');
assert.ok(base.effectiveHourlyRate >= 38, 'Effektiver Verrechnungssatz darf 38 Euro nicht unterschreiten');
assert.ok(base.marginPercent >= 20, 'Marge darf 20 Prozent nicht unterschreiten');
assert.ok(base.publicMin < base.publicMax, 'Öffentlicher Korridor muss aufsteigend sein');
assert.equal(base.grossMonthly, Math.round(base.netMonthly * 1.19 * 100) / 100, 'Umsatzsteuer muss 19 Prozent betragen');

const materialHeavy = calculatePrice({ serviceKey: 'grund', quantity: 250, visitsPerMonth: 1, materialPercent: 40, equipmentFlatPerMonth: 500 });
assert.ok(materialHeavy.marginPercent >= 20, 'Materialintensive Aufträge brauchen ebenfalls 20 Prozent Marge');
assert.ok(materialHeavy.netMonthly > materialHeavy.directCost, 'Umsatz muss direkte Kosten übersteigen');

const hourly = calculatePrice({ serviceKey: 'garten', quantity: 8, visitsPerMonth: 2 });
assert.ok(hourly.effectiveHourlyRate >= 38, 'Stundenbasierte Leistungen brauchen ebenfalls den Mindest-Verrechnungssatz');

const setting = { performancePerHour: 150, wagePerHour: 15, payrollBurdenPercent: 75, materialPercent: 8, equipmentFlat: 0, setupMinutes: 20, minimumHourlyRate: 38, targetHourlyRate: 42, minimumMarginPercent: 20, publicRangePercent: 12 };
for (const config of serviceCalculatorConfigs) {
  const result = calculateConfiguredServicePrice(config.key, config.defaults, { ...setting, performancePerHour: config.key === 'glas' ? 22 : config.key === 'grund' ? 10 : config.key === 'bau' ? 14 : config.key === 'winter' ? 550 : setting.performancePerHour });
  assert.ok(Number.isFinite(result.netMonthly) && result.netMonthly > 0, `${config.title} braucht ein belastbares Ergebnis`);
  assert.ok(result.publicMin < result.publicMax, `${config.title} braucht einen öffentlichen Preiskorridor`);
  assert.ok(result.effectiveHourlyRate >= 38, `${config.title} muss die 38-Euro-Grenze einhalten`);
}

console.log('Pricing tests passed for all service calculators', { base, materialHeavy, hourly });
