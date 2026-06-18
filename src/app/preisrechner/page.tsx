import PriceCalculatorClient from '@/app/preisrechner/PriceCalculatorClient';
import { calculateConfiguredServicePrice } from '@/lib/configured-pricing';
import { prisma } from '@/lib/prisma';
import { getCalculatorConfig } from '@/lib/service-calculator-config';

export const dynamic = 'force-dynamic';

export default async function PreisrechnerPage() {
  const setting = await prisma.servicePriceSetting.findUnique({ where: { serviceKey: 'unterhalt' } }).catch(() => null);
  const result = setting?.active ? calculateConfiguredServicePrice('unterhalt', getCalculatorConfig('unterhalt').defaults, setting) : null;
  const initialEstimate = result ? { min: result.publicMin, max: result.publicMax, period: result.period, summary: result.summary } : null;
  return <PriceCalculatorClient initialEstimate={initialEstimate} />;
}
