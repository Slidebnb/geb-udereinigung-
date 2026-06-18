import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/admin-guard';
import { isAllowedSettingKey } from '@/lib/settings-keys';

async function syncPricingStandards(values: Record<string, unknown>) {
  const data: Record<string, number> = {};
  if (values.pricing_min_hourly_rate !== undefined) data.minimumHourlyRate = Math.max(38, Number(values.pricing_min_hourly_rate) || 38);
  if (values.pricing_target_hourly_rate !== undefined) data.targetHourlyRate = Math.max(data.minimumHourlyRate || 38, Number(values.pricing_target_hourly_rate) || 42);
  if (values.pricing_min_margin !== undefined) data.minimumMarginPercent = Math.max(20, Number(values.pricing_min_margin) || 20);
  if (values.pricing_payroll_burden !== undefined) data.payrollBurdenPercent = Math.max(0, Number(values.pricing_payroll_burden) || 75);
  if (values.pricing_public_range !== undefined) data.publicRangePercent = Math.max(5, Number(values.pricing_public_range) || 12);
  if (Object.keys(data).length) await prisma.servicePriceSetting.updateMany({ data });
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }
  const settings = await prisma.setting.findMany({ orderBy: { key: 'asc' } });
  // Array direkt zurückgeben – passend zum Admin-Frontend.
  return NextResponse.json(settings);
}

// Speichert ein flaches Key/Value-Objekt ({ key: value, ... }).
export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }
  const body = await request.json();
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Ungültige Daten.' }, { status: 400 });
  }
  for (const [key, value] of Object.entries(body)) {
    if (!key) continue;
    if (!isAllowedSettingKey(key)) {
      return NextResponse.json({ error: `Einstellung "${key}" ist nicht erlaubt.` }, { status: 400 });
    }
    await prisma.setting.upsert({
      where: { key },
      update: { value: String(value ?? '') },
      create: { key, value: String(value ?? '') },
    });
  }
  await syncPricingStandards(body);
  revalidatePath('/', 'layout');
  return NextResponse.json({ ok: true });
}

// Alternativ: Liste von { key, value }-Objekten.
export async function PUT(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }
  const { settings } = await request.json();
  if (!Array.isArray(settings)) {
    return NextResponse.json({ error: 'Ungültige Daten.' }, { status: 400 });
  }
  for (const s of settings) {
    if (!s.key) continue;
    if (!isAllowedSettingKey(s.key)) {
      return NextResponse.json({ error: `Einstellung "${s.key}" ist nicht erlaubt.` }, { status: 400 });
    }
    await prisma.setting.upsert({
      where: { key: s.key },
      update: { value: String(s.value ?? '') },
      create: { key: s.key, value: String(s.value ?? '') },
    });
  }
  await syncPricingStandards(Object.fromEntries(settings.map((item: { key: string; value: unknown }) => [item.key, item.value])));
  return NextResponse.json({ ok: true });
}
