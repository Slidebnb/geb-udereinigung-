import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { calculateConfiguredServicePrice } from '@/lib/configured-pricing';
import { serviceCatalog, type ServiceKey } from '@/lib/operations-catalog';
import { normalizeCalculatorAnswers } from '@/lib/service-calculator-config';
import { rateLimit } from '@/lib/rate-limit';

const schema = z.object({ serviceKey: z.string(), answers: z.record(z.union([z.string(), z.number(), z.boolean()])) });

export async function POST(request: Request) {
  const limited = rateLimit(request, { keyPrefix: 'public-price', limit: 60, windowMs: 60 * 1000 });
  if (limited) return limited;
  try {
    const parsed = schema.parse(await request.json());
    if (!serviceCatalog.some(item => item.key === parsed.serviceKey)) throw new Error('Dienstleistung ist ungültig.');
    const serviceKey = parsed.serviceKey as ServiceKey;
    const setting = await prisma.servicePriceSetting.findUnique({ where: { serviceKey } });
    if (!setting?.active) return NextResponse.json({ error: 'Für diese Dienstleistung ist die Kalkulation noch nicht freigegeben.' }, { status: 409 });
    const answers = normalizeCalculatorAnswers(serviceKey, parsed.answers);
    const result = calculateConfiguredServicePrice(serviceKey, answers, setting);
    return NextResponse.json({ min: result.publicMin, max: result.publicMax, period: result.period, summary: result.summary });
  } catch (error) {
    const message = error instanceof z.ZodError ? 'Bitte prüfen Sie Ihre Angaben.' : error instanceof Error ? error.message : 'Die Schätzung konnte nicht erstellt werden.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
