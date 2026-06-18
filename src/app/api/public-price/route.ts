import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { calculatePrice } from '@/lib/pricing-engine';
import { serviceCatalog, type ServiceKey } from '@/lib/operations-catalog';
import { rateLimit } from '@/lib/rate-limit';

const schema = z.object({ serviceKey: z.string(), quantity: z.coerce.number().positive().max(100000), visitsPerMonth: z.coerce.number().positive().max(62) });

export async function POST(request: Request) {
  const limited = rateLimit(request, { keyPrefix: 'public-price', limit: 60, windowMs: 60 * 1000 });
  if (limited) return limited;
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success || !serviceCatalog.some(item => item.key === parsed.data.serviceKey)) return NextResponse.json({ error: 'Ungültige Kalkulationsdaten.' }, { status: 400 });
  const serviceKey = parsed.data.serviceKey as ServiceKey;
  const setting = await prisma.servicePriceSetting.findUnique({ where: { serviceKey } }).catch(() => null);
  const result = calculatePrice({ serviceKey, quantity: parsed.data.quantity, visitsPerMonth: parsed.data.visitsPerMonth, performancePerHour: setting?.performancePerHour, wagePerHour: setting?.wagePerHour, payrollBurdenPercent: setting?.payrollBurdenPercent, materialPercent: setting?.materialPercent, setupMinutes: setting?.setupMinutes, minimumHourlyRate: setting?.minimumHourlyRate, targetHourlyRate: setting?.targetHourlyRate, minimumMarginPercent: setting?.minimumMarginPercent, publicRangePercent: setting?.publicRangePercent });
  return NextResponse.json({ min: result.publicMin, max: result.publicMax });
}
