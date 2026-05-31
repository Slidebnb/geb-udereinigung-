import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import bcrypt from 'bcryptjs';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/admin-guard';

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const { currentPassword, newPassword } = await request.json();

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: 'Alle Felder ausfüllen.' }, { status: 400 });
  }

  if (newPassword.length < 8) {
    return NextResponse.json({ error: 'Neues Passwort muss mindestens 8 Zeichen haben.' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ error: 'Benutzer nicht gefunden.' }, { status: 404 });
  }

  const valid = await bcrypt.compare(currentPassword, user.password);
  if (!valid) {
    return NextResponse.json({ error: 'Aktuelles Passwort ist falsch.' }, { status: 400 });
  }

  const hashed = await bcrypt.hash(newPassword, 12);
  await prisma.user.update({ where: { email: session.user.email }, data: { password: hashed } });

  return NextResponse.json({ ok: true });
}
