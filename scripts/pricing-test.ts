import assert from 'node:assert/strict';
import { calculatePrice } from '../src/lib/pricing-engine';

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

console.log('Pricing tests passed', { base, materialHeavy, hourly });
