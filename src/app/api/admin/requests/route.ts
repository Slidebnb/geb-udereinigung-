import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/admin-guard';
import { z } from 'zod';

const requestType = z.enum(['contact', 'quote']);
const deletableRequestType = z.enum(['contact', 'quote', 'download']);
const requestStatus = z.enum(['neu', 'in_bearbeitung', 'kontaktiert', 'erledigt']);

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const [contacts, quotes, downloads] = await Promise.all([
    prisma.contactRequest.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.quoteRequest.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.downloadLead.findMany({ orderBy: { createdAt: 'desc' } }),
  ]);

  return NextResponse.json({ contacts, quotes, downloads });
}

export async function PATCH(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const parsed = z.object({ id: z.string().min(1), type: requestType, status: requestStatus }).safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 });
  }
  const { id, type, status } = parsed.data;

  if (type === 'contact') {
    await prisma.contactRequest.update({ where: { id }, data: { status } });
  } else if (type === 'quote') {
    await prisma.quoteRequest.update({ where: { id }, data: { status } });
  } else {
    return NextResponse.json({ error: 'Unbekannter Typ.' }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const parsed = z.object({ id: z.string().min(1), type: deletableRequestType }).safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 });
  }
  const { id, type } = parsed.data;

  if (type === 'contact') {
    await prisma.contactRequest.delete({ where: { id } });
  } else if (type === 'quote') {
    await prisma.quoteRequest.delete({ where: { id } });
  } else if (type === 'download') {
    await prisma.downloadLead.delete({ where: { id } });
  } else {
    return NextResponse.json({ error: 'Unbekannter Typ.' }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
