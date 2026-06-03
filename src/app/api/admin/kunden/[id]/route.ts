import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/admin-guard';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }
  const { name, email } = await request.json();
  if (!name || !email) {
    return NextResponse.json({ error: 'Name und E-Mail sind erforderlich.' }, { status: 400 });
  }
  const customer = await prisma.user.findUnique({ where: { id: params.id } });
  if (!customer || customer.role !== 'kunde') {
    return NextResponse.json({ error: 'Kunde nicht gefunden.' }, { status: 404 });
  }
  const updated = await prisma.user.update({
    where: { id: params.id },
    data: { name, email },
  });
  return NextResponse.json({ ok: true, user: { id: updated.id, name: updated.name, email: updated.email } });
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }
  const customer = await prisma.user.findUnique({ where: { id: params.id } });
  if (!customer || customer.role !== 'kunde') {
    return NextResponse.json({ error: 'Kunde nicht gefunden.' }, { status: 404 });
  }
  await prisma.user.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
