import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/admin-guard';

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
    await prisma.setting.upsert({
      where: { key },
      update: { value: String(value ?? '') },
      create: { key, value: String(value ?? '') },
    });
  }
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
    await prisma.setting.upsert({
      where: { key: s.key },
      update: { value: String(s.value ?? '') },
      create: { key: s.key, value: String(s.value ?? '') },
    });
  }
  return NextResponse.json({ ok: true });
}
