import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/admin-guard';

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const [contacts, quotes] = await Promise.all([
    prisma.contactRequest.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.quoteRequest.findMany({ orderBy: { createdAt: 'desc' } }),
  ]);

  return NextResponse.json({ contacts, quotes });
}

export async function PATCH(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const { id, type, status } = await request.json();
  if (!id || !type || !status) {
    return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 });
  }

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

  const { id, type } = await request.json();
  if (!id || !type) {
    return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 });
  }

  if (type === 'contact') {
    await prisma.contactRequest.delete({ where: { id } });
  } else if (type === 'quote') {
    await prisma.quoteRequest.delete({ where: { id } });
  } else {
    return NextResponse.json({ error: 'Unbekannter Typ.' }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
